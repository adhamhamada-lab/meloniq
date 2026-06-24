import { supabase } from "@/lib/supabase";

export async function POST(
req: Request
){

const body =
await req.json();

const {
error
}
=
await supabase
.from("reviews")
.insert([
{
name:
body.name,

review:
body.review,
},
]);

if(error){

return Response.json(
{
success:false
},
{
status:500
}
);

}

return Response.json({
success:true
});

}