const fs = require("fs");

const FILE = "bankData.json";

/*
  Ensure the JSON file exists.
  If not, create it with empty arrays.
*/
function init() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(
            FILE,
            JSON.stringify(
                {
                    users: [],
                    accounts: [],
                    transactions: [],
                    insurances: []
                },
                null,
                2
            )
        );
    }
}

// Read data from JSON file
function read() {
    init();
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

// Write updated data back to JSON file
function write(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

/* ---------- SAVE OPERATIONS ---------- */

// Save user details
function saveUser(user) {
    const db = read();

    // Prevent duplicate users
    const exists = db.users.find(u => u.userId === user.userId);

    if (!exists) {
        db.users.push(user);
        write(db);
    }
}

function saveAccount(account) {
    const db = read();

    // Account number must be unique
    const exists = db.accounts.find(
        acc => acc.accountNumber === account.accountNumber
    );

    if (!exists) {
        db.accounts.push(account);
        write(db);
    }
}


// Save every transaction (deposit / withdraw / insurance)
function saveTransaction(transaction) {
    const db = read();
    db.transactions.push(transaction);
    write(db);
}

// Update account balance after every transaction
function updateAccountBalance(accountNumber, newBalance) {
    const db = read();
    const account = db.accounts.find(
        acc => acc.accountNumber === accountNumber
    );

    if (account) {
        account.balance = newBalance;
        write(db);
    }
}

// Save insurance details
function saveInsurance(insurance) {
    const db = read();
    db.insurances.push(insurance);
    write(db);
}

/* ---------- READ OPERATIONS (for console.table) ---------- */

// Get all users
function getUsers() {
    return read().users;
}

// Get all accounts
function getAccounts() {
    return read().accounts;
}

// Get all insurances
function getInsurances() {
    return read().insurances;
}

// Get transactions for a specific account
function getTransactionsByAccount(accountNumber) {
    return read().transactions.filter(
        tx => tx.accountNumber === accountNumber
    );
}

module.exports = {
    saveUser,
    saveAccount,
    saveTransaction,
    updateAccountBalance,
    saveInsurance,
    getUsers,
    getAccounts,
    getInsurances,
    getTransactionsByAccount
};
