function handleClick(e) {
    if (!gameStarted && selectedTime != "unlimited") {
        startClock();
        gameStarted = true;
    }

    const destination = e.target.id;
    const row = +destination[0];
    const col = +destination[1];

    if (previous == null && board[row][col] != "" && board[row][col][0] == turn) {
        previous = e.target;
        previous.classList.add("selected");
        move_suggestions(board[row][col], previous.id);
    }
    
    else if (previous != null) {
        if (destination != previous.id) {
            if (board[row][col] !== "" && board[row][col][0] == turn) changeSelection(e);

            else if (valid_move(board[previous.id[0]][previous.id[1]], previous.id, destination)) {
                makeMove(e);
                resetPrevious();
                if (!gameEnded) render_board();
            }
            
            else {
                resetPrevious();
                render_board();
            }
        }

        else {
            resetPrevious();
            render_board();
        }
    }
}

function makeMove(e) {
    const move = update_board(e);

    king_location = findKing(turn);
    kingInCheck = canAttack(king_location, turn);

    if (kingInCheck) undo_board(move);
    else update_state(move.movingPiece, move.capturedPiece, previous.id, e.target.id);
}

function changeSelection(e) {
    previous = e.target;
    render_board();
    move_suggestions(board[previous.id[0]][previous.id[1]], previous.id);
    previous.classList.add("selected");
}

function resetPrevious() {
    previous.classList.remove("selected");
    previous = null;
}

const handler = (e) => handleClick(e);