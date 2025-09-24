import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./componenets/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kim's Catering - Premium Catering Services in Strathmore, Alberta",
    template: "%s | Kim's Catering"
  },
  description: "Professional catering services for weddings, corporate events, birthdays, and special occasions in Strathmore, Alberta. Fresh, homemade food made with love by Kim's Catering.",
  keywords: [
    "catering Strathmore",
    "wedding catering Alberta",
    "corporate catering",
    "event catering",
    "funeral catering",
    "birthday party catering",
    "homemade food",
    "fresh catering",
    "Kim's Catering",
    "Strathmore catering"
  ],
  authors: [{ name: "Kim's Catering" }],
  creator: "Kim's Catering",
  publisher: "Kim's Catering",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kims-katering.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://kims-katering.vercel.app',
    title: "Kim's Catering - Premium Catering Services in Strathmore, Alberta",
    description: "Professional catering services for weddings, corporate events, birthdays, and special occasions in Strathmore, Alberta. Fresh, homemade food made with love.",
    siteName: "Kim's Catering",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Kim's Catering - Premium Catering Services",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kim's Catering - Premium Catering Services",
    description: "Professional catering services for weddings, corporate events, and special occasions in Strathmore, Alberta.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css" />
        <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.0.0/uicons-brands/css/uicons-brands.css" />
        <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.0.0/uicons-solid-rounded/css/uicons-solid-rounded.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
