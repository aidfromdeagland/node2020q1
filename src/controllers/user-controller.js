const userService = require('../services/user-service/user-service');
const { StatusCodes } = require('http-status-codes');

async function getUser(req, res, next) {
    try {
        const userId = req.params.id;
        const user = await userService.getUser(userId);

        res.send(user);
    } catch (error) {
        return next(error.message);
    }
}

async function updateUser(req, res, next) {
    try {
        const userId = req.params.id;
        await userService.updateUser(req.params.id, req.body);

        res.send(userId);
    } catch (error) {
        return next(error.message);
    }
}

async function deleteUser(req, res, next) {
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId);

        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        return next(error.message);
    }
}

async function postUser(req, res, next) {
    try {
        const newUserData = req.body;
        const newUser = await userService.addUser(newUserData);

        res.status(StatusCodes.CREATED).send(newUser);
    } catch (error) {
        return next(error.message);
    }
}

async function suggestUsers(req, res, next) {
    try {
        const { loginSubstring, limit } = req.query;
        const suggestions = await userService.getAutoSuggestedUsers(loginSubstring, limit);

        res.send(suggestions);
    } catch (error) {
        return next(error.message);
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    postUser,
    suggestUsers
};
