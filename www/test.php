<?php

// Bootstrap the application
define("APP_PREFIX", "../");
require_once(APP_PREFIX."inc/bootstrap.php");

foreach ($_RADIO_GENRES as $id)
{
    echo "{id:".$id.",text:\"".$_GN_GENRE_LANG[$id]["JP"]."\"},\n";
}
