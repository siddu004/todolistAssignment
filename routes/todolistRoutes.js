'use strict';

var express = require('express');

var router = express.Router();

var todolistController = require('../controllers/todolistController');


router.post('/', todolistController.createTodolist);

router.get('/', todolistController.getTodolistForUser);

router.get('/:tid', todolistController.getToDoById);

router.put('/:tid', todolistController.updateTodo);

router.delete('/:tid', todolistController.deleteTodo);

router.delete('/user/:uid', todolistController.deleteUserTodolist);

module.exports = router;