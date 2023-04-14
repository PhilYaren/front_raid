import React, { useState } from 'react'
import './GameField.css';

function GameField() {
    const [gameState, setGameState] = useState({
        player1Pos: 0,
        player2Pos: 0,
        numSquares: 50,
        gameOver: false
      });

    const field = () => {
        return (
            <div className='fields'>
                <div className='up'>
                {Array.from({ length: 13 }).map((_, index) => (
                <div key={index+6} className="game-cell">
                {index+6}
                </div>
                 ))}
                </div>
                <div className='center'>
                    <div className='center-left'>
                    {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="game-cell">
                {index}
                </div>
                 ))}
                    </div>
                    <div className='center-center'></div>
                    <div className='center-right'>
                    {Array.from({ length: 6 }).map((_, index) => (
                <div key={index+19} className="game-cell">
                {index+19}
                </div>
                 ))}
                    </div>
                </div>
            </div>
        )
    }

  return (
    <>
        <h2>GameField</h2>
        {field()}
         {/* {Array.from({ length: gameState.numSquares }).map((_, index) => (
        <div key={index} className="game-cell">
          {index}
          {gameState.player1Pos === index && <div className="game-piece player1"></div>}
          {gameState.player2Pos === index && <div className="game-piece player2"></div>}
        </div>
      ))} */}
    </>
  )
}

export default GameField