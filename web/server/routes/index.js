'use strict';

module.exports = function(app) {

    var io = app.io;

    // Home route
    var index = require('../controllers/index');

    app.route('/')
        .get(index.render);


    // SOCKET IO ROUTES / Events
    io.sockets.on('connection', function(){
//        index.greetings();
    });


};

