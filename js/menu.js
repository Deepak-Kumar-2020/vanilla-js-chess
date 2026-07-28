const startMenu = document.querySelector("#startMenu");
const gameArea = document.querySelector("#gameArea");
const gameOverScreen = document.querySelector("#gameOverScreen");

const whiteClock = document.getElementById("white-clock");
const blackClock = document.getElementById("black-clock");

const timeButtons = document.querySelectorAll(".time-btn");
let selectedTime = "10";

let whitePlayerName;
let blackPlayerName;

timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        timeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedTime = btn.getAttribute("data-time");
    });
});

const startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", startGame);

function startGame() {
    startMenu.classList.toggle("hidden");
    gameArea.classList.toggle("hidden");

    whitePlayerName = document.querySelector("#player1").value;
    blackPlayerName = document.querySelector("#player2").value;

    document.querySelector("#white-name").textContent = whitePlayerName ? whitePlayerName : "White";
    document.querySelector("#black-name").textContent = blackPlayerName ? blackPlayerName : "Black";

    if (selectedTime != "unlimited") {
        setPlayerTime(selectedTime);
        whiteClock.textContent = String(selectedTime).padStart(2, "0") + ":" + "00";
        blackClock.textContent = String(selectedTime).padStart(2, "0") + ":" + "00";
    }

    setup_state();
    render_board();
}

const winnerIcon = document.querySelector("#winnerIcon");
const gameOverTitle = document.querySelector("#gameOverTitle");
const gameOverMessage = document.querySelector("#gameOverMessage");

function gameOver(cause, loser) {
    clearInterval(timeIntervalID);

    document.getElementById(king_location).classList.add("checkmate");
    let winner = loser == 'w' ? `${blackPlayerName}` : `${whitePlayerName}`;
    if (cause == 0) {
        winnerIcon.textContent = "🤝";
        gameOverTitle.textContent = "Stalemate!";
        gameOverMessage.textContent = "Draw by stalemate";
        document.getElementById(king_location).classList.add("stalemate");
    }

    else if (cause == 1) {
        gameOverMessage.textContent = `${winner} wins by checkmate`;
        document.getElementById(king_location).classList.add("checkmate");
    }

    else if (cause == 2) {
        winnerIcon.textContent = "⏱️";
        gameOverTitle.textContent = "Time Out!";
        gameOverMessage.textContent = `${winner} wins on time`;
        document.getElementById(king_location).classList.add("checkmate");
    }

    setTimeout(() => {
        gameArea.classList.add("hidden");
        gameOverScreen.classList.remove("hidden");
    }, 1500);
    
}

const newGameBtn = document.querySelector("#newGameBtn");
newGameBtn.addEventListener("click", () => {
    startMenu.classList.toggle("hidden");
    gameOverScreen.classList.toggle("hidden");
});