'use strict';

// The Package is past automatically as first parameter
module.exports = function(Arduino, app, auth, database) {

    app.io = 'hello';

  app.get('/arduino/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/arduino/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/arduino/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/arduino/example/render', function(req, res, next) {
    Arduino.render('index', {
      package: 'arduino'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
