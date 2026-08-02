# 📖 PAS ki Kahani — "Do Insurance Companies, Ek Software"

> Ye document `REQUIREMENTS.md` ko ek **simple story** ke roop mein samjhata hai.
> Do companies — **Maaze Underwriting Solutions** aur **ITG Telematics** — ne PAS (Policy Administration System) kharida.
> Har activity ko scenario ke saath, layman language mein likha gaya hai.

---

## 🏠 Chapter 1 — Ek Software, Do Companies

Ek software company hai **PAS Inc.** Jinhone ek super-smart software banaya jiska naam hai **PAS** — Policy Administration System. Ye software insurance policies banane, change karne, aur track karne ka **poora system** hai.

Is software ko **do alag-alag insurance companies ne kharida**:

| Company | Type |
|---|---|
| **Maaze Underwriting Solutions** (tenant `T-001`) | Purani, badi, traditional insurance company |
| **ITG Telematics** (tenant `T-002`) | Nayi, tech wali, GPS/telematics data wali company |

Dono ne **ek hi software**, **ek hi database** use kiya. Lekin dono ka data **kabhi nahi milna chahiye**. Isi cheez ka naam hai **Multi-Tenancy**.

### 🏢 Tenant kya hai? (Simply)

**Tenant = woh company jo software ko "lease" par leti hai.**

- Maaze ka koi bhi employee login kare → system bole: *"Ye `T-001` ka aadmi hai, ise sirf Maaze ka data dikhao."*
- ITG ka employee login kare → system bole: *"Ye `T-002` ka aadmi hai, ise sirf ITG ka data dikhao."*

> ⚠️ **Small Condition:** Agar ITG ka banda Maaze ka policy number dhundhe → system turant **403 Forbidden** karega. Kabhi nahi milne dunga — `tenantId` filter **har query** mein hamesha lagta hai.

**Real duniya example:** Socho ek building mein 10 dukaan hain. Har dukaan ki apni almari hai (data), lekin building (software + database) ek hi hai. Har dukaan ki **apni chabi** hai (tenantId) — kisi doosre ki almari nahi khul sakti.

---

## 📋 Chapter 2 — Har Jagah Same Niyam (Common Conventions)

PAS ke **har module** mein kuch common niyam hote hain, jaise school ke har class mein wahi uniform hota hai:

1. **tenantId** → Har document par likha hota hai ki ye kis company ka hai.
2. **Bitemporal** → Har record par **do dates** hoti hain:
   - `effectiveFrom` → *"Business ke hisaab se ye kab se lagu hai"* (jaise policy 1 Jan se start)
   - `recordedAt` → *"System ne ye kab likha"* (jaise data 5 Jan ko dala)
3. **Versioning** → Policy mein koi bhi change ho toh uski `version` ek badh jaati hai (v1 → v2 → v3). Jaise WhatsApp ka update.
4. **Audit** → Jo bhi change hota hai, woh ek **khate mein likha jata hai** jo kabhi nahi mitata — kaun, kab, kya badla.
5. **Readable ID** → Har policy/binder/quote ka ek asaan number hota hai: `POL-2026-0001`, `BN-2026-001`, `Q-2026-001`.

**Kuch important codes (HTTP status):**
| Code | Matlab |
|---|---|
| 200 | Sab theek ho gaya ✅ |
| 400 | Tumne galat data bheja (validation fail) |
| 401 | Login nahi kiya |
| 403 | Tumhara role iska haq nahi rakhta (tenant/role issue) |
| 404 | Ye cheez mili hi nahi |
| 409 | Version mismatch (dono ne ek saath edit kiya) |
| 422 | Business ka niyam toda |

---

## 📄 Chapter 3 — Policy Ka "Malik" Kaun? (Module 1: Ownership)

### Story

Maaze ki policy banne se pehle **Quote** module mein proposal banta hai. Lekin jaise hi policy **Bind** hoti hai, **PAS uski original file ban jata hai** — bilkul jaise shaadi ka certificate court hi original rakhta hai, broker nahi.

### Scenario

1. **ITG Telematics** ki ek gaadi (delivery van) ka insurance quote banta hai — `Q-2026-001`.
2. Quote approve hoti hai aur **bind** ho jaati hai → ab PAS ke paas asli policy `POL-2026-0001` banti hai.
3. Quote module ab **kabhi** policy ka data nahi badal sakta — uski sari authority PAS ke paas chali gayi.

