# Genuine screenshot checklist

All seven items are pending. Computer-use inventory on 2026-10-22 returned no
apps and no browsers. No screenshots were generated or reconstructed. Capture
real windows, save the exact filenames here, then open and visually inspect each
before marking captured. Hide password input, environment contents, connection
URLs and Docker environment inspection. Never capture expanded Compose config.

- [ ] 01-postgresql-container.png: `docker compose ps postgres` showing healthy
  sentinelapi-postgres, pinned image and no host port binding; optionally show
  `docker inspect sentinelapi-postgres --format '{{json .NetworkSettings.Ports}}'`.
- [ ] 02-database-schema.png: real `docker compose exec postgres sh -c
  'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\dt"'` showing all seven
  tables plus alembic_version. No password or environment dump.
- [ ] 03-alembic-migrations.png: actual verification script output with repeated
  upgrade success, alembic check and disposable downgrade/upgrade result. Show
  `docker compose run --rm --no-deps persistence alembic current` for revision.
- [ ] 04-event-records.png: query the test database named in
  infrastructure/database/database-verification.json for event_id, source,
  endpoint and status_code. Show source=demo-test and label fabricated data.
  Do not claim these came from WSO2. Do not insert into the main database.
- [ ] 05-persistence-test.png: actual restart output and subsequent
  `PASS: fabricated event survived...` line, plus matching marker UUID in the
  verification JSON. A restart flag alone is not an application screenshot.
- [ ] 06-automated-tests.png: real database Pytest, backend Pytest and WSO2
  tooling summaries; distinguish synthetic tooling from live gateway checks.
- [ ] 07-github-database-commit.png: GitHub commit page with message and hash,
  only after successful commit and explicitly approved push.

For test-record inspection, copy only the non-secret test database name from the
report into `psql -d <test_database>` inside the PostgreSQL container and select
safe columns. Keep no password in the command history. Test databases and marker
rows are deliberately retained; no destructive cleanup is needed for capture.
