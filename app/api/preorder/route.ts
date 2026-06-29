import { supabase } from "../../../lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("preorders")
      .insert([{
        name: body.name,
        contact: body.contact,
        address: body.address,
        items: body.items,
        discount_code: body.discount_code || null,
      }])
      .select();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    // Google Sheets - منفصل عشان لو فشل مش يأثر على الأوردر
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
          type: "preorder",
        }),
      });
    } catch (sheetError) {
      console.log("Google Sheets error:", sheetError);
    }

    // Resend Email - منفصل كمان
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