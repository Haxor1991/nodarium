'use strict';

var arduino = require('../controllers/arduinoController');

var time;

// The Package is past automatically as first parameter
module.exports = function(Arduino, app, auth, database) {

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




    //  Arduino Setup
    setTimeout(function(){
        arduino.updateLights(app);
    },1000);

    //  Arduino Loop:

    // every second
    setInterval(function(){

        // Update Time variable every second so we always have up-to-date time
        time = new Date();

        arduino.updateLights(app);



    },60000);

    // every second
    setInterval(function(){




    },60000);





};
