const { DataTypes } = require('sequelize');
const { sequelize } = require('../data-access/connection');

const groupModel = sequelize.define(
    'group',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.ENUM(['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']))
        }
    },
    {
        timestamps: false
    }
);

module.exports = groupModel;
