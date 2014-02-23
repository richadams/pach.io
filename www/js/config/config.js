// Configuration for the application

// Get window hash values properly.
var hashString = window.location.hash.substring(1); // Remove "#" from beginning.
var hashValues = hashString.split(","); // Split up the string using commas.

// Flags
var ENGLISH = (hashValues.indexOf("english") !== -1); // Flag to enable japanese mode
var JAPAN = !ENGLISH;

// Print out some logging information
if (ENGLISH)  { console.log("** ENGLISH MODE ENABLED **"); }

var PACHIO_LANG    = (JAPAN) ? "jpn" : "eng";
var PACHIO_COUNTRY = (JAPAN) ? "jpn" : "usa";

// Switch genres if in JAPAN
if (JAPAN) { _genres = _genres_japan; }
