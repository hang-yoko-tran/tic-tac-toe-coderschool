import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = props => {
    return (
      <button 
      className="square" 
      onClick={props.onClickProp}>
        {props.value}
      </button>
    );
  };

const Board = props => {
   const initialSquares = Array(9).fill(null)
   const [squares, setSquares] = useState(initialSquares)
   const [xIsNext, setXIsNext] = useState(true)
   const handleClick = i => {
    const newSquares = [...squares]

    const winnerDeclared = Boolean(calculateWinner(newSquares))
    const squareAlreadyFilled = Boolean(newSquares[i])
    

    if(!winnerDeclared && !squareAlreadyFilled){
      newSquares[i] = xIsNext ? "X" : "O"
      setSquares(newSquares)
      setXIsNext(!xIsNext)
    }

    // if (winnerDeclared || squareAlreadyFilled) 
    // return
    // newSquares[i] = xIsNext ? "X" : "O"
    // setSquares(newSquares)
    // setXIsNext(!xIsNext)
    
   }

  const renderSquare = i => {
    return <Square value={squares[i]} onClickProp={() => handleClick(i)} />;
  };



  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;



  return (
    <div>
      <div className="status">
        {status}
      </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = props => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

/**
 * calculateWinner (helper function)
 *
 * Parameter: squares (array of 'X', '0', or null)
 * Return value: 'X', 'O', or null
 */
function calculateWinner(squares) {
  /* Squares indexes as they appear in UI:
  0 1 2
  3 4 5
  6 7 8
  */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; // shows all of the winning combinations ("lines")

  // Iterate over all the winning line combinations to see if the 
  // input squares array has one of the with all 'X's or all 'O's.
  // If it does, return 'X' or 'O'.
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  // If none of the winning line combinations is contained in 
  // input squares array, return null...
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);