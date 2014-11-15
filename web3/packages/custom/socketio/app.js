'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Socketio = new Module('socketio');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Socketio.register(function(app, auth, database) {

    console.log('SOCKETS');

  //We enable routing. By default the Package Object is passed to the routes
  Socketio.routes(app, auth, database, Socketio);

  //We are adding a link to the main menu for all authenticated users
  Socketio.menus.add({
    title: 'socketio example page',
    link: 'socketio example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Socketio.aggregateAsset('css', 'socketio.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Socketio.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Socketio.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Socketio.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Socketio;
});
