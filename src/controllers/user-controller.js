const userService = require('../services/user-service');
const { StatusCodes } = require('http-status-codes');
const { logControllerError } = require('../middlewares/logger');

function handleNullUser(req, res) {
    res.status(StatusCodes.NOT_FOUND).send({ message: `There is no user with id ${req.params.id}` });
}

async function getUser(req, res, next) {
    try {
        const { id } = req.params;
        const user = await userService.getUser(id);
        return user ? res.send(user) : handleNullUser(req, res);
    } catch (error) {
        logControllerError(error, 'getUser', arguments);
        return next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const [isUserUpdated] = await userService.updateUser(id, req.body);
        return isUserUpdated ? res.send(id) : handleNullUser(req, res);
    } catch (error) {
        logControllerError(error, 'updateUser', arguments);
        return next(error);
    }
}

async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;
        const [isUserDeleted] = await userService.deleteUser(id);
        return isUserDeleted ? res.status(StatusCodes.NO_CONTENT).send() : handleNullUser(req, res);
    } catch (error) {
        logControllerError(error, 'deleteUser', arguments);
        return next(error);
    }
}

async function postUser(req, res, next) {
    try {
        const newUser = await userService.addUser(req.body);
        return res.status(StatusCodes.CREATED).send(newUser);
    } catch (error) {
        logControllerError(error, 'postUser', arguments);
        return next(error);
    }
}

async function suggestUsers(req, res, next) {
    try {
        const { loginSubstring, limit } = req.query;
        const suggestions = await userService.getAutoSuggestedUsers(loginSubstring, limit);
        return res.send(suggestions);
    } catch (error) {
        logControllerError(error, 'suggestUsers', arguments);
        return next(error);
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    postUser,
    suggestUsers
};
