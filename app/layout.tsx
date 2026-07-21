import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionController from "@/components/MotionController";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.role}`, template: `%s | ${siteConfig.name} — ${siteConfig.role}` },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [...siteConfig.skills],
  referrer: "origin-when-cross-origin",
  verification: { google: "50c9a75f6f2ca4e3" },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/apple-icon" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "portfolio",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#050706", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd data={[
          { "@context": "https://schema.org", "@type": "Person", "@id": `${siteConfig.url}/#person`, name: siteConfig.name, url: siteConfig.url, image: absoluteUrl(siteConfig.image), jobTitle: siteConfig.role, description: siteConfig.description, email: `mailto:${siteConfig.email}`, address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" }, homeLocation: { "@type": "Place", name: siteConfig.location }, knowsAbout: [...siteConfig.skills], sameAs: [...siteConfig.profiles] },
          { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteConfig.url}/#website`, url: siteConfig.url, name: `${siteConfig.name} Portfolio`, description: siteConfig.description, inLanguage: "en", author: { "@id": `${siteConfig.url}/#person` } },
        ]} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Navbar /><MotionController /><div id="main-content" tabIndex={-1}>{children}</div>
      </body>
    </html>
  );
}
