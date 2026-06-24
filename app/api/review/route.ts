import { supabase } from "@/lib/supabase";

export async function POST(
req: Request
){

const body =
await req.json();

const {
name,
review,
rating,
}
=
body;

const {
error,
}
=
await supabase
.from(
"reviews"
)
.insert([
{
name,
review,
rating,
},
]);

if(
error
){

return Response.json(
{
success:false,
error,
},
{
status:500,
}
);

}

return Response.json(
{
success:true,
}
);

}