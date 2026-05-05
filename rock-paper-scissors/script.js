// human response (input) --> randomized computer response --> check winner

// initialize map for win check
const rpsMap = new Map();
rpsMap.set("Rock", "Scissors");
rpsMap.set("Scissors", "Paper");
rpsMap.set("Paper", "Rock");


// computer response
function getComputerResponse(max) {
    // random 0, 1, or 2
    return Math.floor(Math.random() * max);
}

// convert input
function processInput(input, playerType) {
  // Early exit for null/undefined (user hit cancel)
  if (input === null || input === undefined) {
    throw new Error(`${playerType} cancelled the input`);
  }

  // Convert and validate in one step
  const choice = parseInt(input, 10);

  // Check for NaN and valid range (0-2)
  if (isNaN(choice) || choice < 0 || choice > 2) {
    throw new Error(`${playerType} entered invalid input: ${input}`);
  }

  // Map choices using an object (simpler than Map here)
  const choices = {
    0: "Rock",
    1: "Scissors",
    2: "Paper"
  };

  return choices[choice];
}

// check win
function checkWin(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "TIE!";
    } else if (rpsMap.get(playerChoice) === computerChoice) {
        return "YOU WIN!";
    } else {
        return "YOU LOST!";
    }
}

// run game
function playGame() {
    try {
        const playerChoice = processInput(
            prompt("Enter 0 for Rock\nEnter 1 for Scissors\nEnter 2 for Paper"),
            "user"
        );
        const computerChoice = processInput(getComputerResponse(3), "computer");
        
        const result = checkWin(playerChoice, computerChoice);
        alert(`You did: ${playerChoice}. Computer did: ${computerChoice}\nResult: ${result}`);
    } catch (error) {
        alert(error.message);
    }
}

playButton = document.querySelector("#play-btn");
playButton.addEventListener('click', playGame);