'use strict';

const  express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const { connect } = require('./data-access/connection');
const syncModels = require('./data-access/operations/synchronization');

const userRouter = require('./routes/user-route');
const groupRouter = require('./routes/group-route');

const port = process.env.PORT;
const app = express();

app.set('x-powered-by', false)
    .use(express.json())
    .use('/users/', userRouter)
    .use('/groups/', groupRouter);


connect()
    .then(syncModels)
    .then(() => {
        app.listen(port, () => console.log(`homework4 app is listening at http://localhost:${port}`));
    })
    .catch((error) => {
        console.error(`connection to the database failed: ${error}`);
    });
