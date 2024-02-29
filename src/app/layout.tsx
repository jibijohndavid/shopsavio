import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop Savio",
  description: "Shop Savio - Affiliate Marketing Partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#14b8a6" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" gutter={8} />
      </body>
    </html>
  );
}
