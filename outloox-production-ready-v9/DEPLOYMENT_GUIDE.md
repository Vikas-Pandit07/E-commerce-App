# OUTLOOX Deployment Guide

Date: 2026-06-22

## Recommended production architecture

### Frontend
- Host: Vercel or Netlify
- Build output: static files from `/outloox/dist`
- Domain: `https://outloox.in`

### Backend
- Host: Render / Railway / VPS / ECS
- Java: 21
- Expose: `https://api.outloox.in`

### Database
- MySQL 8+
- managed service preferred

### Assets
- Cloudinary for product and brand media

### Payments
- Razorpay live keys + webhook secret

---

## Environment variables

### Backend required
- `SERVER_PORT`
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION`
- `APP_FRONTEND_URL`
- `APP_CORS_ALLOWED_ORIGINS`
- `APP_COOKIE_SECURE`
- `APP_COOKIE_SAME_SITE`
- `APP_COOKIE_DOMAIN`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USERNAME`
- `EMAIL_PASSWORD`

### Frontend suggested
- `VITE_API_BASE_URL`
- `VITE_SITE_URL`

---

## Local Docker run

At workspace root:

```bash
docker compose up --build
```

Services:
- frontend: `http://localhost:8080`
- backend: `http://localhost:9090`
- mysql: `localhost:3306`

---

## Backend deployment steps

1. provision MySQL database
2. set all environment variables
3. deploy `/repo/backend`
4. set profile:
   - `SPRING_PROFILES_ACTIVE=prod`
5. verify health endpoint:
   - `/actuator/health`
6. configure Razorpay webhook URL:
   - `https://api.outloox.in/api/payments/webhook`
7. test auth, cart, order, and payment flows in staging first

---

## Frontend deployment steps

1. deploy `/outloox`
2. ensure build command:
   - `npm install && npm run build`
3. publish `dist`
4. configure custom domain `outloox.in`
5. verify:
   - home page
   - shop page
   - route refreshes
   - robots.txt
   - sitemap.xml

---

## Production config recommendations

### Cookies
If frontend and backend run on different subdomains under same main domain:
- `APP_COOKIE_SECURE=true`
- `APP_COOKIE_SAME_SITE=Lax` may work if same-site rules apply

If frontend/backend are cross-site:
- `APP_COOKIE_SECURE=true`
- `APP_COOKIE_SAME_SITE=None`

### CORS
Set exact allowed origins, for example:

```env
APP_CORS_ALLOWED_ORIGINS=https://outloox.in,https://www.outloox.in
```

### Hibernate
Current config still uses `ddl-auto=update`.
For mature production rollout, move to migration-based schema management.

---

## Pre-launch checklist

- [ ] frontend deployed on production domain
- [ ] backend deployed on HTTPS
- [ ] MySQL backups enabled
- [ ] Razorpay live keys configured
- [ ] webhook configured and tested
- [ ] Cloudinary credentials configured
- [ ] SMTP configured
- [ ] admin account created securely
- [ ] rate limits tested
- [ ] order cancellation/refund flow tested
- [ ] health checks monitored
- [ ] logs reviewed for startup errors
- [ ] penetration / auth sanity testing completed
- [ ] real browser QA on mobile + desktop completed

---

## Reality check

This repository is now **more deployable**, but the new OUTLOOX frontend is still not fully connected to the backend domain model.

For a true full-commerce production launch, complete next:
- replace mock catalog with live product API
- implement size/color variant model
- connect real checkout
- connect order history / profile UI
- run full UAT in staging
