import React, { useState, useEffect } from "react";
import Board from "./Board";
import pug from "../images/pug.png";

export default function Game(props) {
  const initialHistory = [{ squares: Array(9).fill(null) }];
  const [history, setHistory] = useState(initialHistory);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      `https://ftw-highscores.herokuapp.com/tictactoe-dev?reverse=true`
    );
    const data = await response.json();
    console.log("f", data);
    setTopScores(data.items);
  };

  const postScore = async () => {
    console.log("Posting...");

    let data = new URLSearchParams();
    data.append("player", "HANG");
    data.append("score", 102929291);
    console.log(data);

    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev?reverse=true`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    const resp = await response.json();
    console.log("211232", resp);
  };

  //   const handleClick = i => {
  //     const slicedHistory = history.slice(0, stepNumber + 1);
  //     const current = slicedHistory[slicedHistory.length - 1];
  //     let squares = current.squares.slice();

  //     const winner = calculateWinner(squares)

  //     const newSquares = [...current.squares];

  //     const squareAlreadyFilled = Boolean(newSquares[i]);

  //     newSquares[i] = xIsNext ? "X" : "O";
  //     const newStep = { squares: newSquares };

  //     if (winner || squareAlreadyFilled) return;
  //     const newHistory = [...slicedHistory, newStep];

  //     setHistory(newHistory);
  //     setXIsNext(!xIsNext);
  //     setStepNumber(slicedHistory.length);
  //   };
  //   const jumpTo = step => {
  //     setStepNumber(step);

  //     const isEvenStepNumber = step % 2 === 0;
  //     setXIsNext(isEvenStepNumber);
  //   };
  //   const moves = history.map((step, move) => {
  //     const description = Boolean(move)
  //       ? `Go to move #${move}`
  //       : `Go to game start`;
  //     return (
  //       <li key={move}>
  //         <button className="btn-description" onClick={() => jumpTo(move)}>
  //           {description}
  //         </button>
  //       </li>
  //     );
  //   });

  //   const currentStep = history[stepNumber];
  //   const winner = calculateWinner(currentStep.squares);
  //   const status = winner
  //     ? `Winner: ${winner}`
  //     : `Next player: ${xIsNext ? "X" : "O"}`;

  //   winner && postScore();
  const handleClick = i => {
    const slicedHistory = history.slice(0, stepNumber + 1);
    const finalStepInSlicedHistory = slicedHistory[slicedHistory.length - 1];
    const newSquares = [...finalStepInSlicedHistory.squares];

    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareAlreadyFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squareAlreadyFilled) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
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
    const description = move ? `Go to move #${move}` : `Go to game start`;
    return (
      <li key={move}>
        <button className="btn-description"  onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const currentStep = history[stepNumber];

  const winner = calculateWinner(currentStep.squares);

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  winner && postScore();
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentStep.squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="game-status">{status}</div>
        <ol>{moves}</ol>
      </div>
      <div className="topscores">
        <h2>TOPSCORE</h2>
        {topScores.map(e => (
          <li className="score-list" key={e._id}>
            {e.player}
            <span> with score</span>
            {e.score}
          </li>
        ))}
      </div>
      <img className="pug" src={pug} alt="heo" />
    </div>
  );
}

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
    [2, 4, 6]
  ]; // shows all of the winning combinations ("lines")

  // Iterate over all the winning line combinations to see if the
  // input squares array has one of the with all 'X's or all 'O's.
  // If it does, return 'X' or 'O'.
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // If none of the winning line combinations is contained in
  // input squares array, return null...
  return null;
}
