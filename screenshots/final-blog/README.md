# Reviewed final blog screenshots

Thirteen safe PNGs in this directory are **byte-identical copies** of user-supplied
originals. No image was cropped, redacted, reconstructed or generated. All 31 raw
originals remain unchanged in the parent directory and are ignored to prevent
accidental staging. Some contain a bearer token, raw source addresses or personal
workspace paths and must not be published.

The [complete evidence audit](../../docs/release-evidence-audit.md) lists every
original, its visual findings, and every copied filename. Machine-readable hashes,
dimensions and mappings are in
[evidence-inventory.json](../../infrastructure/portfolio-release/evidence-inventory.json).
No authoritative capture times were supplied; dates visible inside images are
record/configuration observations, not invented capture timestamps.

Images 01–05 show actual documentation/configuration or controlled runtime data.
Images 07–12 are actual React screens with explicit **DEMO DATA**; 11 also displays
the retained controlled synthetic evaluation reference. Image 13 is a published
lifecycle screen, not gateway revision-deployment evidence; 14 is the catalog.

## Screenshot 06: genuine but held for clean recapture

The original `screenshots/06securityalerts.png` shows the actual medium/open/risk-50
alert detected at 2026-10-24 07:52:41.065997 UTC with 16 evidence links, but includes
a personal workspace path. It remains excluded unchanged. No placeholder
`06-security-alerts.png` was created. Image 05 safely shows joined alert/evidence
rows from the same genuine case (12 rows shown, 16 total links verified separately).

For a clean recapture, run the actual read-only query in the existing host terminal:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/show_security_alerts.ps1
```

Capture only the actual table with Win+Shift+S, excluding the prompt/history and
notifications; save `06-security-alerts.png` here. Do not edit returned values.
Caption: **Controlled local WSO2 error-rate validation: genuine persisted alert
with linked evidence; not a real-world attack.** Review the new PNG before staging
it, and record actual capture time/commit only after capture.

The [canonical blog draft](../../docs/sentinelapi-technical-blog.md) uses only
reviewed relative image paths. No blog/video/public release is claimed.
