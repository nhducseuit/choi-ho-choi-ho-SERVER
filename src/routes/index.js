const template = require("./routes-template");
const tontineRoute = require('./tontine');
const investorRoute = require('./investor');

const routes = app => {
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With, content-type, x-access-token, authorization"
        );
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.removeHeader("X-Powered-By");
        next();
    });

    app.use("/", template);
    app.use('/api/tontines', tontineRoute);
    app.use('/api/investors', investorRoute);
};

module.exports = routes;