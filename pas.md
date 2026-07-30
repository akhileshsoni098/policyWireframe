# Policy Administration System (PAS)

## Overview

Browser-based insurance PAS for MGA/Carrier workflows. Pure frontend (HTML + CSS + JS), 20 interconnected screens with enterprise analytics.

## System Architecture

- **Single-page app** — all screens in one `index.html`, routed via JS
- **In-memory data** — seed data in `app.js` (QUOTES, TRANSACTIONS, NOTICES, ENDORSEMENT_REQUESTS, BILLING_SCHEDULES, ACTIVITIES)
- **Pure CSS charts** — horizontal bar charts with zero external libraries
- **Hinglish UX** — Hindi + English mixed labels and documentation

## Complete Policy Lifecycle

```
1. SUBMISSION → 2. UW QUEUE → 3. BIND & ISSUE → 4. ACTIVE POLICY
                                                      ├── Notice Management
                                                      ├── Endorsement
                                                      ├── Renewal
                                                      ├── Cancellation
                                                      └── Reinstatement
```

### 1. Submission
Broker submits insured details (name, revenue, loss history, coverage needs) via a 5-step wizard: Insured → Coverage → Details → Premium → Review.

### 2. UW Queue
Underwriter evaluates risk on a 1-10 score:
- **Approve** (≥5) — bind within authority
- **Refer** (<5) — senior UW review
- **Decline** (≤3) — reject with reason

### 3. Bind & Issue
Temporary coverage starts (Bind), then policy number generated, documents created, billing schedule set, status → **Active**. Renewal requires Notice acceptance first.

### 4. Active Policy
5 possible actions:
- **Notice Management** — renewal window opens ≤30d before expiry, system sends notice with proposed premium to MGA
- **Endorsement** — mid-term changes via endorsement request queue
- **Renewal** — new term after notice accept
- **Cancellation** — Flat / Pro-rata / Short Rate
- **Reinstatement** — 30-day window to restore cancelled policy ($250 fee)

## 20 Screens Quick Reference

| # | Screen | Purpose |
|---|---|---|
| 1 | Login | 2-step auth (Email+Password → OTP) |
| 2 | Dashboard | 8 KPIs + 6 analytics charts |
| 3 | Quotes | Search/filter policies by LOB/status |
| 4 | Policy Search | List with filters, click→8-tab detail |
| 5 | New Submission | 5-step wizard |
| 6 | UW Queue | Approve/Refer/Decline |
| 7 | Policy Details | 8 tabs (Details, Coverages, Premium, Versions, Timeline, Docs, Notes, Audit) |
| 8 | Notice Management | Notice lifecycle (Draft→Sent→Delivered→Executed/Expired), Accept→Renewal |
| 9 | Endorsement Req Queue | Pending requests pipeline, Approve/Decline/Refer |
| 10 | Endorsement | 4-tab wizard + premium impact |
| 11 | Renewal | Editable premium, Send Offer to MGA, progress bar |
| 12 | Cancellation | Flat/Pro-rata/Short Rate + reason |
| 13 | Reinstatement | 30-day check, $250 fee |
| 14 | Billing | Invoices, installments, payment status |
| 15 | Transactions | Financial history (Issue, Renewal, Endorsement, Cancel, Reinstate) |
| 16 | Documents | Uploads by category, download |
| 17 | Notes | UW/Billing/Claims notes with timestamps |
| 18 | Activities & Audit | Activity feed + audit log (old/new values) |
| 19 | Reports | 8 report types |
| 20 | Admin | Users, Roles, Permissions, Settings |

## Enterprise Dashboard Analytics

### 8 KPI Cards (2 rows × 4)
1. **Approved to Issue** — approved but not yet issued
2. **Active Policies** — in-force policies
3. **In-Force Premium** — total annual premium
4. **Avg Premium** — average per active policy
5. **Pending Notices** — notices awaiting MGA action
6. **Pending Decisions** — DELIVERED notices pending decision
7. **Renewals Due (30d)** — expiring within 30 days
8. **Open Endorse Reqs** — pending endorsement requests

### 6 Chart Sections
| Chart | Data Source | What It Shows |
|---|---|---|
| Premium by LOB | QUOTES | Premium per line of business (GL, Auto, WC, etc.), color-coded horizontal bars |
| Policy Status Distribution | QUOTES | Count by status (Active, Approved, Cancelled, Expired, etc.) |
| Transaction Volume | TRANSACTIONS | Count by type (Issue, Renewal, Endorsement, Cancellation, Reinstate) |
| Top Agents by Premium | QUOTES | Top 5 agents ranked by premium written |
| Notice Pipeline | NOTICES | Count per stage (Draft→Sent→Delivered→Executed→Expired) |
| Endorsement Requests | ENDORSEMENT_REQUESTS | Count per status (Pending, In Progress, Under Review, Completed, Declined) |

## Premium Calculation

```
Base Premium × Experience Mod × Schedule Credit + Taxes + Fees = Total Premium
```

