function Pachio()
{
    // Members
    var self = this; // Self-reference

    // Constructor
    self._construct = function _construct()
    {
        console.log("[app] application created");

        // Add spinner icons
        $("#slots ul li").each(function()
        {
            var randomNumber = Math.floor((Math.random()*11)+1); // 1-11
            $(this).prepend("<img class=\"icon\" src=\"/img/slot/" + randomNumber + ".png\" />");
        });

        // Setup listeners.
        self.setupEventListeners();

        // Setup slots
        self.setupSlot("era");
        self.setupSlot("genre");
        self.setupSlot("mood");
    }

    // Setup the slot plugin
    self.setupSlot = function(title)
    {
        var $element = $("#" + title);
        $element.jSlots(
        {
            number: 1,
            spinner: '#slots',
            onEnd: function(finalNumbers)
            {
                var index    = finalNumbers[0];
                var chosenID = $element.find("li").eq(index).attr("data-id");
                $("#slots").attr("data-chosen-" + title, chosenID);
            }
        });
    }

    // All the events we'll be listening for are setup here
    self.setupEventListeners = function setupEventListeners()
    {
        $("#slots").on("click", function()
        {
            // Slots auto-trigger, will take 7s to complete, so trigger our lookup then.

            $("#playlist").html("");
            $("#spotify").html("");

            // TODO: race condition.
            setTimeout(function()
            {
                self.triggerLookup(
                    $("#slots").attr("data-chosen-genre"),
                    $("#slots").attr("data-chosen-mood"),
                    $("#slots").attr("data-chosen-era")
                );
            }, 7000);
            return;
        });
    }

    // Trigger a server lookup with a mood, genre and era combo.
    self.triggerLookup = function(genreID, moodID, eraID)
    {
        // Construct URL
        var url = "/api.php?mood=" + moodID + "&genre=" + genreID + "&era=" + eraID;

        console.log("[pach.io] loading radio data from", url);

        $("#loading").addClass("active");
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
    }

    self._construct();
}
