import React from 'react'
import './game.css'

function Game() {

  // const blabla = (e) => {
  //   e.target.classList = 'cssanimation flipYZoomOut';
  // }

  return (
    <div className='gamefield'>
      <div className='playerField p1'>поле игрока 1</div>
      <div className='playerField p2'>поле игрока 2</div>
      <div className='playerField p3'>
      {/*например (убрать позже)*/}
        <ul>
          <li><img src="../../../public/img/bonaparte.jpg" alt=""/></li>
          <li><img src="../../../public/img/bonaparte.jpg" alt=""/></li>
          <li><img src="../../../public/img/bonaparte.jpg" alt=""/></li>
          <li><img src="../../../public/img/bonaparte.jpg" alt=""/></li>
          <li><img src="../../../public/img/bonaparte.jpg" alt=""/></li>
          <li><img src="../../../public/img/bonaparte.jpg" alt=""/></li>
        </ul>
      </div>
      <div className='field'>игровое поле</div>
      <div className='roulette'>колесико</div>
      <div className='deck'>колода и копочка сдаться</div>
    </div>
  )
}

export default Game
