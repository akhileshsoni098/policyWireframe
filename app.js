const POLICIES = [
  { id: 'POL-2026-001', insured: 'ABC Construction Inc.', fein: '95-4283716', lob: 'General Liability', status: 'Active', effective: '2026-01-01', expiration: '2026-12-31', premium: 125000, uw: 'Riya Sharma', agent: 'Marsh Inc.', term: 'Annual', billingPlan: 'Quarterly', paymentMethod: 'ACH', coverage: 'GL', deductible: 10000, limit: 2000000, ratingBasis: 'Gross Revenue $12.5M', basePremium: 98000, modFactor: 0.92, scheduleCredit: 0.05, slaTax: 3528, stampingFee: 1470, created: '2025-11-15', submitted: '2025-11-20', uwa: 'Riya Sharma', uwaDate: '2025-11-25' },
  { id: 'POL-2026-002', insured: 'MedTech Solutions Inc.', fein: '82-3917450', lob: 'Professional Liability', status: 'Pending', effective: '2026-02-01', expiration: '2027-01-31', premium: 67500, uw: 'Vikram Patel', agent: 'Aon', term: 'Annual', billingPlan: 'Semi-Annual', paymentMethod: 'Check', coverage: 'Prof Liab', deductible: 25000, limit: 2000000, ratingBasis: 'Revenue $8.2M', basePremium: 52000, modFactor: 1.0, scheduleCredit: 0.0, slaTax: 1872, stampingFee: 780, created: '2026-01-05', submitted: '2026-01-10', uwa: null, uwaDate: null },
  { id: 'POL-2026-003', insured: 'Horizon Logistics LLC', fein: '47-8192634', lob: 'Auto Liability', status: 'Active', effective: '2025-06-01', expiration: '2026-05-31', premium: 210000, uw: 'Riya Sharma', agent: 'WTW', term: 'Annual', billingPlan: 'Monthly', paymentMethod: 'ACH', coverage: 'Auto', deductible: 5000, limit: 3000000, ratingBasis: 'Power Units 45', basePremium: 175000, modFactor: 1.05, scheduleCredit: 0.03, slaTax: 6300, stampingFee: 2625, created: '2025-04-15', submitted: '2025-04-20', uwa: 'Riya Sharma', uwaDate: '2025-04-28' },
  { id: 'POL-2026-004', insured: 'Coastal Properties Group', fein: '13-5628971', lob: 'Property', status: 'Endorsed', effective: '2025-09-01', expiration: '2026-08-31', premium: 43200, uw: 'Neha Gupta', agent: 'Lockton', term: 'Annual', billingPlan: 'Annual', paymentMethod: 'Wire', coverage: 'Property', deductible: 50000, limit: 5000000, ratingBasis: 'TIV $15.8M', basePremium: 38500, modFactor: 1.0, scheduleCredit: 0.08, slaTax: 1386, stampingFee: 577, created: '2025-07-10', submitted: '2025-07-15', uwa: 'Neha Gupta', uwaDate: '2025-07-22' },
  { id: 'POL-2026-005', insured: 'Pioneer Energy Corp.', fein: '74-2156389', lob: 'Workers Compensation', status: 'Cancelled', effective: '2025-04-01', expiration: '2025-12-15', premium: 189000, uw: 'Vikram Patel', agent: 'Gallagher', term: 'Annual', billingPlan: 'Quarterly', paymentMethod: 'ACH', coverage: 'WC', deductible: 25000, limit: 1000000, ratingBasis: 'Payroll $22.5M', basePremium: 165000, modFactor: 1.12, scheduleCredit: 0.0, slaTax: 5940, stampingFee: 2475, created: '2025-02-10', submitted: '2025-02-15', uwa: 'Vikram Patel', uwaDate: '2025-02-28' },
  { id: 'POL-2026-006', insured: 'First National Retail', fein: '36-7845129', lob: 'Package', status: 'Renewed', effective: '2026-01-01', expiration: '2026-12-31', premium: 94800, uw: 'Riya Sharma', agent: 'Marsh Inc.', term: 'Annual', billingPlan: 'Quarterly', paymentMethod: 'ACH', coverage: 'Package', deductible: 10000, limit: 2000000, ratingBasis: 'Revenue $18.5M', basePremium: 81000, modFactor: 0.95, scheduleCredit: 0.06, slaTax: 2916, stampingFee: 1215, created: '2025-10-01', submitted: '2025-10-08', uwa: 'Riya Sharma', uwaDate: '2025-10-15' },
  { id: 'POL-2026-007', insured: 'Sunrise Healthcare LLC', fein: '56-1987234', lob: 'Professional Liability', status: 'Active', effective: '2026-03-01', expiration: '2027-02-28', premium: 156000, uw: 'Neha Gupta', agent: 'Aon', term: 'Annual', billingPlan: 'Quarterly', paymentMethod: 'ACH', coverage: 'Med Mal', deductible: 50000, limit: 5000000, ratingBasis: 'Revenue $14.2M', basePremium: 130000, modFactor: 1.0, scheduleCredit: 0.0, slaTax: 4680, stampingFee: 1950, created: '2026-01-20', submitted: '2026-01-25', uwa: 'Neha Gupta', uwaDate: '2026-02-05' },
  { id: 'POL-2026-008', insured: 'Great Lakes Transport', fein: '38-5612347', lob: 'Auto Liability', status: 'Active', effective: '2025-11-01', expiration: '2026-10-31', premium: 185000, uw: 'Riya Sharma', agent: 'WTW', term: 'Annual', billingPlan: 'Monthly', paymentMethod: 'ACH', coverage: 'Auto', deductible: 10000, limit: 2000000, ratingBasis: 'Power Units 38', basePremium: 158000, modFactor: 1.08, scheduleCredit: 0.02, slaTax: 5688, stampingFee: 2370, created: '2025-09-05', submitted: '2025-09-10', uwa: 'Riya Sharma', uwaDate: '2025-09-22' }
];
const SUBMISSIONS = [
  { id: 'SUB-2026-101', insured: 'Blue Ridge Manufacturing', lob: 'General Liability', premium: 87500, status: 'New', submittedDate: '2026-07-22', assignedTo: 'Riya Sharma', score: 7, daysInQueue: 5 },
  { id: 'SUB-2026-102', insured: 'Pacific NW Timber Co.', lob: 'Workers Compensation', premium: 245000, status: 'In Review', submittedDate: '2026-07-18', assignedTo: 'Vikram Patel', score: 8, daysInQueue: 9 },
  { id: 'SUB-2026-103', insured: 'Southeast Healthcare Partners', lob: 'Professional Liability', premium: 192000, status: 'New', submittedDate: '2026-07-24', assignedTo: 'Neha Gupta', score: 6, daysInQueue: 3 },
  { id: 'SUB-2026-104', insured: 'Midwest Retail Group', lob: 'Package', premium: 112000, status: 'Referred', submittedDate: '2026-07-15', assignedTo: 'Senior UW', score: 4, daysInQueue: 12 },
  { id: 'SUB-2026-105', insured: 'Gulf Coast Logistics LLC', lob: 'Auto Liability', premium: 178000, status: 'New', submittedDate: '2026-07-25', assignedTo: 'Riya Sharma', score: 9, daysInQueue: 2 }
];
const UW_QUEUE = [
  { id: 'UWO-001', submissionId: 'SUB-2026-101', insured: 'Blue Ridge Manufacturing', lob: 'GL', premium: 87500, score: 7, daysInQueue: 5, status: 'New', assignedTo: 'Riya Sharma' },
  { id: 'UWO-002', submissionId: 'SUB-2026-102', insured: 'Pacific NW Timber Co.', lob: 'WC', premium: 245000, score: 8, daysInQueue: 9, status: 'In Review', assignedTo: 'Vikram Patel' },
  { id: 'UWO-003', submissionId: 'SUB-2026-103', insured: 'Southeast Healthcare Partners', lob: 'Prof Liab', premium: 192000, score: 6, daysInQueue: 3, status: 'New', assignedTo: 'Neha Gupta' },
  { id: 'UWO-004', submissionId: 'SUB-2026-104', insured: 'Midwest Retail Group', lob: 'Package', premium: 112000, score: 4, daysInQueue: 12, status: 'Referred', assignedTo: 'Senior UW' },
  { id: 'UWO-005', submissionId: 'SUB-2026-105', insured: 'Gulf Coast Logistics LLC', lob: 'Auto', premium: 178000, score: 9, daysInQueue: 2, status: 'New', assignedTo: 'Riya Sharma' }
];
const POLICY_VERSIONS = [
  { id: 'VER-001', policyId: 'POL-2026-001', version: 1, term: '1', status: 'Issued', effective: '2026-01-01', expiration: '2026-12-31', reason: 'New Business', createdBy: 'Riya Sharma', date: '2026-01-01' },
  { id: 'VER-002', policyId: 'POL-2026-004', version: 1, term: '1', status: 'Issued', effective: '2025-09-01', expiration: '2026-08-31', reason: 'New Business', createdBy: 'Neha Gupta', date: '2025-09-01' },
  { id: 'VER-003', policyId: 'POL-2026-004', version: 2, term: '1', status: 'Endorsed', effective: '2026-03-15', expiration: '2026-08-31', reason: 'Limit Increase', createdBy: 'Neha Gupta', date: '2026-03-15' },
  { id: 'VER-004', policyId: 'POL-2026-006', version: 1, term: '1', status: 'Issued', effective: '2025-01-01', expiration: '2025-12-31', reason: 'New Business', createdBy: 'Riya Sharma', date: '2025-01-01' },
  { id: 'VER-005', policyId: 'POL-2026-006', version: 2, term: '2', status: 'Renewed', effective: '2026-01-01', expiration: '2026-12-31', reason: 'Renewal', createdBy: 'Riya Sharma', date: '2026-01-01' },
  { id: 'VER-006', policyId: 'POL-2026-005', version: 1, term: '1', status: 'Issued', effective: '2025-04-01', expiration: '2026-03-31', reason: 'New Business', createdBy: 'Vikram Patel', date: '2025-04-01' },
  { id: 'VER-007', policyId: 'POL-2026-005', version: 2, term: '1', status: 'Cancelled', effective: '2025-04-01', expiration: '2025-12-15', reason: 'Non-Payment', createdBy: 'Vikram Patel', date: '2025-12-15' }
];
const BILLING_SCHEDULES = {
  'POL-2026-001': [
    { inst: 1, dueDate: '2026-01-01', amountDue: 31250, amountPaid: 31250, status: 'Paid', paidDate: '2026-01-01' },
    { inst: 2, dueDate: '2026-04-01', amountDue: 31250, amountPaid: 31250, status: 'Paid', paidDate: '2026-04-01' },
    { inst: 3, dueDate: '2026-07-01', amountDue: 31250, amountPaid: 0, status: 'Pending', paidDate: null },
    { inst: 4, dueDate: '2026-10-01', amountDue: 31250, amountPaid: 0, status: 'Pending', paidDate: null }
  ],
  'POL-2026-003': [
    { inst: 1, dueDate: '2025-06-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2025-06-01' },
    { inst: 2, dueDate: '2025-07-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2025-07-01' },
    { inst: 3, dueDate: '2025-08-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2025-08-01' },
    { inst: 4, dueDate: '2025-09-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2025-09-05' },
    { inst: 5, dueDate: '2025-10-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2025-10-01' },
    { inst: 6, dueDate: '2025-11-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2025-11-03' },
    { inst: 7, dueDate: '2025-12-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2025-12-01' },
    { inst: 8, dueDate: '2026-01-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2026-01-02' },
    { inst: 9, dueDate: '2026-02-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2026-02-01' },
    { inst: 10, dueDate: '2026-03-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2026-03-01' },
    { inst: 11, dueDate: '2026-04-01', amountDue: 17500, amountPaid: 17500, status: 'Paid', paidDate: '2026-04-01' },
    { inst: 12, dueDate: '2026-05-01', amountDue: 17500, amountPaid: 0, status: 'Pending', paidDate: null }
  ]
};
const ACTIVITIES = [
  { timestamp: '2026-07-28 09:15 AM', user: 'Riya Sharma', action: 'Created', module: 'Submission', entity: 'SUB-2026-105', details: 'New submission for Gulf Coast Logistics LLC' },
  { timestamp: '2026-07-28 08:45 AM', user: 'Vikram Patel', action: 'Approved', module: 'Underwriting', entity: 'SUB-2026-102', details: 'UW decision: Approve - Pacific NW Timber Co.' },
  { timestamp: '2026-07-27 04:30 PM', user: 'Neha Gupta', action: 'Updated', module: 'Policy', entity: 'POL-2026-004', details: 'Endorsement completed - Limit Increase to $6M' },
  { timestamp: '2026-07-27 02:00 PM', user: 'Riya Sharma', action: 'Uploaded', module: 'Document', entity: 'POL-2026-001', details: 'Uploaded: Signed Application Form' },
  { timestamp: '2026-07-26 11:20 AM', user: 'Neha Gupta', action: 'Referred', module: 'Underwriting', entity: 'SUB-2026-104', details: 'Referred to Senior UW - score below threshold' },
  { timestamp: '2026-07-26 10:00 AM', user: 'Vikram Patel', action: 'Issued', module: 'Policy', entity: 'POL-2026-009', details: 'New policy issued - Renewal for Great Lakes' },
  { timestamp: '2026-07-25 03:15 PM', user: 'Riya Sharma', action: 'Submitted', module: 'Quote', entity: 'SUB-2026-105', details: 'Quote submitted for UW review' },
  { timestamp: '2026-07-25 01:00 PM', user: 'System', action: 'Payment', module: 'Billing', entity: 'POL-2026-003', details: 'Payment received - Installment 11' },
  { timestamp: '2026-07-24 04:00 PM', user: 'Neha Gupta', action: 'Created', module: 'Submission', entity: 'SUB-2026-103', details: 'New submission for Southeast Healthcare' },
  { timestamp: '2026-07-24 10:30 AM', user: 'Riya Sharma', action: 'Updated', module: 'Note', entity: 'POL-2026-001', details: 'Added UW note: Risk inspection completed' }
];
const AUDIT_LOGS = [
  { timestamp: '2026-07-28 09:15:00', user: 'Riya Sharma', entity: 'Submission', entityId: 'SUB-2026-105', field: 'Status', oldValue: 'Draft', newValue: 'New', ip: '10.0.1.45' },
  { timestamp: '2026-07-28 08:45:00', user: 'Vikram Patel', entity: 'Submission', entityId: 'SUB-2026-102', field: 'UW Decision', oldValue: 'Pending', newValue: 'Approved', ip: '10.0.1.32' },
  { timestamp: '2026-07-27 16:30:00', user: 'Neha Gupta', entity: 'Policy', entityId: 'POL-2026-004', field: 'Coverage Limit', oldValue: '$5,000,000', newValue: '$6,000,000', ip: '10.0.1.28' },
  { timestamp: '2026-07-27 16:30:00', user: 'Neha Gupta', entity: 'Policy', entityId: 'POL-2026-004', field: 'Premium', oldValue: '$43,200', newValue: '$51,840', ip: '10.0.1.28' },
  { timestamp: '2026-07-27 14:00:00', user: 'Riya Sharma', entity: 'Document', entityId: 'DOC-008', field: 'Status', oldValue: 'Draft', newValue: 'Final', ip: '10.0.1.45' },
  { timestamp: '2026-07-26 11:20:00', user: 'Neha Gupta', entity: 'Submission', entityId: 'SUB-2026-104', field: 'Status', oldValue: 'In Review', newValue: 'Referred', ip: '10.0.1.28' },
  { timestamp: '2026-07-26 11:20:00', user: 'Neha Gupta', entity: 'Submission', entityId: 'SUB-2026-104', field: 'Assigned To', oldValue: 'Neha Gupta', newValue: 'Senior UW', ip: '10.0.1.28' },
  { timestamp: '2026-07-26 10:00:00', user: 'Vikram Patel', entity: 'Policy', entityId: 'POL-2026-009', field: 'Status', oldValue: null, newValue: 'Active', ip: '10.0.1.32' },
  { timestamp: '2026-07-25 15:15:00', user: 'Riya Sharma', entity: 'Submission', entityId: 'SUB-2026-105', field: 'Premium', oldValue: '$0', newValue: '$178,000', ip: '10.0.1.45' },
  { timestamp: '2026-07-25 13:00:00', user: 'System', entity: 'Billing', entityId: 'POL-2026-003', field: 'Installment 11 Status', oldValue: 'Pending', newValue: 'Paid', ip: '10.0.1.1' },
  { timestamp: '2026-07-24 16:00:00', user: 'Neha Gupta', entity: 'Submission', entityId: 'SUB-2026-103', field: 'Status', oldValue: null, newValue: 'New', ip: '10.0.1.28' },
  { timestamp: '2026-07-24 10:30:00', user: 'Riya Sharma', entity: 'Note', entityId: 'POL-2026-001', field: 'Content', oldValue: null, newValue: 'Risk inspection completed. No issues found.', ip: '10.0.1.45' }
];
const DOCUMENTS = [
  { id: 'DOC-001', name: 'Signed Application Form', type: 'Application', policyId: 'POL-2026-001', uploadedBy: 'Riya Sharma', date: '2026-07-27', status: 'Final' },
  { id: 'DOC-002', name: 'Loss Runs Report', type: 'Application', policyId: 'POL-2026-003', uploadedBy: 'Vikram Patel', date: '2025-09-10', status: 'Final' },
  { id: 'DOC-003', name: 'Policy Document - GL Coverage Form', type: 'Policy Forms', policyId: 'POL-2026-001', uploadedBy: 'System', date: '2026-01-01', status: 'Final' },
  { id: 'DOC-004', name: 'Endorsement Form - Limit Increase', type: 'Endorsements', policyId: 'POL-2026-004', uploadedBy: 'Neha Gupta', date: '2026-03-15', status: 'Final' },
  { id: 'DOC-005', name: 'Renewal Quote Summary', type: 'Correspondence', policyId: 'POL-2026-006', uploadedBy: 'Riya Sharma', date: '2025-12-15', status: 'Final' },
  { id: 'DOC-006', name: 'Certificate of Insurance', type: 'Policy Forms', policyId: 'POL-2026-001', uploadedBy: 'Riya Sharma', date: '2026-02-10', status: 'Final' },
  { id: 'DOC-007', name: 'Cancellation Notice', type: 'Correspondence', policyId: 'POL-2026-005', uploadedBy: 'Vikram Patel', date: '2025-12-15', status: 'Final' },
  { id: 'DOC-008', name: 'Underwriting Guidelines Checklist', type: 'Application', policyId: 'POL-2026-007', uploadedBy: 'Neha Gupta', date: '2026-03-01', status: 'Draft' },
  { id: 'DOC-009', name: 'Claim Report - Incident CL-2026-112', type: 'Claims', policyId: 'POL-2026-003', uploadedBy: 'Claims Dept', date: '2026-06-20', status: 'Final' },
  { id: 'DOC-010', name: 'Billing Statement - Q2 2026', type: 'Correspondence', policyId: 'POL-2026-003', uploadedBy: 'System', date: '2026-07-01', status: 'Final' }
];
const NOTES = [
  { id: 'NOTE-001', policyId: 'POL-2026-001', author: 'Riya Sharma', role: 'Senior Underwriter', category: 'UW Note', content: 'Risk inspection completed at 4500 Industrial Blvd. No major concerns. Building sprinkler system upgraded last year.', timestamp: '2026-07-24 10:30 AM' },
  { id: 'NOTE-002', policyId: 'POL-2026-001', author: 'Vikram Patel', role: 'Underwriter', category: 'UW Note', content: 'Reviewed financials for ABC Construction. Revenue consistent with prior year. Debt ratio within threshold. Recommend renewal.', timestamp: '2026-07-22 02:15 PM' },
  { id: 'NOTE-003', policyId: 'POL-2026-003', author: 'Neha Gupta', role: 'Billing Manager', category: 'Billing Note', content: 'Spoke with insured regarding late payment on Installment 4. They confirmed ACH issue resolved. Payment expected within 5 days.', timestamp: '2025-10-03 11:00 AM' },
  { id: 'NOTE-004', policyId: 'POL-2026-004', author: 'Riya Sharma', role: 'Senior Underwriter', category: 'UW Note', content: 'Endorsement for limit increase approved. Additional premium of $8,640 applies pro-rata from 3/15/2026.', timestamp: '2026-03-15 04:30 PM' },
  { id: 'NOTE-005', policyId: 'POL-2026-005', author: 'Vikram Patel', role: 'Underwriter', category: 'Claims Note', content: 'Claim CL-2026-089 received for Pioneer Energy. WC claim - back injury. Set reserve at $45,000.', timestamp: '2026-02-18 09:30 AM' },
  { id: 'NOTE-006', policyId: 'POL-2026-006', author: 'Riya Sharma', role: 'Senior Underwriter', category: 'UW Note', content: 'Renewal quoted at $94,800. Experience mod improved from 1.02 to 0.95 due to reduced loss ratio. Insured accepted.', timestamp: '2025-11-20 01:00 PM' },
  { id: 'NOTE-007', policyId: 'POL-2026-007', author: 'Neha Gupta', role: 'Underwriter', category: 'General', content: 'New submission for Sunrise Healthcare. Med Mal exposure assessed. Umbrella limit requested - need additional review.', timestamp: '2026-02-01 10:00 AM' }
];
const USERS = [
  { id: 'USR-001', name: 'Riya Sharma', email: 'policyadmin@gamil.com', role: 'Senior Underwriter', department: 'Underwriting', status: 'Active', lastLogin: '2026-07-28 09:10 AM', mfa: true },
  { id: 'USR-002', name: 'Vikram Patel', email: 'vikram@southlake.com', role: 'Underwriter', department: 'Underwriting', status: 'Active', lastLogin: '2026-07-28 08:30 AM', mfa: true },
  { id: 'USR-003', name: 'Neha Gupta', email: 'neha@southlake.com', role: 'Billing Manager', department: 'Billing', status: 'Active', lastLogin: '2026-07-27 04:00 PM', mfa: false },
  { id: 'USR-004', name: 'Amit Singh', email: 'amit@southlake.com', role: 'System Admin', department: 'IT', status: 'Active', lastLogin: '2026-07-28 07:45 AM', mfa: true },
  { id: 'USR-005', name: 'Priya Mehta', email: 'ppolicyadmin@gamil.com', role: 'Claims Adjuster', department: 'Claims', status: 'Active', lastLogin: '2026-07-27 05:30 PM', mfa: false },
  { id: 'USR-006', name: 'Rahul Verma', email: 'rahul@southlake.com', role: 'Viewer', department: 'Finance', status: 'Inactive', lastLogin: '2026-06-15 02:00 PM', mfa: false }
];
const ROLES = [
  { name: 'Super Admin', description: 'Full system access - all modules and actions', userCount: 1, permissions: ['All'] },
  { name: 'Senior Underwriter', description: 'UW approval authority up to $500K, policy endorsements, renewals', userCount: 1, permissions: ['Policy:View,Edit,Approve', 'UW:Full', 'Billing:View', 'Reports:All'] },
  { name: 'Underwriter', description: 'New submissions, risk assessment, quote generation', userCount: 1, permissions: ['Policy:View,Edit', 'UW:Assess,Quote', 'Billing:View', 'Reports:View'] },
  { name: 'Billing Manager', description: 'Billing plans, payment processing, statements', userCount: 1, permissions: ['Policy:View', 'Billing:Full', 'Reports:Billing'] },
  { name: 'Claims Adjuster', description: 'Claims management, reserves, payments', userCount: 1, permissions: ['Policy:View', 'Claims:Full', 'Reports:Claims'] }
];
const SYSTEM_SETTINGS = [
  { key: 'MAX_LOGIN_ATTEMPTS', value: '5', description: 'Maximum failed login attempts before temporary lockout' },
  { key: 'PASSWORD_MIN_LENGTH', value: '8', description: 'Minimum characters required for user passwords' },
  { key: 'SESSION_TIMEOUT', value: '60', description: 'Session expiry in minutes of inactivity' },
  { key: 'MFA_REQUIRED', value: 'true', description: 'Multi-factor authentication required for all users' },
  { key: 'DEFAULT_BILLING_TERM', value: 'Net 30', description: 'Default payment term for new policies' },
  { key: 'AUTO_RENEWAL_WINDOW', value: '60 days', description: 'Days before expiration to auto-initiate renewal' },
  { key: 'UW_APPROVAL_THRESHOLD', value: '$500,000', description: 'Premium threshold requiring Senior UW approval' },
  { key: 'MAX_INSTALLMENTS', value: '12', description: 'Maximum number of billing installments allowed' },
  { key: 'CANCELLATION_GRACE_DAYS', value: '10', description: 'Days past due before cancellation triggers' },
  { key: 'REINSTATEMENT_WINDOW', value: '30 days', description: 'Days after cancellation during which reinstatement is allowed' }
];

