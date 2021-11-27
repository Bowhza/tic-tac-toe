const player = (name, marker) => {
    const playerName = name;
    const playerMarker = marker;
    return {playerName, playerMarker};
};

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

const gameBoard = (() => {
    const gridBoxes = Array.from(document.querySelectorAll(".grid-box"));
    let _gameBoardArray = [];
    
    for (box = 0; box < gridBoxes.length; box++) {
        _gameBoardArray.push(gridBoxes[box].textContent);
    };

    let currentTurn = player1.playerMarker;
    let currentPlayer = player1.playerName;
    let gameOn = true


    gridBoxes.forEach(box => {
        box.addEventListener("click", () => {
            if (gameOn){
                if (box.textContent == "") {
                    box.textContent = currentTurn;
                    _gameBoardArray[box.id] = currentTurn;
                    checkWinner();
                    if (currentTurn == player1.playerMarker) {
                        currentTurn = player2.playerMarker;
                        currentPlayer = player2.playerName;
                    } else {
                        currentTurn = player1.playerMarker;
                        currentPlayer = player1.playerName;
                    };
                };
            };
        });
    });

    const winConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (x = 0; x < winConditions.length; x++) {
            winCondiditon = winConditions[x];
            console.log(winCondiditon);
            let spot1 = _gameBoardArray[winCondiditon[0]]
            let spot2 = _gameBoardArray[winCondiditon[1]]
            let spot3 = _gameBoardArray[winCondiditon[2]]
            console.log(spot1, spot2, spot3)
            console.log(_gameBoardArray)
            if (spot1 == "" && spot2 == "" && spot3 ==""){
                continue;
            }
            if (spot1 === spot2 && spot2 === spot3){
                alert(`${currentPlayer} HAS WON THE GAME!`)
                gameOn = false
            };
        };
    };
    
})();