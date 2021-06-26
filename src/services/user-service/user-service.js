const database = require('../../data-access/operations/user-operations');

async function getUser(id) {
    return database.getUser(id);
}

async function addUser(userData) {
    return database.addUser(userData);
}

async function updateUser(id, userData) {
    await database.updateUser(id, userData);
    return id;
}

async function deleteUser(id) {
    await database.deleteUser(id);
    return id;
}

async function getAutoSuggestedUsers(loginSubstring, limit) {
    return database.getAutoSuggestedUsers(loginSubstring, limit);
}

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getAutoSuggestedUsers
};
