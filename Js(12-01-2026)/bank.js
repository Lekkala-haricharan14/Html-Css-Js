// Import required helpers and account classes
const {
    saveUser,
    saveAccount,
    getUsers
} = require("./storage");

const {
    SavingsAccount,
    CheckingAccount,
    InvestmentAccount
} = require("./account");

const Insurance = require("./insurance");

/*
  Bank class:
  - Creates users
  - Opens accounts
  - Handles insurance purchase
*/
class Bank {
    constructor(name) {
        this.name = name;
        this.accounts = [];
    }

    /*
      Open a new account:
      - Reuse existing user if present
      - Create new user only if needed
      - Prevent duplicate account numbers (handled in storage)
    */
    openAccount(type, accNo, holder, balance, ...rest) {
        const users = getUsers();

        // Check if user already exists (by name)
        let existingUser = users.find(u => u.name === holder);

        let userId;
        if (existingUser) {
            userId = existingUser.userId;
        } else {
            userId = `USR${users.length + 1}`;
            saveUser({ userId, name: holder });
        }

        // Create appropriate account type
        let account;
        if (type === "savings") {
            account = new SavingsAccount(accNo, holder, balance, ...rest);
        } else if (type === "checking") {
            account = new CheckingAccount(accNo, holder, balance, ...rest);
        } else if (type === "investment") {
            account = new InvestmentAccount(accNo, holder, balance, ...rest);
        } else {
            throw new Error("Invalid account type");
        }

        // Attach userId to account
        account.userId = userId;

        // Save account only if it does not exist
        saveAccount({
            accountNumber: accNo,
            userId,
            type,
            balance
        });

        // Keep account in memory
        this.accounts.push(account);

        return account;
    }

    /*
      Buy insurance for an account:
      - Deduct premium from account
      - Save insurance details
    */
    buyInsurance(accountNumber, type, premium, years) {
        const account = this.accounts.find(
            acc => acc.accountNumber === accountNumber
        );

        if (!account) {
            throw new Error("Account not found");
        }

        // Deduct insurance premium
        account.withdraw(premium, `${type} Insurance Premium`);

        // Create and save insurance
        const insurance = new Insurance(
            account.userId,
            account.accountNumber,
            type,
            premium,
            years
        );

        return insurance.save();
    }
}

module.exports = Bank;
