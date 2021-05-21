'use strict';

const { StatusCodes } = require('http-status-codes');
const userSchema = require('./schemas/user-schema');

function validateUser() {
    return (req, res, next) => {
        const { error } = userSchema.validate(req.body, { abortEarly: false });

        if (!error) {
            return next();
        }

        res.status(StatusCodes.BAD_REQUEST).send(error.message);
    };
}

module.exports = validateUser;
