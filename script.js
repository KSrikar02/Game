document.addEventListener('DOMContentLoaded', () => {
    const playertext = document.getElementById('playertext');
    const restartBtn = document.getElementById('restartbtn');
    const gameboard = document.getElementById('gameboard');
    const boxes = document.querySelectorAll('.box');

    let currentPlayer = 'X';
    let gameBoardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoardState[a] && gameBoardState[a] === gameBoardState[b] && gameBoardState[a] === gameBoardState[c]) {
                return gameBoardState[a];
            }
        }

        if (!gameBoardState.includes('')) {
            return 'T'; // Tie
        }

        return null; // No winner yet
    };

    const handleBoxClick = (index) => {
        if (!gameActive || gameBoardState[index] !== '') {
            return;
        }

        gameBoardState[index] = currentPlayer;
        boxes[index].textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            if (winner === 'T') {
                playertext.textContent = "It's a Tie!";
            } else {
                playertext.textContent = `${winner} wins!`;
            }
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playertext.textContent = `${currentPlayer}'s turn`;
        }
    };

    const restartGame = () => {
        currentPlayer = 'X';
        gameBoardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        playertext.textContent = `${currentPlayer}'s turn`;

        boxes.forEach((box) => {
            box.textContent = '';
        });
    };

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => handleBoxClick(index));
    });

    restartBtn.addEventListener('click', restartGame);
});
