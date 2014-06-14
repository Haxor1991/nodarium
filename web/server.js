'use strict';

/**
 * Module dependencies.
 */

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


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

    var d = new Date(),
        commandObj = {'commandString': command};

    var id = (commandObj.commandString+'cmd:'+ app.arduino.commandCount);

    commandObj.commandNumber = app.arduino.commandCount++;
    commandObj.timeStamp = d.getTime();

    app.arduino.q[id]=commandObj;

};

app.arduino.verifyCommand = function(commandObj) {

    var timeStamp = new Date().toLocaleString();
    var id = (commandObj.commandString+'cmd:'+ commandObj.commandNumber);

    if(typeof(app.arduino.q[id]) === 'object'){

        if(typeof(commandObj.command) === 'undefined' )
            return;


        switch (commandObj.command) {
            case '01':  // temps
                console.log(commandObj);
                console.log(timeStamp+': Getting temps for prod ' + commandObj.sensorType + ':' +commandObj.sensorNumber + ': '+commandObj.temperature);
                break;

            case '02':  // humidity
                console.log(timeStamp+': getting humidity level '+ commandObj.pwmchannel + 'on chip '+commandObj.pwmChannel+', new value is: '+commandObj.intensity);
                break;

            case '03':  // water level
                console.log(timeStamp+': Getting water level');

                break;


            case '04':  // lights
                console.log(timeStamp+': Updating light channel '+ commandObj.pwmchannel + ' on chip '+commandObj.pwmChip+', new value is: '+commandObj.intensity);

                break;
        }

        delete app.arduino.q[id];

        // we've validated the last submission, so we are done.
        app.arduino.sendingCommand = false;
        if(app.arduino.commandCount > 10000 ){
            app.arduino.commandCount = 0;
        }

    }
};


function writeAndDrain(data, callback) {

    if (app.serialConnectionStatus) {
            callback = callback || function () {
            };
            serialPort.write(data, function (error, results) {
                serialPort.drain(callback);
            });
    }
}


setInterval(function(){
    // check if we are currently sending out a message... if we are wait...

    if(app.arduino.sendingCommand) return;

    if(Object.size(app.arduino.q) > 0) {
        for(var key in app.arduino.q) break;
        writeAndDrain(pad(app.arduino.q[key].commandNumber,5)+app.arduino.q[key].commandString+'\n');
    }


}, 100);


serialPort.on('data', function (data) {
    app.arduino.verifyCommand(JSON.parse(data));
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
