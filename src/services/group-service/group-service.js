const database = require('../../data-access/group-database');

function getAllGroups() {
    return database.getAllGroups();
}

function getGroup(id) {
    return database.getGroup(id);
}

function addGroup(groupData) {
    return database.addGroup(groupData);
}

function updateGroup(id, groupData) {
    return database.updateGroup(id, groupData);
}

function deleteGroup(id) {
    return database.deleteGroup(id);
}

module.exports = {
    getGroup,
    addGroup,
    updateGroup,
    deleteGroup,
    getAllGroups
};
