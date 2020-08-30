const MongoService = require('./mongo.service');
const ServerException = require('../exceptions/server.exception');
const isWithinInterval = require('date-fns/isWithinInterval');
const Invest = require('../models/invest.model');
const InvestStatus = require('../models/types/invest-status.enum');

const mongoService = new MongoService();

const INVEST_PROFILE_COLLECTION = 'invest_profiles';
const ROUND_COLLECTION = 'rounds';

class InvestService {

    constructor() {
        
    }

    async invest(investorId, roundId, investDate) {
        // TODO forbid investing to closed round
        // - Allow for now
        // However need to keep invest order

        // Figure out schedule and invest amount from round
        // Combine with investDate to get value of turn in round
        // for this investement
        const round = await mongoService.findById(roundId, ROUND_COLLECTION);
        if (!round) {
            throw new ServerException('Round not found!', 'ROUND_NOT_FOUND', {
                roundId: roundId
            });
        }

        const investProfile = await mongoService.getDb().collection(INVEST_PROFILE_COLLECTION).findOne({
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

        const isInvestee = this.isInvestee(investorId, round, investDate);
        // Get invest amount from ?
        const annualDepositeAmount = isInvestee ? investProfile.annualWithdrawAmount : investProfile.annualDepositeAmount;
        const investType = isInvestee ? 1 : -1;

        const invest = Invest.invest({
            date: new Date(investDate),
            amount: annualDepositeAmount,
            type: investType
        });

        if (!investProfile.investments) {
            investProfile.investments = [];
        }

        investProfile.investments.push(invest);
        investProfile.status = InvestStatus.ACTIVE;

        try {
            return mongoService.getDb().collection(INVEST_PROFILE_COLLECTION).updateOne({
                investorId: investorId,
                roundId: roundId
            }, {
                $set: {
                    investments: investProfile.investments,
                    status: investProfile.status
                }
            });
        } catch (err) {
            throw new ServerException('Failed to persist investment updates to database', 'FAIL_TO_UPDATE', {
                investorId: investorId,
                roundId: roundId,
                error: err
            });
        }
    }

    async getInvestment(investorId, roundId, investDate) {
        const round = await mongoService.findById(roundId, ROUND_COLLECTION);
        if (!round) {
            throw new ServerException('Round not found!', 'ROUND_NOT_FOUND', {
                roundId: roundId
            });
        }

        const investProfile = await mongoService.getDb().collection(INVEST_PROFILE_COLLECTION).find({
            investorId: investorId,
            roundId: roundId
        }).toArray();

        if (!investProfile) {
            throw new ServerException('Invest profile not found!', 'INVEST_PROFILE_NOT_FOUND', {
                investorId: investorId,
                roundId: roundId
            });
        }

        const isInvestee = this.isInvestee(investorId, round, investDate);
        // Get invest amount from ?
        const annualDepositeAmount = isInvestee ? investProfile.annualWithdrawAmount : investProfile.annualDepositeAmount;
        const investType = isInvestee ? 1 : -1;

        return Invest.invest({
            date: new Date(investDate),
            amount: annualDepositeAmount,
            type: investType
        });
    }

    isInvestee(investorId, round, investDate) {
        const investTurn = round.schedule.find(entry => isWithinInterval(investDate, {
            start: entry.dateStart,
            end: entry.dateEnd
        }));
        return investorId === investTurn.investorId;
    }

}

module.exports = InvestService;