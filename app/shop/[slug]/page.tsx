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
    price: "150 EGP",
    ingredients: [
      { name: "Sweet Almond Oil", desc: "Nourishes & Softens Skin" },
      { name: "Tea Tree Essential Oil", desc: "Helps Reduce Acne-Causing Bacteria" },
      { name: "Peppermint", desc: "Refreshes & Soothes Skin" },
      { name: "Lemon Essential Oil", desc: "Helps Control Excess Oil" },
    ],
  },
  {
    slug: "p2",
    name: "p2",
    category: "Coming Soon",
    use: "Details coming soon.",
    image: "/images/p2.jpg",
    price: "",
    ingredients: [],
  },
  {
    slug: "p3",
    name: "p3",
    category: "Coming Soon",
    use: "Details coming soon.",
    image: "/images/p3.jpg",
    price: "",
    ingredients: [],
  },
  {
    slug: "p4",
    name: "p4",
    category: "Coming Soon",
    use: "Details coming soon.",
    image: "/images/p1.jpg",
    price: "",
    ingredients: [],
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
                <p className="tracking-[0.25em] text-[#66705D] text-xs uppercase mb-4">Key Ingredients</p>
                <div className="grid grid-cols-2 gap-3">
                  {product.ingredients.map((ing) => (
                    <div key={ing.name} className="bg-[#D7DCCB] rounded-[20px] px-5 py-4">
                      <p className="text-[#55614A] font-medium text-sm">{ing.name}</p>
                      <p className="text-[#66705D] text-xs mt-1 leading-relaxed">{ing.desc}</p>
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

              <button
                onClick={handleAddToCart}
                className={`px-12 py-5 rounded-full text-xl text-center duration-300 ${added ? "bg-[#D7DCCB] text-[#55614A]" : "border border-[#55614A] text-[#55614A] hover:bg-[#55614A] hover:text-white"}`}
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>

              <Link
                href="/checkout"
                onClick={handleAddToCart}
                className="px-12 py-5 rounded-full bg-[#55614A] text-white text-xl text-center hover:scale-[1.02] duration-300"
              >
                Buy Now
              </Link>

              <Link href="/shop" className="text-center text-[#66705D] text-sm tracking-[0.15em] uppercase hover:opacity-60 duration-300">
                ← Back to Shop
              </Link>

            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-[#C7CDB6] text-center text-[#55614A]">
        <div className="space-y-8">
          <h3 className="text-3xl">Meloniq</h3>
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