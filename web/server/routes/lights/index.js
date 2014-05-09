//'use strict';
//
//var lights = {
//    'turnOn': function () {
//        console.log('turning on light');
//    }
//};
//
//
//module.exports = lights;


'use strict';

module.exports = function(app) {

    var io = app.io;

    // Home route
    var lights = require('../../controllers/lights/index');


    // SOCKET IO ROUTES / Events
    io.sockets.on('connection', function(){
        lights.turnOn();
    });


};

