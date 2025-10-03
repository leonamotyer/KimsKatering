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
  description: "Professional catering services in Strathmore, Alberta. Specializing in weddings, corporate events, funerals, and special occasions. Fresh, homemade food made with love and attention to detail.",
  keywords: [
    "catering Strathmore",
    "wedding catering Alberta",
    "corporate catering",
    "funeral catering",
    "event catering",
    "homemade food",
    "fresh catering",
    "Kim's Catering",
    "Strathmore catering",
    "Alberta catering services"
  ],
  authors: [{ name: "Kim's Catering" }],
  creator: "Kim's Catering",
  publisher: "Kim's Catering",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kims-Catering.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://kims-Catering.vercel.app',
    siteName: "Kim's Catering",
    title: "Kim's Catering - Premium Catering Services in Strathmore, Alberta",
    description: "Professional catering services in Strathmore, Alberta. Specializing in weddings, corporate events, funerals, and special occasions. Fresh, homemade food made with love.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Kim's Catering - Professional Catering Services",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kim's Catering - Premium Catering Services",
    description: "Professional catering services in Strathmore, Alberta. Fresh, homemade food for all occasions.",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://kims-Catering.vercel.app/#business",
        "name": "Kim's Catering",
        "description": "Professional catering services in Strathmore, Alberta specializing in weddings, corporate events, funerals, and special occasions.",
        "url": "https://kims-Catering.vercel.app",
        "telephone": "403-497-9338",
        "email": "kim@kimsCatering.ca",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Bay #1 - 70 Slater Rd",
          "addressLocality": "Strathmore",
          "addressRegion": "Alberta",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "51.0453",
          "longitude": "-113.4008"
        },
        "openingHours": "Mo-Fr 08:00-18:00",
        "priceRange": "$$",
        "servedCuisine": "Canadian",
        "hasMenu": "https://kims-Catering.vercel.app/menu",
        "image": "https://kims-Catering.vercel.app/og-image.jpg",
        "logo": "https://kims-Catering.vercel.app/logo.png",
        "sameAs": [
          "https://www.facebook.com/kimscatering",
          "https://www.instagram.com/kimscatering"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://kims-Catering.vercel.app/#website",
        "url": "https://kims-Catering.vercel.app",
        "name": "Kim's Catering",
        "description": "Professional catering services in Strathmore, Alberta",
        "publisher": {
          "@id": "https://kims-Catering.vercel.app/#business"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://kims-Catering.vercel.app/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://kims-Catering.vercel.app/#services",
        "name": "Catering Services",
        "description": "Professional catering for weddings, corporate events, funerals, and special occasions",
        "provider": {
          "@id": "https://kims-Catering.vercel.app/#business"
        },
        "serviceType": "Catering",
        "areaServed": {
          "@type": "City",
          "name": "Strathmore, Alberta"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Catering Menu",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Wedding Catering"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Corporate Catering"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Funeral Catering"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Event Catering"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css" />
        <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.0.0/uicons-brands/css/uicons-brands.css" />
        <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.0.0/uicons-solid-rounded/css/uicons-solid-rounded.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
