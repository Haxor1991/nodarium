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

function pad(num, size) {
    var s = '000000000' + num;
    return s.substr(s.length-size);
}


/***
 *
 * @param commandObj
 *
 * {
 *      commandString:
 *
 * }
 */
app.arduino.sendCommand = function(command){

   console.log(app.arduino.q.length);

    var d = new Date(),
        commandObj = {'commandString': command};

    var id = (commandObj.commandString+'cmd:'+ app.arduino.commandCount);

    commandObj.commandNumber = app.arduino.commandCount++;
    commandObj.timeStamp = d.getTime();

    app.arduino.q[id]=commandObj;

    console.log('adding command:');
    console.log(app.arduino.q);
};

app.arduino.verifyCommand = function(commandObj) {
    var id = (commandObj.commandString+'cmd:'+ commandObj.commandNumber);

    if(typeof(app.arduino.q[id]) === 'object'){
        delete app.arduino.q[id];

        // we've validated the last submission, so we are done.
        app.arduino.sendingCommand = false;

    }
    console.log('verify response');
    console.log(app.arduino.q);
};


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
    console.log('itereator');
    // check if we are currently sending out a message... if we are wait...

    if(app.arduino.sendingCommand) return;

    console.log('is it working?', app.arduino.q.length, 'bla');
    if(app.arduino.q.length > 0) {
        console.log('form within the loop');
        for(var key in app.arduino.q) break;
        console.log(app.arduino.q[key].commandNumber);
        writeAndDrain(pad(app.arduino.q[key].commandNumber,5)+app.arduino.q[key].commandString+'\n');
    }


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
