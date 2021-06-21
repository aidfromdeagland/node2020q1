'use strict';

const  express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const { connect } = require('./data-access/connection');

const userRouter = require('./routes/user-route');
const userSuggestionRouter = require('./routes/user-suggestion-route');
const groupRouter = require('./routes/group-route');

const port = process.env.PORT;
const app = express();

app.set('x-powered-by', false)
    .use(express.json())
    .use('/users/', userRouter)
    .use('/suggestions/', userSuggestionRouter)
    .use('/groups/', groupRouter);


connect()
    .then(() => {
        app.listen(port, () => console.log(`homework4 app is listening at http://localhost:${port}`));
    })
    .catch((error) => {
        console.error(`connection to the database failed: ${error}`);
    });
