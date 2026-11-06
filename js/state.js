let turn, previous, gameStarted, gameEnded, 
    king_location, kingInCheck, 
    br_left, br_right, bk_first_move, 
    wr_left, wr_right, wk_first_move, 
    previous_pawn_move, previous_pawn_color,
    board;

function setup_state() {
    turn = 'w';
    previous = null;
    gameStarted = false;
    gameEnded = false;

    king_location = null;
    kingInCheck = false;

    br_left = true;
    br_right = true;
    bk_first_move = true;

    wr_left = true;
    wr_right = true;
    wk_first_move = true;

    previous_pawn_move = null;
    previous_pawn_color = null;

    board = [
        ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
        ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
        ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"]
    ];
}

function update_state(piece, capturedPiece, source, destination) {
    let sourceRow = +source[0];
    let sourceCol = +source[1];

    let destRow = +destination[0];
    let destCol = +destination[1];

    let color = piece[0];
    let sound = capturedPiece === "" ? "move" : "capture";

    if (piece[1] == 'r') {
        if (sourceRow == 0) {
            if (sourceCol == 0) br_left = false;
            else if (sourceCol == 7) br_right = false;
        }

        if (sourceRow == 7) {
            if (sourceCol == 0) wr_left = false;
            else if (sourceCol == 7) wr_right = false;
        }
    }

    else if (piece[1] == 'k') {
        if (sourceRow == destRow) {        
            if (sourceCol + 2 == destCol) {
                update_state_castle(sourceRow, 7, destCol, 1);
                castle_rook_ui (sourceRow, 7, destCol - 1);
                sound = "castle";
            }
            else if (sourceCol - 2 == destCol) {
                update_state_castle(sourceRow, 0, destCol, -1);
                castle_rook_ui (sourceRow, 0, destCol + 1);
                sound = "castle";
            }
        }

        if ('w' == color) wk_first_move = false;
        else if ('b' == color) bk_first_move = false;
    }

    else if ('p' == piece[1]) {
        if (0 == destRow || 7 == destRow) {
            pawn_promotion(color, destination);
            return;
        }

        else if (sourceRow - 2 == destRow || sourceRow + 2 == destRow) {
            previous_pawn_move = destination;
            previous_pawn_color = color;
        }

        else if (previous_pawn_move != null && sourceRow == previous_pawn_move[0] && destCol == previous_pawn_move[1]) {
            let row = previous_pawn_move[0];
            let col = previous_pawn_move[1];
            board[row][col] = "";
            en_passant();
            sound = "capture";
        }
    }

    changeTurn(color, sound);
}

function changeTurn(color, sound) {
    if (selectedTime !== "unlimited") toggleClock();
    turn = (turn == 'w') ? 'b' : 'w';
    changeTurnUI();
    rotate_board();

    if (previous_pawn_color != color) {
        previous_pawn_move = null;
        previous_pawn_color = null;
    }

    king_location = findKing(turn);
    kingInCheck = canAttack(king_location, turn);
    const legalMoveExists = hasLegalMove(turn);
    
    if (kingInCheck && !legalMoveExists) {
        playSound("gameOver");
        gameOver(1, turn);
    }
    else if (!kingInCheck && !legalMoveExists) {
        playSound("gameOver");
        gameOver(0, turn);
    }

    else if (kingInCheck) playSound("check");
    else if (sound !== "promote") playSound(sound);    
}

function update_board(e) {
    const sourceRow = +previous.id[0];
    const sourceCol = +previous.id[1];
    const destRow = +e.target.id[0];
    const destCol = +e.target.id[1];

    const movingPiece = board[sourceRow][sourceCol];
    const capturedPiece = board[destRow][destCol];

    board[sourceRow][sourceCol] = "";
    board[destRow][destCol] = movingPiece;

    return {sourceRow, sourceCol, destRow, destCol, movingPiece, capturedPiece};
}

function undo_board(move) {
    board[move.sourceRow][move.sourceCol] = move.movingPiece;
    board[move.destRow][move.destCol] = move.capturedPiece;
}

function update_state_castle(sourceRow, rookCol, destCol, sign) {
    board[sourceRow][destCol - (sign)] = board[sourceRow][rookCol];
    board[sourceRow][rookCol] = "";
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