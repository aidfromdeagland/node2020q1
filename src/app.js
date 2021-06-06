'use strict';

const  express = require('express');
const dotenv = require('dotenv');

const { userRouter } = require('./routes/user-route');
const { suggestionRouter } = require('./routes/suggestion-route');

dotenv.config();
const port = process.env.PORT;
const app = express();

app.set('x-powered-by', false)
    .use(express.json())
    .use('/users/', userRouter)
    .use('/suggestions/', suggestionRouter)
    .listen(port, () => console.log(`homework2 app is listening at http://localhost:${port}`));
