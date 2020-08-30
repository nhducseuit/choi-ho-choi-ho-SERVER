const uuid = require('../utils/uuid.util');

class Round {
    constructor(
        id,
        createdDate,
        updatedDate,
        tontineId,
        dateStart,
        dateEnd,
        schedule
    ) {
        this.id = id;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.tontineId = tontineId;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.schedule = schedule;
    }

    static round(round) {
        return new Round(
            uuid(),
            new Date(),
            new Date(),
            round.tontineId,
            new Date(round.dateStart),
            new Date(round.dateEnd),
            round.schedule
        );
    }
}

module.exports = Round;
