const MongoService = require('./mongo.service');

const mongoService = new MongoService();

const TONTINES_COLLECTION = 'tontines';

class TontineService {
    constructor() {}

    async findByUID(uid) {
        return mongoService.findByObjectId(uid, TONTINES_COLLECTION);
    }

    async findByTontineId(tontineId) {
        return mongoService.findById(tontineId, TONTINES_COLLECTION);
    }

    async updateTontine(tontineId, updatedTontine) {
        return mongoService.updateToCollection(tontineId, updatedTontine, TONTINES_COLLECTION);
    }
}

module.exports = TontineService;