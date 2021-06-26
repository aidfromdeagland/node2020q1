const { Sequelize } = require('sequelize');
const { host, port, database: databaseName, user, password, dialect } = require('../config/database-config');


const database = new Sequelize(databaseName, user, password, { host, port, dialect });

const connect = async () => {
    try {
        await database.authenticate();
        console.info('connection granted');
    } catch (error) {
        console.error('connection failed', error);
    }
};

const close = () => database.close();

module.exports = { sequelize: database, connect, close };
