const Joi = require('joi');
const { permissions } = require('../../constants/group-constants');

const groupSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(42).required(),
    permissions: Joi.array().items(Joi.string().valid(...permissions)).required()
});

module.exports = groupSchema;
