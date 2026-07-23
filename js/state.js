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

        else if (previous_pawn_move != null && curr_row == previous_pawn_move[0] && dest_col == previous_pawn_move[1]) {
            let row = previous_pawn_move[0];
            let col = previous_pawn_move[1];
            board[row][col] = "";
            en_passant();
        }
    }

    if (previous_pawn_color != color) {
        previous_pawn_move = null;
        previous_pawn_color = null;
    }
}

function update_board(e) {
    board[previous.id[0]][previous.id[1]] = "";
    board[e.target.id[0]][e.target.id[1]] = previous.classList[1];
}

function undo_board(e) {
    board[previous.id[0]][previous.id[1]] = previous.classList[1];
    board[e.target.id[0]][e.target.id[1]] = "";
}

function update_state_castle(curr_row, rook_col, dest_col, sign) {
    board[curr_row][dest_col - (sign)] = board[curr_row][rook_col];
    board[curr_row][rook_col] = "";
}

function findKing(color) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] == `${color}k`) {
                return `${i}${j}`;
            }
        }
    }
}

function canAttack(location, color) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] != "" && board[i][j][0] != color) {
                if(attack(board[i][j], `${i}${j}`, location)) return true;
            }
        }
    }
    return false;
}

function hasLegalMove(color) {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            let piece = board[r][c];

            if (piece == "" || piece[0] !== color) continue;

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    let target = board[i][j];

                    if (target !== "" && target[0] === color) continue;
                    if (!valid_move(board[r][c], `${r}${c}`, `${i}${j}`)) continue;
                      
                    board[i][j] = piece;
                    board[r][c] = "";

                    let kingPos = findKing(color);
                    let legal = !canAttack(kingPos, color);

                    board[r][c] = piece;
                    board[i][j] = target;

                    if (legal) return true; 
                }
            }
        }
    }
    return false;
}