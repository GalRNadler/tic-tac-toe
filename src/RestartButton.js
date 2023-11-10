// RestartButton.js
import React from 'react';
import './App.css';


function RestartButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Restart
    </button>
  );
}

export default RestartButton;
