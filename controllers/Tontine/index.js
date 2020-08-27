const differenceInCalendarMonths = require('date-fns/differenceInCalendarMonths');
const compareAsc = require('date-fns/compareAsc');
const endOfMonth = require('date-fns/endOfMonth');
const startOfMonth = require('date-fns/startOfMonth');
const add = require('date-fns/add');

const MongoService = require('../../services/mongo.service');
const InvestorService = require('../../services/investor.service');
const TontineService = require('../../services/tontine.service');

const mongoService = new MongoService();
const investorService = new InvestorService();
const tontineService = new TontineService();

const TONTINES_COLLECTION = 'tontines';

class TontineController {
    async getTontines(req, res) {
        return mongoService.getAllOfCollection(TONTINES_COLLECTION);
    }

    async getTontineById(req, res) {
        const tontineId = req.params.id;
        return mongoService.findById(tontineId, TONTINES_COLLECTION);
    }

    async createTontine(req, res) {
        const tontine = req.body;
        tontine.createdDate = new Date();
        tontine.updatedDate = tontine.createdDate;
        tontine.startDate = new Date(tontine.startDate);
        return mongoService.insertToCollection(tontine, TONTINES_COLLECTION);
    }

    async updateTontine(req, res) {
        const update = req.body;
        const tontineId = req.params.id;
        return mongoService.updateToCollection(tontineId, update, TONTINES_COLLECTION);
    }

    async deleteTontine(req, res) {
        const tontineId = req.params.id;
        return mongoService.deleteDocument(tontineId, TONTINES_COLLECTION);
    }

    async shiftRound(req, res) {
        // request data structure:
        // {
        //   tontineId: "",
        //   startDate: null,
        //   endDate: null,
        //   sum: 0,
        //   schedule: [
        //     {
        //       index: 0,
        //       investee: ""
        //     },
        //     {
        //       index: 1,
        //       investee: ""
        //     }
        //   ]
        // }

        // Validate sum: must not be 0 or negative. Validation failed, reject
        // Validate schedule: must not be an empty array or falsy.
        // Validate tontineId. Validation failed, reject
        // Validate last round: round is ended. Validation failed, reject
        // Validate startDate: must be greater than last endDate (endDate of last round). Validation failed, reject
        // Validate endDate: must combine with startDate to be sufficient to complete the scheduled invesetment plan
        // Validate schedule: must contain all investor with status other than LEFT stored in database. Validation failed, reject
        // TODO apply validation on model level
        const sum = req.sum + 0;
        if (typeof sum !== 'number' || sum <= 0) {
            res.status(400).send('Invalid invest amount. Must be greater than 0');
            return;
        }
        const schedule = req.schedule;
        if (!schedule || !Array.isArray(schedule) || schedule.length === 0) {
            res.status(400).send('Schedule must be defined to start a new round.');
            return;
        }
        const size = schedule.length;
        const tontineId = req.tontineId + '';
        if (!tontineId || tontineId.length === 0) {
            res.status(400).send('Invalid tontine id');
            return;
        }
        let tontine = await tontineService.findByTontineId(tontineId);
        const lastRound = tontine.rounds ? tontine.rounds[tontine.rounds] : null;
        if (lastRound) {
            if (!isRoundEnding(lastRound)) {
                res.status(400).send('To start a new round, current round must end first');
                return;
            }
        }
        let startDate = new Date(req.startDate + 0);
        const period = tontine.period;
        const lastEndDate = lastRound.endDate;
        let endDate;
        if (period.unit === 'Month') {
            if (compareAsc(startDate, lastEndDate) !== 1 || differenceInCalendarMonths(lastEndDate, startDate) === 0) {
                res.status(400).send('Start time of the new round overlaps with last round');
                return;
            }
            // Smooth start/endDate
            endDate = endOfMonth(add(startDate, { months: size }));
            startDate = startOfMonth(startDate);
        }
        // Get all active investor
        let investors = await investorService.getActiveInvestor();
        if (investors.some(investor => !schedule.includes(sche => sche.investee === investor.id))) {
            res.status(400).send('Investment plan must include all active investor, or not included investor must leave first');
            return;
        }

        // Finish validation, start creating new round
        const newRound = {
            startDate: startDate,
            endDate: endDate,
            size: size,
            sum: sum,
            turn: 0,
            schedule: schedule,
        };
        // Add new round to tontine
        if (Array.isArray(tontine.rounds)) {
            tontine.rounds.push(newRound);
        } else {
            tontine.rounds = [newRound];
        }

        // Save to database
        await mongoService.updateToCollection(tontineId, tontine, TONTINES_COLLECTION);

        // Perform first turn of investment, with turn of round remains 0
        const investee = investors.find(investor => investor.id === newRound.schedule.find(sche => sche.index === newRound.turn).investee).toArray();
        investors.forEach(investor => {
            invest(investor, investee, currentRound);
        });

        await Promise.all(investors.map(investor => investorService.updateInvestor(investor.id, { status: investor.status, debt: investor.debt })));

        return tontineService.findByTontineId(tontineId);
    }

    async getInvestors(req, res) {
        const tontineId = req.params.id;
        return investorService.getInvestorsOfTontine(tontineId);
    }

    invest(investor, investee, currentRound) {
        if (investor.id === investee.id) {
            // Not investing to itself, skip
            return;
        }
        const investAmount = (investor.turns * currentRound.sum);
        investor.debt -= investAmount;
        investor.status = 'INVESTED';
        investee.debt += investAmount;
    }
    isRoundEnding(round) {
        return round.turn === round.size - 1;
    }
}
module.exports = TontineController;