const configs = require('../configs');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let __dbOptions = {
    useUnifiedTopology: true
};
let __db;

class MongoService {
    constructor(dbOptions) {
        if (dbOptions) {
            __dbOptions = { ...__dbOptions, dbOptions };
        }
    }

    getDb() {
        return __db;
    }

    async init() {
        const client = await MongoClient.connect(configs.dbUrl, __dbOptions);
        __db = client.db();
    }

    async getAllOfCollection(collection) {
        return __db.collection(collection).find({}).toArray();
    }

    async findById(id, collection) {
        return __db.collection(collection).findOne({ id: id });
    }

    async findByObjectId(id, collection) {
        return __db.collection(collection).findOne({ _id: new ObjectID(id) });
    }

    async insertToCollection(document, collection) {
        return __db.collection(collection).insertOne(document);
    }

    async updateToCollection(id, document, collection) {
        delete document._id;
        return __db.collection(collection).updateOne({ _id: new ObjectID(id) }, { $set: document });
    }

    async deleteDocument(id, collection) {
        return __db.collection(collection).deleteOne({ _id: new ObjectID(id) });
    }
}

module.exports = MongoService;
