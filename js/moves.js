function valid_move(piece, source, destination) {
    if (piece[1] == 'b') {
        return bishop_moves(source, destination);
    }

    else if (piece[1] == 'r') {
        return rook_moves(source, destination);
    }

    else if (piece[1] == 'q') {
        return bishop_moves(source, destination) || rook_moves(source, destination);
    }

    else if (piece[1] == 'n') {
        return knight_moves(source, destination);
    }

    else if (piece[1] == 'k') {
        return king_moves(source, destination, piece[0]);
    }

    else if (piece == "wp") {
        return wp_moves(source, destination);
    }

    else if (piece == "bp") {
        return bp_moves(source, destination);
    }
}

function bishop_moves(source, destination) {
    let sourceRow = +source[0], trow = sourceRow;
    let sourceCol = +source[1], tcol = sourceCol;

    let destRow = +destination[0];
    let destCol = +destination[1];

    // left up
    while (trow > 0 && tcol > 0) {
        trow--; tcol--;
        if (trow == destRow && tcol == destCol)
        return true;

        else if (board[trow][tcol] !== "") break;
    }

    // right up
    trow = sourceRow; tcol = sourceCol;
    while (trow > 0 && tcol < 7) {
        trow--; tcol++;
        if (trow == destRow && tcol == destCol)
        return true;
        
        else if (board[trow][tcol] !== "") break;
    }

    // left down
    trow = sourceRow; tcol = sourceCol;
    while (trow < 7 && tcol > 0) {
        trow++; tcol--;
        if (trow == destRow && tcol == destCol)
        return true;

        else if (board[trow][tcol] !== "") break;
    }

    // right down
    trow = sourceRow; tcol = sourceCol;
    while (trow < 7 && tcol < 7) {
        trow++; tcol++;
        if (trow == destRow && tcol == destCol)
        return true;

        else if (board[trow][tcol] !== "") break;
    }

    return false;
}

function rook_moves(source, destination) {
    let sourceRow = +source[0];
    let sourceCol = +source[1];

    let destRow = +destination[0];
    let destCol = +destination[1];

    if (destRow != sourceRow && destCol != sourceCol)
    return false;

    // left
    let tcol = sourceCol;
    while (tcol > 0) {
        tcol--;
        if (sourceRow == destRow && tcol == destCol)
        return true;

        else if (board[sourceRow][tcol] !== "") break;
    }

    // right
    tcol = sourceCol;
    while (tcol < 7) {
        tcol++;
        if (sourceRow == destRow && tcol == destCol)
        return true;
        
        else if (board[sourceRow][tcol] !== "") break;
    }

    // up
    let trow = sourceRow;
    while (trow > 0) {
        trow--;
        if (trow == destRow && sourceCol == destCol)
        return true;

        else if (board[trow][sourceCol] !== "") break;
    }

    // down
    trow = sourceRow;
    while (trow < 7) {
        trow++;
        if (trow == destRow && sourceCol == destCol)
            return true;

        else if (board[trow][sourceCol] !== "") break;
    }

    return false;
}

function knight_moves(source, destination) {
    let sourceRow = +source[0];
    let sourceCol = +source[1];

    let destRow = +destination[0];
    let destCol = +destination[1];

    // let top1 = sourceRow - 2
    // top1
    if (sourceRow - 2 == destRow) {
        if (sourceCol - 1 == destCol)
        return true;

        if (sourceCol + 1 == destCol)
        return true;
    }

    // down
    if (sourceRow + 2 == destRow) {
        if (sourceCol - 1 == destCol)
        return true;
        
        if (sourceCol + 1 == destCol)
        return true;
    }

    // left
    if (sourceCol - 2 == destCol) {
        if (sourceRow - 1 == destRow)
        return true;

        if (sourceRow + 1 == destRow)
        return true;
    }

    // right
    if (sourceCol + 2 == destCol) {
        if (sourceRow - 1 == destRow)
        return true;

        if (sourceRow + 1 == destRow)
        return true;
    }

    return false;
}

function king_moves(source, destination, color) {
    let sourceRow = +source[0];
    let sourceCol = +source[1];

    let destRow = +destination[0];
    let destCol = +destination[1];

    // castle check on right side
    if (sourceCol + 2 == destCol && sourceRow == destRow) {
        // squares of castle in check or not
        if (board[sourceRow][sourceCol + 1] != "" || board[sourceRow][sourceCol + 2] != "") return false;
        let attack_on_squares = canAttack(`${sourceRow}${sourceCol + 1}`, color) || canAttack(`${sourceRow}${sourceCol + 2}`, color) || kingInCheck;

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
    else if (sourceCol - 2 == destCol && sourceRow == destRow) {
        if (board[sourceRow][sourceCol - 1] != "" || board[sourceRow][sourceCol - 2] != "") return false;
        let attack_on_squares = canAttack(`${sourceRow}${sourceCol - 1}`, color) || canAttack(`${sourceRow}${sourceCol - 2}`, color) || kingInCheck;

        if (color == 'b') {
            if (bk_first_move && br_left && !attack_on_squares)
            return true;
        }
        
        else if (color == 'w') {
            if (wk_first_move && wr_left && !attack_on_squares)
            return true;
        }
    }

    for (let i = sourceRow - 1; i <= sourceRow + 1; i++) {
        for (let j = sourceCol - 1; j <= sourceCol + 1; j++) {
            if (i == destRow && j == destCol)
            return true;    
        }
    }

    return false;
}

function wp_moves(source, destination) {
    let sourceRow = +source[0];
    let sourceCol = +source[1];

    let destRow = +destination[0];
    let destCol = +destination[1];

    if (sourceCol == destCol) {
        if (sourceRow - 2 == destRow && sourceRow == 6) {
            if (board[sourceRow - 1][destCol] == "" && board[sourceRow - 2][destCol] == "") {
                return true;
            }
        }

        else if (sourceRow - 1 == destRow && board[destRow][destCol] == "")
        return true;
    }

    else if ((sourceCol - 1 == destCol || sourceCol + 1 == destCol) && sourceRow - 1 == destRow) {
        if (board[destRow][destCol] !== "")
        return true;

        else if (previous_pawn_move != null && sourceRow == previous_pawn_move[0] && destCol == previous_pawn_move[1])
        return true;
    }

    return false;
}

function bp_moves(source, destination) {
    let sourceRow = +source[0];
    let sourceCol = +source[1];

    let destRow = +destination[0];
    let destCol = +destination[1];

    if (sourceCol == destCol) {
        if (sourceRow + 2 == destRow && sourceRow == 1) {
            if (board[sourceRow + 1][destCol] == "" && board[sourceRow + 2][destCol] == "") {
                return true;
            }
        }

        else if (sourceRow + 1 == destRow && board[destRow][destCol] == "")
        return true;
    }

    else if ((sourceCol - 1 == destCol || sourceCol + 1 == destCol) && sourceRow + 1 == destRow) {
        if (board[destRow][destCol] !== "")
        return true;

        else if (previous_pawn_move != null && sourceRow == previous_pawn_move[0] && destCol == previous_pawn_move[1])
        return true;
    }

    return false;
}