function Track(data)
{
    // Members
    var self   = this; // Self-reference

    // Only care about these properties for now.
    self.hash        = null;
    self.data        = null;
    self.spotifyID   = null;
    self.spotifyDone = false; // True if we're done the spotify lookup.

    // Constructor
    self._construct = function _construct(data)
    {
        self.data = data;
        self.hash = $.md5(self.getTitle() + "##" + self.getArtist());

        // Try to acquire the spotify ID.
        self.lookupSpotifyIdentifier();
    }

    // Getters
    self.getTitle       = function() { return self.data.TRACK[0].TITLE[0].VALUE; }
    self.getAlbum       = function() { return self.data.TITLE[0].VALUE; }
    self.getAlbumArtist = function() { return self.data.ARTIST[0].VALUE; }
    self.getSpotifyID   = function() { return self.spotifyID; }
    self.getHash        = function() { return self.hash; }

    // Track might have an artist, use that if so, otherwise same as album.
    self.getArtist      = function()
    {
        if (typeof self.data.TRACK[0].ARTIST != "undefined")
        {
            return self.data.TRACK[0].ARTIST[0].VALUE;
        }
        return self.getAlbumArtist();
    }

    // Make a best effort to get the Spotify ID.
    self.lookupSpotifyIdentifier = function()
    {
        var url = "https://ws.spotify.com/search/1/track.json?q=" + self.getArtist() + " " + self.getTitle();
        jQuery.ajax(
        {
            async: true,
            type: "GET",
            url: url,
            data: null,
            success: function(data, textStatus, jqxhr)
            {
                // If we got some tracks back
                if (data.tracks.length > 0)
                {
                    // Assume first track is best match.. for now.
                    self.spotifyID = data.tracks[0].href.replace("spotify:track:", "");
                    console.log("[track] spotify ID = " + self.spotifyID);
                }

                // Notify playlist that we've completed a spotify event.
                self.spotifyDone = true;
                $("#playlist").trigger("spotify");
            },
            error: function (xhr, textStatus, errorThrown)
            {
                // Throw to Chrome console, jQuery won't alert as it will catch it itself.
                console.error("Error from remote server " + url);
                console.error(errorThrown);
                self.spotifyDone = true; // Don't care about errors.
            }
        });
    }

    // Need to account for no album art, as server will not return the data, grr.
    self.getArt = function()
    {
        if (typeof self.data.albumart == "undefined") { return ""; }
        return self.data.albumart;
    }

    // Is this track object equal to another track object.
    self.equals = function(track)
    {
        // Can use the hash to determine uniqueness.
        if (track == null || typeof track == "undefined") { return false; }
        return (self.hash == track.hash);
    }

    self._construct(data);
}
