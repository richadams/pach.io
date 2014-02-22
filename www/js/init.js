// Entry point for the application.

// Utility functions
include("utils/utils.js");

// Lookups
include("lookups/eras.js");
include("lookups/moods.js");
include("lookups/genres.js");

// Application
include("app/pachio.js");

// Init the application
var APP = null;
$(function() { APP = new Pachio(); });
