# SEO production setup

Configure this environment variable locally and in the production host:

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
```

Replace the example with the final public origin, without a trailing slash. It powers canonical URLs, Open Graph URLs, structured data, `robots.txt`, and `sitemap.xml`. Do not deploy with the localhost fallback.

Vercel deployments also use `VERCEL_PROJECT_PRODUCTION_URL` automatically when the public variable is absent. A custom domain should still be set explicitly with `NEXT_PUBLIC_SITE_URL` so every canonical URL points to that domain.

After deployment:

1. Add the public site to Google Search Console.
2. Verify ownership (the included verification file and metadata use token `50c9a75f6f2ca4e3`).
3. Submit `https://YOUR-DOMAIN/sitemap.xml` in Search Console.
4. Request indexing for the home page and the three project case studies.
5. Keep project copy and case studies updated; metadata helps Google understand a page but cannot guarantee ranking.

Analytics is intentionally not enabled. If analytics is added later, use a real environment-provided ID and implement the consent behavior required for the visitor regions being served.
