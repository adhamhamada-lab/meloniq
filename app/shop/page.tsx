"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLang } from "@/app/context/LanguageContext";

const products = [
  { image: "/images/watermelon-soap.jpg", title: "Watermelon Soap", price: "100 EGP", slug: "watermelon-soap", badge: true },
  { image: "/images/pink-lemonade-soap.jpg", title: "Pink Lemonade Soap", price: "100 EGP", slug: "pink-lemonade-soap", badge: true },
  { image: "/images/pina-colada-soap.jpg", title: "Piña Colada Soap", price: "100 EGP", slug: "pina-colada-soap", badge: true },
  { image: "/images/aloe-cucumber-soap.jpg", title: "Aloe & Cucumber Soap", price: "100 EGP", slug: "aloe-cucumber-soap", badge: true },
  { image: "/images/tropical-fruit-soap.jpg", title: "Tropical Fruit Soap", price: "100 EGP", slug: "tropical-fruit-soap", badge: true },
  { image: "/images/teatreeoilsoap.jpeg", title: "Tea Tree Oil Soap", price: "115 EGP", slug: "teatreeoilsoap" },
  { image: "/images/Argan & Frankincense Soap.jpeg", title: "Argan & Frankincense Soap", price: "115 EGP", slug: "argan-frankincense-soap" },
  { image: "/images/licoriceoilsoap.jpeg", title: "Licorice Oil Soap", price: "140 EGP", slug: "licoriceoilsoap" },
  { image: "/images/saadoilsoap.jpeg", title: "Saad Oil Soap", price: "160 EGP", slug: "saadoilsoap" },
];

export default function Shop() {
  const { t } = useLang();
  return (
    <main className="bg-[#E4E7D6] min-h-screen">
      <Navbar />
      <section className="px-8 md:px-16 pt-10 pb-16 text-center">
        <p className="tracking-[0.35em] text-[#66705D] text-sm">{t.allProducts}</p>
        <h1 className="mt-6 text-[48px] md:text-[90px] leading-[1] text-[#55614A]">{t.shopTitle}</h1>
        <p className="mt-6 text-[18px] md:text-[22px] text-[#66705D] max-w-[600px] mx-auto">{t.shopDesc}</p>
      </section>
      <section className="px-4 md:px-16 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12">
          {products.map((item, index) => (
            <Link key={index} href={`/shop/${item.slug}`} className="group relative rounded-[24px] overflow-hidden hover:-translate-y-2 hover:shadow-xl duration-500 block">
              <div className="relative aspect-[3/4] w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-[1.04] duration-700" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {item.badge && <span className="absolute top-3 left-3 z-10 bg-[#55614A] text-white text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded-full">{t.newBadge}</span>}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                  <h3 className="text-sm md:text-2xl text-white font-medium leading-tight">{item.title}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-white/80 text-xs md:text-base">{item.price}</p>
                    <span className="text-white/80 text-[10px] md:text-sm uppercase tracking-[0.1em]">{t.viewArrow}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <footer className="py-16 border-t border-[#C7CDB6] text-center text-[#55614A]">
        <div className="space-y-8">
          <h1 className="text-6xl tracking-[-0.1em]"><em>m</em>eloniq</h1>
          <p className="text-sm opacity-70 max-w-[400px] mx-auto">{t.footerTagline}</p>
          <p className="text-sm opacity-60 pt-4">© 2026 Meloniq</p>
        </div>
      </footer>
    </main>
  );
}
