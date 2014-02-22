// Entry point for the application.

// Configuration
include("config/config.js");

// Utility functions
include("utils/utils.js");

// Libs
include("libs/jquery-md5.js");
include("libs/jquery-slots.min.js");
include("libs/jquery-easing.js");

// Lookups
include("lookups/eras.js");
include("lookups/moods.js");
include("lookups/genres.js");

// Objects
include("objects/track.js");
include("objects/playlist.js");

// Application
include("app/pachio.js");

// Init the application
var APP = null;
$(function() { APP = new Pachio(); });
