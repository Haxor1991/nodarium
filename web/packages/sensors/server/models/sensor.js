'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Sensor Schema
 */

var recordSchema = new Schema({
    date: Date,
    reading: Number
});

var SensorSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },

    displayTitle: {
        type: String,
        trim: true
    },
    machineName: {
        type: String,
        trim: true
    },
    showOnDashBoard:  Boolean,
    logInterval: Number,
    sensorType: String,
    sensorNumber: Number,
    oneWireBus: Number,
    logs: {
        firstReading: Date,
        lastReading: Date,
        readings: [recordSchema]

    }

})
;


/**
 * Statics
 */
SensorSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};


mongoose.model('Sensor', SensorSchema);
