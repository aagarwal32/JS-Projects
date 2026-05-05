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

    const displayCurrentScore = () => {
        console.log(
        `Current scores:\n` +
         `Player ${player1.mark}: ${player1.name}, wins: ${player1.getWins()}\n` +
         `Player ${player2.mark}: ${player2.name}, wins: ${player2.getWins()}\n`
        );
    };

    const checkWin = () => {
        // MUST BE CALLED BEFORE TURN SWITCH
        // (returns player that won, "TIE" if tie, false if no conclusion)
        let currentBoard = boardObj.getBoard();

        for (let i = 0; i < currentBoard.length; i++) {
            // check rows
            // check rows
            if (currentBoard[i][0] === currentBoard[i][1] &&
                currentBoard[i][1] === currentBoard[i][2] &&
                currentBoard[i][0] !== '_') {
                    return currentPlayer;
            }
            // check cols
            if (currentBoard[0][i] === currentBoard[1][i] &&
                currentBoard[1][i] === currentBoard[2][i] &&
                currentBoard[0][i] !== '_') {
                    return currentPlayer;
            }
        }

        // check negative diagonal
        if (currentBoard[0][0] === currentBoard[1][1] &&
            currentBoard[1][1] === currentBoard[2][2] &&
            currentBoard[0][0] !== '_') {
                return currentPlayer;
            }
        // check positive diagonal
        if (currentBoard[2][0] === currentBoard[1][1] &&
            currentBoard[1][1] === currentBoard[0][2] &&
            currentBoard[2][0] !== '_') {
                return currentPlayer;
            }
        
        // check no conclusion
        for (let row of currentBoard) {
            if (row.includes('_')) {
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

    return { getCurrentPlayer, switchTurn, playMove, displayCurrentScore, checkWin, resetGame };
}


function gameBoard() {
    const board = [
        ['_', '_', '_'],
        ['_', '_', '_'],
        ['_', '_', '_']
    ]
    const getBoard = () => board;

    const displayBoard = () => {
        console.log(
            `${board[0][0]} ${board[0][1]} ${board[0][2]}\n` +
            `${board[1][0]} ${board[1][1]} ${board[1][2]}\n` +
            `${board[2][0]} ${board[2][1]} ${board[2][2]}\n`
        )
    };

    const setMark = (row, col, mark) => {
        // validates and returns bool, places mark on board
        if(board[row][col] === '_') {
            board[row][col] = mark;
            return true;
        }
        return false;
    };

    const resetBoard = () => { board.forEach(row => row.fill('_')); };

    return { getBoard, displayBoard, setMark, resetBoard };
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
    let p1_mark = prompt("Enter 'X' or 'O' to choose mark.");

    if (p1_mark != "X" && p1_mark != "O") { 
        throw Error(`${p1_mark} is not a valid mark!`); 
    };

    let p2_mark = p1_mark === 'X' ? 'O' : 'X';
    let p1_name = prompt("Enter player 1 name.");
    let p2_name = prompt("Enter player 2 name.");

    const playerOne = player(p1_name, p1_mark);
    const playerTwo = player(p2_name, p2_mark);

    console.log(
        `Players initalized.\n` +
         `Player ${playerOne.mark}: ${playerOne.name}, wins: ${playerOne.getWins()}\n` +
         `Player ${playerTwo.mark}: ${playerTwo.name}, wins: ${playerTwo.getWins()}\n`
    );

    // initialize board
    const gameBoardObject = gameBoard();
    // display board
    gameBoardObject.displayBoard();

    const controlFlowObject = controlFlow(gameBoardObject, playerOne, playerTwo);
    
    //begin game
    while (playerOne.getWins() !== 3 && playerTwo.getWins() !== 3) {
        let currentPlayer = controlFlowObject.getCurrentPlayer();
        let coords = prompt(
            `${currentPlayer.name}'s (${currentPlayer.mark}) turn:\n` +
            `Enter row col with space in between\n` +
            `For example: 0 2 is row = 0, column = 2.\n`
        );
        let row = Number(coords.at(0));
        let col = Number(coords.at(2));

        if (!controlFlowObject.playMove(row, col)) {
            console.log('That spot is taken! Try again.\n');
            continue;
        }
        gameBoardObject.displayBoard();

        // check game status
        let status = controlFlowObject.checkWin();

        if (status === currentPlayer) {
            console.log(`${currentPlayer.name} (${currentPlayer.mark}) won!\n`) 
            currentPlayer.addWin();
            gameBoardObject.resetBoard();
            gameBoardObject.displayBoard();
            controlFlowObject.displayCurrentScore();
        } 
        if (status === "TIE") {
            console.log(`It's a tie!\n`)
            gameBoardObject.resetBoard();
            gameBoardObject.displayBoard();
            controlFlowObject.displayCurrentScore();
        }

        controlFlowObject.switchTurn();
    }
    // display final scores
    console.log(
        `Game finished! Final scores:\n` +
         `Player ${playerOne.mark}: ${playerOne.name}, wins: ${playerOne.getWins()}\n` +
         `Player ${playerTwo.mark}: ${playerTwo.name}, wins: ${playerTwo.getWins()}\n`
        );

    controlFlowObject.resetGame();
}

main();