> ⚠️ **Small Conditions:**
> - Policy number, inception date, premium — ye **immutable** hain. Sirf **endorsement** (documented change) se badal sakte hain. Jaise court ke bina naav nahi badal sakta.
> - Claims aur compliance wale log **hamesha PAS se hi** policy ka sach dekhenge, quote module se nahi.

### Collection Store
`quotes` (proposal), `policies` (asli policy), `parties` (insured/broker), `locations` (jagah), `coverages` (kya kya covered hai).

---

## 🧩 Chapter 4 — Policy Ek "Box" Hai (Module 2: Aggregate)

### Story

Policy ek **box (aggregate root)** hai. Uske andar bahut si chhoti cheezein hain — coverages, locations, parties, endorsements, schedules, carriers. Ye sab **sirf box ke through hi** khole/badle ja sakte hain. Bahar se koi seedha andar ki cheez ko nahi chhu sakta.

### Scenario

ITG ki policy `POL-2026-0001` ke andar:
- **Coverage:** "Vehicle Damage — limit ₹5,00,000, deductible ₹10,000"
- **Location:** "Mumbai Depot"
- **Parties:** Insured = ITG, Broker = "Axa Distributor"
- **Carriers (co-insurance):** Maaze 60% + "Swiss Re" 40% → **60+40 = 100%** hone chahiye.

> ⚠️ **Small Condition:** Agar carriers ka hissa 95% bhi hua → system **422 error** dega. Total hamesha **100%** hona chahiye.
> Agar koi coverage change karna hai → woh **policy ke through** endorsement transaction se hoga, direct DB update kabhi nahi.

---

## 🔄 Chapter 5 — Policy Ki Zindagi (Module 3: Lifecycle)

### Story

Har policy ki ek zindagi hoti hai — janam se mrityu tak:

```
DRAFT → QUOTED → BOUND → ACTIVE → CANCELLED / EXPIRED / VOID
```

### Scenario (ITG ki policy)

1. **DRAFT** — Banda ne form bharna shuru kiya, adhura pada hai.
2. **QUOTED** — Form complete hua, quote ban gayi `Q-2026-001`, price bataya gaya.
3. **BOUND** — Insured ne "haan, main le raha hoon" bola → policy temporary cover mein aa gayi.
4. **ACTIVE (ISSUED)** — Papers ready hue, policy issue hui — ab pura cover.
5. **CANCELLED** — Bich mein insured ne band kara.
   Ya **EXPIRED** — 31 Dec ko term khatam, apne aap band.
   Ya **VOID** — Galati se ban gayi thi, admin ne khaali (void) kar di.

> ⚠️ **Small Conditions (State Machine):**
> - **QUOTED → BOUND:** Sirf tab jab UW ne quote **APPROVED** kiya ho.
> - **BOUND → ACTIVE:** Sirf jab documents + compliance ready ho.
> - **ACTIVE → CANCELLED:** Carrier/insured ka proper notice chahiye.
> - **CANCELLED → ACTIVE (REINSTATE):** UW ki approval chahiye.
> - **kisi se bhi → VOID:** Sirf Admin kar sakta hai.
> - Har transition ek **transaction** se hota hai — seedha status change nahi.

---

## 🧾 Chapter 6 — Har Change Ek "Receipt" (Module 4: Transactions)

### Story

Policy ke data mein **har ek change ek transaction** hai — jaise bank mein har paisa aane-jane ka receipt banta hai. Transaction ki apni zindagi hai:

```
DRAFT → PENDING → COMPLETED → FAILED / REVERSED
```

### Scenario

ITG ne policy mein **endorsement** kara — premium ₹1,25,000 se ₹1,50,000. Ye ek transaction `ENDORSE` banaya jata hai:
1. **DRAFT** — Banda edit kar raha hai, save nahi kiya.
2. **SUBMIT** → **PENDING** — Processing line mein.
3. **APPROVE** → **COMPLETED** — Policy v2 ban gayi.

