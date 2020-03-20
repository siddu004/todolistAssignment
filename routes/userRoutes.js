'use strict';

var express = require('express');

var router = express.Router({mergeParams: true});

var userController = require('../controllers/userController');


router.post('/', userController.register);


router.post('/signin', userController.signin);



module.exports = router;
