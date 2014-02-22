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
        $("#slots").on("click", function()
        {
            // Get random GOETs
            var mood  = get_array_random(_moods);
            var era   = get_array_random(_eras);
            var genre = get_array_random(_genres);

            // Update display
            $("#mood").html(mood.text);
            $("#genre").html(genre.text);
            $("#era").html(era.text);

            // Construct URL
            var url = "/api.php?mood=" + mood.id + "&genre=" + genre.id + "&era=" + era.id;

            console.log("[pach.io] loading radio data from", url);

            $("#loading").addClass("active");
            $("#playlist").html("");
            jQuery.ajax(
            {
                async: true,
                type: "GET",
                url: url,
                data: null,
                success: function(data, textStatus, jqxhr)
                {
                    console.log(data);

                    // Check if JSON
                    if (typeof data != "object"
                        && !isJSON(data)) { alert("Bad response from server :("); }

                    // Check status.
                    var status = data.RESPONSE[0].STATUS;
                    if (status == "NO_MATCH") { alert("No results :("); }

                    // Create track objects
                    var tracks = new Array();
                    var results = data.RESPONSE[0].ALBUM;
                    for (var t in results) { tracks.push(new Track(results[t])); }

                    // Create a new playlist object and render it.
                    var playlist = new Playlist(tracks);
                    playlist.render();

                    $("#loading").removeClass("active");

                    console.log("[pach.io] data retrieved successfully, state updated.");

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
