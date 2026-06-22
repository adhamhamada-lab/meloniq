"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function OrderPage() {

const [loading,setLoading]=useState(false);

async function send(e:any){
e.preventDefault();

setLoading(true);

const form=new FormData(e.target);

const res=await fetch("/api/order",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:form.get("name"),
product:form.get("product"),
quantity:Number(form.get("quantity")),
contact:form.get("contact"),
address:form.get("address")
})
});

setLoading(false);

if(res.ok){
alert("Order sent successfully");
e.target.reset();
}else{
alert("Something went wrong");
}
}

return(

<main className="bg-[#E4E7D6] min-h-screen">

<nav
className="
sticky
top-0
z-50
bg-[#E4E7D6]
px-8
md:px-16
py-4
flex
justify-between
items-center
"
>

<Link href="/">

<Image
src="/images/logooo.png"
alt="Meloniq"
width={260}
height={100}
className="w-[130px] h-auto"
/>

</Link>

<Link
href="/shop"
className="
uppercase
tracking-[0.18em]
text-[#55614A]
hover:opacity-60
"
>
Back
</Link>

</nav>

<section
className="
px-8
md:px-16
py-20
"
>

<div
className="
max-w-[1100px]
mx-auto
grid
md:grid-cols-2
gap-16
items-center
"
>

<div>

<p
className="
tracking-[0.35em]
text-[#66705D]
text-sm
"
>
PLACE YOUR ORDER
</p>

<h1
className="
mt-6
text-[58px]
md:text-[110px]
leading-[0.9]
text-[#55614A]
"
>
Order
</h1>

<p
className="
mt-8
text-[#66705D]
text-xl
leading-relaxed
"
>
Complete the details and your order will be received directly.
</p>

</div>

<form
onSubmit={send}
className="
bg-[#D7DCCB]
rounded-[40px]
p-8
md:p-12
flex
flex-col
gap-5
"
>

<input
required
name="name"
placeholder="Full Name"
className="
bg-white
rounded-full
px-6
py-4
outline-none
"
/>

<input
required
name="product"
placeholder="Product"
className="
bg-white
rounded-full
px-6
py-4
outline-none
"
/>

<input
required
name="quantity"
type="number"
placeholder="Quantity"
className="
bg-white
rounded-full
px-6
py-4
outline-none
"
/>

<input
required
name="contact"
placeholder="Phone Number"
className="
bg-white
rounded-full
px-6
py-4
outline-none
"
/>

<textarea
required
name="address"
placeholder="Address"
rows={4}
className="
bg-white
rounded-[30px]
px-6
py-5
outline-none
resize-none
"
/>

<button
disabled={loading}
className="
mt-2
bg-[#55614A]
text-white
rounded-full
py-5
hover:scale-[1.02]
duration-300
"
>

{loading ? "Sending..." : "Submit Order"}

</button>

</form>

</div>

</section>

</main>

);

}