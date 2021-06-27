const { userModel, groupModel, userGroupModel } = require('../../models');
const initialUsers = require('../../../text/fixtures/users');
const initialGroups = require('../../../text/fixtures/groups');
const { logDebug, logError } = require('../../middlewares/logger');


async function syncUserModel() {
    return userModel.sync({ force: true }).then(() => {
        userModel.bulkCreate(initialUsers).then(() => {
            logDebug('user table created');
        }).catch(error => {
            logError(`user table creation failed: ${error}`);
        });
    });
}

async function syncGroupModel() {
    return groupModel.sync({ force: true }).then(() => {
        groupModel.bulkCreate(initialGroups).then(() => {
            logDebug('group table created');
        }).catch(error => {
            logError(`group table creation failed: ${error}`);
        });
    });
}

async function syncUserGroupModel() {
    return userGroupModel.sync({ force: true }).then(() => {
        logDebug('userGroup table created');
    }).catch(error => {
        logError(`userGroup table creation failed: ${error}`);
    });
}

async function syncModels() {
    try {
        await Promise.all([syncUserModel(), syncGroupModel()]);
        await syncUserGroupModel();
    } catch (error) {
        logError(`models synchronization failed: ${error}`);
    }
}

module.exports = syncModels;