> ⚠️ **Small Conditions:**
> - **Direct DB update FORBIDDEN** — sirf transaction se badlo, warna audit todna padega.
> - **Optimistic Lock:** Agar 2 log ek saath edit karein aur dono "version 1" ke sath save karein → pehla v2, doosra **409 Conflict** dega (kyunki ab actual v2 hai). Use dobara reload karna hoga.
> - **Reverse = delete nahi** — ulatne ke liye nayi transaction `REVERSE` banti hai, purani history rehti hai.
> - Draft **7 din** me auto-expire ho jata hai.

### Transaction ke prakar
`BIND`, `ISSUE`, `ENDORSE`, `CANCEL`, `REINSTATE`, `RENEW`, `NON_RENEW`, `VOID`, `REWRITE`, `CORRECT`.

---

## 📅 Chapter 7 — Do Alag Dates (Module 5: Effective Dating)

### Story

Har record par **do dates** hoti hain — jaise ek diary mein:
- **Effective date** (`effectiveFrom`) — "ye baat kab se sach hai" (business date)
- **Recorded date** (`recordedAt`) — "ye baat maine kab likhi" (system date)

### Scenario

ITG ki policy ka premium 1 March se badhana hai, lekin system mein 15 March ko dala. Toh:
- `effectiveFrom` = 1 March
- `recordedAt` = 15 March

Agar koi puchhe **"1 March ko premium kitna tha?"** → system 1 March wali state dikhayega (naya premium), kyunki us date se change effective tha.

### As-of Query (Important Feature)

- `GET /api/policies/:id?asOf=2026-06-15` → "Batao 15 June ko policy ki kya state thi"
- `GET /api/policies/:id?systemAsOf=2026-03-16T00:00:00Z` → "Batao 16 March system-recorded time par kya dikh raha tha"

> ⚠️ **Small Conditions:**
> - **Future-dated changes** → system unhe schedule kar deta hai, effective date aate hi automatically apply.
> - **Backdated changes** (OOS) → baad wale transactions ko dobara "replay" karta hai (achhi kahani — Chapter 8).

---

## ⏪ Chapter 8 — Pichle Se Change Karna (Module 6: OOS Endorsements)

### Story

**OOS = Out-of-Sequence.** Matlab — tumne ek aisa change kiya jiska **effective date pehle wale transaction se bhi pichhe hai**. Jaise film ki story mein peeche jaake scene badalna.

### Scenario

ITG ki policy timeline:
- **15 March:** Premium ₹1,25,000 (transaction txn-7)
- **20 April:** Location badla Mumbai → Pune (txn-8)
- **10 July:** Naya change aaya — *"15 March se hi premium ₹1,50,000 hona chahiye tha"* (effective 15 March, jo txn-7 ke pehle hai!)

Ab system kya karega:
1. Ye **OOS** change detect karega (`oos: true`).
2. Baad wale transactions (txn-7, txn-8) ko naye state par **replay** karega.
3. Agar koi **conflict** hua (dono ne same field badli) → system puchhega: *"Tum kaunsa decide karte ho?"*
4. Jis period ka asar hua, uska **rerate** hoga aur premium ka fark (`premiumDelta`) billing ko jayega.

> ⚠️ **Small Conditions:**
> - Agar conflict nahi → **auto-replay** (khud theek ho gaya).
> - Agar conflict hai → **manual resolution** chahiye, warna data galat ho jayega.
> - Affected period ka rerate + `premiumDelta` publish hota hai taaki billing sahi rahe.

---

## ✅ Chapter 7.5 — Bind Aur Issue (Module 7: Bind & Issuance)

### Story

**Bind** = "quote pakki kar lo" (provisional cover). **Issue** = "asli policy document banao" (final cover).

### Scenario — Maaze ka customer "Sharma Textiles"

1. Sharma Textiles ne Commercial Property insurance ke liye form bhara → quote `Q-2026-001` bani, premium ₹1,25,000, score 78.
2. UW (underwriter) ne dekha aur **APPROVED** kiya.
3. Broker ne **Bind** dabaya — `binderExpiryDays: 30`.
4. System ne binder number `BN-2026-001` banaya, expiry 30 din baad (1 March). Policy **BOUND** ho gayi.
5. Binder ke andar **subjectivities** ho sakti hain: *"Fire alarm report pending"* — matlab binder mein ek shart abhi poori nahi hui.
6. Jab sab kuch ready hua → **Issue** → Policy **ACTIVE** ho gayi, documents generate hue.

