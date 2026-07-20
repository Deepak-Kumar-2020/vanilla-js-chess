function handleClick(e) {
    console.log(e.target);

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
    board[previous.id[0]][previous.id[1]] = "";
    board[e.target.id[0]][e.target.id[1]] = previous.classList[1];
    update_state(previous.classList[1], previous.id, e.target.id);
    e.target.classList.remove(e.target.classList[1]);
    e.target.classList.add(previous.classList[1]);
    previous.classList.remove(previous.classList[1]);
    turn = (turn == 'w') ? 'b' : 'w';
}

function changeSelection(e) {
    previous.classList.remove("selected");
    previous = e.target;
    previous.classList.add("selected");
}

function movePiece(e) {
    board[previous.id[0]][previous.id[1]] = "";
    board[e.target.id[0]][e.target.id[1]] = previous.classList[1];
    update_state(previous.classList[1], previous.id, e.target.id);
    e.target.classList.add(previous.classList[1]);
    previous.classList.remove(previous.classList[1]);
    turn = (turn == 'w') ? 'b' : 'w';
}

function resetPrevious() {
    previous.classList.remove("selected");
    previous = null;
}

const handler = (e) => handleClick(e);
chessBoard.addEventListener("click", handler);