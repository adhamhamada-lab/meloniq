"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/app/context/CartContext";


const PRODUCTS = [
  { name: "Tea Tree Oil Soap", price: 150 },
  { name: "Argan & Frankincense Soap", price: 115 },
  { name: "Licorice Oil Soap", price: 140 },
  { name: "Saad Oil Soap", price: 160 },
];

const DISCOUNTED_PRICES: Record<string, number> = {
  "Tea Tree Oil Soap": 105,
  "Argan & Frankincense Soap": 105,
  "Licorice Oil Soap": 125,
  "Saad Oil Soap": 145,
};

type Item = {
  product: string;
  quantity: number;
};

function PreorderContent() {
  const { items: cartItems } = useCart();
  const params = useSearchParams();
  const initialProduct = params.get("product") || "";
  const [items, setItems] = useState<Item[]>([{ product: initialProduct, quantity: 1 }]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");

  const [discountCode, setDiscountCode] = useState("");
  const [discountStatus, setDiscountStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [discountInfo, setDiscountInfo] = useState<{ type: string; value: number } | null>(null);
  const [validating, setValidating] = useState(false);

  function updateItem(index: number, field: keyof Item, value: string | number) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  function addItem() {
    setItems((prev) => [...prev, { product: "", quantity: 1 }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function validateDiscount() {
    if (!discountCode.trim()) return;
    setValidating(true);
    const res = await fetch("/api/discount/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: discountCode }),
    });
    const data = await res.json();
    setValidating(false);
    if (data.valid) {
      setDiscountStatus("valid");
      setDiscountInfo({ type: data.type, value: data.value });
    } else {
      setDiscountStatus("invalid");
      setDiscountInfo(null);
    }
  }

  // حساب الإجمالي
  const validItems = items.filter((i) => i.product);

  const originalTotal = validItems.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.name === item.product);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const discountedTotal = validItems.reduce((sum, item) => {
    const discountedPrice = DISCOUNTED_PRICES[item.product];
    const originalPrice = PRODUCTS.find((p) => p.name === item.product)?.price || 0;
    const price = discountStatus === "valid" && discountedPrice ? discountedPrice : originalPrice;
    return sum + price * item.quantity;
  }, 0);

  async function send(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/preorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        contact: form.get("contact"),
        address: form.get("address"),
        items,
        discount_code: discountStatus === "valid" ? discountCode : null,
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
    bg-white text-[#55614A] placeholder:text-[#7C8572]
    rounded-full px-7 py-5 outline-none border border-transparent
    focus:border-[#55614A] duration-300 text-lg w-full
  `;

  return (
    <main className="bg-[#E4E7D6] min-h-screen">
      <Navbar />

      <section className="px-6 md:px-20 pt-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] items-start gap-10 md:gap-20 max-w-[1400px] mx-auto">

          {/* LEFT */}
          <div className="lg:sticky lg:top-32">
            <h1 className="mt-6 text-[48px] sm:text-[70px] md:text-[120px] leading-[0.9] text-[#55614A]">
              Pre-Order
            </h1>
            <p className="mt-6 text-[#66705D] text-[17px] md:text-[20px] leading-relaxed max-w-[480px] font-semibold">
              ⏳ Please note: Every MELONIQ product is handcrafted after your order is confirmed. Preparation takes up to 7 business days before shipping.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-[#55614A] text-lg mt-1">✦</span>
                <p className="text-[#66705D]">Handcrafted fresh after your order</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#55614A] text-lg mt-1">✦</span>
                <p className="text-[#66705D]">Pay on delivery — no upfront payment</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#55614A] text-lg mt-1">✦</span>
                <p className="text-[#66705D]">We'll contact you to confirm your order</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          {done ? (
            <div className="bg-[#D7DCCB] rounded-[40px] p-10 text-center shadow-2xl mt-10">
              <div className="text-[60px]">✓</div>
              <h2 className="text-[40px] text-[#55614A]">Pre-Order Received</h2>
              <p className="mt-4 text-[#66705D]">
                We'll reach out soon to confirm your order. Thank you for choosing Meloniq.
              </p>
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
              className="bg-[#D7DCCB] rounded-[30px] md:rounded-[60px] p-6 md:p-14 shadow-2xl w-full max-w-[700px] mx-auto flex flex-col gap-6 mt-10"
            >
              <input required name="name" placeholder="Full Name" className={inputStyle} />

              <div className="flex flex-col gap-4">
                <p className="text-[#66705D] tracking-[0.15em] uppercase text-sm px-2">Products</p>

                {items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center w-full">
                    <select
                      required
                      value={item.product}
                      onChange={(e) => updateItem(index, "product", e.target.value)}
                      className="bg-white text-[#55614A] rounded-full px-4 py-4 outline-none border border-transparent focus:border-[#55614A] duration-300 text-base flex-1 min-w-0"
                    >
                      <option value="" disabled>Select product</option>
                      {PRODUCTS.map((p) => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                    </select>

                    <input
                      required
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                      className="bg-white text-[#55614A] rounded-full px-3 py-4 outline-none border border-transparent focus:border-[#55614A] duration-300 text-base w-[60px] text-center shrink-0"
                    />

                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="w-9 h-9 rounded-full bg-white text-[#55614A] hover:bg-[#55614A] hover:text-white duration-300 text-xl flex items-center justify-center shrink-0"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addItem}
                  className="self-start px-6 py-3 rounded-full border border-[#55614A] text-[#55614A] text-sm uppercase tracking-[0.1em] hover:bg-[#55614A] hover:text-white duration-300"
                >
                  + Add Item
                </button>
              </div>

              <input required name="contact" placeholder="Phone Number" className={inputStyle} />

              <textarea
                required
                name="address"
                placeholder="Delivery Address"
                rows={4}
                className="bg-white text-[#55614A] placeholder:text-[#7C8572] rounded-[32px] px-7 py-5 outline-none border border-transparent focus:border-[#55614A] resize-none duration-300 text-lg"
              />

              {/* DISCOUNT CODE */}
              <div className="flex flex-col gap-2">
                <p className="text-[#66705D] tracking-[0.15em] uppercase text-sm px-2">Discount Code</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value);
                      setDiscountStatus("idle");
                      setDiscountInfo(null);
                    }}
                    placeholder="Enter code"
                    className="bg-white text-[#55614A] placeholder:text-[#7C8572] rounded-full px-7 py-4 outline-none border border-transparent focus:border-[#55614A] duration-300 text-lg w-full"
                  />
                  <button
                    type="button"
                    onClick={validateDiscount}
                    disabled={validating || !discountCode.trim()}
                    className="px-6 py-4 rounded-full border border-[#55614A] text-[#55614A] text-sm uppercase tracking-[0.1em] hover:bg-[#55614A] hover:text-white duration-300 disabled:opacity-50"
                  >
                    {validating ? "..." : "Apply"}
                  </button>
                </div>
                {discountStatus === "valid" && discountInfo && (
                  <p className="text-[#55614A] text-sm px-2">
                    ✓ Code applied — {discountInfo.value}{discountInfo.type === "percentage" ? "% off" : " EGP off"}
                  </p>
                )}
                {discountStatus === "invalid" && (
                  <p className="text-red-500 text-sm px-2">Invalid or expired code</p>
                )}
              </div>

              {/* ORDER SUMMARY */}
              {validItems.length > 0 && (
                <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3">
                  <p className="text-[#66705D] tracking-[0.15em] uppercase text-sm">Order Summary</p>

                  {validItems.map((item, i) => {
                    const product = PRODUCTS.find((p) => p.name === item.product);
                    const discountedPrice = DISCOUNTED_PRICES[item.product];
                    const hasDiscount = discountStatus === "valid" && discountedPrice;
                    return (
                      <div key={i} className="flex justify-between items-center">
                        <p className="text-[#55614A] text-sm">{item.product} × {item.quantity}</p>
                        <div className="text-right">
                          {hasDiscount ? (
                            <div className="flex items-center gap-2">
                              <span className="text-[#66705D] text-sm line-through opacity-60">
                                {product!.price * item.quantity} EGP
                              </span>
                              <span className="text-[#55614A] font-medium">
                                {discountedPrice * item.quantity} EGP
                              </span>
                            </div>
                          ) : (
                            <span className="text-[#55614A]">
                              {product ? product.price * item.quantity : 0} EGP
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="border-t border-[#D7DCCB] pt-3 flex justify-between items-center">
                    <p className="text-[#55614A] font-medium">Total</p>
                    <div className="text-right">
                      {discountStatus === "valid" ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[#66705D] text-sm line-through opacity-60">{originalTotal} EGP</span>
                          <span className="text-[#55614A] text-xl font-medium">{discountedTotal} EGP</span>
                        </div>
                      ) : (
                        <span className="text-[#55614A] text-xl font-medium">{originalTotal} EGP</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {message && (
                <div className="rounded-[24px] bg-[#55614A] text-white py-4 px-6 text-center">
                  {message}
                </div>
              )}

              <button
                disabled={loading}
                className="mt-2 bg-[#55614A] text-white rounded-full py-6 text-xl uppercase tracking-[0.12em] hover:scale-[1.02] hover:opacity-95 duration-300 disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Submit Pre-Order"}
              </button>
            </form>
          )}
        </div>
      </section>

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

export default function PreorderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreorderContent />
    </Suspense>
  );
}
