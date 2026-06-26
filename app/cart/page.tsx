"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {

const {
items,
removeItem,
updateQty,
total
} = useCart();

return (

<main className="bg-[#E4E7D6] min-h-screen">

<Navbar />

<section className="px-8 md:px-16 pt-10 pb-32 max-w-[1000px] mx-auto">

<p className="tracking-[0.35em] text-[#66705D] text-sm">
YOUR ORDER
</p>

<h1 className="mt-4 text-[60px] md:text-[90px] leading-[0.9] text-[#55614A]">
Cart
</h1>

{items.length === 0 ? (

<div className="mt-20 text-center">

<p className="text-[#66705D] text-xl">
Your cart is empty.
</p>

<Link
href="/shop"
className="
inline-block
mt-8
px-10
py-4
rounded-full
bg-[#55614A]
text-white
uppercase
"
>

Browse Shop

</Link>

</div>

) : (

<div className="mt-12 flex flex-col gap-6">

{items.map((item)=>(

<div

key={item.slug}

className="
bg-[#D7DCCB]

rounded-[30px]

p-5

flex
flex-col

md:flex-row

gap-6
"

>

<div
className="
flex
items-center
gap-4
flex-1
"
>

<Image
src={item.image}
alt={item.title}
width={100}
height={100}
className="
w-[80px]
h-[80px]

md:w-[100px]
md:h-[100px]

rounded-[16px]
object-cover
"
/>

<div>

<h3
className="
text-xl
md:text-2xl
text-[#55614A]
"
>

{item.title}

</h3>

<p
className="
text-[#66705D]
mt-2
"
>

{item.price}

</p>

</div>

</div>

<div
className="
flex

items-center

justify-between

md:justify-end

gap-5

flex-wrap
"

>

<div
className="
flex
items-center

gap-3

bg-white

rounded-full

px-4
py-2
"

>

<button

onClick={()=>
updateQty(
item.slug,
item.quantity-1
)
}

className="
w-7
h-7
"

>

−

</button>

<span
className="
w-5
text-center
"

>

{item.quantity}

</span>

<button

onClick={()=>
updateQty(
item.slug,
item.quantity+1
)
}

className="
w-7
h-7
"

>

*

</button>

</div>

<p
className="
text-[#55614A]

whitespace-nowrap
"

>

{
parseInt(
item.price.replace(
/[^0-9]/g,
""
)
)
*
item.quantity
}

{" "}EGP

</p>

<button

onClick={()=>
removeItem(
item.slug
)
}

className="
text-xl
opacity-40
"

>

×

</button>

</div>

</div>

))}

<div
className="
mt-6

bg-[#D7DCCB]

rounded-[30px]

p-8

flex
flex-col

md:flex-row

items-center

justify-between

gap-6
"

>

<div>

<p
className="
uppercase
tracking-[0.2em]
text-sm
text-[#66705D]
"
>

Total

</p>

<p
className="
text-[#55614A]

text-4xl
"

>

{total} EGP

</p>

</div>

<div
className="
flex

flex-wrap

gap-4

justify-center
"

>

<Link
href="/shop"

className="
px-8
py-4

rounded-full

border

border-[#55614A]
"

>

Continue Shopping

</Link>

<Link
href="/checkout"

className="
px-8
py-4

rounded-full

bg-[#55614A]

text-white
"

>

Checkout →

</Link>

</div>

</div>

</div>

)}

</section>

<footer
className="
py-16

border-t

border-[#C7CDB6]

text-center
text-[#55614A]
"

>

<h1 className="text-6xl">
<em>m</em>eloniq
</h1>

<p className="mt-4 opacity-60">
© 2026 Meloniq
</p>

</footer>

</main>

);

}
