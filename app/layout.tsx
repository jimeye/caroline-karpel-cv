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

export const metadata: Metadata = {
  title: "CV DE CAROLINE KARPEL 40 VERSIONS ✨",
  description: "40 versions de CV professionnels élégants et stylés pour Caroline Karpel - Sales Business Partner chez Ennov Group",
  icons: {
    icon: '/og-caroline-karpel.jpg',
  },
  openGraph: {
    title: "CV DE CAROLINE KARPEL 40 VERSIONS ✨",
    description: "40 designs de CV professionnels élégants - Sales Business Partner avec 25 ans d'expérience",
    images: [
      {
        url: '/og-caroline-karpel.jpg',
        width: 1200,
        height: 630,
        alt: 'Caroline Karpel - Sales Business Partner',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CV DE CAROLINE KARPEL 40 VERSIONS ✨",
    description: "40 versions de CV professionnels pour Caroline Karpel",
    images: ['/og-caroline-karpel.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
