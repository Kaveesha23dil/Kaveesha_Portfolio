import type { Metadata } from "next";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "Kaveesha Dilshan",
  role: "Digital Designer & Creative Developer",
  description: "Portfolio of Kaveesha Dilshan, a digital designer and creative developer in Colombo, Sri Lanka, creating user-centered products, responsive websites, and motion-rich digital experiences.",
  url: (configuredUrl || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",
  location: "Colombo, Sri Lanka",
  email: "hello@windsun.dev",
  image: "/hero-kaveesha.png",
  socialImage: "/opengraph-image",
  profiles: [
    "https://www.behance.net/kaveeshadilshan10",
    "https://dribbble.com/Kavee23",
    "https://github.com/Kaveesha23dil",
  ],
  skills: ["UI/UX design", "product design", "creative development", "Next.js", "React", "GSAP", "responsive web design"],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

export function createMetadata({ title, description, path, image = siteConfig.socialImage, imageAlt, type = "website" }: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(image);
  const fullTitle = `${title} | ${siteConfig.name} — ${siteConfig.role}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: `${siteConfig.name} Portfolio`,
      locale: siteConfig.locale,
      type,
      images: [{ url: socialImage, width: 1200, height: 630, alt: imageAlt || `${siteConfig.name} — ${siteConfig.role}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}

export function createProjectBreadcrumb(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
      { "@type": "ListItem", position: 3, name, item: absoluteUrl(path) },
    ],
  };
}
