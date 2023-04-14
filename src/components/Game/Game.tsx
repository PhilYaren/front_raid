import React, { useEffect } from 'react';
import './game.css';
import GameChat from '../utilities/GameChat/GameChat';
import { useSelector } from 'react-redux';
import { sessionSocket } from '../../socket';
import { currentRotation, randomDegrees, rotateWheel, getCurrentColor } from '../utilities/rotate-func/rotate';

function Game() {

  const user = useSelector((state: any) => state.user.user);
  const players = useSelector((state: any) => state.game.players);

  const player = players.find((player: any) => player.name === user.UserName);

  useEffect(() => {
    sessionSocket.on('set_players', (sessions: any) => {
      console.log(sessions);
    });
  }, [sessionSocket]);

  const launchSpin = () => {
    let currentRotation = 0;
    currentRotation += randomDegrees();

    rotateWheel(currentRotation)
      .then(() => {
        let winNumber = getCurrentColor(currentRotation);
        console.log(winNumber);
        //отправить результат winNumber
      });
  }

  return (
    <div className="gamefield">
      <div className="playerField p1">поле игрока 1</div>
      <div className="playerField p2">поле игрока 2</div>
      <div className="playerField p3">
        {/*например (убрать позже)*/}
        <ul>
          <li>
            <img src="/img/bonaparte.jpg" alt="" />
          </li>
          <li>
            <img src="/img/bonaparte.jpg" alt="" />
          </li>
          <li>
            <img src="/img/bonaparte.jpg" alt="" />
          </li>
          <li>
            <img src="/img/bonaparte.jpg" alt="" />
          </li>
          <li>
            <img src="/img/bonaparte.jpg" alt="" />
          </li>
          <li>
            <img src="/img/bonaparte.jpg" alt="" />
          </li>
        </ul>
      </div>
      <div className="field">игровое поле</div>
      <div className="roulette">
        <div className="arrow"></div>
        <div className="wheel rotating" onClick={launchSpin}>
          <p id="num1">1</p>
          <p id="num2">2</p>
          <p id="num3">3</p>
          <p id="num4">4</p>
          <p id="num5">5</p>
          <p id="num6">6</p>
        </div>
      </div>
      <div className="deck">колода и копочка сдаться</div>
      <GameChat />
    </div>
  );
}

export default Game;
