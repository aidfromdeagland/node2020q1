'use strict';

const express = require('express');
const { StatusCodes } = require('http-status-codes');
const validateUser = require('../validation/user-validation');
const userDatabase = require('../database/user-database');

const userRouter = express.Router();

userRouter.param('id', (req, res, next, id) => {
    const user = userDatabase.getUser(id);

    if (user) {
        req.user = user;
        return next();
    }

    res.status(StatusCodes.NOT_FOUND).send({ message: `There is no user with id ${id}` });
});

userRouter.route('/')
    .post(
        validateUser(),
        (req, res) => {
            const newUser = req.body;

            res.status(StatusCodes.CREATED).send(userDatabase.addUser(newUser));
        }
    )
    .get((req, res) => {
        res.send(userDatabase.getAllUsers());
    });

userRouter.route('/:id')
    .get((req, res) => {
        res.send(req.user);
    })
    .put(
        validateUser(),
        (req, res) => {
            res.send(userDatabase.updateUser(req.user.id, req.body));
        }
    )
    .delete((req, res) => {
        userDatabase.deleteUser(req.user.id);

        res.status(StatusCodes.NO_CONTENT).send();
    });

module.exports = {
    userRouter
};
