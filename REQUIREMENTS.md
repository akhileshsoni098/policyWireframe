# PAS — Client Requirements (Hinglish)

> **Ye document kya hai?** Yeh ek **client-style requirement document** hai jo Policy Administration System (PAS) ko design karne ke liye hai. Isse aap **Express.js + MongoDB** ka assignment/project bana sakte hain.
> Har requirement `Q_A_PAS.html` ke 30 sections se derive ki gayi hai — matlab jo bhi yahan likha hai, woh Q&A document se directly aata hai.

---

## 0. Overview aur Common Conventions

### Tech Stack
| Layer | Choice |
|---|---|
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT + RBAC |
| Docs | REST API (JSON) + async events (webhook/message) |

### Common Conventions (sab modules mein same)
- **tenantId**: har document mein `tenantId` field hoga (multi-tenancy, Section 21).
- **Bitemporal**: har business record par `effectiveFrom` (business date) aur `recordedAt` (system date) dono honge (Section 5).
- **Versioning**: koi bhi policy data change transaction ke through hoga, aur har change se `version + 1` hoga (Section 12).
- **Audit**: har mutation `audit_logs` mein immutably log hogi — kaun, kab, kya (Section 25).
- **Error format**: `{ success: false, error: { code, message, details } }` with proper HTTP status.
- **Success format**: `{ success: true, data: {...} }`.
- **ID format**: Mongo `_id` ke alawa har business entity ka readable ID (e.g. `POL-2026-0001`, `BN-2026-001`, `Q-2026-001`).

### Status Codes (commonly used)
| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Validation error |
| 401 | Unauthorized |
| 403 | Forbidden (RBAC) |
| 404 | Not found |
| 409 | Conflict (version mismatch, state invalid) |
| 422 | Business rule violation |

---

## Module 1 — Ownership

**Q&A reference:** Section 1 (Policy Administration Ownership)

### Goal
PAS hi policy ka **legal system of record** hai. Quote module proposal banata hai, lekin jaise hi Bind hota hai, PAS authoritative banta hai. Issued policy ka saara state PAS ke paas hota hai.

### MongoDB Collections
| Collection | Kya store karta hai |
|---|---|
| `quotes` | Quote proposals (quote module ka data) |
| `policies` | Issued/bound policies (PAS ka system of record) |
| `parties` | Insured, additional insured, broker, producer |
| `locations` | Policy locations |
| `coverages` | Coverage sections with limits/deductibles |

### Sample Document — `policies`
```json
{
  "_id": "p-0001",
  "tenantId": "t-001",
  "policyNumber": "POL-2026-0001",
  "status": "ACTIVE",
  "version": 3,
  "lob": "Commercial Property",
  "insured": { "name": "Sharma Textiles Pvt Ltd", "gstin": "27AACCS1234A1Z2" },
  "inceptionDate": "2026-01-01",
  "expiryDate": "2026-12-31",
  "premium": 125000,
  "binderNumber": "BN-2026-001",
  "priorPolicyId": null,
  "effectiveFrom": "2026-01-01",
  "recordedAt": "2026-01-01T10:00:00Z",
  "createdBy": "u-broker-1",
  "audit": []
}
```

### Express APIs
| Method | Route | Body (main) | Response |
|---|---|---|---|
| POST | `/api/quotes` | `{ applicant, lob, premium, score, status }` | `201` quote created |
| POST | `/api/quotes/:id/bind` | `{ binderExpiryDays }` | `201` → policy `BOUND` with `binderNumber` |
| GET | `/api/policies/:id` | — | `200` full policy (current version) |
| GET | `/api/policies/:id?asOf=DATE` | — | `200` point-in-time state |
| POST | `/api/policies` | `{ ...policyData, source: "MIGRATION" }` | `201` direct/migration issue |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Bind ke baad PAS authoritative hai | Quote module kabhi policy state override nahi kare |
| Immutable fields (policyNumber, inception, premium) sirf endorsement se change | Legal documents ki integrity |
| Issued policy ka source of truth hamesha PAS | Claims/compliance PAS se hi reference lein |

---

## Module 2 — Aggregate

