const template = require("./routes-template");
const tontineRoute = require('./tontine.route');
const investorRoute = require('./investor.route');
const Router = require('express').Router;

const processSubpaths = (subPaths, controller) => {
    const router = new Router();
    subPaths.forEach(subPath => {
        const api = subPath.api;
        const method = router[subPath.method].bind(router);
        const handler = controller[subPath.handler].bind(controller);
        method(api, async (req, res, next) => {
            try {
                const result = await handler(req, res);
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        });
    });
    return router;
};

const processApiMap = (apiMap, diContainer) => {
    if (apiMap) {
        const controller = diContainer.get(apiMap.controller);
        return processSubpaths(apiMap.subPaths, controller);
    }
    return null;
};

const routes = (app, diContainer) => {
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
    app.use('/api/tontines', processApiMap(tontineRoute, diContainer));
    app.use('/api/investors', processApiMap(investorRoute, diContainer));
};

module.exports = routes;