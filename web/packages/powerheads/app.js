'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Powerheads = new Module('Powerheads');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Powerheads.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Powerheads.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Powerheads.menus.add({
        title: 'Powerheads',
        link: 'settings.powerheads',
        roles: ['authenticated'],
        menu: 'settings'
    });

    /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Powerheads.settings({
	'someSetting': 'some value'
    }, function(err, settings) {
	//you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Powerheads.settings({
	'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Powerheads.settings(function(err, settings) {
	//you now have the settings object
    });
    */

    return Powerheads;
});
