const { Op } = require('sequelize');
const { userModel, groupModel } = require('../../models');

const groupAssociation = {
    model: groupModel,
    attributes: ['id', 'name'],
    through: {
        attributes: []
    }
};

async function getUser(id) {
    return userModel.findByPk(id, { include: groupAssociation });
}

async function getUserByCreds(login, password) {
    return userModel.findOne({ where: { login, password } });
}

async function addUser(userData) {
    return userModel.create(userData);
}

async function updateUser(id, userData) {
    return userModel.update(userData, {
        where: { id }
    });
}

async function deleteUser(id) {
    return userModel.update(
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
    getUserByCreds,
    addUser,
    updateUser,
    deleteUser,
    getAutoSuggestedUsers
};

