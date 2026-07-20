let turn = 'w';
let previous = null;
let king_location = null;
let kingInCheck = false;

let br_left = true;
let br_right = true;
let bk_first_move = true;

let wr_left = true;
let wr_right = true;
let wk_first_move = true;

let previous_pawn_move = null;
let previous_pawn_color = null;

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

function update_state(piece, current, destination) {
    let curr_row = +current[0], trow = curr_row;
    let curr_col = +current[1], tcol = curr_col;

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    let color = piece[0];

    if (piece[1] == 'r') {
        if (curr_row == 0) {
            if (curr_col == 0) br_left = false;
            else if (curr_col == 7) br_right = false;
        }

        if (curr_row == 7) {
            if (curr_col == 0) wr_left = false;
            else if (curr_col == 7) wr_right = false;
        }
    }

    else if (piece[1] == 'k') {
        if (curr_row == dest_row) {        
            if (curr_col + 2 == dest_col) {
                update_state_castle(curr_row, 7, dest_col, 1);
                castle_rook_ui (curr_row, 7, dest_col - 1);

            }
            else if (curr_col - 2 == dest_col) {
                update_state_castle(curr_row, 0, dest_col, -1);
                castle_rook_ui (curr_row, 0, dest_col + 1);
            }
        }

        if ('w' == color) wk_first_move = false;
        else if ('b' == color) bk_first_move = false;
    }

    else if ('p' == piece[1]) {
        if (0 == dest_row || 7 == dest_row)
        pawn_promotion(color, destination);

        else if (curr_row - 2 == dest_row || curr_row + 2 == dest_row) {
            previous_pawn_move = destination;
            previous_pawn_color = color;
        }

        else if (previous_pawn_move != null && curr_row == previous_pawn_move[0] && dest_col == previous_pawn_move[1])
        en_passant();
    }

    if (previous_pawn_color != color) {
        previous_pawn_move = null;
        previous_pawn_color = null;
    }
}

function update_state_castle(curr_row, rook_col, dest_col, sign) {
    board[curr_row][dest_col - (sign)] = board[curr_row][rook_col];
    board[curr_row][rook_col] = "";
}

function en_passant() {
    let row = previous_pawn_move[0];
    let col = previous_pawn_move[1];

    const previous_pawn = document.getElementById(previous_pawn_move);
    previous_pawn.classList.remove(previous_pawn.classList[1]);
    board[row][col] = "";
}