const INFO_DATA = {
  'policy-number': { title: 'Policy Number', what: 'Unique alphanumeric identifier assigned to every insurance policy. Format: POL-YYYY-NNN.', why: 'Used to track, reference, and retrieve a policy across all modules — billing, claims, endorsements, renewals, and compliance reporting.', flow: 'Auto-generated when a policy is bound and issued. Referenced on every transaction, document, and communication throughout the policy lifecycle.' },
  'policy-status': { title: 'Policy Status', what: 'Current state of the policy in its lifecycle — Active, Pending, Endorsed, Renewed, Cancelled, Expired, etc.', why: 'Determines what actions are available (endorse, renew, cancel) and controls system behavior like billing and coverage validation.', flow: 'Changes through the policy lifecycle: New > Pending > Active > Endorsed/Renewed/Cancelled. Each transition is audited and updates downstream systems.' },
  'lob': { title: 'Line of Business', what: 'Category of insurance coverage — General Liability, Professional Liability, Property, Auto, Workers Compensation, Package.', why: 'Determines underwriting rules, rating formulas, coverage forms, and regulatory requirements. Each LOB has distinct risk profiles.', flow: 'Selected during new submission. Drives coverage options, premium calculation, UW guidelines, and report segmentation.' },
  'effective-date': { title: 'Effective Date', what: 'The date on which insurance coverage begins. All claims occurring on or after this date are covered.', why: 'Defines the policy term start. Premium is calculated from this date. Endorsements and cancellations reference effective dates for pro-rata adjustments.', flow: 'Set during quote/bind. Can be future-dated or retroactive (subject to UW approval). Changes require endorsement.' },
  'expiration-date': { title: 'Expiration Date', what: 'The date on which insurance coverage ends. Also called the policy term end date.', why: 'Defines the policy boundary. Renewal must occur before this date to avoid lapse in coverage.', flow: 'Set at policy issue. Renewal creates a new term with new expiration. Cancellation creates a new (earlier) expiration.' },
  'premium': { title: 'Premium', what: 'The amount charged for insurance coverage. Can be expressed as annual, installment, or total transaction amount.', why: 'Primary revenue for the carrier. Drives billing schedules, commission calculations, taxes, and statutory reporting.', flow: 'Calculated during quoting (base + modifications + taxes). Changes via endorsement or renewal. Impacts billing installments.' },
  'deductible': { title: 'Deductible', what: 'The amount the insured pays out-of-pocket before insurance coverage applies to a claim.', why: 'Risk-sharing mechanism between insured and carrier. Higher deductibles typically lower premium. Influences claims handling process.', flow: 'Set during submission. Can be changed mid-term via endorsement. Affects premium calculation and claims payment.' },
  'uw-score': { title: 'Underwriting Score', what: 'Numeric risk assessment score (1-10) calculated based on insured financials, loss history, industry class, and exposure analysis.', why: 'Helps underwriters quickly assess risk quality. Scores below 5 trigger additional review or referral.', flow: 'Calculated automatically on submission. Used in UW queue prioritization. Score thresholds determine approval authority levels.' },
  'uw-decision': { title: 'Underwriting Decision', what: 'The formal determination by an underwriter on whether to accept, refer, or decline an insurance submission.', why: 'Gatekeeper function — ensures only appropriately priced risks enter the portfolio. Protects carrier profitability.', flow: 'Approve > proceeds to bind/issue. Refer > escalates to senior UW. Decline > submission closed, notification sent to agent.' },
  'bind': { title: 'Bind', what: 'The act of accepting a risk after underwriting approval. Creates a temporary coverage contract until the formal policy is issued.', why: 'Provides immediate coverage. Transitions the submission from "quoted" to "bound" status. Triggers policy number generation.', flow: 'UW approval > Bind > Issue policy > Active status. Billing begins after bind.' },
  'coverage': { title: 'Coverage', what: 'Specific protection provided under an insurance policy — what is covered, limits, deductibles, and exclusions.', why: 'Defines the scope of protection. Each coverage has its own limit, deductible, and rating basis.', flow: 'Selected during submission. Confirmed at bind. Changed via endorsement. Each coverage drives a portion of the premium.' },
  'endorsement': { title: 'Endorsement', what: 'A mid-term change to an existing policy that modifies coverages, limits, deductibles, named insureds, or terms.', why: 'Policies are not static — businesses change. Endorsements allow flexibility while maintaining continuous coverage.', flow: 'Created from Policy Details > Endorse. Changes premium pro-rata. Creates new policy version. Billing is adjusted.' },
  'renewal': { title: 'Renewal', what: 'The process of extending coverage beyond the current policy term, typically with a new term, revised premium, and updated coverages.', why: 'Retains existing customers. Renewal premium is often different due to loss experience and market conditions.', flow: 'Initiated before expiration. Creates new policy term/version. New premium calculated. Billing schedule resets.' },
  'cancellation': { title: 'Cancellation', what: 'Early termination of a policy before its natural expiration date. Can be initiated by insured or carrier.', why: 'Needed when coverage is no longer required, risk becomes unacceptable, or payment is not received.', flow: 'Reason selected > Effective date set > Premium adjustment (flat/pro-rata/short-rate) > Status changes to Cancelled.' },
  'reinstatement': { title: 'Reinstatement', what: 'Restoring a cancelled policy back to active status, typically within a grace period and with a reinstatement fee.', why: 'Preserves original policy terms and continuous coverage history. Avoids needing new underwriting and new application.', flow: 'Requested within reinstatement window (30 days). Fee assessed. Policy returned to Active status with original terms.' },
  'premium-breakdown': { title: 'Premium Breakdown', what: 'Detailed calculation showing how the total premium is derived — base, modifications, credits, taxes, and fees.', why: 'Transparency in pricing. Required for regulatory compliance and audit.', flow: 'Calculated during quoting. Base premium x Mod Factor x Schedule Credit = Subtotal. Taxes and fees added.' },
  'experience-mod': { title: 'Experience Modification Factor', what: 'A multiplier applied to the base premium based on historical loss experience.', why: 'Incentivizes safety and loss prevention. Directly links past claims to future premium.', flow: 'Pulled from rating bureau. Applied during premium calculation. Reviewed at renewal.' },
  'schedule-credit': { title: 'Schedule Credit / Debit', what: 'A discretionary adjustment to premium based on risk factors not captured by class rating.', why: 'Allows UW flexibility to price risks more accurately. Credits reward better risks.', flow: 'Applied during UW review. Expressed as percentage of subtotal. Must be documented with rationale.' },
  'billing-plan': { title: 'Billing Plan', what: 'The payment schedule structure for the policy premium — Annual, Semi-Annual, Quarterly, or Monthly installments.', why: 'Provides payment flexibility to insureds. Affects carrier cash flow.', flow: 'Selected at bind. Default based on premium size. Late payments trigger cancellation process.' },
  'installment': { title: 'Installment', what: 'A scheduled partial payment of the total annual premium divided across multiple billing periods.', why: 'Makes insurance more affordable by spreading cost.', flow: 'Generated when policy is issued. Each due date is tracked. Late payment triggers grace period then cancellation.' },
  'document-type': { title: 'Document Type', what: 'Classification of uploaded documents — Application, Policy Forms, Endorsements, Correspondence, Claims, Certificates.', why: 'Organizes documents for easy retrieval. Determines retention periods and compliance requirements.', flow: 'Selected during document upload. Filters available in document list.' },
  'audit-trail': { title: 'Audit Trail', what: 'A chronological record of all changes made to data — who changed what, when, and what the old and new values were.', why: 'Required for regulatory compliance (SOX, NAIC). Provides accountability. Enables reconstruction of policy history.', flow: 'Every create/update/delete operation generates audit entries. Field-level changes captured. Immutable and append-only.' },
  'activity-log': { title: 'Activity Log', what: 'A user-friendly record of significant events and actions performed in the system.', why: 'Provides operational visibility. Helps supervisors review work.', flow: 'Generated automatically for key actions. More summarized than audit trail.' },
  'quote': { title: 'Quote', what: 'A preliminary premium estimate and coverage proposal provided before the insured commits to purchase.', why: 'Allows prospects to evaluate cost and coverage before binding.', flow: 'Created during new submission. Valid for a limited period (typically 30-90 days). Must be accepted before bind.' },
  'policy-term': { title: 'Policy Term', what: 'The period during which a policy is in effect, defined by effective and expiration dates. Typically 6 or 12 months.', why: 'Establishes coverage boundaries. Each term has its own premium.', flow: 'Term 1 begins at policy issue. Renewal creates Term 2, 3, etc.' },
  'policy-version': { title: 'Policy Version', what: 'A snapshot of the policy at a point in time, capturing all terms, coverages, limits, and premium as they existed.', why: 'Provides historical record. Essential for claims handling and compliance audits.', flow: 'Created on every change — new business, endorsement, renewal, cancellation.' },
  'loss-run': { title: 'Loss Runs', what: 'A report showing the insureds historical claims activity — dates, amounts, statuses, and reserves.', why: 'Critical for UW evaluation. Predicts future loss potential.', flow: 'Requested during submission and renewal. Impacts UW decision and experience mod.' },
  'rating-basis': { title: 'Rating Basis', what: 'The exposure metric used to calculate premium — Gross Revenue, Payroll, Square Footage, Power Units, or Revenue.', why: 'Links premium to exposure size. Standard industry practice for commercial lines.', flow: 'Selected during submission. Verified by UW. Drives base premium calculation.' },
  'agent': { title: 'Agent / Broker', what: 'The licensed intermediary who represents the insured in obtaining insurance coverage.', why: 'Primary distribution channel. Receives commission on premium.', flow: 'Identified on submission. Handles insured communications.' },
  'underwriter': { title: 'Underwriter', what: 'The insurance professional who evaluates risk, determines pricing, and decides whether to accept or decline a submission.', why: 'Core risk selection function. UW expertise drives portfolio quality.', flow: 'Assigned to submission on receipt. Makes accept/refer/decline decision.' },
  'days-in-queue': { title: 'Days in Queue', what: 'The number of days a submission has been waiting in the underwriting queue since assignment.', why: 'Service level metric. Tracks UW responsiveness. Identifies stalled submissions.', flow: 'Counts from assignment date. Escalation triggers at threshold.' },
  'coverage-limit': { title: 'Coverage Limit', what: 'The maximum amount the insurer will pay for a covered loss. Can be per-occurrence, aggregate, or both.', why: 'Defines insurer maximum exposure. Higher limits = higher premium.', flow: 'Selected during submission. Confirmed at bind. Changed via endorsement.' },
  'submission-status': { title: 'Submission Status', what: 'Current processing stage — Draft, New, In Review, Referred, Approved, Declined, Bound.', why: 'Tracks progress through the UW workflow. Controls what actions are available.', flow: 'Draft > New > In Review > Approved/Referred/Declined. Approved > Bind > Issue.' },
  'taxes-fees': { title: 'Taxes & Fees', what: 'Statutory charges added to the premium — Surplus Lines Tax (SLA), Stamping Fee, and other assessments.', why: 'Legally required. Rates vary by state and LOB.', flow: 'Calculated as percentage of premium. Remitted monthly/quarterly to states.' },
  'uw-notes': { title: 'Underwriting Notes', what: 'Internal notes recorded during risk assessment — observations, rationale, decisions, and action items.', why: 'Documents UW thought process. Provides context for renewals and endorsements.', flow: 'Created during UW review. Visible to UW team. Retained for policy lifecycle.' },
  'reinstatement-window': { title: 'Reinstatement Window', what: 'The period after cancellation during which a policy can be reinstated without new underwriting.', why: 'Balances flexibility with risk management. Allows insured to correct issues.', flow: 'Set in System Settings (default 30 days). Fee assessed on reinstatement.' },
  'billing-balance': { title: 'Outstanding Balance', what: 'The total amount currently due — including past due installments, late fees, and additional premiums.', why: 'Key financial metric. Drives collection activities.', flow: 'Updated with each payment. Aging analysis tracks overdue amounts.' },
  'late-fee': { title: 'Late Fee', what: 'A penalty charge applied when a payment is not received by the due date.', why: 'Incentivizes timely payment. Compensates carrier for collection costs.', flow: 'Applied automatically after grace period. Varies by state regulation.' },
  'payment-history': { title: 'Payment History', what: 'A chronological record of all payments received — date, amount, method, reference number.', why: 'Provides payment transparency. Supports dispute resolution.', flow: 'Recorded with each payment. Links to specific installments.' },
  'commission': { title: 'Commission', what: 'The percentage of premium paid to the agent for placing and servicing the policy. Usually 10-20%.', why: 'Compensation for distribution channel. Varies by LOB.', flow: 'Calculated at bind based on agreed rate. Paid on collected premium.' },
  'renewal-offer': { title: 'Renewal Offer', what: 'Proposed terms for the next policy term including revised premium, coverages, limits, and conditions.', why: 'Starts renewal negotiation. Based on current term experience and loss history.', flow: 'Generated 60-90 days before expiration. Accepted > issue renewal.' },
  'pro-rata': { title: 'Pro-rata Cancellation', what: 'Premium adjustment that returns premium proportionally for the unused portion of the term.', why: 'Fair to both parties — insured pays only for time coverage was in force.', flow: 'Premium x (days used / total days) = earned premium. Difference = return premium.' },
  'short-rate': { title: 'Short-rate Cancellation', what: 'Premium adjustment that retains a penalty (typically 10%) on unearned premium.', why: 'Covers carrier acquisition costs. Used when insured cancels voluntarily.', flow: 'Pro-rata calculation x (1 + short-rate penalty). Less return premium than pure pro-rata.' },
  'flat-cancellation': { title: 'Flat Cancellation', what: 'Cancellation effective on or before the policy effective date with no premium owed or returned.', why: 'Used when insured cancels immediately after binding but before coverage takes effect.', flow: 'Only valid if no claims occurred. Full premium reversed. Commission chargeback.' },
  'additional-premium': { title: 'Additional Premium', what: 'Extra premium charged when an endorsement increases coverage, limits, or exposure mid-term.', why: 'Carrier charges for increased risk. Calculated pro-rata for remaining term.', flow: 'Calculated during endorsement. Difference between old and new premium x remaining term factor.' },
  'return-premium': { title: 'Return Premium', what: 'Amount returned to the insured when coverage is reduced or cancelled mid-term.', why: 'Insured should not pay for coverage not received.', flow: 'Calculated at cancellation. Refunded within regulatory timeframe.' },
  'claims-report': { title: 'Claims Report', what: 'Documented history of claims filed against the policy — dates, amounts paid, reserves, status.', why: 'Essential for UW evaluation. Drives experience modification.', flow: 'Requested at submission and renewal. Fed into experience mod calculation.' },
  'email-address': { title: 'Email Address', what: 'Registered email for the user account used for system login and notifications.', why: 'Primary identifier for user authentication. Used for OTP delivery and system alerts.', flow: 'Configured during user setup. Must be unique. Used in login flow and notification delivery.' },
  'password': { title: 'Password', what: 'Secret authentication credential used with email to verify user identity during login.', why: 'First factor of authentication. Protects unauthorized access to the system.', flow: 'Set during user creation or password reset. Must meet minimum length and complexity rules.' },
  'otp-code': { title: 'OTP Code', what: 'One-Time Password — a 6-digit temporary code sent to the registered email for second-factor authentication.', why: 'Provides an additional security layer beyond password (MFA). Prevents unauthorized access even if password is compromised.', flow: 'Generated and sent on login step 1. Expires after 5 minutes or after first use.' },
  'tx-code': { title: 'Transaction Code', what: 'Standardized code identifying the type of endorsement transaction. E.g., TX-ADD-INSURED, TX-LIMIT-INC.', why: 'Ensures consistent processing of endorsements. Maps to accounting entries, forms generation, and regulatory reporting.', flow: 'Selected based on endorsement type. Drives system behavior — which fields to show, what premium calculation to use, what documents to generate.' },
  'dashboard': { title: 'Dashboard', what: 'The main landing page showing KPIs, quick actions, recent activity, and upcoming renewals at a glance.', why: 'Provides a birds-eye view of portfolio health. Helps UW managers prioritize work and spot issues.', flow: 'First screen shown after login. Aggregates data from all modules — policies, submissions, billing, activities.' },
  'policy-search': { title: 'Policy Search', what: 'A searchable listing of all policies in the system with filters by status, LOB, and keywords.', why: 'Primary way to find and access policy details. Supports underwriting, servicing, and claims workflows.', flow: 'Accessed from sidebar or dashboard. Search results link to Policy Details for full information.' },
  'reports': { title: 'Reports', what: 'Pre-built analytical reports covering premium distribution, submission trends, UW performance, aging receivables, and more.', why: 'Provides business intelligence for management decisions. Supports regulatory and reinsurance reporting.', flow: 'Accessed from sidebar. Each report can be run on-demand or scheduled for periodic delivery.' },
  'admin': { title: 'Administration', what: 'System configuration area for managing users, roles, permissions, and system settings.', why: 'Controls who has access to what. Configures system-wide behavior and business rules.', flow: 'Accessed by Super Admin and System Admin users. Changes are audited for compliance.' },
  'doc-status': { title: 'Document Status', what: 'Current state of a document in its workflow — Draft, Final, Pending Approval, Rejected.', why: 'Tracks document processing. Controls visibility and regulatory compliance.', flow: 'Draft > Final (after review). Some documents require approval workflow.' },
  'cancel-reason': { title: 'Cancellation Reason', what: 'The coded reason for policy cancellation — Non-Payment, Insured Request, Underwriting Non-Renewal, Duplicate Coverage, Fraud.', why: 'Determines cancellation type (flat/pro-rata/short-rate), refund calculation, and regulatory reporting.', flow: 'Selected during cancellation. Drives premium adjustment method and commission chargeback rules.' },
  'cancel-notice': { title: 'Cancellation Notice', what: 'The type of advance notice provided to the insured before cancellation takes effect.', why: 'Legally required in most states. Notice period varies by cancellation reason and jurisdiction.', flow: 'Generated and sent via mail/email. Notice period counted from delivery date to effective date.' },
  'cancel-impact': { title: 'Cancellation Premium Impact', what: 'Financial calculation showing how cancellation affects earned premium, unearned premium, and return premium.', why: 'Determines the refund (or additional charge) due at cancellation. Varies by cancellation type.', flow: 'Calculated based on cancellation type, effective date, paid premium, and policy term.' },
  'reinstatement-fee': { title: 'Reinstatement Fee', what: 'A one-time fee charged to reinstate a cancelled policy. Typically a flat amount or percentage of premium.', why: 'Covers administrative costs of reinstatement. Deters frivolous cancellations and reinstatements.', flow: 'Applied when reinstatement is approved. Must be paid before policy returns to Active status.' }
};

