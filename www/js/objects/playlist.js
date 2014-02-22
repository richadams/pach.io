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
            console.log(track);
            $("#playlist").append(
                "<li class=\"track\">"
                + track.getArtist() + " - " + track.getTitle()
                + "</li>"
            );
        }
    };

    self._construct(data);
}
