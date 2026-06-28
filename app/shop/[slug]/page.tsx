"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";

const products = [
  {
    slug: "teatreeoilsoap",
    name: "Tea Tree Oil Soap",
    category: "For Oily & Acne-Prone Skin",
    use: "Purifies Oily Skin, Helps Reduce Breakouts & Leaves the Skin Fresh, Balanced, and Healthy-Looking.",
    image: "/images/teatreeoilsoap.jpeg",
    price: "115 EGP",
    ingredients: [
      { name: "Sweet Almond Oil", desc: "Nourishes & Softens Skin" },
      { name: "Tea Tree Essential Oil", desc: "Helps Reduce Acne-Causing Bacteria" },
      { name: "Peppermint", desc: "Refreshes & Soothes Skin" },
      { name: "Lemon Essential Oil", desc: "Helps Control Excess Oil" },
    ],
  recommendedFor: [
      "Oily Skin",
      "Combination Skin",
      "Acne-Prone Skin",
    ], 
  
  },
  {
    slug: "argan-frankincense-soap",
    name: "Argan & Frankincense Soap",
    category: "Anti-Wrinkle & Skin Nourishing Soap",
    use: "Helps Improve Skin Elasticity While Nourishing & Hydrating for a Smoother, More Youthful Appearance.",
    image: "/images/Argan & Frankincense Soap.jpeg",
    price: "115 EGP",
    ingredients: [
      { name: "Argan Oil", desc: "Deeply Nourishes the Skin" },
      { name: "Frankincense", desc: "Improves Skin Elasticity" },
      { name: "Jasmine", desc: "Softens & Revitalizes Skin" },
      { name: "Beeswax", desc: "Locks in Moisture" },
     ],
     recommendedFor: [
  "Dry Skin",
  "Normal Skin",
  "Combination Skin",
  "Mature Skin",
  "Aging Skin",
],
  },
  {
    slug: "licoriceoilsoap",
    name: "Licorice Oil Soap",
    category: "Brightening & Even Skin Tone",
    use: "Helps Brighten, Nourish & Restore a Smooth, Healthy-Looking Complexion.",
    image: "/images/licoriceoilsoap.jpeg",
    price: "140 EGP",
    ingredients: [
     { name: "Licorice Root Oil", desc: "Helps Brighten Skin Tone" },
     { name: "Lavender Essential Oil", desc: "Soothes & Calms Skin" },
     { name: "Sweet Almond Oil", desc: "Nourishes & Softens Skin" },
     { name: "Beeswax", desc: "Locks in Moisture" }, 
    ],
  recommendedFor: [
  "Normal Skin",
  "Dry Skin",
  "Combination Skin",
  "Dull Skin",
  "Uneven Skin Tone",
],
  
  },
  {
    slug: "saadoilsoap",
    name: "Saad Oil Soap",
    category: "Nourishing & Skin Softening",
    use: "Deeply Nourishes, Softens & Helps Maintain Smooth, Healthy-Looking Skin.",
    image: "/images/saadoilsoap.jpeg",
    price: "160 EGP",
    ingredients: [
    { name: "Cyperus Rotundus (Saad) Oil", desc: "Helps Soothe & Condition Skin" },
    { name: "Shea Butter", desc: "Deeply Moisturizes Skin" },
    { name: "Lavender Essential Oil", desc: "Calms & Soothes Skin" },
    { name: "Frankincense", desc: "Helps Improve Skin Elasticity" },
    { name: "Sweet Almond Oil", desc: "Nourishes & Softens Skin" },
    { name: "Goat Milk", desc: "Gently Exfoliates & Smooths Skin" },
    ],
    recommendedFor: [
  "Dry Skin",
  "Sensitive Skin",
  "Normal Skin",
  "Combination Skin",
  "All Skin Types",
],
  },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addItem({
        slug: product!.slug,
        title: product!.name,
        price: product!.price || "0 EGP",
        image: product!.image,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="bg-[#E4E7D6] min-h-screen">

      <Navbar />

      <section className="px-8 md:px-16 pt-10 pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#D9DECB] rounded-[50px] translate-x-4 translate-y-4" />
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              priority
              className="relative z-10 w-full rounded-[40px] object-cover shadow-2xl"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col gap-8">

            <div>
              <p className="tracking-[0.35em] text-[#66705D] text-sm uppercase">{product.category}</p>
              <h1 className="mt-4 text-[60px] md:text-[90px] leading-[0.9] text-[#55614A]">{product.name}</h1>
              <p className="mt-4 text-[#66705D] text-lg md:text-xl leading-relaxed">{product.use}</p>
            </div>

{product.ingredients.length > 0 && (

  <div>
    <p className="tracking-[0.25em] text-[#55614A] text-sm uppercase mb-5 font-medium">
      Key Ingredients
    </p>

```
<div className="grid grid-cols-2 gap-4">

  {product.ingredients.map((ing) => (

    <div
      key={ing.name}
      className="
      bg-[#D7DCCB]
      rounded-[22px]
      px-6
      py-5
      border
      border-[#C7CDB6]
      shadow-sm
      "
    >

      <p
        className="
        text-[#4B5642]
        text-[18px]
        font-semibold
        leading-tight
        "
      >
        {ing.name}
      </p>

      <p
        className="
        text-[#55614A]
        text-[14px]
        leading-7
        mt-3
        opacity-90
        "
      >
        {ing.desc}
      </p>

    </div>

  ))}

</div>
```

  </div>
)}
{product.recommendedFor && product.recommendedFor.length > 0 && (
  <div>
    <p className="tracking-[0.25em] text-[#55614A] text-sm uppercase mb-4 font-medium">
      Recommended For
    </p>
    <div className="flex flex-col gap-2">
      {product.recommendedFor.map((item) => (
        <div key={item} className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#55614A] shrink-0" />
          <p className="text-[#55614A] text-base">{item}</p>
        </div>
      ))}
    </div>
  </div>
)}


            <div className="flex flex-col gap-4">

              {product.price && (
                <p className="text-[#55614A] text-3xl">{product.price}</p>
              )}

              <div className="flex items-center gap-4">
                <p className="text-[#66705D] tracking-[0.15em] uppercase text-sm">Qty</p>
                <div className="flex items-center gap-3 bg-[#D7DCCB] rounded-full px-4 py-2">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-full text-[#55614A] hover:bg-[#55614A] hover:text-white duration-300 text-xl flex items-center justify-center">−</button>
                  <span className="text-[#55614A] text-lg w-6 text-center">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="w-8 h-8 rounded-full text-[#55614A] hover:bg-[#55614A] hover:text-white duration-300 text-xl flex items-center justify-center">+</button>
                </div>
              </div>

             
              {/* <button
  onClick={handleAddToCart}
  className={`px-12 py-5 rounded-full text-xl text-center duration-300 ${added ? "bg-[#D7DCCB] text-[#55614A]" : "border border-[#55614A] text-[#55614A] hover:bg-[#55614A] hover:text-white"}`}
>
  {added ? "Added to Cart ✓" : "Add to Cart"}
</button> */}

              <Link
                href={`/preorder?product=${encodeURIComponent(product.name)}`}
                onClick={handleAddToCart}
                className="px-12 py-5 rounded-full bg-[#55614A] text-white text-xl text-center hover:scale-[1.02] duration-300"
              >
                 Pre-Order Now
              </Link>

              <Link href="/shop" className="text-center text-[#66705D] text-sm tracking-[0.15em] uppercase hover:opacity-60 duration-300">
                ← Back to Shop
              </Link>

            </div>
          </div>
        </div>
      </section>

 <footer id="footer" className="py-16 border-t border-[#C7CDB6] text-center text-[#55614A]">
    <div className="space-y-8">
      <h1 className="text-6xl tracking-[-0.1em]">
  <em>m</em>eloniq
</h1>
          <p className="text-sm opacity-70 max-w-[400px] mx-auto">Handmade botanical care inspired by calm rituals.</p>
          <div className="flex justify-center items-center gap-8 pt-2">
            <a href="https://wa.me/201227788169" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[#55614A] opacity-80 hover:opacity-100 hover:scale-110 duration-300">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/meloniq23" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#55614A] opacity-80 hover:opacity-100 hover:scale-110 duration-300">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61580340421564" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#55614A] opacity-80 hover:opacity-100 hover:scale-110 duration-300">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M14 21v-7h2.4l.4-3H14V9c0-.9.3-1.5 1.6-1.5H17V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7" />
              </svg>
            </a>
          </div>
          <p className="text-sm opacity-60 pt-4">© 2026 Meloniq</p>
        </div>
      </footer>
    </main>
  );
}