const mainContainer = document.querySelector(".main-container");

const player = (name, marker) => {
    const playerName = name;
    const playerMarker = marker;
    return {playerName, playerMarker};
};

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

const gameBoard = (() => {
    const gridBoxes = Array.from(document.querySelectorAll(".grid-box"));
    const eventText = document.getElementById("event-text");
    let _gameBoardArray = [];
    
    for (box = 0; box < gridBoxes.length; box++) {
        _gameBoardArray.push(gridBoxes[box].textContent);
    };

    let currentTurn = player1.playerMarker;
    let currentPlayer = player1.playerName;

    gridBoxes.forEach(box => {
        box.addEventListener("click", () => {
            if (box.textContent == "") {
                box.textContent = currentTurn;
                _gameBoardArray[box.id] = currentTurn;
                checkWinner();
                if (currentTurn == player1.playerMarker) {
                    currentTurn = player2.playerMarker;
                    eventText.textContent = `It is ${player2.playerName}'s turn.`;
                    currentPlayer = player2.playerName;
                } else {
                    currentTurn = player1.playerMarker;
                    eventText.textContent = `It is ${player1.playerName}'s turn.`;
                    currentPlayer = player1.playerName;
                };
            };
        });
    });

    const winConditions = [
        [0, 1, 2], [0, 3, 6], [1, 4, 7], [2, 5, 8], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]
    ];

    let winner = "";
    
    const checkWinner = () => {
        for (x = 0; x < winConditions.length; x++) {
            winCondiditon = winConditions[x];
            let spot1 = _gameBoardArray[winCondiditon[0]];
            let spot2 = _gameBoardArray[winCondiditon[1]];
            let spot3 = _gameBoardArray[winCondiditon[2]];
            if (spot1 == "" && spot2 == "" && spot3 == ""){
                continue;
            }
            if (spot1 === spot2 && spot2 === spot3){
                winner = `${currentPlayer} has won the game!`;
                playAgain();
            };
        };
        if (!_gameBoardArray.includes("")) {
            winner = "It's a Tie!";
            playAgain();
        };
    };

    const playAgain = () => {
        const promptContainer = document.createElement("div");
        promptContainer.classList.add("prompt-container");

        const winnerText = document.createElement("div");
        winnerText.textContent = `Game Over! ${winner}`;

        const playAgainPromp = document.createElement("div");
        playAgainPromp.classList.add("play-again");

        const playAgainText = document.createElement("div");
        playAgainText.innerText = "Would you like to play again?";

        const playAgainButton = document.createElement("button");
        playAgainButton.innerText = "Play Again?";
        playAgainButton.id = "play-again-button";

        promptContainer.append(playAgainPromp);
        playAgainPromp.append(winnerText, playAgainText, playAgainButton);
        mainContainer.appendChild(promptContainer);

        playAgainButton.addEventListener("click", () => {
            _gameBoardArray.length = 0;
            for (box = 0; box < gridBoxes.length; box++) {
                _gameBoardArray.push("");
                gridBoxes.forEach(box => {
                    box.textContent = "";
                });
            };
            mainContainer.removeChild(promptContainer);
        });
        return {winnerText};
    };

})();