**Q&A reference:** Section 2 (Policy Aggregate)

### Goal
Policy ek **aggregate root** hai. Saare child entities (coverages, locations, parties, endorsements) sirf policy ke through access/change hote hain. Multi-risk, multi-location, multi-carrier structure supported.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `policies` | Aggregate root |
| `policy_coverages` | Har coverage section: limit, deductible |
| `policy_locations` | Har location ka exposure |
| `policy_parties` | Named/additional insured, interested parties |
| `policy_schedules` | Fleet vehicles, schedules/sub-schedules |
| `policy_carriers` | Co-insurance shares (multiple carriers) |

### Sample Document — `policy_coverages`
```json
{
  "_id": "cov-0001",
  "tenantId": "t-001",
  "policyId": "p-0001",
  "section": "Property",
  "limit": 5000000,
  "deductible": 25000,
  "effectiveFrom": "2026-01-01",
  "recordedAt": "2026-01-01T10:00:00Z"
}
```

### Express APIs
| Method | Route | Response |
|---|---|---|
| GET | `/api/policies/:id/coverages` | List of coverage sections |
| POST | `/api/policies/:id/coverages` | Add coverage (creates endorsement transaction) |
| GET | `/api/policies/:id/locations` | Locations list |
| GET | `/api/policies/:id/parties` | Parties list |
| GET | `/api/policies/:id/schedules` | Schedules/sub-schedules |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Child entity sirf policy root se access | Transaction boundary + consistency |
| Child changes hamesha transaction/endorsement se | Audit + versioning |
| Multiple carriers shares sum = 100% (co-insurance) | Data validity |

---

## Module 3 — Lifecycle

**Q&A reference:** Section 3 (Policy Lifecycle)

### Goal
Policy ka **state machine** define karo — Draft → Quoted → Bound → Issued/Active → Cancelled/Expired/Void. Har transition rules ke under hi hota hai.

### States (Policy Level)
`DRAFT`, `QUOTED`, `BOUND`, `ISSUED`, `ACTIVE`, `CANCELLED`, `EXPIRED`, `VOID`, `NON_RENEWED`, `SUSPENDED`

### MongoDB Collections
| Collection | Notes |
|---|---|
| `policies` | `status` field (current state) |
| `transactions` | Har transition transaction ke through |

### Sample Document — `transactions`
```json
{
  "_id": "txn-0001",
  "tenantId": "t-001",
  "policyId": "p-0001",
  "policyVersion": 1,
  "seq": 1,
  "type": "BIND",
  "status": "COMPLETED",
  "fromState": "QUOTED",
  "toState": "BOUND",
  "data": { "binderNumber": "BN-2026-001" },
  "effectiveFrom": "2026-01-01",
  "recordedAt": "2026-01-01T10:00:00Z",
  "createdBy": "u-broker-1",
  "approvals": []
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/policies/:id/transitions` | `{ toState, transactionType }` — state machine validate kare |
| GET | `/api/policies/:id/transactions` | Transaction history |

### Business Rules (State Machine Table)
| From | To | Allowed via | Approval |
|---|---|---|---|
| QUOTED | BOUND | BIND | UW APPROVED quote chahiye |
| BOUND | ISSUED/ACTIVE | ISSUE | Documents + compliance ready |
| ACTIVE | CANCELLED | CANCEL | Carrier/insured notice |
| CANCELLED | ACTIVE | REINSTATE | UW approval |
| ACTIVE | EXPIRED | AUTO-EXPIRY | — |
| any | VOID | VOID | Admin |
| QUOTED | BOUND | BIND | UW APPROVED quote chahiye |

---

## Module 4 — Transactions

**Q&A reference:** Section 4 (Policy Transactions)

### Goal
Policy data mein **har change ek transaction** hai. Draft → Pending → Completed → Failed → Reversed. Har transaction per-policy sequential (monotonic seq + version bump). Reverse/correct/withdraw supported.

### Transaction Types
`BIND`, `ISSUE`, `ENDORSE`, `CANCEL`, `REINSTATE`, `RENEW`, `NON_RENEW`, `VOID`, `REWRITE`, `CORRECT`

