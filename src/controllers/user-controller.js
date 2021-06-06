const userService = require('../services/user-service/user-service');
const { StatusCodes } = require('http-status-codes');

function handleIdParam(req, res, next, id) {
    const user = userService.getUser(id);

    if (user) {
        return next();
    }

    res.status(StatusCodes.NOT_FOUND).send({ message: `There is no user with id ${id}` });
}

function getUser(req, res) {
    const userId = req.params.id;
    res.send(userService.getUser(userId));
}

function updateUser(req, res) {
    const userId = req.params.id;
    res.send(userService.updateUser(userId, req.body));
}

function deleteUser(req, res) {
    const userId = req.params.id;
    userService.deleteUser(userId);

    res.status(StatusCodes.NO_CONTENT).send();
}

function postUser(req, res) {
    const newUser = req.body;
    res.status(StatusCodes.CREATED).send(userService.addUser(newUser));
}

function suggestUsers(req, res) {
    const { loginSubstring, limit } = req.query;
    const suggestions = userService.getAutoSuggestedUsers(loginSubstring, limit);
    res.send(suggestions);
}

module.exports = {
    handleIdParam,
    getUser,
    updateUser,
    deleteUser,
    postUser,
    suggestUsers
};
