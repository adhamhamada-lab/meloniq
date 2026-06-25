"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {

const [isMenuOpen,setIsMenuOpen]=useState(false);
const [scrolled,setScrolled]=useState(false);

const { items } =
useCart();

const cartCount =
items.reduce(
(sum,i)=>
sum+i.quantity,
0
);

useEffect(()=>{

const handleScroll=
()=>
setScrolled(
window.scrollY>60
);

window.addEventListener(
"scroll",
handleScroll
);

return()=>
window.removeEventListener(
"scroll",
handleScroll
);

},[]);

return(

<nav
className={`

sticky
top-0
z-50

px-8
md:px-16

flex
justify-between
items-center

transition-all
duration-500

${
scrolled

?

"py-4 md:py-5 bg-[#E4E7D6]/95 backdrop-blur-sm border-b border-[#D5D9C8] shadow-sm"

:

"py-5 md:py-6 bg-[#E4E7D6]"

}

`}

>

<Link
href="/"
onClick={()=>
setIsMenuOpen(
false
)
}
>

<Image
src="/images/logooo.png"

alt="Meloniq"

width={260}

height={100}

priority

className={`

h-auto
object-contain

transition-all
duration-500

hover:scale-[1.02]

${

scrolled

?

"w-[120px] md:w-[180px]"

:

"w-[130px] md:w-[200px]"

}

`}
/>

</Link>

<div
className="
hidden
md:flex
items-center
gap-16
text-[#55614A]
text-[16px]
tracking-[0.18em]
uppercase
"
>

<Link
href="/shop"
className="
hover:opacity-60
duration-300
"
>

Shop

</Link>

<Link
href="/#about"
className="
hover:opacity-60
duration-300
"
>

About

</Link>

<a
href="https://wa.me/201227788169"

target="_blank"

rel="noopener noreferrer"

className="
hover:opacity-60
duration-300
"

>

Contact

</a>

<Link
href="/cart"

className="
relative
hover:opacity-60
duration-300
"

>

<svg
width="22"
height="22"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="1.6"

>

<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>

<line
x1="3"
y1="6"
x2="21"
y2="6"
/>

<path d="M16 10a4 4 0 0 1-8 0"/>

</svg>

{

cartCount>0 && (

<span
className="
absolute
-top-2
-right-2

w-4
h-4

rounded-full

bg-[#55614A]

text-white

text-[10px]

flex
items-center
justify-center
"

>

{cartCount}

</span>

)

}

</Link>

</div>

<div
className="
md:hidden
flex
items-center
gap-5
"
>

<button

onClick={()=>
setIsMenuOpen(
!isMenuOpen
)
}

className="
flex
flex-col
gap-[5px]
"

>

<span
className={`
block
w-6
h-[1.5px]

bg-[#55614A]

duration-300

${
isMenuOpen
?
"rotate-45 translate-y-[6px]"
:
""
}
`}
/>

<span
className={`
block
w-6
h-[1.5px]

bg-[#55614A]

duration-300

${
isMenuOpen
?
"opacity-0"
:
""
}
`}
/>

<span
className={`
block
w-6
h-[1.5px]

bg-[#55614A]

duration-300

${
isMenuOpen
?
"-rotate-45 -translate-y-[6px]"
:
""
}
`}
/>

</button>

</div>

</nav>

);

}
