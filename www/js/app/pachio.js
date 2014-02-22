function Pachio()
{
    // Members
    var self = this; // Self-reference

    // Constructor
    self._construct = function _construct()
    {
        console.log("[app] application created");

        self.setupEventListeners();
    }

    // All the events we'll be listening for are setup here
    self.setupEventListeners = function setupEventListeners()
    {
        $("button#execute").on("click", function()
        {
            self.getRandomValues();
        });
    }

    // Get a random genre, mood and era
    self.getRandomValues = function getRandomValues()
    {
        var mood  = get_array_random(_moods);
        var era   = get_array_random(_eras);
        var genre = get_array_random(_genres);

        $("#output").html("Mood = " + mood.text + "<br/>Genre = " + genre.text + "<br/>Era = " + era.text);
    }

    self._construct();
}
