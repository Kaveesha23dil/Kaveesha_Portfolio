# Image audit

Next.js Image Optimization now serves configured AVIF/WebP variants, caches transformed images, reserves layout space through the existing `fill` containers or explicit dimensions, and lazy-loads below-the-fold images by default.

## Large source files to replace manually when practical

- `mockup-windows-xp.png` — 2.39 MB
- `about-portrait.png` — 2.03 MB
- `Home Page Desktop view.png` — 1.77 MB
- `mockup-gtavi.png` — 1.76 MB
- `Case Study Page Desktop view.png` — 1.75 MB
- `hero-kaveesha.png` — 1.70 MB (above-the-fold/LCP priority)
- `Service Page Desktop view.png` — 1.67 MB
- `mockup-intrinsic-tech.png` — 1.57 MB

Preserve the original full-resolution case-study screens, but consider replacing portrait and project-card source assets with visually reviewed WebP/AVIF exports. `project-nova.png`, `project-roam.png`, `project-synapse.png`, and `hero-portrait.png` appear unused and can be removed after confirming they are not needed elsewhere.