**Example — ABC Construction (POL-2026-001):**
| Component | Amount |
|---|---|
| Base Premium | $98,000 |
| Experience Mod (0.92) | −$7,840 |
| Schedule Credit (−5%) | −$4,508 |
| SLA Tax (3.6%) | +$3,083 |
| Stamping Fee (1.5%) | +$1,285 |
| **Total** | **$125,000** |

## Billing

**Plans:** Annual, Semi-Annual, Quarterly (default), Monthly (+interest)

**Rules:**
- Grace period: 10 days past due
- Late fee: 1.5%/month (18% APR)
- 10-day cancellation notice after non-payment

## MGA Underwriting Model

3 authority tiers defined in the Binding Authority Agreement (BAA):

| Tier | Bind Limit | Needs Carrier? |
|---|---|---|
| 1 — Full | Up to $1M limit / $500K premium | Annual audit only |
| 2 — Limited | Up to $500K limit / $250K premium | Quarterly review |
| 3 — Non-Binding | Quote only | Every submission |

MGA can: **Approve** (within authority), **Refer to Carrier** (outside authority), **Decline** (unacceptable risk)

## Key Business Rules

| Rule | Detail |
|---|---|
| Renewal Window | Opens ≤30 days before expiration; button disabled otherwise |
| Reinstatement | 30 days post-cancellation; $250 fee |
| Endorsement Queue | All mid-term changes require queue approval first |
| Notice Expiry | DELIVERED notices can be manually expired by MGA |
| Auto-Decline | UW score ≤ 3 |
| Senior UW Referral | UW score < 5 or premium > $500K |

## Audit Trail

Every action logged with: timestamp, user, action, old value, new value. Mandatory for SOX/NAIC compliance. 5-year retention.

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     MGA / RATING ENGINE                         │
│  (API from MGA → Quote Data → Premium Calculation)             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPROVED QUOTATION                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Quote No │ Insured Details │ Broker Details             │   │
│  │ MGA Details │ Coverage Details │ Premium Amount         │   │
│  │ Coverage Limit │ Effective Date │ Expiry Date           │   │
│  │ Status = APPROVED                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    POLICY ISSUANCE (BIND & ISSUE)               │
│  ├── Generate Policy Number                                    │
│  ├── Update Quote Status → ACTIVE                              │
│  ├── Issue Date / Policy Start Date                            │
│  └── Policy becomes Active                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CREATE TRANSACTION (TYPE=ISSUE)              │
│  ├── Policy No │ Quote No │ Transaction Date                   │
│  ├── Request Payload │ Response Payload                        │
│  └── Created By                                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
           ┌──────────────────┼──────────────────┐
           ▼                  ▼                  ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
│   ENDORSEMENT    │ │   RENEWAL    │ │   CANCELLATION   │
│  ─────────────── │ │  ─────────── │ │  ─────────────── │
│ API from MGA     │ │ API from MGA │ │ API from MGA     │
│ Update Quote     │ │ Update Dates │ │ Status Changed   │
│ Save Transaction │ │ Save History │ │ Save History     │
└──────────────────┘ └──────────────┘ └──────────────────┘
           │                  │                  │
           └──────────────────┼──────────────────┘
                              │
                              ▼
              ┌─────────────────────────────┐
              │        NOTICE / OFFER        │
              │  (for insured through MGA)   │
              └─────────────────────────────┘
                     │              │
                     │              ▼
                     │     ┌─────────────────────────────────┐
                     │     │   REINSTATEMENT                 │
                     │     │  ──────────────────────────     │
                     │     │  API from MGA → Status ACTIVE   │
                     │     │  Save History                   │
                     │     └─────────────────────────────────┘
                     │              │
                     └──────┐       │
                            │       │
                            ▼       ▼
              ┌─────────────────────────────────────┐
              │     POLICY TRANSACTION HISTORY       │
              │  ───────────────────────────────     │
              │  ISSUE │ ENDORSEMENT │ RENEWAL       │
              │  CANCELLATION │ REINSTATEMENT        │
              └─────────────────────────────────────┘
```

**Flow Sequence:**
1. MGA/Rating Engine sends approved quotation to PAS via API (includes quote no, insured, broker, MGA, coverage, premium, limit, effective/expiry dates, status=APPROVED)
2. PAS issues policy (Bind & Issue) — generates policy number, updates quote status to ACTIVE, records issue date and policy start date
3. Transaction created with type=ISSUE — full request/response payload stored with policy no, quote no, transaction date, and created by
4. Active policy enters lifecycle — Endorsement (mid-term changes via MGA API), Renewal (date updates), or Cancellation (status change)
5. Each lifecycle event generates a Notice/Offer back to MGA for insured communication
6. MGA returns updated data; Reinstatement restores cancelled policies with status→ACTIVE
7. All events recorded in Policy Transaction History (ISSUE, ENDORSEMENT, RENEWAL, CANCELLATION, REINSTATEMENT)
