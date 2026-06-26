"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart();

  return (
    <main className="bg-[#E4E7D6] min-h-screen">
      <Navbar />

      <section className="px-8 md:px-16 pt-10 pb-32 max-w-[1000px] mx-auto">

        <p className="tracking-[0.35em] text-[#66705D] text-sm">YOUR ORDER</p>
        <h1 className="mt-4 text-[60px] md:text-[90px] leading-[0.9] text-[#55614A]">Cart</h1>

        {items.length === 0 ? (
          <div className="mt-20 text-center">
            <p className="text-[#66705D] text-xl">Your cart is empty.</p>
            <Link
              href="/shop"
              className="inline-block mt-8 px-10 py-4 rounded-full bg-[#55614A] text-white text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="mt-12 flex flex-col gap-6">

            {/* Items */}
            {items.map((item) => (
              <div
                key={item.slug}
                className="bg-[#D7DCCB] rounded-[30px] p-6 flex items-center gap-6"
              >
                {/* Image */}
                <div className="shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-[16px] object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl text-[#55614A]">{item.title}</h3>
                  <p className="text-[#66705D] text-sm mt-1">{item.price}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2">
                  <button
                    onClick={() => updateQty(item.slug, item.quantity - 1)}
                    className="w-7 h-7 rounded-full text-[#55614A] hover:bg-[#55614A] hover:text-white duration-300 text-lg flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-[#55614A] w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.slug, item.quantity + 1)}
                    className="w-7 h-7 rounded-full text-[#55614A] hover:bg-[#55614A] hover:text-white duration-300 text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p className="text-[#55614A] text-lg w-[90px] text-right hidden md:block">
                  {parseInt(item.price.replace(/[^0-9]/g, "")) * item.quantity} EGP
                </p>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.slug)}
                  className="text-[#55614A] opacity-40 hover:opacity-100 duration-300 text-xl"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Total + Checkout */}
            <div className="mt-6 bg-[#D7DCCB] rounded-[30px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[#66705D] text-sm uppercase tracking-[0.2em]">Total</p>
                <p className="text-[#55614A] text-4xl mt-1">{total} EGP</p>
              </div>

              <div className="flex gap-4 flex-wrap justify-center">
                <Link
                  href="/shop"
                  className="px-8 py-4 rounded-full border border-[#55614A] text-[#55614A] text-sm uppercase tracking-[0.1em] hover:bg-[#55614A] hover:text-white duration-300"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/checkout"
                  className="px-8 py-4 rounded-full bg-[#55614A] text-white text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300"
                >
                  Checkout →
                </Link>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* FOOTER */}
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