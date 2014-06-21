'use strict';

var sensors = require('../controllers/sensor.js');

// The Package is past automatically as first parameter
module.exports = function(Sensors, app, auth, database) {

    app.get('/sensors/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/sensors/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/sensors/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/sensors/example/render', function(req, res, next) {
        Sensors.render('index', {
            package: 'sensors'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });






    // Basic sensor api
    app.route('/api/v1/sensors')
        .get(sensors.allSensors)
        .post(auth.requiresLogin, sensors.createSensor);

    app.route('/api/v1/sensors/readings/:sensorMachineName/:reading?')
        .get(sensors.getAllReadings)
        .post(auth.requiresLogin,sensors.createRecord);


    app.route('/api/v1/sensors/:sensorMachineName')
        .get(sensors.getSensor)
        .put(auth.requiresLogin, sensors.updateSensor)
        .delete(auth.requiresLogin, sensors.deleteSensor);

//    app.param('sensorMachineName',sensors.getSensor);
//    app.param('time',sensors.getSensor);


    // sensor readings





};
