'use strict';

const express = require('express');
const userDatabase = require('../database/user-database');

const suggestionRouter = express.Router();

suggestionRouter.route('/')
    .get((req, res) => {
        const { loginSubstring, limit } = req.query;
        const suggestions = userDatabase.getAutoSuggestedUsers(loginSubstring, limit);

        res.send(suggestions);
    });


module.exports = {
    suggestionRouter
};
