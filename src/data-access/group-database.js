const groupModel = require('../models/group-model');
const initialGroups = require('./initial-data/groups');

groupModel.sync({ force: true }).then(() => {
    groupModel.bulkCreate(initialGroups).then(() => {
        console.info('group table created');
    }).catch((err) => {
        console.error(`group table creation failed: ${err}`);
    });
});


async function getAllGroups() {
    const groups = await groupModel.findAll();

    return groups;
}

async function getGroup(id) {
    const group = await groupModel.findByPk(id);

    return group;
}

async function addGroup(groupData) {
    return await groupModel.create(groupData);
}

async function updateGroup(id, groupData) {
    await groupModel.update(groupData, {
        where: { id }
    });
    return await groupModel.findByPk(id);
}

async function deleteGroup(id) {
    await groupModel.destroy({ where: { id } });
}

module.exports = {
    getAllGroups,
    getGroup,
    addGroup,
    updateGroup,
    deleteGroup
};

