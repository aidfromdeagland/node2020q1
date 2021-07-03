const { StatusCodes } = require('http-status-codes');

function validate(schema) {
    return (req, res, next) => {
        const options = { abortEarly: false };
        const { error } = schema.validate(req.body, options);

        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(StatusCodes.BAD_REQUEST).send({ errors });
        }
        return next();
    };
}

module.exports = validate;
