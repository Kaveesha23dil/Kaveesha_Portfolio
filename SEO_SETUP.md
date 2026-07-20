# SEO production setup

Configure this environment variable locally and in the production host:

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
```

Replace the example with the final public origin, without a trailing slash. It powers canonical URLs, Open Graph URLs, structured data, `robots.txt`, and `sitemap.xml`. Do not deploy with the localhost fallback.

Analytics is intentionally not enabled. If analytics is added later, use a real environment-provided ID and implement the consent behavior required for the visitor regions being served.
