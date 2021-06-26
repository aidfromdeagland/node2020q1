const { userModel, groupModel, userGroupModel } = require('../../models');
const initialUsers = require('../../../text/fixtures/users');
const initialGroups = require('../../../text/fixtures/groups');


async function syncUserModel() {
    return userModel.sync({ force: true }).then(() => {
        userModel.bulkCreate(initialUsers).then(() => {
            console.info('user table created');
        }).catch((err) => {
            console.error(`user table creation failed: ${err}`);
        });
    });
}

async function syncGroupModel() {
    return groupModel.sync({ force: true }).then(() => {
        groupModel.bulkCreate(initialGroups).then(() => {
            console.info('group table created');
        }).catch((err) => {
            console.error(`group table creation failed: ${err}`);
        });
    });
}

async function syncUserGroupModel() {
    return userGroupModel.sync({ force: true }).then(() => {
        console.info('userGroup table created');
    }).catch((err) => {
        console.error(`userGroup table creation failed: ${err}`);
    });
}

async function syncModels() {
    try {
        await Promise.all([syncUserModel(), syncGroupModel()]);
        await syncUserGroupModel();
    } catch (error) {
        console.error(`models synchronization failed: ${error}`);
    }
}

module.exports = syncModels;
