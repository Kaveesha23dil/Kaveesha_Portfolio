# SentinelAPI article upgrade

## Scope and editorial changes

The existing `/blog/engineering-sentinelapi-api-security-monitoring` route, article title, date, metadata description, canonical URL, and social metadata are retained. No hosting or deployment section was added. The dedicated `/projects/sentinelapi` route already existed and is linked from the conclusion.

The article was consolidated from 16 sections into 10. Debugging, schema drift, and end-to-end checks now form **Engineering Challenges, Debugging & Verification**, using problem, diagnosis, resolution, and lesson paragraphs. OAuth invocation debugging, the stopped bridge, the 54-event commit, the historical 75-event count, migration revision `b7d000000001`, the five-minute/20-request/strictly-above-50% rule, transactional locking and checkpoints, and the genuine alert with 16 links remain documented.

The hero adds the requested subtitle, six technology tags, and GitHub link. Verified-results cards explicitly describe historical controlled testing. The architecture separates synchronous requests from asynchronous monitoring and labels the ML branch as experimental. The conclusion summarizes the work and links both repository and case study.

## Files changed

- `content/blog/sentinelapi.json`: edited article and hero fields.
- `lib/blog.ts`: optional subtitle, tags, and repository fields.
- `lib/blog-image-sizes.json`: actual PNG dimensions for stable image layout.
- `components/BlogContent.tsx`: image, code, diagram, and safe heading rendering.
- `components/blog/ArticleCode.tsx`: code labels, JSON colors, copy control, status feedback.
- `components/blog/ArticleScreenshot.tsx`: native modal dialog, original-resolution zoom, original-file links, keyboard navigation and focus return.
- `components/blog/ArticleToc.tsx`: collapsible contents, active section, accessible anchors, reduced-motion support; avoids conflict with the existing global scroll handler.
- `components/blog/SentinelArchitecture.tsx`: responsive, semantic architecture visualization.
- `components/blog/VerifiedResults.tsx`: the three requested verification cards.
- `app/blog/[slug]/page.tsx` and `article.css`: article layout, hero, sticky desktop navigation and conclusion; existing dark/lime palette retained.
- `scripts/verify-sentinelapi.mjs`: repeatable browser checks.
- This review record.

## Screenshot audit and publication limitations

All eight PNGs in `public/blog/sentinelapi/` were hash-compared to their supplied originals and are byte-identical. No image values, timestamps, results, or labels were edited. The dashboard is labeled as demo fixtures; charts are labeled as controlled synthetic evaluation. The gallery supports fit-to-screen, full-resolution zoom, an original-file link, previous/next controls, Left/Right keys, Escape, close button, backdrop dismissal, and native modal focus containment/restoration.

| Story position | Asset used or reason excluded |
| --- | --- |
| 01 — API Publisher | `publisher.png`, from `screenshots/final-blog/02-wso2-publisher.png` |
| 02 — OAuth verification | Raw success capture `screenshots/02boauthauthorized.png` visibly contains a bearer token. Raw unauthorized capture includes a personal workspace path. Neither is added to public assets; the genuine response is retained as formatted JSON. |
| 03 — Rate policy/enforcement | `rate-policy.png`; actual 429 records also appear in `gateway-events.png`. Raw terminal enforcement capture includes a personal path and remains excluded. |
| 04 — Gateway logs | Raw `screenshots/04wso2apitrafficlogs.png` includes source addresses and a personal path; excluded, with pipeline stages explained in text. |
| 05 — Persistence | `gateway-events.png`, shown near the opening narrative. |
| 06 — Standalone alert | Raw `screenshots/06securityalerts.png` includes a personal workspace path. No fabricated replacement is added. The documented genuine alert and joined evidence remain in the article. |
| 07 — Evidence | `alert-evidence.png`: 12 visible rows, 16 total links verified separately. |
| 08–10 — ML evaluation | `confusion-matrix.png`, `score-distribution.png`, `model-comparison.png`; 180 synthetic windows. |
| 11 — Dashboard | `dashboard.png`; explicit demo labeling preserved in image and caption. |

Clean captures of 02, 04, and 06 are still needed for a complete numbered screenshot sequence. Recapture actual outputs without credentials or personal/environment details; do not reconstruct or modify evidence. Do not publish the raw OAuth token screenshot.

## Actual validation

