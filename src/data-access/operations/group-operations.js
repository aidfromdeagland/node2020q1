const { userModel, groupModel, userGroupModel } = require('../../models');

const userAssociation = {
    model: userModel,
    attributes: ['id', 'login'],
    through: {
        attributes: []
    }
};

async function getAllGroups() {
    return groupModel.findAll({ include: userAssociation });
}

async function getGroup(id) {
    return groupModel.findByPk(id, { include: userAssociation });
}

async function addGroup(groupData) {
    return groupModel.create(groupData);
}

async function updateGroup(id, groupData) {
    return groupModel.update(groupData, {
        where: { id }
    });
}

async function deleteGroup(id) {
    return groupModel.destroy({ where: { id } });
}

async function addUsersToGroup(groupId, usersIds) {
    await groupModel.sequelize.transaction(async transaction => {
        const groupedUsers = usersIds.map(userId => ({ group_id: groupId, user_id: userId  }));
        await userGroupModel.bulkCreate(groupedUsers, { transaction });
    });
}

module.exports = {
    getAllGroups,
    getGroup,
    addGroup,
    updateGroup,
    deleteGroup,
    addUsersToGroup
};

