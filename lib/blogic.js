
var storage = require('./storage')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
User = mongoose.model('User');
Todolist = mongoose.model('Todolist');
require('dotenv').config();



var todolist = {

    createTodolist: async function (body) {
        try {

            var newTodolist = new Todolist(body);
            var savedTodolist = await newTodolist.save();

            return savedTodolist;

        } catch (err) {
            return throwErrorMessage(err);
        }
    },

    deleteTodolist: async function (tId) {
        try {
            let query = { _id: tId };
            return await storage.mongoDB.todolist.deleteTodolist(query);
        } catch (err) {
            return throwErrorMessage(err);
        }
    },

    deleteUserTodolist: async function (uid) {
        try {
           
            return await storage.mongoDB.todolist.deleteUserTodolist(uid);
        } catch (err) {
            return throwErrorMessage(err);
        }
    },
    updateTodolist: async function (tid, body) {
        try {
            let query = { _id: tid };
            return await storage.mongoDB.todolist.updateTodolist(query, body);
        } catch (err) {
            return throwErrorMessage(err);
        }
    },

}

var user = {

    createUser: async function (body) {
        try {
            var salt = await bcrypt.genSaltSync(10);
            var hashedPassword = await bcrypt.hashSync(body.password, salt);
            body.password = hashedPassword;
            var newUser = new User(body);
            var savedUser = await newUser.save();
            savedUser = savedUser.toJSON();
            delete savedUser["password"];
            return savedUser;

        } catch (err) {
            return throwErrorMessage(err);
        }
    },

    signIn: async function (body) {
        try {
            let user = await storage.mongoDB.user.getUser({
                email: body.email
            });
            user=user[0];
            if (!user) {
                return { code: 401, message: 'User not found.' };
            } else if (user) {
                if (!bcrypt.compareSync(body.password, user.password)) {
                    return { code: 401, message: 'Wrong password.' };
                } else {
                    var newToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                    var userJson = user.toJSON();
                    delete userJson.password;
                    userJson.token = newToken;
                    let todolist = await storage.mongoDB.todolist.getTodolistForUser(user._id);
                    userJson['todolist'] = todolist;
                    return userJson;
                }
            }
        } catch (err) {
            return throwErrorMessage(err);
        }
    },

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
    user: user
}
