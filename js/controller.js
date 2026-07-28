function handleClick(e) {
    if (!gameStarted && selectedTime != "unlimited") {
        startClock();
        gameStarted = true;
    }

    if (previous == null && e.target.classList.length > 1 && e.target.classList[1][0] == turn) {
        previous = e.target;
        previous.classList.add("selected");
    }
    
    else if (previous != null) {
        if (e.target.id != previous.id) {
            if (e.target.classList.length == 2) {
                if (e.target.classList[1][0] == previous.classList[1][0])
                changeSelection(e);

                else if (valid_move(previous.classList[1], previous.id, e.target.id)) {
                    capture(e);
                    resetPrevious();
                }
            }

            else if (valid_move(previous.classList[1], previous.id, e.target.id)) {
                movePiece(e);
                resetPrevious();
            }

            else resetPrevious();
        }
        else resetPrevious();
    }
}

function capture(e) {
    update_board(e);
    king_location = findKing(turn);
    kingInCheck = canAttack(king_location, turn);
    
    if (kingInCheck) {
        undo_board(e);
    }
    else {
        update_state(previous.classList[1], previous.id, e.target.id);
        e.target.classList.remove(e.target.classList[1]);
        e.target.classList.add(previous.classList[1]);
        previous.classList.remove(previous.classList[1]);

        if (selectedTime != "unlimited") toggleClock();
        turn = (turn == 'w') ? 'b' : 'w';

        king_location = findKing(turn);
        kingInCheck = canAttack(king_location, turn);
        if (kingInCheck && !hasLegalMove(turn)) {
            gameOver(1, turn);
        }

        else if (!kingInCheck && !hasLegalMove(turn)) {
            gameOver(0, turn);
        }
    }
}

function movePiece(e) {
    update_board(e);
    king_location = findKing(turn);
    kingInCheck = canAttack(king_location, turn);

    if (kingInCheck) undo_board(e);
    else {
        update_state(previous.classList[1], previous.id, e.target.id);
        e.target.classList.add(previous.classList[1]);
        previous.classList.remove(previous.classList[1]);

        if (selectedTime != "unlimited") toggleClock();
        turn = (turn == 'w') ? 'b' : 'w';

        king_location = findKing(turn);
        kingInCheck = canAttack(king_location, turn);
        if (kingInCheck && !hasLegalMove(turn)) {
            gameOver(1, turn);

        }

        else if (!kingInCheck && !hasLegalMove(turn)) {
            gameOver(0, turn);
        }
    }
}

function changeSelection(e) {
    previous.classList.remove("selected");
    previous = e.target;
    previous.classList.add("selected");
}

function resetPrevious() {
    previous.classList.remove("selected");
    previous = null;
}

const handler = (e) => handleClick(e);
chessBoard.addEventListener("click", handler);