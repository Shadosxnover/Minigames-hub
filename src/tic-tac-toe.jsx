import React, { useState } from 'react';

function App() {
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winGoal, setWinGoal] = useState(3);
  const [darkMode, setDarkMode] = useState(false);
  const [gameBoard, setGameBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [gameOver, setGameOver] = useState(false);
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  const handlePlayerNameChange = (e, player) => {
    if (player === 'player1') {
      setPlayer1Name(e.target.value);
    } else {
      setPlayer2Name(e.target.value);
    }
  };

  const handleWinGoalChange = (e) => {
    setWinGoal(e.target.value);
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleGameBoardClick = (index) => {
    if (gameOver || gameBoard[index] !== '') return;
  
    const newGameBoard = [...gameBoard];
    newGameBoard[index] = turn;
    setGameBoard(newGameBoard);
  
    const gameWon = checkForWinner(newGameBoard);
  
    if (!gameWon) {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  };
  

  const checkForWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setGameOver(true);
        setWinner(board[a]);
        if (board[a] === 'X') {
          setPlayer1Score(player1Score + 1);
        } else {
          setPlayer2Score(player2Score + 1);
        }
        return true;
      }
    }
  
    if (!board.includes('')) {
      setGameOver(true);
      setWinner('Tie');
      return true;
    }
  
    return false;
  };  
  
  const handleReset = () => {
    setGameBoard(['', '', '', '', '', '', '', '', '']);
    setGameOver(false);
    setTurn('X');
    setWinner(null);
    setPlayer1Score(0);
    setPlayer2Score(0);
  };
  const restartGame = () => {
    setGameBoard(['', '', '', '', '', '', '', '', '']);
    setGameOver(false);
    setTurn('X');
    setWinner(null);
  };
  

  return (
    <div className={`h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex justify-between items-center p-4">
        <h1 className={`text-6xl font-bold text-center mx-auto ${darkMode ? 'text-white' : 'text-black'}`}>
          Tic Tac Toe
        </h1>
        <button
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          onClick={handleDarkModeChange}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-center items-center p-4">
        <div className="mr-4">
          <input
            type="text"
            value={player1Name}
            onChange={(e) => handlePlayerNameChange(e, 'player1')}
            className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          />
          <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
            Score: {player1Score}
          </p>
        </div>
        <div>
          <input
            type="text"
            value={player2Name}
            onChange={(e) => handlePlayerNameChange(e, 'player2')}
            className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          />
          <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
            Score: {player2Score}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center p-4">
        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
          {turn === 'X' ? player1Name : player2Name}'s turn
        </p>
      </div>
      <div className="flex justify-center items-center p-4">
        <div className="grid grid-cols-3 gap-4">
          {gameBoard.map((cell, index) => (
            <button
              key={index}
              className={`p-4 w-24 h-24 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} ${
                cell === 'X' ? 'text-blue-500' : cell === 'O' ? 'text-red-500' : ''
              }`}
              onClick={() => handleGameBoardClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
    {gameOver && (
    <div className="flex justify-center items-center p-4">
      <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
        {winner ? `${winner === 'X' ? player1Name : player2Name} wins!` : 'It\'s a tie!'}
      </p>
      <button
        className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mx-2`}
        onClick={restartGame}
      >
        Restart Round
      </button>
      <button
        className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mx-2`}
        onClick={handleReset}
      >
        Reset Game
      </button>
    </div>
  )}
      <div className="flex justify-center items-center p-4">
        <label className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
          Win Goal:
          <input
            type="number"
            value={winGoal}
            onChange={handleWinGoalChange}
            className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
