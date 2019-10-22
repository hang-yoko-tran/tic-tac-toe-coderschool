import React, {useState} from 'react';

import './App.css';

const Square = props => {
  const [value, setValue] = useState(null);

  return (
    <button
      className="square"
      onClick={() => setValue('X')} /* updated line */
    >
      {value} {/* updated line */}
    </button>
  );
};

const Board = props => {
  const initialSquares = Array(9).fill(null); /* added line */
  const [squares, setSquares] = useState(initialSquares); /* added line */
 return (
   initialSquares.map(() => {
     <Square/
   })
 )

}




function App() {
  return (
    <div className="App">
      <Board/>
    </div>
  )}

  export default App
