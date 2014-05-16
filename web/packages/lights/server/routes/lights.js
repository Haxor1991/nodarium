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




    function pad(num, size) {
        var s = '000000000' + num;
        return s.substr(s.length-size);
    }


    // handling light functions to the arduino
    var io = app.io;
//    var serialPort = app.serialPort;
    var writeAndDrain = app.writeAndDrain; // used to send commands to arduino....

    // SOCKET IO ROUTES / Events
    io.sockets.on('connection', function(socket){

        socket.on('Update Light Channel', function(data){

            console.log('updating light channel', data);
            // get channel info / validate

            // talk to arduino
            var pwmChannel = (data.pwmChip === 'pwm1') ? '00' : '01';
            writeAndDrain('C04|'+pwmChannel+'|'+pad(data.channel,2)+'|'+pad(data.value,4)+'\n');
        });

        socket.on('Update All Channels', function(data){

            console.log('pdate All Channels', data);
            // get channel info / validate

            // talk to arduino
        });

    });







};
