function controlFlow(boardObj, player1, player2) {
    let currentPlayer = player1;

    const getCurrentPlayer = () => currentPlayer;

    const switchTurn = () => {
        // switches player and returns that player 
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        return currentPlayer;
    };

    const playMove = (row, col) => {
        // validate move and place mark, (returns true if valid)
        return boardObj.setMark(row, col, currentPlayer.mark);
    };

    const checkWin = () => {
        // MUST BE CALLED BEFORE TURN SWITCH
        // (returns player that won, "TIE" if tie, false if no conclusion)
        let currentBoard = boardObj.getBoard();

        for (let i = 0; i < currentBoard.length; i++) {
            // check rows
            if (currentBoard[i][0] === currentBoard[i][1] === currentBoard[i][2] &&
                currentBoard[i][0] !== '') {
                return currentPlayer;
            }
            // check cols
            if (currentBoard[0][i] === currentBoard[1][i] === currentBoard [2][i] &&
                currentBoard[0][i] !== '') {
                return currentPlayer;
            }
        }

        // check negative diagonal
        if (currentBoard[0][0] === currentBoard[1][1] === currentBoard[2][2] &&
            currentBoard[0][0] !== '') {
                return currentPlayer;
            }
        // check positive diagonal
        if (currentBoard[2][0] === currentBoard[1][1] === currentBoard[0][2] &&
            currentBoard[2][0] !== '') {
                return currentPlayer;
            }
        
        // check no conclusion
        for (let row of currentBoard) {
            if (row.contains('')) {
                return false;
            }
        }

        // if no checks above return, it's a tie
        return "TIE";
    }

    const resetGame = () => {
        // use gameBoard and player object methods to reset game
        boardObj.resetBoard();
        player1.resetWins();
        player2.resetWins();
    }

    return { getCurrentPlayer, switchTurn, playMove, checkWin, resetGame };
}


function gameBoard() {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    const getBoard = () => board;

    const setMark = (row, col, mark) => {
        // validates and returns bool, places mark on board
        if(board[row][col] === '') {
            board[row][col] = mark;
            return true;
        }
        return false;
    }

    const resetBoard = () => { board.forEach(row => row.fill('')); };

    return { getBoard, setMark, resetBoard };
}


function player(name, mark) {
    let wins = 0;

    const getWins = () => wins;
    const addWin = () => { wins++; };
    const resetWins = () => { wins = 0; };

    return { name, mark, getWins, addWin, resetWins };
}


function main() {
    // initiate player, board, and control flow objects
    // use loop to play game
}