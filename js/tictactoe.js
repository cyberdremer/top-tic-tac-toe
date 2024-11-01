const PlayingBoard = (() => {
    let board = [];

    for (let i = 0; i < 9; i++) {
        board.push(" ");
    }
    

    const clearBoard = () => {
        board.forEach((cell) => {
            cell = " ";
        })
    }


    const getGameBoard = () => {
        return board;
    }

    const checkIfGridEmpty = (index) => {
        return board[index] === " " ? true: false; 
    }

    const getContentOfGrid = (index) => {
        return board[index];
    }

    const updateBoard = (index, value) => {
        if (board[index] === " ") {
            board[index] = value;
        }

    }

    const renderBoard = () => {
        const gameGrids = document.querySelector(".game-grids");
        gameGrids.replaceChildren();
        board.forEach((square, index) => {
            createGridsOnDom(document, index, square);
        });

        const grids = document.querySelectorAll(".grid");
        grids.forEach((grid) => {
            grid.addEventListener("click", ()=> Game.handleClick(grid))
        });


    }

    const createGridsOnDom = (doc, index, square) => {
        const gameGrids = doc.querySelector(".game-grids");
        let grid = document.createElement("div");
        grid.className = `grid`;
        grid.textContent = square[index];
        gameGrids.appendChild(grid);
    }



    return { getGameBoard, updateBoard, renderBoard, checkIfGridEmpty, getContentOfGrid, clearBoard };


})();

function Player(name, value) {
    const playerName = name;
    const playerValue = value;

    const getPlayerName = () => playerName;
    const getPlayerValue = () => playerValue;
    return {
        getPlayerName,
        getPlayerValue
    };

}


const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
    let screenMessage = document.getElementById("game-status");



    const returnPlayer = (index) => {
        return players[index];
    }

    const resetGame = () => {
        gameOver = false;
        PlayingBoard.clearBoard();

    }
    const startGame = () => {
        players = [
            Player("David", "X"),
            Player("John", "O")
        ]
        currentPlayerIndex = 0;
        PlayingBoard.renderBoard();

    }

    const handleClick = (grid) => {
        if(gameOver)
            return
        let index = Array.prototype.indexOf.call(grid.parentElement.children, grid);
        if(PlayingBoard.checkIfGridEmpty(index)){
            PlayingBoard.updateBoard(index, players[currentPlayerIndex].getPlayerValue());
            grid.textContent = players[currentPlayerIndex].getPlayerValue();
            renderMoveMessage(screenMessage, players[currentPlayerIndex]);
            if(WinCondition.checkWin(PlayingBoard , players[currentPlayerIndex])){
                renderWinMessage(screenMessage, players[currentPlayerIndex]);
                gameOver = true;
            
            }
            else{
                currentPlayerIndex = currentPlayerIndex === 1 ? 0 : 1;
            }
            

        }
        
        



    }

    const renderMoveMessage = (element, player) =>{
        element.style.display = "block";
        element.textContent = `Player: ${player.getPlayerName()} has made their move`;
    }

    const stopRenderingMessage = (element) => {
        element.style.display = "none";
    }

    const renderWinMessage = (element, player) => {
        element.style.display = "block";
        element.textContent = `Player: ${player.getPlayerName()} has won the game`;
    }
    


    return { returnPlayer, resetGame, startGame, handleClick };


})();


const button = document.getElementById("render-grids");
button.addEventListener("click", ()=>{
    Game.startGame();
})

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", ()=> {
    Game.resetGame();
})


const WinCondition = (() => {
    const winningCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];


    // Work on the logic for checking for a win.
    const checkWin = (gameBoard, player) => {
        let gameWon = false;
        for(let i = 0; i < winningCombo.length; i++){
            if(checkWinHelper(winningCombo[i], gameBoard, player.getPlayerValue())){
                gameWon = true;
                return gameWon;
            }

        }
        return gameWon;
    }

    const checkWinHelper = (combo, board, playerMark) => {
        const [idxOne, idxTwo, idxThree] = combo;
        if(board.getContentOfGrid(idxOne) === playerMark &&
            board.getContentOfGrid(idxTwo) === playerMark &&
        board.getContentOfGrid(idxThree) === playerMark){
            return true;
        }
        return false;

    }

    

    return {checkWin};

})();










