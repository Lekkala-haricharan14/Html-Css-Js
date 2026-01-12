const poStore = [];

// ================================
// GENERATE PO ID
// ================================
function generatePOId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";

  for (let i = 0; i < 3; i++) {
    id += letters[Math.floor(Math.random() * letters.length)];
  }
  for (let i = 0; i < 3; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}

// ================================
// CREATE PO
// ================================
function createPO(trainerName, subject, paymentBasis, rate) {
  const po = {
    poId: generatePOId(),
    trainerName,
    subject,
    paymentBasis, // Monthly | Weekly | Daily | Hourly
    rate,
    createdDate: new Date("2025-01-01")
  };

  poStore.push(po);
  console.log("✅ PO Created:", po);
  return po;
}

// ================================
// ELIGIBILITY CHECK
// ================================
function isEligible(poDate) {
  const diffDays =
    (new Date() - poDate) / (1000 * 60 * 60 * 24);
  return diffDays >= 30;
}

// ================================
// GENERATE INVOICE (SIMPLE 🔥)
// ================================
function generateInvoice(po, units = 1) {

  if (!po || !po.poId) {
    console.log("❌ Invalid PO");
    return;
  }

  if (!isEligible(po.createdDate)) {
    console.log("❌ Not Eligible: 30 days not completed");
    return;
  }

  let grossAmount =
    po.paymentBasis === "Monthly"
      ? po.rate
      : po.rate * units;

  const tds = grossAmount * 0.10;
  const netPay = grossAmount - tds;

  console.log("✅ Invoice Generated:", {
    invoiceId: "INV-" + po.poId,
    paymentBasis: po.paymentBasis,
    units,
    grossAmount,
    tdsDeducted: tds,
    netPayable: netPay
  });
}
const poMonthly = createPO(
  "Sarath",
  "Java Training",
  "Monthly",
  100000
);

generateInvoice(poMonthly);
const poDaily = createPO(
  "Sarath",
  "Java Training",
  "Daily",
  2000
);

generateInvoice(poDaily, 20);
const poHourly = createPO(
  "Sarath",
  "Java Training",
  "Hourly",
  500
);

generateInvoice(poHourly, 160);
