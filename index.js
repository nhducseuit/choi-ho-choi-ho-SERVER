const MongoService = require('./services/mongo.service');

const mongoService = new MongoService();
mongoService.init()
    .then(() => {
        console.log('Database connection ready');

        // Load the application using loader
        const ExpressLoader = require('./loaders/Express');
        new ExpressLoader();
    })
    .catch((error) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
    });
