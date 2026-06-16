const chessBoard = document.querySelector(".chessboard");

const board = [
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"]
];

for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
        const box = document.createElement("div");
        box.classList.add("pieces");
        if (board[r][c] !== "") {
            box.classList.add(board[r][c]);
        }
        box.id = `${r}${c}`;
        chessBoard.appendChild(box);  
    }
}

let previous = null;
chessBoard.addEventListener('click', (e) => {
    console.log(e.target);

    if (previous == null && e.target.classList.length > 1) {
        previous = e.target;
    }
    
    else if (previous != null) {
        if (e.target.id != previous.id) {
            if (e.target.classList.length == 2) {
                if (e.target.classList[1][0] != previous.classList[1][0]) {
                    board[previous.id[0]][previous.id[1]] = "";
                    board[e.target.id[0]][e.target.id[1]] = previous.classList[1];
                    e.target.classList.remove(e.target.classList[1]);
                    e.target.classList.add(previous.classList[1]);
                    previous.classList.remove(previous.classList[1]);
                    previous = null;
                }

                else previous = e.target;
            }

            else {
                board[previous.id[0]][previous.id[1]] = "";
                board[e.target.id[0]][e.target.id[1]] = previous.classList[1];
                e.target.classList.add(previous.classList[1]);
                previous.classList.remove(previous.classList[1]);
                previous = null;
            }
        }

        else previous = null;
    }
});