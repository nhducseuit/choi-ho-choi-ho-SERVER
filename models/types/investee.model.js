class Investee {

    constructor(
        investorId,
        dateStart,
        dateEnd
    ) {
        this.investorId = investorId;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    static investee(investee) {
        return new Investee(
            investee.investorId,
            new Date(investee.dateStart),
            new Date(investee.dateEnd)
        );
    }
}

module.exports = Investee;