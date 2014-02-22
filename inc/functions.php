<?php
// Misc functions which can be used globally by the application

////////////////////////////////////////////////////////////////////////////////////////////////////

// Construct a key=valuue string from a (potentially nested) associative array
function keyValueString($input)
{
    $output = "";
    foreach ((array)$input as $key => $value)
    {
        // Some inputs are nested, so recurse.
        if (is_array($value) || is_object($value))
        {
            $output .= $key."=(".keyValueString($value)."), ";
        }
        // Otherwise just add it.
        else
        {
            $output .= $key."={".$value."}, ";
        }
    }
    return substr($output, 0, -2);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

// Includes a file, but only if it actually exists
function include_if_exists($file)
{
    if (file_exists($file)) { include_once($file); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

// When we don't want to show the entire string in a log, but still want the first few chars.
function firstFew($string)
{
    return substr($string, 0, 5)."...";
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function loadFiles($location, $skip = array())
{
    if (!file_exists($location)) return;

    $subdirs = array();
    if ($handle = opendir($location))
    {
        while (false !== ($file = readdir($handle)))
        {
            if (!preg_match('/^[.]/',$file)
                && !preg_match('/~$/',$file)
                && !in_array($file, $skip))
            {
                // If a directory, keep track so we can load them later.
                if (is_dir($location."/".$file))
                {
                    $subdirs[] = $location."/".$file;
                }

                // If it's a class, include it.
                if (strpos($file, "class.php") !== false)
                {
                    include_once($location."/".$file);
                }

                // If it's an include, include it.
                if (strpos($file, "inc.php") !== false)
                {
                    include_once($location."/".$file);
                }
            }
        }
        closedir($handle);
    }

    // Recursively load from subdirectories
    foreach ($subdirs as $d) { loadClasses($d); }
}
