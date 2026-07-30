// ============================================================
// PAS Console — Policy Administration System
// Phase 1: Dynamic Data Binding + Working Features
// ============================================================

// ============================================================
// PAS Console — Policy Administration System
// Enterprise Quote-Centric Architecture
// Data Model: QUOTES (master), TRANSACTIONS (lifecycle), NOTICES (workflow)
// ============================================================

// ---------- DATA ----------
// QUOTES — Master entity for all policy lifecycle stages
// Owned By: Policy Administration
// Statuses: APPROVED → ACTIVE → CANCELLED / EXPIRED
const QUOTES = [
  { id:'QTE-2026-001', insuredName:'ABC Construction Inc.', fein:'95-4283716', lob:'General Liability', status:'ACTIVE', effective:'2026-01-01', expiration:'2026-12-31', premium:125000, uw:'Akhilesh-Salman-Policy', agent:'Marsh Inc.', mga:'Southlake MGA', term:'Annual', billingPlan:'Quarterly', paymentMethod:'ACH', coverage:'GL', deductible:10000, limit:2000000, ratingBasis:'Gross Revenue $12.5M', basePremium:98000, modFactor:0.92, scheduleCredit:0.05, slaTax:3528, stampingFee:1470, policyNumber:'POL-2026-001', issueDate:'2026-01-01', createdDate:'2025-11-15', approvedDate:'2025-11-25' },
  { id:'QTE-2026-002', insuredName:'MedTech Solutions Inc.', fein:'82-3917450', lob:'Professional Liability', status:'APPROVED', effective:'2026-02-01', expiration:'2027-01-31', premium:67500, uw:'Vikram Patel', agent:'Aon', mga:'Southlake MGA', term:'Annual', billingPlan:'Semi-Annual', paymentMethod:'Check', coverage:'Prof Liab', deductible:25000, limit:2000000, ratingBasis:'Revenue $8.2M', basePremium:52000, modFactor:1.0, scheduleCredit:0.0, slaTax:1872, stampingFee:780, policyNumber:null, issueDate:null, createdDate:'2026-01-05', approvedDate:'2026-01-10' },
  { id:'QTE-2026-003', insuredName:'Horizon Logistics LLC', fein:'47-8192634', lob:'Auto Liability', status:'ACTIVE', effective:'2025-08-10', expiration:'2026-08-10', premium:210000, uw:'Akhilesh-Salman-Policy', agent:'WTW', mga:'National Auto Underwriters', term:'Annual', billingPlan:'Monthly', paymentMethod:'ACH', coverage:'Auto', deductible:5000, limit:3000000, ratingBasis:'Power Units 45', basePremium:175000, modFactor:1.05, scheduleCredit:0.03, slaTax:6300, stampingFee:2625, policyNumber:'POL-2026-003', issueDate:'2025-08-10', createdDate:'2025-04-15', approvedDate:'2025-04-28' },
  { id:'QTE-2026-004', insuredName:'Coastal Properties Group', fein:'13-5628971', lob:'Property', status:'ACTIVE', effective:'2025-08-18', expiration:'2026-08-18', premium:43200, uw:'Neha Gupta', agent:'Lockton', mga:'Coastal MGA Solutions', term:'Annual', billingPlan:'Annual', paymentMethod:'Wire', coverage:'Property', deductible:50000, limit:5000000, ratingBasis:'TIV $15.8M', basePremium:38500, modFactor:1.0, scheduleCredit:0.08, slaTax:1386, stampingFee:577, policyNumber:'POL-2026-004', issueDate:'2025-08-18', createdDate:'2025-07-10', approvedDate:'2025-07-22' },
  { id:'QTE-2026-005', insuredName:'Pioneer Energy Corp.', fein:'74-2156389', lob:'Workers Compensation', status:'CANCELLED', effective:'2025-04-01', expiration:'2025-12-15', premium:189000, uw:'Vikram Patel', agent:'Gallagher', mga:'Energy Risk Services', term:'Annual', billingPlan:'Quarterly', paymentMethod:'ACH', coverage:'WC', deductible:25000, limit:1000000, ratingBasis:'Payroll $22.5M', basePremium:165000, modFactor:1.12, scheduleCredit:0.0, slaTax:5940, stampingFee:2475, policyNumber:'POL-2026-005', issueDate:'2025-04-01', createdDate:'2025-02-10', approvedDate:'2025-02-28' },
  { id:'QTE-2026-006', insuredName:'First National Retail', fein:'36-7845129', lob:'Package', status:'ACTIVE', effective:'2026-01-01', expiration:'2026-12-31', premium:94800, uw:'Akhilesh-Salman-Policy', agent:'Marsh Inc.', mga:'Retail Insurance Services', term:'Annual', billingPlan:'Quarterly', paymentMethod:'ACH', coverage:'Package', deductible:10000, limit:2000000, ratingBasis:'Revenue $18.5M', basePremium:81000, modFactor:0.95, scheduleCredit:0.06, slaTax:2916, stampingFee:1215, policyNumber:'POL-2026-006', issueDate:'2026-01-01', createdDate:'2025-10-01', approvedDate:'2025-10-15' },
  { id:'QTE-2026-007', insuredName:'Sunrise Healthcare LLC', fein:'56-1987234', lob:'Professional Liability', status:'APPROVED', effective:'2026-03-01', expiration:'2027-02-28', premium:156000, uw:'Neha Gupta', agent:'Aon', mga:'Healthcare MGA Group', term:'Annual', billingPlan:'Quarterly', paymentMethod:'ACH', coverage:'Med Mal', deductible:50000, limit:5000000, ratingBasis:'Revenue $14.2M', basePremium:130000, modFactor:1.0, scheduleCredit:0.0, slaTax:4680, stampingFee:1950, policyNumber:null, issueDate:null, createdDate:'2026-01-20', approvedDate:'2026-02-05' },
  { id:'QTE-2026-008', insuredName:'Great Lakes Transport', fein:'38-5612347', lob:'Auto Liability', status:'ACTIVE', effective:'2025-09-20', expiration:'2026-09-20', premium:185000, uw:'Akhilesh-Salman-Policy', agent:'WTW', mga:'National Auto Underwriters', term:'Annual', billingPlan:'Monthly', paymentMethod:'ACH', coverage:'Auto', deductible:10000, limit:2000000, ratingBasis:'Power Units 38', basePremium:158000, modFactor:1.08, scheduleCredit:0.02, slaTax:5688, stampingFee:2370, policyNumber:'POL-2026-008', issueDate:'2025-09-20', createdDate:'2025-09-05', approvedDate:'2025-09-22' },
  { id:'QTE-2026-009', insuredName:'Blue Ridge Manufacturing', fein:'58-2716348', lob:'General Liability', status:'APPROVED', effective:'2026-09-01', expiration:'2027-08-31', premium:87500, uw:'Akhilesh-Salman-Policy', agent:'Marsh Inc.', mga:'Southlake MGA', term:'Annual', billingPlan:'Quarterly', paymentMethod:'ACH', coverage:'GL', deductible:10000, limit:2000000, ratingBasis:'Revenue $12.5M', basePremium:72500, modFactor:0.92, scheduleCredit:0.05, slaTax:2401, stampingFee:1001, policyNumber:null, issueDate:null, createdDate:'2026-07-22', approvedDate:'2026-07-28' },
  { id:'QTE-2026-010', insuredName:'Southwest Retail Group', fein:'86-4517293', lob:'Package', status:'ACTIVE', effective:'2026-02-01', expiration:'2027-02-01', premium:156200, uw:'Akhilesh-Salman-Policy', agent:'Aon', mga:'Retail Insurance Services', term:'Annual', billingPlan:'Quarterly', paymentMethod:'ACH', coverage:'Package', deductible:10000, limit:2000000, ratingBasis:'Revenue $22.8M', basePremium:128000, modFactor:0.94, scheduleCredit:0.05, slaTax:4608, stampingFee:1920, policyNumber:'POL-2026-010', issueDate:'2026-01-20', createdDate:'2025-12-01', approvedDate:'2025-12-15' },
  { id:'QTE-2026-011', insuredName:'Gulf Coast Marine', fein:'72-3849165', lob:'Workers Compensation', status:'ACTIVE', effective:'2026-03-15', expiration:'2027-03-15', premium:243800, uw:'Vikram Patel', agent:'Gallagher', mga:'Energy Risk Services', term:'Annual', billingPlan:'Monthly', paymentMethod:'ACH', coverage:'WC', deductible:25000, limit:1000000, ratingBasis:'Payroll $28.5M', basePremium:205000, modFactor:1.08, scheduleCredit:0.02, slaTax:7380, stampingFee:3075, policyNumber:'POL-2026-011', issueDate:'2026-03-01', createdDate:'2026-01-15', approvedDate:'2026-02-01' },
  { id:'QTE-2026-012', insuredName:'Empire State Realty', fein:'41-8273651', lob:'Property', status:'CANCELLED', effective:'2025-10-01', expiration:'2026-10-01', premium:78500, uw:'Neha Gupta', agent:'Lockton', mga:'Coastal MGA Solutions', term:'Annual', billingPlan:'Annual', paymentMethod:'Wire', coverage:'Property', deductible:25000, limit:3000000, ratingBasis:'TIV $9.2M', basePremium:68000, modFactor:1.0, scheduleCredit:0.06, slaTax:2448, stampingFee:1020, policyNumber:'POL-2026-012', issueDate:'2025-09-15', createdDate:'2025-07-20', approvedDate:'2025-08-01' }
];

