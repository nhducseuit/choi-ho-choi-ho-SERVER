const MongoService = require('./mongo.service');
const ServerException = require('../exceptions/server.exception');
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

    async getInvestorsOfTontine(tontineId) {

        // Get a set of round belonging to a tontine
        const roundIds = await mongoService.getDb().collection(ROUNDS_COLLECTION).find(
            { tontineId: tontineId },
            {
                projection: {
                    id: 1,
                    _id: 0
                }
            }
        ).map((result) => result.id).toArray();

        // Get all invest profiles in a set of rounds
        const investProfiles = await mongoService.getDb().collection(INVEST_PROFILE_COLLECTION).find(
            {
                roundId: { $in: roundIds }
            }
        ).sort([['investorId', -1], ['joinDate', -1]]).toArray();

        const investProfilesGroupByInvestor = investProfiles.reduce((acc, cur) => {
            let investProfileGroup = acc[acc.length - 1];
            if (!investProfileGroup) {
                investProfileGroup = [cur];
                acc.push(investProfileGroup);
                return acc;
            }
            const lastInvestorId = investProfileGroup[0].investorId;
            if (lastInvestorId === cur.investorId) {
                investProfileGroup.push(cur);
                return acc;
            } else {
                acc.push([cur]);
                return acc;
            }
        }, []);

        return investProfilesGroupByInvestor.map(investProfilesGroup => this.getInvestorProfileInTontine(investProfilesGroup, tontineId));
    }

    async getInvestorForTontine(investorId, tontineId) {

        // Get a set of round belonging to a tontine
        const roundIds = await mongoService.getDb().collection(ROUNDS_COLLECTION).find(
            { tontineId: tontineId },
            {
                id: 1,
                _id: 0
            }
        ).toArray();

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
        ).toArray();

        if (!investProfiles) {
            throw new ServerException('Cannot find investor for tontine', 'CANNOT_FIND_INVESTOR_TONTINE', {
                investorId: investorId,
                tontineId: tontineId
            });
        }

        return this.getInvestorProfileInTontine(investProfiles, tontineId);
    }

    getInvestorProfileInTontine(investProfiles, tontineId) {
        const joinDate = investProfiles[investProfiles.length - 1].joinDate;
        const status = investProfiles[0].status;
        // TODO add leftDate in model and mock data
        const leftDate = (status === InvestStatus.LEFT) ? investProfiles[0].leftDate : null;
        const allInvestments = investProfiles.flatMap(investProfile => investProfile.investments);
        const totalDeposited = allInvestments.reduce((acc, cur) => {
            return cur.type === -1 ? acc + cur.amount : acc;
        }, 0);

        const totalWithdrawn = allInvestments.reduce((acc, cur) => {
            return cur.type === 1 ? acc + cur.amount : acc;
        }, 0);

        return {
            investorId: investProfiles[0].investorId,
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