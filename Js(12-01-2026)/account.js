const {
    saveTransaction,
    updateAccountBalance
} = require("./storage");

/*
  Base class for all account types
*/
class FinancialAccount {
    constructor(accountNumber, holder, balance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = holder;
        this._balance = balance; // protected balance
        this.transactions = [];
    }

    // Getter to safely read balance
    get balance() {
        return this._balance;
    }

    // Deposit money into account
    deposit(amount, description = "Deposit") {
        this._balance += amount;
        this.recordTransaction(amount, "credit", description);
    }

    // Withdraw money from account
    withdraw(amount, description = "Withdrawal") {
        if (amount > this._balance) {
            throw new Error("Insufficient funds");
        }
        this._balance -= amount;
        this.recordTransaction(amount, "debit", description);
    }

    /*
      Records a transaction and:
      1. Saves it in JSON
      2. Updates account balance in JSON
    */
    recordTransaction(amount, type, description) {
        const transaction = {
            accountNumber: this.accountNumber,
            userId: this.userId,
            type,
            amount,
            description,
            balanceAfter: this._balance,
            date: new Date().toISOString()
        };

        this.transactions.push(transaction);
        saveTransaction(transaction);
        updateAccountBalance(this.accountNumber, this._balance);
    }
}

// Savings account
class SavingsAccount extends FinancialAccount {
    constructor(acc, holder, bal, rate = 0.02) {
        super(acc, holder, bal);
        this.interestRate = rate;
        this.accountType = "Savings";
    }
}

// Checking account
class CheckingAccount extends FinancialAccount {
    constructor(acc, holder, bal, overdraft = 500) {
        super(acc, holder, bal);
        this.overdraftLimit = overdraft;
        this.accountType = "Checking";
    }
}

// Investment account (extends savings)
class InvestmentAccount extends SavingsAccount {
    constructor(acc, holder, bal, rate, risk) {
        super(acc, holder, bal, rate);
        this.riskLevel = risk;
        this.accountType = "Investment";
    }
}

module.exports = {
    SavingsAccount,
    CheckingAccount,
    InvestmentAccount
};
