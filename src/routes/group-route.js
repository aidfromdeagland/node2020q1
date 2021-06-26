const express = require('express');
const validate = require('../validation/validation');
const groupSchema = require('../validation/schemas/group-schema');
const { getGroup, updateGroup, deleteGroup, postGroup, getAllGroups, addUsersToGroup } = require('../controllers/group-controller');

const groupRouter = express.Router();

groupRouter.route('/add-users/')
    .get(addUsersToGroup);

groupRouter.route('/:id')
    .get(getGroup)
    .put(validate(groupSchema), updateGroup)
    .delete(deleteGroup);

groupRouter.route('/')
    .post(validate(groupSchema), postGroup)
    .get(getAllGroups);

module.exports = groupRouter;
