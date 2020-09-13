const MongoService = require('./services/mongo.service');
const DiContainer = require('./di/di-container');

const diContainer = new DiContainer();
const mongoService = new MongoService();

diContainer.register('mongoService', mongoService);
diContainer.factory('investService', require('./services/invest.service'));
diContainer.factory('investorService', require('./services/investor.service'));
diContainer.factory('tontineService', require('./services/tontine.service'));
diContainer.factory('investorController', require('./controllers/investor.controller'));
diContainer.factory('tontineController', require('./controllers/tontine.controller'));

mongoService.init()
    .then(() => {
        // register db dependency for used later by various services
        diContainer.register('db', mongoService.getDb());
        // Load the application using loader
        const ExpressLoader = require('./loaders/Express');
        new ExpressLoader(diContainer);
    })
    .catch((error) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
    });
