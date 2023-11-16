import React, { useState, useEffect } from "react";

import "./App.css";
import RestartButton from "./RestartButton";
import { lines } from "./utils";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState(xIsNext ? "Next player: X" : "Next player: O");
  const [isTie, setTie] = useState(false);

  function calculateTie() {
    if (!board.includes(null) && !gameOver) {
      setGameOver(true);
      setTie(true);
      setXIsNext(true);
      setStatus('Its a TIE');
    }
  }

  useEffect(calculateTie, [board]);

  

  const calculateWinner = (squares) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (gameOver || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setStatus ( winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "O" : "X"}`);

    const gameResult = calculateWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      setGameOver(true);
      setStatus(`Winner: ${gameResult}`);
      setXIsNext(true);
      

      
    }
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)} key={i}>
      {board[i]}
    </button>
  );

  

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setGameOver(false);
    setStatus (`Next player: ${xIsNext ? "X" : "O"}`)

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

      {gameOver && (
        <RestartButton onClick={handleRestart} className="restart-button" />
      )}
    </div>
  );
}

export default App;
