<?php
// Bootstrap the application
define("APP_PREFIX", "../");
require_once(APP_PREFIX."inc/bootstrap.php");

// Parse user inputs
$_mood  = intval($_GET['mood']);
$_genre = intval($_GET['genre']);
$_era   = intval($_GET['era']);

// Perform GN request
$radio   = new GNRadio();
$station = $radio->getStation($_genre, $_mood, $_era);

// Output
header("Content-Type: application/json");
echo $station;
