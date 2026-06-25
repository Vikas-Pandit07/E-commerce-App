# Fixing the Flyway V3 startup error

If backend startup fails with:

- `Detected failed migration to version 3 (legacy outloox upgrade)`

then your local MySQL database likely contains a **failed Flyway entry** from an earlier run.

## Fastest fix for local development

### Option 1 — Best if you can use a fresh DB
Create a new database name in `.env`, for example:

```env
DB_NAME=outloox_v2
```

Then run backend again:

```powershell
.\mvnw.cmd clean spring-boot:run
```

Because Flyway will start from a clean schema, this is the safest option.

---

### Option 2 — Repair the existing DB
Run the SQL in `FIX_FLYWAY_V3.sql` against your MySQL database.

It removes the failed Flyway history row for version 3 so Flyway can retry it.

#### Example steps in MySQL shell

```sql
USE outloox;
DELETE FROM flyway_schema_history WHERE version = '3' AND success = 0;
SELECT * FROM flyway_schema_history ORDER BY installed_rank;
```

Then start backend again:

```powershell
.\mvnw.cmd clean spring-boot:run
```

---

## Why this happened

Your database was created from an older schema version, and migration `V3__legacy_outloox_upgrade.sql` partially ran once and failed.
Flyway records that failure in `flyway_schema_history`, and later runs stop until you repair it.

---

## Commons Logging warning

If you see:

```text
Standard Commons Logging discovery in action with spring-jcl: please remove commons-logging.jar from classpath
```

I already excluded `commons-logging` from Cloudinary and Razorpay dependencies in the backend `pom.xml`.

After refreshing Maven dependencies and rebuilding, that warning should go away.

### Refresh dependencies

```powershell
.\mvnw.cmd clean package -DskipTests
```

or reload Maven project in IntelliJ/STS/Eclipse.
