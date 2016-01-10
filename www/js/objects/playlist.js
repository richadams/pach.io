function Playlist(data)
{
    // Members
    var self   = this; // Self-reference

    var tracks = null; // Array of track objects that are in this playlist.

    // Constructor
    self._construct = function _construct(data)
    {
        console.log("[playlist] created");
        self.tracks = data;

        self.setupEventHandlers();
    }

    // Custom event handlers
    self.setupEventHandlers = function()
    {
        $("#playlist").on("spotify", function()
        {
            // Check if we're good to render spotify yet.
            var spotifyOK = true;
            for (var i in self.tracks)
            {
                if (!self.tracks[i].spotifyDone) { spotifyOK = false; break; }
            }

            if (spotifyOK)
            {
                console.log("[playlist] spotify data retrieved, rendering spotify...");
                self.renderSpotify();
            }
        });

        $("#playlist").on("youtube", function()
        {
            // Check if we're good to render youtube yet.
            var youtubeOK = true;
            for (var i in self.tracks)
            {
                if (!self.tracks[i].youtubeDone) { youtubeOK = false; break; }
            }

            if (youtubeOK)
            {
                console.log("[playlist] spotify data retrieved, rendering spotify...");
                self.renderYouTube();
            }
        });
    }

    // Getters
    self.getTracks = function() { return self.tracks; }

    // Render
    self.render = function()
    {
        console.log("[playlist] rendering...");
        $("#playlist").html("");
        for (var tid in self.tracks)
        {
            var track = self.tracks[tid];
            $("#playlist").append(
                "<li class=\"track\">"
                + track.getArtist() + " - " + track.getTitle()
                + "</li>"
            );
        }
        $("#loading-playlist").removeClass("active");
    };

    // Render spotify playlist
    self.renderSpotify = function()
    {
        $("#spotify").html(
            "<iframe src=\"" + self.generateSpotifyURI() + "\" frameborder=\"0\" width=\"300\" height=\"700\" allowtransparency=\"true\"></iframe>"
        );
        $("#loading-spotify").removeClass("active");
    }

    // Render youTube playlist
    self.renderYouTube = function()
    {
        $("#youtube").html(
            "<iframe src=\"" + self.generateYouTubeURI() + "\" frameborder=\"0\" width=\"300\" height=\"380\"></iframe>"
        );
        $("#loading-youtube").removeClass("active");
    }

    // Generate the spotify playlist URI
    self.generateSpotifyURI = function()
    {
        var url = "https://embed.spotify.com/?uri=spotify:trackset:パチラジオ:";
        for (var i in self.tracks) { url = url + self.tracks[i].getSpotifyID() + ","; }
        return url.substring(0, url.length - 1); // Remove final ","
    }

    // Generate the youtube playlist URI
    self.generateYouTubeURI = function()
    {
        var url = "https://www.youtube.com/embed/" + self.tracks[0].getYouTubeID() + "?rel=0&showinfo=1&playlist=";
        var skip = true;
        for (var i in self.tracks)
        {
            if (skip) { skip = false; continue; }
            url = url + self.tracks[i].getYouTubeID() + ",";
        }
        return url.substring(0, url.length - 1); // Remove final ","
    }

    self._construct(data);
}
