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
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

const LOOKUP: Record<string, string> = {};
for (const p of PRODUCT_CATALOG) {
  LOOKUP[clean(p.name)] = p.name;
  for (const a of p.aliases) LOOKUP[clean(a)] = p.name;
}

export function normalizeProduct(name: string): string {
  return LOOKUP[clean(name)] || name;
}

export const PRODUCT_PRICES: Record<string, number> = Object.fromEntries(
  PRODUCT_CATALOG.map((p) => [p.name, p.price])
);

export function productPrice(name: string): number {
  return PRODUCT_PRICES[normalizeProduct(name)] || 0;
}

// الباندلز — المصدر الوحيد للسعر والعدد (السيرفر والأدمن بيستخدموه)
export const BUNDLES: Record<number, { count: number; price: number }> = {
  3: { count: 3, price: 80 },
  5: { count: 5, price: 110 },
};

export type OrderItem = { product: string; quantity: number; bundleId?: number };

// إجمالي الطلب قبل الخصم: لو فيه باندل → سعر الباندل + الصابون الإضافي بسعره العادي
export function orderBaseTotal(items: OrderItem[]): number {
  const list = items || [];
  const bundleItem = list.find((i) => i.bundleId);
  if (!bundleItem) {
    return list.reduce((sum, i) => sum + productPrice(i.product) * i.quantity, 0);
  }
  const bundlePrice = BUNDLES[Number(bundleItem.bundleId)]?.price || 0;
  const extras = list
    .filter((i) => !i.bundleId)
    .reduce((sum, i) => sum + productPrice(i.product) * i.quantity, 0);
  return bundlePrice + extras;
}