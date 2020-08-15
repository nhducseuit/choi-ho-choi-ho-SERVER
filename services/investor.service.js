const MongoService = require('./mongo.service');
const mongoService = new MongoService();

const INVESTORS_COLLECTION = 'investors';

class InvestorService {
    constructor() { }

    async getActiveInvestor() {
        return mongoService.getDb().collection(INVESTORS_COLLECTION).find({ status: { $not: 'LEFT' } });
    }

    async findInvestorByPhoneNumber(phoneNumber) {
        return mongoService.getDb().collection(INVESTORS_COLLECTION).findOne({ "phoneNumber": phoneNumber });
    }

    async updateInvestor(id, update) {
        delete update._id;
        return mongoService.updateToCollection(id, update, INVESTORS_COLLECTION);
    }
}

module.exports = InvestorService;