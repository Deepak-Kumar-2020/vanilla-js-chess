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