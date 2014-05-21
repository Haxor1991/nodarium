'use strict';

var mongoose = require('mongoose'),
    Light = mongoose.model('Light'),
    _ = require('lodash');


var light = module.exports = {
    lights: {},

    timeToMinutes: function (time) {
        if(typeof(time) === 'undefined' )
            return 0;
        return ((time.getHours() * 60) + (time.getMinutes()));
    },

    timeToSeconds: function (time) {
        if(typeof(time) === 'undefined' )
            return 0;
        return (light.timeToMinutes(time) * 60);
    },

    mapLight: function (x, in_min, in_max, out_min, out_max) {

        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    },

    pad: function (num, size) {
        var s = '000000000' + num;
        return s.substr(s.length - size);
    },

    calculateBrightness: function (channel, maxBrightness, currentTime, onTime, offTime, rampTime) {

        var rampTimeInSeconds = light.timeToSeconds(rampTime),
            onTimeInSeconds = light.timeToSeconds(onTime),
            offTimeInSeconds = light.timeToSeconds(offTime),
            currentTimeInSeconds = light.timeToSeconds(currentTime),
            finalBrightness,
            minFullBrightness, // Night settings
            maxFullBrightness; // dat settings


        minFullBrightness = channel.night * ( maxBrightness.night / 100);
        maxFullBrightness = channel.day * ( maxBrightness.day / 100);

        // if we are in ramping time


        // Ramping is only done during the day time
        if (currentTimeInSeconds < onTimeInSeconds ||
            currentTimeInSeconds > offTimeInSeconds) {
            // night mode
//            console.log('night');
            return parseInt(minFullBrightness);

        } else {
            // day mode
//            console.log('day');
            // are we ramping up?
            if (currentTimeInSeconds > onTimeInSeconds &&
                currentTimeInSeconds < (onTimeInSeconds + rampTimeInSeconds)) {
                finalBrightness = parseInt(((currentTimeInSeconds - rampTimeInSeconds) / rampTimeInSeconds) * maxFullBrightness);
//                console.log( parseInt(light.mapLight(finalBrightness, 0, 4095, minFullBrightness, maxBrightness)));
                return parseInt(light.mapLight(finalBrightness, 0, 4095, minFullBrightness, maxBrightness));

            }

            // are we ramping down?
            else if (currentTimeInSeconds < offTimeInSeconds &&
                currentTimeInSeconds > (offTimeInSeconds - rampTimeInSeconds)) {
                finalBrightness = parseInt(((offTimeInSeconds - currentTimeInSeconds) / rampTimeInSeconds) * maxFullBrightness);
//                console.log( parseInt(light.mapLight(finalBrightness, 0, 4095, minFullBrightness, maxFullBrightness)));
                return parseInt(light.mapLight(finalBrightness, 0, 4095, minFullBrightness, maxFullBrightness));

            }
            // constant state
            else {
                return parseInt(maxFullBrightness);
            }

        }

        return '';
    },


    updateLights: function (app) {
        Light.find().exec(function (err, lights) {
            if (!err) {
                _(lights).forEach(function (lightFixture) {
                    var currentTime = new Date();
                    var onTime = lightFixture.schedule.day;
                    var offTime = lightFixture.schedule.night;
                    var rampTime = lightFixture.schedule.ramping;


                    _(lightFixture.channels).forEach(function (channel) {
                        var value = light.calculateBrightness(channel, lightFixture.lightIntensity, currentTime, onTime, offTime, rampTime);

                        light.sendLightConfigToArduino(app, {'pwmChip': channel.pinsGroup, 'channel': channel.pin, 'value':value});
                    });

                });
            }
        });
    },


    sendLightConfigToArduino: function (app, data) {

        // talk to arduino
//        console.log(data);
        var pwmChannel = (data.pwmChip === 'pwm1') ? '00' : '01';
        app.writeAndDrain('C04|'+pwmChannel+'|'+light.pad(data.channel,2)+'|'+light.pad(data.value,4)+'\n');

    }
};