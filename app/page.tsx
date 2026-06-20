"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";



export default function Home() {

useEffect(() => {

const items =
document.querySelectorAll(".reveal");

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},

{
threshold:0.2,
}

);

items.forEach((el)=>
observer.observe(el)
);

return () => observer.disconnect();

},[]);

return (

<main className="bg-[#E4E7D6] min-h-screen">
     {/* NAVBAR */}

<nav
  className="
  px-8
  md:px-16
  py-10
  flex
  justify-between
  items-center
  reveal
  "
>

  <Link href="/">

<Image
  src="/images/logooo.png"
  alt="Meloniq"
  width={260}
  height={100}
  priority
  className="
  w-[180px]
  md:w-[260px]
  h-auto
  object-contain
  hover:scale-[1.02]
  duration-300
  cursor-pointer
  "
/>

</Link>


<div
className="
flex
items-center

gap-4
md:gap-16

text-[#55614A]

text-[13px]
md:text-[16px]

tracking-[0.08em]
md:tracking-[0.18em]

uppercase
"
>

    <a
      href="/shop"
      className="
      hover:opacity-60
      duration-300
      "
    >
      Shop
    </a>


    <a
      href="#about"
      className="
      hover:opacity-60
      duration-300
      "
    >
      About
    </a>


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


    

  </div>

</nav>


{/* HERO */}

<section
className="
px-8
md:px-20
pt-10
pb-24
overflow-hidden
animate-[fade_0.9s_ease]
reveal
"
>

<div
className="
grid
grid-cols-1
lg:grid-cols-[1.1fr_0.9fr]

items-center

gap-10
md:gap-20
"
>
    {/* LEFT */}

    <div>

      <p className="tracking-[0.35em] text-[#66705D] text-sm md:text-lg">
        PURE BOTANICAL CARE
      </p>

<h1
className="
mt-8
text-[64px]
sm:text-[90px]
md:text-[180px]

leading-[0.9]

text-[#55614A]
"
>     
   Meloniq
      </h1>

      <p className="mt-8 text-[22px] md:text-[28px] text-[#66705D] max-w-[620px] leading-relaxed">
        Handmade botanical products inspired by nature.
      </p>

      <div className="flex gap-5 mt-12 flex-wrap">

        <a
          href="/shop"
          className="
          px-12
          py-5
          rounded-full
          bg-[#55614A]
          text-white
          text-xl
          hover:scale-105
          duration-300
          "
        >
          Shop
        </a>

        </div>

    </div>



    {/* RIGHT */}

    <div className="relative flex justify-center">

      <div
        className="
        absolute
        w-[85%]
        h-[85%]
        md:w-[80%]
        md:h-[80%]
      
        bg-[#D9DECB]
        rounded-[60px]
        right-0
        top-[30px]
md:top-[60px]
        "
      />

      <Image
        src="/images/product.jpg"
        alt="Product"
        width={850}
        height={850}
        priority
        className="
relative
z-10

rounded-[30px]
md:rounded-[50px]

object-cover

w-full

max-w-[320px]
md:max-w-[720px]

mx-auto

shadow-2xl
"
      />

     

    </div>

  </div>

</section>
{/* ABOUT */}

<section
  id="about"
  className="
  px-8
  md:px-16
  py-32
  "
>

  <div
    className="
    max-w-[1400px]
    mx-auto
    "
  >

    <p
      className="
      tracking-[0.35em]
      text-[#66705D]
      text-sm
      "
    >
      OUR PHILOSOPHY
    </p>


    <div
      className="
      mt-10
      grid
      md:grid-cols-[1.4fr_0.8fr]
      gap-20
      items-start
      "
    >

      <div>

        <h2
          className="
          text-[48px]
          md:text-[80px]
          leading-[1]
          text-[#55614A]
          "
        >
          Botanical care
          designed to feel
          calm and timeless.
        </h2>

      </div>



      <div>

        <p
          className="
          text-[20px]
          md:text-[28px]
          leading-[1.9]
          text-[#66705D]
          "
        >
          Meloniq started as a simple family hobby
          making natural soap, before it grew into a
          craft we truly care about. Every product is
          handmade in a small workshop, using carefully
          chosen natural ingredients gentle enough even
          for sensitive skin.
        </p>

      </div>

    </div>


    <div
      className="
      mt-20
      grid
      grid-cols-2
      md:grid-cols-4
      gap-10
      "
    >

      <div>
        <h3 className="text-[40px] md:text-[48px] text-[#55614A]">
          100%
        </h3>
        <p className="mt-2 text-[#66705D] text-base md:text-lg">
          Natural Ingredients
        </p>
      </div>

      <div>
        <h3 className="text-[40px] md:text-[48px] text-[#55614A]">
          Fully
        </h3>
        <p className="mt-2 text-[#66705D] text-base md:text-lg">
          Handmade
        </p>
      </div>

      <div>
        <h3 className="text-[40px] md:text-[48px] text-[#55614A]">
          Gentle
        </h3>
        <p className="mt-2 text-[#66705D] text-base md:text-lg">
          For Sensitive Skin
        </p>
      </div>

      <div>
        <h3 className="text-[40px] md:text-[48px] text-[#55614A]">
          Free
        </h3>
        <p className="mt-2 text-[#66705D] text-base md:text-lg">
          From Harsh Chemicals
        </p>
      </div>

    </div>

  </div>

</section>
      {/* PRODUCTS */}

<section className="px-8 md:px-16 py-24">

  <h2
    className="
    text-center
    text-[40px]
    md:text-[70px]
    text-[#55614A]
    reveal
    "
  >
    Featured Collection
  </h2>

  <div
   className="
grid

grid-cols-1
sm:grid-cols-2
md:grid-cols-3

gap-8
md:gap-10

mt-20
"
  >

    {[
      {
        image: "/images/p1.jpg",
        title: "Soap",
      },

      {
        image: "/images/p2.jpg",
        title: "Body Oil",
      },

      {
        image: "/images/p3.jpg",
        title: "Cream",
      },

    ].map((item) => (

      <a
        href="/shop"
        key={item.title}
        className="
        block
        bg-[#D7DCCB]
        rounded-[40px]
        overflow-hidden
        hover:-translate-y-2
        hover:shadow-2xl
        duration-500
        reveal
        "
      >

        <Image
          src={item.image}
          alt={item.title}
          width={700}
          height={700}
      className="
w-full

h-[260px]
md:h-[420px]

object-cover

hover:scale-[1.03]

duration-700
"
        />



        <div className="p-8">

          <h3
         className="
text-2xl
md:text-4xl

text-[#55614A]
"
          >
            {item.title}
          </h3>


          <p
            className="
            mt-4
            text-[#66705D]
            text-lg
            reveal
            "
          >
            Crafted with clean ingredients.
          </p>


          <p
            className="
            mt-10
            uppercase
            tracking-[0.15em]
            text-[#55614A]
            text-sm
            reveal
            "
          >
            View Collection →
          </p>

        </div>

      </a>

    ))}

  </div>

</section>





{/* FOOTER */}
<footer
  id="footer"
  className="
  py-16
  border-t
  border-[#C7CDB6]
  text-center
  text-[#55614A]
  "
>
  <div className="space-y-8">

    <h3 className="text-3xl">
      Meloniq
    </h3>

    <p className="text-sm opacity-70 max-w-[400px] mx-auto">
      Handmade botanical care inspired by calm rituals.
    </p>

    {/* SOCIAL ICONS */}
    <div
      className="
      flex
      justify-center
      items-center
      gap-8
      pt-2
      "
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/201227788169"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="
        text-[#55614A]
        opacity-80
        hover:opacity-100
        hover:scale-110
        duration-300
        "
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M20.5 11.9c0 4.7-3.9 8.6-8.6 8.6-1.5 0-2.9-.4-4.1-1.1L3.5 20.5l1.1-4.2c-.8-1.3-1.3-2.8-1.3-4.4 0-4.7 3.9-8.6 8.6-8.6s8.6 3.9 8.6 8.6z" />
          <path d="M8.7 8.6c.1-.3.4-.5.7-.5h.6c.2 0 .4.1.5.3l.7 1.5c.1.2.1.4 0 .6l-.4.6c-.1.2-.1.4 0 .6.4.7 1.3 1.6 2 2 .2.1.4.1.6 0l.6-.4c.2-.1.4-.1.6 0l1.5.7c.2.1.3.3.3.5v.6c0 .3-.2.6-.5.7-.6.2-1.5.4-2.4-.1-1.4-.6-2.8-2-3.4-3.4-.5-.9-.3-1.8-.1-2.4z" />
        </svg>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/meloniq23"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="
        text-[#55614A]
        opacity-80
        hover:opacity-100
        hover:scale-110
        duration-300
        "
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/profile.php?id=61580340421564"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="
        text-[#55614A]
        opacity-80
        hover:opacity-100
        hover:scale-110
        duration-300
        "
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M14 21v-7h2.4l.4-3H14V9c0-.9.3-1.5 1.6-1.5H17V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7" />
        </svg>
      </a>
    </div>

    <p className="text-sm opacity-60 pt-4">
      © 2026 Meloniq
    </p>

  </div>
</footer>

    </main>
  );
}