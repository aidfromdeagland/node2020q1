const { Op } = require('sequelize');
const userModel = require('../models/user-model');
const initialUsers = require('./initial-data/users');

userModel.sync({ force: true }).then(() => {
    userModel.bulkCreate(initialUsers).then(() => {
        console.info('user table created');
    }).catch((err) => {
        console.error(`user table creation failed: ${err}`);
    });
});

async function getAllUsers() {
    const users = await userModel.findAll({
        where: { isDeleted: false }
    });

    return users;
}

async function getUser(id) {
    const user = await userModel.findByPk(id);

    return user;
}

async function addUser(userData) {
    return await userModel.create(userData);
}

async function updateUser(id, userData) {
    await userModel.update(userData, {
        where: { id }
    });
    return await userModel.findByPk(id);
}

async function deleteUser(id) {
    await userModel.update(
        { isDeleted: true },
        { where: { id } }
    );
}

async function getAutoSuggestedUsers(loginSubstring, limit) {
    const suggestedUsers = await userModel.findAll({
        where: { [Op.and]: [{ login: { [Op.substring]: loginSubstring } }, { isDeleted: false }] },
        limit
    });
    return suggestedUsers;
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getAutoSuggestedUsers
};

