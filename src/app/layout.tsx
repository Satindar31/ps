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
  title: "Ibrahim's Den",
  description: "Personal site of Ibrahim",
  openGraph: {
    title: "Ibrahim's Den",
    description: "Personal site of Ibrahim",
    url: "https://hiibi.xyz",
    siteName: "Ibrahim's Den",
    images: [
      {
        url: "https://hiibi.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ibrahim's Den",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim's Den",
    description: "Personal site of Ibrahim",
    images: ["https://hiibi.xyz/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      nocache: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
