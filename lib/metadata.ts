import type { Metadata } from "next";

// Hàm cơ bản đã có
export function generateBaseMetadata(
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title,
      description,
      url: "https://quynhoanh.vercel.app",
      siteName: "Khách sạn Quỳnh Oanh",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Khách sạn Quỳnh Oanh",
        },
      ],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

// Hàm sinh metadata theo id
export function generateMetadataById(
  id: string,
  title: string,
  description: string
): Metadata {
  return {
    ...generateBaseMetadata(title, description),
    openGraph: {
      ...generateBaseMetadata(title, description).openGraph,
      url: `https://quynhoanh.vercel.app/rooms/${id}`, 
    },
    twitter: {
      ...generateBaseMetadata(title, description).twitter,
    },
  };
}
