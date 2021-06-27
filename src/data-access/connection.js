const { Sequelize } = require('sequelize');
const { host, port, database: databaseName, user, password, dialect } = require('../config/database-config');
const { logDebug, logError } = require('../middlewares/logger');

const database = new Sequelize(databaseName, user, password, { host, port, dialect });

async function connect() {
    try {
        await database.authenticate();
        logDebug('connection granted');
    } catch (error) {
        logError('connection failed', error);
    }
}

async function close() {
    return database.close();
}

module.exports = { sequelize: database, connect, close };
