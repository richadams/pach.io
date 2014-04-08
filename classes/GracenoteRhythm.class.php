<?php

class GracenoteRhythm
{
    // Members
    var $_apiBase    = "https://c[clid].web.cddbp.net/webapi/json/1.0/radio/";
    var $_apiCreate  = "create?country=[country]&lang=[lang]&return_count=[count]&select_extended=cover,link&genre=[genre]&mood=[mood]&era=[era]&client=[client]&user=[user]";
    var $_apiFields  = "fieldvalues?country=[country]&lang=[lang]&fieldname=[fieldname]&client=[client]&user=[user]";

    // Constructor
    public function __construct()
    {
        global $_CONFIG;
        // Set the base URL properly.
        $this->_apiBase = str_replace("[clid]", $_CONFIG['gn_client_id'], $this->_apiBase);
    }

    // Create a radio station with the defined parameters, and return the station data.
    // Note: Assumes validated/sanitized inputs.
    public function getStation($genre, $mood, $era, $country = "usa", $lang = "eng")
    {
        global $_CONFIG;

        // Base URL for create call.
        $url = $this->_apiBase . $this->_apiCreate;

        // Do replacements.
        $url = str_replace("[mood]",    $mood,    $url);
        $url = str_replace("[genre]",   $genre,   $url);
        $url = str_replace("[era]",     $era,     $url);
        $url = str_replace("[country]", $country, $url);
        $url = str_replace("[lang]",    $lang,    $url);
        $url = str_replace("[count]",   $_CONFIG['pachio_result_count'], $url);

        // Perform the request
        return $this->execute($url);
    }

    // Retrieve static lookups.
    // Note: Assumes validated/sanitized inputs.
    protected function getFieldNames($fieldname, $country = "usa", $lang = "eng")
    {
        global $_CONFIG;

        // Base URL for create call.
        $url = $this->_apiBase . $this->_apiFields;

        // Do replacements.
        $url = str_replace("[fieldname]", $fieldname, $url);
        $url = str_replace("[country]",   $country,   $url);
        $url = str_replace("[lang]",      $lang,      $url);

        // Perform the request
        return $this->execute($url);
    }

    // Wrappers to get static field lookups for mood, era, genre, etc.
    public function getMoods($country = "usa", $lang = "eng")
    {
        return $this->getFieldNames("RADIOMOOD", $country, $lang);
    }
    public function getGenres($country = "usa", $lang = "eng")
    {
        return $this->getFieldNames("RADIOGENRE", $country, $lang);
    }
    public function getEras($country = "usa", $lang = "eng")
    {
        return $this->getFieldNames("RADIOERA", $country, $lang);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Execute service request.
    protected function execute($url)
    {
        // Do common replacements
        global $_CONFIG;
        $url = str_replace("[client]",  $_CONFIG['gn_client'],  $url);
        $url = str_replace("[user]",    $_CONFIG['gn_user_id'], $url);

        $http     = new HTTP($url);
        $response = $http->get();

        // Don't bother validating response, just pass it through.
        return $response;
    }
};
