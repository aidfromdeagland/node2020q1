const { DataTypes } = require('sequelize');
const { sequelize } = require('../data-access/connection');

const userGroupModel = sequelize.define(
    'user_group',
    {
        groupId: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: 'group',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
            field: 'group_id'
        },
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
            field: 'user_id'
        }
    },
    {
        timestamps: false
    }
);

module.exports = userGroupModel;