> ⚠️ **Small Conditions:**
> - **Bind sirf APPROVED quote par** — agar status `PENDING` hai toh 422 error.
> - **Binder expiry ke baad** policy issue na hui → system warning deta hai / binder revert.
> - Bind ke time mandatory fields validate hote hain — adhuri policy nahi banti.
> - UW queue (Chapter 13) se sab submissions pending dikhte hain — `daysInQueue` ke sath.

---

## ✏️ Chapter 9 — Bich Mein Badlav (Module 8: Endorsements)

### Story

**Endorsement** = policy ko bich mein badalna (addition/deletion/change). Har endorsement = nayi version.

### Scenario — ITG Telematics

ITG ko nayi gaadi add karni hai fleet mein, aur premium badh jayega:
1. Broker `POST /api/policies/:id/endorsements` → `{ changes: { gaadi add karo }, effectiveFrom: "2026-06-01" }`.
2. Kyunki premium change ho raha hai → **UW approval chahiye**.
3. UW approve karta hai → policy **v3** ban jati hai, premium delta billing ko jata hai.

> ⚠️ **Small Conditions:**
> - **Premium/risk change wala endorsement** → UW approval zaroori.
> - **Har completed endorsement** → version bump (ENDORSE type).
> - **Administrative correction** (naam ki spelling) vs **endorsement** (coverage change) — dono alag types hain, kyunki ek financial impact rakhta hai, doosra nahi.

---

## 🔁 Chapter 10 — Policy Ki Renwal (Module 9: Renewal)

### Story

Policy ki term (sirf 1 year) khatam hone se pehle — **renewal** hota hai. Purani policy se link rakh kar nayi term banti hai, taaki history continuous rahe.

### Scenario — Maaze ka Sharma Textiles

Sharma ki policy 31 Dec ko khatam hai:
1. 1 Nov ko system **renewal notice** bhejta hai (*60 days pehle* — regulatory niyam).
2. 1 Dec ko `POST /api/policies/:id/renew` → nayi policy `POL-2027-0001` banti hai.
3. Nayi policy par `priorPolicyId: "p-0001"` set hota hai → dono link ho gayi.
4. `GET /api/policies/:id/renewal-history` → poori chain dikhti hai: Policy 2026 → 2027 → 2028...

> ⚠️ **Small Conditions:**
> - Renewal par version bump RENEW type se hota hai.
> - **Non-renewal:** Agar company renew nahi karni → status `NON_RENEWED` + notice.
> - Renewal quote bhi ban sakti hai (rating dobara).

---

## ❌ Chapter 11 — Policy Band Karna (Module 10: Cancellation)

### Story

**Cancellation** = policy ko bich mein hi band karna. Jitna time cover use nahi hua, uska premium wapas milta hai (**return premium**).

### Scenario — ITG ka customer

Ek fleet owner ne 30 June ko policy cancel kara, jiska inception 1 Jan tha (term 1 year, premium ₹1,20,000):
1. `POST /api/policies/:id/cancel` → `{ effectiveFrom: "2026-06-30", reason: "Customer request", initiatedBy: "INSURED" }`.
2. System **pro-rata** return premium nikalta hai:
   - 6 months use hue, 6 months bache → return = ₹1,20,000 × (6/12) = **₹60,000**.
3. Cancellation notice generate hota hai, claims ko notify hota hai.

> ⚠️ **Small Conditions:**
> - **Carrier-initiated cancellation** (company band kare) → **UW approval** chahiye (legal niyam).
> - **Insured-initiated** → directly allowed.
> - Return premium formula = `(unused days / total days) × premium`.
> - Policy status → `CANCELLED`.

---

## 🌱 Chapter 12 — Wapas Zinda Karna (Module 11: Reinstatement & Rewrite)

### Story

Kabhi-kabhi cancelled policy ko **wapas ACTIVE** karna hota hai — ise kahate hain **Reinstatement**. Aur kabhi **Rewrite** — nayi policy number ke sath purani ka copy.

### Scenario — Reinstate

ITG ki policy 30 June ko cancelled hui thi. 15 July ko customer bole "are nahi, maine soch liya, policy wapas chahiye":
1. `POST /api/policies/:id/reinstate` → `{ effectiveFrom: "2026-07-15" }`.
2. **UW approval** chahiye.
3. Approve hone par policy `ACTIVE` wapas.
4. **Gap period** (30 June → 15 July, jisme cover nahi tha) **record hota hai** — taaki pata rahe ki 15 din ka gap tha.

