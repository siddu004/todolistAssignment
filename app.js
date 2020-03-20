
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true,useNewUrlParser: true }, () => {
    console.log("Connected to db");
});



const express = require('express');
const app = express();

//Import Routes
var index = require('./routes/index');


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

//Use routes
app.use('/api/', index);

let server;
server = http.createServer(app);
server.listen(process.env.PORT);
server.on('listening', () => {
    console.log("server started");
});




