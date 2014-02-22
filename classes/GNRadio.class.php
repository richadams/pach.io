<?php

class GNRadio
{
    // Members
    var $_apiURL = "https://c[clid].web.cddbp.net/webapi/json/1.0/radio/create?genre=[genre]&mood=[mood]&era=[era]&client=[client]&user=[user]";

    // Constructor
    public function __construct()
    {
        global $_CONFIG;
        $this->_apiURL = str_replace("[clid]",   $_CONFIG['gn_client_id'], $this->_apiURL);
        $this->_apiURL = str_replace("[client]", $_CONFIG['gn_client'],    $this->_apiURL);
        $this->_apiURL = str_replace("[user]",   $_CONFIG['gn_user_id'],   $this->_apiURL);
    }

    // Retrieve the radio station data
    // NOTE: Assume inputs are validated
    public function getStation($genre, $mood, $era)
    {
        $url = str_replace("[mood]",  $mood,  $this->_apiURL);
        $url = str_replace("[genre]", $genre, $url);
        $url = str_replace("[era]",   $era,   $url);

        // Perform the request
        return $this->execute($url);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Execute service request.
    protected function execute($url)
    {
        $http     = new HTTP($url);
        $response = $http->get();

        // Don't bother validating response, just pass it through.
        return $response;

        /*$this->validateResponse($response);

        // It's all good if we get to here.
        $decode = json_decode($response, true);
        return $decode;*/
    }

    // This will validate the response from EDAS and throw an exception if it's bad in any way.
    /*protected function validateResponse($response)
    {
        // Attempt to JSON decode
        $decoded = json_decode($response, true);
        if ($response === false) { die("invalid json"); }
    }*/
};
