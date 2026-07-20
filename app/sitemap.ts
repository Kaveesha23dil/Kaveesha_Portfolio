import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/projects",
  "/projects/intrinsic-tech",
  "/projects/gtavi-experience",
  "/projects/windows-xp-portfolio",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    changeFrequency: route.startsWith("/projects/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/projects" ? 0.9 : route.startsWith("/projects/") ? 0.8 : 0.7,
  }));
}
