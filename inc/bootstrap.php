<?php
// Main entry point for all requests.

// Default values for prefix.
if (!defined("APP_PREFIX")) { define("APP_PREFIX", "../"); }

// Force the timezone to UTC.
date_default_timezone_set("UTC");

// This is a hack project, so set all error reporting on for now.
error_reporting(E_ALL & ~E_NOTICE);
ini_set("display_errors", "On");

// Classes
include_once(APP_PREFIX."classes/HTTP.class.php");
include_once(APP_PREFIX."classes/GracenoteRhythm.class.php");

// Configuration
include_once(APP_PREFIX."config/config.php");
