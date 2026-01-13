const Bank = require("./bank");
const {
    getUsers,
    getAccounts,
    getInsurances,
    getTransactionsByAccount
} = require("./storage");

const bank = new Bank("Global Finance Bank");

/* =====================================================
   EXISTING USERS & ACCOUNTS
===================================================== */

// User 1: John Doe
const sav1 = bank.openAccount("savings", "SAV001", "John Doe", 5000);
const chk1 = bank.openAccount("checking", "CHK001", "John Doe", 2000);

// Transactions for John
sav1.deposit(500, "Bonus");
sav1.withdraw(300, "Shopping");
chk1.deposit(1000, "Freelance");
chk1.withdraw(400, "ATM");

// Insurance for John
bank.buyInsurance("SAV001", "Health", 1200, 5);

/* =====================================================
   NEW USER 3: Rahul Kumar
===================================================== */

const sav2 = bank.openAccount("savings", "SAV002", "Rahul Kumar", 8000);
const chk2 = bank.openAccount("checking", "CHK002", "Rahul Kumar", 3000);

// Transactions for Rahul
sav2.deposit(2000, "Salary");
sav2.withdraw(1500, "Rent Payment");

chk2.deposit(500, "Cash Deposit");
chk2.withdraw(700, "Online Shopping");

// Insurance for Rahul
bank.buyInsurance("SAV002", "Life", 2500, 10);

/* =====================================================
   NEW USER 4: Ananya Sharma
===================================================== */

const inv1 = bank.openAccount(
    "investment",
    "INV002",
    "Ananya Sharma",
    15000,
    0.05,
    "Medium"
);

// Transactions for Ananya
inv1.deposit(5000, "Year End Bonus");
inv1.withdraw(4000, "Mutual Fund Investment");

// Insurance for Ananya
bank.buyInsurance("INV002", "Health", 1800, 4);

/* =====================================================
   DISPLAY DATA USING console.table
===================================================== */

console.log("\n👤 ALL USERS");
console.table(getUsers());

console.log("\n🏦 ALL ACCOUNTS");
console.table(getAccounts());

console.log("\n🛡 ALL INSURANCES");
console.table(getInsurances());

console.log("\n💳 TRANSACTIONS - SAV001 (John Doe)");
console.table(getTransactionsByAccount("SAV001"));

console.log("\n💳 TRANSACTIONS - SAV002 (Rahul Kumar)");
console.table(getTransactionsByAccount("SAV002"));

console.log("\n💳 TRANSACTIONS - INV002 (Ananya Sharma)");
console.table(getTransactionsByAccount("INV002"));

console.log("\n✔ Demo completed successfully");
