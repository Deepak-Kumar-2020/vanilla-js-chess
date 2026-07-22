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

    else if (piece[1] == 'k') {
        return king_moves(current, destination, piece[0]);
    }

    else if (piece == "wp") {
        return wp_moves(current, destination);
    }

    else if (piece == "bp") {
        return bp_moves(current, destination);
    }
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

function king_moves(current, destination, color) {
    let curr_row = +current[0];
    let curr_col = +current[1];

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    // castle check on right side
    if (curr_col + 2 == dest_col && curr_row == dest_row) {
        // squares of castle in check or not
        let attack_on_squares = canAttack(`${curr_row}${curr_col + 1}`, color) || canAttack(`${curr_row}${curr_col + 2}`, color) || kingInCheck;

        if (color == 'b') {
            if (bk_first_move && br_right && !attack_on_squares)
            return true;
        }
        
        else if (color == 'w') {
            if (wk_first_move && wr_right && !attack_on_squares)
            return true;
        }
    }

    // castle check on left side
    else if (curr_col - 2 == dest_col && curr_row == dest_row) {
        let attack_on_squares = canAttack(`${curr_row}${curr_col - 1}`, color) || canAttack(`${curr_row}${curr_col - 2}`, color) || kingInCheck;

        if (color == 'b') {
            if (bk_first_move && br_left && !attack_on_squares)
            return true;
        }
        
        else if (color == 'w') {
            if (wk_first_move && wr_left && !attack_on_squares)
            return true;
        }
    }

    for (let i = curr_row - 1; i <= curr_row + 1; i++) {
        for (let j = curr_col - 1; j <= curr_col + 1; j++) {
            if (i == dest_row && j == dest_col)
            return true;    
        }
    }

    return false;
}

function wp_moves(current, destination) {
    let curr_row = +current[0];
    let curr_col = +current[1];

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    if (curr_col == dest_col) {
        if (curr_row - 2 == dest_row && curr_row == 6) {
            if (board[curr_row - 1][dest_col] == "" && board[curr_row - 2][dest_col] == "") {
                return true;
            }
        }

        else if (curr_row - 1 == dest_row && board[dest_row][dest_col] == "")
        return true;
    }

    else if ((curr_col - 1 == dest_col || curr_col + 1 == dest_col) && curr_row - 1 == dest_row) {
        if (board[dest_row][dest_col] !== "")
        return true;

        else if (previous_pawn_move != null && curr_row == previous_pawn_move[0] && dest_col == previous_pawn_move[1])
        return true;
    }

    return false;
}

function bp_moves(current, destination) {
    let curr_row = +current[0];
    let curr_col = +current[1];

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    if (curr_col == dest_col) {
        if (curr_row + 2 == dest_row && curr_row == 1) {
            if (board[curr_row + 1][dest_col] == "" && board[curr_row + 2][dest_col] == "") {
                return true;
            }
        }

        else if (curr_row + 1 == dest_row && board[dest_row][dest_col] == "")
        return true;
    }

    else if ((curr_col - 1 == dest_col || curr_col + 1 == dest_col) && curr_row + 1 == dest_row) {
        if (board[dest_row][dest_col] !== "")
        return true;

        else if (previous_pawn_move != null && curr_row == previous_pawn_move[0] && dest_col == previous_pawn_move[1])
        return true;
    }

    return false;
}