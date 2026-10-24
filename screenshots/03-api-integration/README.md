# Step 3.2 screenshot checklist

Capture status rechecked on 2026-10-20: **0 of 9 captured**. Browser inventory was empty,
native apps were unavailable, and creating an in-app browser returned
`Browser is not available: iab`. No images were generated or substituted.

Use the real host browser and Windows Snipping Tool (`Win+Shift+S`), then save
the PNG in this directory. Review the full image before saving: exclude login
fields, passwords, tokens, Authorization headers, browser account identity,
personal notifications and confidential addresses. Never capture the Developer
Portal key-generation panel or terminal credential entry. A cropped capture of
the actual screen is acceptable; do not compose replacement UI or success output.

| Filename | Actual screen and required evidence | Status |
| --- | --- | --- |
| 06-docker-network-verification.png | In host PowerShell run `docker network inspect sentinelapi-network --format '{{range .Containers}}{{.Name}}{{println}}{{end}}'`, then `docker exec sentinelapi-wso2 curl --fail --silent --show-error http://democommerce:8000/health`. Capture both SentinelAPI container names and healthy backend response. Avoid unfiltered `docker inspect`, which includes environment variables. | Manual capture needed; checks passed |
| 07-wso2-api-overview.png | Publisher > DemoCommerceAPI > Overview: name, version and actual context. Sign-in must be completed before capture. | Configured and verified at /democommerceapi; manual capture needed |
| 08-wso2-backend-endpoint.png | Publisher > API Configurations > Endpoints: production URL `http://democommerce:8000`; exclude any endpoint-security credentials. | Configured and verified at /democommerceapi; manual capture needed |
| 09-wso2-gateway-deployment.png | Publisher > Deploy > Deployments: revision number and successful deployment on the actual gateway environment. A submitted revision alone is insufficient. | New revision APPROVED; all live routing checks passed; manual capture needed |
| 10-wso2-developer-portal.png | Dev Portal > DemoCommerceAPI overview: published API, actual HTTPS invoke URL and Unlimited subscription/application association. Exclude account menus and keys. Use two real captures if these cannot fit safely; retain requested main filename. | Published and subscribed; manual capture needed |
| 11-unauthorized-request.png | PowerShell running the smoke script: `orders_without_token: HTTP 401; expected 401`. Include actual API base URL from a safe prior command, never a token. | Actual 401 passed; manual capture needed |
| 12-authorized-request.png | Smoke script output: `orders_with_token: HTTP 200; expected 200`. Keep hidden prompt and credential handling outside the crop. | Actual authenticated test passed; manual capture needed |
| 13-create-order-through-gateway.png | Smoke output: `create_order: HTTP 201; expected 201`, read-created-order 200 and backend read-back match. Do not show headers. | Actual authenticated test passed; manual capture needed |
| 14-github-integration-commit.png | After essential tests pass, local completion commit exists, user approves push, and push succeeds: GitHub main branch commit page showing the integration commit title and hash. Crop account/profile elements. | Pre-existing manual c7f4aa4; final verified checkpoint/push and capture pending |

These filenames are a checklist, not evidence that the corresponding actions
have succeeded. Update this table only after visually checking each saved image.

Resumption verified the actual invoke base URL as `https://localhost:8243/democommerceapi/1.0.0`. The requested `/democommerce` context remains pending a user decision; screenshots must show the actual configuration. New deployed revision: `3a8ce000-e880-4803-85a9-6ca3e035463b`. The integration script prints only safe status/identity fields and can be run with `--test-existing` for real terminal captures; credential entry, consumer keys/secrets and token values must never be included.
