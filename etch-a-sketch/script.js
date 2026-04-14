const DEFAULT_SIZE = 20;


function validateInput(input) {
    // create custom board size
    // button --> function that takes an integer input, x
    // processes and validates input
    return
}


function createTiles(board, size=DEFAULT_SIZE) {
    // creates size row divs and size tiles per row
    console.log("In createTiles function");
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < size; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("id", `tile-${i}-${j}`);
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
    return
}


function initializeBoardEvents(board) {
    let isMouseDown = false;

    board.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        e.target.style.backgroundColor = "black";
    });
    board.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
            e.target.style.backgroundColor = "black";
        }
    });
    board.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
}


function main() {
    // get board
    const board = document.querySelector("#board");

    // initialize tiles on first load
    createTiles(board);

    // initialize board (event delegation) events
    initializeBoardEvents(board);
}


main();