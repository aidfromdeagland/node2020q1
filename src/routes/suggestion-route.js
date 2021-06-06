const express = require('express');
const { suggestUsers } = require('../controllers/user-controller');

const suggestionRouter = express.Router();

suggestionRouter.route('/')
    .get(suggestUsers);


module.exports = {
    suggestionRouter
};
