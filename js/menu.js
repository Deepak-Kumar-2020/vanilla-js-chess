const startMenu = document.querySelector("#startMenu");
const gameArea = document.querySelector("#gameArea");
const gameOverScreen = document.querySelector("#gameOverScreen");

const timeButtons = document.querySelectorAll(".time-btn");
let selectedTime = "10";

const whiteClock = document.getElementById("white-clock");
const blackClock = document.getElementById("black-clock");

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

    document.querySelector("#white-name").textContent = whitePlayerName;
    document.querySelector("#black-name").textContent = blackPlayerName;

    if (selectedTime != "unlimited") {
        setPlayerTime(selectedTime);
        whiteClock.textContent = String(selectedTime).padStart(2, "0") + ":" + "00";
        blackClock.textContent = String(selectedTime).padStart(2, "0") + ":" + "00";
    }
    else {
        whiteClock.textContent = "";
        blackClock.textContent = "";
    }

    setup_state();
    render_board();
    chessBoard.addEventListener("click", handler);
}

const winnerIcon = document.querySelector("#winnerIcon");
const gameOverTitle = document.querySelector("#gameOverTitle");
const gameOverMessage = document.querySelector("#gameOverMessage");

function gameOver(cause, loser) {
    gameEnded = true;
    render_board();
    chessBoard.removeEventListener("click", handler);
    clearInterval(timeIntervalID);

    let winner = loser == 'w' ? `${blackPlayerName}` : `${whitePlayerName}`;
    if (cause == 0) {
        document.getElementById(king_location).classList.add("stalemate");
        winnerIcon.textContent = "🤝";
        gameOverTitle.textContent = "Stalemate!";
        gameOverMessage.textContent = "Draw by stalemate";
    }

    else if (cause == 1) {
        document.getElementById(king_location).classList.add("defeated");
        gameOverMessage.textContent = `${winner} wins by checkmate`;
    }

    else if (cause == 2) {
        document.getElementById(king_location).classList.add("defeated");
        winnerIcon.textContent = "⏱️";
        gameOverTitle.textContent = "Time Out!";
        gameOverMessage.textContent = "Draw by stalemate"
        gameOverMessage.textContent = `${winner} wins on time`;
    }

    setTimeout(() => {
        gameArea.classList.add("hidden");
        gameOverScreen.classList.remove("hidden");
    }, 3000);
    
}

const newGameBtn = document.querySelector("#newGameBtn");
newGameBtn.addEventListener("click", newGame)

function newGame() {
    startMenu.classList.toggle("hidden");
    gameOverScreen.classList.toggle("hidden");
}