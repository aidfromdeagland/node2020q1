const Joi = require('joi');

const groupSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(42).required(),
    permissions: Joi.array().items(Joi.string())
});

module.exports = groupSchema;
