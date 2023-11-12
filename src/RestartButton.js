// RestartButton.js
import React from 'react';
import './App.css';


function RestartButton({ onClick }) {
  return (
    <button onClick={onClick} className='restart-button'>
      Restart
    </button>
  );
}

export default RestartButton;
