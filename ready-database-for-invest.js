const MongoService = require('./services/mongo.service');
const phuongvlog = require('./mock/tontine.mock');
const vlogrounds = require('./mock/round.mock');
const vloggers = require('./mock/investor.mock');
const vloggersInvestProfiles = require('./mock/invest-profile.mock');

const mongoService = new MongoService();
mongoService.init().then(async () => {
    try {
        console.log('Start resetting database to ready for invest');
        const startMillis = new Date().getMilliseconds();

        try {
            await mongoService.getDb().collection('tontines').drop();
            await mongoService.getDb().collection('rounds').drop();
            await mongoService.getDb().collection('investors').drop();
            await mongoService.getDb().collection('invest_profiles').drop();
        } catch (error) {
            console.error('Error while trying to drop some collection', error);
        }
    
        await mongoService.getDb().collection('tontines').insertOne(phuongvlog);
        await mongoService.getDb().collection('rounds').insertMany(vlogrounds);
        await mongoService.getDb().collection('investors').insertMany(vloggers);
        await mongoService.getDb().collection('invest_profiles').insertMany(vloggersInvestProfiles);
    
        const endMillis = new Date().getMilliseconds();
    
        console.log(`End resetting database, time took ${endMillis - startMillis}ms`);
        process.exit(0);
    } catch (error) {
        console.error('Error while trying to reset database choiho-local', error);
        process.exit(1);
    }
});
