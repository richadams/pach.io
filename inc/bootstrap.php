<?php
// This is the primary entry point for all requests.

////////////////////////////////////////////////////////////////////////////////////////////////////
// Define parameters

// Default values for prefixes.
if (!defined("APP_PREFIX")) { define("APP_PREFIX", "../"); }

////////////////////////////////////////////////////////////////////////////////////////////////////
// Adjust PHP configuration

// Force the timezone to UTC.
date_default_timezone_set("UTC");

// Increase PHP's default memory allowance to 256MB
ini_set("memory_limit", "256M");

////////////////////////////////////////////////////////////////////////////////////////////////////
// Include all dependencies (order is important!)

// Load common functions
include_once(APP_PREFIX."inc/functions.php");

// Load other classes.
loadFiles(APP_PREFIX."classes");

// Load lookups
loadFiles(APP_PREFIX."lookups");

// Load configuration
include_once(APP_PREFIX."config/config.php");
