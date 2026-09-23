"use client";

import { useEffect, useRef, useState } from "react";
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

const BUNDLES = [
  { id: 3, label: "Bundle 3", count: 3, price: 80, desc: "Pick any 3 soaps — 25g each", image: "/images/bundle-back-to-school.jpeg" },
  { id: 5, label: "Bundle 5", count: 5, price: 110, desc: "Pick any 5 soaps — 25g each", image: "/images/bundle-back-to-school.jpeg" },
];

type Product = { image: string; title: string; slug: string };

function StaggerGrid({ products, badge }: { products: Product[]; badge?: boolean }) {
  const { t } = useLang();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".stagger-card");
    if (!cards) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(cards).indexOf(entry.target as Element);
          setTimeout(() => {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "scale(1) translateY(0)";
          }, idx * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
      {products.map((item) => (
        <a
          href={`/shop/${item.slug}`}
          key={item.title}
          className="stagger-card relative block rounded-[20px] md:rounded-[32px] overflow-hidden group"
          style={{ opacity: 0, transform: "scale(0.93) translateY(16px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}
        >
          <div className="relative aspect-[3/4] w-full">
            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-[1.05] duration-700" sizes="(max-width: 768px) 50vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {badge && (
              <span className="absolute top-3 left-3 md:top-5 md:left-5 z-10 bg-[#55614A] text-white px-3 py-1 md:px-5 md:py-2 rounded-full text-[9px] md:text-xs uppercase tracking-[0.12em]">
                {t.newBadge}
              </span>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-7 z-10">
              <h3 className="text-sm md:text-3xl text-white leading-tight">{item.title}</h3>
              <p className="mt-1 md:mt-3 text-white/60 text-[9px] md:text-sm uppercase tracking-[0.15em]">{t.viewCollection}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function BundleSelector({ bundle, onClose }: { bundle: typeof BUNDLES[0]; onClose: () => void }) {
  const [selections, setSelections] = useState<string[]>([]);

  function toggle(title: string) {
    setSelections((prev) => {
      if (prev.includes(title)) return prev.filter((s) => s !== title);
      if (prev.length < bundle.count) return [...prev, title];
      return prev;
    });
  }

  function buildOrderUrl() {
    const items = selections.map((s) => `product=${encodeURIComponent(s)}`).join("&");
    return `/preorder?bundle=${bundle.id}&price=${bundle.price}&${items}`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#E4E7D6] rounded-[32px] w-full max-w-[520px] p-8 md:p-10" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#7A8860] mb-1">Back to School</p>
            <h2 className="text-[36px] md:text-[48px] text-[#55614A] leading-[1]">{bundle.label}</h2>
            <p className="text-[#66705D] text-sm mt-1">{bundle.desc}</p>
          </div>
          <button onClick={onClose} className="text-[#55614A] opacity-50 hover:opacity-100 duration-200 text-2xl mt-1">×</button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 my-6">
          {Array.from({ length: bundle.count }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < selections.length ? "bg-[#55614A]" : "bg-[#C5CBA8]"}`} />
          ))}
          <span className="text-xs text-[#66705D] ml-1 shrink-0">{selections.length}/{bundle.count}</span>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-3 max-h-[320px] overflow-y-auto pr-1">
          {summerProducts.map((item) => {
            const selected = selections.includes(item.title);
            const count = selections.filter((s) => s === item.title).length;
            return (
              <button
                key={item.title}
                onClick={() => toggle(item.title)}
                className={`flex items-center gap-4 p-3 rounded-[20px] text-left transition-all duration-200 ${selected ? "bg-[#55614A]" : "bg-[#D7DCCB] hover:bg-[#C8D4A8]"}`}
              >
                <div className="relative w-14 h-14 rounded-[14px] overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${selected ? "text-white" : "text-[#55614A]"}`}>{item.title}</p>
                  <p className={`text-xs mt-0.5 ${selected ? "text-white/60" : "text-[#66705D]"}`}>25g</p>
                </div>
                {count > 0 && (
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${selected ? "bg-white text-[#55614A]" : "bg-[#55614A] text-white"}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-[28px] text-[#55614A]">{bundle.price} EGP</p>
            <p className="text-xs text-[#66705D] opacity-60">{bundle.count} soaps · 25g each</p>
          </div>
          <a
            href={selections.length === bundle.count ? buildOrderUrl() : undefined}
            onClick={selections.length < bundle.count ? (e) => e.preventDefault() : undefined}
            className={`px-8 py-4 rounded-full text-sm uppercase tracking-[0.15em] duration-300 ${
              selections.length === bundle.count
                ? "bg-[#55614A] text-white hover:opacity-90"
                : "bg-[#C5CBA8] text-[#66705D] cursor-not-allowed"
            }`}
          >
            Order Now →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLang();
  const [activeBundle, setActiveBundle] = useState<typeof BUNDLES[0] | null>(null);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("active"); }); },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#E4E7D6] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 md:py-28 border-b lg:border-b-0 lg:border-r border-[#C5CBA8]">
          <p className="tracking-[0.4em] text-[#7A8860] text-xs uppercase mb-6">{t.pureBottanicalCare}</p>
          <h1 className="text-[72px] sm:text-[100px] md:text-[140px] leading-[0.85] text-[#55614A] mb-8">Meloniq</h1>
          <p className="text-[16px] md:text-[20px] text-[#66705D] max-w-[400px] leading-[1.9] mb-10">{t.heroDesc}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="/shop" className="px-10 py-4 rounded-full bg-[#55614A] text-white text-sm uppercase tracking-[0.15em] hover:opacity-85 duration-300">{t.shopBtn}</a>
            <a href="/#about" className="px-10 py-4 rounded-full border border-[#55614A] text-[#55614A] text-sm uppercase tracking-[0.15em] hover:bg-[#55614A] hover:text-white duration-300">{t.ourPhilosophy}</a>
          </div>
        </div>
        <div className="relative overflow-hidden bg-[#D7DCCB] min-h-[50vh] lg:min-h-0">
          <Image src="/images/product.jpg" alt="Product" fill priority className="object-cover hover:scale-[1.03] duration-[2000ms]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <span className="absolute top-6 left-6 bg-[#55614A] text-white text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-full">{t.newBadge}</span>
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-white/60" />
            <span className="text-white/60 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-[#C7CDB6] py-4 bg-[#D7DCCB]">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[
            { text: "Handmade", img: "/images/teatreeoilsoap.jpeg" },
            { text: "Botanical", img: "/images/watermelon-soap.jpg" },
            { text: "Natural", img: "/images/licoriceoilsoap.jpeg" },
            { text: "Pure", img: "/images/pina-colada-soap.jpg" },
            { text: "Gentle", img: "/images/saadoilsoap.jpeg" },
            { text: "Fresh", img: "/images/aloe-cucumber-soap.jpg" },
            { text: "Handmade", img: "/images/teatreeoilsoap.jpeg" },
            { text: "Botanical", img: "/images/watermelon-soap.jpg" },
            { text: "Natural", img: "/images/licoriceoilsoap.jpeg" },
            { text: "Pure", img: "/images/pina-colada-soap.jpg" },
            { text: "Gentle", img: "/images/saadoilsoap.jpeg" },
            { text: "Fresh", img: "/images/aloe-cucumber-soap.jpg" },
          ].map((item, i) => (
            <span key={i} className="mx-6 flex items-center gap-4 shrink-0">
              <Image src={item.img} alt={item.text} width={48} height={48} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
              <span className="text-[#55614A] text-sm md:text-base uppercase tracking-[0.3em]">{item.text}</span>
            </span>
          ))}
        </div>
      </div>

       
       
        {/* BACK TO SCHOOL BUNDLES */}
      <section className="px-6 md:px-16 pb-20 md:pb-28 reveal">
        <div className="mb-10 md:mb-14">
          <p className="tracking-[0.35em] text-[#7A8860] text-xs uppercase mb-3">Special Offer</p>
          <h2 className="text-[36px] md:text-[60px] text-[#55614A] leading-[1]">Back to School Bundles</h2>
          <p className="mt-3 text-[#66705D] text-sm md:text-base max-w-[480px]">Mix and match from our Summer Collection — pick your favourites in one bundle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {BUNDLES.map((bundle) => (
            <button
              key={bundle.id}
              onClick={() => setActiveBundle(bundle)}
              className="group relative rounded-[28px] md:rounded-[36px] overflow-hidden text-left hover:-translate-y-1 hover:shadow-xl duration-500"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={bundle.image}
                  alt={bundle.label}
                  fill
                  className="object-cover group-hover:scale-[1.04] duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-[#55614A] text-white text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                  {bundle.count} soaps · 25g each
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
                  <h3 className="text-[32px] md:text-[48px] text-white leading-[1] mb-1">{bundle.label}</h3>
                  <p className="text-white/70 text-sm mb-4">{bundle.desc}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-[26px] md:text-[32px] text-white">{bundle.price} <span className="text-base opacity-70">EGP</span></p>
                    <span className="px-6 py-3 rounded-full bg-white text-[#55614A] text-xs uppercase tracking-[0.15em] group-hover:scale-105 duration-300">
                      Choose Soaps →
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SUMMER COLLECTION */}
      <section className="px-6 md:px-16 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10 md:mb-16 reveal">
          <div>
            <p className="tracking-[0.35em] text-[#7A8860] text-xs uppercase mb-3">{t.newBadge} arrivals</p>
            <h2 className="text-[36px] md:text-[60px] text-[#55614A] leading-[1]">{t.summerCollection}</h2>
          </div>
          <a href="/shop" className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-[#55614A] border-b border-[#55614A] pb-1 hover:opacity-60 duration-300">{t.viewCollection}</a>
        </div>
        <StaggerGrid products={summerProducts} badge />
      </section>

      
      {/* ABOUT */}
      <section id="about" className="px-6 md:px-16 pb-20 md:pb-28 reveal">
        <div className="bg-[#D7DCCB] rounded-[28px] md:rounded-[40px] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-16 border-b md:border-b-0 md:border-r border-[#C0CCA0]">
              <p className="tracking-[0.35em] text-[#7A8860] text-xs uppercase mb-6">{t.ourPhilosophy}</p>
              <h2 className="text-[32px] md:text-[48px] text-[#55614A] leading-[1.1] mb-8">{t.aboutHeading}</h2>
              <p className="text-[15px] md:text-[18px] text-[#66705D] leading-[1.9]">{t.aboutDesc}</p>
            </div>
            <div className="grid grid-cols-2">
              {[
                { val: t.stat1Val, label: t.stat1Label },
                { val: t.stat2Val, label: t.stat2Label },
                { val: t.stat3Val, label: t.stat3Label },
                { val: t.stat4Val, label: t.stat4Label },
              ].map((s, i) => (
                <div key={s.label} className={`p-8 md:p-10 ${i % 2 === 0 ? "border-r border-[#C0CCA0]" : ""} ${i < 2 ? "border-b border-[#C0CCA0]" : ""}`}>
                  <h3 className="text-[32px] md:text-[44px] text-[#55614A]">{s.val}</h3>
                  <p className="mt-2 text-[#66705D] text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="px-6 md:px-16 pb-20 md:pb-28">
        <div className="flex items-end justify-between mb-10 md:mb-16 reveal">
          <div>
            <p className="tracking-[0.35em] text-[#7A8860] text-xs uppercase mb-3">Our classics</p>
            <h2 className="text-[36px] md:text-[60px] text-[#55614A] leading-[1]">{t.featuredCollection}</h2>
          </div>
          <a href="/shop" className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-[#55614A] border-b border-[#55614A] pb-1 hover:opacity-60 duration-300">{t.viewCollection}</a>
        </div>
        <StaggerGrid products={featuredProducts} />
      </section>

      <Reviews />

      {/* FOOTER */}
      <footer id="footer" className="border-t border-[#C7CDB6] px-8 md:px-16 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl md:text-6xl tracking-[-0.1em] text-[#55614A]"><em>m</em>eloniq</h1>
            <p className="text-sm opacity-60 mt-2 max-w-[300px]">{t.footerTagline}</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-5">
              <a href="https://wa.me/201221851545" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[#55614A] opacity-70 hover:opacity-100 hover:scale-110 duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              </a>
              <a href="https://www.instagram.com/meloniq23" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#55614A] opacity-70 hover:opacity-100 hover:scale-110 duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61580340421564" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#55614A] opacity-70 hover:opacity-100 hover:scale-110 duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 21v-7h2.4l.4-3H14V9c0-.9.3-1.5 1.6-1.5H17V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7" /></svg>
              </a>
            </div>
            <p className="text-xs opacity-50">© 2026 Meloniq</p>
          </div>
        </div>
      </footer>

      {/* BUNDLE SELECTOR MODAL */}
      {activeBundle && (
        <BundleSelector bundle={activeBundle} onClose={() => setActiveBundle(null)} />
      )}
    </main>
  );
}