const getLogConfig = require('../../logs/config');
const { format, transports, createLogger } = require('winston');

const winstonLogConfig = {
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File(getLogConfig('debug')),
        new transports.File(getLogConfig('error'))
    ]
};

const logger = createLogger(winstonLogConfig);

function logDebug(debugInfo) {
    logger.debug(debugInfo);
}

function logError(error) {
    logger.error(error);
}

function logServiceMethodCall(req, res, next) {
    const { method, path, body } = req;
    logger.debug(
        `method ${method} called with arguments:
        body: ${JSON.stringify(body)}
        path: ${path}`);

    return next();
}

function logControllerError(error, methodName, passedArgs) {
    logger.error({
        message: error.message,
        methodName,
        passedArgs
    });
}

module.exports = {
    logError,
    logDebug,
    logServiceMethodCall,
    logControllerError
};