> ⚠️ **Small Condition:** Gap period bina record kiye reinstate nahi — kyunki coverage gap ka clarity chahiye (claims ke time pata chale "us date par cover tha ya nahi").

### Scenario — Rewrite

Rewrite matlab **naya policy number + purani se link** (jaise galat structure par nayi policy). `POST /api/policies/:id/rewrite` → nayi policy `POL-2026-0088` with `priorPolicyId` = purani.

---

## 🗂️ Chapter 13 — Policy Ki "File" Har Version Mein (Module 12: Versioning)

### Story

Har change ke sath policy ki **nayi version** banti hai — jisme **snapshot** (poori file ka copy) aur **diff** (kya badla) dono store hote hain.

### Scenario

ITG ki policy:
- **v1** — 1 Jan: premium ₹1,25,000
- **v2** — 1 March: premium ₹1,50,000 (diff: premium 125000 → 150000)
- **v3** — 1 June: gaadi add (diff: fleet size 5 → 6)

`GET /api/policies/:id/versions` → list. `GET /api/policies/:id/versions/2` → v2 ka snapshot. `GET /versions/2/diff/3` → v2 aur v3 ka fark.

> ⚠️ **Small Conditions:**
> - Version **hamesha +1**, kabhi bhi reuse nahi hota.
> - Snapshot ek baar likha toh **immutable** (kabhi change nahi).
> - Galat version ke sath write → **409 Conflict** (optimistic lock).

---

## 💰 Chapter 14 — Kaamdaam Aur Price (Module 13: Product & Rating)

### Story

**Rating** = premium calculate karna. **Product** = kaun kaunsi cheez bechi ja sakti hai (kya eligible hai).

### Scenario

ITG ka van insurance quote:
1. `POST /api/rate` → `{ productId: "pr-001", riskData: {...} }`.
2. Rating module: Base premium ₹1,00,000 + Hazard loading ₹15,000 + Taxes ₹10,000 = **₹1,25,000**.
3. Ye rating result (`rating_results`) PAS mein **store** hota hai — PAS **single source of truth** hai.
4. Product config batata hai kaunsi coverages allowed hain — UW ko rule book chahiye nahi, system khud batata hai.

> ⚠️ **Small Condition:** Har premium change par **dobara rerate** call hota hai.

---

## 🧑‍⚖️ Chapter 15 — UW Ka Judge Khelna (Module 14: Underwriting)

### Story

**UW (Underwriter)** = judge jo decide karta hai "policy milegi ya nahi". Uski ek **queue** (line) hoti hai jisme sab submissions pending hain.

### Scenario — Maaze ka Sharma Textiles

1. Broker ne submission bheja. UW queue mein aaya: *"Sharma Textiles, LOB: Commercial Property, Premium ₹1,25,000, Score 78, Days in queue: 3"*.
2. UW 3 actions le sakta hai:
   - **APPROVE** → Quote `APPROVED` → ab bind kar sakte hain.
   - **REJECT** → Quote `REJECTED` → bind **blocked**.
   - **REFER** → kisi senior UW ke paas.
3. Har decision ka record (`uw_approvals`) store hota hai — decision ID policy par hota hai.

> ⚠️ **Small Condition:** **High-risk score** (jaise score 90+) → system **auto-refer** karta hai kisi experienced UW ke paas.

---

## 🤝 Chapter 16 — Dalaal Aur Commission (Module 15: Distribution)

### Story

Beema dalaalon (brokers/agents) ke through becha jata hai. Jitni policy bechoge, unka **commission** banta hai.

### Scenario

- ITG ki policy broker "Axa Distributor" ne bechi.
- `POST /api/commissions/calculate` → `{ policyId, producerId }` → commission = 10% of premium.
- Commission **sirf issued policy par** banta hai — sirf bind nahi, full issue ke baad.

> ⚠️ **Small Condition:** Har tenant ka apna **commission schedule** ho sakta hai — Maaze 10% deta hai, ITG 8% deta hai. (Per-tenant config!)

---

## 🧾 Chapter 17 — Billing Aur Payment (Module 16: Billing)

### Story

