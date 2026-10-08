// مصدر واحد لأسماء المنتجات وأسعارها — السيرفر والداشبورد وصفحة الطلب كلهم بيستخدموه

export const PRODUCT_CATALOG = [
  { name: "Tea Tree Oil Soap", price: 115, aliases: ["صابون زيت شجرة الشاي"] },
  { name: "Argan & Frankincense Soap", price: 115, aliases: ["صابون الأرغان واللبان"] },
  { name: "Licorice Oil Soap", price: 140, aliases: ["صابون زيت العرقسوس"] },
  { name: "Saad Oil Soap", price: 160, aliases: ["صابون زيت السعد"] },
  { name: "Watermelon Soap", price: 100, aliases: ["صابون البطيخ"] },
  { name: "Pink Lemonade Soap", price: 100, aliases: ["صابون الليمونادة الوردية"] },
  { name: "Piña Colada Soap", price: 100, aliases: ["Pina Colada Soap", "صابون بينا كولادا"] },
  { name: "Aloe & Cucumber Soap", price: 100, aliases: ["صابون الألوفيرا والخيار"] },
  { name: "Tropical Fruit Soap", price: 100, aliases: ["صابون الفاكهة الاستوائية"] },
];

function clean(s: string) {
  return (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // يشيل علامة ñ وأمثالها
    .trim()
    .toLowerCase();
}

const LOOKUP: Record<string, string> = {};
for (const p of PRODUCT_CATALOG) {
  LOOKUP[clean(p.name)] = p.name;
  for (const a of p.aliases) LOOKUP[clean(a)] = p.name;
}

// يرجّع الاسم الإنجليزي الأساسي للمنتج (حتى لو جه بالعربي أو من غير ñ)
export function normalizeProduct(name: string): string {
  return LOOKUP[clean(name)] || name;
}

export const PRODUCT_PRICES: Record<string, number> = Object.fromEntries(
  PRODUCT_CATALOG.map((p) => [p.name, p.price])
);

export function productPrice(name: string): number {
  return PRODUCT_PRICES[normalizeProduct(name)] || 0;
}