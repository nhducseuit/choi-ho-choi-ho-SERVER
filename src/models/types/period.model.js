class Period {
    constructor(
        unit,
        amount
    ) {
        this.unit = unit;
        this.amount = amount;
    }

    static period(period) {
        return new Period(period.unit, period.amount);
    }
}

module.exports = Period;