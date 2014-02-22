function Pachio()
{
    // Members
    var self    = this; // Self-reference

    // Constructor
    self._construct = function _construct()
    {
        console.log("[app] application created");

        // Setup listeners.
        self.setupEventListeners();
    }

    // All the events we'll be listening for are setup here
    self.setupEventListeners = function setupEventListeners()
    {
        $("button#execute").on("click", function()
        {
            // Get random GOETs
            var mood  = get_array_random(_moods);
            var era   = get_array_random(_eras);
            var genre = get_array_random(_genres);

            $("#output").html("Mood = " + mood.text + "<br/>Genre = " + genre.text + "<br/>Era = " + era.text);

            // Construct URL
            var url = "/api.php?mood=" + mood.id + "&genre=" + genre.id + "&era=" + era.id;

            console.log("[pach.io] loading radio data from", url);

            $("#output").append("<br/>Loading...");

            jQuery.ajax(
            {
                async: true,
                type: "GET",
                url: url,
                data: null,
                success: function(data, textStatus, jqxhr)
                {
                    console.log(data);

                    console.log("[pach.io] data retrieved successfully, state updated.");
                    $("#output").append("<br/><br/>" + JSON.stringify(data, undefined, 2));

                    // Trigger the callback
                    if (typeof callback == "function") { callback(); }
                },
                error: function (xhr, textStatus, errorThrown)
                {
                    // Throw to Chrome console, jQuery won't alert as it will catch it itself.
                    console.error("Error from remote server " + url);
                    console.error(errorThrown);

                    // Trigger the callback
                    if (typeof callback == "function") { callback(); }
                }
            });
        });
    }

    self._construct();
}
