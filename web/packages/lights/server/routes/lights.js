'use strict';

var lights = require('../controllers/lights');



// The Package is past automatically as first parameter
module.exports = function (Lights, app, auth, database) {

    app.get('/lights/example/anyone', function (req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/lights/example/auth', auth.requiresLogin, function (req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/lights/example/admin', auth.requiresAdmin, function (req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/lights/example/render', function (req, res, next) {
        Lights.render('index', {
            package: 'lights'
        }, function (err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    app.route('/api/v1/lights')
        .get(lights.all)
        .post(auth.requiresLogin, lights.create);

    app.route('/api/v1/lights/:lightId')
        .put(auth.requiresLogin, lights.update)
        .delete(auth.requiresLogin, lights.destroy);

    app.param('lightId', lights.light);




};
