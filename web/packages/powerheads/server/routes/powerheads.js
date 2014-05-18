'use strict';

// The Package is past automatically as first parameter
module.exports = function(Powerheads, app, auth, database) {

    app.get('/powerheads/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/powerheads/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/powerheads/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/powerheads/example/render', function(req, res, next) {
        Powerheads.render('index', {
            package: 'powerheads'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
