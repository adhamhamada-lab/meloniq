"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "ar";

const translations = {
  en: {
    // Navbar
    shop: "Shop",
    about: "About",
    contact: "Contact",
    cart: "Cart",
    // Home
    pureBottanicalCare: "PURE BOTANICAL CARE",
    heroDesc: "Handmade botanical products inspired by nature.",
    shopBtn: "Shop",
    ourPhilosophy: "OUR PHILOSOPHY",
    aboutHeading: "Botanical care designed to feel calm and timeless.",
    aboutDesc: "Meloniq started as a simple family hobby making natural soap, before it grew into a craft we truly care about. Every product is handmade in a small workshop, using carefully chosen natural ingredients gentle enough even for sensitive skin.",
    stat1Val: "100%", stat1Label: "Natural Ingredients",
    stat2Val: "Fully", stat2Label: "Handmade",
    stat3Val: "Gentle", stat3Label: "For Sensitive Skin",
    stat4Val: "Free", stat4Label: "From Harsh Chemicals",
    summerCollection: "Summer Collection",
    featuredCollection: "Featured Collection",
    viewCollection: "View Collection →",
    craftedWith: "Crafted with clean ingredients.",
    footerTagline: "Handmade botanical care inspired by calm rituals.",
    newBadge: "New",
    // Shop
    allProducts: "ALL PRODUCTS",
    shopTitle: "Shop",
    shopDesc: "Discover our full collection of handmade botanical products.",
    viewArrow: "View →",
    // Product page
    recommendedFor: "Recommended For",
    ingredients: "Ingredients",
    addToCart: "Add to Cart",
    addedToCart: "Added!",
    buyNow: "Buy Now →",
    backToShop: "← Back to Shop",
    // Cart
    yourOrder: "YOUR ORDER",
    cartTitle: "Cart",
    emptyCart: "Your cart is empty.",
    browseShop: "Browse Shop",
    remove: "Remove",
    subtotal: "Subtotal",
    totalLabel: "Total",
    proceedCheckout: "Proceed to Checkout →",
    // Checkout
    checkoutLabel: "CHECKOUT",
    yourOrderTitle: "Your Order",
    name: "Your Name",
    phone: "Phone Number",
    address: "Delivery Address",
    notes: "Notes (optional)",
    placeOrder: "Place Order",
    orderSuccess: "Order placed successfully! We'll be in touch soon.",
    // Preorder
    preorderLabel: "PRE-ORDER",
    preorderTitle: "Reserve Yours",
    selectProduct: "Select Product",
    quantity: "Quantity",
    addProduct: "+ Add Another Product",
    discountCode: "Discount Code",
    apply: "Apply",
    submitPreorder: "Submit Pre-Order",
    preorderSuccess: "Pre-order submitted! We'll confirm soon.",
  },
  ar: {
    // Navbar
    shop: "المتجر",
    about: "من نحن",
    contact: "تواصل معنا",
    cart: "السلة",
    // Home
    pureBottanicalCare: "عناية نباتية خالصة",
    heroDesc: "منتجات نباتية مصنوعة يدوياً مستوحاة من الطبيعة.",
    shopBtn: "تسوق الآن",
    ourPhilosophy: "فلسفتنا",
    aboutHeading: "عناية نباتية صُممت لتمنحك الهدوء والأناقة.",
    aboutDesc: "بدأت ميلونيك كهواية عائلية بسيطة لصنع الصابون الطبيعي، ثم تطورت إلى حرفة نهتم بها حقاً. كل منتج مصنوع يدوياً في ورشة صغيرة، باستخدام مكونات طبيعية مختارة بعناية، لطيفة حتى للبشرة الحساسة.",
    stat1Val: "١٠٠٪", stat1Label: "مكونات طبيعية",
    stat2Val: "صناعة", stat2Label: "يدوية بالكامل",
    stat3Val: "لطيف", stat3Label: "للبشرة الحساسة",
    stat4Val: "خالٍ", stat4Label: "من المواد الكيميائية",
    summerCollection: "كوليكشن الصيف",
    featuredCollection: "الكوليكشن المميز",
    viewCollection: "عرض المنتج ←",
    craftedWith: "مصنوع من مكونات نقية.",
    footerTagline: "عناية نباتية مصنوعة يدوياً مستوحاة من طقوس الهدوء.",
    newBadge: "جديد",
    // Shop
    allProducts: "جميع المنتجات",
    shopTitle: "المتجر",
    shopDesc: "اكتشف مجموعتنا الكاملة من المنتجات النباتية المصنوعة يدوياً.",
    viewArrow: "عرض ←",
    // Product page
    recommendedFor: "مناسب لـ",
    ingredients: "المكونات",
    addToCart: "أضف للسلة",
    addedToCart: "تمت الإضافة!",
    buyNow: "اطلب الآن ←",
    backToShop: "← العودة للمتجر",
    // Cart
    yourOrder: "طلبك",
    cartTitle: "السلة",
    emptyCart: "سلتك فارغة.",
    browseShop: "تصفح المتجر",
    remove: "حذف",
    subtotal: "المجموع الجزئي",
    totalLabel: "الإجمالي",
    proceedCheckout: "إتمام الطلب ←",
    // Checkout
    checkoutLabel: "إتمام الطلب",
    yourOrderTitle: "طلبك",
    name: "اسمك",
    phone: "رقم الهاتف",
    address: "عنوان التوصيل",
    notes: "ملاحظات (اختياري)",
    placeOrder: "تأكيد الطلب",
    orderSuccess: "تم تقديم طلبك بنجاح! سنتواصل معك قريباً.",
        // Preorder
    preorderLabel: "حجز مسبق",
    preorderTitle: "احجز نسختك",
    selectProduct: "اختر المنتج",
    quantity: "الكمية",
    addProduct: "+ أضف منتجاً آخر",
    discountCode: "كود الخصم",
    apply: "تطبيق",
    submitPreorder: "تقديم الحجز المسبق",
    preorderSuccess: "تم تقديم حجزك! سنؤكد قريباً.",
    orderDesc: "أدخل بياناتك وسنتولى الباقي.",
    orderBullet1: "مصنوع يدوياً من مكونات طبيعية",
    orderBullet2: "الدفع عند الاستلام — بدون دفع مسبق",
    orderBullet3: "سنتواصل معك لتأكيد التوصيل",
    orderReceivedTitle: "تم استلام طلبك",
    orderReceivedDesc: "شكراً لاختيارك ميلونيك. سنتواصل معك قريباً.",
  },
};

type Translations = typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: Translations;
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  t: translations.en,
  isAr: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));
  const t = translations[lang];
  const isAr = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isAr }}>
      <div dir={isAr ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
