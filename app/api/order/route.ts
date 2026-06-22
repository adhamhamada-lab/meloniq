import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {

const body = await req.json();

const { error } = await supabase
.from("orders")
.insert([
{
name: body.name,
product: body.product,
quantity: body.quantity,
contact: body.contact,
address: body.address
}
]);

if (error) {
return Response.json(
{ error: error.message },
{ status: 500 }
);
}

return Response.json({
success: true
});

}