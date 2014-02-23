// Gracenote SF
// @author Rich Adams <rich@gravitymobile.com>

// OBJECT PROCESSING
////////////////////////////////////////////////////////////////////////////////////////////////////

// Associative arrays can't use .length as it will always be 0, need to create a size method.
Array.size = function(arr)
{
    var size = 0, key;
    for (key in arr) { if (arr.hasOwnProperty(key)) size++; }
    return size;
};

// Retrieve from an associative array using a numerical index.
// Potentially dangerous, is order of associated array guraranteed? I suspect not.
Array.get = function(arr, index)
{
    var count = 0;
    for (var key in arr)
    {
        if (count == index) { return arr[key]; }
        count++;
    }
    return false;
}

// Get a random item from an array
Array.getrand = function(arr)
{
    return arr.get(Math.floor(Math.random()*arr.length));
}

// Randomises the contents of a non-associative array using a Knuth/Fischer/Yates shuffle.
Array.randomise = function(arr)
{
    var i = arr.length;
    if (i == 0) return false; // Sanity check.
    while (--i)
    {
        var j = Math.floor(Math.random()*(i+1));
        var tempi = arr[i];
        var tempj = arr[j];
        arr[i] = tempj;
        arr[j] = tempi;
    }
}

// Randomises an associative array.
// TODO this is a shit implementation, I need to speed this mofo up.
Array.arandomise = function(arr)
{
    var size = Array.size(arr);
    var i = size;
    if (i == 0) return false; // Sanity check.

    var vals = new Array();
    var keys = new Array();
    for (var a in arr) { keys.push(a); vals.push(arr[a]); }

    while (--i)
    {
        var j = Math.floor(Math.random()*(i+1));
        var tempki = keys[i];
        var tempkj = keys[j];
        var tempvi = vals[i];
        var tempvj = vals[j];
        keys[i] = tempkj;
        keys[j] = tempki;
        vals[i] = tempvj;
        vals[j] = tempvi;
    }

    // Now reconstruct the associative array.
    var result = new Array();
    for (var i = 0; i < size; i++)
    {
        result[keys[i]] = vals[i];
    }

    return result;
}

// Grab a random item from an array
function get_array_random(arr)
{
    return arr[Math.floor(Math.random()*arr.length)];
}

// Equivilent to PHP's in_array method.
function in_array(needle, haystack)
{
    for (var k in haystack)
    {
        if (needle == haystack[k]) return true;
    }
    return false;
}

// Same as above, but checks the IDs of the track, not that they're exactly the same object.
function in_array_track(needle, haystack)
{
    for (var k in haystack)
    {
        if (needle.id == haystack[k].id) return true;
    }
    return false;
}

// STRING FORMATTING
////////////////////////////////////////////////////////////////////////////////////////////////////

// A function to format a number of seconds into "0:00" format
function formatTime(seconds)
{
    var mins = Math.floor(seconds / 60);
    var secs = seconds - (Math.floor(seconds / 60) * 60); if (secs < 10) { secs = "0" + secs; }
    return "" + mins + ":" + secs;
};

// MATHS
////////////////////////////////////////////////////////////////////////////////////////////////////

// Gives a random integer between the two values.
// Note: Using Math.round() will give a non-uniform distribution!
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Used to generate a unique identifier for devices.
function generateIdentifier() { return randomFourChars() + randomFourChars(); }
function randomFourChars()
{
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// Use base 10 log
function log10(val)
{
    return Math.log(val) / Math.log(10);
}



// Misc

function isJSON(str)
{
    try
    {
        JSON.parse(str);
    }
    catch (e)
    {
        return false;
    }
    return true;
}

function showError(msg)
{
    $("#error")
        .html("<p>" + msg + "</p>")
        .addClass("active");
    setTimeout(function() { $("#error").removeClass("active"); }, 3000);
}

function localText(array, id)
{
    for (var i in array)
    {
        if (array[i].id == id)
        {
            if (JAPAN) { return array[i].text; }
            return array[i].texten;
        }
    }
    return "";
}
