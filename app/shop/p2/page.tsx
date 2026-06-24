"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const product = {
  slug: "p2",
  name: "p2",
  category: "Hydrating Botanical Soap",
  use: "Deep Hydration & Skin Nourishment",
  image: "/images/p2.jpeg",
  price: "",
  ingredients: [
    { name: "Argan Oil", desc: "Deeply nourishes and softens skin" },
    { name: "Frankincense", desc: "Luban Dhakar — renews and tones" },
    { name: "Jasmine", desc: "Calms and gently perfumes the skin" },
    { name: "Sweet Almond Oil", desc: "Soothes and locks in moisture" },
  ],
};

export default function p2Page() {
  const [qty, setQty] = useState(1);

  return (
    <main className="bg-[#E4E7D6] min-h-screen">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#E4E7D6] px-8 md:px-16 py-2 md:py-3 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logooo.png"
            alt="Meloniq"
            width={260}
            height={100}
            priority
            className="w-[100px] md:w-[140px] h-auto object-contain hover:scale-[1.02] duration-300"
          />
        </Link>
        <div className="hidden md:flex items-center gap-16 text-[#55614A] text-[16px] tracking-[0.18em] uppercase">
          <Link href="/shop" className="hover:opacity-60 duration-300">Shop</Link>
          <Link href="/#about" className="hover:opacity-60 duration-300">About</Link>
          <a href="https://wa.me/201227788169" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 duration-300">Contact</a>
        </div>
        <Link href="/shop" className="md:hidden uppercase tracking-[0.18em] text-[#55614A] text-sm hover:opacity-60 duration-300">
          ← Shop
        </Link>
      </nav>

      {/* PRODUCT HERO */}
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
              <p className="tracking-[0.35em] text-[#66705D] text-sm uppercase">
                {product.category}
              </p>
              <h1 className="mt-4 text-[60px] md:text-[90px] leading-[0.9] text-[#55614A]">
                {product.name}
              </h1>
              <p className="mt-4 text-[#66705D] text-lg md:text-xl leading-relaxed">
                {product.use}
              </p>
            </div>

            {/* INGREDIENTS */}
            <div>
              <p className="tracking-[0.25em] text-[#66705D] text-xs uppercase mb-4">
                Key Ingredients
              </p>
              <div className="grid grid-cols-2 gap-3">
                {product.ingredients.map((ing) => (
                  <div
                    key={ing.name}
                    className="bg-[#D7DCCB] rounded-[20px] px-5 py-4"
                  >
                    <p className="text-[#55614A] font-medium text-sm">{ing.name}</p>
                    <p className="text-[#66705D] text-xs mt-1 leading-relaxed">{ing.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICE + QTY + ORDER */}
            <div className="flex flex-col gap-4">

              {product.price && (
                <p className="text-[#55614A] text-3xl">{product.price}</p>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <p className="text-[#66705D] tracking-[0.15em] uppercase text-sm">Qty</p>
                <div className="flex items-center gap-3 bg-[#D7DCCB] rounded-full px-4 py-2">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full text-[#55614A] hover:bg-[#55614A] hover:text-white duration-300 text-xl flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-[#55614A] text-lg w-6 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-8 h-8 rounded-full text-[#55614A] hover:bg-[#55614A] hover:text-white duration-300 text-xl flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Order button */}
              <Link
                href={`/order?product=${encodeURIComponent(product.name)}&quantity=${qty}`}
                className="
                px-12 py-5
                rounded-full
                bg-[#55614A]
                text-white
                text-xl
                text-center
                hover:scale-[1.02]
                duration-300
                "
              >
                Order Now
              </Link>

              <Link
                href="/shop"
                className="text-center text-[#66705D] text-sm tracking-[0.15em] uppercase hover:opacity-60 duration-300"
              >
                ← Back to Shop
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-[#C7CDB6] text-center text-[#55614A]">
        <div className="space-y-8">
          <h3 className="text-3xl">Meloniq</h3>
          <p className="text-sm opacity-70 max-w-[400px] mx-auto">
            Handmade botanical care inspired by calm rituals.
          </p>
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