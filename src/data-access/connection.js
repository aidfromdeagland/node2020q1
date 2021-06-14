const { Sequelize } = require('sequelize');
const { host, port, database, user, password, dialect } = require('../config/database-config');


const sequelize = new Sequelize(database, user, password, { host, port, dialect });

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.info('connection granted');
    } catch (error) {
        console.error('connection failed', error);
    }
};

const close = () => sequelize.close();

module.exports = { sequelize, connect, close };
