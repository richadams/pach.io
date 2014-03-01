<?php
// Bootstrap the application
define("APP_PREFIX", "../");
require_once(APP_PREFIX."inc/bootstrap.php");

global $_CONFIG;
$http = new HTTP("https://".$_CONFIG['gn_client_id'].".web.cddbp.net/webapi/json/1.0/register?client=".$_CONFIG['gn_client']);

echo $http->get();
