'use strict';

module.exports = function (app) {

    var serialPort = app.serialPort;
    var writeAndDrain = app.writeAndDrain;


    // Home route
//    console.log('need to include some controllers in here...');


    app.get('/arduino/test', function (req, res) {
        writeAndDrain('C00\n');
    });


    serialPort.on('open', function (err) {
        console.log('Serial Connection to Arduino has been established');
        writeAndDrain('C00\n');

    });
//        .on('data', function (data) {
////            console.log('From arduino router:', data);
////            console.log('received some stuff from arduino', data);
//        });


    app.route('/api/v1/arduino')
        .get(function (req, res) {
            console.log('GET', req.body);
//            app.writeAndDrain('tty.linvor-DevB');
            app.writeAndDrain('C00\n');
            res.jsonp({'done': 'ok'});

        })
        .put(function (req, res) {
//            console.log('PUT', req.body);
            res.jsonp({'done': 'ok'});
        })
        .delete(function (req, res) {
//            console.log('DELETE', req.body);
            res.jsonp({'done': 'ok'});
        })
        .post(function (req, res) {
//            console.log('POST', req.body);
            res.jsonp({'done': 'ok'});
        });


};

