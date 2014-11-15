'use strict';

// The Package is past automatically as first parameter
module.exports = function(Nodarium, app, auth, database) {

  app.get('/nodarium/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/nodarium/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/nodarium/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/nodarium/example/render', function(req, res, next) {
    Nodarium.render('index', {
      package: 'nodarium'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
