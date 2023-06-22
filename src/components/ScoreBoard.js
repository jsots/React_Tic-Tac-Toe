import React from 'react'
import "./ScoreBoard.css"

export const Scoreboard = ({scores, xTurn}) => {
    const {xScore, oScore} = scores;

    return (
    <div className="scoreboard">
        <span className={`score x-score ${!xTurn && "inactive"}`}> X - {xScore}</span>
        <span className={`score o-score ${xTurn && "inactive"}`}> O - {oScore}</span>
    </div>
  )
}
