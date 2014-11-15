'use strict';

//// The Package is past automatically as first parameter
//module.exports = function(Socketio, app, auth, database) {
//
//  app.get('/socketio/example/anyone', function(req, res, next) {
//    res.send('Anyone can access this');
//  });
//
//  app.get('/socketio/example/auth', auth.requiresLogin, function(req, res, next) {
//    res.send('Only authenticated users can access this');
//  });
//
//  app.get('/socketio/example/admin', auth.requiresAdmin, function(req, res, next) {
//    res.send('Only users with Admin role can access this');
//  });
//
//
//};


// The Package is past automatically as first parameter
module.exports = function(Socketio, app) {


    app.get('/socketio/example/render', function(req, res, next) {
        Socketio.render('index', {
            package: 'socketio'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });


    //
    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    Socketio.io = io;

    var PORT = 8282;

    server.listen(PORT, function() {
        console.log('Chat now listening on port: ' + PORT + '\n');
    });

    io.on('connection', function (socket) {
        console.log('connected from socketio module');
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });



};