import React, { useEffect } from 'react';
import './game.css';
import GameChat from '../utilities/GameChat/GameChat';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSocket } from '../../socket';
import {
  setCurrent,
  setDeck,
  setOrder,
  setPlayers,
} from '../../redux/actions/gameActions';
import {
  currentRotation,
  randomDegrees,
  rotateWheel,
  getCurrentColor,
} from '../utilities/rotate-func/rotate';

function Game() {
  const user = useSelector((state: any) => state.user.user);
  const players = useSelector((state: any) => state.game.players);
  const deck = useSelector((state: any) => state.game.deck);
  const session = useSelector((state: any) => state.game.roomName);
  const order = useSelector((state: any) => state.game.order);
  const current = useSelector((state: any) => state.game.current);
  const id = String(user.id);
  const dispatch = useDispatch();
  console.log('order', order);

  useEffect(() => {
    sessionSocket.on('update_state', (state: any) => {
      // console.log('players', state.players);
      // console.log('deck', state.deck);
      dispatch(setPlayers(state.players));
      dispatch(setDeck(state.deck));
      dispatch(setOrder(state.order));
      dispatch(setCurrent(state.current));
    });
  }, [sessionSocket]);
  let currentRotation = 0;

  useEffect(() => {
    order.forEach((p: string) => {
      const playerTd: any = document.getElementById(`${p}player`);
      const newPos = document.getElementById(`${players[p].position}`);
      newPos?.appendChild(playerTd);
    });
  }, [players]);

  const launchSpin = () => {
    currentRotation += randomDegrees();
    rotateWheel(currentRotation).then(() => {
      let winNumber = getCurrentColor(currentRotation);
      let position = players[order[current]].position;
      const finalPosition = position + Number(winNumber);
      const kek = setInterval(() => {
        if (position + 1 <= finalPosition) {
          sessionSocket.emit('move_player', {
            room: session,
            data: { id: id, position: 1 },
          });
          console.log(`position ${position}`);
          position += 1;
          console.log('da');
        } else {
          clearInterval(kek);
        }
      }, 500);
    });
  };

  const handleStart = () => {
    sessionSocket.emit('start_game', session);
  };

  if (!Object.keys(players).find((key: any) => key === id)) {
    return <div>...loading</div>;
  }

  return (
    <div className="gamefield">
      <div className="playerField p1">
        <ul>
          {order && order.filter((player: any) => player !== id)[0]
            ? players[order.filter((player: any) => player !== id)[0]].hand.map(
                (card: any) => {
                  return (
                    <li key={card.id}>
                      <img src="/img/cover.jpg" alt="" />
                    </li>
                  );
                }
              )
            : null}
        </ul>
      </div>
      <div className="playerField p2">
        <ul>
          {order && order.filter((player: any) => player !== id)[1]
            ? players[order.filter((player: any) => player !== id)[1]].hand.map(
                (card: any) => {
                  return (
                    <li key={card.id}>
                      <img src="/img/cover.jpg" alt="" />
                    </li>
                  );
                }
              )
            : null}
        </ul>
      </div>
      <div className="playerField p3">
        <ul>
          {players[id].hand?.map((card: any) => {
            return (
              <li key={card.id}>
                <img src={card.image} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="field">
        <table>
          <tbody>
            <tr>
              <td className="currTd blueTd" id="7" data-color="blue">
                {' '}
              </td>
              <td className="currTd greenTd" id="8" data-color="green"></td>
              <td className="currTd yellowTd" id="9" data-color="yellow"></td>
              <td className="currTd whiteTd" id="10" data-color="white"></td>
              <td className="currTd blackTd" id="11" data-color="black"></td>
              <td
                className="currTd redTd flowerTd"
                id="12"
                data-effect="flower"
                data-color="red"
              >
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td className="currTd violetTd" id="13" data-color="violet"></td>
              <td
                className="currTd greenTd heartTd"
                id="14"
                data-color="green"
                data-effect="heart"
              >
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td className="currTd whiteTd" id="15" data-color="white"></td>
              <td className="currTd blueTd" id="16" data-color="blue"></td>
              <td className="currTd yellowTd" id="17" data-color="yellow"></td>
              <td
                className="currTd redTd heartTd"
                id="18"
                data-color="red"
                data-effect="heart"
              >
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td className="currTd violetTd" id="19" data-color="violet"></td>
            </tr>
            <tr>
              <td
                className="currTd yellowTd heartTd"
                id="6"
                data-color="yellow"
                data-effect="heart"
              >
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
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
              <td
                className="currTd blueTd heartTd"
                id="20"
                data-color="blue"
                data-effect="heart"
              >
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
            </tr>
            <tr>
              <td className="currTd violetTd" id="5" data-color="violet"></td>
              <td></td>
              <td></td>
              <td className="currTd violetTd" id="38" data-color="violet"></td>
              <td className="currTd blueTd" id="37" data-color="blue"></td>
              <td className="currTd yellowTd" id="36" data-color="yellow"></td>
              <td
                className="currTd blueTd heartTd"
                id="35"
                data-color="blue"
                data-effect="heart"
              >
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td
                className="currTd greenTd flowerTd"
                id="34"
                data-color="green"
                data-effect="flower"
              >
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td className="currTd whiteTd" id="33" data-color="white"></td>
              <td className="currTd redTd heartTd" id="32">
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td className="currTd blackTd" id="31"></td>
              <td></td>
              <td className="currTd blackTd" id="21"></td>
            </tr>
            <tr>
              <td className="currTd greenTd flowerTd" id="4">
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td></td>
              <td></td>
              <td className="currTd redTd heartTd" id="39">
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="currTd yellowTd flowerTd" id="30">
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td></td>
              <td className="currTd greenTd flowerTd" id="22">
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
            </tr>
            <tr>
              <td className="currTd redTd" id="3"></td>
              <td></td>
              <td></td>
              <td className="currTd greenTd flowerTd" id="40">
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td></td>
              <td className="currTd finish" id="51" colSpan={2} rowSpan={2}>
                {' '}
                finish
              </td>
              <td className="currTd redTd" id="50"></td>
              <td className="currTd blueTd flowerTd" id="49">
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td></td>
              <td className="currTd redTd" id="29"></td>
              <td></td>
              <td className="currTd yellowTd heartTd" id="23">
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
            </tr>
            <tr>
              <td className="currTd blueTd" id="2"></td>
              <td></td>
              <td></td>
              <td className="currTd blackTd" id="41"></td>
              <td></td>
              <td></td>
              <td className="currTd blackTd" id="48"></td>
              <td></td>
              <td className="currTd greenTd heartTd" id="28">
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td></td>
              <td className="currTd redTd" id="24"></td>
            </tr>
            <tr>
              <td className="currTd start" id="1" colSpan={2} rowSpan={2}>
                <p>Start</p>
                {order?.map((player: string) => {
                  return (
                    <span
                      key={player}
                      className="playerSpan"
                      id={`${player}player`}
                    >
                      тчк
                    </span>
                  );
                })}
              </td>
              <td></td>
              <td className="currTd blueTd" id="42"></td>
              <td className="currTd whiteTd heartTd" id="43">
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td className="currTd yellowTd heartTd" id="44">
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td className="currTd redTd flowerTd" id="45">
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td className="currTd blackTd" id="46"></td>
              <td className="currTd greenTd" id="47"></td>
              <td></td>
              <td className="currTd blackTd" id="27"></td>
              <td className="currTd blueTd" id="26"></td>
              <td className="currTd whiteTd" id="25"></td>
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
          </tbody>
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
      <div className="deck" style={{ color: 'whitesmoke' }}>
        <div>Карт в колоде {deck?.length}</div>
        <button onClick={handleStart}>Старт</button>
        <button>Сдаться</button>
      </div>
      <GameChat />
    </div>
  );
}

export default Game;