### MongoDB Collections
| Collection | Notes |
|---|---|
| `transactions` | Transaction records with seq + version |
| `policy_versions` | Version snapshot + diff |

### Sample Document — `policy_versions`
```json
{
  "_id": "ver-0002",
  "tenantId": "t-001",
  "policyId": "p-0001",
  "version": 2,
  "transactionId": "txn-0002",
  "type": "ENDORSE",
  "snapshot": { "premium": 150000, "status": "ACTIVE" },
  "diff": { "premium": { "from": 125000, "to": 150000 } },
  "recordedAt": "2026-03-01T11:00:00Z"
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/policies/:id/transactions` | Create transaction (draft) |
| PUT | `/api/transactions/:id/submit` | Submit for processing |
| POST | `/api/transactions/:id/approve` | Approve (if workflow) |
| POST | `/api/transactions/:id/reverse` | Reversing transaction (deletion nahi) |
| POST | `/api/transactions/:id/withdraw` | Withdraw (only draft/pending) |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Direct DB update forbidden — sirf transaction | Audit impossible nahi hona chahiye |
| Optimistic lock: `version` mismatch → 409 | Concurrent edits se corruption nahi |
| Reverse = nayi transaction, delete nahi | History intact |
| Draft TTL 7 din → auto-expire | Stale drafts clutter nahi |

---

## Module 5 — Effective Dating

**Q&A reference:** Section 5 (Effective Dating)

### Goal
**Bitemporal model** — business-effective date (`effectiveFrom`) aur system-recorded date (`recordedAt`) alag. As-of queries dono dimensions par. Backdate/future-date transactions handled.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `transactions` | `effectiveFrom` + `recordedAt` + `oos` flag |
| `policy_versions` | Snapshot with effective dates |

### Express APIs
| Method | Route | Notes |
|---|---|---|
| GET | `/api/policies/:id?asOf=2026-06-15` | Business-effective date par state |
| GET | `/api/policies/:id?systemAsOf=ISO_DATE` | System-recorded date par state |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Har business attribute effective-dated | Point-in-time reconstruction |
| OOS (backdated) changes replay later transactions | Timeline consistency |
| Future-dated changes scheduled, effective date par apply | Planned changes auto |

---

## Module 6 — OOS Endorsements

**Q&A reference:** Section 6 (Out-of-Sequence Endorsements)

### Goal
Out-of-sequence change = **effective date previous transaction se pehle**. PAS replay karta hai baad ki transactions naye state par, conflict detect karta hai, affected period rerate karta hai.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `transactions` | `oos: true` flag + conflict info |
| `premium_adjustments` | OOS rerate delta |

### Sample Document — `transactions` (OOS)
```json
{
  "_id": "txn-0009",
  "tenantId": "t-001",
  "policyId": "p-0001",
  "type": "ENDORSE",
  "oos": true,
  "effectiveFrom": "2026-05-01",
  "recordedAt": "2026-07-10T09:00:00Z",
  "replayedTransactions": ["txn-0007", "txn-0008"],
  "conflicts": [],
  "premiumDelta": 15000
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/policies/:id/transactions` | Body mein `effectiveFrom` puraana → OOS detected |
| GET | `/api/transactions/:id/preview` | Replay ke baad ka preview state |
| POST | `/api/transactions/:id/resolve-conflict` | `{ decision }` manual conflict resolution |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| OOS change + later same-field change → conflict prompt | User decide kare |
| Auto-replay sirf jab non-conflicting | Data loss nahi |
| Affected period rerate + premium delta publish | Billing correct |

---

## Module 7 — Bind & Issuance

**Q&A reference:** Section 7 (Bind & Issuance)

### Goal
UW **APPROVED** quote par Bind → policy **BOUND** ho jaati hai binder `BN-2026-NNN` + expiry + subjectivities ke saath. Phir **Issue** → **ACTIVE**. PAS dono karta hai.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `quotes` | `status`, `binderNumber`, `binderExpiry`, `subjectivities` |
| `policies` | Issued policy record |
| `documents` | Issued document package |

