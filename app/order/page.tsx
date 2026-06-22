"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function OrderContent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const params = useSearchParams();

const product =
params.get("product") || "";

  async function send(e: any) {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.get("name"),
        product: form.get("product"),
        quantity: Number(form.get("quantity")),
        contact: form.get("contact"),
        address: form.get("address"),
      }),
    });

    setLoading(false);

if (res.ok) {
setMessage("Your order has been submitted successfully ✨");
e.target.reset();
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
`;

  return (
    <main className="bg-[#E4E7D6] min-h-screen">

      <nav
        className="
        sticky
        top-0
        z-50
        bg-[#E4E7D6]
        px-8
        md:px-16
        py-4
        flex
        justify-between
        items-center
        "
      >

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
          className="
          uppercase
          tracking-[0.18em]
          text-[#55614A]
          hover:opacity-60
          duration-300
          "
        >
          Back
        </Link>

      </nav>

      <section
        className="
        px-8
        md:px-16
        py-20
        "
      >

        <div
          className="
          max-w-[1150px]
          mx-auto
          grid
          md:grid-cols-2
          gap-16
          items-center
          "
        >

          <div>

            <p
              className="
              tracking-[0.35em]
              text-[#66705D]
              text-sm
              "
            >
              PLACE YOUR ORDER
            </p>

            <h1
              className="
              mt-6
              text-[62px]
              md:text-[120px]
              leading-[0.9]
              text-[#55614A]
              "
            >
              Order
            </h1>

            <p
              className="
              mt-8
              text-[#66705D]
              text-[22px]
              leading-relaxed
              max-w-[520px]
              "
            >
              Enter your details.
            </p>

          </div>

          <form
            onSubmit={send}
            className="
            bg-[#D7DCCB]
            rounded-[42px]
            p-8
            md:p-12
            flex
            flex-col
            gap-6
            shadow-lg
            "
          >

            <input
              required
              name="name"
              placeholder="Full Name"
              className={inputStyle}
            />

           <input
              required
              name="product"
              defaultValue={product}
              placeholder="Product"
              className={inputStyle}
            />

            <input
              required
              name="quantity"
              type="number"
              placeholder="Quantity"
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
  <div
    className="
    rounded-[24px]
    bg-[#55614A]
    text-white
    py-4
    px-6
    text-center
    "
  >
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
              py-5
              text-lg
              hover:scale-[1.02]
              hover:opacity-95
              duration-300
              disabled:opacity-70
              "
            >
              {loading ? "Sending..." : "Submit Order"}
            </button>

          </form>

        </div>

      </section>

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