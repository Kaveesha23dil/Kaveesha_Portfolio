import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionController from "@/components/MotionController";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Kaveesha Dilshan | UI/UX Designer & Creative Developer",
    template: "%s | Kaveesha Dilshan",
  },

  description:
    "Portfolio of Kaveesha Dilshan, a UI/UX designer and creative developer in Colombo, Sri Lanka, specializing in product design, responsive websites, Next.js development, motion and digital experiences.",

  applicationName: `${siteConfig.name} Portfolio`,

  authors: [
    {
      name: "Kaveesha Dilshan",
      url: siteConfig.url,
    },
  ],

  creator: "Kaveesha Dilshan",
  publisher: "Kaveesha Dilshan",

  keywords: [...siteConfig.skills],

  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "50c9a75f6f2ca4e3",
  },

  manifest: "/manifest.webmanifest",

  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "portfolio",

  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: "Kaveesha Dilshan Portfolio",
    title: "Kaveesha Dilshan | UI/UX Designer & Creative Developer",
    description:
      "UI/UX designer and creative developer in Sri Lanka creating user-centered websites, applications and interactive digital experiences.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kaveesha Dilshan – UI/UX Designer and Creative Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kaveesha Dilshan | UI/UX Designer & Creative Developer",
    description:
      "Portfolio of Kaveesha Dilshan, a UI/UX designer and creative developer based in Sri Lanka.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050706",
  colorScheme: "dark",
};

export default function Root({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${siteConfig.url}/#person`,
              name: siteConfig.name,
              url: siteConfig.url,
              image: absoluteUrl(siteConfig.image),
              jobTitle: siteConfig.role,
              description: siteConfig.description,
              email: `mailto:${siteConfig.email}`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Colombo",
                addressCountry: "LK",
              },
              homeLocation: {
                "@type": "Place",
                name: siteConfig.location,
              },
              knowsAbout: [...siteConfig.skills],
              sameAs: [...siteConfig.profiles],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteConfig.url}/#website`,
              url: siteConfig.url,
              name: `${siteConfig.name} Portfolio`,
              description: siteConfig.description,
              inLanguage: "en",
              author: {
                "@id": `${siteConfig.url}/#person`,
              },
            },
          ]}
        />

        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>

        <Navbar />
        <MotionController />

        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  );
}