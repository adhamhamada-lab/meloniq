"use client";

import { useState } from "react";
import Image from "next/image";

const WHATSAPP_NUMBER = "201227788169";

const products = [
  {
    image: "/images/p1.jpg",
    title: "Soap",
    price: "150 EGP",
  },
  {
    image: "/images/p2.jpg",
    title: "Body Oil",
    price: "220 EGP",
  },
  {
    image: "/images/p3.jpg",
    title: "Cream",
    price: "180 EGP",
  },
  {
    image: "/images/p1.jpg",
    title: "Shampoo Bar",
    price: "140 EGP",
  },
  {
    image: "/images/p2.jpg",
    title: "Face Serum",
    price: "260 EGP",
  },
  {
    image: "/images/p3.jpg",
    title: "Lip Balm",
    price: "90 EGP",
  },
];

function getWhatsappLink(title: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(title)}`;
}

export default function Shop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="bg-[#E4E7D6] min-h-screen">

      {/* NAVBAR */}
      <nav
        className="
        sticky
        top-0
        z-50
        bg-[#E4E7D6]
        px-8
        md:px-16
        py-2
        md:py-3
        flex
        justify-between
        items-center
        "
      >
        <a href="/" onClick={() => setIsMenuOpen(false)}>

          <Image
            src="/images/logooo.png"
            alt="Meloniq"
            width={260}
            height={100}
            priority
            className="
            w-[100px]
            md:w-[140px]
            h-auto
            object-contain
            hover:scale-[1.02]
            duration-300
            cursor-pointer
            "
          />

        </a>

        {/* Desktop links */}
        <div
          className="
          hidden
          md:flex
          items-center
          gap-16
          text-[#55614A]
          text-[16px]
          tracking-[0.18em]
          uppercase
          "
        >
          <a href="/" className="hover:opacity-60 duration-300">
            Home
          </a>
          <a href="/shop" className="opacity-100 font-medium">
            Shop
          </a>
          <a href="/#about" className="hover:opacity-60 duration-300">
            About
          </a>
          <a
            href="https://wa.me/201227788169"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 duration-300"
          >
            Contact
          </a>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="
          md:hidden
          flex
          flex-col
          justify-center
          items-center
          gap-[5px]
          w-8
          h-8
          z-50
          "
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block h-[1.5px] w-6 bg-[#55614A] duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-[#55614A] duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-[#55614A] duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>

        {/* Mobile dropdown menu */}
        <div
          className={`
          md:hidden
          fixed
          top-0
          left-0
          w-full
          h-screen
          bg-[#E4E7D6]
          flex
          flex-col
          items-center
          justify-center
          gap-10
          text-[#55614A]
          text-[15px]
          tracking-[0.18em]
          uppercase
          duration-300
          z-40
          ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        >
          <a
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="hover:opacity-60 duration-300"
          >
            Home
          </a>
          <a
            href="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="hover:opacity-60 duration-300"
          >
            Shop
          </a>
          <a
            href="/#about"
            onClick={() => setIsMenuOpen(false)}
            className="hover:opacity-60 duration-300"
          >
            About
          </a>
          <a
            href="https://wa.me/201227788169"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="hover:opacity-60 duration-300"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="px-8 md:px-16 pt-10 pb-16 text-center">
        <p className="tracking-[0.35em] text-[#66705D] text-sm">
          ALL PRODUCTS
        </p>
        <h1 className="mt-6 text-[48px] md:text-[90px] leading-[1] text-[#55614A]">
          Shop
        </h1>
        <p className="mt-6 text-[18px] md:text-[22px] text-[#66705D] max-w-[600px] mx-auto">
          Discover our full collection of handmade botanical products.
        </p>
      </section>

      {/* PRODUCTS GRID */}
      <section className="px-8 md:px-16 pb-32">
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
          {products.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
             className="
block
bg-[#D7DCCB]
rounded-[40px]
overflow-hidden
hover:-translate-y-3
hover:shadow-2xl
hover:scale-[1.01]
duration-500
"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={700}
                height={700}
                className="
                w-full
                h-[420px]
                object-cover
                hover:scale-[1.03]
                duration-700
                "
              />

              <div className="p-8">
                <h3 className="text-4xl text-[#55614A]">
                  {item.title}
                </h3>

                <p className="mt-4 text-[#66705D] text-lg">
                  Crafted with clean ingredients.
                </p>

                <div className="mt-10 flex items-center justify-between">
                  <p className="text-[#55614A] text-xl">
                    {item.price}
                  </p>

                  <a
                    href={getWhatsappLink(item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-full bg-[#55614A] text-white text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
  id="footer"
  className="
  py-16
  border-t
  border-[#C7CDB6]
  text-center
  text-[#55614A]
  "
>
  <div className="space-y-8">

    <h3 className="text-3xl">
      Meloniq
    </h3>

    <p className="text-sm opacity-70 max-w-[400px] mx-auto">
      Handmade botanical care inspired by calm rituals.
    </p>

    {/* SOCIAL ICONS */}
    <div
      className="
      flex
      justify-center
      items-center
      gap-8
      pt-2
      "
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/201227788169"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="
        text-[#55614A]
        opacity-80
        hover:opacity-100
        hover:scale-110
        duration-300
        "
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M20.5 11.9c0 4.7-3.9 8.6-8.6 8.6-1.5 0-2.9-.4-4.1-1.1L3.5 20.5l1.1-4.2c-.8-1.3-1.3-2.8-1.3-4.4 0-4.7 3.9-8.6 8.6-8.6s8.6 3.9 8.6 8.6z" />
          <path d="M8.7 8.6c.1-.3.4-.5.7-.5h.6c.2 0 .4.1.5.3l.7 1.5c.1.2.1.4 0 .6l-.4.6c-.1.2-.1.4 0 .6.4.7 1.3 1.6 2 2 .2.1.4.1.6 0l.6-.4c.2-.1.4-.1.6 0l1.5.7c.2.1.3.3.3.5v.6c0 .3-.2.6-.5.7-.6.2-1.5.4-2.4-.1-1.4-.6-2.8-2-3.4-3.4-.5-.9-.3-1.8-.1-2.4z" />
        </svg>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/meloniq23"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="
        text-[#55614A]
        opacity-80
        hover:opacity-100
        hover:scale-110
        duration-300
        "
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/profile.php?id=61580340421564"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="
        text-[#55614A]
        opacity-80
        hover:opacity-100
        hover:scale-110
        duration-300
        "
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M14 21v-7h2.4l.4-3H14V9c0-.9.3-1.5 1.6-1.5H17V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7" />
        </svg>
      </a>
    </div>

    <p className="text-sm opacity-60 pt-4">
      © 2026 Meloniq
    </p>

  </div>
</footer>
    </main>
  );
}