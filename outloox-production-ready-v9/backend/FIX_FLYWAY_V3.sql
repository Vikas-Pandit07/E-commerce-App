-- Run this if Flyway reports:
-- "Detected failed migration to version 3 (legacy outloox upgrade)"
-- and your local database is an old partially-upgraded one.

USE outloox;

-- Remove failed Flyway record so migration V3 can be retried
DELETE FROM flyway_schema_history
WHERE version = '3' AND success = 0;

-- Optional: inspect remaining history
SELECT installed_rank, version, description, type, script, success
FROM flyway_schema_history
ORDER BY installed_rank;
