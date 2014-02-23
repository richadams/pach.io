function Pachio()
{
    // Members
    var self = this; // Self-reference

    self.spinEffect = null; // For the spinning sound effect to maintain state.

    // Constructor
    self._construct = function _construct()
    {
        console.log("[app] application created");

        // Setup page elements
        self.setupElements();

        // Setup listeners.
        self.setupEventListeners();

        // Setup slots
        self.setupSlot("era");
        self.setupSlot("genre");
        self.setupSlot("mood");
    }

    self.setupElements = function()
    {
        // Add spinner elements
        for (var i in _eras)
        {
            var o = _eras[i];
            var text = (JAPAN) ? o.text : o.texten;
            $("#era").append("<li data-id=\"" + o.id + "\">" + text + "</li>");
        }
        for (var i in _genres)
        {
            var o = _genres[i];
            var text = (JAPAN) ? o.text : o.texten;
            $("#genre").append("<li data-id=\"" + o.id + "\">" + text + "</li>");
        }
        for (var i in _moods)
        {
            var o = _moods[i];
            var text = (JAPAN) ? o.text : o.texten;
            $("#mood").append("<li data-id=\"" + o.id + "\">" + text + "</li>");
        }

        // Add spinner icons
        $("#slots ul li").each(function()
        {
            var randomNumber = Math.floor((Math.random()*11)+1); // 1-11
            $(this).prepend("<img class=\"icon\" src=\"/img/slot/" + randomNumber + ".png\" />");
        });
    };

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

                // See if we can trigger a lookup yet.
                self.checkSlotProgress();
            }
        });
    }

    // This checks if we're good to trigger a lookup yet.
    self.checkSlotProgress = function ()
    {
        if ($("#slots").is("[data-chosen-genre]")
            && $("#slots").is("[data-chosen-mood]")
            && $("#slots").is("[data-chosen-era]"))
        {
            // Cancel the sound effect
            self.spinEffect.pause();
            var win = soundEffect("/audio/bigwin.mp3");
            setTimeout(function() { win.pause(); }, 4000);

            self.triggerLookup(
                $("#slots").attr("data-chosen-genre"),
                $("#slots").attr("data-chosen-mood"),
                $("#slots").attr("data-chosen-era")
            );
        }
    }

    // All the events we'll be listening for are setup here
    self.setupEventListeners = function setupEventListeners()
    {
        $("#slots").on("click", function()
        {
            // Slots auto-trigger.
            soundEffect("/audio/lever_pull.mp3");
            setTimeout(function() { self.spinEffect = soundEffect("/audio/spin.mp3"); }, 1500);

            // Set active
            $("#slots").addClass("active");

            // Clean up some other elements.
            $("#playlist").html("");
            $("#spotify").html("");
            $("#slots")
                .removeAttr("data-chosen-genre")
                .removeAttr("data-chosen-mood")
                .removeAttr("data-chosen-era")
        });
    }

    // Trigger a server lookup with a mood, genre and era combo.
    self.triggerLookup = function(genreID, moodID, eraID)
    {
        // Construct URL
        var url = "/api.php?lang=" + PACHIO_LANG
            + "&country=" + PACHIO_COUNTRY
            + "&mood=" + moodID
            + "&genre=" + genreID
            + "&era=" + eraID;

        console.log("[pach.io] loading radio data from", url);

        $(".loading").addClass("active");
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
                    && !isJSON(data)) { alert("Bad response from server :(\nコンピュータから不正な応答 :("); $(".loading").removeClass("active"); }

                // Check status.
                var status = data.RESPONSE[0].STATUS;
                if (status == "NO_MATCH") { alert("No results :(\n何もありません :("); $(".loading").removeClass("active"); }

                // Create track objects
                var tracks = new Array();
                var results = data.RESPONSE[0].ALBUM;
                for (var t in results) { tracks.push(new Track(results[t])); }

                // Create a new playlist object and render it.
                var playlist = new Playlist(tracks);
                playlist.render();

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
