<?php
// Simple class to handle HTTP comms.

class HTTP
{
    // Members
    private $_url;       // URL to send the request to.
    private $_ch = null; // cURL handle

    // Ctor
    public function __construct($url)
    {
        $this->_url = $url;

        // Prepare the cURL handle.
        $this->_ch = curl_init();

        // Set connection options.
        curl_setopt($this->_ch, CURLOPT_URL,            $this->_url); // API URL
        curl_setopt($this->_ch, CURLOPT_USERAGENT,      "pach.io");   // Set our user agent
        curl_setopt($this->_ch, CURLOPT_FAILONERROR,    true);        // Fail on error response.
        curl_setopt($this->_ch, CURLOPT_FOLLOWLOCATION, true);        // Follow any redirects
        curl_setopt($this->_ch, CURLOPT_RETURNTRANSFER, true);        // Put the response into a variable instead of printing.
        curl_setopt($this->_ch, CURLOPT_TIMEOUT_MS,     "10000");     // Don't want to hang around forever.
    }

    // Dtor
    public function __destruct()
    {
        if ($this->_ch != null) { curl_close($this->_ch); }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Perform a GET request.
    public function get()
    {
        $response = null;
        try
        {
            // Execute the request
            $response = curl_exec($this->_ch);
        }
        catch (Exception $e)
        {
            die('{"RESPONSE":[{"STATUS":"KO","ERROR":"Request error."}]}');
        }

        // Validate the response.
        $curl_error = curl_errno($this->_ch);
        if ($curl_error !== CURLE_OK)
        {
            // Timeout
            if ($curl_error === CURLE_OPERATION_TIMEOUTED) { die('{"RESPONSE":[{"STATUS":"KO","ERROR":"Timeout"}]}'); }

            // All other errors.
            die('{"RESPONSE":[{"STATUS":"KO","ERROR":"Curl Error '.$curl_error.'"}]}');
        }

        return $response;
    }
}
