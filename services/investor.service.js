const MongoService = require('./mongo.service');
const { ServerException } = require('../exceptions/server.exception');
const InvestStatus = require('../models/types/invest-status.enum');
const mongoService = new MongoService();

const INVEST_PROFILE_COLLECTION = 'invest_profiles';
const INVESTORS_COLLECTION = 'investors';
const ROUNDS_COLLECTION = 'rounds';

class InvestorService {
    constructor() { }

    async getActiveInvestor() {
        // return mongoService.getDb().collection(INVESTORS_COLLECTION).find({ status: { $not: 'LEFT' } });
    }

    async findInvestorByPhoneNumber(phoneNumber) {
        // return mongoService.getDb().collection(INVESTORS_COLLECTION).findOne({ "phoneNumber": phoneNumber });
    }

    async updateInvestor(id, update) {
        delete update._id;
        return mongoService.updateToCollection(id, update, INVESTORS_COLLECTION);
    }

    async getInvestor(investorId) {

    }

    async getInvestorForTontine(investorId, tontineId) {

        // Get a set of round belonging to a tontine
        const roundIds = await mongoService.getDb().collection(ROUNDS_COLLECTION).find(
            { tontineId: tontineId },
            {
                id: 1,
                _id: 0
            }
        );

        // Get all invest profile of an investor in a set of rounds
        const investProfiles = await mongoService.getDb().collection(INVEST_PROFILE_COLLECTION).find(
            {
                $query: {
                    investorId: investorId,
                    roundId: { $in: roundIds }
                },
                $orderby: {
                    joinDate: -1
                }
            }
        );

        if (!investProfiles) {
            throw new ServerException('Cannot find investor for tontine', 'CANNOT_FIND_INVESTOR_TONTINE', {
                investorId: investorId,
                tontineId: tontineId
            });
        }

        const joinDate = investProfiles[investProfiles.length - 1].joinDate;
        const status = investProfiles[0].status;
        // TODO add leftDate in model and mock data
        const leftDate = status === InvestStatus.LEFT ? investProfiles[0].leftDate : null;
        const allInvestments = investProfiles.flatMap(investProfile => investProfile.investments);
        const totalDeposited = allInvestments.reduce((acc, cur) => {
            return cur.type === -1 ? acc + cur.amount : acc;
        }, 0);

        const totalWithdrawn = allInvestments.reduce((acc, cur) => {
            return cur.type === 1 ? acc + cur.amount : acc;
        }, 0);

        return {
            investorId: investorId,
            tontineId: tontineId,
            status: status,
            joinDate: joinDate,
            leftDate: leftDate,
            totalDeposited: totalDeposited,
            totalWithdrawn: totalWithdrawn
        };
    }
}

module.exports = InvestorService;