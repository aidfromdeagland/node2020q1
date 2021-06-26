const { DataTypes } = require('sequelize');
const { sequelize } = require('../data-access/connection');

const userModel =  sequelize.define(
    'user',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        login: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_deleted'
        }
    },
    {
        timestamps: false
    }
);

module.exports = userModel;
