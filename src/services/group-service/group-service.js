const database = require('../../data-access/operations/group-operations');

async function getAllGroups() {
    return database.getAllGroups();
}

async function getGroup(id) {
    return database.getGroup(id);
}

async function addGroup(groupData) {
    return database.addGroup(groupData);
}

async function updateGroup(id, groupData) {
    return database.updateGroup(id, groupData);
}

async function deleteGroup(id) {
    return database.deleteGroup(id);
}

async function addUsersToGroup(groupId, userIds) {
    return database.addUsersToGroup(groupId, userIds);
}

module.exports = {
    getGroup,
    addGroup,
    updateGroup,
    deleteGroup,
    getAllGroups,
    addUsersToGroup
};
