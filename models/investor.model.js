const BankProfile = require("./types/bank-profile.model");
const uuid = require('../utils/uuid.util');

class Investor {
    constructor(
        id,
        createdDate,
        updatedDate,
        name,
        alias,
        phoneNumber,
        bank
    ) {
        this.id = id;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.name = name;
        this.alias = alias;
        this.phoneNumber = phoneNumber;
        this.bank = bank;
    }

    static investor(investor) {
        return new Investor(
            uuid(),
            new Date(),
            new Date(),
            investor.name,
            investor.alias,
            investor.phoneNumber,
            new BankProfile(
                investor.bank.bank,
                investor.bank.accountNumber,
                investor.bank.cardNumber,
                investor.bank.nameOnCard
            )
        );
    }
}

module.exports = Investor;