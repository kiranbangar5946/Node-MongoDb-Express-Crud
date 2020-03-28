var mongoose = require('mongoose');
var { global } =require('../config/globals.js')
//require chalk module to give colors to console text
var chalk = require('chalk');



var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export this function and imported by server.js
    mongoose.connect(global.env.DB,{
        useNewUrlParser: true,
        useCreateIndex: true,
    });

    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", global.env.DB));
    });

    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
