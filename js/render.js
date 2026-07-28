const chessBoard = document.querySelector(".chessboard");

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

const promotion_menu = document.querySelector(".promo_menu");
const arr = ["q", "r", "b", "n"];
let promo_row;
let promo_col;
let pawn;

function pawn_promotion(pawn_color, destination) {
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

function en_passant() {
    const previous_pawn = document.getElementById(previous_pawn_move);
    previous_pawn.classList.remove(previous_pawn.classList[1]);
}

function castle_rook_ui(row, curr_col, dest_col) {
    const curr_rook = document.getElementById(`${row}${curr_col}`);
    const dest_rook = document.getElementById(`${row}${dest_col}`);

    dest_rook.classList.add(curr_rook.classList[1]);
    curr_rook.classList.remove(curr_rook.classList[1]);
}