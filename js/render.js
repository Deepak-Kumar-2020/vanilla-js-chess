const chessBoard = document.querySelector(".chessboard");
const gameContainer = document.querySelector(".flex-container");
const flipCheckbox = document.getElementById("flipBoardCheck");

const whitePlay = document.getElementById("white-info");
const blackPlay = document.getElementById("black-info");

function render_board() {
    if (!document.getElementById("00")) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const box = document.createElement("div");
                box.id = `${r}${c}`;
                chessBoard.appendChild(box);
            }
        }
    }

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const box = document.getElementById(`${r}${c}`);
            box.className = board[r][c] ? `pieces ${board[r][c]}` : "pieces";
        }
    }
}

function move_suggestions(piece, source) {
    let sourceRow = +source[0];
    let sourceCol = +source[1];
    let color = piece[0];

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let destination = `${row}${col}`;
            
            if (board[row][col][0] == piece[0]) continue;
            if (!valid_move(piece, source, destination)) continue;

            let temp = board[row][col];
            let capturePossible = (temp !== "");

            board[sourceRow][sourceCol] = "";
            board[row][col] = piece;

            let kingPos = findKing(color);
            let legal = !canAttack(kingPos, color);
            if (legal) {
                const box = document.getElementById(destination);
                if (capturePossible) box.classList.add("capture-suggestion");
                else box.classList.add("moves");
            }

            board[sourceRow][sourceCol] = piece;
            board[row][col] = temp;
        }
    }
}

const promotion_menu = document.querySelector(".promo_menu");
const arr = ["q", "r", "b", "n"];
let promo_row;
let promo_col;
let pawn;

function pawn_promotion(pawn_color, destination) {
    render_board();
    promo_row = +destination[0];
    promo_col = +destination[1];
    pawn = pawn_color;

    for (let i = 0; i < 4; i++) {
        let name = pawn_color + arr[i];
        const box = document.querySelector(`#${arr[i]}`);
        box.classList.add(name);
    }

    promotion_menu.style.left = `${promo_col * 12.5}%`;
    
    if ('w' == turn) promotion_menu.style.top = "0";
    else {
        if (flipCheckbox.checked) promotion_menu.classList.add("black-rotated");
        else promotion_menu.classList.add("rotated");
        promotion_menu.style.top = "50%";
    }

    promotion_menu.classList.add("show");
    chessBoard.removeEventListener("click", handler);
    promotion_menu.addEventListener("click", promotionClick);
}

function promotionClick(e) {
    e.stopPropagation();
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
    promotion_menu.classList.remove("rotated");
    promotion_menu.classList.remove("black-rotated");
    chessBoard.addEventListener("click", handler);
    changeTurn();
}

function en_passant() {
    const previous_pawn = document.getElementById(previous_pawn_move);
    previous_pawn.classList.remove(previous_pawn.classList[1]);
}

function castle_rook_ui(row, sourceCol, dest_col) {
    const curr_rook = document.getElementById(`${row}${sourceCol}`);
    const dest_rook = document.getElementById(`${row}${dest_col}`);

    dest_rook.classList.add(curr_rook.classList[1]);
    curr_rook.classList.remove(curr_rook.classList[1]);
}

function rotate_board() {
    if (flipCheckbox.checked) {
        chessBoard.classList.toggle("rotated");
        gameContainer.classList.toggle("rotated");
    }
}

function changeTurnUI() {
    whitePlay.classList.toggle("play", 'w' === turn);
    blackPlay.classList.toggle("play",  'b' === turn);
}

// function inCheck() {

// }