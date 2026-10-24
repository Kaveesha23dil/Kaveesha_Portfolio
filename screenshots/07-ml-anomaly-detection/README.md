# Step 7 authentic evidence checklist

Three numbered files are copies of actual executed synthetic evaluation charts,
not screenshots of an application. No application/terminal/GitHub screenshots were
captured in this run. Native screenshot control is unavailable; pending captures
must be taken manually on the real development host. Never show bearer headers,
passwords, connection strings, IP addresses, client identifiers or request payloads.

| Filename | Status | Exact capture instruction |
| --- | --- | --- |
| 01-feature-dataset.png | Pending | Open sanitized real-profile JSON (after real DB profiling) alongside schema/version and eligible-window counts; mark synthetic profile clearly if used. |
| 02-model-training.png | Pending | Run the reproduction command in ml-evaluation.md in a terminal using a fresh artifact root; capture command and actual model version/training-window output, excluding environment secrets. |
| 03-confusion-matrix.png | Created chart | Copy of actual evaluation/confusion_matrix.png; controlled synthetic, 180 windows. |
| 04-anomaly-score-distribution.png | Created chart | Copy of actual evaluation/anomaly_score_distribution.png; raw decision scores, synthetic. |
| 05-model-comparison.png | Created chart | Copy of actual evaluation/model_comparison.png; actual Step 6 evaluator versus ML. |
| 06-live-anomaly-detection.png | Pending / live blocked | On restored real host capture sanitized worker/DB score for an actually finalized WSO2 window with version and score. If no anomaly occurs capture normal outcome and label it; never invent an anomaly. |
| 07-ml-alert-api.png | Pending / live blocked | Query authenticated /api/v1/ml/anomalies and linked /api/v1/security/alerts/{id}; capture response only, hiding authentication headers. Show actual provenance/version or genuine empty result. |
| 08-automated-test-results.png | Pending | Execute verification commands and capture actual summaries, including the two Windows failures and DB tests pending status. Do not render JUnit as a fake terminal. |
| 09-github-ml-feature-pr.png | Pending / push approval needed | After approved feature push and actual PR creation, capture real GitHub PR page showing head/base and checks; do not capture prepared local text as a remote PR. |
