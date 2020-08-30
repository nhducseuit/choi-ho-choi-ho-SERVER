class BankProfile {
    constructor(
        bank,
        accountNumber,
        cardNumber,
        nameOnCard
    ) {
        this.bank = bank;
        this.accountNumber = accountNumber;
        this.cardNumber = cardNumber;
        this.nameOnCard = nameOnCard;
    }

    static bankProfile(bankProfile) {
        return new BankProfile(bankProfile.bank, bankProfile.accountNumber, bankProfile.cardNumber, bankProfile.nameOnCard);
    }
}

module.exports = BankProfile;
