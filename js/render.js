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

const promotion_menu = document.querySelector(".promo_menu");
const arr = ["q", "r", "b", "n"];
let promo_row;
let promo_col;
let pawn;

function pawnPromotion(pawn_color, destination) {
    promo_row = +destination[0];
    promo_col = +destination[1];
    pawn = pawn_color;

    for (let i = 0; i < 4; i++) {
        let name = pawn_color + arr[i];
        const box = document.querySelector(`#${arr[i]}`);
        box.classList.add(name);
    }

    promotion_menu.style.left = `${promo_col * 12.5}%`;
    promotion_menu.style.top = "0";

    promotion_menu.classList.add("show");
    chessBoard.removeEventListener("click", handler);
    promotion_menu.addEventListener("click", promotionClick);
}

function promotionClick(e) {
    let promote_to = e.target.classList[1];
    board[promo_row][promo_col] = promote_to;
    
    const box = document.querySelector(`[id="${promo_row}${promo_col}"]`)
    box.classList.remove(`${pawn}p`);
    box.classList.add(promote_to);

    promotion_menu.classList.remove("show");
    promotion_menu.removeEventListener("click", promotionClick);
    for (let i = 0; i < 4; i++) {
        const box = document.querySelector(`#${arr[i]}`);
        box.classList.remove(box.classList[1]);
    }
    chessBoard.addEventListener("click", handler);
}