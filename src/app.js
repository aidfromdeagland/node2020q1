'use strict';

const  express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const { logDebug, logError, logServiceMethodCall } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

const { connect, close } = require('./data-access/connection');
const syncModels = require('./data-access/operations/synchronization');

const userRouter = require('./routes/user-route');
const groupRouter = require('./routes/group-route');

const port = process.env.PORT;
const app = express();

app.set('x-powered-by', false)
    .use(logServiceMethodCall)
    .use(express.json())
    .use('/users/', userRouter)
    .use('/groups/', groupRouter)
    .use(errorHandler);

process
    .on('uncaughtException', error => {
        logError(error);
        return close().then(() => process.exit(1));
    })
    .on('unhandledRejection', (reason, promise) => {
        logError({ reason, promise });
    });


connect()
    .then(syncModels)
    .then(() => {
        app.listen(port, () => logDebug(`homework5 app is listening at http://localhost:${port}`));
    })
    .catch((error) => {
        logError(`connection to the database failed: ${error}`);
    });
