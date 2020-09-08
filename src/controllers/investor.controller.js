const ServerException = require("../exceptions/server.exception");

const INVESTORS_COLLECTION = 'investors';

class InvestorController {
    constructor(mongoService, tontineService, investorService, investService) {
        this.mongoService = mongoService;
        this.tontineService = tontineService;
        this.investorService = investorService;
        this.investService = investService;
    }

    async getInvestors(req, res) {
        return this.mongoService.getAllOfCollection(INVESTORS_COLLECTION);
    }

    async getInvestorById(req, res) {
        const investorId = req.params.id;
        return this.mongoService.findById(investorId, INVESTORS_COLLECTION);
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
            tontine = await this.tontineService.findByTontineId(tontineId);
        } catch (err) {
            throw new ServerException('Failed to get tontine', 'FAILED_TO_GET_TONTINE', {
                tontineId: tontineId,
                error: err
            });
        }

        try {
            const investorExisted = await this.investorService.findInvestorByPhoneNumber(newInvestor.phoneNumber);
            if (investorExisted) {
                res.status(400).send('Investor with phone number ' + newInvestor.phoneNumber + ' already exists');
                return;
            }
        } catch (err) {
            throw new ServerException('Failed to get investor', 'FAILED_TO_GET_INVESTOR', {
                phoneNumber: newInvestor.phoneNumber,
                error: err
            });
        }

        // First save the investor
        try {
            await this.mongoService.insertToCollection(newInvestor, INVESTORS_COLLECTION);
            newInvestor = await investorService.findInvestorByPhoneNumber(newInvestor.phoneNumber);
        } catch (err) {
            throw new ServerException('Failed to add new investor', 'FAILED_TO_ADD_INVESTOR', {
                investor: newInvestor,
                error: err
            });
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
                tontine = await this.tontineService.updateTontine(tontine.id, tontine);
            } catch (err) {
                throw new ServerException('Failed to add investor to current round', 'FAILED_TO_ADD_INVESTOR_TO_ROUND', {
                    tontineId: tontine.id,
                    error: err
                });
            }

            // If requested to invest to current on-going round, do invest
            if (investToCurrentRound) {
                let investee;
                try {
                    investee = await getInvestee(currentRound);
                } catch (err) {
                    throw new ServerException('Failed to get investee', 'FAILED_TO_GET_INVESTEE', {
                        currentRound: currentRound,
                        error: err
                    });
                }
                // Invest and save investee
                // TODO in case investor is investee, we have to perform redundant queries below to persist non-changed data,
                // => room for optimisation
                invest(newInvestor, investee, currentRound);
                try {
                    await this.investorService.updateInvestor(investee.id, investee);
                    await this.investorService.updateInvestor(newInvestor.id, newInvestor);
                } catch (err) {
                    throw new ServerException('Failed to invest to current round', 'FAILED_TO_INVEST_TO_CURRENT_ROUND', {
                        investorId: newInvestor.id,
                        currentRound: currentRound,
                        error: err
                    });
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
            const tontine = await this.tontineService.findByTontineId(tontineId);
        } catch (err) {
            throw new ServerException('Failed to get tontine', 'FAILED_TO_GET_TONTINE', {
                tontineId: tontineId,
                error: err
            });
        }

        const investee = tontine.investors.find(investor => {
            return investor.nextTurns.some(nt => nt === tontine.turn);
        }).toArray();
        if (investee) {
            // required to provide debt by the end of current round
            investee.endOfRoundDebt = calculateDebtByEndOfRound(tontine, investee);
        }
        return investee;
    }

    async invest(req, res) {
        const { investorId, roundId, investDate } = req.body;
        return this.investService.invest(investorId, roundId, new Date(investDate));
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
module.exports = (
    mongoService,
    tontineService,
    investorService,
    investService
) => new InvestorController(
    mongoService,
    tontineService,
    investorService,
    investService
);