import React, {useState} from 'react'
import Board from './Board'


export default function Game(props) {
    const initialHistory = [
        { squares: Array(9).fill(null) }
      ];
      const [history, setHistory] = useState(initialHistory);
      const [xIsNext, setXIsNext] = useState(true);
      const [stepNumber, setStepNumber] = useState(0)
    
      const handleClick = i => {
        const slicedHistory = history.slice(0, stepNumber + 1);
        const finalStepInSlicedHistory = slicedHistory[slicedHistory.length - 1];
        const newSquares = [...finalStepInSlicedHistory.squares];
    
        const winnerDeclared = Boolean(calculateWinner(newSquares));
        const squareAlreadyFilled = Boolean(newSquares[i]);
        if (winnerDeclared || squareAlreadyFilled) return;
    
        newSquares[i] = xIsNext ? 'X' : 'O';
        const newStep = { squares: newSquares };
        const newHistory = [...slicedHistory, newStep];
    
        setHistory(newHistory);
        setXIsNext(!xIsNext);
        setStepNumber(slicedHistory.length);
      };
      const jumpTo = step => {
        setStepNumber(step);
    
        const isEvenStepNumber = step % 2 === 0;
        setXIsNext(isEvenStepNumber);
      };
      const moves = history.map((step, move) => {
        const description = Boolean(move)
          ? `Go to move #${move}`
          : `Go to game start`;
        return (
          <li>
            <button className="btn-description" onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
      });
    
      const currentStep = history[stepNumber];
      const winner = calculateWinner(currentStep.squares);
      const status = winner
        ? `Winner: ${winner}`
        : `Next player: ${xIsNext ? 'X' : 'O'}`;
    
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={currentStep.squares}
              onClick={i => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="game-status">{status}</div>
            <ol>{moves}</ol>
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
