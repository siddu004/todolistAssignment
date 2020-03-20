'use strict';

var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth');
var userRoutes = require('./userRoutes');
var todolistRoutes = require('./todolistRoutes');

router.use('/users', userRoutes);
router.use(auth.checkUserToken);
router.use('/todolist', todolistRoutes);

module.exports = router;
