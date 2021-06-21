const express = require('express');
const { suggestUsers } = require('../controllers/user-controller');

const userSuggestionRouter = express.Router();

userSuggestionRouter.route('/')
    .get(suggestUsers);

module.exports = userSuggestionRouter;
