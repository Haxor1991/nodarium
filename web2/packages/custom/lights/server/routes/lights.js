'use strict';

// The Package is past automatically as first parameter
module.exports = function(Lights, app, auth, database, Arduino, socketio) {

    socketio.io.on('connection', function(socket){

        socket.on('light', function(){
            console.log('lights event fired');

            //for( var i = 0; i < 100; i++) {
                Arduino.addTask();
            //}

        });
    });

  app.get('/lights/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/lights/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/lights/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/lights/example/render', function(req, res, next) {
    Lights.render('index', {
      package: 'lights'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
