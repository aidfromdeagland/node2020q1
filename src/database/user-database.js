'use strict';

const { v4 } = require('uuid');
const User = require('./entities/user-entity');

const usersCollection = new Map();

function getAllUsers() {
    return Array.from(usersCollection.values());
}

function getUser(id) {
    return usersCollection.get(id);
}

function addUser(userData) {
    const userId = v4();
    const newUser = new User(userId, userData);
    usersCollection.set(userId, newUser);

    return newUser;
}

function updateUser(id, userData) {
    const userToUpdate = usersCollection.get(id);
    userToUpdate.update(userData);

    return userToUpdate;
}

function deleteUser(id) {
    getUser(id).delete();
}

function getAutoSuggestedUsers(loginSubstring, limit) {
    return getAllUsers().filter(user => !user.isDeleted && user.login.includes(loginSubstring)).sort().slice(0, limit);
}

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getAutoSuggestedUsers
};

