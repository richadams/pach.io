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

// Text replacements
var TWEET_TEMPLATE = (JAPAN) ? "[mood]と[genre]はミュージックPACHI.IOが聞いている。おまかせ検索!"
                             : "I'm listening to [mood] [genre] from the [era] station on pach.io. See what radio station you get!";
var TWEET_SHARE    = (JAPAN) ? "ツイート"
                             : "Share";

var INSTRUCTIONS = (JAPAN) ? "▲ こちらをクリックしてください。おまかせ検索!"
                           : "▲ Click here to start.";

$("#instructions").html(INSTRUCTIONS);
$("#share-twitter span.twCount").html(TWEET_SHARE);