// TRANSACTIONS — Lifecycle event log for each quote
// Owned By: Policy Administration (append-only)
const TRANSACTIONS = [
  { id:'TXN-001', transactionNo:'TXN-2026-0001', quoteId:'QTE-2026-001', type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ISSUED-001', eventStatus:'PUBLISHED', effectiveDate:'2026-01-01', requestedBy:'System', approvedBy:'System', processedAt:'2026-01-01T00:00:00Z', correlationId:'CORR-001', apiRequest:null, apiResponse:null, summary:'Policy POL-2026-001 issued for ABC Construction Inc.', createdAt:'2026-01-01' },
  { id:'TXN-002', transactionNo:'TXN-2026-0002', quoteId:'QTE-2026-003', type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ISSUED-002', eventStatus:'PUBLISHED', effectiveDate:'2025-08-10', requestedBy:'System', approvedBy:'System', processedAt:'2025-08-10T00:00:00Z', correlationId:'CORR-002', apiRequest:null, apiResponse:null, summary:'Policy POL-2026-003 issued for Horizon Logistics LLC', createdAt:'2025-08-10' },
  { id:'TXN-003', transactionNo:'TXN-2026-0003', quoteId:'QTE-2026-004', type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ISSUED-003', eventStatus:'PUBLISHED', effectiveDate:'2025-08-18', requestedBy:'System', approvedBy:'System', processedAt:'2025-08-18T00:00:00Z', correlationId:'CORR-003', apiRequest:null, apiResponse:null, summary:'Policy POL-2026-004 issued for Coastal Properties Group', createdAt:'2025-08-18' },
  { id:'TXN-004', transactionNo:'TXN-2026-0004', quoteId:'QTE-2026-004', type:'ENDORSEMENT', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ENDORSED-001', eventStatus:'PUBLISHED', effectiveDate:'2026-03-15', requestedBy:'Neha Gupta', approvedBy:'System', processedAt:'2026-03-15T00:00:00Z', correlationId:'CORR-004', apiRequest:null, apiResponse:null, summary:'Endorsement — Limit Increase to $6M for Coastal Properties Group', createdAt:'2026-03-15' },
  { id:'TXN-005', transactionNo:'TXN-2026-0005', quoteId:'QTE-2026-005', type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ISSUED-004', eventStatus:'PUBLISHED', effectiveDate:'2025-04-01', requestedBy:'System', approvedBy:'System', processedAt:'2025-04-01T00:00:00Z', correlationId:'CORR-005', apiRequest:null, apiResponse:null, summary:'Policy POL-2026-005 issued for Pioneer Energy Corp.', createdAt:'2025-04-01' },
  { id:'TXN-006', transactionNo:'TXN-2026-0006', quoteId:'QTE-2026-005', type:'CANCELLATION', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-CANCELLED-001', eventStatus:'PUBLISHED', effectiveDate:'2025-12-15', requestedBy:'Vikram Patel', approvedBy:'System', processedAt:'2025-12-15T00:00:00Z', correlationId:'CORR-006', apiRequest:null, apiResponse:null, summary:'Cancellation — Non-Payment for Pioneer Energy Corp.', createdAt:'2025-12-15' },
  { id:'TXN-007', transactionNo:'TXN-2026-0007', quoteId:'QTE-2026-006', type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ISSUED-005', eventStatus:'PUBLISHED', effectiveDate:'2025-01-01', requestedBy:'System', approvedBy:'System', processedAt:'2025-01-01T00:00:00Z', correlationId:'CORR-007', apiRequest:null, apiResponse:null, summary:'Policy POL-2026-006 issued for First National Retail (Term 1)', createdAt:'2025-01-01' },
  { id:'TXN-008', transactionNo:'TXN-2026-0008', quoteId:'QTE-2026-006', type:'RENEWAL', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-RENEWED-001', eventStatus:'PUBLISHED', effectiveDate:'2026-01-01', requestedBy:'Akhilesh-Salman-Policy', approvedBy:'System', processedAt:'2026-01-01T00:00:00Z', correlationId:'CORR-008', apiRequest:null, apiResponse:null, summary:'Renewal — Term 2 for First National Retail, Premium $94,800', createdAt:'2026-01-01' },
  { id:'TXN-009', transactionNo:'TXN-2026-0009', quoteId:'QTE-2026-007', type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ISSUED-006', eventStatus:'PUBLISHED', effectiveDate:'2026-03-01', requestedBy:'System', approvedBy:'System', processedAt:'2026-03-01T00:00:00Z', correlationId:'CORR-009', apiRequest:null, apiResponse:null, summary:'Policy POL-2026-007 issued for Sunrise Healthcare LLC', createdAt:'2026-03-01' },
  { id:'TXN-010', transactionNo:'TXN-2026-0010', quoteId:'QTE-2026-008', type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ISSUED-007', eventStatus:'PUBLISHED', effectiveDate:'2025-09-20', requestedBy:'System', approvedBy:'System', processedAt:'2025-09-20T00:00:00Z', correlationId:'CORR-010', apiRequest:null, apiResponse:null, summary:'Policy POL-2026-008 issued for Great Lakes Transport', createdAt:'2025-09-20' },
  { id:'TXN-011', transactionNo:'TXN-2026-0011', quoteId:'QTE-2026-006', type:'ENDORSEMENT', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ENDORSED-002', eventStatus:'PUBLISHED', effectiveDate:'2026-06-01', requestedBy:'Marsh Inc.', approvedBy:'System', processedAt:'2026-06-01T00:00:00Z', correlationId:'CORR-011', apiRequest:null, apiResponse:null, summary:'Endorsement — Coverage addition for Term 2, First National Retail', createdAt:'2026-06-01' },
  { id:'TXN-012', transactionNo:'TXN-2026-0012', quoteId:'QTE-2026-004', type:'REINSTATEMENT', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-REINSTATED-001', eventStatus:'PUBLISHED', effectiveDate:'2026-07-15', requestedBy:'Akhilesh-Salman-Policy', approvedBy:'System', processedAt:'2026-07-15T00:00:00Z', correlationId:'CORR-012', apiRequest:null, apiResponse:null, summary:'Reinstatement after cancellation — Coastal Properties Group', createdAt:'2026-07-15' },
  { id:'TXN-013', transactionNo:'TXN-2026-0013', quoteId:'QTE-2026-010', type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ISSUED-008', eventStatus:'PUBLISHED', effectiveDate:'2026-02-01', requestedBy:'System', approvedBy:'System', processedAt:'2026-02-01T00:00:00Z', correlationId:'CORR-013', apiRequest:null, apiResponse:null, summary:'Policy POL-2026-010 issued for Southwest Retail Group', createdAt:'2026-02-01' },
  { id:'TXN-014', transactionNo:'TXN-2026-0014', quoteId:'QTE-2026-010', type:'ENDORSEMENT', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ENDORSED-003', eventStatus:'PUBLISHED', effectiveDate:'2026-05-15', requestedBy:'Aon', approvedBy:'System', processedAt:'2026-05-15T00:00:00Z', correlationId:'CORR-014', apiRequest:null, apiResponse:null, summary:'Endorsement — Additional insured added, Southwest Retail Group', createdAt:'2026-05-15' },
  { id:'TXN-015', transactionNo:'TXN-2026-0015', quoteId:'QTE-2026-011', type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ISSUED-009', eventStatus:'PUBLISHED', effectiveDate:'2026-03-15', requestedBy:'System', approvedBy:'System', processedAt:'2026-03-15T00:00:00Z', correlationId:'CORR-015', apiRequest:null, apiResponse:null, summary:'Policy POL-2026-011 issued for Gulf Coast Marine', createdAt:'2026-03-15' },
  { id:'TXN-016', transactionNo:'TXN-2026-0016', quoteId:'QTE-2026-012', type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ISSUED-010', eventStatus:'PUBLISHED', effectiveDate:'2025-10-01', requestedBy:'System', approvedBy:'System', processedAt:'2025-10-01T00:00:00Z', correlationId:'CORR-016', apiRequest:null, apiResponse:null, summary:'Policy POL-2026-012 issued for Empire State Realty', createdAt:'2025-10-01' },
  { id:'TXN-017', transactionNo:'TXN-2026-0017', quoteId:'QTE-2026-012', type:'CANCELLATION', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-CANCELLED-002', eventStatus:'PUBLISHED', effectiveDate:'2026-06-15', requestedBy:'Neha Gupta', approvedBy:'System', processedAt:'2026-06-15T00:00:00Z', correlationId:'CORR-017', apiRequest:null, apiResponse:null, summary:'Cancellation — Non-Renewal, Empire State Realty', createdAt:'2026-06-15' },
  { id:'TXN-018', transactionNo:'TXN-2026-0018', quoteId:'QTE-2026-001', type:'ENDORSEMENT', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-ENDORSED-004', eventStatus:'PUBLISHED', effectiveDate:'2026-08-15', requestedBy:'Marsh Inc.', approvedBy:'System', processedAt:'2026-08-15T00:00:00Z', correlationId:'CORR-018', apiRequest:null, apiResponse:null, summary:'Endorsement — Limit increase via REQ-002 for ABC Construction Inc.', createdAt:'2026-08-15' }
];

// NOTICES — Notice/Offer workflow for Renewal, Cancellation, Reinstatement
// Owned By: Policy Administration
// Status: DRAFT → GENERATED → SENT → ACKNOWLEDGED → DELIVERED → ACCEPTED/REJECTED/EXPIRED → EXECUTED
const NOTICES = [
  { id:'NTC-001', quoteId:'QTE-2026-003', policyNumber:'POL-2026-003', type:'RENEWAL_OFFER', status:'DRAFT', generatedDate:null, sentDate:null, acknowledgedDate:null, deliveredDate:null, decisionDate:null, decision:null, premium:210000, coverage:'Auto', createdDate:'2026-07-28' },
  { id:'NTC-002', quoteId:'QTE-2026-005', policyNumber:'POL-2026-005', type:'CANCELLATION_NOTICE', status:'EXECUTED', generatedDate:'2025-12-01', sentDate:'2025-12-01', acknowledgedDate:'2025-12-05', deliveredDate:'2025-12-08', decisionDate:'2025-12-10', decision:'ACCEPTED', premium:189000, coverage:'WC', createdDate:'2025-12-01' },
  { id:'NTC-003', quoteId:'QTE-2026-008', policyNumber:'POL-2026-008', type:'RENEWAL_OFFER', status:'SENT', generatedDate:'2026-07-15', sentDate:'2026-07-20', acknowledgedDate:null, deliveredDate:null, decisionDate:null, decision:null, premium:185000, coverage:'Auto', createdDate:'2026-07-15' },
  { id:'NTC-004', quoteId:'QTE-2026-009', type:'RENEWAL_OFFER', status:'GENERATED', generatedDate:'2026-07-25', sentDate:null, acknowledgedDate:null, deliveredDate:null, decisionDate:null, decision:null, premium:87500, coverage:'GL', createdDate:'2026-07-25' },
  { id:'NTC-005', quoteId:'QTE-2026-006', policyNumber:'POL-2026-006', type:'RENEWAL_OFFER', status:'DELIVERED', generatedDate:'2026-07-22', sentDate:'2026-07-24', acknowledgedDate:'2026-07-26', deliveredDate:'2026-07-28', decisionDate:null, decision:null, premium:94800, coverage:'Package', createdDate:'2026-07-22' },
  { id:'NTC-006', quoteId:'QTE-2026-004', policyNumber:'POL-2026-004', type:'CANCELLATION_NOTICE', status:'EXECUTED', generatedDate:'2026-07-01', sentDate:'2026-07-02', acknowledgedDate:'2026-07-05', deliveredDate:'2026-07-08', decisionDate:'2026-07-10', decision:'ACCEPTED', premium:43200, coverage:'Property', createdDate:'2026-07-01' },
  { id:'NTC-007', quoteId:'QTE-2026-010', policyNumber:'POL-2026-010', type:'RENEWAL_OFFER', status:'ACKNOWLEDGED', generatedDate:'2026-07-25', sentDate:'2026-07-26', acknowledgedDate:'2026-07-28', deliveredDate:null, decisionDate:null, decision:null, premium:156200, coverage:'Package', createdDate:'2026-07-25' },
  { id:'NTC-008', quoteId:'QTE-2026-004', policyNumber:'POL-2026-004', type:'RENEWAL_OFFER', status:'DELIVERED', generatedDate:'2026-07-25', sentDate:'2026-07-26', acknowledgedDate:'2026-07-28', deliveredDate:'2026-07-30', decisionDate:null, decision:null, premium:43200, coverage:'Property', proposedValues:{ premium:46400, basePremium:41000, modFactor:1.0, scheduleCredit:0.06, effectiveDate:'2026-08-19', expirationDate:'2027-08-19' }, createdDate:'2026-07-25' }
];

// ENDORSEMENT_REQUESTS — Inbound endorsement requests from MGA API
// Owned By: MGA API (inbound) → PAS (processes)
// Status: RECEIVED → VALIDATED → ASSIGNED → IN_REVIEW → APPROVED/REJECTED → PROCESSED → COMPLETED
const ENDORSEMENT_REQUESTS = [
  { id:'REQ-001', quoteId:'QTE-2026-004', policyNumber:'POL-2026-004', requestType:'Address Change', status:'COMPLETED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8872', requestedBy:'Marsh Inc.', requestedDate:'2026-07-28', effectiveDate:'2026-08-01', priority:'High', assignedTo:'Akhilesh-Salman-Policy', reviewedBy:'Akhilesh-Salman-Policy', decision:'APPROVED', decisionReason:'Address verified and updated in system', processedDate:'2026-07-29', correlationId:'CORR-REQ-001', currentValues:{ address:'4500 Industrial Blvd, Atlanta, GA 30301' }, requestedValues:{ address:'5200 Commerce Pkwy, Atlanta, GA 30302' }, changedFields:['address'] },
  { id:'REQ-002', quoteId:'QTE-2026-001', policyNumber:'POL-2026-001', requestType:'Limit Change', status:'IN_REVIEW', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8875', requestedBy:'Marsh Inc.', requestedDate:'2026-07-27', effectiveDate:'2026-08-15', priority:'Medium', assignedTo:'Akhilesh-Salman-Policy', reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-002', currentValues:{ limit:'$2,000,000', premium:'$125,000' }, requestedValues:{ limit:'$3,000,000', premium:'To be calculated' }, changedFields:['limit'] },
  { id:'REQ-003', quoteId:'QTE-2026-003', policyNumber:'POL-2026-003', requestType:'Additional Insured', status:'APPROVED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8860', requestedBy:'WTW', requestedDate:'2026-07-25', effectiveDate:'2026-08-01', priority:'Low', assignedTo:'Akhilesh-Salman-Policy', reviewedBy:'Akhilesh-Salman-Policy', decision:'APPROVED', decisionReason:'Approved per UW guidelines', processedDate:'2026-07-26', correlationId:'CORR-REQ-003', currentValues:{ additionalInsured:'None' }, requestedValues:{ additionalInsured:'ABC Properties LLC' }, changedFields:['additionalInsured'] },
  { id:'REQ-004', quoteId:'QTE-2026-006', policyNumber:'POL-2026-006', requestType:'Named Insured Change', status:'RECEIVED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8890', requestedBy:'Aon', requestedDate:'2026-07-29', effectiveDate:'2026-09-01', priority:'Critical', assignedTo:null, reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-004', currentValues:{ namedInsured:'First National Retail' }, requestedValues:{ namedInsured:'First National Retail dba FNR Holdings' }, changedFields:['namedInsured'] },
  { id:'REQ-005', quoteId:'QTE-2026-008', policyNumber:'POL-2026-008', requestType:'Coverage Extension', status:'RECEIVED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8893', requestedBy:'Gallagher', requestedDate:'2026-07-29', effectiveDate:'2026-09-01', priority:'High', assignedTo:null, reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-005', currentValues:{ coverageTerritory:'48 Contiguous US States' }, requestedValues:{ coverageTerritory:'48 Contiguous US States + Canada' }, changedFields:['coverageTerritory'] },
  { id:'REQ-006', quoteId:'QTE-2026-001', policyNumber:'POL-2026-001', requestType:'Deductible Change', status:'VALIDATED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8881', requestedBy:'Marsh Inc.', requestedDate:'2026-07-26', effectiveDate:'2026-09-01', priority:'Medium', assignedTo:'Vikram Patel', reviewedBy:'Vikram Patel', decision:'VALIDATED', decisionReason:'Deductible change within UW authority', processedDate:'2026-07-27', correlationId:'CORR-REQ-006', currentValues:{ deductible:'$10,000' }, requestedValues:{ deductible:'$25,000' }, changedFields:['deductible'] },
  { id:'REQ-007', quoteId:'QTE-2026-003', policyNumber:'POL-2026-003', requestType:'Policy Cancellation', status:'REJECTED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8855', requestedBy:'Horizon Logistics', requestedDate:'2026-07-24', effectiveDate:'2026-08-01', priority:'High', assignedTo:'Akhilesh-Salman-Policy', reviewedBy:'Akhilesh-Salman-Policy', decision:'REJECTED', decisionReason:'Cancellation request denied — policy within binding period', processedDate:'2026-07-25', correlationId:'CORR-REQ-007', currentValues:{ cancellationReason:'Insured request — switching carriers' }, requestedValues:{ cancellationDate:'2026-08-01' }, changedFields:['cancellationDate'] },
  { id:'REQ-008', quoteId:'QTE-2026-004', policyNumber:'POL-2026-004', requestType:'Premium Adjustment', status:'PROCESSED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8848', requestedBy:'WTW', requestedDate:'2026-07-23', effectiveDate:'2026-08-01', priority:'Low', assignedTo:'Neha Gupta', reviewedBy:'Neha Gupta', decision:'APPROVED', decisionReason:'Audit adjustment per MGA rate filing', processedDate:'2026-07-28', correlationId:'CORR-REQ-008', currentValues:{ annualPremium:'$43,200' }, requestedValues:{ annualPremium:'$45,360' }, changedFields:['annualPremium'] },
  { id:'REQ-009', quoteId:'QTE-2026-006', policyNumber:'POL-2026-006', requestType:'Address Change', status:'COMPLETED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8842', requestedBy:'Lockton', requestedDate:'2026-07-22', effectiveDate:'2026-07-22', priority:'Low', assignedTo:'Akhilesh-Salman-Policy', reviewedBy:'Akhilesh-Salman-Policy', decision:'APPROVED', decisionReason:'Address change verified — no coverage impact', processedDate:'2026-07-23', correlationId:'CORR-REQ-009', currentValues:{ address:'100 Main Street, Chicago, IL 60601' }, requestedValues:{ address:'200 Michigan Ave, Chicago, IL 60602' }, changedFields:['address'] },
  { id:'REQ-010', quoteId:'QTE-2026-008', policyNumber:'POL-2026-008', requestType:'Limit Increase', status:'IN_REVIEW', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8835', requestedBy:'Aon', requestedDate:'2026-07-21', effectiveDate:'2026-09-01', priority:'High', assignedTo:'Akhilesh-Salman-Policy', reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-010', currentValues:{ limit:'$2,000,000', premium:'$185,000' }, requestedValues:{ limit:'$3,000,000', premium:'To be calculated' }, changedFields:['limit'] },
  { id:'REQ-011', quoteId:'QTE-2026-001', policyNumber:'POL-2026-001', requestType:'Additional Interest', status:'ASSIGNED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8829', requestedBy:'Gallagher', requestedDate:'2026-07-20', effectiveDate:'2026-08-15', priority:'Medium', assignedTo:'Vikram Patel', reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-011', currentValues:{ additionalInterest:'None' }, requestedValues:{ additionalInterest:'First National Bank — Lienholder' }, changedFields:['additionalInterest'] },
  { id:'REQ-012', quoteId:'QTE-2026-003', policyNumber:'POL-2026-003', requestType:'Waiver of Subrogation', status:'VALIDATED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8822', requestedBy:'Lockton', requestedDate:'2026-07-19', effectiveDate:'2026-08-01', priority:'Low', assignedTo:'Neha Gupta', reviewedBy:'Neha Gupta', decision:'VALIDATED', decisionReason:'Subrogation waiver reviewed — acceptable risk', processedDate:'2026-07-20', correlationId:'CORR-REQ-012', currentValues:{ subrogationWaiver:'None' }, requestedValues:{ subrogationWaiver:'General Contractors — All Projects' }, changedFields:['subrogationWaiver'] },
  { id:'REQ-013', quoteId:'QTE-2026-004', policyNumber:'POL-2026-004', requestType:'Territory Extension', status:'RECEIVED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8897', requestedBy:'Marsh Inc.', requestedDate:'2026-07-30', effectiveDate:'2026-09-01', priority:'Critical', assignedTo:null, reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-013', currentValues:{ territory:'Southeastern US' }, requestedValues:{ territory:'Continental US + Puerto Rico' }, changedFields:['territory'] },
  { id:'REQ-014', quoteId:'QTE-2026-006', policyNumber:'POL-2026-006', requestType:'Named Insured Change', status:'PROCESSED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8815', requestedBy:'WTW', requestedDate:'2026-07-18', effectiveDate:'2026-08-01', priority:'Medium', assignedTo:'Akhilesh-Salman-Policy', reviewedBy:'Akhilesh-Salman-Policy', decision:'APPROVED', decisionReason:'Name change due to corporate restructuring', processedDate:'2026-07-24', correlationId:'CORR-REQ-014', currentValues:{ namedInsured:'First National Retail' }, requestedValues:{ namedInsured:'FNR Holding Corp.' }, changedFields:['namedInsured'] },
  { id:'REQ-015', quoteId:'QTE-2026-008', policyNumber:'POL-2026-008', requestType:'Coverage Reduction', status:'COMPLETED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8808', requestedBy:'Aon', requestedDate:'2026-07-17', effectiveDate:'2026-08-01', priority:'Low', assignedTo:'Vikram Patel', reviewedBy:'Vikram Patel', decision:'APPROVED', decisionReason:'Fleet reduced from 38 to 25 — coverage adjustment applied', processedDate:'2026-07-21', correlationId:'CORR-REQ-015', currentValues:{ coverageLimit:'$2,000,000', powerUnits:'38' }, requestedValues:{ coverageLimit:'$1,500,000', powerUnits:'25' }, changedFields:['coverageLimit','powerUnits'] },
  { id:'REQ-016', quoteId:'QTE-2026-001', policyNumber:'POL-2026-001', requestType:'Policy Reinstatement', status:'RECEIVED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8900', requestedBy:'ABC Construction Inc.', requestedDate:'2026-07-30', effectiveDate:'2026-08-01', priority:'High', assignedTo:null, reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-016', currentValues:{ policyStatus:'Cancelled', cancellationDate:'2026-07-15' }, requestedValues:{ reinstatementDate:'2026-08-01', reason:'Payment received in full' }, changedFields:['reinstatementDate'] },
  { id:'REQ-017', quoteId:'QTE-2026-007', policyNumber:'POL-2026-007', requestType:'Coverage Change', status:'RECEIVED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8903', requestedBy:'Aon', requestedDate:'2026-07-30', effectiveDate:'2026-09-01', priority:'High', assignedTo:null, reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-017', currentValues:{ coverage:'Med Mal', limit:'$5,000,000' }, requestedValues:{ coverage:'Med Mal + Umbrella', limit:'$7,000,000' }, changedFields:['coverage','limit'] },
  { id:'REQ-018', quoteId:'QTE-2026-004', policyNumber:'POL-2026-004', requestType:'Limit Increase', status:'IN_REVIEW', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8905', requestedBy:'Lockton', requestedDate:'2026-07-29', effectiveDate:'2026-09-01', priority:'Medium', assignedTo:'Neha Gupta', reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-018', currentValues:{ limit:'$5,000,000', premium:'$43,200' }, requestedValues:{ limit:'$7,500,000', premium:'$58,320' }, changedFields:['limit','premium'] },
  { id:'REQ-019', quoteId:'QTE-2026-011', policyNumber:'POL-2026-011', requestType:'Premium Adjustment', status:'VALIDATED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8907', requestedBy:'Gallagher', requestedDate:'2026-07-28', effectiveDate:'2026-08-01', priority:'Low', assignedTo:'Vikram Patel', reviewedBy:'Vikram Patel', decision:'VALIDATED', decisionReason:'Payroll audit completed — adjustment applies', processedDate:'2026-07-29', correlationId:'CORR-REQ-019', currentValues:{ annualPremium:'$243,800', payroll:'$28.5M' }, requestedValues:{ annualPremium:'$261,200', payroll:'$31.2M' }, changedFields:['annualPremium','payroll'] },
  { id:'REQ-020', quoteId:'QTE-2026-010', policyNumber:'POL-2026-010', requestType:'Named Insured Change', status:'ASSIGNED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8910', requestedBy:'Marsh Inc.', requestedDate:'2026-07-27', effectiveDate:'2026-09-01', priority:'Medium', assignedTo:'Akhilesh-Salman-Policy', reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-020', currentValues:{ namedInsured:'Southwest Retail Group' }, requestedValues:{ namedInsured:'Southwest Retail Group dba SW Retail Holdings' }, changedFields:['namedInsured'] },
  { id:'REQ-021', quoteId:'QTE-2026-003', policyNumber:'POL-2026-003', requestType:'Vehicle Addition', status:'RECEIVED', sourceSystem:'MGA API', sourceReference:'MGA-REQ-8912', requestedBy:'Horizon Logistics', requestedDate:'2026-07-31', effectiveDate:'2026-08-15', priority:'Low', assignedTo:null, reviewedBy:null, decision:null, decisionReason:null, processedDate:null, correlationId:'CORR-REQ-021', currentValues:{ powerUnits:'45', premium:'$210,000' }, requestedValues:{ powerUnits:'52', premium:'To be calculated' }, changedFields:['powerUnits','premium'] }
];

// BILLING_SCHEDULES — Reference data from Billing Service (PAS displays only)
// Owned By: Billing Service (PAS consumes via reference)
const BILLING_SCHEDULES = {
  'QTE-2026-001': [
    { inst:1, dueDate:'2026-01-01', amountDue:31250, amountPaid:31250, status:'Paid', paidDate:'2026-01-01' },
    { inst:2, dueDate:'2026-04-01', amountDue:31250, amountPaid:31250, status:'Paid', paidDate:'2026-04-01' },
    { inst:3, dueDate:'2026-07-01', amountDue:31250, amountPaid:0, status:'Overdue', paidDate:null },
    { inst:4, dueDate:'2026-10-01', amountDue:31250, amountPaid:0, status:'Upcoming', paidDate:null }
  ],
  'QTE-2026-003': [
    { inst:1, dueDate:'2025-08-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2025-08-10' },
    { inst:2, dueDate:'2025-09-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2025-09-10' },
    { inst:3, dueDate:'2025-10-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2025-10-10' },
    { inst:4, dueDate:'2025-11-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2025-11-12' },
    { inst:5, dueDate:'2025-12-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2025-12-10' },
    { inst:6, dueDate:'2026-01-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2026-01-10' },
    { inst:7, dueDate:'2026-02-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2026-02-10' },
    { inst:8, dueDate:'2026-03-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2026-03-10' },
    { inst:9, dueDate:'2026-04-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2026-04-10' },
    { inst:10, dueDate:'2026-05-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2026-05-10' },
    { inst:11, dueDate:'2026-06-10', amountDue:17500, amountPaid:17500, status:'Paid', paidDate:'2026-06-10' },
    { inst:12, dueDate:'2026-07-10', amountDue:17500, amountPaid:0, status:'Upcoming', paidDate:null }
  ],
  'QTE-2026-008': [
    { inst:1, dueDate:'2025-09-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2025-09-20' },
    { inst:2, dueDate:'2025-10-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2025-10-20' },
    { inst:3, dueDate:'2025-11-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2025-11-20' },
    { inst:4, dueDate:'2025-12-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2025-12-20' },
    { inst:5, dueDate:'2026-01-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2026-01-20' },
    { inst:6, dueDate:'2026-02-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2026-02-20' },
    { inst:7, dueDate:'2026-03-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2026-03-20' },
    { inst:8, dueDate:'2026-04-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2026-04-20' },
    { inst:9, dueDate:'2026-05-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2026-05-20' },
    { inst:10, dueDate:'2026-06-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2026-06-20' },
    { inst:11, dueDate:'2026-07-20', amountDue:15417, amountPaid:15417, status:'Paid', paidDate:'2026-07-20' },
    { inst:12, dueDate:'2026-08-20', amountDue:15417, amountPaid:0, status:'Upcoming', paidDate:null }
  ],
  'QTE-2026-010': [
    { inst:1, dueDate:'2026-02-01', amountDue:39050, amountPaid:39050, status:'Paid', paidDate:'2026-02-01' },
    { inst:2, dueDate:'2026-05-01', amountDue:39050, amountPaid:39050, status:'Paid', paidDate:'2026-05-01' },
    { inst:3, dueDate:'2026-08-01', amountDue:39050, amountPaid:0, status:'Upcoming', paidDate:null },
    { inst:4, dueDate:'2026-11-01', amountDue:39050, amountPaid:0, status:'Upcoming', paidDate:null }
  ],
  'QTE-2026-011': [
    { inst:1, dueDate:'2026-03-15', amountDue:20317, amountPaid:20317, status:'Paid', paidDate:'2026-03-15' },
    { inst:2, dueDate:'2026-04-15', amountDue:20317, amountPaid:20317, status:'Paid', paidDate:'2026-04-15' },
    { inst:3, dueDate:'2026-05-15', amountDue:20317, amountPaid:20317, status:'Paid', paidDate:'2026-05-15' },
    { inst:4, dueDate:'2026-06-15', amountDue:20317, amountPaid:20317, status:'Paid', paidDate:'2026-06-15' },
    { inst:5, dueDate:'2026-07-15', amountDue:20317, amountPaid:20317, status:'Paid', paidDate:'2026-07-15' },
    { inst:6, dueDate:'2026-08-15', amountDue:20317, amountPaid:0, status:'Upcoming', paidDate:null },
    { inst:7, dueDate:'2026-09-15', amountDue:20317, amountPaid:0, status:'Upcoming', paidDate:null },
    { inst:8, dueDate:'2026-10-15', amountDue:20317, amountPaid:0, status:'Upcoming', paidDate:null },
    { inst:9, dueDate:'2026-11-15', amountDue:20317, amountPaid:0, status:'Upcoming', paidDate:null },
    { inst:10, dueDate:'2026-12-15', amountDue:20317, amountPaid:0, status:'Upcoming', paidDate:null },
    { inst:11, dueDate:'2027-01-15', amountDue:20317, amountPaid:0, status:'Upcoming', paidDate:null },
    { inst:12, dueDate:'2027-02-15', amountDue:20316, amountPaid:0, status:'Upcoming', paidDate:null }
  ],
  'QTE-2026-012': [
    { inst:1, dueDate:'2025-10-01', amountDue:78500, amountPaid:78500, status:'Paid', paidDate:'2025-10-01' }
  ]
};

const ACTIVITIES = [
  { timestamp:'2026-07-28 09:15 AM', user:'Akhilesh-Salman-Policy', action:'Approved', module:'Quote', entity:'QTE-2026-009', details:'Quote approved for Blue Ridge Manufacturing' },
  { timestamp:'2026-07-28 08:45 AM', user:'Vikram Patel', action:'Issued', module:'Policy', entity:'QTE-2026-006', details:'Renewal executed for First National Retail' },
  { timestamp:'2026-07-27 04:30 PM', user:'Neha Gupta', action:'Endorsed', module:'Policy', entity:'QTE-2026-004', details:'Endorsement completed — Limit Increase to $6M' },
  { timestamp:'2026-07-27 02:00 PM', user:'Akhilesh-Salman-Policy', action:'Uploaded', module:'Document', entity:'QTE-2026-001', details:'Uploaded: Signed Application Form' },
  { timestamp:'2026-07-26 11:20 AM', user:'Neha Gupta', action:'Sent', module:'Notice', entity:'NTC-003', details:'Renewal offer sent to MGA for Great Lakes Transport' },
  { timestamp:'2026-07-26 10:00 AM', user:'Vikram Patel', action:'Generated', module:'Notice', entity:'NTC-004', details:'Renewal offer generated for Blue Ridge Manufacturing' },
  { timestamp:'2026-07-25 03:15 PM', user:'Akhilesh-Salman-Policy', action:'Issued', module:'Policy', entity:'QTE-2026-003', details:'Quote approved and ready for issue' },
  { timestamp:'2026-07-25 01:00 PM', user:'System', action:'Payment', module:'Billing', entity:'QTE-2026-003', details:'Payment received — Installment 11 for Horizon Logistics' },
  { timestamp:'2026-07-24 04:00 PM', user:'Neha Gupta', action:'Created', module:'Quote', entity:'QTE-2026-009', details:'New quote for Blue Ridge Manufacturing' },
  { timestamp:'2026-07-24 10:30 AM', user:'Akhilesh-Salman-Policy', action:'Updated', module:'Note', entity:'QTE-2026-001', details:'Added UW note: Risk inspection completed' }
];

const AUDIT_LOGS = [
  { timestamp:'2026-07-28 09:15:00', user:'Akhilesh-Salman-Policy', entity:'Quote', entityId:'QTE-2026-009', field:'Status', oldValue:'PENDING', newValue:'APPROVED', ip:'10.0.1.45' },
  { timestamp:'2026-07-28 08:45:00', user:'Vikram Patel', entity:'Quote', entityId:'QTE-2026-006', field:'Status', oldValue:'ACTIVE', newValue:'ACTIVE', ip:'10.0.1.32' },
  { timestamp:'2026-07-27 16:30:00', user:'Neha Gupta', entity:'Quote', entityId:'QTE-2026-004', field:'Coverage Limit', oldValue:'$5,000,000', newValue:'$6,000,000', ip:'10.0.1.28' },
  { timestamp:'2026-07-27 16:30:00', user:'Neha Gupta', entity:'Quote', entityId:'QTE-2026-004', field:'Premium', oldValue:'$43,200', newValue:'$51,840', ip:'10.0.1.28' },
  { timestamp:'2026-07-27 14:00:00', user:'Akhilesh-Salman-Policy', entity:'Document', entityId:'DOC-008', field:'Status', oldValue:'Draft', newValue:'Final', ip:'10.0.1.45' },
  { timestamp:'2026-07-26 11:20:00', user:'Neha Gupta', entity:'Notice', entityId:'NTC-003', field:'Status', oldValue:'GENERATED', newValue:'SENT', ip:'10.0.1.28' },
  { timestamp:'2026-07-25 15:15:00', user:'Akhilesh-Salman-Policy', entity:'Quote', entityId:'QTE-2026-003', field:'Premium', oldValue:'$0', newValue:'$210,000', ip:'10.0.1.45' },
  { timestamp:'2026-07-25 13:00:00', user:'System', entity:'Billing', entityId:'QTE-2026-003', field:'Installment 11 Status', oldValue:'Pending', newValue:'Paid', ip:'10.0.1.1' },
  { timestamp:'2026-07-24 16:00:00', user:'Neha Gupta', entity:'Quote', entityId:'QTE-2026-009', field:'Status', oldValue:null, newValue:'APPROVED', ip:'10.0.1.28' },
  { timestamp:'2026-07-24 10:30:00', user:'Akhilesh-Salman-Policy', entity:'Note', entityId:'QTE-2026-001', field:'Content', oldValue:null, newValue:'Risk inspection completed. No issues found.', ip:'10.0.1.45' }
];

const DOCUMENTS = [
  { id:'DOC-001', name:'Signed Application Form', type:'Application', quoteId:'QTE-2026-001', uploadedBy:'Akhilesh-Salman-Policy', date:'2026-07-27', status:'Final', contentType:'form', content:
`INSURED: ABC Construction Inc.
POLICY NO: POL-2026-001
COVERAGE: General Liability
LIMIT: $2,000,000 per occurrence
DEDUCTIBLE: $10,000
PREMIUM: $125,000
SIGNED: Yes — Ramesh Patel (Director)
DATE SIGNED: 2026-01-01` },
  { id:'DOC-002', name:'Loss Runs Report', type:'Application', quoteId:'QTE-2026-003', uploadedBy:'Vikram Patel', date:'2025-09-10', status:'Final', contentType:'text', content:
`LOSS RUNS REPORT — QTE-2026-003 (Blue Ridge Manufacturing)
Generated: 2025-09-10

Year    Claims    Amount Paid    Reserve
2023    1         $12,500        $0
2024    2         $8,200         $3,500
2025    0         $0             $0

Experience Mod: 0.92 (favorable)
Loss Ratio: 38.5% — below threshold` },
  { id:'DOC-003', name:'Policy Document — GL Coverage Form', type:'Policy Forms', quoteId:'QTE-2026-001', uploadedBy:'System', date:'2026-01-01', status:'Final', contentType:'form', content:
`POLICY NUMBER: POL-2026-001
INSURED: ABC Construction Inc.
COVERAGE: General Liability
FORM: CG 00 01 12 19 (Commercial General Liability Coverage Form)

LIMITS:
  Each Occurrence: $2,000,000
  General Aggregate: $4,000,000
  Products/Completed Ops: $4,000,000
  Personal/Advertising Injury: $1,000,000
  Damage to Premises: $500,000

DEDUCTIBLE: $10,000 per occurrence
POLICY PERIOD: 2026-01-01 to 2026-12-31` },
  { id:'DOC-004', name:'Endorsement Form — Limit Increase', type:'Endorsements', quoteId:'QTE-2026-004', uploadedBy:'Neha Gupta', date:'2026-03-15', status:'Final', contentType:'form', content:
`ENDORSEMENT: Limit Increase
POLICY: QTE-2026-004 (Coastal Properties LLC)
EFFECTIVE DATE: 2026-03-15

CHANGE:
  GL Aggregate Limit: $2,000,000 → $3,000,000
  Additional Premium: +$8,500

ENDORSEMENT NO: END-2026-001
VERSION: 2 (updated)
STATUS: Bound` },
  { id:'DOC-005', name:'Renewal Quote Summary', type:'Correspondence', quoteId:'QTE-2026-006', uploadedBy:'Akhilesh-Salman-Policy', date:'2025-12-15', status:'Final', contentType:'text', content:
`RENEWAL QUOTE SUMMARY — QTE-2026-006 (Pinnacle Logistics)
Prepared for: Marsh Inc.
Date: 2025-12-15

CURRENT TERM: $432,700
PROPOSED RENEWAL: $455,000
CHANGE: +$22,300 (+5.2%)

COMPONENTS:
  Base Premium: $345,000 → $362,000 (+4.9%)
  Experience Mod: 0.95 → 0.93 (improved)
  Schedule Credit: -5% → -7% (better)
  Taxes/Fees: +$23,500 → +$24,800

UW NOTES: Loss history improved. Recommend approve.` },
  { id:'DOC-006', name:'Certificate of Insurance', type:'Policy Forms', quoteId:'QTE-2026-001', uploadedBy:'Akhilesh-Salman-Policy', date:'2026-02-10', status:'Final', contentType:'form', content:
`CERTIFICATE OF INSURANCE
POLICY: POL-2026-001
INSURED: ABC Construction Inc.

COVERAGES:
  GL: $2,000,000 each occ / $4,000,000 aggregate
  Auto: $1,000,000 each accident

CERTIFICATE HOLDER: ABC Properties LLC
ADDITIONAL INSURED: Yes (Endorsement attached)
CANCEL NOTICE: 30 days

ISSUED: 2026-02-10
EXPIRES: 2026-12-31` },
  { id:'DOC-007', name:'Cancellation Notice', type:'Correspondence', quoteId:'QTE-2026-005', uploadedBy:'Vikram Patel', date:'2025-12-15', status:'Final', contentType:'form', content:
`CANCELLATION NOTICE
POLICY: QTE-2026-005 (Pioneer Energy Services)
REASON: Non-payment of premium

TYPE: Pro-rata Cancellation
EFFECTIVE DATE: 2025-12-15

EARNED PREMIUM (7 months): $72,917
UNEARNED PREMIUM: $52,083 (refunded)
OUTSTANDING: $0 — balance cleared

NOTICE SENT TO: Insured + Broker` },
  { id:'DOC-008', name:'Underwriting Guidelines Checklist', type:'Application', quoteId:'QTE-2026-007', uploadedBy:'Neha Gupta', date:'2026-03-01', status:'Draft', contentType:'form', content:
`UW GUIDELINES CHECKLIST — QTE-2026-007 (Summit Holdings)
STATUS: Draft (incomplete)

[✅] Application completed
[✅] Loss runs obtained
[❌] Financial statements received (pending)
[✅] Credit check passed
[❌] Site inspection scheduled
[❌] Binding authority confirmed

UW NOTES: High revenue — needs senior UW review.` },
  { id:'DOC-009', name:'Claim Report — Incident CL-2026-112', type:'Claims', quoteId:'QTE-2026-003', uploadedBy:'Claims Dept', date:'2026-06-20', status:'Final', contentType:'text', content:
`CLAIM REPORT — CL-2026-112
POLICY: QTE-2026-003 (Blue Ridge Manufacturing)
DATE OF LOSS: 2026-06-15

TYPE: Workers Compensation — Employee Injury
DESCRIPTION: Employee slipped in warehouse. Fractured wrist.
MEDICAL: $4,200 (paid)
INDEMNITY: $1,800 (3 days lost time)

RESERVE: $15,000
STATUS: Open — Awaiting final medical report` },
  { id:'DOC-010', name:'Billing Statement — Q2 2026', type:'Correspondence', quoteId:'QTE-2026-003', uploadedBy:'System', date:'2026-07-01', status:'Final', contentType:'form', content:
`BILLING STATEMENT — Q2 2026
POLICY: QTE-2026-003 (Blue Ridge Manufacturing)
PLAN: Quarterly (4 installments)

INSTALLMENTS:
  #1 Due 01-Jan-2026: $108,175 — PAID
  #2 Due 01-Apr-2026: $108,175 — PAID
  #3 Due 01-Jul-2026: $108,175 — OVERDUE (15 days)
  #4 Due 01-Oct-2026: $108,175 — UPCOMING

TOTAL ANNUAL: $432,700
OUTSTANDING: $108,175 + Late fee` },
];

const NOTES = [
  { id:'NOTE-001', quoteId:'QTE-2026-001', author:'Akhilesh-Salman-Policy', role:'Senior Underwriter', category:'UW Note', content:'Risk inspection completed at 4500 Industrial Blvd. No major concerns. Building sprinkler system upgraded last year.', timestamp:'2026-07-24 10:30 AM' },
  { id:'NOTE-002', quoteId:'QTE-2026-001', author:'Vikram Patel', role:'Underwriter', category:'UW Note', content:'Reviewed financials for ABC Construction. Revenue consistent with prior year. Debt ratio within threshold. Recommend renewal.', timestamp:'2026-07-22 02:15 PM' },
  { id:'NOTE-003', quoteId:'QTE-2026-003', author:'Neha Gupta', role:'Billing Manager', category:'Billing Note', content:'Spoke with insured regarding late payment on Installment 4. They confirmed ACH issue resolved. Payment expected within 5 days.', timestamp:'2025-10-03 11:00 AM' },
  { id:'NOTE-004', quoteId:'QTE-2026-004', author:'Akhilesh-Salman-Policy', role:'Senior Underwriter', category:'UW Note', content:'Endorsement for limit increase approved. Additional premium of $8,640 applies pro-rata from 3/15/2026.', timestamp:'2026-03-15 04:30 PM' },
  { id:'NOTE-005', quoteId:'QTE-2026-005', author:'Vikram Patel', role:'Underwriter', category:'Claims Note', content:'Claim CL-2026-089 received for Pioneer Energy. WC claim — back injury. Set reserve at $45,000.', timestamp:'2026-02-18 09:30 AM' },
  { id:'NOTE-006', quoteId:'QTE-2026-006', author:'Akhilesh-Salman-Policy', role:'Senior Underwriter', category:'UW Note', content:'Renewal quoted at $94,800. Experience mod improved from 1.02 to 0.95 due to reduced loss ratio. Insured accepted.', timestamp:'2025-11-20 01:00 PM' },
  { id:'NOTE-007', quoteId:'QTE-2026-007', author:'Neha Gupta', role:'Underwriter', category:'General', content:'New submission for Sunrise Healthcare. Med Mal exposure assessed. Umbrella limit requested — need additional review.', timestamp:'2026-02-01 10:00 AM' }
];

const USERS = [
  { id:'USR-001', name:'Akhilesh-Salman-Policy', email:'policyadmin@gamil.com', role:'Senior Underwriter', department:'Underwriting', status:'Active', lastLogin:'2026-07-28 09:10 AM', mfa:true },
  { id:'USR-002', name:'Vikram Patel', email:'vikram@southlake.com', role:'Underwriter', department:'Underwriting', status:'Active', lastLogin:'2026-07-28 08:30 AM', mfa:true },
  { id:'USR-003', name:'Neha Gupta', email:'neha@southlake.com', role:'Billing Manager', department:'Billing', status:'Active', lastLogin:'2026-07-27 04:00 PM', mfa:false },
  { id:'USR-004', name:'Amit Singh', email:'amit@southlake.com', role:'System Admin', department:'IT', status:'Active', lastLogin:'2026-07-28 07:45 AM', mfa:true },
  { id:'USR-005', name:'Priya Mehta', email:'ppolicyadmin@gamil.com', role:'Claims Adjuster', department:'Claims', status:'Active', lastLogin:'2026-07-27 05:30 PM', mfa:false },
  { id:'USR-006', name:'Rahul Verma', email:'rahul@southlake.com', role:'Viewer', department:'Finance', status:'Inactive', lastLogin:'2026-06-15 02:00 PM', mfa:false }
];

const ROLES = [
  { name:'Super Admin', description:'Full system access — all modules and actions', userCount:1, permissions:['All'] },
  { name:'Senior Underwriter', description:'UW approval authority up to $500K, policy endorsements, renewals', userCount:1, permissions:['Policy:View,Edit,Approve','UW:Full','Billing:View','Reports:All'] },
  { name:'Underwriter', description:'New submissions, risk assessment, quote generation', userCount:1, permissions:['Policy:View,Edit','UW:Assess,Quote','Billing:View','Reports:View'] },
  { name:'Billing Manager', description:'Billing plans, payment processing, statements', userCount:1, permissions:['Policy:View','Billing:Full','Reports:Billing'] },
  { name:'Claims Adjuster', description:'Claims management, reserves, payments', userCount:1, permissions:['Policy:View','Claims:Full','Reports:Claims'] }
];

const SYSTEM_SETTINGS = [
  { key:'MAX_LOGIN_ATTEMPTS', value:'5', description:'Maximum failed login attempts before temporary lockout' },
  { key:'PASSWORD_MIN_LENGTH', value:'8', description:'Minimum characters required for user passwords' },
  { key:'SESSION_TIMEOUT', value:'60', description:'Session expiry in minutes of inactivity' },
  { key:'MFA_REQUIRED', value:'true', description:'Multi-factor authentication required for all users' },
  { key:'DEFAULT_BILLING_TERM', value:'Net 30', description:'Default payment term for new policies' },
  { key:'AUTO_RENEWAL_WINDOW', value:'60 days', description:'Days before expiration to auto-initiate renewal' },
  { key:'UW_APPROVAL_THRESHOLD', value:'$500,000', description:'Premium threshold requiring Senior UW approval' },
  { key:'MAX_INSTALLMENTS', value:'12', description:'Maximum number of billing installments allowed' },
  { key:'CANCELLATION_GRACE_DAYS', value:'10', description:'Days past due before cancellation triggers' },
  { key:'REINSTATEMENT_WINDOW', value:'30 days', description:'Days after cancellation during which reinstatement is allowed' }
];



// ---------- LOCALSTORAGE PERSISTENCE ----------
function saveData() {
  ['QUOTES','TRANSACTIONS','NOTICES','ENDORSEMENT_REQUESTS','BILLING_SCHEDULES','ACTIVITIES','AUDIT_LOGS','DOCUMENTS','NOTES','USERS','ROLES','SYSTEM_SETTINGS'].forEach(k => {
    localStorage.setItem('pas_' + k.toLowerCase(), JSON.stringify(eval(k)));
  });
}

function loadData() {
  const loadArr = (key, arr) => {
    const d = localStorage.getItem(key);
    if (d) { arr.length = 0; arr.push(...JSON.parse(d)); }
  };
  const loadObj = (key, obj) => {
    const d = localStorage.getItem(key);
    if (d) { Object.keys(obj).forEach(k => delete obj[k]); Object.assign(obj, JSON.parse(d)); }
  };
  loadArr('pas_quotes', QUOTES);
  loadArr('pas_transactions', TRANSACTIONS);
  loadArr('pas_notices', NOTICES);
  loadArr('pas_endorsement_requests', ENDORSEMENT_REQUESTS);
  loadObj('pas_billing_schedules', BILLING_SCHEDULES);
  loadArr('pas_activities', ACTIVITIES);
  loadArr('pas_audit_logs', AUDIT_LOGS);
  loadArr('pas_documents', DOCUMENTS);
  loadArr('pas_notes', NOTES);
  loadArr('pas_users', USERS);
  loadArr('pas_roles', ROLES);
  loadArr('pas_system_settings', SYSTEM_SETTINGS);
}

function resetData() {
  localStorage.removeItem('pas_data_reset');
  ['pas_quotes','pas_transactions','pas_notices','pas_endorsement_requests','pas_billing_schedules','pas_activities','pas_audit_logs','pas_documents','pas_notes','pas_users','pas_roles','pas_system_settings'].forEach(k => localStorage.removeItem(k));
  location.reload();
}

// ---------- INFRA ----------
const INFO_DATA = {
  'quote-id': { title:'Quote ID', what:'Unique identifier for each quote in the PAS system. Format: QTE-YYYY-NNN.', why:'Primary key for the master quote record. Used to track the quote through its entire lifecycle — approval, issue, endorsement, renewal, cancellation.', flow:'Generated when the quote is created in PAS. Remains constant throughout the quote lifecycle. Policy number is generated separately upon issue.' },
  'quote-status': { title:'Quote Status', what:'Current state of the quote in its lifecycle — APPROVED, ACTIVE, CANCELLED, EXPIRED.', why:'Determines what actions are available (Issue Policy, Endorse, Renew, Cancel, Reinstate) and controls system behavior.', flow:'APPROVED > Issue > ACTIVE > Endorsement/Renewal > ACTIVE. ACTIVE > Cancellation > CANCELLED. CANCELLED > Reinstatement > ACTIVE. ACTIVE > Expiration > EXPIRED.' },
  'policy-number': { title:'Policy Number', what:'Unique alphanumeric identifier assigned to every issued policy. Format: POL-YYYY-NNN.', why:'Used to track, reference, and retrieve a policy across all modules — billing, claims, endorsements, renewals, and compliance reporting.', flow:'Auto-generated when a quote is issued. Generated via POST /policy/issue API. Referenced on every transaction, document, and communication throughout the policy lifecycle.' },
  'policy-status': { title:'Policy Status', what:'Current state of the policy within the quote master record — ACTIVE, CANCELLED, EXPIRED.', why:'Determines what actions are available (endorse, renew, cancel) and controls system behavior like billing and coverage validation.', flow:'Changes through the quote lifecycle: APPROVED > Issue > ACTIVE > Endorsed/Renewed/Cancelled. Each transition is audited and publishes an event.' },
  'lob': { title:'Line of Business', what:'Category of insurance coverage — General Liability, Professional Liability, Property, Auto, Workers Compensation, Package.', why:'Determines underwriting rules, rating formulas, coverage forms, and regulatory requirements. Each LOB has distinct risk profiles.', flow:'Selected during quote creation. Drives coverage options, premium calculation, UW guidelines, and report segmentation.' },
  'effective-date': { title:'Effective Date', what:'The date on which insurance coverage begins. All claims occurring on or after this date are covered.', why:'Defines the policy term start. Premium is calculated from this date. Endorsements and cancellations reference effective dates for pro-rata adjustments.', flow:'Set during quote creation. Confirmed at issue. Changes require endorsement.' },
  'expiration-date': { title:'Expiration Date', what:'The date on which insurance coverage ends. Also called the policy term end date.', why:'Defines the policy boundary. Renewal must occur before this date to avoid lapse in coverage.', flow:'Set at quote creation. Updated on renewal. Cancellation creates a new (earlier) expiration.' },
  'premium': { title:'Premium', what:'The amount charged for insurance coverage. Can be expressed as annual, installment, or total transaction amount.', why:'Primary revenue for the carrier. Drives billing schedules, commission calculations, taxes, and statutory reporting.', flow:'Calculated during quoting (base + modifications + taxes). Changes via endorsement or renewal. Impacts billing installments.' },
  'deductible': { title:'Deductible', what:'The amount the insured pays out-of-pocket before insurance coverage applies to a claim.', why:'Risk-sharing mechanism between insured and carrier. Higher deductibles typically lower premium. Influences claims handling process.', flow:'Set during quote creation. Can be changed mid-term via endorsement. Affects premium calculation and claims payment.' },
  'mga': { title:'MGA (Managing General Agent)', what:'An intermediary with delegated underwriting authority who manages a book of business on behalf of the carrier.', why:'Acts as the primary distribution and service channel. Receives commission and may have binding authority up to defined limits.', flow:'Assigned during quote creation. Receives notices (renewal offers, cancellation notices) for confirmation. MGA decision drives policy actions.' },
  'bind': { title:'Bind', what:'The act of accepting a risk after underwriting approval. Creates a temporary coverage contract until the formal policy is issued.', why:'Provides immediate coverage. Transitions the quote from "APPROVED" to "ISSUED" status. Triggers policy number generation.', flow:'UW approval > Issue Policy > Generate policy number > ACTIVE status. Billing begins after issue.' },
  'coverage': { title:'Coverage', what:'Specific protection provided under an insurance policy — what is covered, limits, deductibles, and exclusions.', why:'Defines the scope of protection. Each coverage has its own limit, deductible, and rating basis.', flow:'Selected during quote creation. Confirmed at issue. Changed via endorsement. Each coverage drives a portion of the premium.' },
  'endorsement': { title:'Endorsement', what:'A mid-term change to an existing policy that modifies coverages, limits, deductibles, named insureds, or terms.', why:'Policies are not static — businesses change. Endorsements allow flexibility while maintaining continuous coverage.', flow:'Created from Quote Details > Endorse. Direct execution (no notice). Creates ENDORSEMENT transaction. Premium adjusted pro-rata.' },
  'renewal': { title:'Renewal', what:'The process of extending coverage beyond the current policy term, typically with a new term, revised premium, and updated coverages.', why:'Retains existing customers. Renewal premium is often different due to loss experience and market conditions.', flow:'Initiated from Quote Details > Renew. Generates RENEWAL_OFFER notice. Sent to MGA for confirmation. On acceptance, executes renewal and creates RENEWAL transaction.' },
  'cancellation': { title:'Cancellation', what:'Early termination of a policy before its natural expiration date. Can be initiated by insured or carrier.', why:'Needed when coverage is no longer required, risk becomes unacceptable, or payment is not received.', flow:'Initiated from Quote Details > Cancel. Generates CANCELLATION_NOTICE. Sent to MGA. On acceptance, executes cancellation and creates CANCELLATION transaction.' },
  'reinstatement': { title:'Reinstatement', what:'Restoring a cancelled policy back to active status, typically within a grace period and with a reinstatement fee.', why:'Preserves original policy terms and continuous coverage history. Avoids needing new underwriting and new application.', flow:'Initiated from Quote Details > Reinstate. Generates REINSTATEMENT_OFFER. Sent to MGA. On acceptance, executes reinstatement and creates REINSTATEMENT transaction.' },
  'premium-breakdown': { title:'Premium Breakdown', what:'Detailed calculation showing how the total premium is derived — base, modifications, credits, taxes, and fees.', why:'Transparency in pricing. Required for regulatory compliance and audit.', flow:'Calculated during quoting. Base premium x Mod Factor x Schedule Credit = Subtotal. Taxes and fees added.' },
  'experience-mod': { title:'Experience Modification Factor', what:'A multiplier applied to the base premium based on historical loss experience.', why:'Incentivizes safety and loss prevention. Directly links past claims to future premium.', flow:'Pulled from rating bureau. Applied during premium calculation. Reviewed at renewal.' },
  'schedule-credit': { title:'Schedule Credit / Debit', what:'A discretionary adjustment to premium based on risk factors not captured by class rating.', why:'Allows UW flexibility to price risks more accurately. Credits reward better risks.', flow:'Applied during UW review. Expressed as percentage of subtotal. Must be documented with rationale.' },
  'billing-plan': { title:'Billing Plan', what:'The payment schedule structure for the policy premium — Annual, Semi-Annual, Quarterly, or Monthly installments.', why:'Provides payment flexibility to insureds. Affects carrier cash flow. Data sourced from Billing Service.', flow:'Selected at quote creation. Default based on premium size. Late payments trigger cancellation process via Billing Service.' },
  'installment': { title:'Installment', what:'A scheduled partial payment of the total annual premium divided across multiple billing periods.', why:'Makes insurance more affordable by spreading cost. Managed by Billing Service.', flow:'Generated when policy is issued. Each due date is tracked by Billing Service. Late payment triggers grace period then cancellation.' },
  'document-type': { title:'Document Type', what:'Classification of documents — Application, Policy Forms, Endorsements, Correspondence, Claims, Certificates.', why:'Organizes documents for easy retrieval. Determines retention periods.', flow:'Documents managed by Document Service. PAS displays reference only.' },
  'audit-trail': { title:'Audit Trail', what:'A chronological record of all changes made to data — who changed what, when, and what the old and new values were.', why:'Required for regulatory compliance (SOX, NAIC). Provides accountability.', flow:'Every create/update/delete operation generates audit entries. Immutable and append-only.' },
  'activity-log': { title:'Activity Log', what:'A user-friendly record of significant events and actions performed in the system.', why:'Provides operational visibility. Helps supervisors review work.', flow:'Generated automatically for key actions. More summarized than audit trail.' },
  'quote': { title:'Quote', what:'The master record for all policy lifecycle stages in PAS. A quote starts as APPROVED and progresses through ACTIVE, CANCELLED, or EXPIRED.', why:'Single source of truth for all policy data. Eliminates data duplication.', flow:'APPROVED (from UW) > Issue > ACTIVE > Endorsement/Renewal/Cancellation/Reinstatement.' },
  'rating-basis': { title:'Rating Basis', what:'The exposure metric used to calculate premium — Gross Revenue, Payroll, Square Footage, Power Units, or Revenue.', why:'Links premium to exposure size. Standard industry practice for commercial lines.', flow:'Selected during quote creation. Verified by UW. Drives base premium calculation.' },
  'agent': { title:'Agent / Broker', what:'The licensed intermediary who represents the insured in obtaining insurance coverage.', why:'Primary distribution channel. Receives commission on premium.', flow:'Identified on quote. Handles insured communications.' },
  'underwriter': { title:'Underwriter', what:'The insurance professional who evaluates risk, determines pricing, and decides whether to accept or decline a submission.', why:'Core risk selection function. UW expertise drives portfolio quality.', flow:'Assigned to quote on creation. Manages quote through lifecycle.' },
  'coverage-limit': { title:'Coverage Limit', what:'The maximum amount the insurer will pay for a covered loss. Can be per-occurrence, aggregate, or both.', why:'Defines insurer maximum exposure. Higher limits = higher premium.', flow:'Selected during quote creation. Confirmed at issue. Changed via endorsement.' },
  'taxes-fees': { title:'Taxes & Fees', what:'Statutory charges added to the premium — Surplus Lines Tax (SLA), Stamping Fee, and other assessments.', why:'Legally required. Rates vary by state and LOB.', flow:'Calculated as percentage of premium. Remitted monthly/quarterly to states.' },
  'uw-notes': { title:'Underwriting Notes', what:'Internal notes recorded during risk assessment — observations, rationale, decisions, and action items.', why:'Documents UW thought process. Provides context for renewals and endorsements.', flow:'Created during UW review. Visible to UW team. Retained for policy lifecycle.' },
  'reinstatement-window': { title:'Reinstatement Window', what:'The period after cancellation during which a policy can be reinstated without new underwriting.', why:'Balances flexibility with risk management. Allows insured to correct issues.', flow:'Set in System Settings (default 30 days). Fee assessed on reinstatement.' },
  'late-fee': { title:'Late Fee', what:'A penalty charge applied when a payment is not received by the due date.', why:'Incentivizes timely payment. Compensates carrier for collection costs. Managed by Billing Service.', flow:'Applied automatically after grace period by Billing Service.' },
  'commission': { title:'Commission', what:'The percentage of premium paid to the agent for placing and servicing the policy. Usually 10-20%.', why:'Compensation for distribution channel. Varies by LOB.', flow:'Calculated at issue based on agreed rate. Paid on collected premium.' },
  'email-address': { title:'Email Address', what:'Registered email for the user account used for system login and notifications.', why:'Primary identifier for user authentication. Used for OTP delivery and system alerts.', flow:'Configured during user setup. Must be unique. Used in login flow and notification delivery.' },
  'password': { title:'Password', what:'Secret authentication credential used with email to verify user identity during login.', why:'First factor of authentication. Protects unauthorized access.', flow:'Set during user creation or password reset. Must meet minimum length and complexity rules.' },
  'otp-code': { title:'OTP Code', what:'One-Time Password — a 6-digit temporary code sent to the registered email for second-factor authentication.', why:'Provides an additional security layer beyond password (MFA).', flow:'Generated and sent on login step 1. Expires after 5 minutes or after first use.' },
  'dashboard': { title:'Dashboard', what:'The main landing page showing KPIs, quick actions, recent activity, and upcoming renewals at a glance.', why:'Provides a birds-eye view of portfolio health. Helps prioritize work.', flow:'First screen shown after login. Aggregates data from all modules — quotes, notices, transactions, billing.' },
  'quotes-search': { title:'Quotes Search', what:'A searchable listing of all quotes in the system with filters by status, LOB, and keywords.', why:'Primary way to find and access quote details. Supports servicing and workflows.', flow:'Accessed from sidebar or dashboard. Search results link to Quote Details for full information.' },
  'transaction': { title:'Transaction', what:'A record of a lifecycle event performed on a quote — Issue, Endorsement, Renewal, Cancellation, or Reinstatement.', why:'Provides a complete audit trail of all actions. Each transaction publishes an event for downstream systems.', flow:'Created when a lifecycle action is executed. Append-only, never modified or deleted.' },
  'notice-management': { title:'Notice Management', what:'The module for generating, sending, and tracking notices/offers to MGA for renewal, cancellation, and reinstatement.', why:'Implements the MGA confirmation workflow required for policy lifecycle actions.', flow:'DRAFT > GENERATED > SENT > ACKNOWLEDGED > DELIVERED > ACCEPTED/REJECTED/EXPIRED > EXECUTED.' },
  'transaction-timeline': { title:'Transaction Timeline', what:'A chronological view of all lifecycle events for a quote, showing the complete history from approval through current status.', why:'Provides full policy history at a glance. Essential for audits and understanding what happened when.', flow:'Approved > Issue > Endorsement > Renewal > Cancellation > Reinstatement. Each step shows date, user, and details.' },
  'integration-monitor': { title:'Integration Monitor', what:'A real-time status dashboard showing the health of all integrated external services.', why:'Provides operational visibility into system dependencies. Helps identify and diagnose integration failures.', flow:'PAS > CRM > Billing > Claims > Compliance > Reporting. Each service shows health status and last sync time.' },
  'api-log': { title:'API Log', what:'A record of all API calls made to and from PAS, including request/response payloads, status codes, and execution times.', why:'Essential for debugging integration issues. Provides traceability for compliance.', flow:'Captures inbound and outbound API calls. Includes correlation IDs for end-to-end tracing.' },
  'reports': { title:'Reports', what:'Pre-built analytical reports covering premium distribution, quote status, UW performance, aging receivables, and more.', why:'Provides business intelligence for management decisions.', flow:'Accessed from sidebar. Each report can be run on-demand.' },
  'admin': { title:'Administration', what:'System configuration area for managing users, roles, permissions, and system settings.', why:'Controls who has access to what. Configures system-wide behavior.', flow:'Accessed by Super Admin and System Admin users. Changes are audited.' },
  'endorsement-req-queue': { title:'Endorsement Request Queue', what:'Inbound queue of endorsement requests received from MGA API. Each request represents a mid-term policy change requested by the MGA on behalf of the insured.', why:'Provides a structured review and processing workflow for endorsement requests. Ensures all changes are validated, approved, and properly executed with full audit trail.', flow:'MGA API → RECEIVED → VALIDATED → ASSIGNED → IN_REVIEW → APPROVED/REJECTED → PROCESSED → COMPLETED. Each step is tracked with correlation ID.' },
  'policies': { title:'Policies', what:'Dedicated view of all issued policies (quotes with assigned policy numbers). Shows policy metadata, coverages, premium breakdown, and full transaction history.', why:'Provides a policy-centric view separate from the quote-centric workflow. Makes it easy to view policy details and lifecycle events in one place.', flow:'Policies list → Select a policy → Policy Detail (header + details + coverage + premium + transaction timeline with type filters).' }
};

// ---------- STATE ----------
let loginStep = 1;
let selectedQuoteId = null;
let selectedNoticeId = null;
let selectedReqId = null;
let selectedPolicyId = null;
let quoteSearchQuery = '';
let quoteSearchLOB = 'All Lines of Business';
let quoteSearchFilter = 'all';

// ---------- HELPERS ----------
const fmt = n => '$' + Number(n).toLocaleString('en-US', {minimumFractionDigits:0});
const chip = (status, label) => {
  const map = { ACTIVE:'active', APPROVED:'approved', CANCELLED:'cancelled', EXPIRED:'expired', COMPLETED:'active', PENDING:'pending', FAILED:'cancelled', DRAFT:'pending', GENERATED:'submitted', SENT:'info', ACKNOWLEDGED:'submitted', DELIVERED:'endorsed', ACCEPTED:'approved', REJECTED:'declined', EXECUTED:'active', Paid:'active', Overdue:'cancelled', Upcoming:'submitted', Final:'active', Draft:'pending', 'In Review':'pending', New:'submitted', Active:'active', RECEIVED:'submitted', VALIDATED:'info', ASSIGNED:'pending', PROCESSED:'active' };
  const c = map[status] || 'active';
  return `<span class="chip chip-${c}"><span class="chip-dot"></span>${label||status}</span>`;
};

// ---------- SCREEN NAV ----------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  const s = document.getElementById('screen-' + id);
  if (s) s.classList.add('active');
  const n = document.getElementById('nav-' + id);
  if (n) n.classList.add('active');
  if (id !== 'login') {
    document.getElementById('main-app').style.display = 'flex';
    document.getElementById('screen-login').style.display = 'none';
  }
  if (id === 'dashboard') { window._policyContext = null; renderDashboard(); }
  if (id === 'quotes') renderQuotes();
  if (id === 'quote-details' && selectedQuoteId) renderQuoteDetails(selectedQuoteId);
  if (id === 'policies') renderPolicies();
  if (id === 'endorsement-req-queue') renderEndorsementReqQueue();
  if (id === 'renewal') renderRenewal();
  if (id === 'cancellation') renderCancellation();
  if (id === 'reinstatement') renderReinstatement();
  if (id === 'billing') renderBilling();
  if (id === 'notice-management') renderNoticeManagement();
  if (id === 'transactions') renderTransactions();
  if (id === 'integration-monitor') renderIntegrationMonitor();
  if (id === 'api-log') renderAPILog();
  if (id === 'documents') renderDocuments();
  if (id === 'notes') renderNotes();
  if (id === 'activities') renderActivities();
  if (id === 'admin') renderAdmin();
  if (id === 'reports') renderReports();
}

// ---------- LOGIN ----------
function loginStep1() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  if (!email || !password) return;
  document.getElementById('login-step-1').classList.remove('active');
  document.getElementById('login-step-2').classList.add('active');
  document.querySelector('.login-step-indicator').textContent = 'Step 2: Verify OTP';
  document.getElementById('otp-email-display').textContent = email;
}

function loginStep2() {
  const otp = document.getElementById('login-otp').value;
  if (otp.length < 6) return;
  document.getElementById('screen-login').style.display = 'none';
  document.getElementById('main-app').style.display = 'flex';
  showScreen('dashboard');
}

function logout() {
  localStorage.clear();
  loginStep = 1;
  document.getElementById('screen-login').style.display = 'flex';
  document.getElementById('main-app').style.display = 'none';
  document.getElementById('login-step-1').classList.add('active');
  document.getElementById('login-step-2').classList.remove('active');
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-otp').value = '';
  document.querySelector('.login-step-indicator').textContent = 'Step 1: Sign In';
}

// ---------- INFO MODAL ----------
function showInfo(key) {
  const d = INFO_DATA[key];
  if (!d) return;
  document.getElementById('info-modal-title').textContent = d.title;
  document.getElementById('info-modal-what').textContent = d.what;
  document.getElementById('info-modal-why').textContent = d.why;
  document.getElementById('info-modal-flow').textContent = d.flow;
  document.getElementById('info-modal').classList.add('open');
}

function closeInfo() {
  document.getElementById('info-modal').classList.remove('open');
}

// ---------- TABS ----------
function switchTab(barId, tabName) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  bar.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  bar.querySelector(`.tab-item[data-tab="${tabName}"]`)?.classList.add('active');
  bar.parentElement.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  const content = document.getElementById('tab-' + tabName);
  if (content) content.classList.add('active');
}

// ---------- WIZARD ----------
function goToStep(wizId, step) {
  const wiz = document.getElementById(wizId);
  if (!wiz) return;
  wiz.querySelectorAll('.wizard-step').forEach((s, i) => {
    s.classList.toggle('done', i < step - 1);
    s.classList.toggle('active', i === step - 1);
  });
  wiz.querySelectorAll('.wizard-body > div').forEach((s, i) => {
    s.style.display = i === step - 1 ? 'block' : 'none';
  });
  const f = wiz.querySelector('.wizard-footer');
  if (f) {
    const b = f.querySelector('.btn-wizard-back');
    const n = f.querySelector('.btn-wizard-next');
    if (b) b.style.display = step === 1 ? 'none' : '';
    if (n) n.textContent = step === 5 ? 'Submit' : 'Next';
  }
}

function advanceWizard(wizId) {
  const wiz = document.getElementById(wizId);
  if (!wiz) return;
  const steps = wiz.querySelectorAll('.wizard-step');
  let cur = 0;
  steps.forEach((s, i) => { if (s.classList.contains('active')) cur = i; });
  if (cur < steps.length - 1) {
    goToStep(wizId, cur + 2);
  } else {
    submitNewSubmission();
  }
}

// ---------- PHASE 1: DYNAMIC RENDER FUNCTIONS ----------

// ======== QUOTES SEARCH ========
function renderQuotes() {
  const container = document.getElementById('quotes-table-body');
  if (!container) return;
  let list = QUOTES;

  const filter = window._quoteFilter || 'all';
  if (filter !== 'all') {
    list = list.filter(q => q.status.toLowerCase() === filter.toLowerCase());
  }

  const qry = (document.getElementById('qs-search')?.value || '').toLowerCase().trim();
  if (qry) {
    list = list.filter(q =>
      q.id.toLowerCase().includes(qry) ||
      q.insuredName.toLowerCase().includes(qry) ||
      (q.fein && q.fein.toLowerCase().includes(qry)) ||
      (q.policyNumber && q.policyNumber.toLowerCase().includes(qry))
    );
  }

  const lob = document.getElementById('qs-lob')?.value || 'All Lines of Business';
  if (lob !== 'All Lines of Business') {
    list = list.filter(q => q.lob === lob);
  }

  if (list.length === 0) {
    container.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:32px;color:var(--text-muted);">No quotes match your search</td></tr>`;
    return;
  }

  container.innerHTML = list.map(q => {
    const s = q.status;
    return `<tr onclick="gotoQuoteOrPolicy('${q.id}')" style="cursor:pointer;">
      <td class="col-id">${q.id}</td>
      <td>${q.insuredName}</td>
      <td>${q.lob}</td>
      <td>${chip(s)}</td>
      <td>${q.effective}</td>
      <td>${q.expiration}</td>
      <td>${fmt(q.premium)}</td>
      <td class="col-id">${q.policyNumber || '-'}</td>
      <td class="actions-cell">
        <button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();gotoQuoteOrPolicy('${q.id}')">View</button>
      </td>
    </tr>`;
  }).join('');

  document.querySelectorAll('#screen-quotes .filter-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.filter === filter);
  });
}

function filterQuotes(f) {
  window._quoteFilter = f;
  renderQuotes();
}

function searchQuotes() {
  renderQuotes();
}

// ======== DASHBOARD ========
function renderDashboard() {
  const today = new Date();
  const activeQuotes = QUOTES.filter(q => q.status === 'ACTIVE' && q.policyNumber);
  const approvedNotIssued = QUOTES.filter(q => q.status === 'APPROVED' && !q.policyNumber).length;
  const active = activeQuotes.length;
  const inForce = activeQuotes.reduce((s, q) => s + q.premium, 0);
  const avgPremium = active > 0 ? Math.round(inForce / active) : 0;
  const pendingNotices = NOTICES.filter(n => n.status !== 'EXECUTED' && n.status !== 'REJECTED' && n.status !== 'EXPIRED').length;
  const pendingDecisions = NOTICES.filter(n => n.status === 'DELIVERED').length;
  const renewalsDue30 = QUOTES.filter(q => q.status === 'ACTIVE' && q.policyNumber && (d => d >= 0 && d <= 30)(Math.ceil((new Date(q.expiration) - today) / (1000*60*60*24)))).length;
  const openEndorse = ENDORSEMENT_REQUESTS.filter(r => !['COMPLETED','PROCESSED'].includes(r.status)).length;

  const kpiVals = [approvedNotIssued, active, fmt(inForce), fmt(avgPremium), pendingNotices, pendingDecisions, renewalsDue30, openEndorse];
  document.querySelectorAll('#screen-dashboard .kpi-card').forEach((card, i) => {
    card.querySelector('.kpi-value').textContent = kpiVals[i];
    if (i === 6) card.querySelector('.kpi-value').style.color = renewalsDue30 > 0 ? 'var(--warning)' : 'var(--text-muted)';
  });

  // Analytics: Premium by LOB
  const colors = ['var(--accent)','var(--success)','var(--warning)','var(--danger)','var(--purple)','var(--cyan)','var(--secondary)'];
  const lobData = {};
  QUOTES.filter(q => q.status !== 'EXPIRED').forEach(q => {
    const l = q.lob || 'Other';
    if (!lobData[l]) lobData[l] = { premium: 0, count: 0 };
    lobData[l].premium += q.premium;
    lobData[l].count++;
  });
  const lobSorted = Object.entries(lobData).sort((a, b) => b[1].premium - a[1].premium);
  const lobMax = lobSorted.length ? lobSorted[0][1].premium : 1;
  const lobEl = document.getElementById('dash-lob-chart');
  if (lobEl) lobEl.innerHTML = lobSorted.map(([lob, d], i) =>
    `<div class="chart-row"><span class="cr-label">${lobShort(lob)}</span>
     <div class="cr-track"><div class="cr-fill" style="width:${(d.premium/lobMax*100).toFixed(1)}%;background:${colors[i%colors.length]};"></div></div>
     <span class="cr-value">${fmt(d.premium)}</span></div>`
  ).join('');

  // Policy Status Distribution
  const statusData = {};
  QUOTES.forEach(q => {
    if (!statusData[q.status]) statusData[q.status] = 0;
    statusData[q.status]++;
  });
  const statusOrder = ['ACTIVE','APPROVED','CANCELLED','EXPIRED','SUBMITTED','DRAFT','REJECTED'];
  const statusMax = Math.max(...Object.values(statusData), 1);
  const statusColors = {ACTIVE:'var(--success)',APPROVED:'var(--info)',CANCELLED:'var(--danger)',EXPIRED:'var(--text-muted)',SUBMITTED:'var(--accent)',DRAFT:'var(--gray)',REJECTED:'var(--danger)'};
  const statusLabels = {ACTIVE:'Active',APPROVED:'Approved',CANCELLED:'Cancelled',EXPIRED:'Expired',SUBMITTED:'Submitted',DRAFT:'Draft',REJECTED:'Rejected'};
  const statusEl = document.getElementById('dash-status-chart');
  if (statusEl) statusEl.innerHTML = statusOrder.filter(s => statusData[s]).map(s =>
    `<div class="chart-row"><span class="cr-label">${statusLabels[s]||s}</span>
     <div class="cr-track"><div class="cr-fill" style="width:${(statusData[s]/statusMax*100).toFixed(1)}%;background:${statusColors[s]};min-width:20px;">${statusData[s]}</div></div>
     <span class="cr-value">${statusData[s]}</span></div>`
  ).join('');

  // Transaction Volume
  const txnData = {};
  TRANSACTIONS.forEach(t => {
    if (!txnData[t.type]) txnData[t.type] = 0;
    txnData[t.type]++;
  });
  const txnOrder = ['ISSUE','RENEWAL','ENDORSEMENT','CANCELLATION','REINSTATEMENT'];
  const txnColors = {ISSUE:'var(--success)',RENEWAL:'var(--accent)',ENDORSEMENT:'var(--purple)',CANCELLATION:'var(--danger)',REINSTATEMENT:'var(--cyan)'};
  const txnMax = Math.max(...Object.values(txnData), 1);
  const txnEl = document.getElementById('dash-txn-chart');
  if (txnEl) txnEl.innerHTML = txnOrder.filter(t => txnData[t]).map(t =>
    `<div class="chart-row"><span class="cr-label">${t.charAt(0)+t.slice(1).toLowerCase()}</span>
     <div class="cr-track"><div class="cr-fill" style="width:${(txnData[t]/txnMax*100).toFixed(1)}%;background:${txnColors[t]};min-width:20px;">${txnData[t]}</div></div>
     <span class="cr-value">${txnData[t]}</span></div>`
  ).join('');

  // Top Agents
  const agentData = {};
  QUOTES.filter(q => q.agent).forEach(q => {
    if (!agentData[q.agent]) agentData[q.agent] = 0;
    agentData[q.agent] += q.premium;
  });
  const agentSorted = Object.entries(agentData).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const agentEl = document.getElementById('dash-agents');
  if (agentEl) agentEl.innerHTML = `<table class="data-table"><thead><tr><th>#</th><th>Agent</th><th>Premium</th></tr></thead><tbody>${agentSorted.map(([a, p], i) =>
    `<tr><td>${i + 1}</td><td>${a}</td><td style="font-weight:600;">${fmt(p)}</td></tr>`
  ).join('')}</tbody></table>`;

  // Notice Pipeline
  const noticeData = {};
  const noticeOrder = ['DRAFT','SENT','DELIVERED','EXECUTED','REJECTED','EXPIRED'];
  const noticeColors = {DRAFT:'var(--gray)',SENT:'var(--info)',DELIVERED:'var(--accent)',EXECUTED:'var(--success)',REJECTED:'var(--danger)',EXPIRED:'var(--text-muted)'};
  NOTICES.forEach(n => {
    if (!noticeData[n.status]) noticeData[n.status] = 0;
    noticeData[n.status]++;
  });
  const noticeMax = Math.max(...Object.values(noticeData), 1);
  const noticeEl = document.getElementById('dash-notice-pipeline');
  if (noticeEl) noticeEl.innerHTML = noticeOrder.filter(s => noticeData[s]).map(s =>
    `<div class="chart-row"><span class="cr-label">${s.charAt(0)+s.slice(1).toLowerCase()}</span>
     <div class="cr-track"><div class="cr-fill" style="width:${(noticeData[s]/noticeMax*100).toFixed(1)}%;background:${noticeColors[s]};min-width:20px;">${noticeData[s]}</div></div>
     <span class="cr-value">${noticeData[s]}</span></div>`
  ).join('');

  // Endorsement Requests Summary
  const endorseData = {};
  ENDORSEMENT_REQUESTS.forEach(r => {
    if (!endorseData[r.status]) endorseData[r.status] = 0;
    endorseData[r.status]++;
  });
  const endorseOrder = ['PENDING','IN_PROGRESS','UNDER_REVIEW','COMPLETED','PROCESSED','DECLINED'];
  const endorseColors = {PENDING:'var(--gray)',IN_PROGRESS:'var(--info)',UNDER_REVIEW:'var(--warning)',COMPLETED:'var(--success)',PROCESSED:'var(--accent)',DECLINED:'var(--danger)'};
  const endorseLabels = {PENDING:'Pending',IN_PROGRESS:'In Progress',UNDER_REVIEW:'Under Review',COMPLETED:'Completed',PROCESSED:'Processed',DECLINED:'Declined'};
  const endorseMax = Math.max(...Object.values(endorseData), 1);
  const endorseEl = document.getElementById('dash-endorse-summary');
  if (endorseEl) endorseEl.innerHTML = endorseOrder.filter(s => endorseData[s]).map(s =>
    `<div class="chart-row"><span class="cr-label">${endorseLabels[s]||s}</span>
     <div class="cr-track"><div class="cr-fill" style="width:${(endorseData[s]/endorseMax*100).toFixed(1)}%;background:${endorseColors[s]};min-width:20px;">${endorseData[s]}</div></div>
     <span class="cr-value">${endorseData[s]}</span></div>`
  ).join('');

  // Recent Activity
  const actContainer = document.getElementById('dash-activity');
  if (actContainer) {
    actContainer.innerHTML = ACTIVITIES.slice(0, 5).map(a => {
      const chipColors = { Created:'submitted', Approved:'approved', Updated:'endorsed', Uploaded:'active', Referred:'pending', Submitted:'submitted', Issued:'approved', Payment:'active', Endorsed:'endorsed', Sent:'info', Generated:'submitted' };
      const cc = chipColors[a.action] || 'active';
      return `<tr><td style="font-size:12px;color:var(--text-muted);">${a.timestamp.slice(11,16)}</td>
        <td>${a.user}</td>
        <td><span class="chip chip-${cc}"><span class="chip-dot"></span>${a.action}</span></td>
        <td class="col-id">${a.entity}</td></tr>`;
    }).join('');
  }

  // Upcoming Renewals
  const renContainer = document.getElementById('dash-renewals');
  if (renContainer) {
    const upcoming = QUOTES.filter(q => q.status === 'ACTIVE' && q.policyNumber)
      .sort((a, b) => new Date(a.expiration) - new Date(b.expiration))
      .slice(0, 4);
    renContainer.innerHTML = upcoming.map(q => {
      const days = Math.ceil((new Date(q.expiration) - today) / (1000*60*60*24));
      const isUrgent = days <= 30 && days >= 0;
      const bgStyle = isUrgent ? 'background:var(--warning-bg);' : '';
      return `<tr onclick="gotoQuoteOrPolicy('${q.id}')" style="cursor:pointer;${bgStyle}"><td>${isUrgent ? '<i class="fas fa-exclamation-triangle" style="color:var(--warning);margin-right:6px;font-size:11px;"></i>' : ''}<span class="col-id">${q.policyNumber || q.id}</span></td><td>${q.insuredName}</td><td>${q.expiration}</td><td><span style="color:${days <= 30 ? 'var(--warning)' : days <= 60 ? 'var(--accent)' : 'var(--text-secondary)'};font-weight:600;">${days >= 0 ? days + 'd' : 'Expired'}</span></td></tr>`;
    }).join('');
  }
}

function lobShort(lob) {
  const m = { 'General Liability':'GL','Professional Liability':'Prof Liab','Auto Liability':'Auto','Commercial Auto':'Auto','Property':'Prop','Commercial Property':'Prop','Workers Compensation':'WC','Package':'Pkg','Cyber':'Cyber','Inland Marine':'Inland','Equipment Breakdown':'Equip' };
  return m[lob] || lob;
}

function showPolicies() {
  selectedPolicyId = null;
  showScreen('policies');
}

function backFromSubScreen() {
  if (window._policyContext === 'policies' && selectedPolicyId) {
    showScreen('policies');
  } else if (selectedQuoteId) {
    showScreen('quote-details');
  } else {
    showScreen('dashboard');
  }
}

// ======== QUOTE DETAILS ========
function viewQuote(id) {
  selectedQuoteId = id;
  showScreen('quote-details');
}

function gotoQuoteOrPolicy(id) {
  const q = QUOTES.find(x => x.id === id);
  selectedQuoteId = id;
  if (q && q.policyNumber) {
    selectedPolicyId = id;
    window._policyTxnFilter = 'All';
    showScreen('policies');
  } else {
    selectedPolicyId = null;
    showScreen('quote-details');
  }
}

// ======== POLICIES SCREEN ========
function viewPolicy(id) {
  selectedPolicyId = id;
  window._policyTxnFilter = 'All';
  renderPolicyDetail(id);
}

function renderPolicies() {
  const container = document.getElementById('policies-dynamic');
  if (!container) return;

  if (selectedPolicyId) {
    renderPolicyDetail(selectedPolicyId);
    return;
  }

  const policies = QUOTES.filter(q => q.policyNumber);
  const totalActive = policies.filter(q => q.status === 'ACTIVE').length;
  const totalCancelled = policies.filter(q => q.status === 'CANCELLED').length;
  const totalPremium = policies.reduce((s, q) => s + q.premium, 0);

  window._policyTxnFilter = 'All';
  window._policyContext = null;
  const search = (window._policySearch || '').toLowerCase();
  const lobFilter = window._policyLob || 'All Lines of Business';
  const filtered = policies.filter(q => {
    if (lobFilter !== 'All Lines of Business' && q.lob !== lobFilter) return false;
    if (search && !q.policyNumber.toLowerCase().includes(search) && !q.id.toLowerCase().includes(search) && !q.insuredName.toLowerCase().includes(search)) return false;
    return true;
  });

  container.innerHTML = `
    <div class="journey-bar"><span class="step done"><i class="fas fa-check-circle"></i> Dashboard</span><span class="arrow"><i class="fas fa-chevron-right"></i></span><span class="step current">Policies</span><span class="arrow"><i class="fas fa-chevron-right"></i></span><span class="step"><i class="far fa-circle"></i> Select a policy to view details</span></div>
    <div class="page-header"><div style="display:flex;align-items:center;gap:12px;"><button class="btn btn-ghost btn-sm" onclick="showScreen('dashboard')"><i class="fas fa-arrow-left"></i></button><h1>Policies <i class="info-btn" onclick="showInfo('policies')">i</i></h1></div><div class="actions"><span style="font-size:12px;color:var(--text-muted);">${policies.length} policies — ${fmt(totalPremium)} total premium</span></div></div>
    <div class="summary-card glass" style="margin-bottom:12px;">
      <div class="sc-item"><div class="sc-label">Total Policies</div><div class="sc-value">${policies.length}</div></div>
      <div class="sc-item"><div class="sc-label">Active</div><div class="sc-value" style="color:var(--success);">${totalActive}</div></div>
      <div class="sc-item"><div class="sc-label">Cancelled</div><div class="sc-value" style="color:var(--danger);">${totalCancelled}</div></div>
      <div class="sc-item"><div class="sc-label">In-Force Premium</div><div class="sc-value" style="color:var(--accent);">${fmt(totalPremium)}</div></div>
    </div>
    <div class="card glass mb-md"><div class="form-row">
      <div class="form-group"><input class="form-input" type="text" id="ps-search" placeholder="Search by Policy #, Quote ID, or Insured Name..." value="${window._policySearch || ''}" oninput="window._policySearch=this.value;renderPolicies();"></div>
      <div class="form-group"><select class="form-input" id="ps-lob" onchange="window._policyLob=this.value;renderPolicies();">${['All Lines of Business','General Liability','Professional Liability','Auto Liability','Property','Workers Compensation','Package'].map(o => `<option${o === lobFilter ? ' selected' : ''}>${o}</option>`).join('')}</select></div>
    </div></div>
    <div class="card glass">
      <table class="data-table"><thead><tr><th>Policy #</th><th>Quote ID</th><th>Insured</th><th>LOB</th><th>Status</th><th>Effective</th><th>Expiration</th><th>Issue Date</th><th>Premium</th><th>Actions</th></tr></thead><tbody>
        ${filtered.length === 0 ? '<tr><td colspan="10" style="text-align:center;padding:32px;color:var(--text-muted);">No policies found</td></tr>' :
          filtered.map(q => `<tr style="cursor:pointer;"><td class="col-id" onclick="selectedPolicyId='${q.id}';renderPolicies();">${q.policyNumber}</td>
            <td class="col-id" onclick="selectedPolicyId='${q.id}';renderPolicies();">${q.id}</td>
            <td onclick="selectedPolicyId='${q.id}';renderPolicies();">${q.insuredName}</td>
            <td onclick="selectedPolicyId='${q.id}';renderPolicies();">${q.lob}</td>
            <td onclick="selectedPolicyId='${q.id}';renderPolicies();">${chip(q.status)}</td>
            <td onclick="selectedPolicyId='${q.id}';renderPolicies();">${q.effective}</td>
            <td onclick="selectedPolicyId='${q.id}';renderPolicies();">${q.expiration}</td>
            <td onclick="selectedPolicyId='${q.id}';renderPolicies();">${q.issueDate || '-'}</td>
            <td onclick="selectedPolicyId='${q.id}';renderPolicies();">${fmt(q.premium)}</td>
            <td><button class="btn btn-primary btn-xs" onclick="event.stopPropagation();selectedPolicyId='${q.id}';renderPolicies();">View</button></td></tr>`).join('')}
      </tbody></table>
    </div>`;
}

function renderPolicyDetail(id) {
  const container = document.getElementById('policies-dynamic');
  if (!container) return;

  const q = QUOTES.find(x => x.id === id);
  if (!q) {
    container.innerHTML = '<div style="padding:60px 20px;text-align:center;color:var(--text-muted);">Policy not found.</div>';
    return;
  }

  const daysLeft = Math.ceil((new Date(q.expiration) - new Date()) / (1000*60*60*24));
  const renewEligible = daysLeft <= 30 && daysLeft >= 0;
  const isActive = q.status === 'ACTIVE';
  const isCancelled = q.status === 'CANCELLED';
  const txnFilter = window._policyTxnFilter || 'All';
  const txns = TRANSACTIONS.filter(t => t.quoteId === id && (txnFilter === 'All' || t.type === txnFilter));

  const typeIcons = { ISSUE:'fa-file-contract', ENDORSEMENT:'fa-pen-alt', RENEWAL:'fa-sync-alt', CANCELLATION:'fa-ban', REINSTATEMENT:'fa-undo-alt' };
  const typeColors = { ISSUE:'var(--success)', ENDORSEMENT:'var(--cyan)', RENEWAL:'var(--purple)', CANCELLATION:'var(--danger)', REINSTATEMENT:'var(--warning)' };
  const filterChips = ['All', 'ISSUE', 'ENDORSEMENT', 'RENEWAL', 'CANCELLATION', 'REINSTATEMENT'];

  const billing = BILLING_SCHEDULES[id] || [];

  function getTxnSummary(t) {
    const short = t.summary.length > 70 ? t.summary.slice(0, 70) + '...' : t.summary;
    return short;
  }

  container.innerHTML = `
    <div class="flex-between mb-sm">
      <button class="btn btn-ghost btn-sm" onclick="selectedPolicyId=null;renderPolicies();"><i class="fas fa-arrow-left"></i> Back to Policies</button>
    </div>
    <div class="journey-bar"><span class="step done"><i class="fas fa-check-circle"></i> Policies</span><span class="arrow"><i class="fas fa-chevron-right"></i></span><span class="step current">${q.policyNumber}</span><span class="arrow"><i class="fas fa-chevron-right"></i></span><span class="step"><i class="far fa-circle"></i> Endorse / Renew / Cancel</span></div>

    <div class="card glass mb-md">
      <div class="flex-between">
        <div>
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <h1 style="font-size:22px;font-family:monospace;">${q.policyNumber}</h1>
            ${chip(q.status)}
            <span style="font-size:13px;color:var(--text-muted);">${q.id}</span>
          </div>
          <p style="color:var(--text-secondary);margin-top:4px;font-size:18px;">${q.insuredName}</p>
          <p style="font-size:12px;color:var(--text-muted);margin-top:2px;">
            <span style="color:var(--text-muted);"><i class="fas fa-calendar-alt"></i> Effective:</span> ${q.effective}
            <span style="margin:0 8px;color:var(--text-muted);">|</span>
            <span style="color:var(--text-muted);"><i class="fas fa-calendar-alt"></i> Expires:</span> ${q.expiration}
            <span style="margin:0 8px;color:var(--text-muted);">|</span>
            <span style="color:var(--text-muted);"><i class="fas fa-print"></i> Issued:</span> ${q.issueDate || '-'}
          </p>
          <div style="margin-top:6px;display:flex;align-items:center;gap:10px;">
            <div style="flex:1;max-width:200px;height:6px;background:var(--bg-light);border-radius:3px;overflow:hidden;">
              <div style="height:100%;width:${Math.min(100, Math.max(0, daysLeft/365*100))}%;background:${daysLeft <= 30 ? 'var(--warning)' : daysLeft <= 60 ? 'var(--accent)' : 'var(--success)'};border-radius:3px;"></div>
            </div>
            <span style="font-size:13px;font-weight:600;color:${daysLeft <= 30 ? 'var(--warning)' : daysLeft <= 60 ? 'var(--accent)' : 'var(--text-secondary)'};">${daysLeft >= 0 ? daysLeft + ' days left' : 'Expired'}</span>
            ${daysLeft <= 30 && daysLeft >= 0 ? '<span class="chip chip-pending" style="font-size:11px;"><i class="fas fa-exclamation-triangle"></i> Renewal Window Open</span>' : ''}
          </div>
        </div>
        <div class="actions" style="gap:6px;">
          ${isActive ? `<button class="btn btn-primary btn-sm" onclick="selectedQuoteId='${q.id}';selectedPolicyId='${q.id}';showScreen('endorsement-req-queue')"><i class="fas fa-pen-alt"></i> Endorse</button>` : ''}
          ${isActive && renewEligible ? `<button class="btn btn-success btn-sm" onclick="selectedQuoteId='${q.id}';_policyContext='policies';showScreen('renewal')"><i class="fas fa-sync-alt"></i> Renew</button>` : ''}
          ${isActive && !renewEligible ? `<button class="btn btn-success btn-sm" style="opacity:0.4;pointer-events:none;" title="Renewal available within 30 days of expiration"><i class="fas fa-sync-alt"></i> Renew</button>` : ''}
          ${isActive ? `<button class="btn btn-danger btn-sm" onclick="selectedQuoteId='${q.id}';_policyContext='policies';showScreen('cancellation')"><i class="fas fa-ban"></i> Cancel</button>` : ''}
          ${isCancelled ? `<button class="btn btn-warning btn-sm" onclick="selectedQuoteId='${q.id}';_policyContext='policies';showScreen('reinstatement')"><i class="fas fa-undo-alt"></i> Reinstate</button>` : ''}
        </div>
      </div>
    </div>

    <div class="card glass mb-md">
      <div class="card-title">Policy Details</div>
      <div class="detail-grid">
        <div class="detail-item"><div class="di-label">Insured Name</div><div class="di-value">${q.insuredName}</div></div>
        <div class="detail-item"><div class="di-label">FEIN</div><div class="di-value font-mono">${q.fein}</div></div>
        <div class="detail-item"><div class="di-label">Line of Business</div><div class="di-value">${q.lob}</div></div>
        <div class="detail-item"><div class="di-label">Agent / Broker</div><div class="di-value">${q.agent}</div></div>
        <div class="detail-item"><div class="di-label">Underwriter</div><div class="di-value">${q.uw}</div></div>
        <div class="detail-item"><div class="di-label">MGA</div><div class="di-value">${q.mga}</div></div>
        <div class="detail-item"><div class="di-label">Effective Date</div><div class="di-value">${q.effective}</div></div>
        <div class="detail-item"><div class="di-label">Expiration Date</div><div class="di-value">${q.expiration}</div></div>
        <div class="detail-item"><div class="di-label">Issue Date</div><div class="di-value">${q.issueDate || '-'}</div></div>
        <div class="detail-item"><div class="di-label">Policy Term</div><div class="di-value">${q.term}</div></div>
        <div class="detail-item"><div class="di-label">Billing Plan</div><div class="di-value">${q.billingPlan}</div></div>
        <div class="detail-item"><div class="di-label">Payment Method</div><div class="di-value">${q.paymentMethod}</div></div>
      </div>
    </div>

    <div class="grid-2 mb-md">
      <div class="card glass">
        <div class="card-title">Coverage</div>
        <table class="data-table"><thead><tr><th>Coverage</th><th>Limit</th><th>Deductible</th><th>Premium</th><th>Rating Basis</th></tr></thead><tbody>
          <tr><td>${q.coverage || q.lob}</td><td>${fmt(q.limit)}</td><td>${fmt(q.deductible)}</td><td>${fmt(Math.round(q.basePremium * q.modFactor * (1 - (q.scheduleCredit||0))))}</td><td>${q.ratingBasis}</td></tr>
        </tbody></table>
      </div>
      <div class="card glass">
        <div class="card-title">Premium Breakdown</div>
        <div class="premium-breakdown">
          <div class="pb-row"><span class="pb-label">Base Premium</span><span class="pb-value">${fmt(q.basePremium)}</span></div>
          <div class="pb-row"><span class="pb-label">Experience Mod</span><span class="pb-value">${q.modFactor}</span></div>
          <div class="pb-row"><span class="pb-label">Schedule Credit</span><span class="pb-value">-${Math.round((q.scheduleCredit||0)*100)}%</span></div>
          <div class="pb-row"><span class="pb-label">SLA Tax (3.6%)</span><span class="pb-value">${fmt(q.slaTax)}</span></div>
          <div class="pb-row"><span class="pb-label">Stamping Fee (1.5%)</span><span class="pb-value">${fmt(q.stampingFee)}</span></div>
          <div class="pb-row total"><span class="pb-label">Total Annual Premium</span><span class="pb-value">${fmt(q.premium)}</span></div>
        </div>
      </div>
    </div>

    <div class="card glass">
      <div class="card-title" style="margin-bottom:8px;">Transaction History</div>
      <div class="filter-bar" style="margin-bottom:12px;">
        ${filterChips.map(f => `<span class="filter-chip${txnFilter === f ? ' active' : ''}" onclick="window._policyTxnFilter='${f}';renderPolicyDetail('${id}');">${f}${f === 'All' ? ' (' + TRANSACTIONS.filter(t=>t.quoteId===id).length + ')' : ' (' + TRANSACTIONS.filter(t=>t.quoteId===id&&t.type===f).length + ')'}</span>`).join('')}
      </div>
      <table class="data-table"><thead><tr><th>Date</th><th>Transaction #</th><th>Type</th><th>Event ID</th><th>Effective Date</th><th>Summary</th><th>Status</th></tr></thead><tbody>
        ${txns.length === 0 ? '<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted);">No transactions found for this filter</td></tr>' :
          txns.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).map(t => `<tr>
            <td style="font-size:12px;color:var(--text-muted);">${t.createdAt}</td>
            <td class="col-id">${t.transactionNo}</td>
            <td><span style="color:${typeColors[t.type]||'var(--text-muted)'}"><i class="fas ${typeIcons[t.type]||'fa-circle'}"></i></span> ${t.type}</td>
            <td style="font-size:12px;color:var(--text-muted);font-family:monospace;">${t.eventId}</td>
            <td style="font-size:12px;">${t.effectiveDate}</td>
            <td style="font-size:13px;">${getTxnSummary(t)}</td>
            <td>${chip('COMPLETED')}</td></tr>`).join('')}
      </tbody></table>
    </div>`;
}

// ======== ENDORSEMENT REQUEST QUEUE ========
const ENDO_TYPE_PREMIUMS = {
  'Address Change':0, 'Name Change':0, 'Limit Change':5000,
  'Coverage Change':3500, 'Additional Insured':2500,
  'Vehicle Addition':1800, 'Vehicle Removal':-800,
  'Driver Addition':1200, 'Driver Removal':-500,
  'Mortgagee/Lienholder':0, 'Other':500
};

function renderEndorsementReqQueue() {
  const container = document.getElementById('endo-req-dynamic');
  if (!container) return;
  selectedReqId = null;

  const jb = document.querySelector('#screen-endorsement-req-queue .journey-bar');
  if (jb) {
    jb.innerHTML = '<span class="step done"><i class="fas fa-check-circle"></i> Dashboard</span><span class="arrow"><i class="fas fa-chevron-right"></i></span><span class="step current">Endorsement Request Queue</span><span class="arrow"><i class="fas fa-chevron-right"></i></span><span class="step"><i class="far fa-circle"></i> Review &amp; Processing</span>';
  }

  const statusCounts = {};
  ENDORSEMENT_REQUESTS.forEach(r => { statusCounts[r.status] = (statusCounts[r.status]||0) + 1; });
  const statusOrder = ['RECEIVED','VALIDATED','ASSIGNED','IN_REVIEW','APPROVED','REJECTED','PROCESSED','COMPLETED'];
  const statusLabels = { RECEIVED:'Received', VALIDATED:'Validated', ASSIGNED:'Assigned', IN_REVIEW:'In Review', APPROVED:'Approved', REJECTED:'Rejected', PROCESSED:'Processed', COMPLETED:'Completed' };

  container.innerHTML = `
    <div class="summary-card glass" style="margin-bottom:12px;">
      ${statusOrder.map(s => `<div class="sc-item"><div class="sc-label">${statusLabels[s]}</div><div class="sc-value">${chip(s, statusCounts[s]||0)}</div></div>`).join('')}
    </div>
    <div class="card glass" style="padding:12px;margin-bottom:12px;background:var(--accent-dim);border-radius:var(--radius-sm);">
      <div style="font-size:12px;color:var(--text-muted);"><strong>Integration:</strong> Consumes: MGA API, Policy Service &nbsp;|&nbsp; Produces: <code>PolicyEndorsed</code> event &nbsp;|&nbsp; Uses: Document Service, Audit Service, Billing Service<br><strong>Event Flow:</strong> Inbound API → Queue → Review → Approve → Update Policy → Transaction → PolicyEndorsedEvent → Billing → Document → Audit → Reporting</div>
    </div>
    <div class="card glass">
      <table class="data-table"><thead><tr><th>Request ID</th><th>Quote</th><th>Policy #</th><th>Type</th><th>Priority</th><th>Status</th><th>Requested By</th><th>Date</th><th>Actions</th></tr></thead><tbody>
        ${ENDORSEMENT_REQUESTS.length === 0 ? '<tr><td colspan="9" style="text-align:center;padding:32px;color:var(--text-muted);">No endorsement requests received</td></tr>' :
        ENDORSEMENT_REQUESTS.map(r => {
          const q = QUOTES.find(x => x.id === r.quoteId);
          const priorityColor = r.priority === 'High' ? 'var(--danger)' : r.priority === 'Medium' ? 'var(--warning)' : 'var(--text-secondary)';
          const canReview = !['APPROVED','REJECTED','PROCESSED','COMPLETED'].includes(r.status);
          return `<tr>
            <td class="col-id">${r.id}</td>
            <td class="col-id">${r.quoteId}</td>
            <td class="col-id">${r.policyNumber || '-'}</td>
            <td>${r.requestType}</td>
            <td><span style="color:${priorityColor};font-weight:600;">${r.priority}</span></td>
            <td>${chip(r.status)}</td>
            <td>${r.requestedBy}</td>
            <td style="font-size:12px;">${r.requestedDate}</td>
            <td class="actions-cell">${canReview ? `<button class="btn btn-primary btn-xs" onclick="reviewEndorsementRequest('${r.id}')"><i class="fas fa-search"></i> Review</button>` : `<span style="font-size:11px;color:var(--text-muted);">${r.decision || 'Done'}</span>`}</td>
          </tr>`;
        }).join('')}
      </tbody></table>
    </div>`;
}

function reviewEndorsementRequest(id) {
  selectedReqId = id;
  renderEndorsementReview(id);
}

function renderEndorsementReview(reqId) {
  const container = document.getElementById('endo-req-dynamic');
  if (!container) return;
  const r = ENDORSEMENT_REQUESTS.find(x => x.id === reqId);
  if (!r) { renderEndorsementReqQueue(); return; }
  const q = QUOTES.find(x => x.id === r.quoteId);

  const jb = document.querySelector('#screen-endorsement-req-queue .journey-bar');
  if (jb) {
    jb.innerHTML = '<span class="step done"><i class="fas fa-check-circle"></i> Dashboard</span><span class="arrow"><i class="fas fa-chevron-right"></i></span><span class="step done"><i class="fas fa-check-circle"></i> Endorsement Request Queue</span><span class="arrow"><i class="fas fa-chevron-right"></i></span><span class="step current">Review &amp; Processing</span>';
  }

  const premiumImpact = ENDO_TYPE_PREMIUMS[r.requestType] || 0;
  const newPremium = q ? (q.premium + premiumImpact) : 0;
  const txnIdx = TRANSACTIONS.length;

  container.innerHTML = `
    <button class="btn btn-ghost btn-sm mb-sm" onclick="renderEndorsementReqQueue()"><i class="fas fa-arrow-left"></i> Back to Queue</button>

    <div class="card glass mb-md">
      <div class="flex-between">
        <div>
          <div style="display:flex;align-items:center;gap:12px;">
            <h1 style="font-size:22px;">Endorsement Review &amp; Processing</h1>
            ${chip(r.status)}
            <span style="font-size:11px;padding:2px 8px;border-radius:4px;background:${r.priority === 'High' ? 'var(--danger-bg)' : r.priority === 'Medium' ? 'var(--warning-bg)' : 'var(--glass-bg)'};color:${r.priority === 'High' ? 'var(--danger)' : r.priority === 'Medium' ? 'var(--warning)' : 'var(--text-muted)'};">${r.priority} Priority</span>
          </div>
          <p style="font-size:13px;color:var(--text-secondary);margin-top:4px;">${r.id} / ${r.quoteId}${r.policyNumber ? ' / ' + r.policyNumber : ''} — ${r.requestType}</p>
        </div>
      </div>
    </div>

    <div class="card glass">
      <div class="tab-bar" id="endor-tabs">
        <div class="tab-item active" data-tab="endor-overview" onclick="switchTab('endor-tabs','endor-overview')">Overview</div>
        <div class="tab-item" data-tab="endor-comparison" onclick="switchTab('endor-tabs','endor-comparison')">Comparison</div>
        <div class="tab-item" data-tab="endor-validation" onclick="switchTab('endor-tabs','endor-validation')">Validation</div>
        <div class="tab-item" data-tab="endor-premium" onclick="switchTab('endor-tabs','endor-premium')">Premium</div>
        <div class="tab-item" data-tab="endor-decision" onclick="switchTab('endor-tabs','endor-decision')">Decision</div>
      </div>

      <div id="tab-endor-overview" class="tab-content active">
        <div class="detail-grid">
          <div class="detail-item"><div class="di-label">Request ID</div><div class="di-value font-mono">${r.id}</div></div>
          <div class="detail-item"><div class="di-label">Quote ID</div><div class="di-value font-mono">${r.quoteId}</div></div>
          <div class="detail-item"><div class="di-label">Policy Number</div><div class="di-value font-mono">${r.policyNumber || 'N/A'}</div></div>
          <div class="detail-item"><div class="di-label">Insured</div><div class="di-value">${q ? q.insuredName : '-'}</div></div>
          <div class="detail-item"><div class="di-label">Endorsement Type</div><div class="di-value">${r.requestType}</div></div>
          <div class="detail-item"><div class="di-label">Priority</div><div class="di-value"><span style="color:${r.priority === 'High' ? 'var(--danger)' : r.priority === 'Medium' ? 'var(--warning)' : 'var(--text-secondary)'};">${r.priority}</span></div></div>
          <div class="detail-item"><div class="di-label">Source System</div><div class="di-value">${r.sourceSystem}</div></div>
          <div class="detail-item"><div class="di-label">Source Reference</div><div class="di-value font-mono">${r.sourceReference}</div></div>
          <div class="detail-item"><div class="di-label">Requested By</div><div class="di-value">${r.requestedBy}</div></div>
          <div class="detail-item"><div class="di-label">Requested Date</div><div class="di-value">${r.requestedDate}</div></div>
          <div class="detail-item"><div class="di-label">Effective Date</div><div class="di-value">${r.effectiveDate}</div></div>
          <div class="detail-item"><div class="di-label">Correlation ID</div><div class="di-value font-mono" style="font-size:11px;">${r.correlationId}</div></div>
          <div class="detail-item"><div class="di-label">Status</div><div class="di-value">${chip(r.status)}</div></div>
          ${r.assignedTo ? `<div class="detail-item"><div class="di-label">Assigned To</div><div class="di-value">${r.assignedTo}</div></div>` : ''}
          ${r.reviewedBy ? `<div class="detail-item"><div class="di-label">Reviewed By</div><div class="di-value">${r.reviewedBy}</div></div>` : ''}
          ${r.decision ? `<div class="detail-item"><div class="di-label">Decision</div><div class="di-value">${chip(r.decision)}</div></div>` : ''}
        </div>
      </div>

      <div id="tab-endor-comparison" class="tab-content">
        ${r.changedFields.length === 0 ? '<p style="color:var(--text-muted);padding:16px;">No changed fields recorded for this request.</p>' :
        `<table class="data-table"><thead><tr><th>Field</th><th>Current Value</th><th>Requested Value</th></tr></thead><tbody>
          ${r.changedFields.map(f => `
            <tr style="background:var(--warning-bg);">
              <td style="font-weight:600;">${f.charAt(0).toUpperCase() + f.slice(1).replace(/([A-Z])/g,' $1')}</td>
              <td style="color:var(--text-secondary);">${r.currentValues[f] || '-'}</td>
              <td style="color:var(--accent);font-weight:600;">${r.requestedValues[f] || '-'}</td>
            </tr>`).join('')}
        </tbody></table>`}
        <div style="margin-top:12px;padding:12px;background:var(--accent-dim);border-radius:var(--radius-sm);font-size:12px;color:var(--text-muted);">
          <i class="fas fa-info-circle"></i> Highlighted rows show fields that will change. Review before proceeding to Decision tab.
        </div>
      </div>

      <div id="tab-endor-validation" class="tab-content">
        <div style="display:grid;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--success-bg);border-radius:var(--radius-sm);"><i class="fas fa-check-circle" style="color:var(--success);"></i> <span>Policy Active — ${q ? q.status === 'ACTIVE' : 'N/A'}</span></div>
          <div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--success-bg);border-radius:var(--radius-sm);"><i class="fas fa-check-circle" style="color:var(--success);"></i> <span>Effective Date Valid — ${r.effectiveDate >= new Date().toISOString().slice(0,10) ? 'Future date' : 'Past date (review required)'}</span></div>
          <div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--success-bg);border-radius:var(--radius-sm);"><i class="fas fa-check-circle" style="color:var(--success);"></i> <span>Authority OK — ${r.sourceSystem} has delegated authority</span></div>
          <div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--success-bg);border-radius:var(--radius-sm);"><i class="fas fa-check-circle" style="color:var(--success);"></i> <span>Required Fields Complete — ${r.changedFields.length > 0 ? 'All fields present' : 'No fields to change'}</span></div>
          <div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--success-bg);border-radius:var(--radius-sm);"><i class="fas fa-check-circle" style="color:var(--success);"></i> <span>Rating Completed — Premium recalculated by Rating Service (simulated)</span></div>
          <div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:${['APPROVED','PROCESSED','COMPLETED'].includes(r.status) ? 'var(--success-bg)' : 'var(--warning-bg)'};border-radius:var(--radius-sm);"><i class="fas ${['APPROVED','PROCESSED','COMPLETED'].includes(r.status) ? 'fa-check-circle' : 'fa-clock'}" style="color:${['APPROVED','PROCESSED','COMPLETED'].includes(r.status) ? 'var(--success)' : 'var(--warning)'};"></i> <span>Documents Ready — ${['APPROVED','PROCESSED','COMPLETED'].includes(r.status) ? 'Generated' : 'Pending generation on approval'}</span></div>
        </div>
      </div>

      <div id="tab-endor-premium" class="tab-content">
        <div class="premium-breakdown">
          <div class="pb-row"><span class="pb-label">Current Annual Premium</span><span class="pb-value">${q ? fmt(q.premium) : '-'}</span></div>
          <div class="pb-row"><span class="pb-label">Endorsement Premium Impact</span><span class="pb-value" style="color:${premiumImpact >= 0 ? 'var(--success)' : 'var(--danger)'};">${premiumImpact >= 0 ? '+' : ''}${fmt(premiumImpact)}</span></div>
          <div class="pb-row total"><span class="pb-label">New Annual Premium</span><span class="pb-value" style="color:var(--accent);">${fmt(newPremium)}</span></div>
        </div>
        <div style="margin-top:12px;padding:12px;background:var(--accent-dim);border-radius:var(--radius-sm);font-size:12px;color:var(--text-muted);">
          <i class="fas fa-info-circle"></i> Premium recalculated by <strong>Rating Service (simulated)</strong>. This is a standard rating calculation based on the endorsement type and current policy data. Actual premium may vary based on full rating engine evaluation.
        </div>
      </div>

      <div id="tab-endor-decision" class="tab-content">
        ${['APPROVED','REJECTED','PROCESSED','COMPLETED'].includes(r.status) ?
          `<div style="padding:20px;text-align:center;color:var(--text-muted);">
            <i class="fas ${r.decision === 'APPROVED' ? 'fa-check-circle' : 'fa-times-circle'}" style="font-size:48px;color:${r.decision === 'APPROVED' ? 'var(--success)' : 'var(--danger)'};margin-bottom:12px;"></i>
            <h3 style="margin-bottom:4px;">${r.decision === 'APPROVED' ? 'Approved' : 'Rejected'}</h3>
            <p>${r.decisionReason || 'No reason provided'}</p>
            <p style="font-size:12px;margin-top:8px;">Reviewed by ${r.reviewedBy || 'System'} on ${r.processedDate || r.requestedDate}</p>
          </div>` :
          `<div class="form-group">
            <label class="form-label">Decision Reason <i class="info-btn" onclick="showInfo('endorsement')">i</i></label>
            <textarea id="endor-decision-reason" class="form-input" rows="3">${r.requestType === 'Limit Change' ? 'Limit increase approved per UW authority matrix.' : 'Request reviewed and approved per MGA delegation guidelines.'}</textarea>
          </div>
          <div id="endor-decision-error" style="display:none;padding:8px 12px;background:var(--danger-bg);border-radius:var(--radius-sm);color:var(--danger);font-size:13px;margin-top:8px;"></div>
          <div style="margin-top:16px;display:flex;gap:12px;">
            <button class="btn btn-success" style="flex:1;justify-content:center;padding:12px;" onclick="processEndorsementRequest('${r.id}','APPROVED')"><i class="fas fa-check-circle"></i> Approve &amp; Process</button>
            <button class="btn btn-danger" style="flex:1;justify-content:center;padding:12px;" onclick="processEndorsementRequest('${r.id}','REJECTED')"><i class="fas fa-times-circle"></i> Reject</button>
          </div>`
        }
      </div>
    </div>`;
}

function processEndorsementRequest(id, decision) {
  const r = ENDORSEMENT_REQUESTS.find(x => x.id === id);
  if (!r) return;
  const reason = document.getElementById('endor-decision-reason')?.value || '';
  const errorEl = document.getElementById('endor-decision-error');

  if (decision === 'REJECTED' && !reason.trim()) {
    if (errorEl) { errorEl.style.display = 'block'; errorEl.textContent = 'Please provide a reason for rejection.'; }
    return;
  }

  const q = QUOTES.find(x => x.id === r.quoteId);
  if (!q) { alert('Quote not found.'); return; }

  if (decision === 'APPROVED') {
    // 1. Apply endorsement changes
    r.status = 'APPROVED';
    r.decision = 'APPROVED';
    r.decisionReason = reason || 'Approved per standard UW review';
    r.reviewedBy = 'Akhilesh-Salman-Policy';
    r.processedDate = new Date().toISOString().slice(0,10);

    // 2. Call Rating Service (simulated) — calculate premium
    const premiumImpact = ENDO_TYPE_PREMIUMS[r.requestType] || 0;
    const oldPremium = q.premium;

    // 3. Update Quote (last business step)
    q.premium += premiumImpact;

    // 4. Create Transaction
    const txnId = 'TXN-' + String(TRANSACTIONS.length+1).padStart(3,'0');
    TRANSACTIONS.push({
      id:txnId, transactionNo:'TXN-2026-' + String(TRANSACTIONS.length+1).padStart(4,'0'),
      quoteId:r.quoteId, type:'ENDORSEMENT', status:'COMPLETED', sourceSystem:'PAS',
      eventId:'EVT-POLICY-ENDORSED-' + String(TRANSACTIONS.length+1).padStart(3,'0'), eventStatus:'PUBLISHED',
      effectiveDate:r.effectiveDate, requestedBy:r.requestedBy, approvedBy:'Akhilesh-Salman-Policy',
      processedAt:new Date().toISOString(), correlationId:r.correlationId,
      summary:'Endorsement — ' + r.requestType + ' for ' + (q.insuredName) + ', Premium ' + (premiumImpact >= 0 ? '+' : '') + fmt(premiumImpact) + ' (via req ' + r.id + ')',
      createdAt:new Date().toISOString().slice(0,10)
    });

    // 5. Publish PolicyEndorsedEvent (simulated)
    const event = { eventType:'PolicyEndorsed', eventId:'EVT-POLICY-ENDORSED-' + String(TRANSACTIONS.length).padStart(3,'0'), correlationId:r.correlationId, quoteId:r.quoteId, policyNumber:r.policyNumber, timestamp:new Date().toISOString(), payload:r.requestedValues };
    console.log('[EVENT PUBLISHED]', JSON.stringify(event));

    // 6. Call Document Service (simulated) — generate documents
    const docRefs = [
      { name:'Endorsement Schedule — ' + r.requestType, type:'Endorsements', ref:'DOC-END-' + r.id },
      { name:'Revised Declarations Page', type:'Policy Forms', ref:'DOC-DEC-' + r.id },
      { name:'Certificate of Insurance', type:'COI', ref:'DOC-COI-' + r.id }
    ];
    docRefs.forEach(d => {
      DOCUMENTS.push({ id:d.ref, name:d.name, type:d.type, quoteId:r.quoteId, uploadedBy:'Document Service', date:new Date().toISOString().slice(0,10), status:'Final' });
    });

    // 7. Log to Activities
    ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Approved', module:'Endorsement', entity:r.id, details:'Endorsement approved — ' + r.requestType + ' for ' + q.insuredName + ', Premium change: ' + (premiumImpact >= 0 ? '+' : '') + fmt(premiumImpact) + ', TXN: ' + txnId});

    // 8. Audit log
    AUDIT_LOGS.unshift({timestamp:new Date().toISOString().replace('T',' ').slice(0,19), user:'Akhilesh-Salman-Policy', entity:'Quote', entityId:r.quoteId, field:'Premium', oldValue:fmt(oldPremium), newValue:fmt(q.premium), ip:'10.0.1.45'});
    AUDIT_LOGS.unshift({timestamp:new Date().toISOString().replace('T',' ').slice(0,19), user:'Akhilesh-Salman-Policy', entity:'EndorsementRequest', entityId:r.id, field:'Status', oldValue:'IN_REVIEW', newValue:'APPROVED', ip:'10.0.1.45'});

    // 9. Update status to PROCESSED → COMPLETED
    r.status = 'PROCESSED';
    saveData();
    r.status = 'COMPLETED';

    // 10. Activity for completion
    ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'System', action:'Processed', module:'Endorsement', entity:r.id, details:'Endorsement ' + r.id + ' fully processed — Documents generated, Event published'});

  } else {
    // Reject
    r.status = 'REJECTED';
    r.decision = 'REJECTED';
    r.decisionReason = reason || 'Rejected by underwriter';
    r.reviewedBy = 'Akhilesh-Salman-Policy';
    r.processedDate = new Date().toISOString().slice(0,10);

    ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Declined', module:'Endorsement', entity:r.id, details:'Endorsement rejected — ' + r.requestType + ' for ' + q.insuredName + ', Reason: ' + reason});

    AUDIT_LOGS.unshift({timestamp:new Date().toISOString().replace('T',' ').slice(0,19), user:'Akhilesh-Salman-Policy', entity:'EndorsementRequest', entityId:r.id, field:'Status', oldValue:'IN_REVIEW', newValue:'REJECTED', ip:'10.0.1.45'});
  }

  saveData();
  renderEndorsementReview(id);
  setTimeout(() => {
    alert(decision === 'APPROVED' ?
      'Endorsement Approved & Processed!\n\n' +
      'Type: ' + r.requestType + '\n' +
      'Premium Impact: ' + (ENDO_TYPE_PREMIUMS[r.requestType] >= 0 ? '+' : '') + fmt(ENDO_TYPE_PREMIUMS[r.requestType] || 0) + '\n' +
      'Transaction: TXN-' + String(TRANSACTIONS.length).padStart(3,'0') + '\n' +
      'Event: EVT-POLICY-ENDORSED-' + String(TRANSACTIONS.length).padStart(3,'0') + '\n' +
      'Documents: Endorsement Schedule, Revised Declarations, Certificate\n' +
      'Billing: PolicyEndorsedEvent consumed by Billing Service'
    :
      'Endorsement Rejected.\nReason: ' + reason);
    renderEndorsementReqQueue();
  }, 400);
}

// ======== RENEWAL ========
function updateRenewalPreview() {
  const el = document.getElementById('ren-prop-premium');
  const changeEl = document.getElementById('ren-premium-change');
  if (!el || !changeEl) return;
  const q = QUOTES.find(x => x.id === selectedQuoteId);
  if (!q) return;
  const val = parseInt(el.value) || 0;
  const diff = val - q.premium;
  const pct = q.premium ? ((diff / q.premium) * 100).toFixed(1) : '0.0';
  changeEl.textContent = (diff >= 0 ? '+' : '') + fmt(diff) + ' (' + (diff >= 0 ? '+' : '') + pct + '%)';
  changeEl.style.color = diff >= 0 ? 'var(--danger)' : 'var(--success)';
}

function renderRenewal() {
  const container = document.getElementById('ren-dynamic');
  if (!container) return;

  if (!selectedQuoteId) {
    const activeQuotes = QUOTES.filter(q => q.status === 'ACTIVE' && q.policyNumber);
    container.innerHTML = `
      <div class="card glass" style="padding:40px;text-align:center;">
        <i class="fas fa-file-contract" style="font-size:48px;color:var(--text-muted);opacity:0.3;margin-bottom:16px;"></i>
        <h2 style="font-size:20px;margin-bottom:8px;">No Policy Selected</h2>
        <p style="color:var(--text-secondary);margin-bottom:20px;">Please select a policy to create a renewal offer.</p>
        <div style="max-width:400px;margin:0 auto;">
          <select id="ren-quote-select" class="form-input" style="margin-bottom:12px;">
            <option value="">-- Select a Policy --</option>
            ${activeQuotes.map(q => `<option value="${q.id}">${q.policyNumber} — ${q.insuredName} (${fmt(q.premium)})</option>`).join('')}
          </select>
          <button class="btn btn-primary" onclick="const s=document.getElementById('ren-quote-select');if(s.value){selectedQuoteId=s.value;renderRenewal();}else alert('Please select a policy first.')" style="width:100%;justify-content:center;">
            <i class="fas fa-arrow-right"></i> Continue with Selected Policy
          </button>
        </div>
      </div>`;
    return;
  }

  const q = QUOTES.find(x => x.id === selectedQuoteId);
  if (!q) {
    container.innerHTML = '<div class="card glass" style="padding:40px;text-align:center;color:var(--text-muted);">Quote not found.</div>';
    return;
  }

  const daysLeft = Math.ceil((new Date(q.expiration) - new Date()) / (1000*60*60*24));
  const hasOffer = NOTICES.some(n => n.quoteId === selectedQuoteId && n.type === 'RENEWAL_OFFER' && n.status !== 'REJECTED' && n.status !== 'EXPIRED');
  const defaultEffective = new Date(new Date(q.expiration).getTime() + 86400000).toISOString().slice(0,10);
  const defaultExpiration = new Date(new Date(defaultEffective).getTime() + 365*86400000).toISOString().slice(0,10);
  const proposedBase = Math.round(q.basePremium * 1.04);
  const proposedMod = Math.max(0.75, q.modFactor - 0.03);
  const proposedCredit = Math.min(0.15, (q.scheduleCredit || 0) + 0.02);
  const currentSubtotal = Math.round(q.basePremium * q.modFactor * (1 - (q.scheduleCredit || 0)));
  const proposedSubtotal = Math.round(proposedBase * proposedMod * (1 - proposedCredit));
  const proposedTotal = Math.round(proposedSubtotal + Math.round(proposedSubtotal * 0.036) + Math.round(proposedSubtotal * 0.015));
  const change = proposedTotal - q.premium;
  const pctChange = q.premium ? ((change / q.premium) * 100).toFixed(1) : '0.0';

  container.innerHTML = `
    <div class="card glass mb-md">
      <div class="flex-between">
        <div>
          <div style="display:flex;align-items:center;gap:12px;">
            <h1 style="font-size:22px;">Renewal Quote</h1>
            ${hasOffer ? `<span class="chip chip-success"><span class="chip-dot"></span>Offer Sent</span>` : `<span class="chip chip-pending"><span class="chip-dot"></span>Draft</span>`}
          </div>
          <p style="font-size:13px;color:var(--text-secondary);margin-top:4px;">${q.id} / ${q.insuredName} — Expires: ${q.expiration} (${daysLeft} days remaining)</p>
        </div>
      </div>
    </div>

    <div class="card glass">
      <div class="tab-bar" id="ren-tabs">
        <div class="tab-item active" data-tab="ren-quote" onclick="switchTab('ren-tabs','ren-quote')">Quote Comparison</div>
        <div class="tab-item" data-tab="ren-forms" onclick="switchTab('ren-tabs','ren-forms')">Renewal Forms</div>
        <div class="tab-item" data-tab="ren-approval" onclick="switchTab('ren-tabs','ren-approval')">Approval</div>
      </div>
      <div id="tab-ren-quote" class="tab-content active">
        <div class="form-grid" style="margin-bottom:16px;">
          <div class="form-group">
            <label class="form-label">Proposed Total Premium <i class="info-btn" onclick="showInfo('premium')">i</i></label>
            <input id="ren-prop-premium" class="form-input" type="number" value="${proposedTotal}" oninput="updateRenewalPreview()">
            <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Current: ${fmt(q.premium)} | <span id="ren-premium-change" style="font-weight:600;color:${change >= 0 ? 'var(--danger)' : 'var(--success)'};">${change >= 0 ? '+' : ''}${fmt(change)} (${pctChange}%)</span></div>
          </div>
          <div class="form-group">
            <label class="form-label">New Effective Date</label>
            <input id="ren-effective-date" class="form-input" type="date" value="${defaultEffective}">
          </div>
          <div class="form-group">
            <label class="form-label">New Expiration Date</label>
            <input id="ren-expiration-date" class="form-input" type="date" value="${defaultExpiration}">
          </div>
        </div>
        <table class="data-table"><thead><tr><th>Component</th><th>Current</th><th>Proposed</th><th>Change</th></tr></thead><tbody>
          <tr><td>Base Premium</td><td>${fmt(q.basePremium)}</td><td>${fmt(proposedBase)}</td><td style="color:var(--${proposedBase >= q.basePremium ? 'danger' : 'success'});">${proposedBase >= q.basePremium ? '+' : ''}${fmt(proposedBase - q.basePremium)}</td></tr>
          <tr><td>Experience Mod</td><td>${q.modFactor}</td><td>${proposedMod}</td><td style="color:var(--${proposedMod <= q.modFactor ? 'success' : 'danger'});">${proposedMod <= q.modFactor ? '' : '+'}${(proposedMod - q.modFactor).toFixed(2)}</td></tr>
          <tr><td>Schedule Credit</td><td>-${Math.round((q.scheduleCredit||0)*100)}%</td><td>-${Math.round(proposedCredit*100)}%</td><td style="color:var(--success);">-${Math.round((proposedCredit - (q.scheduleCredit||0))*100)}%</td></tr>
          <tr><td style="font-weight:600;">Total Premium</td><td style="font-weight:600;">${fmt(q.premium)}</td><td style="font-weight:600;color:var(--accent);">${fmt(proposedTotal)}</td><td style="font-weight:600;color:var(--${change >= 0 ? 'danger' : 'success'});">${change >= 0 ? '+' : ''}${fmt(change)} (${pctChange}%)</td></tr>
        </tbody></table>
        <div class="flex-between mt-md"><span style="font-size:13px;color:var(--text-muted);"><i class="fas fa-info-circle"></i> PAS can adjust premium up or down. MGA will review and accept/reject the offer.</span></div>
      </div>
      <div id="tab-ren-forms" class="tab-content">
        <div style="font-size:13px;color:var(--text-muted);padding:8px 0;">Renewal documents pending generation</div>
        <div class="doc-item disabled"><div class="doc-icon" style="background:var(--bg-light);color:var(--text-muted);"><i class="fas fa-file-alt"></i></div><div class="doc-info"><div class="doc-name">Renewal Quote Summary</div><div class="doc-meta">Not yet generated</div></div><span class="chip" style="background:var(--glass-bg);color:var(--text-muted);">Pending</span></div>
        <div class="doc-item disabled"><div class="doc-icon" style="background:var(--bg-light);color:var(--text-muted);"><i class="fas fa-file-alt"></i></div><div class="doc-info"><div class="doc-name">Renewal Application</div><div class="doc-meta">Not yet generated</div></div><span class="chip" style="background:var(--glass-bg);color:var(--text-muted);">Pending</span></div>
      </div>
      <div id="tab-ren-approval" class="tab-content">
        <div class="form-group"><label class="form-label">UW Decision <i class="info-btn" onclick="showInfo('uw-decision')">i</i></label><select id="ren-decision" class="form-input"><option value="">-- Select Decision --</option><option value="Approve as Proposed">Approve as Proposed</option><option value="Approve with Changes">Approve with Changes</option><option value="Decline Renewal">Decline Renewal</option></select></div>
        <div class="field-error" id="ren-decision-error"></div>
        <div class="form-group"><label class="form-label">Notes</label><textarea id="ren-notes" class="form-input" rows="3">Rate adequacy review completed. Recommended: Approve.</textarea></div>
        <div id="ren-validation-summary" style="margin-top:12px;display:none;"></div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;padding:12px;" onclick="submitRenewal()"><i class="fas fa-paper-plane"></i> Send Offer to MGA</button>
      </div>
    </div>`;
}

// ======== CANCELLATION ========
function renderCancellation() {
  const container = document.getElementById('cancel-dynamic');
  if (!container) return;

  if (!selectedQuoteId) {
    const activeQuotes = QUOTES.filter(q => q.status === 'ACTIVE' && q.policyNumber);
    container.innerHTML = `
      <div class="card glass" style="padding:40px;text-align:center;">
        <i class="fas fa-file-contract" style="font-size:48px;color:var(--text-muted);opacity:0.3;margin-bottom:16px;"></i>
        <h2 style="font-size:20px;margin-bottom:8px;">No Policy Selected</h2>
        <p style="color:var(--text-secondary);margin-bottom:20px;">Please select a policy to process a cancellation.</p>
        <div style="max-width:400px;margin:0 auto;">
          <select id="cancel-quote-select" class="form-input" style="margin-bottom:12px;">
            <option value="">-- Select a Policy --</option>
            ${activeQuotes.map(q => `<option value="${q.id}">${q.policyNumber} — ${q.insuredName} (${fmt(q.premium)})</option>`).join('')}
          </select>
          <button class="btn btn-primary" onclick="const s=document.getElementById('cancel-quote-select');if(s.value){selectedQuoteId=s.value;renderCancellation();}else alert('Please select a policy first.')" style="width:100%;justify-content:center;">
            <i class="fas fa-arrow-right"></i> Continue with Selected Policy
          </button>
        </div>
      </div>`;
    return;
  }

  const q = QUOTES.find(x => x.id === selectedQuoteId);
  if (!q) {
    container.innerHTML = '<div class="card glass" style="padding:40px;text-align:center;color:var(--text-muted);">Quote not found.</div>';
    return;
  }

  const today = new Date();
  const effective = new Date(q.effective);
  const expiration = new Date(q.expiration);
  const totalDays = Math.max(1, Math.ceil((expiration - effective) / (1000*60*60*24)));
  const daysElapsed = Math.max(0, Math.ceil((today - effective) / (1000*60*60*24)));
  const pctElapsed = Math.min(1, daysElapsed / totalDays);
  const earnedPremium = Math.round(q.premium * pctElapsed);
  const unearnedPremium = q.premium - earnedPremium;

  container.innerHTML = `
    <div class="card glass mb-md">
      <div class="flex-between">
        <div>
          <div style="display:flex;align-items:center;gap:12px;">
            <h1 style="font-size:22px;">Cancel Quote</h1>
            ${window._cancelStatus === 'submitted' ? `<span class="chip chip-cancelled"><span class="chip-dot"></span>Cancelled</span>` : `<span class="chip chip-pending"><span class="chip-dot"></span>Draft</span>`}
          </div>
          <p style="font-size:13px;color:var(--text-secondary);margin-top:4px;">${q.id} / ${q.insuredName} — ${q.effective} to ${q.expiration}</p>
        </div>
      </div>
    </div>
    <div class="card glass">
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Cancellation Type <i class="info-btn" onclick="showInfo('cancellation')">i</i></label><select id="cancel-type" class="form-input" onchange="updateCancelPreview()"><option value="">-- Select --</option><option value="Flat">Flat</option><option value="Pro-Rata">Pro-Rata</option><option value="Short Rate">Short Rate</option><option value="Non-Renewal">Non-Renewal</option></select><div class="field-error" id="cancel-type-error"></div></div>
        <div class="form-group"><label class="form-label">Effective Date</label><input id="cancel-effective-date" class="form-input" type="date" value="${today.toISOString().slice(0,10)}"><div class="field-error" id="cancel-date-error"></div></div>
        <div class="form-group"><label class="form-label">Reason Code <i class="info-btn" onclick="showInfo('cancel-reason')">i</i></label><select id="cancel-reason" class="form-input"><option value="">-- Select --</option><option value="Non-Payment">Non-Payment</option><option value="Underwriting Non-Renewal">Underwriting Non-Renewal</option><option value="Insured Request">Insured Request</option><option value="Duplicate Coverage">Duplicate Coverage</option><option value="Fraud">Fraud</option></select><div class="field-error" id="cancel-reason-error"></div></div>
        <div class="form-group"><label class="form-label">Notice Sent <i class="info-btn" onclick="showInfo('cancel-notice')">i</i></label><select id="cancel-notice" class="form-input"><option value="None">None</option><option value="10-Day Notice" selected>10-Day Notice</option><option value="30-Day Notice">30-Day Notice</option></select></div>
        <div class="form-group full-width"><label class="form-label">Detailed Reason</label><textarea id="cancel-description" class="form-input" rows="3">Insured failed to make payment. Notice sent. No response received.</textarea><div class="field-error" id="cancel-desc-error"></div></div>
      </div>
    </div>
    <div class="card glass mt-md">
      <div class="card-title">Premium Impact <i class="info-btn" onclick="showInfo('cancel-impact')">i</i></div>
      <div id="cancel-impact-content">
        <div class="pb-row"><span class="pb-label">Annual Premium</span><span class="pb-value">${fmt(q.premium)}</span></div>
        <div class="pb-row"><span class="pb-label">Earned Premium (to date)</span><span class="pb-value">${fmt(earnedPremium)}</span></div>
        <div class="pb-row"><span class="pb-label">Unearned Premium</span><span class="pb-value">${fmt(unearnedPremium)}</span></div>
        <div class="pb-row total"><span class="pb-label">Return Premium</span><span class="pb-value" style="color:var(--danger);">-${fmt(unearnedPremium)}</span></div>
      </div>
    </div>
    <div id="cancel-validation-summary" style="margin-top:12px;display:none;"></div>
    <button class="btn btn-danger" style="margin-top:16px;width:100%;justify-content:center;padding:12px;" onclick="submitCancellation()"><i class="fas fa-ban"></i> Submit Cancellation</button>`;
}

function updateCancelPreview() {
  if (!selectedQuoteId) return;
  const q = QUOTES.find(x => x.id === selectedQuoteId);
  if (!q) return;
  const type = document.getElementById('cancel-type')?.value;
  const effectiveDate = document.getElementById('cancel-effective-date')?.value;
  if (!type || !effectiveDate) return;

  const effective = new Date(q.effective);
  const cancelDate = new Date(effectiveDate);
  const totalDays = Math.max(1, Math.ceil((new Date(q.expiration) - effective) / (1000*60*60*24)));
  const daysElapsed = Math.max(0, Math.ceil((cancelDate - effective) / (1000*60*60*24)));
  const pctElapsed = Math.min(1, daysElapsed / totalDays);
  const earnedPremium = Math.round(q.premium * pctElapsed);
  let unearnedPremium = q.premium - earnedPremium;

  if (type === 'Short Rate') {
    unearnedPremium = Math.round(unearnedPremium * 0.9);
  }

  const impactContent = document.getElementById('cancel-impact-content');
  if (impactContent) {
    impactContent.innerHTML = `
      <div class="pb-row"><span class="pb-label">Annual Premium</span><span class="pb-value">${fmt(q.premium)}</span></div>
      <div class="pb-row"><span class="pb-label">Earned Premium (to ${effectiveDate})</span><span class="pb-value">${fmt(earnedPremium)}</span></div>
      <div class="pb-row"><span class="pb-label">Unearned Premium</span><span class="pb-value">${fmt(unearnedPremium)}</span></div>
      <div class="pb-row total"><span class="pb-label">Return Premium</span><span class="pb-value" style="color:var(--danger);">-${fmt(unearnedPremium)}</span></div>`;
  }
}

// ======== REINSTATEMENT ========
function renderReinstatement() {
  const container = document.getElementById('reinstate-dynamic');
  if (!container) return;

  if (!selectedQuoteId) {
    const cancelledQuotes = QUOTES.filter(q => q.status === 'CANCELLED' && q.policyNumber);
    container.innerHTML = `
      <div class="card glass" style="padding:40px;text-align:center;">
        <i class="fas fa-file-contract" style="font-size:48px;color:var(--text-muted);opacity:0.3;margin-bottom:16px;"></i>
        <h2 style="font-size:20px;margin-bottom:8px;">No Cancelled Policy Selected</h2>
        <p style="color:var(--text-secondary);margin-bottom:20px;">Please select a cancelled policy to process reinstatement.</p>
        <div style="max-width:400px;margin:0 auto;">
          <select id="reinstate-quote-select" class="form-input" style="margin-bottom:12px;">
            <option value="">-- Select a Cancelled Policy --</option>
            ${cancelledQuotes.map(q => `<option value="${q.id}">${q.policyNumber} — ${q.insuredName} (Cancelled: ${q.expiration})</option>`).join('')}
          </select>
          <button class="btn btn-primary" onclick="const s=document.getElementById('reinstate-quote-select');if(s.value){selectedQuoteId=s.value;renderReinstatement();}else alert('Please select a policy first.')" style="width:100%;justify-content:center;">
            <i class="fas fa-arrow-right"></i> Continue with Selected Policy
          </button>
        </div>
      </div>`;
    return;
  }

  const q = QUOTES.find(x => x.id === selectedQuoteId);
  if (!q) {
    container.innerHTML = '<div class="card glass" style="padding:40px;text-align:center;color:var(--text-muted);">Quote not found.</div>';
    return;
  }

  const cancelledDate = new Date(q.expiration);
  const today = new Date();
  const daysSinceCancel = Math.ceil((today - cancelledDate) / (1000*60*60*24));
  const withinWindow = daysSinceCancel <= 30;

  container.innerHTML = `
    <div class="card glass mb-md">
      <div class="flex-between">
        <div>
          <div style="display:flex;align-items:center;gap:12px;">
            <h1 style="font-size:22px;">Reinstatement Request</h1>
            ${window._reinstateStatus === 'submitted' ? `<span class="chip chip-success"><span class="chip-dot"></span>Processed</span>` : `<span class="chip chip-pending"><span class="chip-dot"></span>${withinWindow ? 'Within Window' : 'Outside Window'}</span>`}
          </div>
          <p style="font-size:13px;color:var(--text-secondary);margin-top:4px;">${q.id} / ${q.insuredName} — Cancelled: ${q.expiration} (${daysSinceCancel} days ago)</p>
        </div>
      </div>
    </div>

    <div class="card glass">
      <div class="card-title">Quote Information <i class="info-btn" onclick="showInfo('reinstatement')">i</i></div>
      <div class="summary-card glass-sm">
        <div class="sc-item"><div class="sc-label">Original Effective</div><div class="sc-value">${q.effective}</div></div>
        <div class="sc-item"><div class="sc-label">Original Expiration</div><div class="sc-value">${q.expiration}</div></div>
        <div class="sc-item"><div class="sc-label">Annual Premium</div><div class="sc-value">${fmt(q.premium)}</div></div>
        <div class="sc-item"><div class="sc-label">Cancellation Reason</div><div class="sc-value" style="font-size:14px;">Non-Payment</div></div>
      </div>
      ${!withinWindow ? `<div style="margin-top:12px;padding:12px;background:var(--danger-bg);border-radius:var(--radius-sm);color:var(--danger);font-size:13px;"><i class="fas fa-exclamation-triangle"></i> Reinstatement window (30 days) has passed. Senior UW approval required.</div>` : ''}
    </div>

    <div class="card glass">
      <div class="card-title">Reinstatement Details <i class="info-btn" onclick="showInfo('reinstatement-window')">i</i></div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Reinstatement Effective Date <i class="info-btn" onclick="showInfo('effective-date')">i</i></label><input id="reinstate-effective-date" class="form-input" type="date" value="${today.toISOString().slice(0,10)}"><div class="field-error" id="reinstate-date-error"></div></div>
        <div class="form-group"><label class="form-label">Reinstatement Reason</label><select id="reinstate-reason" class="form-input"><option value="">-- Select --</option><option value="Payment Received — Full Balance">Payment Received — Full Balance</option><option value="Payment Received — Partial Agreement">Payment Received — Partial Agreement</option><option value="Underwriting Review Reversal">Underwriting Review Reversal</option><option value="Insured Dispute Resolved">Insured Dispute Resolved</option></select><div class="field-error" id="reinstate-reason-error"></div></div>
        <div class="form-group"><label class="form-label">Reinstatement Fee <i class="info-btn" onclick="showInfo('reinstatement-fee')">i</i></label><input class="form-input" value="$250.00" readonly></div>
        <div class="form-group"><label class="form-label">Return Premium Reversal</label><input class="form-input" value="${fmt(Math.round(q.premium * 0.3))}" readonly></div>
        <div class="form-group full-width"><label class="form-label">UW Notes</label><textarea id="reinstate-notes" class="form-input" rows="3">Insured has resolved outstanding issues. Reinstatement ${withinWindow ? 'within 30-day window' : 'requires senior UW approval'}.</textarea></div>
      </div>
    </div>

    <div class="card glass mt-md">
      <div class="card-title">Reinstatement Impact</div>
      <div class="pb-row"><span class="pb-label">Premium to be Reinstated</span><span class="pb-value">${fmt(q.premium)}</span></div>
      <div class="pb-row"><span class="pb-label">Reinstatement Fee</span><span class="pb-value" style="color:var(--warning);">$250</span></div>
      <div class="pb-row"><span class="pb-label">Past Due Balance</span><span class="pb-value" style="color:var(--success);">$0.00 (Paid)</span></div>
      <div class="pb-row total"><span class="pb-label">Total Due Today</span><span class="pb-value" style="color:var(--warning);">$250</span></div>
    </div>

    <div id="reinstate-validation-summary" style="margin-top:12px;display:none;"></div>
    <div class="flex mt-md" style="gap:12px;">
      <button class="btn btn-success" style="flex:1;justify-content:center;padding:12px;" onclick="submitReinstatement(true)"><i class="fas fa-check-circle"></i> Approve Reinstatement</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center;padding:12px;" onclick="submitReinstatement(false)"><i class="fas fa-times"></i> Decline</button>
    </div>`;
}

// ======== SUBMIT ACTIONS ========
function submitRenewal() {
  const decision = document.getElementById('ren-decision')?.value;
  document.getElementById('ren-decision-error').textContent = '';

  if (!decision) {
    document.getElementById('ren-decision-error').textContent = 'Please select a UW decision.';
    const summary = document.getElementById('ren-validation-summary');
    if (summary) {
      summary.style.display = 'block';
      summary.innerHTML = '<div style="padding:12px;background:var(--danger-bg);border-radius:var(--radius-sm);color:var(--danger);font-size:13px;"><i class="fas fa-exclamation-circle"></i> UW Decision is required before submitting.</div>';
    }
    return;
  }

  if (!selectedQuoteId) { alert('No quote selected.'); return; }
  const q = QUOTES.find(x => x.id === selectedQuoteId);
  if (!q) return;

  if (decision === 'Decline Renewal') {
    ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Declined', module:'Renewal', entity:selectedQuoteId, details:'Renewal declined — ' + q.insuredName});
    saveData();
    alert('Renewal declined for ' + q.insuredName + '. No offer created.');
    showScreen('policies');
    return;
  }

  const proposedPremium = parseInt(document.getElementById('ren-prop-premium')?.value) || q.premium;
  const proposedEffective = document.getElementById('ren-effective-date')?.value || new Date(new Date(q.expiration).getTime() + 86400000).toISOString().slice(0,10);
  const proposedExpiration = document.getElementById('ren-expiration-date')?.value || new Date(new Date(proposedEffective).getTime() + 365*86400000).toISOString().slice(0,10);

  const proposedBase = Math.round(q.basePremium * (proposedPremium / q.premium));
  const proposedMod = q.modFactor;
  const proposedCredit = q.scheduleCredit || 0;

  const ntcId = 'NTC-' + String(NOTICES.length+1).padStart(3,'0');
  NOTICES.push({
    id:ntcId, quoteId:selectedQuoteId, policyNumber:q.policyNumber, type:'RENEWAL_OFFER', status:'DRAFT',
    generatedDate:null, sentDate:null, acknowledgedDate:null, deliveredDate:null,
    decisionDate:null, decision:null, premium:q.premium, coverage:q.coverage,
    proposedValues: {
      premium: proposedPremium,
      basePremium: proposedBase,
      modFactor: proposedMod,
      scheduleCredit: proposedCredit,
      effectiveDate: proposedEffective,
      expirationDate: proposedExpiration
    },
    createdDate:new Date().toISOString().slice(0,10)
  });

  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Updated', module:'Quote', entity:selectedQuoteId, details:'Renewal offer created — ' + decision + ', Premium: ' + fmt(proposedPremium) + ', Notice: ' + ntcId});
  saveData();
  renderRenewal();
  setTimeout(() => {
    alert('Renewal offer sent to MGA!\nPolicy: ' + q.policyNumber + '\nProposed Premium: ' + fmt(proposedPremium) + '\nEffective: ' + proposedEffective + '\nNotice: ' + ntcId + '\nGo to Notice Management for MGA workflow.');
    showScreen('notice-management');
  }, 300);
}

function submitCancellation() {
  const type = document.getElementById('cancel-type')?.value;
  const effectiveDate = document.getElementById('cancel-effective-date')?.value;
  const reason = document.getElementById('cancel-reason')?.value;
  const desc = document.getElementById('cancel-description')?.value;

  document.querySelectorAll('#cancel-dynamic .field-error').forEach(e => e.textContent = '');
  let errors = [];

  if (!type) { errors.push('Cancellation Type is required.'); document.getElementById('cancel-type-error').textContent = 'Please select a type.'; }
  if (!effectiveDate) { errors.push('Effective Date is required.'); document.getElementById('cancel-date-error').textContent = 'Please select a date.'; }
  if (!reason) { errors.push('Reason Code is required.'); document.getElementById('cancel-reason-error').textContent = 'Please select a reason.'; }

  if (errors.length > 0) {
    const summary = document.getElementById('cancel-validation-summary');
    if (summary) {
      summary.style.display = 'block';
      summary.innerHTML = `<div style="padding:12px;background:var(--danger-bg);border-radius:var(--radius-sm);color:var(--danger);font-size:13px;"><i class="fas fa-exclamation-circle"></i> ${errors.join('<br>')}</div>`;
    }
    return;
  }

  if (!selectedQuoteId) { alert('No quote selected.'); return; }
  const q = QUOTES.find(x => x.id === selectedQuoteId);
  if (!q) return;

  // Create cancellation notice
  const ntcId = 'NTC-' + String(NOTICES.length+1).padStart(3,'0');
  NOTICES.push({
    id:ntcId, quoteId:selectedQuoteId, policyNumber:q.policyNumber, type:'CANCELLATION_NOTICE', status:'DRAFT',
    generatedDate:null, sentDate:null, acknowledgedDate:null, deliveredDate:null,
    decisionDate:null, decision:null, premium:q.premium, coverage:q.coverage,
    createdDate:new Date().toISOString().slice(0,10)
  });

  window._cancelStatus = 'submitted';
  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Updated', module:'Quote', entity:selectedQuoteId, details:'Cancellation initiated — ' + reason + ', Type: ' + type + ', Effective: ' + effectiveDate + ', Notice: ' + ntcId});
  saveData();
  renderCancellation();
  setTimeout(() => {
    alert('Cancellation submitted!\nType: ' + type + '\nReason: ' + reason + '\nEffective: ' + effectiveDate + '\nNotice: ' + ntcId + '\nGo to Notice Management to process the MGA workflow.');
    showScreen('notice-management');
  }, 300);
}

function submitReinstatement(approved) {
  const date = document.getElementById('reinstate-effective-date')?.value;
  const reason = document.getElementById('reinstate-reason')?.value;

  document.querySelectorAll('#reinstate-dynamic .field-error').forEach(e => e.textContent = '');

  if (approved) {
    let errors = [];
    if (!date) { errors.push('Effective Date is required.'); document.getElementById('reinstate-date-error').textContent = 'Please select a date.'; }
    if (!reason) { errors.push('Reinstatement Reason is required.'); document.getElementById('reinstate-reason-error').textContent = 'Please select a reason.'; }

    if (errors.length > 0) {
      const summary = document.getElementById('reinstate-validation-summary');
      if (summary) {
        summary.style.display = 'block';
        summary.innerHTML = `<div style="padding:12px;background:var(--danger-bg);border-radius:var(--radius-sm);color:var(--danger);font-size:13px;"><i class="fas fa-exclamation-circle"></i> ${errors.join('<br>')}</div>`;
      }
      return;
    }
  }

  if (!selectedQuoteId) { alert('No quote selected.'); return; }
  const q = QUOTES.find(x => x.id === selectedQuoteId);
  if (!q) return;

  if (approved) {
    const ntcId = 'NTC-' + String(NOTICES.length+1).padStart(3,'0');
    NOTICES.push({
      id:ntcId, quoteId:selectedQuoteId, policyNumber:q.policyNumber, type:'REINSTATEMENT_OFFER', status:'DRAFT',
      generatedDate:null, sentDate:null, acknowledgedDate:null, deliveredDate:null,
      decisionDate:null, decision:null, premium:q.premium, coverage:q.coverage,
      createdDate:new Date().toISOString().slice(0,10)
    });
    ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Updated', module:'Quote', entity:selectedQuoteId, details:'Reinstatement initiated — Notice: ' + ntcId});
  }

  window._reinstateStatus = 'submitted';
  saveData();
  renderReinstatement();
  setTimeout(() => {
    alert(approved ? 'Reinstatement initiated!\nGo to Notice Management to process the MGA workflow.' : 'Reinstatement declined.');
    showScreen('notice-management');
  }, 300);
}

// ======== UW QUEUE (legacy — kept for cleanup) ========
function renderUWQueue() {
  const container = document.getElementById('uw-queue-body');
  if (!container) return;

  const newCount = UW_QUEUE.filter(u => u.status === 'New').length;
  const reviewCount = UW_QUEUE.filter(u => u.status === 'In Review').length;
  const referredCount = UW_QUEUE.filter(u => u.status === 'Referred').length;
  const avgScore = Math.round(UW_QUEUE.reduce((s,u) => s + u.score, 0) / UW_QUEUE.length * 10) / 10;

  const summary = document.querySelector('#screen-uw-queue .summary-card');
  if (summary) {
    summary.innerHTML = `
      <div class="sc-item"><div class="sc-label">New</div><div class="sc-value" style="color:var(--warning);">${newCount}</div></div>
      <div class="sc-item"><div class="sc-label">In Review</div><div class="sc-value" style="color:var(--info);">${reviewCount}</div></div>
      <div class="sc-item"><div class="sc-label">Referred</div><div class="sc-value" style="color:var(--purple);">${referredCount}</div></div>
      <div class="sc-item"><div class="sc-label">Avg Score</div><div class="sc-value">${avgScore}</div></div>`;
  }

  container.innerHTML = UW_QUEUE.map(u => {
    const scoreColor = u.score >= 7 ? 'var(--success)' : u.score >= 5 ? 'var(--warning)' : 'var(--danger)';
    const showActions = u.status === 'New' || u.status === 'In Review';
    const isSelected = selectedSubmissionId === u.id;
    return `<tr data-sub-id="${u.id}" onclick="viewSubmission('${u.id}')" style="cursor:pointer;" class="${isSelected ? 'selected' : ''}">
      <td class="col-id">${u.submissionId}</td>
      <td>${u.insured}</td>
      <td>${u.lob}</td>
      <td>${fmt(u.premium)}</td>
      <td><span style="font-weight:600;color:${scoreColor};">${u.score}</span></td>
      <td>${u.daysInQueue}</td>
      <td>${chip(u.status)}</td>
      <td>${u.assignedTo}</td>
      <td class="actions-cell">
        ${showActions ? `
          <button class="btn btn-success btn-xs" onclick="event.stopPropagation();uwDecision('${u.id}','Approved')"><i class="fas fa-check"></i> Approve</button>
          <button class="btn btn-warning btn-xs" onclick="event.stopPropagation();uwDecision('${u.id}','Referred')"><i class="fas fa-user-check"></i> Refer</button>
          <button class="btn btn-danger btn-xs" onclick="event.stopPropagation();uwDecision('${u.id}','Declined')"><i class="fas fa-times"></i> Decline</button>
        ` : u.status === 'Referred' ? `<span style="font-size:11px;color:var(--text-muted);">Pending senior review</span>` : `<span style="font-size:11px;color:var(--text-muted);">${u.status}</span>`}
      </td>
    </tr>`;
  }).join('');
}

function uwDecision(id, decision) {
  const u = UW_QUEUE.find(x => x.id === id);
  if (!u) return;
  u.status = decision;
  // Add activity
  ACTIVITIES.unshift({
    timestamp: new Date().toLocaleString('en-US', {month:'2-digit',day:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:true}).replace(',',''),
    user: 'Akhilesh-Salman-Policy',
    action: decision === 'Approved' ? 'Approved' : decision === 'Referred' ? 'Referred' : 'Declined',
    module: 'Underwriting',
    entity: u.submissionId,
    details: `UW decision: ${decision} — ${u.insured}`
  });
  AUDIT_LOGS.unshift({
    timestamp: new Date().toISOString().replace('T',' ').slice(0,19),
    user: 'Akhilesh-Salman-Policy',
    entity: 'Submission',
    entityId: u.submissionId,
    field: 'UW Decision',
    oldValue: 'Pending',
    newValue: decision,
    ip: '10.0.1.45'
  });

  if (decision === 'Approved') {
    // Create new policy from approved submission
    const newId = 'POL-2026-0' + (POLICIES.length + 1);
    POLICIES.push({
      id: newId,
      insured: u.insured,
      fein: 'XX-XXXXXXX',
      lob: u.lob === 'GL' ? 'General Liability' : u.lob === 'WC' ? 'Workers Compensation' : u.lob === 'Auto' ? 'Auto Liability' : 'Professional Liability',
      status: 'Active',
      effective: new Date().toISOString().slice(0,10),
      expiration: new Date(Date.now() + 365*24*60*60*1000).toISOString().slice(0,10),
      premium: u.premium,
      uw: u.assignedTo,
      agent: 'Marsh Inc.',
      term: 'Annual',
      billingPlan: 'Quarterly',
      paymentMethod: 'ACH',
      coverage: u.lob,
      deductible: 10000,
      limit: 2000000,
      ratingBasis: 'Revenue',
      basePremium: Math.round(u.premium * 0.78),
      modFactor: 1.0,
      scheduleCredit: 0,
      slaTax: Math.round(u.premium * 0.036),
      stampingFee: Math.round(u.premium * 0.015),
      created: new Date().toISOString().slice(0,10),
      submitted: new Date().toISOString().slice(0,10),
      uwa: u.assignedTo,
      uwaDate: new Date().toISOString().slice(0,10)
    });
  }

  if (selectedSubmissionId) renderSubmissionDetail(selectedSubmissionId);
  renderUWQueue();
  renderDashboard();
  saveData();
}

// ======== SUBMISSION DETAIL ========
function renderSubmissionDetail(id) {
  const container = document.getElementById('submission-detail-body');
  if (!container) return;

  if (!id) {
    container.innerHTML = '<div class="sd-placeholder" style="font-size:13px;color:var(--text-muted);padding:20px;text-align:center;"><i class="fas fa-arrow-left"></i> Click any row to view full submission details</div>';
    return;
  }

  const u = UW_QUEUE.find(x => x.id === id);
  const s = SUBMISSIONS.find(x => x.id === u?.submissionId);
  if (!u) {
    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);">Submission not found</div>';
    return;
  }

  const scoreColor = u.score >= 7 ? 'var(--success)' : u.score >= 5 ? 'var(--warning)' : 'var(--danger)';

  container.innerHTML = `
    <div class="summary-card glass-sm">
      <div class="sc-item"><div class="sc-label">Submission ID</div><div class="sc-value" style="font-family:monospace;">${u.submissionId}</div></div>
      <div class="sc-item"><div class="sc-label">Insured Name</div><div class="sc-value" style="font-size:16px;">${u.insured}</div></div>
      <div class="sc-item"><div class="sc-label">Line of Business</div><div class="sc-value">${u.lob}</div></div>
      <div class="sc-item"><div class="sc-label">Premium</div><div class="sc-value" style="color:var(--accent);">${fmt(u.premium)}</div></div>
      <div class="sc-item"><div class="sc-label">Score</div><div class="sc-value" style="font-weight:600;color:${scoreColor};">${u.score}/10</div></div>
      <div class="sc-item"><div class="sc-label">Days in Queue</div><div class="sc-value">${u.daysInQueue}</div></div>
      <div class="sc-item"><div class="sc-label">Status</div><div class="sc-value">${chip(u.status)}</div></div>
      <div class="sc-item"><div class="sc-label">Assigned To</div><div class="sc-value">${u.assignedTo}</div></div>
      ${s ? `<div class="sc-item"><div class="sc-label">Submitted Date</div><div class="sc-value">${s.submittedDate || '-'}</div></div>` : ''}
    </div>
    <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
      ${(u.status === 'New' || u.status === 'In Review') ? `
        <button class="btn btn-success btn-sm" onclick="uwDecision('${u.id}','Approved')"><i class="fas fa-check"></i> Approve</button>
        <button class="btn btn-warning btn-sm" onclick="uwDecision('${u.id}','Referred')"><i class="fas fa-user-check"></i> Refer to Senior</button>
        <button class="btn btn-danger btn-sm" onclick="uwDecision('${u.id}','Declined')"><i class="fas fa-times"></i> Decline</button>
      ` : u.status === 'Referred' ? `<span style="font-size:13px;color:var(--text-muted);padding:8px 0;"><i class="fas fa-info-circle"></i> Awaiting senior UW review</span>`
      : `<span style="font-size:13px;color:var(--text-muted);padding:8px 0;"><i class="fas fa-check-circle" style="color:var(--success);"></i> Decision: ${u.status}</span>`}
    </div>`;
}

// ======== EXPORT CSV ========
function exportCSV() {
  let csv = 'Policy #,Insured,LOB,Status,Effective,Expiration,Premium,UW,Agent\n';
  POLICIES.forEach(p => {
    csv += `${p.id},"${p.insured}",${p.lob},${p.status},${p.effective},${p.expiration},${p.premium},${p.uw},"${p.agent}"\n`;
  });
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'policies_export_' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
  URL.revokeObjectURL(url);
  ACTIVITIES.unshift({timestamp: new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Exported', module:'Policy Search', entity:'CSV', details:'Exported policy list to CSV'});
  saveData();
}

// ======== NEW SUBMISSION ========
function submitNewSubmission() {
  const name = document.querySelector('#screen-new-submission .form-row:first-child .form-group:first-child .form-input')?.value || 'New Insured';
  const lob = document.querySelector('#screen-new-submission select')?.value || 'General Liability';
  const prem = 87500;

  const subId = 'SUB-2026-' + (100 + SUBMISSIONS.length + 1);
  SUBMISSIONS.push({ id:subId, insured:name, lob, premium:prem, status:'New', submittedDate:new Date().toISOString().slice(0,10), assignedTo:'Akhilesh-Salman-Policy', score:Math.floor(Math.random()*5)+3 });
  UW_QUEUE.push({ id:'UWO-0'+(UW_QUEUE.length+1), submissionId:subId, insured:name, lob:lob.slice(0,4), premium:prem, score:Math.floor(Math.random()*5)+3, daysInQueue:0, status:'New', assignedTo:'Akhilesh-Salman-Policy' });

  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Created', module:'Submission', entity:subId, details:`New submission for ${name}`});
  saveData();
  alert('Submission created: ' + subId + '\nSubmitted to Underwriting Queue.');
  showScreen('uw-queue');
}

// ======== BILLING ========
function renderBilling() {
  const container = document.getElementById('billing-schedule-body');
  if (!container) return;
  const allBilling = [];
  Object.keys(BILLING_SCHEDULES).forEach(qid => {
    const q = QUOTES.find(x => x.id === qid);
    BILLING_SCHEDULES[qid].forEach(b => {
      allBilling.push({...b, quoteId:qid, insured: q?.insuredName || 'Unknown'});
    });
  });

  const totalOutstanding = allBilling.filter(b => b.status === 'Overdue' || b.status === 'Upcoming').reduce((s,b) => s + b.amountDue, 0);
  const header = document.querySelector('#screen-billing .page-header .actions span');
  if (header) header.textContent = 'Total Outstanding: ' + fmt(totalOutstanding);

  container.innerHTML = allBilling.map(b => {
    const statusBadge = b.status === 'Paid' ? chip('Paid') : b.status === 'Overdue' ? chip('Cancelled','Overdue') : chip('Upcoming');
    const actionBtn = b.status === 'Paid' ? `<button class="btn btn-xs" style="background:var(--glass-bg);">Receipt</button>`
      : b.status === 'Overdue' ? `<button class="btn btn-primary btn-xs" onclick="alert('Payment processing — not implemented in this phase')"><i class="fas fa-credit-card"></i> Pay Now</button>`
      : `<button class="btn btn-xs disabled" disabled>N/A</button>`;
    return `<tr><td class="col-id">${b.quoteId}</td><td>${b.insured}</td><td>${b.inst}/${allBilling.filter(x=>x.quoteId===b.quoteId).length}</td><td>${fmt(b.amountDue)}</td><td>${b.dueDate}</td><td>${statusBadge}</td><td>${actionBtn}</td></tr>`;
  }).join('');

  const txContainer = document.getElementById('billing-transactions-body');
  if (txContainer) {
    const txns = allBilling.filter(b => b.status === 'Paid').map(b => ({
      date: b.paidDate || b.dueDate,
      type: 'Premium Payment',
      method: 'ACH',
      ref: 'ACH-' + b.dueDate.replace(/-/g,''),
      amount: b.amountDue,
      status: 'Settled'
    }));
    txContainer.innerHTML = txns.map(t => `<tr><td>${t.date}</td><td>${t.type}</td><td>${t.method}</td><td>${t.ref}</td><td>${fmt(t.amount)}</td><td>${chip('Active','Settled')}</td></tr>`).join('');
  }
}

// ======== DOCUMENTS ========
function renderDocuments() {
  const container = document.getElementById('documents-body');
  if (!container) return;
  container.innerHTML = DOCUMENTS.map(d => {
    const icons = { Application:'fa-file-alt', 'Policy Forms':'fa-file-contract', Endorsements:'fa-pen-alt', Correspondence:'fa-envelope', Claims:'fa-file-invoice', COI:'fa-file-certificate', Inspection:'fa-clipboard-check', Billing:'fa-file-invoice-dollar' };
    const colors = { Application:'var(--accent)', 'Policy Forms':'var(--success)', Endorsements:'var(--cyan)', Correspondence:'var(--warning)', Claims:'var(--danger)', COI:'var(--purple)', Inspection:'var(--info)', Billing:'var(--gray)' };
    const icon = icons[d.type] || 'fa-file';
    const color = colors[d.type] || 'var(--text-muted)';
    return `<tr><td><div style="display:flex;align-items:center;gap:8px;"><i class="fas ${icon}" style="color:${color};"></i> ${d.name}</div></td>
      <td class="col-id">${d.quoteId}</td><td>${d.type}</td><td>${chip(d.status)}</td><td>${d.uploadedBy}</td><td>${d.date}</td>
      <td><a href="#" style="color:var(--accent);font-size:12px;" onclick="event.preventDefault();viewDocument('${d.id}')">View</a></td></tr>`;
  }).join('');
}

function viewDocument(id) {
  const doc = DOCUMENTS.find(d => d.id === id);
  if (!doc) return;
  document.getElementById('doc-viewer-title').textContent = doc.name;
  document.getElementById('doc-viewer-modal').classList.add('open');
  const body = document.getElementById('doc-viewer-body');
  if (doc.contentType === 'form') {
    body.innerHTML = '<div class="doc-viewer-form">' + doc.content.split('\n').map(line => {
      const idx = line.indexOf(':');
      if (idx === -1) return `<div class="dv-section">${line}</div>`;
      return `<div class="dv-row"><span class="dv-label">${line.slice(0, idx).trim()}</span><span class="dv-value">${line.slice(idx + 1).trim()}</span></div>`;
    }).join('') + '</div>';
  } else {
    body.innerHTML = `<div style="white-space:pre-wrap;font-size:13px;line-height:1.7;color:var(--text-secondary);">${doc.content}</div>`;
  }
}

function closeDocViewer() {
  document.getElementById('doc-viewer-modal').classList.remove('open');
}

// ======== NOTES ========
function renderNotes() {
  const container = document.getElementById('notes-list');
  if (!container) return;
  container.innerHTML = NOTES.map(n => `
    <div class="note-card glass-sm mb-sm">
      <div class="nc-header"><div class="nc-author"><div class="nc-avatar">${n.author.split(' ').map(w=>w[0]).join('')}</div>
        <div><div class="nc-name">${n.author}</div><div class="nc-role">${n.role}</div></div>
      </div><span class="nc-time">${n.timestamp}</span></div>
      <div class="nc-text">${n.content}</div>
      <div class="nc-policy" style="font-size:11px;color:var(--text-muted);margin-top:4px;">${n.quoteId}</div>
    </div>`).join('');
}

// ======== ACTIVITIES ========
function renderActivities() {
  const actContainer = document.getElementById('activities-feed');
  if (actContainer) {
    const icons = { Created:'fa-file-contract', Approved:'fa-check-circle', Updated:'fa-pen-alt', Uploaded:'fa-upload', Referred:'fa-user-check', Submitted:'fa-paper-plane', Issued:'fa-file-contract', Payment:'fa-credit-card', Exported:'fa-download', Declined:'fa-ban' };
    const colors = { Created:'var(--accent-dim);color:var(--accent)', Approved:'var(--success-bg);color:var(--success)', Updated:'var(--purple-dim);color:var(--purple)', Uploaded:'var(--accent-dim);color:var(--accent)', Referred:'var(--warning-bg);color:var(--warning)', Submitted:'var(--info-dim);color:var(--info)', Issued:'var(--success-bg);color:var(--success)', Payment:'var(--cyan-bg);color:var(--cyan)', Exported:'var(--gray-bg);color:var(--gray)', Declined:'var(--danger-bg);color:var(--danger)' };
    actContainer.innerHTML = ACTIVITIES.slice(0,10).map(a => {
      const ic = icons[a.action] || 'fa-circle';
      const cl = colors[a.action] || 'var(--gray-bg);color:var(--gray)';
      return `<div class="activity-item"><div class="act-icon" style="background:${cl}"><i class="fas ${ic}"></i></div>
        <div class="act-content"><div class="act-title">${a.action} ${a.module}</div>
        <div class="act-desc">${a.details}</div><div class="act-meta">${a.user} · ${a.timestamp}</div></div></div>`;
    }).join('');
  }

  const auditContainer = document.getElementById('audit-log-body');
  if (auditContainer) {
    auditContainer.innerHTML = AUDIT_LOGS.slice(0,15).map(a => `<tr>
      <td style="font-size:12px;">${a.timestamp}</td><td>${a.user}</td><td>${a.field}</td><td>${a.entity}</td><td class="col-id">${a.entityId}</td>
      <td style="font-size:12px;color:var(--text-muted);">${a.oldValue || '-'} → ${a.newValue}</td>
    </tr>`).join('');
  }
}

// ======== ADMIN ========
function renderAdmin() {
  const usersContainer = document.getElementById('admin-users-body');
  if (usersContainer) {
    usersContainer.innerHTML = USERS.map(u => `<tr>
      <td><div style="display:flex;align-items:center;gap:8px;"><div class="nc-avatar" style="width:28px;height:28px;font-size:11px;">${u.name.split(' ').map(w=>w[0]).join('')}</div> ${u.name}</div></td>
      <td>${u.email}</td><td>${u.role}</td><td>${chip(u.status)}</td><td>${u.lastLogin}</td>
    </tr>`).join('');
  }

  const rolesContainer = document.getElementById('admin-roles-body');
  if (rolesContainer) {
    rolesContainer.innerHTML = ROLES.map(r => `<tr>
      <td>${r.name}</td><td>${r.userCount}</td><td style="font-size:12px;">${r.description}</td>
    </tr>`).join('');
  }

  const settingsContainer = document.getElementById('admin-settings-body');
  if (settingsContainer) {
    settingsContainer.innerHTML = SYSTEM_SETTINGS.map(s => `<div class="detail-item">
      <div class="di-label">${s.key.replace(/_/g,' ').toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())}</div>
      <div class="di-value">${s.value}</div>
    </div>`).join('');
  }
}

// ======== QUOTE DETAILS ========
function renderQuoteDetails(id) {
  const container = document.getElementById('qd-dynamic');
  if (!container) return;
  if (!id) {
    container.innerHTML = '<div style="padding:60px 20px;text-align:center;color:var(--text-muted);font-size:15px;"><i class="fas fa-file-contract" style="font-size:48px;margin-bottom:16px;opacity:0.3;"></i><p>No quote selected.</p><p style="margin-top:8px;font-size:13px;">Go to <a href="#" onclick="showScreen(\'quotes\');return false;" style="color:var(--accent);">Quotes</a> and click on a quote to view details.</p></div>';
    return;
  }
  const q = QUOTES.find(x => x.id === id);
  if (!q) return;

  const daysLeft = Math.ceil((new Date(q.expiration) - new Date()) / (1000*60*60*24));
  const trans = TRANSACTIONS.filter(t => t.quoteId === id);
  const docs = DOCUMENTS.filter(d => d.quoteId === id);
  const notes = NOTES.filter(n => n.quoteId === id);
  const audits = AUDIT_LOGS.filter(a => a.entityId === id);
  const billing = BILLING_SCHEDULES[id] || [];

  const isApproved = q.status === 'APPROVED' && !q.policyNumber;
  const isActive = q.status === 'ACTIVE';
  const isCancelled = q.status === 'CANCELLED';

  container.innerHTML = `
    <div class="card glass mb-md">
      <div class="flex-between">
        <div>
          <div style="display:flex;align-items:center;gap:12px;">
            <h1 style="font-size:22px;font-family:monospace;">${q.id}</h1>
            ${chip(q.status)}
            ${q.policyNumber ? `<span style="font-size:12px;color:var(--text-muted);margin-left:8px;">Policy: ${q.policyNumber}</span>` : ''}
          </div>
          <p style="color:var(--text-secondary);margin-top:4px;">${q.insuredName}</p>
          <p style="font-size:12px;color:var(--text-muted);margin-top:2px;">Effective: ${q.effective} | Expires: ${q.expiration} | <span style="color:${daysLeft < 60 ? 'var(--warning)' : daysLeft < 30 ? 'var(--danger)' : 'var(--success)'};">${daysLeft} days remaining</span></p>
        </div>
        <div class="actions" style="gap:8px;">
          ${isApproved ? `<button class="btn btn-primary btn-sm" onclick="showIssueModal('${q.id}')"><i class="fas fa-file-contract"></i> Issue Policy</button>` : ''}
          ${isActive ? `<button class="btn btn-primary btn-sm" onclick="selectedQuoteId='${q.id}';showScreen('endorsement-req-queue')"><i class="fas fa-pen-alt"></i> Endorse</button>` : ''}
          ${isActive ? `<button class="btn btn-success btn-sm" onclick="selectedQuoteId='${q.id}';showScreen('renewal')"><i class="fas fa-sync-alt"></i> Renew</button>` : ''}
          ${isActive ? `<button class="btn btn-danger btn-sm" onclick="selectedQuoteId='${q.id}';showScreen('cancellation')"><i class="fas fa-ban"></i> Cancel</button>` : ''}
          ${isCancelled ? `<button class="btn btn-warning btn-sm" onclick="selectedQuoteId='${q.id}';showScreen('reinstatement')"><i class="fas fa-undo-alt"></i> Reinstate</button>` : ''}
        </div>
      </div>
    </div>

    <div class="card glass">
      <div class="tab-bar" id="qd-tabs">
        <div class="tab-item active" data-tab="qd-details" onclick="switchTab('qd-tabs','qd-details')">Details</div>
        <div class="tab-item" data-tab="qd-coverages" onclick="switchTab('qd-tabs','qd-coverages')">Coverages</div>
        <div class="tab-item" data-tab="qd-premium" onclick="switchTab('qd-tabs','qd-premium')">Premium</div>
        <div class="tab-item" data-tab="qd-transactions" onclick="switchTab('qd-tabs','qd-transactions')">Transactions</div>
        <div class="tab-item" data-tab="qd-docs" onclick="switchTab('qd-tabs','qd-docs')">Documents</div>
        <div class="tab-item" data-tab="qd-notes" onclick="switchTab('qd-tabs','qd-notes')">Notes</div>
        <div class="tab-item" data-tab="qd-audit" onclick="switchTab('qd-tabs','qd-audit')">Audit</div>
      </div>

      <div id="tab-qd-details" class="tab-content active">
        <div class="detail-grid">
          <div class="detail-item"><div class="di-label">Insured Name</div><div class="di-value">${q.insuredName}</div></div>
          <div class="detail-item"><div class="di-label">FEIN</div><div class="di-value font-mono">${q.fein}</div></div>
          <div class="detail-item"><div class="di-label">Line of Business</div><div class="di-value">${q.lob}</div></div>
          <div class="detail-item"><div class="di-label">MGA</div><div class="di-value">${q.mga}</div></div>
          <div class="detail-item"><div class="di-label">Agent / Broker</div><div class="di-value">${q.agent}</div></div>
          <div class="detail-item"><div class="di-label">Underwriter</div><div class="di-value">${q.uw}</div></div>
          <div class="detail-item"><div class="di-label">Effective Date</div><div class="di-value">${q.effective}</div></div>
          <div class="detail-item"><div class="di-label">Expiration Date</div><div class="di-value">${q.expiration}</div></div>
          <div class="detail-item"><div class="di-label">Policy Term</div><div class="di-value">${q.term}</div></div>
          <div class="detail-item"><div class="di-label">Status</div><div class="di-value">${chip(q.status)}</div></div>
          <div class="detail-item"><div class="di-label">Issue Date</div><div class="di-value">${q.issueDate || 'Not issued'}</div></div>
          <div class="detail-item"><div class="di-label">Policy Number</div><div class="di-value font-mono">${q.policyNumber || 'N/A'}</div></div>
          <div class="detail-item"><div class="di-label">Billing Plan</div><div class="di-value">${q.billingPlan}</div></div>
          <div class="detail-item"><div class="di-label">Payment Method</div><div class="di-value">${q.paymentMethod}</div></div>
          <div class="detail-item"><div class="di-label">Created Date</div><div class="di-value">${q.createdDate}</div></div>
          <div class="detail-item"><div class="di-label">Approved Date</div><div class="di-value">${q.approvedDate || '-'}</div></div>
        </div>
      </div>

      <div id="tab-qd-coverages" class="tab-content">
        <table class="data-table"><thead><tr><th>Coverage</th><th>Limit</th><th>Deductible</th><th>Premium</th><th>Rating Basis</th></tr></thead><tbody>
          <tr><td>${q.coverage}</td><td>${fmt(q.limit)}</td><td>${fmt(q.deductible)}</td><td>${fmt(Math.round(q.basePremium * q.modFactor * (1-q.scheduleCredit)))}</td><td>${q.ratingBasis}</td></tr>
          <tr><td>Employment Practices Liability</td><td>${fmt(1000000)}</td><td>${fmt(25000)}</td><td>${fmt(25000)}</td><td>Per Claim</td></tr>
          <tr><td>Hired & Non-Owned Auto</td><td>${fmt(1000000)}</td><td>${fmt(5000)}</td><td>${fmt(12500)}</td><td>Per Occurrence</td></tr>
        </tbody></table>
      </div>

      <div id="tab-qd-premium" class="tab-content">
        <div class="premium-breakdown">
          <div class="pb-row"><span class="pb-label">Base Premium</span><span class="pb-value">${fmt(q.basePremium)}</span></div>
          <div class="pb-row"><span class="pb-label">Experience Mod</span><span class="pb-value">${q.modFactor} (${fmt(Math.round(q.basePremium - q.basePremium * q.modFactor))})</span></div>
          <div class="pb-row"><span class="pb-label">Schedule Credit</span><span class="pb-value">-${Math.round(q.scheduleCredit*100)}% (${fmt(Math.round(q.basePremium * q.modFactor * q.scheduleCredit))})</span></div>
          <div class="pb-row"><span class="pb-label">Premium Subtotal</span><span class="pb-value">${fmt(Math.round(q.basePremium * q.modFactor * (1 - q.scheduleCredit)))}</span></div>
          <div class="pb-row"><span class="pb-label">SLA Tax (3.6%)</span><span class="pb-value">${fmt(q.slaTax)}</span></div>
          <div class="pb-row"><span class="pb-label">Stamping Fee (1.5%)</span><span class="pb-value">${fmt(q.stampingFee)}</span></div>
          <div class="pb-row total"><span class="pb-label">Total Annual Premium</span><span class="pb-value">${fmt(q.premium)}</span></div>
        </div>
      </div>

      <div id="tab-qd-transactions" class="tab-content">
        ${trans.length ? `<table class="data-table"><thead><tr><th>Transaction #</th><th>Type</th><th>Effective Date</th><th>Status</th><th>Source</th><th>Event ID</th><th>Summary</th></tr></thead><tbody>
          ${trans.map(t => `<tr><td class="col-id">${t.transactionNo}</td><td>${t.type}</td><td>${t.effectiveDate}</td><td>${chip(t.status)}</td><td>${t.sourceSystem}</td><td style="font-size:11px;color:var(--text-muted);">${t.eventId}</td><td style="font-size:12px;">${t.summary}</td></tr>`).join('')}
        </tbody></table>` : '<div style="padding:20px;text-align:center;color:var(--text-muted);">No transactions for this quote</div>'}
      </div>

      <div id="tab-qd-docs" class="tab-content">
        ${docs.length ? docs.map(d => `
          <div class="doc-item"><div class="doc-icon" style="background:var(--accent-dim);color:var(--accent);"><i class="fas fa-file-pdf"></i></div>
            <div class="doc-info"><div class="doc-name">${d.name}</div><div class="doc-meta">${d.type} — ${d.uploadedBy} — ${d.date}</div></div>
            ${chip(d.status)}
          </div>`).join('') : '<div style="padding:20px;text-align:center;color:var(--text-muted);">No documents for this quote</div>'}
      </div>

      <div id="tab-qd-notes" class="tab-content">
        ${notes.length ? notes.map(n => `
          <div class="note-card glass-sm" style="margin-bottom:8px;">
            <div class="nc-header"><div class="nc-author"><div class="nc-avatar">${n.author.split(' ').map(w=>w[0]).join('')}</div>
              <div><div class="nc-name">${n.author}</div><div class="nc-role">${n.role}</div></div>
            </div><span class="nc-time">${n.timestamp}</span></div>
            <div class="nc-text">${n.content}</div>
          </div>`).join('') : '<div style="padding:20px;text-align:center;color:var(--text-muted);">No notes for this quote</div>'}
      </div>

      <div id="tab-qd-audit" class="tab-content">
        ${audits.length ? `<table class="data-table"><thead><tr><th>Timestamp</th><th>User</th><th>Field</th><th>Old Value</th><th>New Value</th></tr></thead><tbody>
          ${audits.map(a => `<tr><td style="font-size:12px;color:var(--text-muted);">${a.timestamp}</td><td>${a.user}</td><td>${a.field}</td><td style="color:var(--text-muted);">${a.oldValue || '-'}</td><td>${a.newValue}</td></tr>`).join('')}
        </tbody></table>` : '<div style="padding:20px;text-align:center;color:var(--text-muted);">No audit records for this quote</div>'}
      </div>
    </div>`;
}

// ======== TRANSACTIONS (standalone) ========
function renderTransactions() {
  const container = document.getElementById('transactions-body');
  if (!container) return;
  const summaryEl = document.querySelector('#screen-transactions .summary-card');
  if (summaryEl) {
    const counts = { ISSUE:0, ENDORSEMENT:0, RENEWAL:0, CANCELLATION:0, REINSTATEMENT:0 };
    TRANSACTIONS.forEach(t => { if (counts[t.type] !== undefined) counts[t.type]++; });
    summaryEl.innerHTML = Object.entries(counts).map(([k,v]) =>
      `<div class="sc-item"><div class="sc-label">${k}</div><div class="sc-value">${v}</div></div>`
    ).join('');
  }
  container.innerHTML = TRANSACTIONS.map(t => {
    const q = QUOTES.find(x => x.id === t.quoteId);
    return `<tr><td class="col-id">${t.transactionNo}</td><td>${t.type}</td><td class="col-id">${t.quoteId}${q && q.policyNumber ? '<br><span style="color:var(--text-muted);font-size:11px;">'+q.policyNumber+'</span>' : ''}</td><td>${q ? q.insuredName : '-'}</td><td>${t.effectiveDate}</td><td>${chip(t.status)}</td><td style="font-size:12px;">${t.summary}</td></tr>`;
  }).join('');
}

// ======== NOTICE MANAGEMENT ========
function renderNoticeManagement() {
  const container = document.getElementById('notices-body');
  if (!container) return;
  const pendingDecisions = NOTICES.filter(n => n.status === 'DELIVERED').length;
  const summary = document.querySelector('#screen-notice-management .summary-card');
  if (summary) {
    const draft = NOTICES.filter(n => n.status === 'DRAFT').length;
    const sent = NOTICES.filter(n => n.status === 'SENT').length;
    const executed = NOTICES.filter(n => n.status === 'EXECUTED').length;
    summary.innerHTML = `<div class="sc-item"><div class="sc-label">Draft</div><div class="sc-value" style="color:var(--warning);">${draft}</div></div>
      <div class="sc-item"><div class="sc-label">Sent to MGA</div><div class="sc-value" style="color:var(--info);">${sent}</div></div>
      <div class="sc-item"><div class="sc-label">Pending Decision</div><div class="sc-value" style="color:var(--purple);">${pendingDecisions}</div></div>
      <div class="sc-item"><div class="sc-label">Executed</div><div class="sc-value" style="color:var(--success);">${executed}</div></div>`;
  }
  container.innerHTML = NOTICES.map(n => {
    const q = QUOTES.find(x => x.id === n.quoteId);
    const typeLabels = { RENEWAL_OFFER:'Renewal Offer', CANCELLATION_NOTICE:'Cancellation Notice', REINSTATEMENT_OFFER:'Reinstatement Offer' };
    const typeIcon = { RENEWAL_OFFER:'fa-sync-alt', CANCELLATION_NOTICE:'fa-ban', REINSTATEMENT_OFFER:'fa-undo-alt' };
    const typeColors = { RENEWAL_OFFER:'var(--cyan)', CANCELLATION_NOTICE:'var(--danger)', REINSTATEMENT_OFFER:'var(--warning)' };
    const pv = n.proposedValues;
    const pnStr = q && q.policyNumber ? `<span style="font-family:monospace;font-size:11px;color:var(--text-secondary);">${q.policyNumber}</span>` : '';
    const propStr = pv ? '<div style="line-height:1.5;">'+pnStr+'<br><span style="font-size:12px;color:var(--accent);font-weight:600;">'+fmt(pv.premium)+'</span><br><span style="font-size:10px;color:var(--text-muted);">'+pv.effectiveDate+' → '+pv.expirationDate+'</span></div>' : '<div style="line-height:1.5;">'+pnStr+'<br><span>'+fmt(n.premium)+'</span></div>';
    return `<tr><td class="col-id">${n.id}</td>
      <td><span style="color:${typeColors[n.type]}"><i class="fas ${typeIcon[n.type]}"></i></span> ${typeLabels[n.type]||n.type}</td>
      <td class="col-id">${n.quoteId}${q && q.policyNumber ? '<br><span style="color:var(--text-muted);font-size:11px;">'+q.policyNumber+'</span>' : ''}</td>
      <td>${q ? q.insuredName : '-'}</td>
      <td>${propStr}</td>
      <td>${chip(n.status)}</td>
      <td class="actions-cell">${n.status === 'DRAFT' ? `<button class="btn btn-primary btn-xs" onclick="generateNotice('${n.id}')">Generate</button>` : ''}
        ${n.status === 'GENERATED' ? `<button class="btn btn-info btn-xs" onclick="sendNotice('${n.id}')">Send to MGA</button>` : ''}
        ${n.status === 'SENT' ? `<button class="btn btn-info btn-xs" onclick="acknowledgeNotice('${n.id}')">Acknowledge</button>` : ''}
        ${n.status === 'ACKNOWLEDGED' ? `<button class="btn btn-info btn-xs" onclick="deliverNotice('${n.id}')">Mark Delivered</button>` : ''}
        ${n.status === 'DELIVERED' ? `<button class="btn btn-success btn-xs" onclick="acceptNotice('${n.id}')">Accept</button><button class="btn btn-danger btn-xs" onclick="rejectNotice('${n.id}')">Reject</button><button class="btn btn-secondary btn-xs" onclick="expireNotice('${n.id}')" style="border-color:var(--text-muted);color:var(--text-muted);">Expire</button>` : ''}
        ${n.status === 'EXECUTED' ? '<span style="font-size:11px;color:var(--success);">✓ Executed</span>' : ''}
        ${n.status === 'REJECTED' ? '<span style="font-size:11px;color:var(--danger);">✗ Rejected</span>' : ''}
        ${n.status === 'EXPIRED' ? '<span style="font-size:11px;color:var(--text-muted);">⌛ Expired</span>' : ''}</td></tr>`;
  }).join('');
}

function generateNotice(id) {
  const n = NOTICES.find(x => x.id === id);
  if (!n) return;
  n.status = 'GENERATED';
  n.generatedDate = new Date().toISOString().slice(0,10);
  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Generated', module:'Notice', entity:id, details:'Notice generated — ' + n.type});
  saveData();
  renderNoticeManagement();
}

function sendNotice(id) {
  const n = NOTICES.find(x => x.id === id);
  if (!n) return;
  n.status = 'SENT';
  n.sentDate = new Date().toISOString().slice(0,10);
  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Sent', module:'Notice', entity:id, details:'Notice sent to MGA — ' + n.type});
  saveData();
  renderNoticeManagement();
}

function acknowledgeNotice(id) {
  const n = NOTICES.find(x => x.id === id);
  if (!n) return;
  n.status = 'ACKNOWLEDGED';
  n.acknowledgedDate = new Date().toISOString().slice(0,10);
  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'System', action:'Acknowledged', module:'Notice', entity:id, details:'MGA acknowledged notice — ' + n.type});
  saveData();
  renderNoticeManagement();
}

function deliverNotice(id) {
  const n = NOTICES.find(x => x.id === id);
  if (!n) return;
  n.status = 'DELIVERED';
  n.deliveredDate = new Date().toISOString().slice(0,10);
  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'System', action:'Delivered', module:'Notice', entity:id, details:'MGA delivered decision — ' + n.type});
  saveData();
  renderNoticeManagement();
}

function acceptNotice(id) {
  const n = NOTICES.find(x => x.id === id);
  if (!n) return;
  const q = QUOTES.find(x => x.id === n.quoteId);
  if (!q) return;
  n.status = 'ACCEPTED';
  n.decision = 'ACCEPTED';
  n.decisionDate = new Date().toISOString().slice(0,10);
  if (n.type === 'RENEWAL_OFFER') {
    q.status = 'ACTIVE';
    if (n.proposedValues) {
      const pv = n.proposedValues;
      q.effective = pv.effectiveDate || q.expiration;
      q.expiration = pv.expirationDate || new Date(new Date(q.effective).getTime() + 365*86400000).toISOString().slice(0,10);
      q.premium = pv.premium || q.premium;
      q.basePremium = pv.basePremium || q.basePremium;
      q.modFactor = pv.modFactor || q.modFactor;
      q.scheduleCredit = pv.scheduleCredit !== undefined ? pv.scheduleCredit : q.scheduleCredit;
      q.slaTax = Math.round(q.premium * 0.036);
      q.stampingFee = Math.round(q.premium * 0.015);
      const instCount = { Annual:1, 'Semi-Annual':2, Quarterly:4, Monthly:12 };
      const numInst = instCount[q.billingPlan] || 12;
      const instAmount = Math.round(q.premium / numInst);
      const schedule = [];
      const start = new Date(q.effective);
      for (let i = 0; i < numInst; i++) {
        const due = new Date(start);
        if (q.billingPlan === 'Monthly') due.setMonth(due.getMonth() + i);
        else if (q.billingPlan === 'Quarterly') due.setMonth(due.getMonth() + i * 3);
        else if (q.billingPlan === 'Semi-Annual') due.setMonth(due.getMonth() + i * 6);
        else if (q.billingPlan === 'Annual') due.setFullYear(due.getFullYear() + i);
        schedule.push({
          inst: i + 1,
          dueDate: due.toISOString().slice(0,10),
          amountDue: i === numInst - 1 ? q.premium - instAmount * (numInst - 1) : instAmount,
          amountPaid: 0, status: 'Upcoming', paidDate: null
        });
      }
      BILLING_SCHEDULES[q.id] = schedule;
    }
    TRANSACTIONS.push({ id:'TXN-' + String(TRANSACTIONS.length+1).padStart(3,'0'), transactionNo:'TXN-2026-' + String(TRANSACTIONS.length+1).padStart(4,'0'), quoteId:q.id, type:'RENEWAL', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-RENEWED-' + String(TRANSACTIONS.length+1).padStart(3,'0'), eventStatus:'PUBLISHED', effectiveDate:q.effective, requestedBy:'System', approvedBy:'System', processedAt:new Date().toISOString(), correlationId:'CORR-' + String(TRANSACTIONS.length+1).padStart(3,'0'), summary:'Renewal executed via notice ' + id + ' — Term 2, Premium ' + fmt(q.premium) + ' for ' + q.insuredName, createdAt:new Date().toISOString().slice(0,10) });
  } else if (n.type === 'CANCELLATION_NOTICE') {
    q.status = 'CANCELLED';
    TRANSACTIONS.push({ id:'TXN-' + String(TRANSACTIONS.length+1).padStart(3,'0'), transactionNo:'TXN-2026-' + String(TRANSACTIONS.length+1).padStart(4,'0'), quoteId:q.id, type:'CANCELLATION', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-CANCELLED-' + String(TRANSACTIONS.length+1).padStart(3,'0'), eventStatus:'PUBLISHED', effectiveDate:new Date().toISOString().slice(0,10), requestedBy:'System', approvedBy:'System', processedAt:new Date().toISOString(), correlationId:'CORR-' + String(TRANSACTIONS.length+1).padStart(3,'0'), summary:'Cancellation executed via notice ' + id + ' for ' + q.insuredName, createdAt:new Date().toISOString().slice(0,10) });
  } else if (n.type === 'REINSTATEMENT_OFFER') {
    q.status = 'ACTIVE';
    TRANSACTIONS.push({ id:'TXN-' + String(TRANSACTIONS.length+1).padStart(3,'0'), transactionNo:'TXN-2026-' + String(TRANSACTIONS.length+1).padStart(4,'0'), quoteId:q.id, type:'REINSTATEMENT', status:'COMPLETED', sourceSystem:'PAS', eventId:'EVT-POLICY-REINSTATED-' + String(TRANSACTIONS.length+1).padStart(3,'0'), eventStatus:'PUBLISHED', effectiveDate:new Date().toISOString().slice(0,10), requestedBy:'System', approvedBy:'System', processedAt:new Date().toISOString(), correlationId:'CORR-' + String(TRANSACTIONS.length+1).padStart(3,'0'), summary:'Reinstatement executed via notice ' + id + ' for ' + q.insuredName, createdAt:new Date().toISOString().slice(0,10) });
  }
  n.status = 'EXECUTED';
  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Approved', module:'Notice', entity:id, details:'Notice accepted and executed — ' + n.type + ' for ' + q.insuredName});
  saveData();
  renderNoticeManagement();
}

function rejectNotice(id) {
  const n = NOTICES.find(x => x.id === id);
  if (!n) return;
  n.status = 'REJECTED';
  n.decision = 'REJECTED';
  n.decisionDate = new Date().toISOString().slice(0,10);
  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Declined', module:'Notice', entity:id, details:'Notice rejected by MGA — ' + n.type});
  saveData();
  renderNoticeManagement();
}

function expireNotice(id) {
  const n = NOTICES.find(x => x.id === id);
  if (!n) return;
  n.status = 'EXPIRED';
  n.decision = 'EXPIRED';
  n.decisionDate = new Date().toISOString().slice(0,10);
  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Expired', module:'Notice', entity:id, details:'Notice expired — ' + n.type + '. No action taken on quote.'});
  saveData();
  renderNoticeManagement();
}

// ======== TRANSACTIONS SCREEN ========
function renderTransactions() {
  const container = document.getElementById('transactions-body');
  if (!container) return;
  const txns = [...TRANSACTIONS].reverse();
  if (txns.length === 0) {
    container.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted);">No transactions found</td></tr>';
    return;
  }
  const typeIcons = { ISSUE:'fa-file-contract', ENDORSEMENT:'fa-pen-alt', RENEWAL:'fa-sync-alt', CANCELLATION:'fa-ban', REINSTATEMENT:'fa-undo-alt' };
  const typeColors = { ISSUE:'var(--success)', ENDORSEMENT:'var(--cyan)', RENEWAL:'var(--purple)', CANCELLATION:'var(--danger)', REINSTATEMENT:'var(--warning)' };
  container.innerHTML = txns.map(t => {
    const q = QUOTES.find(x => x.id === t.quoteId);
    return `<tr><td class="col-id">${t.transactionNo}</td>
      <td><span style="color:${typeColors[t.type]}"><i class="fas ${typeIcons[t.type]||'fa-circle'}"></i></span> ${t.type}</td>
      <td class="col-id">${t.quoteId}${q && q.policyNumber ? '<br><span style="color:var(--text-muted);font-size:11px;">'+q.policyNumber+'</span>' : ''}</td>
      <td>${q ? q.insuredName : '-'}</td>
      <td style="font-size:12px;color:var(--text-muted);">${t.effectiveDate}</td>
      <td>${chip(t.status)}</td>
      <td style="font-size:12px;max-width:250px;">${t.summary}</td></tr>`;
  }).join('');
}

// ======== INTEGRATION MONITOR ========
function renderIntegrationMonitor() {
  const container = document.getElementById('integration-body');
  if (!container) return;
  const services = [
    { name:'CRM', status:'Healthy', icon:'fa-users', lastSync:'2 min ago' },
    { name:'PAS', status:'Healthy', icon:'fa-file-contract', lastSync:'Now' },
    { name:'Billing Service', status:'Healthy', icon:'fa-credit-card', lastSync:'5 min ago' },
    { name:'Claims Service', status:'Warning', icon:'fa-file-invoice', lastSync:'2 hours ago' },
    { name:'Compliance', status:'Healthy', icon:'fa-check-circle', lastSync:'10 min ago' },
    { name:'Reporting', status:'Healthy', icon:'fa-chart-bar', lastSync:'1 min ago' },
    { name:'Notification Service', status:'Healthy', icon:'fa-bell', lastSync:'30 sec ago' },
    { name:'Document Service', status:'Failed', icon:'fa-folder-open', lastSync:'Never — Service down' }
  ];
  container.innerHTML = services.map(s => {
    const statusColor = s.status === 'Healthy' ? 'var(--success)' : s.status === 'Warning' ? 'var(--warning)' : 'var(--danger)';
    const bgColor = s.status === 'Healthy' ? 'var(--success-bg)' : s.status === 'Warning' ? 'var(--warning-bg)' : 'var(--danger-bg)';
    return `<div class="service-card glass-sm"><div class="sc-top"><div style="display:flex;align-items:center;gap:12px;"><div style="width:40px;height:40px;border-radius:10px;background:${bgColor};display:flex;align-items:center;justify-content:center;color:${statusColor};"><i class="fas ${s.icon}"></i></div><div><div style="font-weight:600;font-size:14px;">${s.name}</div><div style="font-size:12px;color:var(--text-muted);">${s.lastSync}</div></div></div><div style="display:flex;align-items:center;gap:6px;"><div style="width:10px;height:10px;border-radius:50%;background:${statusColor};"></div><span style="font-size:13px;font-weight:600;color:${statusColor};">${s.status}</span></div></div></div>`;
  }).join('');
}

// ======== API LOG ========
function renderAPILog() {
  const container = document.getElementById('api-log-body');
  if (!container) return;
  const apis = [
    { timestamp:'2026-07-28 09:15:00', direction:'Outbound', endpoint:'POST /billing/schedule', method:'POST', status:200, duration:245, correlationId:'CORR-001', retry:0, request:'{"quoteId":"QTE-2026-009","billingPlan":"Quarterly"}', response:'{"status":"created","scheduleId":"BS-009"}' },
    { timestamp:'2026-07-28 09:14:30', direction:'Outbound', endpoint:'POST /document/generate', method:'POST', status:201, duration:1802, correlationId:'CORR-001', retry:1, request:'{"quoteId":"QTE-2026-009","type":"PolicySchedule"}', response:'{"status":"generated","documentId":"DOC-011"}' },
    { timestamp:'2026-07-28 09:14:00', direction:'Inbound', endpoint:'POST /policy/issue', method:'POST', status:200, duration:456, correlationId:'CORR-001', retry:0, request:'{"quoteId":"QTE-2026-009","issueDate":"2026-07-28"}', response:'{"policyNumber":"POL-2026-010","status":"ACTIVE"}' },
    { timestamp:'2026-07-28 08:45:00', direction:'Outbound', endpoint:'POST /notification/send', method:'POST', status:200, duration:89, correlationId:'CORR-008', retry:0, request:'{"noticeId":"NTC-003","type":"RENEWAL_OFFER"}', response:'{"status":"sent","messageId":"MSG-003"}' },
    { timestamp:'2026-07-28 08:30:00', direction:'Inbound', endpoint:'GET /quotes/QTE-2026-006', method:'GET', status:200, duration:12, correlationId:null, retry:0, request:null, response:'{"quoteId":"QTE-2026-006","status":"ACTIVE"}' },
    { timestamp:'2026-07-27 16:30:00', direction:'Outbound', endpoint:'POST /document/generate', method:'POST', status:500, duration:30000, correlationId:'CORR-004', retry:3, request:'{"quoteId":"QTE-2026-004","type":"EndorsementForm"}', response:'{"error":"Service Unavailable"}' }
  ];
  container.innerHTML = apis.map(a => {
    const dirIcon = a.direction === 'Inbound' ? 'fa-arrow-down' : 'fa-arrow-up';
    const dirColor = a.direction === 'Inbound' ? 'var(--success)' : 'var(--accent)';
    const statusClass = a.status >= 200 && a.status < 300 ? 'chip chip-active' : a.status >= 400 ? 'chip chip-cancelled' : 'chip chip-pending';
    return `<tr><td style="font-size:12px;color:var(--text-muted);">${a.timestamp}</td>
      <td><span style="color:${dirColor};"><i class="fas ${dirIcon}"></i></span> ${a.direction}</td>
      <td style="font-size:12px;">${a.endpoint}</td>
      <td>${a.method}</td>
      <td><span class="${statusClass}" style="font-size:11px;padding:2px 8px;">${a.status}</span></td>
      <td style="font-size:12px;">${a.duration}ms</td>
      <td style="font-size:11px;color:var(--text-muted);">${a.retry > 0 ? a.retry + ' retries' : '-'}</td>
      <td style="font-size:11px;color:var(--text-muted);max-width:80px;overflow:hidden;">${a.correlationId || '-'}</td>
      <td><button class="btn btn-xs btn-ghost" onclick="alert('Request: ' + JSON.stringify(${a.request ? "'" + a.request.replace(/'/g,"\\'") + "'" : 'null'}) + '\\n\\nResponse: ' + JSON.stringify(${a.response ? "'" + a.response.replace(/'/g,"\\'") + "'" : 'null'}))">View</button></td></tr>`;
  }).join('');
}

// ======== REPORTS ========
function renderReports() {
  const totalQuotes = QUOTES.length;
  const totalPremium = QUOTES.reduce((s, q) => s + q.premium, 0);
  const approvedCount = QUOTES.filter(q => q.status === 'APPROVED').length;
  const activeCount = QUOTES.filter(q => q.status === 'ACTIVE').length;
  const summary = document.querySelector('#screen-reports .summary-card');
  if (summary) {
    summary.innerHTML = `<div class="sc-item"><div class="sc-label">Total Quotes</div><div class="sc-value">${totalQuotes}</div></div>
      <div class="sc-item"><div class="sc-label">Total Premium</div><div class="sc-value" style="color:var(--success);">${fmt(totalPremium)}</div></div>
      <div class="sc-item"><div class="sc-label">Approved</div><div class="sc-value" style="color:var(--info);">${approvedCount}</div></div>
      <div class="sc-item"><div class="sc-label">Active</div><div class="sc-value">${activeCount}</div></div>`;
  }
}

// ======== ISSUE POLICY ========
function showIssueModal(quoteId) {
  const q = QUOTES.find(x => x.id === quoteId);
  if (!q) return;
  const overlay = document.getElementById('issue-modal');
  if (!overlay) return;
  document.getElementById('issue-modal-quote-id').textContent = q.id;
  document.getElementById('issue-modal-insured').textContent = q.insuredName;
  document.getElementById('issue-modal-lob').textContent = q.lob;
  document.getElementById('issue-modal-premium').textContent = fmt(q.premium);
  document.getElementById('issue-modal-coverage').textContent = q.coverage + ' — Limit: ' + fmt(q.limit) + ' / Ded: ' + fmt(q.deductible);
  document.getElementById('issue-modal-rating').textContent = q.ratingBasis;
  document.getElementById('issue-modal-uw').textContent = q.uw;
  document.getElementById('issue-modal-agent').textContent = q.agent;
  document.getElementById('issue-modal-mga').textContent = q.mga;
  document.getElementById('issue-modal-billing').textContent = q.billingPlan + ' / ' + q.paymentMethod;
  document.getElementById('issue-modal-effective').value = new Date().toISOString().slice(0,10);
  document.getElementById('issue-modal-expiration').value = new Date(Date.now() + 365*24*60*60*1000).toISOString().slice(0,10);
  document.getElementById('issue-modal-error').style.display = 'none';
  overlay.classList.add('open');
}

function confirmIssue() {
  const quoteId = document.getElementById('issue-modal-quote-id').textContent;
  const q = QUOTES.find(x => x.id === quoteId);
  if (!q) return;
  const issueDate = document.getElementById('issue-modal-date').value;
  const effectiveDate = document.getElementById('issue-modal-effective').value;
  const expirationDate = document.getElementById('issue-modal-expiration').value;
  const errorEl = document.getElementById('issue-modal-error');
  if (!issueDate || !effectiveDate || !expirationDate) {
    errorEl.textContent = 'All date fields are required.';
    errorEl.style.display = 'block';
    return;
  }
  const policyNum = 'POL-2026-' + String(QUOTES.filter(x => x.policyNumber).length + 1).padStart(3,'0');
  q.status = 'ACTIVE';
  q.policyNumber = policyNum;
  q.issueDate = issueDate;
  q.effective = effectiveDate;
  q.expiration = expirationDate;
  TRANSACTIONS.push({
    id:'TXN-' + String(TRANSACTIONS.length+1).padStart(3,'0'),
    transactionNo:'TXN-2026-' + String(TRANSACTIONS.length+1).padStart(4,'0'),
    quoteId:q.id, type:'ISSUE', status:'COMPLETED', sourceSystem:'PAS',
    eventId:'EVT-POLICY-ISSUED-' + String(TRANSACTIONS.length+1).padStart(3,'0'), eventStatus:'PUBLISHED',
    effectiveDate:effectiveDate, requestedBy:'Akhilesh-Salman-Policy', approvedBy:'System',
    processedAt:new Date().toISOString(), correlationId:'CORR-' + String(TRANSACTIONS.length+1).padStart(3,'0'),
    summary:'Policy ' + policyNum + ' issued for ' + q.insuredName, createdAt:new Date().toISOString().slice(0,10)
  });
  ACTIVITIES.unshift({timestamp:new Date().toLocaleString(), user:'Akhilesh-Salman-Policy', action:'Issued', module:'Policy', entity:q.id, details:'Policy ' + policyNum + ' issued for ' + q.insuredName});
  AUDIT_LOGS.unshift({timestamp:new Date().toISOString().replace('T',' ').slice(0,19), user:'Akhilesh-Salman-Policy', entity:'Quote', entityId:q.id, field:'Status', oldValue:'APPROVED', newValue:'ACTIVE', ip:'10.0.1.45'});
  saveData();
  document.getElementById('issue-modal').classList.remove('open');
  viewQuote(q.id);
}

// ======== INIT ========
document.addEventListener('DOMContentLoaded', function() {
  loadData();
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', function(e) {
      if (e.target === this) this.classList.remove('open');
    });
  });
  document.getElementById('screen-login').style.display = 'none';
  document.getElementById('main-app').style.display = 'flex';
  showScreen('dashboard');

  // Global search handler
  document.getElementById('global-search')?.addEventListener('input', function(e) {
    window._quoteFilter = 'all';
    const val = e.target.value.trim();
    if (val) {
      showScreen('quotes');
      document.getElementById('qs-search').value = val;
    }
    renderQuotes();
  });

  // Quotes search inputs
  document.getElementById('qs-search')?.addEventListener('input', renderQuotes);
  document.getElementById('qs-lob')?.addEventListener('change', renderQuotes);
});
