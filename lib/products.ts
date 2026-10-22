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

const SUMMER_SOAPS = [
  "Watermelon Soap",
  "Pink Lemonade Soap",
  "Piña Colada Soap",
  "Aloe & Cucumber Soap",
  "Tropical Fruit Soap",
];

export type OrderInfo = {
  bundleId?: number;
  base: number; // السعر قبل الخصم
  inferred: boolean; // true = طلب قديم اتعرف إنه باندل من الأرقام
  bundleQty: Record<string, number>; // كمية كل صابونة جوه الباندل (للطلبات القديمة)
  known: boolean; // false = مش قادرين نعرف السعر الأصلي بدقة
};

// بيحدد الطلب باندل ولا لأ، ويحسب السعر قبل الخصم — حتى للطلبات القديمة اللي معلهاش علامة
export function describeOrder(
  items: OrderItem[],
  total: number,
  apply: (n: number) => number
): OrderInfo {
  const list = items || [];

  // طلب جديد: عليه علامة bundleId
  const marked = list.find((i) => i.bundleId);
  if (marked) {
    return { bundleId: Number(marked.bundleId), base: orderBaseTotal(list), inferred: false, bundleQty: {}, known: true };
  }

  const retail = list.reduce((sum, i) => sum + productPrice(i.product) * i.quantity, 0);

  // طلب عادي: الخصم على الأسعار العادية بيطلع نفس الإجمالي المحفوظ
  if (!total || apply(retail) === total) {
    return { base: retail, inferred: false, bundleQty: {}, known: true };
  }

  // طلب قديم: نجرب نعرف لو كان باندل (3 أو 5) + صابون إضافي ويطابق الإجمالي
  const qty: Record<string, number> = {};
  list.forEach((i) => {
    const k = normalizeProduct(i.product);
    qty[k] = (qty[k] || 0) + i.quantity;
  });
  const summer = SUMMER_SOAPS.filter((p) => qty[p] > 0);

  for (const idStr of Object.keys(BUNDLES)) {
    const id = Number(idStr);
    const b = BUNDLES[id];
    const pick: Record<string, number> = {};
    let result: OrderInfo | null = null;

    const rec = (idx: number, left: number) => {
      if (result) return;
      if (idx === summer.length) {
        if (left !== 0) return;
        let extras = 0;
        Object.keys(qty).forEach((p) => {
          extras += ((qty[p] || 0) - (pick[p] || 0)) * productPrice(p);
        });
        const base = b.price + extras;
        if (apply(base) === total) {
          result = { bundleId: id, base, inferred: true, bundleQty: { ...pick }, known: true };
        }
        return;
      }
      const p = summer[idx];
      for (let k = Math.min(qty[p], left); k >= 0; k--) {
        pick[p] = k;
        rec(idx + 1, left - k);
        if (result) return;
      }
      pick[p] = 0;
    };

    rec(0, b.count);
    if (result) return result;
  }

  return { base: retail, inferred: false, bundleQty: {}, known: false };
}