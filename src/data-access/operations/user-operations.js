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

