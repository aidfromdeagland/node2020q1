const express = require('express');
const { authenticate } = require('../controllers/authentication-controller');

const loginRouter = express.Router();

loginRouter.route('/')
    .post(authenticate);

module.exports = loginRouter;
