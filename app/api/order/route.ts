import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
      console.log(error);

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
  } catch (e: any) {
    return Response.json(
      {
        error: e.message,
      },
      { status: 500 }
    );
  }
}