Premium ke liye **invoice** banta hai, payment li jaati hai, aur kuch policies mein **instalments** (kishton) mein payment hoti hai.

### Scenario — Sharma Textiles

1. Policy issue hui → Invoice `INV-0001` bana: ₹1,25,000, due 31 Jan.
2. Sharma ne `POST /api/payments` → `{ policyId, amount: 125000 }` → payment record + invoice `PAID`.

> ⚠️ **Small Conditions (Badhiya wali):**
> - **30 din payment nahi aayi** → system apne aap **cancellation workflow** start kar deta hai (non-payment cancellation). Revenue control!
> - Policy ka state aur payment ka state **alag-alag** track hote hain — policy ACTIVE ho sakti hai par invoice PENDING.
> - Endorsement se premium badha → `POST /api/policies/:id/premium-adjustment` → naya invoice/delta.

---

## 🚑 Chapter 18 — Claims Ke Liye Purana Sach (Module 17: Claims)

### Story

Jab **accident (loss)** hota hai, claims wale ko policy ki **usi din ki state** chahiye — "us loss date par coverage tha ya nahi, limit kitni thi."

### Scenario — ITG ka van

1. 15 March ko ITG ka van accident mein gaya.
2. Claims ne `POST /api/claim-referrals` → `{ policyId, lossDate: "2026-03-15" }`.
3. PAS ne **15 March wali versioned state** nikali — us din ki coverages, limits, deductibles.
4. Kya pata! 20 March ko ITG ne policy cancel kar di thi. **Koi baat nahi** — PAS ke paas ab bhi 15 March ki state hai (versioned history).

> ⚠️ **Small Condition:** Claims hamesha **versioned state** use kare, kabhi bhi "current" state nahi. Policy cancelled ho toh bhi loss-date state valid rehti hai.

---

## 🌍 Chapter 19 — Risk Dusron Ke Sath Baantna (Module 18: Reinsurance)

### Story

**Reinsurance** = bada risk dusri companies (reinsurers) ke sath baantna. PAS khud reinsurance nahi karta, sirf **report** karta hai.

### Scenario

- Maaze ne Sharma Textiles ki ₹50,00,000 policy par risk share:
  - Maaze khud: 60%
  - Reinsurer "Swiss Re": 40%
- `POST /api/reinsurance/report` → `{ policyId, shares }`.
- Treaty (automatic) ya Facultative (har ek par alag) — product config se decide.

> ⚠️ **Small Condition:** Shares ka total hamesha **100%** hona chahiye.

---

## ⚖️ Chapter 20 — Kanoon Ki Pahredari (Module 19: Compliance)

### Story

Bind, issue, cancel, non-renewal — **har step par kanoon ki check** hoti hai: sanctions (kisi aatanki list wala to nahi), KYC, regulatory forms.

### Scenario

Sharma Textiles ke naam ka **sanctions check** hua:
- `POST /api/compliance/check` → `{ party, type: "SANCTIONS" }` → result.
- Agar naam **blacklist** mein mila → **bind BLOCKED** (legal emergency!).

> ⚠️ **Small Condition:** Har jurisdiction (rajya) ka **apna form set** hota hai — kya chahiye ye system batata hai.

---

## 📄 Chapter 21 — Paper Kaam (Module 20: Documents & Forms)

### Story

Policy documents aur endorsement notices **generate** hote hain aur har version ka apna document rehta hai.

### Scenario

- Policy issue hui → `POL-2026-0001-v1-ISSUE.pdf`.
- Endorsement v2 → `POL-2026-0001-v2-ENDORSE.pdf`.
- File ka naam **policy number + version** hota hai → trace karna asaan.

> ⚠️ **Small Condition:** Har version ka apna document set hota hai — legal evidence ke liye.

---

## 🏢 Chapter 22 — Tenant Ka System (Module 21 & 22: Tenant + Config)

### Story (Dobara, ab deep mein)

Maaze aur ITG dono ek hi software use karte hain, lekin **har company ki apni settings (config)** hai:

```json
{
  "_id": "t-001",
  "name": "Maaze Underwriting Solutions",
  "config": {
    "numberingFormats": { "policy": "POL-{year}-{seq}" },
    "approvalRules": { "requireUwForBind": true }
  }
}
```

