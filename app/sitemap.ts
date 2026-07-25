import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const routes = [
  { path: "", lastModified: "2026-07-25" },
  { path: "/about", lastModified: "2026-07-25" },
  { path: "/projects", lastModified: "2026-07-25" },
  { path: "/projects/intrinsic-tech", lastModified: "2026-07-21" },
  { path: "/projects/gtavi-experience", lastModified: "2026-07-21" },
  { path: "/projects/windows-xp-portfolio", lastModified: "2026-07-21" },
  { path: "/contact", lastModified: "2026-07-25" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, lastModified }) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(lastModified),
    changeFrequency: path.startsWith("/projects/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path === "/projects" ? 0.9 : path.startsWith("/projects/") ? 0.8 : 0.7,
  }));
}
