// Bootstrap script. Only this script needs to be included on the page (along with any libs). This
// can take care of including the rest of the required files.

// A helper function to include additional JavaScript files. (Note: blocks).
function include(script)
{
    script = "./js" + "/" + script;

    // Can use $.getScript, but that's asynchronous, and I need to load these *synchonrously*.
    jQuery.ajax(
    {
        async: false,
        type: "GET",
        url: script,
        data: null,
        success: function(data, textStatus, jqxhr)
        {
            console.log("[include] " + script + " loaded.");
        },
        error: function (xhr, textStatus, errorThrown)
        {
            // Throw to Chrome console, jQuery won't alert as it will catch it itself.
            console.log("error in include file: " + script);
            console.error(errorThrown);
        },
        dataType: "script"
    });
}

// Call this to start the application.
function bootstrap()
{
    console.log("[boot] bootstrapping...");
    include("init.js");
}

// For debugging, override jquery errors so they show in the chrome debugger.
jQuery.error = console.error;
