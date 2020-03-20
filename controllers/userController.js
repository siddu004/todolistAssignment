'use strict';

require('../models/userModel');



var blogic = require('../lib/blogic'),
    storage = require('../lib/storage');
    
    module.exports = {

        register: function (req, res) {
            register(req, res);
        },
        signin: function (req, res) {
            signin(req, res);
        },
        getUser: function (req, res) {
            getUser(req, res);
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
    

// register user
var register = async function (req, res) {
    try {
        let resObj = {};
        resObj.result = [];
        resObj.result.push(await blogic.user.createUser(req.body));
        resObj.status = 'success';
        if (resObj.result.length == 0) {
            resObj.msg = 'user not created';
        }
        else {
            resObj.msg = 'user created';
        }
   
        return res.status(201).json(resObj);
    } catch (err) {
        return processErrorMessage(err, res);
    }
};

// signin user
var signin = async function (req, res) {
    try {
        let resObj = {};
        resObj.result = [];
       let jsonObj= await blogic.user.signIn(req.body);
        if (jsonObj["code"] != undefined){
            resObj.msg = jsonObj.msg;
            return res.status(jsonObj.status).json(resObj);
        }else{
        resObj.result.push(jsonObj);
        resObj.status = 'success';
        return res.status(201).json(resObj);
        }
       
    } catch (err) {
        return processErrorMessage(err, res);
    }
};

  //get user
 var getUser = async function (req, res) {
    try {
        let query = { _id: req.params.id };
        let resObj = {};
        resObj.result = await storage.mongoDB.user.getUser(query);
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
