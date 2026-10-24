import sentinelapi from "@/content/blog/sentinelapi.json";

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  cover?: string;
  coverAlt?: string;
  coverCaption?: string;
  content?: string;
  sections: { heading: string; paragraphs: string[] }[];
};

// Add articles here. Each entry creates a card and a /blog/[slug] page.
export const blogPosts: BlogPost[] = [sentinelapi];

export function getBlogPosts() {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}