- `npm run build`: passed, including TypeScript and 22 generated pages.
- `npm run lint`: no errors; the existing `next/no-img-element` warnings in `ReviewCard.tsx` and `ReviewForm.tsx` remain.
- Chrome/Playwright production-preview checks: passed at **1440, 768, 390, and 375 pixels**.
- Verified page overflow before and after loading images; all nine inline/hero image instances loaded and retained their aspect ratios.
- Verified the three result cards, architecture, heading hierarchy entry point, ten contents destinations, active navigation, header offset, and collapsible contents.
- Verified all three code blocks, exact JSON formatting, no visible fence characters, and clipboard contents (normalizing Windows clipboard line endings in the test).
- Verified modal keyboard navigation, original-resolution zoom, focus containment/return, Escape, close-button, and backdrop dismissal.
- Verified the canonical URL, existing case-study link, and absence of browser console/runtime errors in these runs.
- Verified reduced-motion navigation at all four widths and normal-motion scrolling alongside the existing portfolio scroll controller.
- Inspected desktop/tablet/mobile hero screenshots, architecture screenshots, and lightbox screenshots. QA PNGs are under ignored `.next/article-qa/`; they are not published assets.
- `git diff --check`: passed.

This is browser interaction and semantic accessibility verification, not an independent screen-reader, WCAG certification, or full performance audit. The repository has no configured component-test suite. No claim is made that project backend results were re-executed by this portfolio change; those remain the supplied historical engineering evidence.

## Repeat the browser checks

Use a local Playwright installation or set `PLAYWRIGHT_MODULE` to an existing Playwright package directory. Chrome is the default browser channel; override with `BROWSER_CHANNEL` if needed. No new runtime dependency is added to the portfolio.

1. Run `npm run build` and `npm run start -- --port 3104`.
2. Set `TEST_BASE_URL` to `http://localhost:3104`.
3. Run `node scripts/verify-sentinelapi.mjs`.

## Git handoff

Feature branch: `codex/polish-sentinelapi-article`.

The focused commit covers the article, rendering components, scoped styles, checks, and this review record. Review with `git show --stat` and `git show`; run the checks above before publishing. No push or deployment is performed as part of this task.

## Final polish verification — 25 October 2026

The working tree was clean on `codex/polish-sentinelapi-article` before this pass. Inspection found that fenced snippets, responsive architecture, native modal behavior, and table-of-contents navigation were already implemented. No reproduced fence-rendering or selected-image indexing failure required a rewrite.

Changes in this pass:

- `content/blog/sentinelapi.json`: OAuth debugging now explicitly uses Problem, Diagnosis, Resolution, and Lesson; existing token-handling evidence and JSON remain intact.
- `components/BlogContent.tsx`: challenge headings followed by the explicit Problem paragraph render as semantic sections, preserving their nested code blocks.
- `app/blog/[slug]/article.css`: a restrained left border groups each of the three challenges. Previously these paragraphs had no visual grouping.
- `components/blog/ArticleScreenshot.tsx`: each dialog initializes to its own screenshot instead of every closed dialog initially describing the first PostgreSQL image. Opening already selected the right image; this removes the misleading initial duplicate state.
- `app/blog/[slug]/page.tsx` and `app/projects/sentinelapi/page.tsx`: existing links use View Source on GitHub, Explore Project Case Study, and Read Technical Article. No links were added.
- `scripts/verify-sentinelapi.mjs`: adds 1024px, every screenshot trigger, caption/source checks, next/previous and arrow navigation, image-click containment, width stability, all code-copy buttons, and the article/case-study round trip.

Verification:

- Production `npm run build`: passed, all 22 pages generated. Initial sandbox attempts failed with Turbopack child-process / filesystem permission errors; the standard build succeeded outside the sandbox. No build configuration changed.
- `npm run lint`: passed with zero errors and the same two existing next/no-img-element warnings in ReviewCard and ReviewForm.
- `npx tsc --noEmit`: passed.
- Browser checks passed at 1440, 1024, 768, 390, and 375px against the local production build. Nine screenshot triggers loaded with correct aspect ratios and matching selected captions; all three code blocks rendered without fences and copied exact text. Close, backdrop, Escape, keyboard navigation, zoom, focus containment and return, and page-width stability passed.
- TOC destinations, active state, collapse control, header offset, reduced-motion and normal-motion scrolling passed. No browser console or runtime errors were reported.
- The existing architecture stacks on mobile without overflow and distinguishes gateway requests from asynchronous processing and experimental ML; no diagram edits were needed.
- Visually inspected mobile hero, desktop/mobile architecture, and the OAuth challenge. Element captures of the tall architecture may include the fixed global header overlay; that is a capture artifact during scrolling.
- Article/case-study links navigate in both directions. GitHub repository was opened successfully through the web tool. Blog index responds successfully. There is only one article route in the current content set, so no other article exists to regression-test.
- There is no configured formatter or separate unit/component test command. The existing browser verification script was extended and run instead. Git whitespace checking is used for the focused diff.

Original technical values, screenshot files, SEO metadata, and routes were preserved. Previously documented missing clean source captures remain an editorial limitation; this pass introduces no placeholder evidence. No push or deployment was performed.
