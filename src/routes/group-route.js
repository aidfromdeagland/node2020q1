const express = require('express');
const validate = require('../validation/validation');
const groupSchema = require('../validation/schemas/group-schema');
const { handleIdParam, getGroup, updateGroup, deleteGroup, postGroup } = require('../controllers/group-controller');


const groupRouter = express.Router();

groupRouter.param('id', handleIdParam);

groupRouter.route('/:id')
    .get(getGroup)
    .put(validate(groupSchema), updateGroup)
    .delete(deleteGroup);

groupRouter.route('/')
    .post(validate(groupSchema), postGroup);

module.exports = groupRouter;