- Maaze: policy number `POL-2026-0001`, bind ke liye UW approval chahiye.
- ITG: policy number `ITG-POL-2026-001`, bind ke liye UW approval nahi chahiye (agreed separately).

**Config = key-value pairs** (Module 22):
```json
{
  "scope": "PRODUCT",
  "key": "requireUwApprovalForEndorsement",
  "value": true
}
```

> ⚠️ **Small Conditions:**
> - Har query mein `tenantId` → isolation (jaise Chapter 1).
> - Cross-tenant → **403**.
> - Config change → audited hota hai.
> - Default config fallback — agar tenant ka config nahi mila, system default use karta hai (kabhi breakdown nahi).

---

## 🔢 Chapter 23 — Number Ka Machine (Module 23: Numbering)

### Story

Policy/binder numbers **race-safe** banne chahiye — matlab 2 log ek saath number lein toh duplicate na aaye.

### Scenario

- Maaze ki 42nd policy ke liye `POL-2026-0043` chahiye.
- System **atomic** `findOneAndUpdate` se sequence counter badhata hai — dono requests ek saath aaye toh bhi koi duplicate number nahi.

> ⚠️ **Small Condition:** Format har tenant + type ke liye alag (branding/legal).

---

## 🔐 Chapter 24 — Security Guard (Module 24: Security & RBAC)

### Story

**RBAC (Role-Based Access Control)** = har role ki apni permission. Guard har gate par ticket check karta hai.

### Roles

| Role | Kya kar sakta hai |
|---|---|
| `BROKER` | Quote bana sakta hai, bind, endorsements |
| `UNDERWRITER` | Approve/reject, endorse approve |
| `ADMIN` | Tenant banana, users, VOID |
| `CLAIMS` | Policy state as-of date dekhna |

### Scenario

- Maaze ka broker "Rohit" login → JWT token mila.
- Token mein role hai. Har API call par system check karta hai: "Is role ko ye permission hai?"
- Rohit ne UW approve karne ki koshish ki → **403 Forbidden**! Uske guard ne turant roka.

> ⚠️ **Small Condition:** JWT expiry + refresh — session secure rehta hai.

---

## 📒 Chapter 25 — Khata Jo Kabhi Nahi Mitata (Module 25: Audit)

### Story

Har mutation ek **audit log** mein immutably likha jata hai — kaun, kab, kya, kya approval thi.

### Example log

