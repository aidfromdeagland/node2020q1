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
    await database.updateGroup(id, groupData);
    return id;
}

async function deleteGroup(id) {
    await database.deleteGroup(id);
    return id;
}

module.exports = {
    getGroup,
    addGroup,
    updateGroup,
    deleteGroup,
    getAllGroups
};
