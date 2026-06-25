# Fix for current startup error: `Unsupported Database: MySQL 8.0`

## Why this is happening
Your logs show this exact error:

```text
Caused by: org.flywaydb.core.api.FlywayException: Unsupported Database: MySQL 8.0
```

This happens because **Flyway 10+ requires the database-specific module for MySQL**.
Using only `flyway-core` is not enough.

## Fix already applied in latest code
I added this dependency to `backend/pom.xml`:

```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>

<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-mysql</artifactId>
</dependency>
```

## Important observation from your logs
You are still running from:

```text
outloox-production-ready-v7
```

So you are **not using the newest fixed package**.

---

## What you should do now

### Best option
Use the latest package and extract it fresh.

Then run inside backend:

```powershell
.\mvnw.cmd clean spring-boot:run
```

---

### If you want to fix your current extracted folder manually
Open `backend/pom.xml` and add:

```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-mysql</artifactId>
</dependency>
```

Then run:

```powershell
.\mvnw.cmd clean
.\mvnw.cmd dependency:purge-local-repository
.\mvnw.cmd spring-boot:run
```

If purge feels heavy, at minimum run:

```powershell
.\mvnw.cmd clean spring-boot:run
```

---

## If commons-logging warning still appears
Reload Maven dependencies / reimport Maven project after using the latest backend.
That warning is not the startup blocker.

The real blocker is:
- missing `flyway-mysql`