### Sample Document — `quotes` (after bind)
```json
{
  "_id": "q-0001",
  "tenantId": "t-001",
  "quoteNumber": "Q-2026-001",
  "applicant": "Sharma Textiles Pvt Ltd",
  "lob": "Commercial Property",
  "premium": 125000,
  "score": 78,
  "status": "BOUND",
  "uwAssigned": "u-uw-1",
  "binderNumber": "BN-2026-001",
  "binderExpiry": "2026-03-01",
  "subjectivities": ["Fire alarm report pending"],
  "createdDate": "2026-01-01",
  "daysInQueue": 0
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/quotes/:id/bind` | `{ binderExpiryDays: 30|60|90 }` → validate status = APPROVED |
| POST | `/api/policies/:id/issue` | BOUND → ACTIVE, generate docs |
| GET | `/api/quotes/:id/binder` | Binder details |
| GET | `/api/uw-queue` | Pending submissions (UW queue) |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Bind sirf `APPROVED` quote par | UW control |
| Binder number format `BN-YYYY-NNN` auto-generate | Reference |
| Binder expiry par policy issue na ho → warning/revert | No stale binders |
| Bind validation mandatory fields | Invalid policies rokne |

---

## Module 8 — Endorsements

**Q&A reference:** Section 8 (Endorsements)

### Goal
Mid-term change = endorsement transaction. Approval workflow (agar premium/risk change), nayi version `vN+1`, premium delta billing ko publish.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `transactions` | type `ENDORSE`, approval state |
| `policy_versions` | New version snapshot |
| `premium_adjustments` | Delta events |

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/policies/:id/endorsements` | `{ changes, effectiveFrom }` |
| POST | `/api/endorsements/:id/approve` | UW approval → apply + version bump |
| GET | `/api/policies/:id/endorsements` | History |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Premium-affecting endorsement → UW approval | Risk control |
| Har completed endorsement = version bump (ENDORSEMENT type) | Audit |
| Administrative correction vs endorsement alag type | Financial impact distinguish |

---

## Module 9 — Renewal

**Q&A reference:** Section 9 (Renewal)

### Goal
Term khatam hone se pehle renewal process — nayi term banati hai, **prior policy ID** link, continuous history. Manual + auto-renewal dono.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `policies` | `priorPolicyId`, renewal term |
| `quotes` | Renewal quote |
| `transactions` | type `RENEW` |

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/policies/:id/renew` | `{ newTerm, terms }` → nayi policy, `priorPolicyId` set |
| GET | `/api/policies/:id/renewal-history` | Policy chain |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Renewal par version bump with RENEWAL type | History continuous |
| 60 days pehle renewal notice | Regulatory |
| Non-renewal → `NON_RENEWED` + notice | Compliance |

---

## Module 10 — Cancellation

**Q&A reference:** Section 10 (Cancellation)

### Goal
Policy mid-term band — **pro-rata / short-rate** return premium, cancellation notice, state `CANCELLED`.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `transactions` | type `CANCEL`, reason |
| `premium_adjustments` | Return premium calculation |

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/policies/:id/cancel` | `{ effectiveFrom, reason, initiatedBy: "CARRIER"|"INSURED" }` |
| GET | `/api/policies/:id/return-premium` | Calculated pro-rata amount |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Carrier-initiated cancellation → UW approval | Legal control |
| Return premium = unused term × premium (pro-rata) | Fair calculation |
| Cancellation notice generate + claims notify | Legal evidence |

---

## Module 11 — Reinstatement

**Q&A reference:** Section 11 (Reinstatement & Rewrite)

### Goal
Cancelled policy wapas **ACTIVE** — gap period record hota hai, UW approval required. Rewrite = naya policy number + original se link.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `transactions` | type `REINSTATE` / `REWRITE` |
| `policies` | `priorPolicyId` (rewrite link) |

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/policies/:id/reinstate` | `{ effectiveFrom }` → CANCELLED → ACTIVE |
| POST | `/api/policies/:id/rewrite` | Naya number + link |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Reinstatement UW approval required | Risk check |
| Gap period (cancelled → reinstated) record | Coverage gap clarity |

---

## Module 12 — Versioning

**Q&A reference:** Section 12 (Policy Versioning)

