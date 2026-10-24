# Genuine Step 5 screenshot checklist

All eight items pending. Computer-use inventory returned no apps and no browsers.
No PNG files were created. Capture real terminal/browser windows, save the exact
filenames here, then open and visually inspect each before marking captured.
Hide tokens, passwords, Authorization values, private keys and source addresses.
Never capture .env, expanded Compose config or raw api.log containing sourceIP.

- [ ] 01-wso2-api-logging.png: genuine sanitized DevOps API before/after output
  showing only DemoCommerceAPI BASIC. `logging-configuration.json` contains the
  actual response; alternatively show the live configure script's read-only output.
- [ ] 02-real-gateway-log.png: actual `python scripts/inspect_api_logs.py` output
  with source timestamp, API name, observed field names, flow, method, status and
  endpoint template. Label this sanitized output; do not show sourceIP values,
  raw target query strings, headers or payloads. It is not a fabricated raw log.
- [ ] 03-collector-running.png: real `docker compose ps collector monitoring
  postgres`, healthy status and loopback monitoring binding, with collector logs
  showing committed gateway-event counts. No container environment inspection.
- [ ] 04-postgresql-traffic-events.png: inside the PostgreSQL container, open
  psql using its runtime user/database and select event_id, timestamp, http_method,
  endpoint, status_code, source from traffic_events where source='wso2-gateway'.
  Show real rows and NULL missing measurements; exclude fabricated test databases.
- [ ] 05-monitoring-overview-response.png: `python scripts/query_monitoring.py
  overview` using environment token or hidden prompt; actual HTTP 200 and status
  breakdown. Never show the bearer value or its header.
- [ ] 06-collector-restart-test.png: actual end-to-end verifier output showing
  source/database/API scoped counts, collector restart/replay acknowledgement
  and unchanged counts. Historical proof JSON is genuine evidence but label its
  UTC window; do not imply the growing unfiltered database still contains six rows.
- [ ] 07-automated-test-results.png: executed 57-test collector/database suite,
  23 host tooling/bridge tests and 12 DemoCommerce tests. Distinguish tests from
  the real gateway proof and keep warnings/pending Step 3.3 checks visible.
- [ ] 08-github-feature-pr.png: feature branch PR targeting main, after approved
  push and actual PR creation. Show title, commits and checks. No merge without
  separate approval. Leave pending while PR is only prepared locally.

For SQL inspection, `docker compose exec postgres bash`, then run
`psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"` inside the container. Passwords need
not be echoed. Example safe query: `SELECT event_id, timestamp, http_method,
endpoint, status_code, source FROM traffic_events WHERE source='wso2-gateway'
ORDER BY timestamp DESC LIMIT 10;`. Do not expose PostgreSQL on the host for capture.
