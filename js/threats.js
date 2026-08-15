function attack(piece, source, destination) {
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
        return king_attack(source, destination);
    }

    else if (piece == "wp") {
        return wp_attack(source, destination);
    }

    else if (piece == "bp") {
        return bp_attack(source, destination);
    }
}

function king_attack(source, destination) {
    let sourceRow = +source[0];
    let sourceCol = +source[1];

    let destRow = +destination[0];
    let destCol = +destination[1];

    for (let i = sourceRow - 1; i <= sourceRow + 1; i++) {
        for (let j = sourceCol - 1; j <= sourceCol + 1; j++) {
            if (i == destRow && j == destCol)
            return true;    
        }
    }

    return false;
}

function wp_attack(source, destination) {
    let sourceRow = +source[0];
    let sourceCol = +source[1];

    let destRow = +destination[0];
    let destCol = +destination[1];

    return ((sourceCol - 1 == destCol || sourceCol + 1 == destCol) && sourceRow - 1 == destRow);
}

function bp_attack(source, destination) {
    let sourceRow = +source[0];
    let sourceCol = +source[1];

    let destRow = +destination[0];
    let destCol = +destination[1];

    return ((sourceCol - 1 == destCol || sourceCol + 1 == destCol) && sourceRow + 1 == destRow);
}