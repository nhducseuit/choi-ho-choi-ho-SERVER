const NotFoundException = require('../exceptions/not-found.exception');
const BadRequestException = require('../exceptions/bad-request.exception');

const INVEST_PROFILE_COLLECTION = 'invest_profiles';
const INVESTORS_COLLECTION = 'investors';
const ROUNDS_COLLECTION = 'rounds';

class InvestorService {
    constructor(mongoService) {
        this.mongoService = mongoService;
    }

    collection(collectionName) {
        return this.mongoService.getDb().collection(collectionName);
    }

    async getActiveInvestor() {
        // return this.mongoService.getDb().collection(INVESTORS_COLLECTION).find({ status: { $not: 'LEFT' } });
    }

    async findInvestorByPhoneNumber(phoneNumber) {
        // return this.mongoService.getDb().collection(INVESTORS_COLLECTION).findOne({ "phoneNumber": phoneNumber });
    }

    async updateInvestor(id, update) {
        delete update._id;
        return this.mongoService.updateToCollection(id, update, INVESTORS_COLLECTION);
    }

    async getInvestor(investorId) {

    }

    async getInvestorsOfTontine(tontineId) {

        // Get a set of round belonging to a tontine
        const roundIds = await this.collection(ROUNDS_COLLECTION).find(
            { tontineId: tontineId },
            {
                projection: {
                    id: 1,
                    _id: 0
                }
            }
        ).map((result) => result.id).toArray();

        if (roundIds.length === 0) {
            return [];
        }

        // Get all invest profiles in a set of rounds
        const investProfiles = await this.collection(INVEST_PROFILE_COLLECTION).aggregate([
            {
                $match: {
                    roundId: { $in: roundIds }
                }
            },
            {
                $lookup: {
                    from: 'investors',
                    localField: 'investorId',
                    foreignField: 'id',
                    as: 'investor'
                }
            },
            {
                $unwind: '$investor'
            },
            {
                $sort: {
                    investorId: -1,
                    joinDate: -1
                }
            }
        ]).toArray();

        if (investProfiles.length === 0) {
            return [];
        }

        const investProfilesGroupByInvestor = this.groupInvestProfilesByInvestor(investProfiles);
        return investProfilesGroupByInvestor.map(investProfilesGroup => this.getInvestorProfileInTontine(investProfilesGroup));
    }

    async getInvestorForTontine(investorId, tontineId) {

        // Get a set of round belonging to a tontine
        const roundIds = await this.collection(ROUNDS_COLLECTION).find(
            { tontineId: tontineId },
            {
                projection: {
                    id: 1,
                    _id: 0
                }
            }
        ).map((result) => result.id).toArray();

        if (roundIds.length === 0) {
            throw new BadRequestException('Tontine has no round', 'EMPTY_TONTINE', {
                tontineId: tontineId
            });
        }

        // Get all invest profile of an investor in a set of rounds
        const investProfiles = await this.collection(INVEST_PROFILE_COLLECTION).aggregate([
            {
                $match: {
                    roundId: { $in: roundIds },
                    investorId: investorId
                }
            },
            {
                $lookup: {
                    from: 'investors',
                    localField: 'investorId',
                    foreignField: 'id',
                    as: 'investor'
                }
            },
            {
                $unwind: '$investor'
            },
            {
                $sort: {
                    joinDate: -1
                }
            }
        ]).toArray();

        if (investProfiles.length === 0) {
            throw new NotFoundException('Invest profile not found', 'INVEST_PROFILE_NOT_FOUND', {
                investorId: investorId,
                tontineId: tontineId
            });
        }

        return this.getInvestorProfileInTontine(investProfiles);
    }

    groupInvestProfilesByInvestor(investProfiles) {
        return investProfiles.reduce((acc, cur) => {
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
    }

    getInvestorProfileInTontine(investProfiles) {
        if(!Array.isArray(investProfiles) || investProfiles.length === 0) {
            return;
        }
        // Sort by joinDate descending
        investProfiles.sort((ip1, ip2) => ip1.joinDate.valueOf() - ip2.joinDate.valueOf());

        const oldest = investProfiles[0];
        const latest = investProfiles[investProfiles.length - 1];
        
        // TODO add leftDate in model and mock data
        // const leftDate = (earliestStatus === InvestStatus.LEFT) ? investProfiles[0].leftDate : null;
        const allInvestments = investProfiles.flatMap(investProfile => investProfile.investments);
        const totalDeposited = allInvestments.reduce((acc, cur) => {
            return cur.type === -1 ? acc + cur.amount : acc;
        }, 0);

        const totalWithdrawn = allInvestments.reduce((acc, cur) => {
            return cur.type === 1 ? acc + cur.amount : acc;
        }, 0);

        return {
            investorId: latest.investorId,
            createdDate: latest.investor.createdDate,
            updatedDate: latest.investor.updatedDate,
            name: latest.investor.name,
            alias: latest.investor.alias,
            phoneNumber: latest.investor.phoneNumber,
            bank: latest.investor.bank,
            status: latest.status,
            joinDate: oldest.joinDate,
            totalDeposited: totalDeposited,
            totalWithdrawn: totalWithdrawn
        };
    }
}

module.exports = (mongoService) => new InvestorService(mongoService);