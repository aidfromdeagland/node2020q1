const groupService = require('../services/group-service/group-service');
const { StatusCodes } = require('http-status-codes');
const { logControllerError } = require('../middlewares/logger');

function handleNullGroup(req, res) {
    res.status(StatusCodes.NOT_FOUND).send({ message: `There is no group with id ${req.params.id}` });
}

async function getAllGroups(req, res, next) {
    try {
        const groups = await groupService.getAllGroups();
        return res.send(groups);
    } catch (error) {
        logControllerError(error, 'getAllGroups', arguments);
        return next(error);
    }
}

async function getGroup(req, res, next) {
    try {
        const { id } = req.params;
        const group = await groupService.getGroup(id);
        return group ? res.send(group) : handleNullGroup(req, res);
    } catch (error) {
        logControllerError(error, 'getGroup', arguments);
        return next(error);
    }
}

async function updateGroup(req, res, next) {
    try {
        const { id } = req.params;
        const [isGroupUpdated] = await groupService.updateGroup(id, req.body);
        return isGroupUpdated ? res.send(id) : handleNullGroup(req, res);
    } catch (error) {
        logControllerError(error, 'updateGroup', arguments);
        return next(error);
    }
}

async function deleteGroup(req, res, next) {
    try {
        const { id } = req.params;
        const [isGroupDeleted] = await groupService.deleteGroup(id);
        return isGroupDeleted ? res.status(StatusCodes.NO_CONTENT).send() : handleNullGroup(req, res);
    } catch (error) {
        logControllerError(error, 'deleteGroup', arguments);
        return next(error);
    }
}

async function postGroup(req, res, next) {
    try {
        const newGroup = await groupService.addGroup(req.body);
        return res.status(StatusCodes.CREATED).send(newGroup);
    } catch (error) {
        logControllerError(error, 'postGroup', arguments);
        return next(error);
    }
}

async function addUsersToGroup(req, res, next) {
    try {
        const { groupId, usersIds } = req.body;
        await groupService.addUsersToGroup(groupId, usersIds);
        return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        logControllerError(error, 'addUsersToGroup', arguments);
        return next(error);
    }
}

module.exports = {
    getAllGroups,
    getGroup,
    updateGroup,
    deleteGroup,
    postGroup,
    addUsersToGroup
};
