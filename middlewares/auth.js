storage = require('../lib/storage');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var checkUserToken = async function (req, res, next) {

    var auth_token = req.headers['x-auth-token']

    // decode token
    if (auth_token) {
        try{
            
            var token_info = jwt.verify(auth_token,process.env.JWT_SECRET);
             
            if (token_info) {
               
                req.decoded = token_info;
                next();
            } else {
                return res.status(401).json({ status: 'error', message: 'access denied' });
            }
        }catch(err){
            return res.status(500).json({ status: 'error', message: 'Internal Server Error'});
        }
    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}




module.exports = {
    checkUserToken: checkUserToken
}