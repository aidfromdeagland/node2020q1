const database = require('../../data-access/user-database');

function getAllUsers() {
    return database.getAllUsers();
}

function getUser(id) {
    return database.getUser(id);
}

function addUser(userData) {
    return database.addUser(userData);
}

function updateUser(id, userData) {
    return database.updateUser(id, userData);
}

function deleteUser(id) {
    return database.deleteUser(id);
}

function getAutoSuggestedUsers(loginSubstring, limit) {
    return database.getAutoSuggestedUsers(loginSubstring, limit);
}

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getAutoSuggestedUsers
};
