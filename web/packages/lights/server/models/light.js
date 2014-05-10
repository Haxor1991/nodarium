'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var LightSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: 'New Light Fixture',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    channels : [
        {
            channelName: {
              type: String,
                trim:true,
                default: '#ad9cd9'
            },
            color: {
                type: String,
                trim: true
            },
            pin: {
                type: Number
            },
            pinsGroup : {
                type: String,
                trim: true
            },
            day: Number,
            night: Number
        }
    ],
    lightIntensity: {
        day: Number,
        night:Number
    }


});

/**
 * Validations
 */
LightSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');



/**
 * Statics
 */
LightSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};


mongoose.model('Light', LightSchema);
