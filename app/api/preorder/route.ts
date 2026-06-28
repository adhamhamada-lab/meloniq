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
    discount_code: body.discount_code || null,  // ← ضيف السطر ده
  }])
  .select();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

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
      `,
    });

    return Response.json({ success: true, data });
  } catch (e) {
    return Response.json({ error: "Server failed" }, { status: 500 });
  }
}