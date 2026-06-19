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
reveal
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
      reveal
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
      reveal
      "
    >

      <div>

        <h2
          className="
          text-[48px]
          md:text-[80px]
          leading-[1]
          text-[#55614A]
          reveal
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
          reveal
          "
        >
          Meloniq creates products inspired
          by natural ingredients and everyday
          rituals. Simple textures, calm colors
          and handmade care.
        </p>


        <div
          className="
          mt-12
          flex
          gap-10
          reveal
          "
        >

          {/* <div>

            <h3
              className="
              text-[48px]
              text-[#55614A]
              "
            >
              100%
            </h3>

            <p className="text-[#66705D]">
              Handmade
            </p>

          </div> */}



          

        </div>

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

{/* NEWSLETTER */}

<section
  className="
  px-8
  md:px-16
  pb-32
  reveal
  "
>

  <div
    className="
    bg-[#D7DCCB]
    rounded-[30px]
md:rounded-[50px]

px-6
md:px-20

py-14
md:py-20
    text-center
    reveal
    "
  >

    <p
      className="
      tracking-[0.35em]
      text-[#66705D]
      text-sm
      reveal
      "
    >
      STAY CONNECTED
    </p>


    <h2
      className="
      mt-8
      text-[34px]
sm:text-[48px]
md:text-[72px]
      leading-[1]
      text-[#55614A]
      reveal
      "
    >
      Join the Meloniq world
    </h2>


    <p
      className="
      mt-8
      text-[#66705D]
      text-[20px]
      md:text-[26px]
      max-w-[700px]
      mx-auto
      reveal
      "
    >
      Receive updates about new collections,
      launches and botanical inspiration.
    </p>



    <form
onSubmit={async (e) => {

e.preventDefault();

const email =
e.currentTarget.email.value;

await fetch(
"/api/subscribe",
{
method:"POST",

headers:{
"Content-Type":
"application/json",
},

body:
JSON.stringify({
email,
}),
}
);

alert("Subscribed ✅");

}}

className="
mt-14
flex
flex-col
md:flex-row
justify-center
gap-5
"
>

<input
type="email"

name="email"

required

placeholder="Your email"

className="
px-8
py-5
rounded-full
bg-white
outline-none

w-full
max-w-[420px]

text-[#55614A]
"
/>

<button
type="submit"

className="
px-12
py-5
rounded-full
bg-[#55614A]
text-white

hover:scale-105
duration-300
"
>

Subscribe

</button>

</form>

  </div>

</section>

{/* FOOTER */}

<footer
id="footer"
className="
border-t
border-[#CCD2BE]

px-8
md:px-16

py-20
reveal
"
>

<div
className="
flex
flex-col
md:flex-row

justify-between
items-center

gap-12
reveal
"
>

{/* LEFT */}

<div>

<h3
className="
text-[42px]
text-[#55614A]
leading-none
reveal
"
>
Meloniq
</h3>

<p
className="
mt-4
text-[#66705D]
max-w-[340px]
leading-relaxed
reveal
"
>
Handmade botanical care inspired by calm rituals.
</p>

</div>



{/* RIGHT */}

<div
className="
flex
flex-wrap

justify-center

gap-6
md:gap-10

uppercase
tracking-[0.18em]

text-sm
text-[#55614A]
reveal
"
>

<a
href="https://wa.me/201227788169"
target="_blank"
className="hover:opacity-50 duration-300"
>
Whatsapp
</a>


<a
href="https://www.instagram.com/meloniq23?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
target="_blank"
className="hover:opacity-50 duration-300"
>
Instagram
</a>


<a
href="https://www.facebook.com/profile.php?id=61580340421564"
target="_blank"
className="hover:opacity-50 duration-300"
>
Facebook
</a>


{/* <a
href="mailto:hello@meloniq.com"
target="_blank"
className="hover:opacity-50 duration-300"
>
Email
</a> */}

</div>

</div>



<div
className="
mt-16
pt-8

border-t
border-[#CCD2BE]

text-center

text-[#66705D]
text-sm
"
>

© 2026 Meloniq

</div>

</footer>

    </main>
  );
}