### Goal
Har change se nayi **version vN+1** — snapshot + diff store hota hai. Point-in-time history reconstruct. Optimistic locking.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `policy_versions` | `version`, `snapshot`, `diff`, `type`, `recordedAt` |

### Express APIs
| Method | Route | Notes |
|---|---|---|
| GET | `/api/policies/:id/versions` | Version list |
| GET | `/api/policies/:id/versions/:v` | Snapshot of version |
| GET | `/api/policies/:id/versions/:v/diff/:u` | Diff between versions |
| GET | `/api/policies/:id?asOf=DATE` | Point-in-time |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Version monotonic +1, never reused | Audit |
| Snapshot immutable once written | Integrity |
| Write with wrong `version` → 409 | Optimistic lock |

---

## Module 13 — Product & Rating

**Q&A reference:** Section 13 (Product & Rating Integration)

### Goal
PAS rating module se premium leta hai; product config define karta hai kaunsi coverages allowed. PAS decision store karta hai — **single source of truth**.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `products` | Coverage rules, eligibility |
| `rating_results` | Premium breakdown (base, loadings, taxes) |
| `policies` | Final premium |

### Sample Document — `rating_results`
```json
{
  "_id": "rt-0001",
  "tenantId": "t-001",
  "productId": "pr-001",
  "basePremium": 100000,
  "loadings": [{ "name": "Hazard", "amount": 15000 }],
  "taxes": 10000,
  "totalPremium": 125000,
  "ratedAt": "2026-01-01T10:00:00Z"
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/rate` | `{ productId, riskData }` → premium |
| GET | `/api/products` | Product list + eligibility |
| GET | `/api/policies/:id/rating` | Policy premium breakdown |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Har premium change → rerate call | Accuracy |
| Product config = kya eligible | UW refer rules |

---

## Module 14 — Underwriting

**Q&A reference:** Section 14 (Underwriting Integration)

### Goal
UW **workbench** — submissions queue, approve/reject/refer. Approval quote ko `APPROVED` karta hai → bind allowed. Decision ID policy par store.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `submissions` | Queue items (submission/uw-queue) |
| `uw_approvals` | Decision records (approve/reject/refer) |
| `quotes` | `status` updated |

