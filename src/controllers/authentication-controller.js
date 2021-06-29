const  jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const userService = require('../services/user-service/user-service');
const { logControllerError } = require('../middlewares/logger');


async function authenticate(req, res, next) {
    try {
        const { login, password } = req.body;
        const user = await userService.getUserByCreds(login, password);

        if (user) {
            const { TOKEN_SECRET, TOKEN_DURATION } = process.env;
            const payload = { 'sub': user.id };
            const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_DURATION });
            return res.send(token);
        }

        return res.status(StatusCodes.FORBIDDEN).send({ message: 'Authentication failed: wrong login/password' });
    } catch (error) {
        logControllerError(error, 'authenticate', arguments);
        return next(error);
    }
}

module.exports = {
    authenticate
};
