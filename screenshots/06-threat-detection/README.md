# Step 6 genuine screenshot checklist

0/8 captured. Screenshot-tool inventory returned no apps or browsers in this
session. No images were generated, reconstructed or substituted for evidence.
All entries remain pending; database/API/PR entries also require live validation.

On Windows, prepare the actual indicated screen, press **Win+Shift+S**, select a
rectangle containing only the safe result area, then save the PNG to this directory
with the exact filename. Do not include .env, terminal history containing tokens,
passwords, request Authorization headers, application keys or private request data.
Open each saved PNG in Photos, zoom to 100%, confirm readability and inspect every
visible pane for secrets before changing its status to captured. Record UTC time,
command/source, scenario and relevant event/alert IDs in the verification document.

| Filename | Required real screen / manual preparation | Status |
| --- | --- | --- |
| 01-detection-rules.png | After deployment, display the authenticated GET /api/v1/security/rules JSON response only; include disabled/unsupported states. Keep token-bearing request controls off-screen. | Pending |
| 02-normal-traffic.png | Run `python scripts/simulate_threat_traffic.py normal` with token already in private environment; show the resulting actual status report and its UTC window. Correlate no-alert result for this scenario. | Pending |
| 03-suspicious-traffic.png | In a separate quiet five-minute window, run the error-rate scenario; show real returned statuses including any 429. Never claim threshold success if quota prevents it. | Pending |
| 04-threat-alert-database.png | In the private database console, SELECT alert ID, rule/version, API, severity/status, windows, measured_value and threshold for the genuinely triggered alert. Connection passwords must be hidden. | Pending |
| 05-alert-api-response.png | Display actual authenticated GET /api/v1/security/alerts/{alert_id} response JSON; crop request/header controls. | Pending |
| 06-alert-evidence.png | Show real JOIN from alert_evidence.event_id to traffic_events.event_id restricted to that alert, with timestamps/status/source. Do not include raw gateway files/sourceIP. | Pending |
| 07-automated-test-results.png | Run the documented Pytest commands in a clean terminal with no token history; capture actual summary. Include platform failures or skipped/blocked integration status honestly. | Pending |
| 08-github-threat-detection-pr.png | Only after verified commits, approved feature push and actual PR creation, capture the GitHub PR targeting main. | Pending |

An offline synthetic test screenshot must say "synthetic fixtures" and cannot
substitute for screenshots 02 through 06. A JSON evidence file is not a screenshot.
