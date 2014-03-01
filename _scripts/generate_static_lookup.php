<?php
// Bootstrap the application
define("APP_PREFIX", "../");
require_once(APP_PREFIX."inc/bootstrap.php");

// Retrieve data.
$rhythm = new GracenoteRhythm();
$dataEn = $rhythm->getMoods("usa", "eng");
$dataJp = $rhythm->getMoods("usa", "jpn");
//$dataEn = $rhythm->getEras("usa", "eng");
//$dataJp = $rhythm->getEras("usa", "jpn");
//$dataEn = $rhythm->getGenres("usa", "eng");
//$dataJp = $rhythm->getGenres("usa", "jpn");
//$dataEn = $rhythm->getGenres("jpn", "eng");
//$dataJp = $rhythm->getGenres("jpn", "jpn");

// Decode into array
$jsonEn = json_decode($dataEn, true);
$jsonJp = json_decode($dataJp, true);

// Validate response
if ($jsonEn === false || $jsonJp === false) { die("Unable to decode response from server."); }
if ($jsonEn["RESPONSE"][0]["STATUS"] !== "OK" || $jsonJp["RESPONSE"][0]["STATUS"] !== "OK") { die("Server gave non-OK response."); }

// Data is always in the second element.
$fieldsEn = current(array_slice($jsonEn["RESPONSE"][0], 1, 1));
$fieldsJp = current(array_slice($jsonJp["RESPONSE"][0], 1, 1));

// If we get to here, we're good.
foreach ($fieldsEn as $fieldEn)
{
    // This is a shitty way to find the Japanese text, but don't care about performance for this.
    $japanese = "";
    foreach ($fieldsJp as $fieldJp)
    {
        if ($fieldJp["ID"] == $fieldEn["ID"])
        {
            $japanese = $fieldJp["VALUE"];
            break;
        }
    }

    echo "{id:".$fieldEn["ID"].","
        ."text:\"".$japanese."\","
        ."texten:\"".$fieldEn["VALUE"]."\""
        ."},\n";
}
