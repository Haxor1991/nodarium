'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Arduino = new Module('Arduino');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Arduino.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Arduino.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
//    Arduino.menus.add({
//        title: 'arduino example page',
//        link: 'arduino example page',
//        roles: ['authenticated'],
//        menu: 'main'
//    });

    /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Arduino.settings({
	'someSetting': 'some value'
    }, function(err, settings) {
	//you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Arduino.settings({
	'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Arduino.settings(function(err, settings) {
	//you now have the settings object
    });
    */

    return Arduino;
});
