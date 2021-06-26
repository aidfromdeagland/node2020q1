const { Op } = require('sequelize');
const userModel = require('../../models/user-model');
const initialUsers = require('../../../text/fixtures/users');

userModel.sync({ force: true }).then(() => {
    userModel.bulkCreate(initialUsers).then(() => {
        console.info('user table created');
    }).catch((err) => {
        console.error(`user table creation failed: ${err}`);
    });
});

async function getUser(id) {
    return userModel.findByPk(id);
}

async function addUser(userData) {
    return userModel.create(userData);
}

async function updateUser(id, userData) {
    await userModel.update(userData, {
        where: { id }
    });
}

async function deleteUser(id) {
    await userModel.update(
        { isDeleted: true },
        { where: { id } }
    );
}

async function getAutoSuggestedUsers(loginSubstring, limit) {
    return userModel.findAll({
        where: {
            login: { [Op.like]: `${loginSubstring}%` },
            isDeleted: false
        },
        order: [['login', 'ASC']],
        limit
    });
}

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getAutoSuggestedUsers
};