let loginStep = 1;

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById('screen-' + screenId);
  if (screen) screen.classList.add('active');
  const navItem = document.getElementById('nav-' + screenId);
  if (navItem) navItem.classList.add('active');
  if (screenId !== 'login') {
    document.getElementById('main-app').style.display = 'flex';
    document.getElementById('screen-login').style.display = 'none';
  }
}

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
  document.getElementById('main-app').style.display = 'none';
  document.getElementById('screen-login').style.display = 'flex';
  document.getElementById('login-step-1').classList.add('active');
  document.getElementById('login-step-2').classList.remove('active');
  document.querySelector('.login-step-indicator').textContent = 'Step 1: Sign In';
}

function showInfo(key) {
  const data = INFO_DATA[key];
  if (!data) return;
  document.getElementById('info-modal-title').textContent = data.title;
  document.getElementById('info-modal-what').textContent = data.what;
  document.getElementById('info-modal-why').textContent = data.why;
  document.getElementById('info-modal-flow').textContent = data.flow;
  document.getElementById('info-modal').classList.add('open');
}

function closeInfo() {
  document.getElementById('info-modal').classList.remove('open');
}

function switchTab(tabBarId, tabName) {
  const bar = document.getElementById(tabBarId);
  if (!bar) return;
  bar.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  const contents = bar.parentElement.querySelectorAll('.tab-content');
  contents.forEach(t => t.classList.remove('active'));
  bar.querySelector('.tab-item[data-tab="' + tabName + '"]').classList.add('active');
  document.getElementById('tab-' + tabName).classList.add('active');
}