### Sample Document — `submissions`
```json
{
  "_id": "s-0001",
  "tenantId": "t-001",
  "quoteId": "q-0001",
  "insured": "Sharma Textiles Pvt Ltd",
  "lob": "Commercial Property",
  "premium": 125000,
  "score": 78,
  "daysInQueue": 3,
  "status": "PENDING",
  "assignedTo": "u-uw-1",
  "createdDate": "2026-01-01"
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| GET | `/api/uw-queue` | Pending submissions (filter by status) |
| POST | `/api/uw-queue/:id/review` | `{ action: "APPROVE"|"REJECT"|"REFER", comment }` |
| GET | `/api/uw-queue/:id` | Submission detail (editable review) |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Approve → quote `APPROVED` → bind allowed | Gateway control |
| Reject/refer → bind blocked | UW decision respected |
| High-risk (score) → auto referral | Risk controls |

---

## Module 15 — Distribution

**Q&A reference:** Section 15 (Distribution Integration)

### Goal
Broker/agent through business — producer track, commission calculation, referral tracking.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `producers` | Broker/agent profile |
| `commissions` | Commission schedule + earned amounts |
| `referrals` | Referral source tracking |

### Express APIs
| Method | Route | Notes |
|---|---|---|
| GET | `/api/producers` | Producer list |
| POST | `/api/commissions/calculate` | `{ policyId, producerId }` → commission |
| GET | `/api/policies/:id/producers` | Policy producer/commission |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Commission sirf issued policy par | Earned logic |
| Per-tenant commission schedule | Config flexibility |

---

## Module 16 — Billing

**Q&A reference:** Section 16 (Billing Integration)

### Goal
Premium billing, instalments, payments, return premium. **Non-payment → cancellation trigger**. Premium deltas from endorsements.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `invoices` | Billing documents |
| `payments` | Payment records |
| `premium_instalments` | Instalment schedule |

### Sample Document — `invoices`
```json
{
  "_id": "inv-0001",
  "tenantId": "t-001",
  "policyId": "p-0001",
  "amount": 125000,
  "status": "PENDING",
  "dueDate": "2026-01-31",
  "type": "INITIAL"
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/payments` | `{ policyId, amount }` → record + invoice update |
| GET | `/api/policies/:id/invoices` | Invoice history |
| POST | `/api/policies/:id/premium-adjustment` | Endorsement delta apply |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| 30 days non-payment → cancellation workflow | Revenue control |
| Policy state aur payment state alag | Independent tracking |

---

## Module 17 — Claims

**Q&A reference:** Section 17 (Claims Integration)

### Goal
Claims module ko **loss-date ka point-in-time policy state** chahiye — coverage, limits, deductibles uss date ke.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `claim_referrals` | PAS se lena policy state as-of date |
| `policy_versions` | Point-in-time snapshots |

### Express APIs
| Method | Route | Notes |
|---|---|---|
| GET | `/api/policies/:id?asOf=DATE` | Policy state on loss date |
| POST | `/api/claim-referrals` | `{ policyId, lossDate }` → referral with state |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Claim hamesha versioned state use kare | Correct coverage |
| Policy cancelled ho toh bhi loss-date state valid | Historical |

---

## Module 18 — Reinsurance

**Q&A reference:** Section 18 (Reinsurance Integration)

### Goal
PAS risk share reinsurer ko **report** karta hai — facultative / treaty. PAS khud reinsurance process nahi karta, sirf data provide.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `reinsurance_shares` | Share per policy/carrier |
| `reinsurance_reports` | Reporting records |

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/reinsurance/report` | `{ policyId, shares }` → report |
| GET | `/api/policies/:id/reinsurance` | Policy reinsurance share |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Share sum correct (100%) | Validation |
| Treaty/facultative types configured per product | Config |

---

## Module 19 — Compliance

**Q&A reference:** Section 19 (Compliance Integration)

### Goal
Sanctions check, regulatory forms, KYC — har step legal rahe. Bind/issue/cancel/non-renewal par compliance gates.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `compliance_checks` | Check results (sanctions, KYC) |
| `regulatory_forms` | Required forms per jurisdiction |

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/compliance/check` | `{ party, type }` → result |
| GET | `/api/compliance/required-forms` | `{ lob, jurisdiction }` → forms |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Sanctions fail → bind blocked | Legal |
| Har jurisdiction ka form set | Regulatory |

---

## Module 20 — Documents & Forms

**Q&A reference:** Section 20 (Documents & Forms)

### Goal
Policy documents / endorsement notices generate, version-track, retrievable. PAS orchestrate karta hai, document service render karta hai.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `documents` | Document metadata + storage ref |

### Sample Document — `documents`
```json
{
  "_id": "doc-0001",
  "tenantId": "t-001",
  "policyId": "p-0001",
  "version": 2,
  "type": "ENDORSEMENT",
  "fileName": "POL-2026-0001-v2-ENDORSE.pdf",
  "storageRef": "s3://pas-docs/...",
  "createdAt": "2026-03-01T11:00:00Z"
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/documents/generate` | `{ policyId, type }` → document |
| GET | `/api/policies/:id/documents` | Document list |
| GET | `/api/documents/:id` | Download |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Har version ka document set | Legal evidence |
| Document filename includes policy + version | Traceability |

---

## Module 21 — Tenant

**Q&A reference:** Section 21 (Tenant Architecture)

### Goal
**Multi-tenancy** — ek codebase, multiple companies; har tenant ka data + config isolated (`tenantId` filter hamesha).

### MongoDB Collections
| Collection | Notes |
|---|---|
| `tenants` | Tenant profile |

### Sample Document — `tenants`
```json
{
  "_id": "t-001",
  "name": "Apex Insurance Co",
  "status": "ACTIVE",
  "config": {
    "numberingFormats": { "policy": "POL-{year}-{seq}" },
    "approvalRules": { "requireUwForBind": true }
  },
  "createdAt": "2026-01-01T00:00:00Z"
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/tenants` | Create tenant (admin) |
| GET | `/api/tenants/:id/config` | Tenant config |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Har query mein `tenantId` | Isolation |
| Cross-tenant access → 403 | Security |

---

## Module 22 — Configuration

**Q&A reference:** Section 22 (Configuration Model)

### Goal
Product, states, rules, forms — **sab configurable** bina code change ke. Per-tenant config store.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `configurations` | Key-value config (per tenant + product) |

### Sample Document — `configurations`
```json
{
  "_id": "cfg-0001",
  "tenantId": "t-001",
  "scope": "PRODUCT",
  "scopeId": "pr-001",
  "key": "requireUwApprovalForEndorsement",
  "value": true,
  "effectiveFrom": "2026-01-01"
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| GET | `/api/configurations` | `?tenantId&scope&scopeId` |
| PUT | `/api/configurations/:id` | Update config |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Config change audited | Change control |
| Default config fallback | Zero config breakdown |

---

## Module 23 — Numbering

**Q&A reference:** Section 23 (Policy Numbering)

### Goal
Policy / binder / endorsement numbers ke **formats per tenant** configured. Sequence counters race-safe.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `numbering_sequences` | Per tenant + type counter |

### Sample Document — `numbering_sequences`
```json
{
  "_id": "seq-0001",
  "tenantId": "t-001",
  "type": "POLICY",
  "prefix": "POL-2026-",
  "lastSequence": 42,
  "format": "POL-{year}-{seq:4}"
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| GET | `/api/numbering/next` | `{ type }` → next number |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Next number atomic (findOneAndUpdate) | No duplicate numbers |
| Format per tenant + type | Branding/legal |

---

## Module 24 — Security

**Q&A reference:** Section 24 (Security & Authorization)

### Goal
**RBAC** — roles aur permissions har action par. Sensitive data protection.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `users` | Users + roles |
| `roles` | Role definitions |
| `permissions` | Permission matrix |

### Sample Document — `users`
```json
{
  "_id": "u-uw-1",
  "tenantId": "t-001",
  "name": "Rahul Verma",
  "email": "rahul@apex.co",
  "roles": ["UNDERWRITER"],
  "active": true
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| POST | `/api/auth/login` | → JWT |
| GET | `/api/auth/me` | Current user + permissions |
| POST | `/api/users` | Create user (admin) |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Har endpoint par RBAC check | Authorization |
| JWT expiry + refresh | Session security |

---

## Module 25 — Audit

**Q&A reference:** Section 25 (Audit & Evidence)

### Goal
**Immutable audit trail** — kaun, kab, kya change kiya, kya approval thi. Regulator ke liye reconstructable.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `audit_logs` | Append-only log |

### Sample Document — `audit_logs`
```json
{
  "_id": "aud-0001",
  "tenantId": "t-001",
  "entityType": "POLICY",
  "entityId": "p-0001",
  "action": "BIND",
  "userId": "u-broker-1",
  "before": { "status": "QUOTED" },
  "after": { "status": "BOUND" },
  "timestamp": "2026-01-01T10:00:00Z",
  "requestId": "req-abc-123"
}
```

### Express APIs
| Method | Route | Notes |
|---|---|---|
| GET | `/api/audit-logs` | `?entityType&entityId&from&to` |
| GET | `/api/audit-logs/:id` | Single entry |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Logs append-only, no update/delete | Immutability |
| Har mutation ke sath requestId | Traceability |

---

## Module 26 — API & Events

**Q&A reference:** Section 26 (API & Event Contracts)

### Goal
**Synchronous APIs** (request-response) + **async events** (publish/subscribe). Webhooks notifications. Idempotency keys.

### MongoDB Collections
| Collection | Notes |
|---|---|
| `event_logs` | Published events |
| `webhook_subscriptions` | Subscriber endpoints |

### Sample Document — `event_logs`
```json
{
  "_id": "evt-0001",
  "tenantId": "t-001",
  "eventType": "POLICY.BOUND",
  "payload": { "policyId": "p-0001", "binderNumber": "BN-2026-001" },
  "publishedAt": "2026-01-01T10:00:00Z",
  "deliveryStatus": "SENT"
}
```

### Express APIs / Topics
| Direction | Contract | Notes |
|---|---|---|
| REST | `/api/*` | Synchronous |
| Event | `POLICY.BOUND`, `POLICY.ISSUED`, `PREMIUM.ADJUSTED` | Async publish |
| Webhook | POST subscription callback | Delivery with retry |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Mutations idempotent (`Idempotency-Key` header) | Retry safe |
| Event delivery retry + DLQ | No lost events |

---

## Module 27 — Reliability

**Q&A reference:** Section 27 (Reliability)

### Goal
System kabhi data na khoye — **retry/backoff, idempotency, DLQ, rollback**.

### Express APIs / Middleware
| Component | Notes |
|---|---|
| Retry middleware | Backoff retries for external calls |
| DLQ consumer | Failed events reprocess |
| Transaction rollback | Partial failure → rollback previous state |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| External call fail → retry (3x) then DLQ | No silent loss |
| Mutation atomic (Mongo transaction) | No partial policy state |

---

## Module 28 — Performance

**Q&A reference:** Section 28 (Performance & Scale)

### Goal
Fast search, low latency — **indexing, caching, async processing**.

### MongoDB Indexes
| Collection | Index |
|---|---|
| `policies` | `{ tenantId: 1, policyNumber: 1 }` unique; `{ tenantId: 1, status: 1 }` |
| `transactions` | `{ tenantId: 1, policyId: 1, seq: 1 }` |
| `quotes` | `{ tenantId: 1, status: 1, createdDate: -1 }` |
| `audit_logs` | `{ tenantId: 1, entityId: 1, timestamp: -1 }` |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Read-heavy queries cached | Latency |
| Point-in-time queries use version snapshot index | Speed |

---

## Module 29 — User Experience

**Q&A reference:** Section 29 (User Experience)

### Goal
Clean screens — UW queue, policy detail, search, status badges, version history. Underwriter aur broker dono ke liye aasaan.

### Key Screens
| Screen | Features |
|---|---|
| Dashboard | Quick stats + shortcuts |
| UW Queue | Table with info tooltips, Review & Modify, status badges, Days in queue |
| Submission Detail | Editable review form (name, LOB, premium, score) |
| Policy Detail | Version badge `vN`, Version History card, View snapshot |
| Bind Modal | Binder expiry selection, binder number prefill |
| Search | Live question search (Q&A doc) |

### Business Rules
| Rule | Kyu zaroori |
|---|---|
| Status badges color-coded (New/In Review/Referred) | Clarity |
| Har actionable par tooltip/info | Understanding |

---

## Module 30 — Bounded Contexts

**Q&A reference:** Section 30 (Minimum PAS Bounded Contexts)

### Goal
Har domain ka apna model — Quote, Policy, Billing, Claims, Reinsurance — **loosely coupled**, shared kernel dhyan se.

### Service Map
| Bounded Context | Responsibility | Owns |
|---|---|---|
| Quote | Proposal + rating input | `quotes` |
| Policy (PAS) | Bind/issue/endorse/renew/cancel/version | `policies`, `transactions`, `policy_versions` |
| Billing | Premium/payment | `invoices`, `payments` |
| Claims | Loss processing | `claim_referrals` |
| Reinsurance | Risk share | `reinsurance_shares` |
| Compliance | Checks/forms | `compliance_checks` |
| Document | Rendering | `documents` |

### Contract Rules
| Rule | Kyu zaroori |
|---|---|
| Bounded contexts async events se communicate | Loose coupling |
| Policy state data kabhi baki contexts direct mutate nahi | Ownership |
| Contract versioning backward compatible | Integration safety |

---

## Done? Checklist
- [ ] MongoDB model + indexes create kiye (sab 30 modules)
- [ ] Express REST APIs implement kiye (sab modules)
- [ ] RBAC + JWT laga
- [ ] Bitemporal + versioning + audit enforced
- [ ] Event publisher (webhook/message) + idempotency
- [ ] Test cases har module ke liye

> **Final note:** Ye requirements `Q_A_PAS.html` ke 30 sections ke Q&A se banayi gayi hain. Koi bhi confusion ho toh us section ka Q&A padho — jawab wahan mil jayega.
