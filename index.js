// # Ghost Startup
// Orchestrates the startup of Ghost when run from command line.
var express,
    ghost,
    parentApp,
    errors;

// Make sure dependencies are installed and file system permissions are correct.
require('./core/server/utils/startup-check').check();

// Proceed with startup
express = require('express');
ghost = require('./core');
errors = require('./core/server/errors');

/** own api **/
var plugins = [require('./plugins/post'), require('./plugins/location'), require('./plugins/blog')];

// Create our parent express app instance.
parentApp = express();

// Call Ghost to get an instance of GhostServer
ghost().then(function (ghostServer) {
	plugins.forEach(function(plugin){
		plugin.mount(parentApp);
	});

    // Mount our Ghost instance on our desired subdirectory path if it exists.
    parentApp.use(ghostServer.config.paths.subdir, ghostServer.rootApp);

    // Let Ghost handle starting our server instance.
    ghostServer.start(parentApp);
}).catch(function (err) {
    errors.logErrorAndExit(err, err.context, err.help);
});
