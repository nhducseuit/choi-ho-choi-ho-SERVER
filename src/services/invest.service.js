const ServerException = require('../exceptions/server.exception');
const isWithinInterval = require('date-fns/isWithinInterval');
const Invest = require('../models/invest.model');
const InvestStatus = require('../models/types/invest-status.enum');

const INVEST_PROFILE_COLLECTION = 'invest_profiles';
const ROUND_COLLECTION = 'rounds';

class InvestService {

    constructor(mongoService) {
        this.mongoService = mongoService;
    }

    get collection() {
        return this.mongoService.getDb().collection(INVEST_PROFILE_COLLECTION);
    }

    async invest(investorId, roundId, investDate) {
        // TODO forbid investing to closed round
        // - Allow for now
        // However need to keep invest order

        // Figure out schedule and invest amount from round
        // Combine with investDate to get value of turn in round
        // for this investement
        const round = await this.mongoService.findById(roundId, ROUND_COLLECTION);
        if (!round) {
            throw new ServerException('Round not found!', 'ROUND_NOT_FOUND', {
                roundId: roundId
            });
        }

        const investProfile = await this.collection.findOne({
            investorId: investorId,
            roundId: roundId
        }, {
            limit: 1
        });

        if (!investProfile) {
            throw new ServerException('Invest profile not found!', 'INVEST_PROFILE_NOT_FOUND', {
                investorId: investorId,
                roundId: roundId
            });
        }

        const invest = this.prepareInvestment(investorId, round, investDate, investProfile);

        if (!investProfile.investments) {
            investProfile.investments = [];
        }

        investProfile.investments.push(invest);
        investProfile.status = InvestStatus.ACTIVE;

        try {
            const output = await this.collection.updateOne({
                investorId: investorId,
                roundId: roundId
            }, {
                $set: {
                    investments: investProfile.investments,
                    status: investProfile.status
                }
            });

            if (output.result.ok === 1) {
                return true;
            } else {
                throw new ServerException('Failed to persist investment updates to database', 'FAIL_TO_UPDATE', {
                    investorId: investorId,
                    roundId: roundId
                });
            }
        } catch (err) {
            throw new ServerException('Failed to persist investment updates to database', 'FAIL_TO_UPDATE', {
                investorId: investorId,
                roundId: roundId,
                error: err
            });
        }
    }

    async getInvestment(investorId, roundId, investDate) {
        const round = await this.mongoService.findById(roundId, ROUND_COLLECTION);
        if (!round) {
            throw new ServerException('Round not found!', 'ROUND_NOT_FOUND', {
                roundId: roundId
            });
        }

        const investProfile = await this.collection.findOne({
            investorId: investorId,
            roundId: roundId
        }, {
            limit: 1
        });

        if (!investProfile) {
            throw new ServerException('Invest profile not found!', 'INVEST_PROFILE_NOT_FOUND', {
                investorId: investorId,
                roundId: roundId
            });
        }

        return this.prepareInvestment(investorId, round, investDate, investProfile);
    }

    prepareInvestment(investorId, round, investDate, investProfile) {
        const isInvestee = this.isInvestee(investorId, round, investDate);
        // Get invest amount from ?
        const annualDepositeAmount = isInvestee ? investProfile.annualWithdrawAmount : investProfile.annualDepositeAmount;
        const investType = isInvestee ? 1 : -1;

        const invest = Invest.invest({
            date: new Date(investDate),
            amount: annualDepositeAmount,
            type: investType
        });
        return invest;
    }

    isInvestee(investorId, round, investDate) {
        const investTurn = round.schedule.find(entry => isWithinInterval(investDate, {
            start: entry.dateStart,
            end: entry.dateEnd
        }));
        return investTurn ? investorId === investTurn.investorId : false;
    }

}

module.exports = (mongoService) => new InvestService(mongoService);