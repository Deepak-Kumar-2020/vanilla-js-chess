function valid_move(piece, current, destination) {
    if (piece[1] == 'b') {
        return bishop_moves(current, destination);
    }

    else if (piece[1] == 'r') {
        return rook_moves(current, destination);
    }

    else if (piece[1] == 'q') {
        return bishop_moves(current, destination) || rook_moves(current, destination);
    }

    else if (piece[1] == 'n') {
        return knight_moves(current, destination);
    }

    else if (piece == "wp") {
        return wp_moves(current, destination);
    }

    else if (piece == "bp") {
        return bp_moves(current, destination);
    }

    return true;
}

function bishop_moves(current, destination) {
    let curr_row = +current[0], trow = curr_row;
    let curr_col = +current[1], tcol = curr_col;

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    // left up
    while (trow > 0 && tcol > 0) {
        trow--; tcol--;
        if (trow == dest_row && tcol == dest_col)
        return true;

        else if (board[trow][tcol] !== "") break;
    }

    // right up
    trow = curr_row; tcol = curr_col;
    while (trow > 0 && tcol < 7) {
        trow--; tcol++;
        if (trow == dest_row && tcol == dest_col)
        return true;
        
        else if (board[trow][tcol] !== "") break;
    }

    // left down
    trow = curr_row; tcol = curr_col;
    while (trow < 7 && tcol > 0) {
        trow++; tcol--;
        if (trow == dest_row && tcol == dest_col)
        return true;

        else if (board[trow][tcol] !== "") break;
    }

    // right down
    trow = curr_row; tcol = curr_col;
    while (trow < 7 && tcol < 7) {
        trow++; tcol++;
        if (trow == dest_row && tcol == dest_col)
        return true;

        else if (board[trow][tcol] !== "") break;
    }

    return false;
}


function rook_moves(current, destination) {
    let curr_row = +current[0];
    let curr_col = +current[1];

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    if (dest_row != curr_row && dest_col != curr_col)
    return false;

    // left
    let tcol = curr_col;
    while (tcol > 0) {
        tcol--;
        if (curr_row == dest_row && tcol == dest_col)
        return true;

        else if (board[curr_row][tcol] !== "") break;
    }

    // right
    tcol = curr_col;
    while (tcol < 7) {
        tcol++;
        if (curr_row == dest_row && tcol == dest_col)
        return true;

        else if (board[curr_row][tcol] !== "") break;
    }

    // up
    let trow = curr_row;
    while (trow > 0) {
        trow--;
        if (trow == dest_row && curr_col == dest_col)
        return true;

        else if (board[trow][curr_col] !== "") break;
    }

    // down
    trow = curr_row;
    while (trow < 7) {
        trow++;
        if (trow == dest_row && curr_col == dest_col)
        return true;

        else if (board[trow][curr_col] !== "") break;
    }

    return false;
}

function knight_moves(current, destination) {
    let curr_row = +current[0];
    let curr_col = +current[1];

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    // let top1 = curr_row - 2
    // top1
    if (curr_row - 2 == dest_row) {
        if (curr_col - 1 == dest_col)
        return true;

        if (curr_col + 1 == dest_col)
        return true;
    }

    // down
    if (curr_row + 2 == dest_row) {
        if (curr_col - 1 == dest_col)
        return true;
        
        if (curr_col + 1 == dest_col)
        return true;
    }

    // left
    if (curr_col - 2 == dest_col) {
        if (curr_row - 1 == dest_row)
        return true;

        if (curr_row + 1 == dest_row)
        return true;
    }

    // right
    if (curr_col + 2 == dest_col) {
        if (curr_row - 1 == dest_row)
        return true;

        if (curr_row + 1 == dest_row)
        return true;
    }

    return false;
}

let previous_pawn_move = null;
function wp_moves(current, destination) {
    let curr_row = +current[0];
    let curr_col = +current[1];

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    if (curr_col == dest_col) {
        if (board[dest_row][dest_col] == "") {
            if (curr_row == 6 && curr_row - 2 == dest_row) {
                if (board[curr_row - 1][dest_col] == "") 
                return true;
            }

            else if (curr_row - 1 == dest_row) {
                if (dest_row == 0) pawnPromotion("w", destination);
                return true;
            }
        }
    }

    else if (curr_col - 1 == dest_col || curr_col + 1 == dest_col) {
        if (curr_row - 1 == dest_row && board[dest_row][dest_col] !== "") {
            if (dest_row == 0) pawnPromotion("w", destination);
            return true;
        }
    }

    return false;
}

function bp_moves(current, destination) {
    let curr_row = +current[0];
    let curr_col = +current[1];

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    if (curr_col == dest_col) {
        if (board[dest_row][dest_col] == "") {
            if (curr_row == 1 && curr_row + 2 == dest_row) {
                if (board[curr_row + 1][dest_col] == "")
                return true;
            }

            else if (curr_row + 1 == dest_row) {
                if (dest_row == 7) pawnPromotion("b", destination);
                return true;
            }
        }
    }

    else if (curr_col - 1 == dest_col || curr_col + 1 == dest_col) {
        if (curr_row + 1 == dest_row && board[dest_row][dest_col] !== "") {
            if (dest_row == 7) pawnPromotion("b", destination);
            return true;
        }
    }

    return false;
}