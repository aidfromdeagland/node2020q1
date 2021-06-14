const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../data-access/connection');

const userModel = Model.init(
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
    {   sequelize,
        modelName: 'user',
        timestamps: false
    }
);

module.exports = userModel;
