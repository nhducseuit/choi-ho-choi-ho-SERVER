const express = require('express');
const config = require('../configs');
const routes = require('../routes');
const bodyParser = require("body-parser");

class ExpressLoader {
    constructor() {
        const app = express();

        app.use(bodyParser.json());
        // app.use(ExpressLoader.errorHandler);
        
        // Pass routing config
        routes(app);

        this.listener = app.listen(config.port, () => {
            console.log('Server is now listening on port ', this.listener.address().port);
        });
    }

    get Server() {
        return this.server;
    }

    // static errorHandler(error, req, res, next) {
    //     let parsedError;

    //     // Attempt to gracefully parse error object
    //     try {
    //         if (error && typeof error === "object") {
    //             parsedError = JSON.stringify(error);
    //         } else {
    //             parsedError = error;
    //         }
    //     } catch (e) {
    //         logger.error(e);
    //     }

    //     // Log the original error
    //     logger.error(parsedError);

    //     // If response is already sent, don't attempt to respond to client
    //     if (res.headersSent) {
    //         return next(error);
    //     }

    //     res.status(400).json({
    //         success: false,
    //         error
    //     });
    // }
}

module.exports = ExpressLoader;