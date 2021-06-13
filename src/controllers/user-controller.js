const userService = require('../services/user-service/user-service');
const { StatusCodes } = require('http-status-codes');

async function handleIdParam(req, res, next, id) {
    const user = await userService.getUser(id);

    if (user) {
        return next();
    }

    res.status(StatusCodes.NOT_FOUND).send({ message: `There is no user with id ${id}` });
}

async function getUser(req, res) {
    const userId = req.params.id;
    const user = await userService.getUser(userId);

    res.send(user);
}

async function updateUser(req, res) {
    const userId = req.params.id;
    const updatedUser = await userService.updateUser(userId, req.body);

    res.send(updatedUser);
}

async function deleteUser(req, res) {
    const userId = req.params.id;
    await userService.deleteUser(userId);

    res.status(StatusCodes.NO_CONTENT).send();
}

async function postUser(req, res) {
    const newUserData = req.body;
    const newUser = await userService.addUser(newUserData);

    res.status(StatusCodes.CREATED).send(newUser);
}

async function suggestUsers(req, res) {
    const { loginSubstring, limit } = req.query;
    const suggestions = await userService.getAutoSuggestedUsers(loginSubstring, limit);

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
