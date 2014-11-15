'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Nodarium = new Module('nodarium');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Nodarium.register(function (system, app, auth, database) {

    app.set('views', __dirname + '/server/views');

    //We enable routing. By default the Package Object is passed to the routes
    Nodarium.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Nodarium.menus.add({
        title: 'nodarium example page',
        link: 'nodarium example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    Nodarium.aggregateAsset('css', 'nodarium.css');

    /**
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Nodarium.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Nodarium.settings({
        'anotherSettings': 'some value'
    });

     // Get settings. Retrieves latest saved settigns
     Nodarium.settings(function(err, settings) {
        //you now have the settings object
    });
     */

    return Nodarium;
});
