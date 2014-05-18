'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Light = mongoose.model('Light'),
    _ = require('lodash');

/**
* Find article by id
*/
exports.light = function(req, res, next, id) {
    Light.load(id, function(err, light) {
        if (err) return next(err);
        if (!light) return next(new Error('Failed to load article ' + id));
        req.light = light;
        next();
    });
};

/**
* Create an article
*/
exports.create = function(req, res) {
    var lightFixture = new Light(req.body);

    lightFixture.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(lightFixture);
        }
    });
};

exports.update = function(req, res) {
    var lightfixture = req.light;

    lightfixture = _.extend(lightfixture, req.body);

    lightfixture.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors
            });
        } else {
            res.jsonp(lightfixture);
        }
    });
};

/**
* Delete an article
*/
exports.destroy = function(req, res) {
    var light = req.light;

    light.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors
            });
        } else {
            res.jsonp(light);
        }
    });
};
//
///**
// * Show an article
// */
//exports.show = function(req, res) {
//    res.jsonp(req.article);
//};

/**
 * List of Light Fixtures
 */
exports.all = function(req, res) {
    Light.find().exec(function(err, lights) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(lights);
        }
    });
};
