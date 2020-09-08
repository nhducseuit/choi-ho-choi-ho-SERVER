const TONTINES_COLLECTION = 'tontines';

class TontineService {
    constructor(mongoService) {
        this.mongoService = mongoService;
    }

    async findByUID(uid) {
        return this.mongoService.findByObjectId(uid, TONTINES_COLLECTION);
    }

    async findByTontineId(tontineId) {
        return this.mongoService.findById(tontineId, TONTINES_COLLECTION);
    }

    async updateTontine(tontineId, updatedTontine) {
        return this.mongoService.updateToCollection(tontineId, updatedTontine, TONTINES_COLLECTION);
    }
}

module.exports = (mongoService) => new TontineService(mongoService);