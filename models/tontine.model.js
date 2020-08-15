const Period = require("./types/period.model");
const uuid = require('../utils/uuid.util');

class Tontine {
    constructor(
        id,
        createdDate,
        updatedDate,
        name,
        startDate,
        sum,
        period
    ) {
        this.id = id;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.name = name;
        this.startDate = startDate;
        this.sum = sum;
        this.period = period;
    }

    static tontine(tontine) {
        return new Tontine(
            uuid(),
            new Date(),
            new Date(),
            tontine.name,
            new Date(tontine.startDate),
            tontine.sum,
            new Period(
                tontine.period.unit,
                tontine.period.amount
            )
        );
    }
}

module.exports = Tontine;
