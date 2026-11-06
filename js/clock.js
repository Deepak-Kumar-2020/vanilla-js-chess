let whiteEndTime;
let blackEndTime;
let remainingWhite;
let remainingBlack;
let timeIntervalID = null;
let increament = 0;
let soundPlayedBlack = false;
let soundPlayedWhite = false;

function setPlayerTime(chosenTime) {
    if (chosenTime == 15) increament = 5000;
    remainingWhite = chosenTime * 60000;
    remainingBlack = chosenTime * 60000;
}

function startClock() {
    whiteEndTime = Date.now() + remainingWhite;
    timeIntervalID = setInterval(() => {
        if (turn == 'w') whiteClock.textContent = time(whiteEndTime);
        else blackClock.textContent = time(blackEndTime);
    }, 50);
}

function time(endTime) {
    let remaining = endTime - Date.now();
    if (remaining <= 0) {
        playSound("gameOver");
        gameOver(2, turn);
    }

    let timer = Math.max(remaining, 0);

    const minutes = Math.floor(timer/(1000*60));
    timer %= 1000*60;

    const secs = Math.floor(timer/1000);
    timer %= 1000;

    timer = Math.floor(timer/10);

    if (remaining <= 20000) {
        if (turn === 'w' && !soundPlayedWhite) {
            soundPlayedWhite = true;
            playSound("lowtime");
        }
        else if (turn === 'b' && !soundPlayedBlack) {
            soundPlayedBlack = true;
            playSound("lowtime");
        }

        return (String(minutes).padStart(2, "0") + ":" + 
                String(secs).padStart(2, "0") + "." + 
                String(timer).padStart(2, "0"));
    }
    return String(minutes).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
}

function toggleClock() {
    let current = Date.now();
    if (turn == 'w') {
        remainingWhite = whiteEndTime - current + increament;
        whiteClock.textContent = time(current + remainingWhite)

        blackEndTime = current + remainingBlack;
    }
    else {
        remainingBlack = blackEndTime - current + increament;
        blackClock.textContent = time(current + remainingBlack);

        whiteEndTime = current + remainingWhite;
    } 
}