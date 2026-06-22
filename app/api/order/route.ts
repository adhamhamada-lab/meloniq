import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body);

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          name: body.name,
          product: body.product,
          quantity: body.quantity,
          contact: body.contact,
          address: body.address,
        },
      ])
      .select();

    if (error) {
      console.log("SUPABASE ERROR:", error);

      return Response.json(
        {
          error: error.message,
          details: error,
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (e) {
    console.log("SERVER ERROR:", e);

    return Response.json(
      {
        error: "Server failed",
      },
      { status: 500 }
    );
  }
}