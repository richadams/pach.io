<?php
// Need to proxy request to GN so we don't expose credentials in the JS application.

// Bootstrap the application.
define("APP_PREFIX", "../");
require_once(APP_PREFIX."inc/bootstrap.php");

// Parse user inputs, convert to integers.
$_mood  = intval($_GET['mood']);
$_genre = intval($_GET['genre']);
$_era   = intval($_GET['era']);

// Get localization inputs.
$_lang    = (isset($_GET['lang'])    ? mb_substr(strtolower($_GET['lang']), 0, 3)    : "eng");
$_country = (isset($_GET['country']) ? mb_substr(strtolower($_GET['country']), 0, 3) : "usa");

// Perform GN request.
$radio   = new GracenoteRhythm();
$station = $radio->getStation($_genre, $_mood, $_era, $_country, $_lang);

// Dump raw output back to the user.
header("Content-Type: application/json");
echo $station;
