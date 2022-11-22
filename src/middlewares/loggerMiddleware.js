const logger = require("../logs/loggers")

function loggerMiddleware(req, _res, next) {
    logger.info(`[${req.method}] ${req.url}`)
    next();
}

module.exports = loggerMiddleware;