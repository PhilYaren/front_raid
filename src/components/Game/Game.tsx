import React from 'react'
import './game.css'

function Game() {

  const rouletteHandler = (e) => {
    e.target.style.animation = '3s linear infinite rotate;'
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
      <div onClick={rouletteHandler}  className='roulette'>
        <div className="d15">
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
