
const mongoose = require('mongoose');
require('../../models/userModel');
require('../../models/todolistModel');
var User = mongoose.model('User'),
Todolist= mongoose.model('Todolist');
// var User = mongodb.models.User;
// var Todolist = mongodb.models.Todolist;
var user = {
    getUser: async function (query) {
        try {
            var user = await User.find(query);
            return user;
        } catch (err) {
            return throwErrorMessage(err);
        }
    }

}

var todolist = {
    getTodolistForUser: async function (uid) {
        try {
            var todolist = await Todolist.find({user_id: uid.toString() });
            return todolist;
        } catch (err) {
            return throwErrorMessage(err);
        }
    },

    getTodolist: async function (query) {
        try {
            var todolist = await Todolist.find(query);
            return todolist;
        } catch (err) {
            return throwErrorMessage(err);
        }
    },

    updateTodolist: async function (query, data) {
        try {
            let todolist = await Todolist.findOneAndUpdate(query, data, { new: true });
            return todolist;
        } catch (err) {
            return throwErrorMessage(err);
        }
    },

    deleteTodolist: async function (query) {
        try {
            await Todolist.deleteOne(query);
            return "deleted";
        } catch (err) {
            return throwErrorMessage(err);
        }
    },

    deleteUserTodolist: async function (uid) {
        try {
            await Todolist.deleteMany({ user_id: uid.toString() });
            return "deleted";
        } catch (err) {
            return throwErrorMessage(err);
        }
    }


}

async function throwErrorMessage(err) {
    throw ({
        status: 'Error',
        statusCode: 500,
        description: err,
        message: 'Database Error'
    });
}

module.exports = {
    todolist: todolist,
    user: user,

}