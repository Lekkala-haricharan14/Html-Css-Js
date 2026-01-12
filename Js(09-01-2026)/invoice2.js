const poStore = [];
const invoiceStore = [];

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
function createPO(trainerName, subject, paymentMode, rate, startDate, endDate) {
  const po = {
    poId: generatePOId(),
    trainerName,
    subject,
    paymentMode,
    rate,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    createdDate: new Date(),
  };

  poStore.push(po);
  console.log("✅ PO Created:", po);
  return po;
}

// ================================
// CHECK TRAINING COMPLETION
// ================================
function isTrainingCompleted(endDate) {
  return new Date() >= endDate;
}

// ================================
// GENERATE INVOICE
// ================================
function generateInvoice(po, units = 1) {
  if (!po || !po.poId) {
    console.log("❌ Invalid PO");
    return;
  }

  if (!isTrainingCompleted(po.endDate)) {
    console.log("❌ Training not completed. Cannot raise invoice.");
    return;
  }

  const grossAmount =
    po.paymentMode === "Monthly"
      ? po.rate
      : po.rate * units;

  const invoice = {
    invoiceId: "INV-" + po.poId,
    poId: po.poId,
    trainerName: po.trainerName,
    subject: po.subject,
    grossAmount,
    tds: grossAmount * 0.10,
    netPayable: grossAmount * 0.90,
    invoiceDate: new Date(),
    paymentStatus: "PENDING"
  };

  invoiceStore.push(invoice);

  console.log("✅ Invoice Generated:", invoice);
  return invoice;
}

// ================================
// PAYMENT OVERDUE CHECK
// ================================
function checkPaymentOverdue(invoice) {
  const diffDays =
    (new Date() - invoice.invoiceDate) / (1000 * 60 * 60 * 24);

  if (diffDays > 30 && invoice.paymentStatus === "PENDING") {
    sendOverdueMail(invoice, Math.floor(diffDays - 30));
  } else {
    console.log("✅ Payment within allowed period");
  }
}

// ================================
// SEND OVERDUE MAIL (SIMULATED)
// ================================
function sendOverdueMail(invoice, overdueDays) {
  console.log("📧 OVERDUE MAIL SENT");
  console.log(`
To: finance@company.com
Subject: Payment Overdue - ${invoice.invoiceId}

Payment for trainer ${invoice.trainerName}
is overdue by ${overdueDays} days.
Please process immediately.
`);
}

// ================================
// EXECUTION
// ================================
const po = createPO(
  "Sarath",
  "Java Full Stack Development",
  "Monthly",
  100000,
  "2024-11-01",   // training start
  "2024-12-01"    // training end
);

const invoice = generateInvoice(po);

// simulate overdue check (call via cron / scheduler)
checkPaymentOverdue(invoice);
