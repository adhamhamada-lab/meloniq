"use client";

import { useEffect } from "react";
import Image from "next/image";
import Reviews from "@/components/Reviews";
import Navbar from "@/components/Navbar";
import { useLang } from "@/app/context/LanguageContext";

const summerProducts = [
  { image: "/images/watermelon-soap.jpg", title: "Watermelon Soap", slug: "watermelon-soap" },
  { image: "/images/pink-lemonade-soap.jpg", title: "Pink Lemonade Soap", slug: "pink-lemonade-soap" },
  { image: "/images/pina-colada-soap.jpg", title: "Piña Colada Soap", slug: "pina-colada-soap" },
  { image: "/images/aloe-cucumber-soap.jpg", title: "Aloe & Cucumber Soap", slug: "aloe-cucumber-soap" },
  { image: "/images/tropical-fruit-soap.jpg", title: "Tropical Fruit Soap", slug: "tropical-fruit-soap" },
];

const featuredProducts = [
  { image: "/images/teatreeoilsoap.jpeg", title: "Tea Tree Oil Soap", slug: "teatreeoilsoap" },
  { image: "/images/Argan & Frankincense Soap.jpeg", title: "Argan & Frankincense Soap", slug: "argan-frankincense-soap" },
  { image: "/images/licoriceoilsoap.jpeg", title: "Licorice Oil Soap", slug: "licoriceoilsoap" },
  { image: "/images/saadoilsoap.jpeg", title: "Saad Oil Soap", slug: "saadoilsoap" },
];

type Product = { image: string; title: string; slug: string };

function ScrollRow({ products, badge }: { products: Product[]; badge?: boolean }) {
  const { t } = useLang();
  return (
    <>
      {/* Mobile: horizontal scroll */}
      <div className="mt-12 flex md:hidden gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
        {products.map((item) => (
          <a href={`/shop/${item.slug}`} key={item.title} className="relative flex-shrink-0 w-[72vw] snap-start rounded-[28px] overflow-hidden block">
            <div className="relative aspect-[3/4] w-full">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="72vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {badge && <span className="absolute top-4 left-4 z-10 bg-[#55614A] text-white px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.12em]">{t.newBadge}</span>}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-xl text-white font-medium leading-tight">{item.title}</h3>
                <p className="mt-2 text-white/70 text-xs uppercase tracking-[0.1em]">{t.viewCollection}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-10 mt-20 px-16">
        {products.map((item) => (
          <a href={`/shop/${item.slug}`} key={item.title} className="relative block bg-[#D7DCCB] rounded-[40px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl duration-500">
            {badge && <span className="absolute top-5 left-5 z-10 bg-[#55614A] text-white px-5 py-2 rounded-full text-xs uppercase tracking-[0.12em]">{t.newBadge}</span>}
            <Image src={item.image} alt={item.title} width={700} height={700} className="w-full h-[420px] object-cover hover:scale-[1.03] duration-700" />
            <div className="p-8">
              <h3 className="text-4xl text-[#55614A]">{item.title}</h3>
              <p className="mt-4 text-[#66705D] text-lg">{t.craftedWith}</p>
              <p className="mt-10 uppercase tracking-[0.15em] text-[#55614A] text-sm">{t.viewCollection}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export default function Home() {
  const { t } = useLang();

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("active"); }); },
      { threshold: 0.2 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#E4E7D6] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="px-6 md:px-20 pt-8 pb-16 md:pb-24 overflow-hidden animate-[fade_0.9s_ease] reveal">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-6 md:gap-20">
          <div>
            <p className="tracking-[0.35em] text-[#66705D] text-xs md:text-lg">{t.pureBottanicalCare}</p>
            <h1 className="mt-4 md:mt-8 text-[52px] sm:text-[90px] md:text-[180px] leading-[0.9] text-[#55614A]">Meloniq</h1>
            <p className="mt-4 md:mt-8 text-[17px] md:text-[28px] text-[#66705D] max-w-[620px] leading-relaxed">{t.heroDesc}</p>
            <div className="flex gap-5 mt-8 md:mt-12 flex-wrap">
              <a href="/shop" className="px-10 py-4 md:px-12 md:py-5 rounded-full bg-[#55614A] text-white text-base md:text-xl hover:scale-105 duration-300">{t.shopBtn}</a>
            </div>
          </div>
          <div className="relative flex justify-center mt-2 md:mt-0">
            <div className="absolute w-[85%] h-[85%] md:w-[80%] md:h-[80%] bg-[#D9DECB] rounded-[40px] md:rounded-[60px] right-0 top-[20px] md:top-[60px]" />
            <Image src="/images/product.jpg" alt="Product" width={850} height={850} priority className="relative z-10 rounded-[24px] md:rounded-[50px] object-cover w-full max-w-[300px] md:max-w-[720px] mx-auto shadow-xl" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-8 md:px-16 py-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="tracking-[0.35em] text-[#66705D] text-sm">{t.ourPhilosophy}</p>
          <div className="mt-10 grid md:grid-cols-[1.4fr_0.8fr] gap-20 items-start">
            <h2 className="text-[48px] md:text-[80px] leading-[1] text-[#55614A]">{t.aboutHeading}</h2>
            <p className="text-[20px] md:text-[28px] leading-[1.9] text-[#66705D]">{t.aboutDesc}</p>
          </div>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { val: t.stat1Val, label: t.stat1Label },
              { val: t.stat2Val, label: t.stat2Label },
              { val: t.stat3Val, label: t.stat3Label },
              { val: t.stat4Val, label: t.stat4Label },
            ].map((s) => (
              <div key={s.label}>
                <h3 className="text-[40px] md:text-[48px] text-[#55614A]">{s.val}</h3>
                <p className="mt-2 text-[#66705D] text-base md:text-lg">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUMMER COLLECTION */}
      <section className="py-24">
        <h2 className="text-center text-[40px] md:text-[70px] text-[#55614A] reveal px-8">{t.summerCollection}</h2>
        <ScrollRow products={summerProducts} badge />
      </section>

      {/* FEATURED COLLECTION */}
      <section className="py-24">
        <h2 className="text-center text-[40px] md:text-[70px] text-[#55614A] reveal px-8">{t.featuredCollection}</h2>
        <ScrollRow products={featuredProducts} />
      </section>

      <Reviews />

      {/* FOOTER */}
      <footer id="footer" className="py-16 border-t border-[#C7CDB6] text-center text-[#55614A]">
        <div className="space-y-8">
          <h1 className="text-6xl tracking-[-0.1em]"><em>m</em>eloniq</h1>
          <p className="text-sm opacity-70 max-w-[400px] mx-auto">{t.footerTagline}</p>
          <div className="flex justify-center items-center gap-8 pt-2">
            <a href="https://wa.me/201221851545" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[#55614A] opacity-80 hover:opacity-100 hover:scale-110 duration-300">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            </a>
            <a href="https://www.instagram.com/meloniq23" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#55614A] opacity-80 hover:opacity-100 hover:scale-110 duration-300">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61580340421564" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#55614A] opacity-80 hover:opacity-100 hover:scale-110 duration-300">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 21v-7h2.4l.4-3H14V9c0-.9.3-1.5 1.6-1.5H17V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7" /></svg>
            </a>
          </div>
          <p className="text-sm opacity-60 pt-4">© 2026 Meloniq</p>
        </div>
      </footer>
    </main>
  );
}