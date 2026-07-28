function attack(piece, current, destination) {
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
        return king_attack(current, destination);
    }

    else if (piece == "wp") {
        return wp_attack(current, destination);
    }

    else if (piece == "bp") {
        return bp_attack(current, destination);
    }
}

function king_attack(current, destination) {
    let curr_row = +current[0];
    let curr_col = +current[1];

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    for (let i = curr_row - 1; i <= curr_row + 1; i++) {
        for (let j = curr_col - 1; j <= curr_col + 1; j++) {
            if (i == dest_row && j == dest_col)
            return true;    
        }
    }

    return false;
}

function wp_attack(current, destination) {
    let curr_row = +current[0];
    let curr_col = +current[1];

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    return ((curr_col - 1 == dest_col || curr_col + 1 == dest_col) && curr_row - 1 == dest_row);
}

function bp_attack(current, destination) {
    let curr_row = +current[0];
    let curr_col = +current[1];

    let dest_row = +destination[0];
    let dest_col = +destination[1];

    return ((curr_col - 1 == dest_col || curr_col + 1 == dest_col) && curr_row + 1 == dest_row);
}