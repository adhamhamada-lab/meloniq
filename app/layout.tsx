import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import SplashScreen from "@/components/SplashScreen";
import Script from "next/script";

const seasons = localFont({
  src: [
    { path: "../public/fonts/The Seasons Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/The Seasons Italic.ttf", weight: "400", style: "italic" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meloniq | Handmade Botanical Care",
  description: "Discover handmade botanical products inspired by nature.",
  openGraph: {
    title: "Meloniq",
    description: "Discover handmade botanical products inspired by nature.",
    images: [{ url: "/images/product.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${seasons.className} min-h-full flex flex-col`}>
        <SplashScreen>
          <CartProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </CartProvider>
          <Analytics />
          <Script id="clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "xn5h82p6o5");`}
          </Script>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-P19VPXFQEY" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-P19VPXFQEY');` }} />
        </SplashScreen>
      </body>
    </html>
  );
}
