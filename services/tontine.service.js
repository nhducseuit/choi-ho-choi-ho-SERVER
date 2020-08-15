const MongoService = require('./mongo.service');

const mongoService = new MongoService();

const TONTINES_COLLECTION = 'tontines';

class TontineService {
    constructor() {}

    async findByUID(uid) {
        return mongoService.findById(uid, TONTINES_COLLECTION);
    }

    async findByTontineId(tontineId) {
        return mongoService.getDb().collection(TONTINES_COLLECTION).findOne({id: tontineId});
    }

    async updateTontine(tontineId, updatedTontine) {
        return mongoService.updateToCollection(tontineId, updatedTontine, TONTINES_COLLECTION);
    }
}

module.exports = TontineService;