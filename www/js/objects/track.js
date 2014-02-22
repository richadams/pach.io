function Track(data)
{
    // Members
    var self   = this; // Self-reference

    // Only care about these properties for now.
    self.hash  = null;
    self.data  = null;

    // Constructor
    self._construct = function _construct(data)
    {
        self.data = data;
        self.hash = $.md5(self.data.TITLE[0].VALUE + "##" + self.data.ARTIST[0].VALUE);
    }

    // Getters
    self.getTitle  = function() { return self.data.TITLE[0].VALUE; }
    self.getArtist = function() { return self.data.ARTIST[0].VALUE; }
    self.getHash   = function() { return self.hash; }

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
