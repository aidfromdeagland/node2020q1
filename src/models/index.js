const userModel = require('./user-model');
const groupModel = require('./group-model');
const userGroupModel = require('./user-group-model');

userModel.belongsToMany(groupModel, { through: userGroupModel, foreignKey: 'user_id' });
groupModel.belongsToMany(userModel, { through: userGroupModel, foreignKey: 'group_id' });


module.exports = {
    userModel,
    groupModel,
    userGroupModel
};