function goToStep(wizardId, step) {
  const wizard = document.getElementById(wizardId);
  wizard.querySelectorAll('.wizard-step').forEach((s, i) => {
    s.classList.toggle('done', i < step - 1);
    s.classList.toggle('active', i === step - 1);
  });
  wizard.querySelectorAll('.wizard-body > div').forEach((s, i) => {
    s.style.display = i === step - 1 ? 'block' : 'none';
  });
  const footer = wizard.querySelector('.wizard-footer');
  if (footer) {
    const backBtn = footer.querySelector('.btn-wizard-back');
    const nextBtn = footer.querySelector('.btn-wizard-next');
    if (backBtn) backBtn.style.display = step === 1 ? 'none' : '';
    if (nextBtn) nextBtn.textContent = step === 5 ? 'Submit' : 'Next';
  }
}

function advanceWizard(wizardId) {
  const wizard = document.getElementById(wizardId);
  const allSteps = wizard.querySelectorAll('.wizard-step');
  let currentIdx = 0;
  allSteps.forEach((s, i) => { if (s.classList.contains('active')) currentIdx = i; });
  if (currentIdx < allSteps.length - 1) goToStep(wizardId, currentIdx + 2);
}

function viewPolicy(policyId) {
  showScreen('policy-details');
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', function(e) {
      if (e.target === this) this.classList.remove('open');
    });
  });
  document.getElementById('screen-login').style.display = 'flex';
  document.getElementById('main-app').style.display = 'none';
});
