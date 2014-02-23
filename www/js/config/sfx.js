var EFFECTS = {
    PULL:"/audio/pull.m4a",
    SPIN:"/audio/spin.m4a",
    WIN:"/audio/win.m4a"
}

// Preload
var SFX_AUDIO = [];
SFX_AUDIO[EFFECTS.PULL] = new Audio(EFFECTS.PULL);
SFX_AUDIO[EFFECTS.SPIN] = new Audio(EFFECTS.SPIN);
SFX_AUDIO[EFFECTS.WIN]  = new Audio(EFFECTS.WIN);

// Helper for sound effects.
function soundEffect(file)
{
    SFX_AUDIO[file].play();
    return SFX_AUDIO[file];
}

bg = new Audio("/audio/bgnoise.m4a");
bg.loop = true;
bg.volume = 50;
bg.play();
