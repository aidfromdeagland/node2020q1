const groupService = require('../services/group-service/group-service');
const { StatusCodes } = require('http-status-codes');

async function getAllGroups(req, res, next) {
    try {
        const groups = await groupService.getAllGroups();

        res.send(groups);
    } catch (error) {
        return next(error.message);
    }
}

async function getGroup(req, res, next) {
    try {
        const group = await groupService.getGroup(req.params.id);

        res.send(group);
    } catch (error) {
        return next(error.message);
    }
}

async function updateGroup(req, res, next) {
    try {
        const updatedGroup = await groupService.updateGroup(req.params.id, req.body);

        res.send(updatedGroup);
    } catch (error) {
        return next(error.message);
    }
}

async function deleteGroup(req, res, next) {
    try {
        await groupService.deleteGroup(req.params.id);

        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        return next(error.message);
    }
}

async function postGroup(req, res, next) {
    try {
        const newGroup = await groupService.addGroup(req.body);

        res.status(StatusCodes.CREATED).send(newGroup);
    } catch (error) {
        return next(error.message);
    }
}

module.exports = {
    getAllGroups,
    getGroup,
    updateGroup,
    deleteGroup,
    postGroup
};
