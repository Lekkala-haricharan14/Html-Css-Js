const { saveInsurance } = require("./storage");

/*
  Insurance class
*/
class Insurance {
    constructor(userId, accountNumber, type, premium, years) {
        this.insuranceId = `INS${Date.now()}`;
        this.userId = userId;
        this.accountNumber = accountNumber;
        this.type = type;           // Health / Life / Vehicle
        this.premium = premium;
        this.coverageYears = years;
        this.startDate = new Date().toISOString();
        this.status = "ACTIVE";
    }

    // Save insurance data to JSON
    save() {
        saveInsurance(this);
        return this;
    }
}

module.exports = Insurance;
