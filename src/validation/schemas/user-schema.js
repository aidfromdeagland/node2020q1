'use-strict';

const Joi = require('joi');

const passwordPattern = new RegExp('([0-9].*[a-zA-Z])\|([a-zA-Z].*[0-9])');

const userSchema = Joi.object({
    login: Joi.string().alphanum().min(2).max(42).required(),
    password: Joi.string().pattern(passwordPattern).required(),
    age: Joi.number().integer().min(4).max(130).required()
});

module.exports = userSchema;