```json
{
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

> ⚠️ **Small Conditions:**
> - Logs **append-only** — update/delete possible nahi.
> - Har mutation ke sath **requestId** — poori request trace hoti hai.

---

## 📡 Chapter 26 — Baat Karne Ka Tarika (Module 26: API & Events)

### Story

System do tarah se baat karta hai:
1. **Synchronous (REST API):** Tumne pucha → turant jawab. Jaise phone call.
2. **Async (Events):** Kaam hua → sabko khabar bheji, koi intezaar nahi karta. Jaise WhatsApp broadcast.

### Events

- `POLICY.BOUND` → billing ko pata chala: invoice banao!
- `POLICY.ISSUED` → document service: policy PDF banao!
- `PREMIUM.ADJUSTED` → billing: premium delta laga do!

### Scenario — Idempotency (double-charging se bachna)

ITG ka payment request do baar aaya (network retry):
- Pehla request: `Idempotency-Key: abc-123` → processed.
- Dusra request: wahi key → system bolta hai *"Ye to pehle hi ho gaya, yahan teri pehli ka response hai"*. Double charge NAHI hota. ✅

> ⚠️ **Small Conditions:**
> - Mutations `Idempotency-Key` header ke sath → retry safe.
> - Event delivery fail → **retry** + **DLQ** (dead letter queue) → koi event kabhi lost nahi.

---

## 🛟 Chapter 27 — Kabhi Data Na Khoyen (Module 27: Reliability)

### Scenario

- PAS ko external rating service call karni hai, woh **fail** ho gayi → system **3 baar retry** karta hai (backoff ke sath).
- Phir bhi fail → event **DLQ** mein → baad mein reprocess.
- Ek mutation beech mein fail hua (50% ho chuka tha) → **Mongo transaction** se **rollback** — poori cheez wapas pehle jaisi.

> ⚠️ **Small Condition:** Mutation atomic — ya to pura complete, ya to kuch nahi. Partial policy state kabhi nahi.

---

## ⚡ Chapter 28 — Fast-Fast (Module 28: Performance)

### Indexes (jaise book ka index)

- `policies`: `{ tenantId, policyNumber }` unique — number se turant mile.
- `transactions`: `{ tenantId, policyId, seq }` — history jaldi.
- `quotes`: `{ tenantId, status, createdDate }` — UW queue fast.
- `audit_logs`: `{ tenantId, entityId, timestamp }` — audit search fast.

> ⚠️ **Small Conditions:** Read-heavy queries cached; point-in-time queries version snapshot index use karte hain.

---

## 🖥️ Chapter 29 — Aasaan Screens (Module 29: UX)

- **Dashboard** — stats + shortcuts.
- **UW Queue** — table, status badges (New/In Review/Referred), Days in queue, Review & Modify button, tooltips.
- **Submission Detail** — editable review form.
- **Policy Detail** — version badge `v3`, Version History card, View snapshot.
- **Bind Modal** — binder expiry selection, binder number prefill.
- **Search** — live Q&A search.

> ⚠️ **Small Condition:** Status badges color-coded; har actionable par tooltip/info.

---

## 🧱 Chapter 30 — Alag-Alag Departments (Module 30: Bounded Contexts)

### Story

System ke andar alag-alag **departments** hain, har department ka apna kaam aur apna data:

| Bounded Context | Kaam | Uske paas data |
|---|---|---|
| **Quote** | Proposal + rating | `quotes` |
| **Policy (PAS)** | Bind/issue/endorse/renew/cancel/version | `policies`, `transactions`, `policy_versions` |
| **Billing** | Premium/payment | `invoices`, `payments` |
| **Claims** | Loss processing | `claim_referrals` |
| **Reinsurance** | Risk share | `reinsurance_shares` |
| **Compliance** | Checks/forms | `compliance_checks` |
| **Document** | PDF rendering | `documents` |

Ye departments **events se** baat karte hain, seedha ek doosre ka data kabhi nahi chhote (loose coupling).

> ⚠️ **Small Conditions:**
> - Bounded contexts **async events se** communicate karte hain.
> - Policy ka data kabhi baki contexts direct mutate nahi karte.
> - Contract versioning backward compatible.

---

## 🏁 Last Chapter — Poori Kahani Ek Saath (Full Demo Story)

Ab poori kahani ek saath, dono companies ke sath, step-by-step:

### Aaj Maaze mein (Tenant T-001)

1. **Rohit (broker)** ne login kiya → token mila.
2. **Sharma Textiles** ke liye quote banayi `Q-2026-001` → UW queue mein aayi.
3. **Priya (UW)** ne queue dekhi → score 78 (moderate) → **APPROVED** kiya.
4. Rohit ne **Bind** kiya → `BN-2026-001` → policy `BOUND`.
5. Compliance check clear → **Issue** → policy `POL-2026-0001` ACTIVE, invoice ₹1,25,000.
6. 1 March ko endorsement: premium 1,50,000 → UW approval → **v2**.
7. 1 Nov ko **renewal notice** (60 din pehle).
8. 1 Dec ko **renew** → `POL-2027-0001` with `priorPolicyId`.
9. Sharma ne 30 June ko cancel karne ka socha → return premium pro-rata.
10. Phir wapas bol gaya → **reinstate** with UW approval, gap period record hua.
11. Har step **audit_logs** mein likha gaya. Koi bhi date ki state `asOf` se milti hai.

### Aur ITG mein (Tenant T-002) — parallel duniya

- ITG ka van insurance — policy number `ITG-POL-2026-001` (alag format!).
- 15 March accident → claims ne loss-date state li.
- 15 March se premium backdate kara → **OOS endorsement** → replay + rerate.
- 30 din payment nahi aayi → auto-cancellation workflow.
- Maaze ka data ITG ko **403** — kabhi nahi dikha. ✅

**Aur dono companies ek hi software, ek hi server, ek hi database — lekin ek doosre ko jaanate tak nahi. Ye hai multi-tenant PAS ka jaadu!** 🎩

---

> **Bonus:** Ye story `REQUIREMENTS.md` ke 30 modules ka hi translation hai. Koi bhi doubt ho toh us module ke Q&A section mein dekh lo — jawab wahan mil jayega.
