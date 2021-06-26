const express = require('express');
const validate = require('../validation/validation');
const userSchema = require('../validation/schemas/user-schema');
const { getUser, updateUser, deleteUser, postUser, suggestUsers } = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.route('/suggestions/')
    .get(suggestUsers);

userRouter.route('/:id')
    .get(getUser)
    .put(validate(userSchema), updateUser)
    .delete(deleteUser);

userRouter.route('/')
    .post(validate(userSchema), postUser);

module.exports = userRouter;
