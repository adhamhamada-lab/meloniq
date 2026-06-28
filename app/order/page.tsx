"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const PRODUCTS = [
  "Tea Tree Oil Soap",
  "Argan & Frankincense Soap",
  "Cream",
  "Shampoo Bar",
  "Face Serum",
  "Lip Balm",
];

type Item = {
  product: string;
  quantity: number;
};

function OrderContent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const params = useSearchParams();
  const initialProduct = params.get("product") || "";

  const [items, setItems] = useState<Item[]>([
    { product: initialProduct, quantity: 1 },
  ]);

  function updateItem(index: number, field: keyof Item, value: string | number) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  function addItem() {
    setItems((prev) => [...prev, { product: "", quantity: 1 }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function send(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        contact: form.get("contact"),
        address: form.get("address"),
        items,
      }),
    });

    setLoading(false);

    if (res.ok) {
      setDone(true);
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  }

  const inputStyle = `
bg-white
text-[#55614A]
placeholder:text-[#7C8572]
rounded-full
px-7
py-5
outline-none
border
border-transparent
focus:border-[#55614A]
duration-300
text-lg
w-full
`;

  return (
    <main className="bg-[#E4E7D6] min-h-screen">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#E4E7D6] px-8 md:px-16 py-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logooo.png"
            alt="Meloniq"
            width={260}
            height={100}
            className="w-[130px] h-auto"
          />
        </Link>
        <Link
          href="/shop"
          className="uppercase tracking-[0.18em] text-[#55614A] hover:opacity-60 duration-300"
        >
          Back
        </Link>
      </nav>

      {/* CONTENT */}
      <section className="px-6 md:px-20 pt-10 pb-24 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] items-center gap-10 md:gap-20 max-w-[1400px] mx-auto">

          {/* LEFT */}
          <div>
            <p className="tracking-[0.35em] text-[#66705D] text-sm">
              PLACE YOUR ORDER
            </p>
            <h1 className="mt-6 text-[64px] sm:text-[90px] md:text-[180px] leading-[0.9] text-[#55614A]">
              Order
            </h1>
            <p className="mt-8 text-[#66705D] text-[22px] leading-relaxed max-w-[520px]">
              Enter your details.
            </p>
          </div>

          {/* RIGHT */}
          {done ? (
            <div className="bg-[#D7DCCB] rounded-[40px] p-10 text-center shadow-2xl">
              <div className="text-[60px]">✓</div>
              <h2 className="text-[40px] text-[#55614A]">Order Submitted</h2>
              <p className="mt-4 text-[#66705D]">Thank you for choosing Meloniq</p>
              <Link
                href="/shop"
                className="inline-block mt-8 px-8 py-4 rounded-full bg-[#55614A] text-white"
              >
                Back to Shop
              </Link>
            </div>
          ) : (
            <form
              onSubmit={send}
              className="bg-[#D7DCCB] rounded-[30px] md:rounded-[60px] p-6 md:p-14 shadow-2xl w-full max-w-[700px] mx-auto flex flex-col gap-6"
            >
              {/* Name */}
              <input
                required
                name="name"
                placeholder="Full Name"
                className={inputStyle}
              />

              {/* Items */}
              <div className="flex flex-col gap-4">
                <p className="text-[#66705D] tracking-[0.15em] uppercase text-sm px-2">
                  Products
                </p>

                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center">

                    {/* Product select */}
                    <select
                      required
                      value={item.product}
                      onChange={(e) => updateItem(index, "product", e.target.value)}
                      className="
                      bg-white
                      text-[#55614A]
                      rounded-full
                      px-7
                      py-5
                      outline-none
                      border
                      border-transparent
                      focus:border-[#55614A]
                      duration-300
                      text-lg
                      flex-1
                      "
                    >
                      <option value="" disabled>Select product</option>
                      {PRODUCTS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>

                    {/* Quantity */}
                    <input
                      required
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                      className="
                      bg-white
                      text-[#55614A]
                      rounded-full
                      px-5
                      py-5
                      outline-none
                      border
                      border-transparent
                      focus:border-[#55614A]
                      duration-300
                      text-lg
                      w-[90px]
                      text-center
                      "
                    />

                    {/* Remove button */}
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="
                        w-10 h-10
                        rounded-full
                        bg-white
                        text-[#55614A]
                        hover:bg-[#55614A]
                        hover:text-white
                        duration-300
                        text-xl
                        flex items-center justify-center
                        shrink-0
                        "
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}

                {/* Add item button */}
                <button
                  type="button"
                  onClick={addItem}
                  className="
                  self-start
                  px-6 py-3
                  rounded-full
                  border
                  border-[#55614A]
                  text-[#55614A]
                  text-sm
                  uppercase
                  tracking-[0.1em]
                  hover:bg-[#55614A]
                  hover:text-white
                  duration-300
                  "
                >
                  + Add Item
                </button>
              </div>

              {/* Contact */}
              <input
                required
                name="contact"
                placeholder="Phone Number"
                className={inputStyle}
              />

              {/* Address */}
              <textarea
                required
                name="address"
                placeholder="Address"
                rows={5}
                className="
                bg-white
                text-[#55614A]
                placeholder:text-[#7C8572]
                rounded-[32px]
                px-7
                py-5
                outline-none
                border
                border-transparent
                focus:border-[#55614A]
                resize-none
                duration-300
                text-lg
                "
              />

              {message && (
                <div className="rounded-[24px] bg-[#55614A] text-white py-4 px-6 text-center">
                  {message}
                </div>
              )}

              <button
                disabled={loading}
                className="
                mt-2
                bg-[#55614A]
                text-white
                rounded-full
                py-6
                text-xl
                uppercase
                tracking-[0.12em]
                hover:scale-[1.02]
                hover:opacity-95
                duration-300
                disabled:opacity-70
                "
              >
                {loading ? "Sending..." : "Submit Order"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="py-16 border-t border-[#C7CDB6] text-center text-[#55614A]">
        <div className="space-y-8">
          <h3 className="text-3xl">Meloniq</h3>
          <p className="text-sm opacity-70 max-w-[400px] mx-auto">
            Handmade botanical care inspired by calm rituals.
          </p>
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

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderContent />
    </Suspense>
  );
}