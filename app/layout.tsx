import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
title: "Meloniq | Handmade Botanical Care",

description:
"Discover handmade botanical products inspired by nature.",

openGraph: {
title: "Meloniq",
description:
"Discover handmade botanical products inspired by nature.",

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
