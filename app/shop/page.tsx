"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const products = [
  {
    image: "/images/teatreeoilsoap.jpeg",
    title: "Tea Tree Oil Soap",
    price: "115 EGP",
    slug: "teatreeoilsoap",
  },
  {
    image: "/images/Argan & Frankincense Soap.jpeg",
    title: "Argan & Frankincense Soap",
    price: "115 EGP",
    slug: "argan-frankincense-soap",
  },
  {
    image: "/images/licoriceoilsoap.jpeg",
    title: "Licorice Oil Soap",
    price: "140 EGP",
    slug: "licoriceoilsoap",
  },
  {
    image: "/images/saadoilsoap.jpeg",
    title: "Saad Oil Soap",
    price: "160 EGP",
    slug: "saadoilsoap",
  },

];

export default function Shop() {


  return (
    <main className="bg-[#E4E7D6] min-h-screen">

<Navbar />

      {/* PAGE HEADER */}
      <section className="px-8 md:px-16 pt-10 pb-16 text-center">
        <p className="tracking-[0.35em] text-[#66705D] text-sm">ALL PRODUCTS</p>
        <h1 className="mt-6 text-[48px] md:text-[90px] leading-[1] text-[#55614A]">Shop</h1>
        <p className="mt-6 text-[18px] md:text-[22px] text-[#66705D] max-w-[600px] mx-auto">
          Discover our full collection of handmade botanical products.
        </p>
      </section>

      {/* PRODUCTS GRID */}
      <section className="px-8 md:px-16 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mt-20">
          {products.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="bg-[#D7DCCB] rounded-[40px] overflow-hidden hover:-translate-y-3 hover:shadow-2xl hover:scale-[1.01] duration-500"
            >
              <Link href={item.slug ? `/shop/${item.slug}` : "#"}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={700}
                  height={700}
                  className="w-full h-[420px] object-cover hover:scale-[1.03] duration-700"
                />
              </Link>

              <div className="p-8">
                <Link href={item.slug ? `/shop/${item.slug}` : "#"}>
                  <h3 className="text-4xl text-[#55614A] hover:opacity-70 duration-300">
                    {item.title}
                  </h3>
                </Link>

                <p className="mt-4 text-[#66705D] text-lg">Crafted with clean ingredients.</p>

                <div className="mt-10 flex items-center justify-between">
                  <p className="text-[#55614A] text-xl">{item.price}</p>

                  {item.slug ? (
                    <Link
                      href={`/shop/${item.slug}`}
                      className="px-8 py-3 rounded-full border border-[#55614A] text-[#55614A] text-sm uppercase tracking-[0.1em] hover:bg-[#55614A] hover:text-white duration-300"
                    >
                      View →
                    </Link>
                  ) : (
                    <Link
                      href={`/order?product=${encodeURIComponent(item.title)}`}
                      className="px-8 py-3 rounded-full bg-[#55614A] text-white text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300 inline-block"
                    >
                      Order Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
{/* PRE-ORDER BANNER */}
<section className="px-8 md:px-16 pb-24">
  <div className="bg-[#D7DCCB] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
    <div>
      <p className="tracking-[0.35em] text-[#66705D] text-sm uppercase">Can't find what you're looking for?</p>
      <h2 className="mt-4 text-[36px] md:text-[56px] leading-[1] text-[#55614A]">
        Reserve Before It's Made
      </h2>
      <p className="mt-4 text-[#66705D] text-lg max-w-[500px] leading-relaxed">
        Place a pre-order and we'll craft your products fresh. Pay on delivery, no upfront payment needed.
      </p>
    </div>
    <Link
      href="/preorder"
      className="shrink-0 px-10 py-5 rounded-full bg-[#55614A] text-white text-lg uppercase tracking-[0.1em] hover:scale-105 duration-300"
    >
      Pre-Order Now →
    </Link>
  </div>
</section>
      {/* FOOTER */}
  <footer id="footer" className="py-16 border-t border-[#C7CDB6] text-center text-[#55614A]">
    <div className="space-y-8">
      <h1 className="text-6xl tracking-[-0.1em]">
  <em>m</em>eloniq
</h1>
          <p className="text-sm opacity-70 max-w-[400px] mx-auto">Handmade botanical care inspired by calm rituals.</p>
          <div className="flex justify-center items-center gap-8 pt-2">
            <a href="https://wa.me/20 12 21851545" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[#55614A] opacity-80 hover:opacity-100 hover:scale-110 duration-300">
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