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
import { generateBaseMetadata } from "@/lib/metadata";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// metadata mặc định toàn site (tiếng Việt)
export const metadata: Metadata = generateBaseMetadata(
  "Khách sạn Quỳnh Oanh - Khách sạn sang trọng tại Việt Nam",
  "Trải nghiệm sự sang trọng và thoải mái tại Khách sạn Quỳnh Oanh. Dịch vụ đẳng cấp, tiện nghi hiện đại, tọa lạc tại trung tâm Việt Nam."
);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <AuthProvider>
        <body
          className={`font-sans  ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}
        >
          <Header />
          <Suspense fallback={<div>Đang tải...</div>}>{children}</Suspense>
          <Footer />

          <Analytics />
          <ContactFixed phone="+84912345678" zalo="84912345678" />
        </body>
      </AuthProvider>
    </html>
  );
}
