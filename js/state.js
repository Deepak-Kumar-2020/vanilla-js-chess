let br_left = true;
let br_right = true;
let bk_first_move = true;

let wr_left = true;
let wr_right = true;
let wk_first_move = true;

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

function update_state_castle(curr_row, rook_col, dest_col, sign) {
    board[curr_row][dest_col - (sign)] = board[curr_row][rook_col];
    board[curr_row][rook_col] = "";
}

function update_rook_fm(curr_row, curr_col) {
    if (curr_row == 0) {
        if (curr_col == 0) br_left = false;
        else if (curr_col == 7) br_right = false;
    }

    if (curr_row == 7) {
        if (curr_col == 0) wr_left = false;
        else if (curr_col == 7) wr_right = false;
    }
}