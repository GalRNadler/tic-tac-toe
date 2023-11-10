import React, { useState } from 'react';
import './App.css';
import RestartButton from './RestartButton';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (gameOver || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const gameResult = calculateWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      setGameOver(true);
    }
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setGameOver(false);
  };

  return (
    <div className="App">
      <img src="logo.png" alt="Tic-Tac-Toe Logo" className="logo" />
      <div className="status">{status}</div>
      
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="board-row">
            {Array(3)
              .fill(null)
              .map((_, j) => renderSquare(i * 3 + j))}
          </div>
        ))}
        
      {gameOver && <RestartButton onClick={handleRestart} className="restart-button" />}  
    </div>
  );
            }

export default App ;
