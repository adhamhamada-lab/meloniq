"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");

  const inputStyle = `
    bg-white text-[#55614A] placeholder:text-[#7C8572]
    rounded-full px-7 py-5 outline-none border border-transparent
    focus:border-[#55614A] duration-300 text-lg w-full
  `;

  async function send(e: any) {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    const form = new FormData(e.target);

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        contact: form.get("contact"),
        address: form.get("address"),
        items: items.map((i) => ({ product: i.title, quantity: i.quantity })),
      }),
    });

    setLoading(false);

    if (res.ok) {
      clearCart();
      setDone(true);
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="bg-[#E4E7D6] min-h-screen">
      <Navbar />

      <section className="px-8 md:px-16 pt-10 pb-32">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start">

          {/* LEFT - Order Summary */}
          <div>
            <p className="tracking-[0.35em] text-[#66705D] text-sm">CHECKOUT</p>
            <h1 className="mt-4 text-[60px] md:text-[90px] leading-[0.9] text-[#55614A]">
              Your Order
            </h1>

            <div className="mt-10 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.slug} className="flex justify-between items-center py-4 border-b border-[#C7CDB6]">
                  <div>
                    <p className="text-[#55614A] text-lg">{item.title}</p>
                    <p className="text-[#66705D] text-sm">× {item.quantity}</p>
                  </div>
                  <p className="text-[#55614A]">
                    {parseInt(item.price.replace(/[^0-9]/g, "")) * item.quantity} EGP
                  </p>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4">
                <p className="text-[#66705D] uppercase tracking-[0.2em] text-sm">Total</p>
                <p className="text-[#55614A] text-3xl">{total} EGP</p>
              </div>
            </div>

            <Link
              href="/cart"
              className="inline-block mt-8 text-[#66705D] text-sm uppercase tracking-[0.15em] hover:opacity-60 duration-300"
            >
              ← Edit Cart
            </Link>
          </div>

          {/* RIGHT - Form or Success */}
          {done ? (
            <div className="bg-[#D7DCCB] rounded-[40px] p-10 text-center shadow-2xl mt-10 lg:mt-16">
              <div className="text-[60px]">✓</div>
              <h2 className="text-[40px] text-[#55614A]">Order Submitted</h2>
              <p className="mt-4 text-[#66705D]">Thank you for choosing Meloniq</p>
              <Link
                href="/shop"
                className="inline-block mt-8 px-8 py-4 rounded-full bg-[#55614A] text-white hover:scale-105 duration-300"
              >
                Back to Shop
              </Link>
            </div>
          ) : (
            <form
              onSubmit={send}
              className="bg-[#D7DCCB] rounded-[40px] p-8 md:p-12 flex flex-col gap-6 mt-10 lg:mt-16"
            >
              <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm">Your Details</p>

              <input
                required
                name="name"
                placeholder="Full Name"
                className={inputStyle}
              />

              <input
                required
                name="contact"
                placeholder="Phone Number"
                className={inputStyle}
              />

              <textarea
                required
                name="address"
                placeholder="Delivery Address"
                rows={4}
                className="
                  bg-white text-[#55614A] placeholder:text-[#7C8572]
                  rounded-[32px] px-7 py-5 outline-none border border-transparent
                  focus:border-[#55614A] resize-none duration-300 text-lg
                "
              />

              {items.length === 0 && (
                <p className="text-[#66705D] text-sm text-center">
                  Your cart is empty.{" "}
                  <Link href="/shop" className="underline">Browse Shop</Link>
                </p>
              )}

              {message && (
                <div className="rounded-[24px] bg-[#55614A] text-white py-4 px-6 text-center">
                  {message}
                </div>
              )}

              <button
                disabled={loading || items.length === 0}
                className="mt-2 bg-[#55614A] text-white rounded-full py-6 text-xl uppercase tracking-[0.12em] hover:scale-[1.02] hover:opacity-95 duration-300 disabled:opacity-70"
              >
                {loading ? "Placing Order..." : `Place Order · ${total} EGP`}
              </button>
            </form>
          )}

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
            <a href="https://wa.me/201221851545" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[#55614A] opacity-80 hover:opacity-100 hover:scale-110 duration-300">
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