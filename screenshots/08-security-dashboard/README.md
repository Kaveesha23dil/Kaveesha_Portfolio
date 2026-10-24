# Authentic Step 8 evidence

Final audit update (2026-10-24): the seven-test Chromium suite refreshed real demo
captures 01–08; only 02 changed bytes. Image 09 remains the historical five-pass
report, not the current result. Full provenance and publication decisions:
[final evidence inventory](../../docs/final-evidence-inventory.md).

01–08 are real Chromium screenshots of the running React application. Each visibly
says DEMO DATA; none proves live WSO2/PostgreSQL integration. 09 is the actual
Playwright HTML report for the executed five-test run, captured in Chromium.
Images were reviewed for credentials, client identities, IP addresses and payloads;
displayed API/event references and services are explicit fixtures.

| Filename | Status |
| --- | --- |
| 01-dashboard-overview.png | Captured, demo |
| 02-api-traffic.png | Captured, demo |
| 03-threat-alerts.png | Captured, demo |
| 04-incident-details.png | Captured, demo |
| 05-detection-rules.png | Captured, demo |
| 06-ml-monitoring.png | Captured, demo + actual synthetic evaluation reference |
| 07-api-services.png | Captured, demo |
| 08-responsive-dashboard.png | Captured, 390px demo viewport |
| 09-dashboard-test-results.png | Captured, actual Playwright HTML report |
| 10-github-dashboard-pr.png | Pending approved push and actual PR |

Manual Windows recapture: run npm run dev in frontend, open 127.0.0.1:5173 and choose
Explore demo or authenticate against verified real services. Navigate to the named
view, wait for loading to settle, retain the DEMO DATA banner for fixtures, press
Win+Shift+S, select the real app viewport and save the matching filename. For mobile,
use DevTools responsive mode at 390×844. Never capture the credential dialog,
Authorization headers, environment variables or browser storage.

For live captures first complete step-8-verification.md's WSO2/DB procedure; never
relabel these demo images. For 09 open the genuine generated Playwright report,
not a reconstructed test summary. After approved push and actual PR creation, open
the GitHub page showing feature/security-dashboard -> main and checks, then capture
10 with Win+Shift+S. Never generate or reconstruct an application screenshot.
