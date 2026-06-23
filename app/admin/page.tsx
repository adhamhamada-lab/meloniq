import { createClient } from "@supabase/supabase-js";

export default async function AdminPage() {

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const { data } =
await supabase
.from("orders")
.select("*")
.order("id", {
ascending: false,
});

return (

<main className="bg-[#E4E7D6] min-h-screen p-6 md:p-16">

<h1
className="
text-[50px]
md:text-[90px]
text-[#55614A]
"
>
Orders
</h1>

<div
className="
mt-10
grid
gap-6
"
>

{data?.map((o:any)=>(

<div
key={o.id}
className="
bg-[#D7DCCB]
rounded-[35px]
p-8
"
>

<p className="text-[#55614A]">
<b>Name:</b> {o.name}
</p>

<p className="mt-2 text-[#55614A]">
<b>Product:</b> {o.product}
</p>

<p className="mt-2 text-[#55614A]">
<b>Quantity:</b> {o.quantity}
</p>

<p className="mt-2 text-[#55614A]">
<b>Phone:</b> {o.phone}
</p>

<p className="mt-2 text-[#55614A]">
<b>Address:</b> {o.address}
</p>

</div>

))}

</div>

</main>

);

}