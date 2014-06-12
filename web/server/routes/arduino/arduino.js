'use strict';

module.exports = function (app) {

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

