import { supabase } from "../../../lib/supabase";
import { Resend } from "resend";
import { normalizeProduct, productPrice } from "../../../lib/products";

const resend = new Resend(process.env.RESEND_API_KEY);

// تعريف الباندلز في السيرفر — المصدر الوحيد الموثوق للسعر والعدد
const BUNDLES: Record<number, { count: number; price: number }> = {
  3: { count: 3, price: 80 },
  5: { count: 5, price: 110 },
};

// الصابونات المسموح اختيارها جوه أي باندل (Summer Collection)
const ALLOWED_BUNDLE_PRODUCTS = [
  "Watermelon Soap",
  "Pink Lemonade Soap",
  "Piña Colada Soap",
  "Aloe & Cucumber Soap",
  "Tropical Fruit Soap",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // نوحّد أسماء المنتجات (عربي / إنجليزي / Pina) للاسم الإنجليزي الأساسي
    const items = (body.items || []).map((i: any) => ({
      product: normalizeProduct(i.product),
      quantity: Number(i.quantity) || 0,
    }));

    // صابون إضافي بسعره العادي (بيتقبل مع الباندل بس)
    const extraItems = (body.extra_items || [])
      .map((i: any) => ({
        product: normalizeProduct(i.product),
        quantity: Number(i.quantity) || 0,
      }))
      .filter((i: any) => i.product && i.quantity > 0);

    // حساب الـ total الأصلي (للطلبات العادية)
    const originalTotal = items.reduce(
      (sum: number, item: any) => sum + productPrice(item.product) * item.quantity,
      0
    );

    let isBundle = false;
    let baseTotal = originalTotal;
    let extrasTotal = 0;
    let storedItems = items;

    if (body.bundle && body.bundle.id) {
      const bundleConfig = BUNDLES[Number(body.bundle.id)];

      if (!bundleConfig) {
        return Response.json({ error: "Invalid bundle selected." }, { status: 400 });
      }

      // التحقق من الباندل بيتم على صابونات الباندل بس (مش الإضافي)
      const totalQuantity = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
      if (totalQuantity !== bundleConfig.count) {
        return Response.json(
          { error: `This bundle requires exactly ${bundleConfig.count} soaps.` },
          { status: 400 }
        );
      }

      const invalidItem = items.find((item: any) => !ALLOWED_BUNDLE_PRODUCTS.includes(item.product));
      if (invalidItem) {
        return Response.json(
          { error: "One or more selected soaps aren't available in this bundle." },
          { status: 400 }
        );
      }

      // الصابون الإضافي لازم يكون منتج حقيقي بسعره العادي
      if (extraItems.some((i: any) => productPrice(i.product) === 0)) {
        return Response.json({ error: "One or more extra products are invalid." }, { status: 400 });
      }

      extrasTotal = extraItems.reduce(
        (sum: number, item: any) => sum + productPrice(item.product) * item.quantity,
        0
      );

      isBundle = true;
      baseTotal = bundleConfig.price + extrasTotal;

      // نجمع الباندل + الإضافي في قايمة واحدة للإدارة (ملخص الإنتاج)
      const merged: Record<string, number> = {};
      [...items, ...extraItems].forEach((i: any) => {
        merged[i.product] = (merged[i.product] || 0) + i.quantity;
      });
      storedItems = Object.entries(merged).map(([product, quantity]) => ({ product, quantity }));
    }

    // منع استخدام نفس كود الخصم مرتين بنفس رقم التليفون
    if (body.discount_code && body.contact) {
      const { data: existingUsage, error: usageCheckError } = await supabase
        .from("discount_usage")
        .select("id")
        .ilike("code", body.discount_code)
        .eq("phone", body.contact)
        .limit(1);

      if (usageCheckError) {
        return Response.json(
          { error: "Could not verify discount code usage. Please try again." },
          { status: 500 }
        );
      }

      if (existingUsage && existingUsage.length > 0) {
        return Response.json(
          {
            error: "This discount code has already been used with this phone number. Please remove it and try again.",
            code: "DISCOUNT_ALREADY_USED",
          },
          { status: 409 }
        );
      }
    }

    // حساب الـ total بعد الخصم
    let finalTotal = baseTotal;
    if (body.discount_code) {
      const { data: discountData } = await supabase
        .from("discount_codes")
        .select("type, value")
        .eq("active", true)
        .ilike("code", body.discount_code)
        .single();

      if (discountData) {
        finalTotal = discountData.type === "percentage"
          ? Math.round(baseTotal * (1 - discountData.value / 100))
          : baseTotal - discountData.value;
      }
    }

    const { data, error } = await supabase
      .from("preorders")
      .insert([{
        name: body.name,
        contact: body.contact,
        address: body.address,
        items: storedItems,
        discount_code: body.discount_code || null,
        total: finalTotal,
      }])
      .select();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    // تسجيل استخدام الكود
    if (body.discount_code && body.contact) {
      await supabase
        .from("discount_usage")
        .insert([{ code: body.discount_code, phone: body.contact }]);
    }

    // Google Sheets
    try {
      await fetch(process.env.GOOGLE_SHEET_WEBHOOK!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: "meloniq-secret-2026",
          name: body.name,
          contact: body.contact,
          address: body.address,
          items: storedItems,
          discount_code: body.discount_code || "",
          total: finalTotal,
          type: isBundle ? "bundle" : "preorder",
        }),
      });
    } catch (sheetError) {
      console.log("Google Sheets error:", sheetError);
    }

    // Email
    try {
      await resend.emails.send({
        from: "Meloniq <onboarding@resend.dev>",
        to: "yusefmgaber@gmail.com",
        subject: isBundle ? "🎒 New Bundle Order - Meloniq" : "⏳ New Pre-Order - Meloniq",
        html: `
          <h2>${isBundle ? "New Bundle Order Received" : "New Pre-Order Received"}</h2>
          <p><b>Name:</b> ${body.name}</p>
          <p><b>Phone:</b> ${body.contact}</p>
          <p><b>Address:</b> ${body.address}</p>
          ${isBundle ? `<p><b>Bundle:</b> Bundle ${body.bundle.id} (${BUNDLES[Number(body.bundle.id)].price} EGP)</p>` : ""}
          <h3>${isBundle ? "Bundle soaps:" : "Items:"}</h3>
          <ul>
            ${items.map((i: any) => `<li>${i.product} × ${i.quantity}</li>`).join("")}
          </ul>
          ${isBundle && extraItems.length > 0 ? `
            <h3>Extra soaps (regular price):</h3>
            <ul>${extraItems.map((i: any) => `<li>${i.product} × ${i.quantity} — ${productPrice(i.product) * i.quantity} EGP</li>`).join("")}</ul>
          ` : ""}
          ${body.discount_code ? `<p><b>Discount Code:</b> ${body.discount_code}</p>` : ""}
          <p><b>Base Total:</b> ${baseTotal} EGP</p>
          <p><b>Final Total:</b> ${finalTotal} EGP</p>
        `,
      });
    } catch (emailError) {
      console.log("Email error:", emailError);
    }

    return Response.json({ success: true, data });
  } catch (e) {
    return Response.json({ error: "Server failed" }, { status: 500 });
  }
}