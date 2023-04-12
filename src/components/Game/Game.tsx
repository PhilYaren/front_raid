import React from 'react'
import './game.css'

function Game() {

  const rouletteHandler = (e) => {
    e.target.className = 'd15';
    setTimeout(() => {
      e.target.className = 'd10';
    }, 1000 * 5)
  }

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
      <div className='roulette'>
        <div onClick={rouletteHandler} className="d10">
          <div className='pivont-point'>&bull;</div>
        </div>
      </div>
      <div className='deck'>колода и копочка сдаться</div>
      <div className='chat'>
        <div className='massageList'>Здесь будут сообщения</div>
        <form>
          <textarea placeholder='Введите сообщение' />
          <button>👊</button>
        </form>
      </div>
    </div>
  )
}

export default Game
