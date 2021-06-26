const groupModel = require('../../models/group-model');
const initialGroups = require('../../../text/fixtures/groups');

groupModel.sync({ force: true }).then(() => {
    groupModel.bulkCreate(initialGroups).then(() => {
        console.info('group table created');
    }).catch((err) => {
        console.error(`group table creation failed: ${err}`);
    });
});


async function getAllGroups() {
    return groupModel.findAll();
}

async function getGroup(id) {
    return groupModel.findByPk(id);
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

module.exports = {
    getAllGroups,
    getGroup,
    addGroup,
    updateGroup,
    deleteGroup
};

