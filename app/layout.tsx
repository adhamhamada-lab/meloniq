import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { CartProvider } from "./context/CartContext";
import SplashScreen from "@/components/SplashScreen";

const seasons = localFont({
  src: [
    {
      path: "../public/fonts/The Seasons Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/The Seasons Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meloniq | Handmade Botanical Care",
  description: "Discover handmade botanical products inspired by nature.",
  openGraph: {
    title: "Meloniq",
    description: "Discover handmade botanical products inspired by nature.",
    images: [
      {
        url: "/images/product.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en" className="h-full antialiased">

<body className={`${seasons.className} min-h-full flex flex-col`}>

<SplashScreen>

<CartProvider>

{children}

</CartProvider>

<Analytics />

</SplashScreen>

</body>

</html>
  );
}