'use strict';

var blogic = require('../lib/blogic'),
    storage = require('../lib/storage');

    module.exports = {

        deleteTodo: function (req, res) {
            deleteTodo(req, res);
        },
    
        deleteUserTodolist: function (req, res) {
            deleteUserTodolist(req, res);
        },
        createTodolist: function (req, res) {
            createTodolist(req, res);
        },
    
        getTodolistForUser: function (req, res) {
            getTodolistForUser(req, res);
        },
        updateTodo: function (req, res) {
            updateTodo(req, res);
        },
        
        getToDoById: function (req, res) {
            getToDoById(req, res);
        }

    }
   
    async function processErrorMessage(err, res) {
       
        let resObj = {
            status: 'Error',
            statusCode: 500,
            message: 'Internal Server Error',
            description: err
        };
        
        return res.status(500).json(resObj);
    
}

   var createTodolist = async function (req, res) {
        try {
            let resObj = {};
            resObj.result = [];
            resObj.result.push(await blogic.todolist.createTodolist(req.body));
            resObj.status = 'success';
            if(resObj.result.length == 0) {
                resObj.msg = 'todolist not created';
            }
            else {
                resObj.msg = 'todolist created';
            }
            return res.status(201).json(resObj);
        } catch (err) {
            return processErrorMessage(err, res);
        }
    }
    
   //retrieve todo
   var getToDoById = async function (req, res) {
        try {
            let query = { _id: req.params.tid };
            let resObj = {};
            resObj.result = await storage.mongoDB.todolist.getTodolist(query);
            resObj.status = 'success';
            if(resObj.result.length == 0) {
                resObj.msg = 'todo not found';
            }
            else {
                resObj.msg = 'todo found';
            }
            return res.status(200).json(resObj);
        } catch (err) {
            return processErrorMessage(err, res);
        }
    }
    
   //get todolist of user
   var getTodolistForUser = async function (req, res) {
        try {
            
            let resObj = {};
            resObj.result = [];
            let todolist = await storage.mongoDB.todolist.getTodolistForUser(req.params.uid);
            resObj.result.push(todolist);
            resObj.status = 'success'; 
            if(devices.length == 0) {
                resObj.msg = 'todolist not found';
            }
            else {
                resObj.msg = 'todolist found';
            }
            return res.status(200).json(resObj);
        } catch (err) {
            return processErrorMessage(err, res);
        }
    }
    
  // Update todo
  var updateTodo = async function (req, res) {
        try {
            let resObj = {};
            resObj.result= [];
            resObj.result.push(await blogic.todolist.updateTodolist(req.params.tid, req.body));
            resObj.status = 'success';
            return res.status(200).json(resObj);
        } catch (err) {
            return processErrorMessage(err, res);
        }
    }
    
  //delete todo
 var deleteTodo = async function (req, res) {
        try {
            let resObj = {};
            await blogic.todolist.deleteTodolist(req.params.tid);
            resObj.status = 'success';     
            return res.status(204).json();
        } catch (err) {
            return processErrorMessage(err, res);
        }
    }

    // delete todolist of user
    var deleteUserTodolist = async function (req, res) {
        try {
            let resObj = {};
            await blogic.todolist.deleteUserTodolist(req.params.uid);
            resObj.status = 'success';     
            return res.status(204).json();
        } catch (err) {
            return processErrorMessage(err, res);
        }
    }
    
    