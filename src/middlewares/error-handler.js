const { StatusCodes } = require('http-status-codes');
const { logError } = require('./logger');

function handleError(error, req, res, next) {
    if (error.status) {
        res.status(error.status).send(error.message);
    } else {
        logError(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
    }
    return next();
}

module.exports = handleError;
