'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Sensor = mongoose.model('Sensor'),
    _ = require('lodash');


/**
 * BASIC SENSOR API
 */

module.exports = {

    /**
     * Get sensor by machine name
     */

    getSensor: function (req, res, next) {
        console.log(
            req.params
        );
        if(req.param('sensorMachineName')){
            Sensor.findOne({machineName: req.param('sensorMachineName')}).exec(function(err,result){
                if(err){
                    res.jsonp({err: 'something went wrong..., no data'});
                    return;
                }
                res.jsonp(result);

            });
        }


    },

    /**
     * Get all sensors
     */
    allSensors: function (req, res, next) {

        Sensor.find().exec(function (err, sensors) {
            if (!err) {
                res.jsonp(sensors);
            } else {
                res.jsonp(500, {err: err});
            }
        });

    },

    /**
     * Create new sensor
     */
    createSensor: function (req, res, next) {
        var sensor = new Sensor(req.body);
        console.log(req.body);
        sensor.save(function (err) {
            res.jsonp(req.body);
        });

    },

    /**
     * Update sensor settings
     */
    updateSensor: function (req, res, next) {
        res.jsonp({nop: 'nope'});
    },

    /**
     * Delete a sensor
     */
    deleteSensor: function () {
    },


    /***
     * LOGGING:
     */

    /**
     * Get all readings
     */
    getAllReadings: function (req, res, next) {
        // check if we have a machine name....
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');


        Sensor.findOne({machineName: req.param('sensorMachineName')}, 'logs.readings').exec(function (err, sensors) {
            console.log(sensors);
            res.jsonp(sensors.logs.readings);
        });
//        res.jsonp({yep:'yep'});
    },

    /**
     * Get readings since timestamp
     */
    getReadingSince: function () {
    },

    /**
     * Get readings between timestamps
     */
    getReadingsBetween: function () {
    },

    /**
     * Get reading from the past month
     */
    getReadingPastMonth: function () {
    },


    /**
     * Record new reading
     */
    createRecord: function (req, res, next) {

        Sensor.findOne({machineName: req.param('sensorMachineName')}).exec(function (err, sensor) {

            console.log(typeof(req.param('reading')));
            if (typeof(req.param('reading')) === 'undefined') {
                res.jsonp({msg: 'reading missing, abort save'});
                return;
            }
            sensor.logs.readings.push({ date: Date.now(), reading: req.param('reading') });

            sensor.save(function (err) {
                console.log('saved');
            });
            res.jsonp({msg: 'record added'});
        });


    },


    /**
     * Delete readings
     */
    deleteRecord: function () {
    },

    /**
     * Delete all readings before timestamp
     */
    deleteAllRecordsBefore: function () {
        Sensor.getAll();
        _.isNumber(5);
    }


};
