// Configuration for the application

// Get window hash values properly.
var hashString = window.location.hash.substring(1); // Remove "#" from beginning.
var hashValues = hashString.split(","); // Split up the string using commas.

// Flags
var JAPAN  = (hashValues.indexOf("japan") !== -1); // Flag to enable japanese mode

// Print out some logging information
if (JAPAN)  { console.log("** JAPAN MODE ENABLED **"); }

var PACHIO_LANG    = (JAPAN) ? "jpn" : "eng";
var PACHIO_COUNTRY = (JAPAN) ? "jpn" : "usa";

// Switch genres if in JAPAN
if (JAPAN) { _genres = _genres_japan; }
