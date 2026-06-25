# OUTLOOX Audit Report

Date: 2026-06-22
Scope: `frontend` in `/outloox` and `backend` in `/repo/backend`

## Executive summary

The codebase is a **good early-stage foundation**, but it was **not production-ready** before this hardening pass.

The most important blockers found were:
- frontend and backend are still **not fully integrated**
- payment flow had **partial signature verification only** and no webhook path
- inventory deduction timing could lead to incorrect stock handling
- admin order lifecycle was incomplete
- backend startup configuration had **property mismatches**
- security config lacked **method-security enablement** and consistent JSON auth errors
- password reset flow leaked account existence
- address endpoints returned raw entities
- deployment assets and production docs were missing

## Architecture snapshot

### Frontend
- React + TypeScript + Vite + TailwindCSS + Framer Motion
- current storefront UX is polished and brand-consistent
- product catalog is currently driven by local mock data in `src/lib/data.ts`
- cart is localStorage-based
- checkout is UI-only, not yet a real API-backed checkout

### Backend
- Spring Boot + Spring Security + JWT cookie auth + JPA/Hibernate + MySQL
- includes auth, user profile, address, cart, order, payment, admin modules
- Razorpay and Cloudinary integrations exist
- email password reset exists

---

## Critical issues found

1. **Frontend mock data / backend mismatch**
   - frontend expects richer product fields than backend currently stores
   - no live product, cart, checkout, or profile integration in the new OUTLOOX frontend

2. **Razorpay configuration mismatch**
   - properties used different naming conventions in code vs properties file
   - would break production startup/configuration

3. **Password reset config blocker**
   - `app.frontend-url` was referenced but not defined

4. **Admin product create/update response bug**
   - `AdminProductService#mapToResponse()` returned `null`

5. **Admin order sorting bug**
   - sorted by non-existent field `orderData`

6. **Security annotations not guaranteed**
   - `@PreAuthorize` was used but method security was not enabled

7. **Address entity exposure**
   - raw entities were returned in API responses
   - risks lazy-loading problems and overexposure of internals

8. **Inventory handling issue**
   - stock was deducted at order creation even before payment confirmation for online flows

9. **No webhook endpoint**
   - payment reconciliation was incomplete

10. **Order state model incomplete**
   - old lifecycle was too small for production operations

---

## Security issues found

- inconsistent cookie handling for auth token
- missing standardized 401 / 403 JSON responses
- account enumeration risk in forgot-password
- insufficient validation on some DTOs
- no rate limiting on auth/payment endpoints
- JWT parsing errors could bubble into request flow without clean handling
- CORS handling was too narrow and hardcoded around localhost assumptions
- generic exception handling was incomplete

---

## Performance issues found

### Backend
- no pagination on most listing APIs
- several analytics/admin queries may become heavy with growth
- cart/order stock operations lacked row-level locking
- using `ddl-auto=update` is unsafe for mature production schema management

### Frontend
- no real API caching layer yet
- original page routing was eager-loaded
- SEO assets were missing

---

## Scalability issues found

- in-memory cart on frontend only
- backend rate limiting is now in-memory and suitable only for single-instance deployments
- no message queue / async workflow for email and webhooks
- no distributed session or cache layer
- no Flyway/Liquibase migration discipline yet

---

## Deployment issues found

- no Docker files
- no docker-compose stack
- no production profile properties
- no sitemap / robots / metadata strategy
- no clear env variable reference
- no health endpoint exposure guidance

---

## Missing features / launch gaps still remaining

1. full frontend-to-backend API integration
2. live product catalog with OUTLOOX-specific fields:
   - slug
   - original price
   - colors
   - sizes
   - badge
   - reviews
   - rating
3. real cart variant handling (`size`, `color`)
4. real checkout UI connected to backend
5. order tracking UI in frontend
6. email templates for:
   - registration
   - order confirmation
   - shipping
   - payment success
7. admin user management APIs beyond dashboard-level stats
8. production migration tool adoption (Flyway recommended)
9. CDN / image transformation strategy for Cloudinary
10. monitoring / alerting / centralized logs

---

## Changes completed in this hardening pass

- fixed backend configuration mismatches
- added production-oriented security handlers
- enabled method security
- added rate limiting filter
- improved CORS configuration
- improved JWT validation behavior
- normalized auth cookie generation
- improved validation and global error response structure
- fixed admin product response bug
- fixed admin order sorting bug
- expanded order lifecycle
- moved online stock deduction to payment-confirmed phase
- added payment webhook support and refund hook
- added stock restoration support for cancellation/refund flows
- added deployment files and production docs
- added frontend lazy route loading and baseline SEO assets

---

## Launch recommendation

### Safe launch option now
Use the current frontend as a **brand storefront / catalog / brochure experience** and continue backend integration in the next sprint.

### Full commerce launch requirement
Before public launch with real orders/payments, complete:
- live frontend API integration
- variant-aware cart/order model
- staging payment tests
- production DB migrations
- admin workflow QA
- end-to-end smoke tests

---

## Final assessment

**Status after this pass:**
- much safer
- much more deployable
- structurally improved
- **not yet fully finished as a complete production commerce platform** because frontend/backend domain model alignment still remains

Recommended next milestone:
- implement variant-aware products, cart, and checkout integration end-to-end.
