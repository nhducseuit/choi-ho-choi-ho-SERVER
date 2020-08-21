class Invest {
    constructor(
        date,
        amount,
        type
    ) {
        this.amount = amount;
        this.date = date;
        this.type = type;
    }

    static invest(invest) {
        return new Invest(
            new Date(invest.date),
            invest.amount,
            invest.type
        );
    }
}

module.exports = Invest;