import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Index() {
  const [board, updateBoard] = useState(Array(42).fill(null));
  const [player, setPlayer] = useState('playerOne');
  const [gameOver, setgameOver] = useState(false);
  const [winnerMsg, setWinnerMsg] = useState("");

  function refreshPage() {
    window.location.reload();
  }

  const checkWinningSlice = (miniBoard) => {
    if (miniBoard.some(cell => cell === null)) return false;

    if (
      miniBoard[0] === miniBoard[1] &&
      miniBoard[1] === miniBoard[2] &&
      miniBoard[2] === miniBoard[3]
    ) {
      return miniBoard[1];
    }

    return false;
  };


  const getGameState = (board) => {
    // Checks wins horizontally
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c <= 4; c++) {
        const index = r * 7 + c;
        const boardSlice = board.slice(index, index + 4);   // cuts the array into smaller chuncks with 4 indexes

        const winningResult = checkWinningSlice(boardSlice);  // checks if the array contains empty spaces or has 4 matching values. returns true / false
        if (winningResult !== false) return winningResult;
      }
    }

    // check wins vertically
    for (let r = 0; r <= 2; r++) {
      for (let c = 0; c < 7; c++) {
        const index = r * 7 + c;
        const boardSlice = [
          board[index],
          board[index + 7],
          board[index + 7 * 2],
          board[index + 7 * 3]
        ];

        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) return winningResult;
      }
    }

    // check wins diagonally
    for (let r = 0; r <= 2; r++) {
      for (let c = 0; c < 7; c++) {
        const index = r * 7 + c;

        // Checks diagonal down-left
        if (c >= 3) {
          const boardSlice = [
            board[index],
            board[index + 7 - 1],
            board[index + 7 * 2 - 2],
            board[index + 7 * 3 - 3]
          ];

          const winningResult = checkWinningSlice(boardSlice);
          if (winningResult !== false) return winningResult;
        }

        // Checks diagonal down-right
        if (c <= 3) {
          const boardSlice = [
            board[index],
            board[index + 7 + 1],
            board[index + 7 * 2 + 2],
            board[index + 7 * 3 + 3]
          ];

          const winningResult = checkWinningSlice(boardSlice);
          if (winningResult !== false) return winningResult;
        }
      }
    }
  };

  const lowestIndex = (column) => {         // start from last index then go up. Checks where value is null
    for (let i = 35 + column; i >= 0; i -= 7) {
      if (board[i] === null) return i
    }
    return -1
  }

  const handleClick = (index) => {

    const column = index % 7    // % = modelus  index / 7 
    const newBoard = [...board]   // spread operatior
    const test = lowestIndex(column);   // finds the first null and starts from the button of the colum
    newBoard[test] = player;    // sets player to the index
    const winner = getGameState(newBoard);  // the winner function winner is play 1 / 2 or undefined
    if (winner) {
      setgameOver(true);
      setWinnerMsg(player + ' has won')
    }
    updateBoard(newBoard);
    if(test >= 0) {
      setPlayer(player === 'playerOne' ? 'playerTwo' : 'playerOne')
    }
  }

  return (
    <div className="container">
      <h1>{player}'s turn</h1>
      <button onClick={refreshPage}>Reset</button>
      <h1>{winnerMsg}</h1>
      <div className="App">
        <div className="board">
          {board.map((item, index) => {
            let player;
            if (item === 'playerOne') player = 'playerOne'
            if (item === 'playerTwo') player = 'playerTwo'
            return <div data-player={player} key={index} className='board-item' onClick={gameOver ? () => { } : () => handleClick(index)} />
          })}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById('root')); 