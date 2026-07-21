# SEO production setup

Configure this environment variable locally and in the production host:

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
```

Replace the example with the final public origin, without a trailing slash. It powers canonical URLs, Open Graph URLs, structured data, `robots.txt`, and `sitemap.xml`. Do not deploy with the localhost fallback.

Vercel deployments also use `VERCEL_PROJECT_PRODUCTION_URL` automatically when the public variable is absent. A custom domain should still be set explicitly with `NEXT_PUBLIC_SITE_URL` so every canonical URL points to that domain.

After deployment:

1. Add the public site to Google Search Console.
2. Verify ownership (the included verification file and metadata use token `50c9a75f6f2ca4e3`). The verification file only proves ownership; it does not submit or index the site.
3. Open **Indexing → Sitemaps** and submit `https://YOUR-DOMAIN/sitemap.xml`.
4. Use **URL Inspection** for `/`, `/about`, `/projects`, and each project case study. Run **Test live URL**, then click **Request indexing** for every page that is not indexed.
5. Check **Indexing → Pages** after several days. Fix any `noindex`, redirect, duplicate canonical, soft 404, or server-error report before requesting indexing again.
6. Add the site to Bing Webmaster Tools and submit the same sitemap. Bing can import a verified Search Console property.
7. Link to the portfolio from the matching GitHub, Behance, Dribbble, LinkedIn, Contra, and other professional profiles. Use the same full name, role, location, portrait, and portfolio URL everywhere so search engines can connect those profiles to one person.
8. Add the portfolio URL to the GitHub profile bio and repository descriptions, then pin the strongest portfolio projects. Real, relevant links are more useful than repeating keywords in metadata.
9. Prefer a short custom domain such as `kaveeshadilshan.com` when available. Set it as the Vercel primary domain and update `NEXT_PUBLIC_SITE_URL`; keep the old Vercel URL redirecting to the primary domain.
10. Publish substantial case studies or articles regularly. Target one specific search intent per page, such as `UI/UX designer in Sri Lanka`, `React developer in Colombo`, or a project-specific case-study query. Avoid creating thin pages that differ only by keyword.
11. Measure impressions, queries, clicks, countries, and pages in Search Console. SEO results typically take days or weeks for a new site and competitive generic keywords can take longer.

## Before every production deployment

- Confirm `NEXT_PUBLIC_SITE_URL` is the final public origin.
- Open `/robots.txt`, `/sitemap.xml`, and `/google50c9a75f6f2ca4e3.html` on production and confirm they return HTTP 200.
- Inspect the page source and confirm the canonical URL, title, description, and JSON-LD use the production domain.
- Run Lighthouse for SEO, accessibility, performance, and best practices; repair regressions that prevent visitors or crawlers from using the page.
- Do not change domains or canonical URLs repeatedly. Stable URLs build search history and backlinks over time.

Analytics is intentionally not enabled. If analytics is added later, use a real environment-provided ID and implement the consent behavior required for the visitor regions being served.
