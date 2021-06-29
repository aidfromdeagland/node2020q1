const jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

function tokenVerification(req, res, next) {
    const { AUTH_HEADER, TOKEN_SECRET } = process.env;
    const token = req.headers[AUTH_HEADER];

    if (token) {
        jwt.verify(token, TOKEN_SECRET, (error) => {
            if (error) {
                return res.status(StatusCodes.FORBIDDEN).send({ message: ReasonPhrases.FORBIDDEN });
            }
            return next();
        });
    } else {
        res.status(StatusCodes.UNAUTHORIZED).send({ message: ReasonPhrases.UNAUTHORIZED });
    }
}

module.exports = tokenVerification;
