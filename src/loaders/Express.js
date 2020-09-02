const express = require('express');
const config = require('../configs');
const routes = require('../routes');
const bodyParser = require("body-parser");

class ExpressLoader {
    constructor() {
        const app = express();

        app.use(bodyParser.json());
        // Pass routing config
        routes(app);
        
        app.use(ExpressLoader.errorHandler);

        this.listener = app.listen(config.port, () => {
            console.log('Server is now listening on port ', this.listener.address().port);
        });
    }

    get Server() {
        return this.server;
    }

    static errorHandler(error, req, res, next) {
        let parsedError;

        // Attempt to gracefully parse error object
        try {
            if (error && typeof error === "object") {
                parsedError = JSON.stringify(error);
            } else {
                parsedError = error;
            }
        } catch (e) {
            console.error(e);
        }

        // Log the original error
        console.error(parsedError);

        // If response is already sent, don't attempt to respond to client
        if (res.headersSent) {
            return next(error);
        }

        res.status(500).json({
            success: false,
            error
        });
    }
}

module.exports = ExpressLoader;