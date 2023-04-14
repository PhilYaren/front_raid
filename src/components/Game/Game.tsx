import React, { useEffect } from 'react';
import './game.css';
import GameChat from '../utilities/GameChat/GameChat';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSocket } from '../../socket';
import { setDeck, setPlayers } from '../../redux/actions/gameActions';
import { currentRotation, randomDegrees, rotateWheel, getCurrentColor } from '../utilities/rotate-func/rotate';

function Game() {

  const user = useSelector((state: any) => state.user.user);
  const players = useSelector((state: any) => state.game.players);
  const deck = useSelector((state: any) => state.game.deck);
  const id = String(user.id);
  const player = players?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    sessionSocket.on('update_state', (state: any) => {
      console.log('players', state.players);
      console.log('deck', state.deck);
      dispatch(setPlayers(state.players));
      dispatch(setDeck(state.deck));
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
      <div className="field">
        <table>
          <tr>
            <td className='currTd blueTd' id='7'></td>
            <td className='currTd greenTd' id='8'></td>
            <td className='currTd yellowTd' id='9'></td>
            <td className='currTd whiteTd' id='10'></td>
            <td className='currTd blackTd' id='11'></td>
            <td className='currTd redTd flowerTd' id='12'><img src="/img/svg/minimalist_flower_01.svg" alt="flower"/></td>
            <td className='currTd violetTd' id='13'></td>
            <td className='currTd greenTd heartTd' id='14'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
            <td className='currTd whiteTd' id='15'></td>
            <td className='currTd blueTd' id='16'></td>
            <td className='currTd yellowTd' id='17'></td>
            <td className='currTd redTd heartTd' id='18'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
            <td className='currTd violetTd' id='19'></td>
          </tr>
          <tr>
            <td className='currTd yellowTd heartTd' id='6'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
            <td ></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className='currTd blueTd heartTd' id='20'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
          </tr>
          <tr>
            <td className='currTd violetTd' id='5'></td>
            <td></td>
            <td></td>
            <td className='currTd violetTd' id='38'></td>
            <td className='currTd blueTd' id='37'></td>
            <td className='currTd yellowTd' id='36'></td>
            <td className='currTd blueTd heartTd' id='35'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
            <td className='currTd greenTd flowerTd' id='34'><img src="/img/svg/minimalist_flower_01.svg" alt="flower"/></td>
            <td className='currTd whiteTd' id='33'></td>
            <td className='currTd redTd heartTd' id='32'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
            <td className='currTd blackTd' id='31'></td>
            <td></td>
            <td className='currTd blackTd' id='21'></td>
          </tr>
          <tr>
            <td className='currTd greenTd flowerTd' id='4'><img src="/img/svg/minimalist_flower_01.svg" alt="flower"/></td>
            <td></td>
            <td></td>
            <td className='currTd redTd heartTd' id='39'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className='currTd yellowTd flowerTd' id='30'><img src="/img/svg/minimalist_flower_01.svg" alt="flower"/></td>
            <td></td>
            <td className='currTd greenTd flowerTd' id='22'><img src="/img/svg/minimalist_flower_01.svg" alt="flower"/></td>
          </tr>
          <tr>
            <td className='currTd redTd' id='3'></td>
            <td></td>
            <td></td>
            <td className='currTd greenTd flowerTd' id='40'><img src="/img/svg/minimalist_flower_01.svg" alt="flower"/></td>
            <td></td>
            <td  className='currTd finish' id='51' colSpan={2} rowSpan={2}> finish</td>
            <td className='currTd redTd' id='50'></td>
            <td className='currTd blueTd flowerTd' id='49'><img src="/img/svg/minimalist_flower_01.svg" alt="flower"/></td>
            <td></td>
            <td className='currTd redTd' id='29'></td>
            <td></td>
            <td className='currTd yellowTd heartTd' id='23'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
          </tr>
          <tr>
            <td  className='currTd blueTd' id='2'></td>
            <td></td>
            <td></td>
            <td  className='currTd blackTd' id='41'></td>
            <td></td>
            <td></td>
            <td  className='currTd blackTd' id='48'></td>
            <td></td>
            <td  className='currTd greenTd heartTd' id='28'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
            <td></td>
            <td  className='currTd redTd' id='24'></td>
          </tr>
          <tr>
            <td  className='currTd start' id='1' colSpan={2} rowSpan={2}>Start</td>
            <td></td>
            <td  className='currTd blueTd' id='42'></td>
            <td  className='currTd whiteTd heartTd' id='43'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
            <td  className='currTd yellowTd heartTd' id='44'><img src="/img/svg/heart-pictogram.svg" alt="heart"/></td>
            <td  className='currTd redTd flowerTd' id='45'><img src="/img/svg/minimalist_flower_01.svg" alt="flower"/></td>
            <td  className='currTd blackTd' id='46'></td>
            <td  className='currTd greenTd' id='47'></td>
            <td></td>
            <td className='currTd blackTd' id='27'></td>
            <td className='currTd blueTd' id='26'></td>
            <td className='currTd whiteTd' id='25'></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
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
