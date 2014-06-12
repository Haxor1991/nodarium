'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    passport = require('passport'),
    logger = require('mean-logger'),
    config = require('./server/config/config'),
    serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    serialPort = new SerialPort('/dev/rfcomm0', {
        baudrate: 57600,
        parser: serialport.parsers.readline('\n')
    }, false); // this is the openImmediately flag [default is true]



/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');
mongoose.connection.on('error', function(err){
    console.log(err);
});

var db = mongoose.connect(config.db);


// If the connection throws an error

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});



// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(passport, db),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
//io.set('log level', 1);
app.io = io;
app.arduino = {};
app.arduino.q = {};
app.arduino.commandCount = 0;
app.arduino.sendingCommand = false;

/***
 *
 * @param commandObj
 *
 * {
 *      commandString:
 *
 * }
 */
app.arduino.sendCommand = function(commandObj){

   console.log(app.arduino.q.length);

    var d = new Date();

    var id = (commandObj.commandString+'cmd:'+ app.arduino.commandCount);

    commandObj.commandNumber = app.arduino.commandCount++;
    commandObj.timeStamp = d.getTime();

    app.arduino.q[id]=commandObj;

    console.log(app.arduino.q);
};

app.arduino.verifyCommand = function(commandObj) {
    console.log('hecking for new items');
    var id = (commandObj.commandString+'cmd:'+ commandObj.commandNumber);

    if(typeof(app.arduino.q[id]) === 'object'){
        delete app.arduino.q[id];

        // we've validated the last submission, so we are done.
        app.arduino.sendingCommand = false;

    }


    console.log(app.arduino.q);
};

app.arduino.sendCommand({'commandString': 'yoyo'});
app.arduino.sendCommand({'commandString': 'yoyo2'});
app.arduino.sendCommand({'commandString': 'yoyo5'});



function writeAndDrain(data, callback) {

    if (app.serialConnectionStatus) {
        setTimeout(function () {
            console.log('sending data to arduino: ', data);
            callback = callback || function () {
            };
            serialPort.write(data, function (error, results) {
                serialPort.drain(callback);
            });
        }, 25);
    }
}


setInterval(function(){
    // check if we are currently sending out a message... if we are wait...
    if(app.arduino.sendingCommand) return;

    for(var key in app.arduino.q) break;

    writeAndDrain(app.arduino.q[key].commandString+'\n');

}, 1000);


serialPort.on('data', function (data) {
    console.log(data);

    app.arduino.verifyCommand(data);
});


// Start the app by listening on <port>, optional hostname
server.listen(config.port, config.hostname);
console.log('Mean app started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');

// Initializing logger
logger.init(app, passport, mongoose);

app.io.sockets.on('connection', function (socket) {
//    socket.on('updateNumber', function (data) {
//        socket.emit('giveMeNumber', parseInt(data) + 1);
//    });
});

app.serialPort = serialPort;
app.writeAndDrain = writeAndDrain;
app.serialConnectionStatus = false;






app.isArduinoConnected = false;

var arduinoConnection = setInterval(
    function () {
        app.serialPort.open(function (err) {
            if (!err) {

                app.serialConnectionStatus = true;
                clearInterval(arduinoConnection);
            }
        });
    }, 1000);

// Expose app
//exports = module.exports = app;
