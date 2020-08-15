class Invest {
    constructor(
        turnInRound,
        date,
        amount,
        type
    ) {
        this.turnInRound = turnInRound;
        this.amount = amount;
        this.date = date;
        this.type = type;
    }

    static invest(invest) {
        return new Invest(
            invest.turnInRound,
            new Date(invest.date),
            invest.amount,
            invest.type
        );
    }

    static getTurnInRound(round, date) {
        
    }
}

module.exports = Invest;