import './App.css';
import React, {useState} from "react";
import {Board} from "./components/Board.js";
import { Scoreboard } from './components/ScoreBoard.js';
import { ResetButton } from './components/ResetButton.js';

function App() {
  // Create the win conditions.
  const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const [board, setBoard] = useState(Array(9).fill(null))
  const [xTurn, setXTurn] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0})
  const [gameOver, setGameOver] = useState(false)


  const handleBoxClick = (boxidx) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx == boxidx) {
        return xTurn === true ? "X" : "O";
      } else {
        return value;
      }
    })

    const winner = checkWinner(updatedBoard);
    if(winner) {
      if (winner === "O") {
        let {oScore} = scores;
        oScore += 1;
        setScores({...scores, oScore});
      } else {
        let {xScore} = scores;
        xScore += 1;
        setScores({...scores, xScore});
      }
    } 

    setBoard(updatedBoard);

    setXTurn(!xTurn);
  }

  const checkWinner = (board) => {

    for(let i=0; i<winConditions.length; i++) {
      // Now, find the three boxes that will need to have the same letter to check for a winner. 
      const [x,y,z] = winConditions[i];

      // Check if the box is filled, and then check to make sure that it equals the other three boxes to determine a win/ 
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null))
  }

  return (
    <div className="App">
      <Scoreboard scores = {scores} xTurn={xTurn} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick}/>
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
