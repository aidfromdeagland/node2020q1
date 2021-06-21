const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../data-access/connection');

class groupModel extends Model {}

groupModel.init(
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
    {   sequelize,
        modelName: 'group',
        timestamps: false
    }
);

module.exports = groupModel;
