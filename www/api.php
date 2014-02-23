<?php
// Bootstrap the application
define("APP_PREFIX", "../");
require_once(APP_PREFIX."inc/bootstrap.php");

// Parse user inputs
$_mood  = intval($_GET['mood']);
$_genre = intval($_GET['genre']);
$_era   = intval($_GET['era']);

$_lang    = (isset($_GET['lang']) ? $_GET['lang'] : "eng");
$_country = (isset($_GET['country']) ? $_GET['country'] : "usa");

// Perform GN request
$radio   = new GNRadio();
$station = $radio->getStation($_genre, $_mood, $_era, $_country, $_lang);

// Output
header("Content-Type: application/json");
echo $station;
