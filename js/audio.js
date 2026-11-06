const sounds = {
    move: new Audio("./assets/sounds/move.mp3"),
    capture: new Audio("./assets/sounds/capture.mp3"),
    castle: new Audio("./assets/sounds/castle.mp3"),
    check: new Audio("./assets/sounds/check.mp3"),
    promote: new Audio("./assets/sounds/promote.mp3"),
    gameOver: new Audio("./assets/sounds/game-over.mp3"),
    lowtime: new Audio("./assets/sounds/lowtime.mp3")
};

// Preload sounds
Object.values(sounds).forEach(sound => {
    sound.preload = "auto";
});

function playSound(name) {
    const current = sounds[name];
    current.currentTime = 0;
    current.play();
}