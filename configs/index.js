// config/index.js

const config = {
    dbUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/choiho-local",
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV || "development",
    logDir: process.env.LOGDIR || "logs",
    viewEngine: process.env.VIEW_ENGINE || "html"
};

module.exports = config;