const groupService = require('../services/group-service/group-service');
const { StatusCodes } = require('http-status-codes');

async function handleIdParam(req, res, next, id) {
    const group = await groupService.getGroup(id);

    if (group) {
        return next();
    }

    res.status(StatusCodes.NOT_FOUND).send({ message: `There is no group with id ${id}` });
}

async function getGroup(req, res) {
    const groupId = req.params.id;
    const group = await groupService.getGroup(groupId);

    res.send(group);
}

async function updateGroup(req, res) {
    const groupId = req.params.id;
    const updatedGroup = await groupService.updateGroup(groupId, req.body);

    res.send(updatedGroup);
}

async function deleteGroup(req, res) {
    const groupId = req.params.id;
    await groupService.deleteGroup(groupId);

    res.status(StatusCodes.NO_CONTENT).send();
}

async function postGroup(req, res) {
    const newGroupData = req.body;
    const newGroup = await groupService.addGroup(newGroupData);

    res.status(StatusCodes.CREATED).send(newGroup);
}

module.exports = {
    handleIdParam,
    getGroup,
    updateGroup,
    deleteGroup,
    postGroup
};
