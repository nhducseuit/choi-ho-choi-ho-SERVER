const MongoService = require('../../services/mongo.service');
const TontineService = require('../../services/tontine.service');
const InvestorService = require('../../services/investor.service');
const handleError = require('../../middlewares/handle-error');

const mongoService = new MongoService();
const tontineService = new TontineService();
const investorService = new InvestorService();

const INVESTORS_COLLECTION = 'investors';

class InvestorController {
    async getInvestors(req, res) {
        return mongoService.getAllOfCollection(INVESTORS_COLLECTION);
    }

    async getInvestorById(req, res) {
        const investorId = req.params.id;
        return mongoService.findById(investorId, INVESTORS_COLLECTION);
    }

    async createInvestor(req, res) {
        // TODO maps from request body to investor object before further processing.
        let newInvestor = req.body;
        const tontineId = newInvestor.tontineId;
        delete newInvestor.tontineId;


        const investToCurrentRound = newInvestor.investToCurrentRound;
        delete newInvestor.investToCurrentRound;

        newInvestor.createdDate = new Date();
        newInvestor.updatedDate = newInvestor.createdDate;
        newInvestor.status = 'NEW';
        newInvestor.joinDate = new Date();
        newInvestor.debt = 0;


        let tontine;
        try {
            tontine = await tontineService.findByTontineId(tontineId);
        } catch (err) {
            handleError(res, err.message, "Failed to get tontine");
            return;
        }

        try {
            const investorExisted = await investorService.findInvestorByPhoneNumber(newInvestor.phoneNumber);
            if (investorExisted) {
                res.status(400).send('Investor with phone number ' + newInvestor.phoneNumber + ' already exists');
                return;
            }
        } catch (err) {
            handleError(res, err.message, "Failed to get investor");
            return;
        }

        // First save the investor
        try {
            await mongoService.insertToCollection(newInvestor, INVESTORS_COLLECTION);
            newInvestor = await investorService.findInvestorByPhoneNumber(newInvestor.phoneNumber);
        } catch (err) {
            handleError(res, err.message, 'Failed to add new investor');
            return;
        }

        // In case a round is on-going, add the new investor to current round
        const currentRound = tontine.rounds ? tontine.rounds[tontine.rounds.length - 1] : null;
        if (currentRound && !isRoundEnding(currentRound)) {
            // Add to current round
            currentRound.size++;
            currentRound.schedule.push({
                index: currentRound.schedule.length - 1,
                investee: newInvestor.id
            });

            try {
                tontine = await tontineService.updateTontine(tontine.id, tontine);
            } catch (err) {
                handleError(res, err.message, 'Failed to add new investor to current round');
                return;
            }

            // If requested to invest to current on-going round, do invest
            if (investToCurrentRound) {
                let investee;
                try {
                    investee = await getInvestee(currentRound);
                } catch (err) {
                    handleError(res, err.message, 'Failed to get investee');
                    return;
                }
                // Invest and save investee
                // TODO in case investor is investee, we have to perform redundant queries below to persist non-changed data,
                // => room for optimisation
                invest(newInvestor, investee, currentRound);
                try {
                    await investorService.updateInvestor(investee.id, investee);
                    await investorService.updateInvestor(newInvestor.id, newInvestor);
                } catch (err) {
                    handleError(res, err.message, 'Failed to invest to current round');
                    return;
                }
            }

        }

        return {
            tontine: tontine,
            investor: newInvestor
        };
    }

    async getInvestee(req, res) {
        const tontineId = req.query.tontine;
        if (!tontineId) {
            res.status(400).end('Tontine ID is not provided');
            return;
        }
        try {
            const tontine = await tontineService.findByTontineId(tontineId);
        } catch (err) {
            handleError(res, err.message, 'Failed to get tontine');
            return;
        }

        const investee = tontine.investors.find(investor => {
            return investor.nextTurns.some(nt => nt === tontine.turn);
        });
        if (investee) {
            // required to provide debt by the end of current round
            investee.endOfRoundDebt = calculateDebtByEndOfRound(tontine, investee);
        }
        return investee;
    }

    calculateDebtByEndOfRound(tontine, investor) {
        const currentDebt = investor.debt;
        const currentTurn = tontine.turn;
        const round = tontine.round;
        const sum = tontine.sum;
        const remainingInvestedTurns = getRemainingTurnInARound(tontine, investor).length;
        return currentDebt - (investor.turns * sum * (round - currentTurn - 1 - remainingInvestedTurns)) + remainingInvestedTurns * sum * (round - investor.turns);
    }
    
    getRemainingTurnInARound(tontine, investor) {
        const remainingTurn = [];
        for (const turn of investor.nextTurns) {
            if (turn > tontine.turn) {
                remainingTurn.push(turn);
            }
        }
        return remainingTurn;
    }
}
module.exports = InvestorController;