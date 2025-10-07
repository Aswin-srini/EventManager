const express = require('express');
const userController = require('./../controllers/userController');

const uxRou = express.Router();

uxRou.route('/SignIN')
    .post(userController.creatNewUser)

uxRou.route('/')
    .get(userController.viewAlluser)

uxRou.route('/:id')
    .get(userController.getuserById)

module.exports = uxRou;