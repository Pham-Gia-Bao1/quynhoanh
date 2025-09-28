import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { AuthProvider } from "@/contexts/auth-context";
import "./globals.css";
import ContactFixed from "@/components/ui/contact-fixed";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khách sạn Quỳnh Oanh - Luxury Hotel Vietnam",
  description:
    "Experience luxury and comfort at Quynh Oanh Hotel. Premium accommodations with exceptional service in the heart of Vietnam.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <AuthProvider>
        <body
          className={`font-sans  ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}
        >
          <Header />

          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Footer />

          <Analytics />
          <ContactFixed phone="+84912345678" zalo="84912345678" />
        </body>
      </AuthProvider>
    </html>
  );
}
