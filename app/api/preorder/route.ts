import { supabase } from "../../../lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const PRODUCTS: Record<string, number> = {
  "Tea Tree Oil Soap": 115,
  "Argan & Frankincense Soap": 115,
  "Licorice Oil Soap": 140,
  "Saad Oil Soap": 160,
  "Watermelon Soap": 100,
  "Pink Lemonade Soap": 100,
  "Pina Colada Soap": 100,
  "Aloe & Cucumber Soap": 100,
  "Tropical Fruit Soap": 100,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // حساب الـ total الأصلي
    const originalTotal = (body.items || []).reduce((sum: number, item: any) => {
      const price = PRODUCTS[item.product] || 0;
      return sum + price * item.quantity;
    }, 0);

    // حساب الـ total بعد الخصم
    let finalTotal = originalTotal;
    if (body.discount_code) {
      const { data: discountData } = await supabase
        .from("discount_codes")
        .select("type, value")
        .ilike("code", body.discount_code)
        .single();

      if (discountData) {
        finalTotal = discountData.type === "percentage"
          ? Math.round(originalTotal * (1 - discountData.value / 100))
          : originalTotal - discountData.value;
      }
    }

    const { data, error } = await supabase
      .from("preorders")
      .insert([{
        name: body.name,
        contact: body.contact,
        address: body.address,
        items: body.items,
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
          items: body.items,
          discount_code: body.discount_code || "",
          total: finalTotal,
          type: "preorder",
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
        subject: "⏳ New Pre-Order - Meloniq",
        html: `
          <h2>New Pre-Order Received</h2>
          <p><b>Name:</b> ${body.name}</p>
          <p><b>Phone:</b> ${body.contact}</p>
          <p><b>Address:</b> ${body.address}</p>
          <h3>Items:</h3>
          <ul>
            ${body.items.map((i: any) => `<li>${i.product} × ${i.quantity}</li>`).join("")}
          </ul>
          ${body.discount_code ? `<p><b>Discount Code:</b> ${body.discount_code}</p>` : ""}
          <p><b>Original Total:</b> ${originalTotal} EGP</p>
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