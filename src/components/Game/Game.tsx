import React, { useEffect, useState } from 'react';
import './game.css';
import GameChat from '../utilities/GameChat/GameChat';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSocket } from '../../socket';
import {
  setColor,
  setCurrent,
  setDeck,
  setModal,
  setOpponents,
  setOrder,
  setPlayers,
  setStarted,
} from '../../redux/actions/gameActions';
import {
  randomDegrees,
  rotateWheel,
  getCurrentColor,
} from '../utilities/rotate-func/rotate';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import BattleModal from '../Modal/BattleModal/BattleModal';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { handleDragEnd, handleDragOver, handleDragStart } from '../dnd/Handles';
import Container from '../dnd/Container';
import { Button } from '@mui/material';
import StaticContainer from '../dnd/StaticContainer';
import { setBattleMessage } from '../../redux/actions/battleMessageActions';
import { moveBack, movement } from '../utilities/Movement/Movement';
import useSound from 'use-sound';
import submitDrumSound from '../../assets/submitCardDrum.wav';
import spinnerSound from '../../assets/spinnerSoundShort3s.mp3';
import clickSound from '../../assets/mouseClick.wav';
import cardFlipSound from '../../assets/Card-flip-sound-effect.mp3';

function Game() {
  // const [modalActive, setModalActive] = useState(false);
  const started = useSelector((state: any) => state.game.started);
  const user = useSelector((state: any) => state.user.user);
  const players = useSelector((state: any) => state.game.players);
  const deck = useSelector((state: any) => state.game.deck);
  const session = useSelector((state: any) => state.game.roomName);
  const order = useSelector((state: any) => state.game.order);
  const current = useSelector((state: any) => state.game.current);
  const modalActive = useSelector((state: any) => state.game.modal);
  const battleColor = useSelector((state: any) => state.game.color);
  const opponents = useSelector((state: any) => state.game.opponents);
  const message = useSelector((state: any) => state.battleMessage.message);
  const id = String(user.id);
  const dispatch = useDispatch();
  const [items, setItems] = useState({
    battleModalplayer1: [],
    // battleModalplayer2: [],
    // playerHand: ['/img/bonaparte.jpg', "/img/Professor.jpg", "/img/dwarf.jpg",],
    playerHand: players[user.id]?.hand,
  });
  const [playCardFlip] = useSound(cardFlipSound);

  useEffect(() => {
    sessionSocket.on('update_state', (state: any) => {
      dispatch(setPlayers(state.players));
      dispatch(setDeck(state.deck));
      dispatch(setOrder(state.order));
      dispatch(setCurrent(state.current));
    });
    sessionSocket.on('set_modal', (modal) => {
      dispatch(setModal(modal));
    });
    sessionSocket.on('set_color', (color) => {
      dispatch(setColor(color));
    });
    sessionSocket.on('set_opponents', (opponents) => {
      dispatch(setOpponents(opponents));
    });
    sessionSocket.on('current', (cur) => {
      dispatch(setCurrent(cur));
    });
    sessionSocket.on('outcome', (outcome, move, state) => {
      const success: string = 'Ведущий игрок продвигается вперед!!!';
      const fail: string = 'Ведущий игрок отступает!!!';
      const draw: string = 'В этом бою вы оба выдохлись.';
      if (outcome === draw) {
        dispatch(setBattleMessage(draw));
        setTimeout(() => {
          sessionSocket.emit('reset_battle', session);
          setItems((prev) => ({ ...prev, battleModalplayer1: [] }));
          dispatch(setBattleMessage(''));
          setTimeout(() => {
            sessionSocket.emit('change_current', session);
          }, 100);
        }, 3500);
      } else {
        if (outcome === success) {
          dispatch(setBattleMessage(success));
          if (state.order[state.current] === id) {
            setTimeout(() => {
              sessionSocket.emit('reset_battle', session);
              setItems((prev) => ({ ...prev, battleModalplayer1: [] }));
              setTimeout(() => {
                movement(
                  state.order,
                  state.current,
                  session,
                  id,
                  state.players,
                  move
                );
              }, 100);
              dispatch(setBattleMessage(''));
            }, 3500);
          } else {
            setTimeout(() => {
              sessionSocket.emit('reset_battle', session);
              setItems((prev) => ({ ...prev, battleModalplayer1: [] }));
              dispatch(setBattleMessage(''));
            }, 3500);
          }
        } else {
          dispatch(setBattleMessage(fail));
          if (state.order[state.current] === id) {
            setTimeout(() => {
              sessionSocket.emit('reset_battle', session);
              setTimeout(() => {
                moveBack(
                  state.order,
                  state.current,
                  session,
                  id,
                  state.players,
                  move
                );
                setItems((prev) => ({ ...prev, battleModalplayer1: [] }));
                dispatch(setBattleMessage(''));
              }, 100);
            }, 3500);
          } else {
            setTimeout(() => {
              sessionSocket.emit('reset_battle', session);
              setItems((prev) => ({ ...prev, battleModalplayer1: [] }));
              dispatch(setBattleMessage(''));
            }, 3500);
          }
        }
      }
    });
  }, [sessionSocket]);
  let currentRotation = 0;

  useEffect(() => {
    order.forEach((p: string) => {
      const playerTd: any = document.getElementById(`${p}player`);
      const newPos = document.getElementById(`${players[p].position}`);
      newPos?.appendChild(playerTd);
    });
    setItems((prev) => ({ ...prev, playerHand: players[user.id]?.hand }));
  }, [players]);

  const [spinnerSoundPlay, { pause }] = useSound(spinnerSound);
  const launchSpin = () => {
    const spin = order[0] !== id ? true : started;
    if (String(id) === order[current] && !modalActive && spin) {
      spinnerSoundPlay();
      currentRotation += randomDegrees();
      rotateWheel(currentRotation).then(() => {
        let winNumber = getCurrentColor(currentRotation);
        // let winNumber = 3;
        let position = players[order[current]].position;
        const finalPosition = position + Number(winNumber);
        const kek = setInterval(() => {
          if (position + 1 <= finalPosition) {
            if (position + 1 === finalPosition) {
              sessionSocket.emit('move_player', {
                room: session,
                data: { id: id, position: 1 },
                last: true,
              });
              const element = document.getElementById(`${position + 1}`);
              const el = element?.dataset;
              const { color, effect } = el;
              const data = {
                color,
                effect: effect || null,
              };
              const opponent =
                order.length === current + 1 ? order[0] : order[current + 1];
              const battlers = { current: order[current], opponent };
              setTimeout(() => {
                sessionSocket.emit('action', session, data, battlers);
              }, 200);
            } else if (position + 1 === 51) {
              sessionSocket.emit('move_player', {
                room: session,
                data: { id: id, position: 1 },
                final: true,
              });
              clearInterval(kek);
            } else {
              sessionSocket.emit('move_player', {
                room: session,
                data: { id: id, position: 1 },
              });
            }
            position += 1;
          } else {
            clearInterval(kek);
          }
        }, 500);
      });
    }
  };

  const [clickSoundPlay] = useSound(clickSound);
  const handleStart = () => {
    if (order.length > 1) {
      dispatch(setStarted(true));
      clickSoundPlay();
      sessionSocket.emit('start_game', session);
    }
  };

  if (!Object.keys(players).find((key: any) => key === id)) {
    return <div>...loading</div>;
  }

  // dnd kit

  useEffect(() => {
    setItems((prevItems) => {
      return {
        ...prevItems,
        playerHand: players[user.id]?.hand || prevItems.playerHand,
      };
    });
  }, [players, user.id]);

  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //battle
  const [submitPlay] = useSound(submitDrumSound);
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (items.battleModalplayer1.length) {
      const crd: any = items.battleModalplayer1[0];
      delete crd.sortable;
      const currentPlayer = order[current];
      sessionSocket.emit(
        'battle',
        session,
        crd,
        id,
        battleColor,
        currentPlayer
      );
      submitPlay();
    }
  }

  return (
    <div className="gamefield">
      <div className="playerField p1">
        <ul className="player1Hand">
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
        <ul className="player2Hand">
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={(e) => {
          playCardFlip();
          handleDragStart(e, setActiveId);
        }}
        onDragOver={(e) => {
          handleDragOver(e, items, setItems);
        }}
        onDragEnd={(e) => {
          playCardFlip();
          handleDragEnd(e, items, setItems, setActiveId);
        }}
      >
        {modalActive && (
          <BattleModal active={modalActive}>
            <div>
              <h3
                style={{
                  color: 'white',
                  fontFamily: 'Zhizn',
                  marginBottom: '30px',
                }}
              >
                Выбери бойца
              </h3>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {opponents &&
                order[current] === id &&
                Object.entries(opponents).length &&
                !opponents[id].length ? (
                  <>
                    <Container
                      id="battleModalplayer1"
                      items={items.battleModalplayer1}
                    />
                    <StaticContainer
                      opponents={opponents}
                      current={order[current]}
                      secret
                    />
                  </>
                ) : null}
                {(opponents &&
                  order[current] === id &&
                  Object.entries(opponents).length &&
                  opponents[id].length) ||
                !(id in opponents) ? (
                  <>
                    <StaticContainer
                      opponents={opponents}
                      first
                      current={order[current]}
                    />
                    <StaticContainer
                      opponents={opponents}
                      current={order[current]}
                    />
                  </>
                ) : null}
                {opponents &&
                order[current] !== id &&
                id in opponents &&
                Object.entries(opponents).length &&
                !opponents[id].length ? (
                  <>
                    <StaticContainer
                      opponents={opponents}
                      first
                      current={order[current]}
                      secret
                    />
                    <Container
                      id="battleModalplayer1"
                      items={items.battleModalplayer1}
                    />
                  </>
                ) : null}
                {order[current] !== id &&
                id in opponents &&
                Object.entries(opponents).length &&
                opponents[id].length ? (
                  <>
                    <StaticContainer
                      opponents={opponents}
                      first
                      current={order[current]}
                    />
                    <StaticContainer
                      opponents={opponents}
                      current={order[current]}
                    />
                  </>
                ) : null}
              </div>
              {message && <div className="gameMessage">{message}</div>}
              {id in opponents && !opponents[id].length && (
                <Button
                  onClick={(e) => handleSubmit(e)}
                  className="btnBattle cssanimation"
                  style={{
                    color: 'white',
                    fontFamily: 'Zhizn',
                    marginTop: '20px',
                  }}
                >
                  В бой
                </Button>
              )}
            </div>
          </BattleModal>
        )}
        <div className="playerField p3">
          <Container id="playerHand" items={items.playerHand} />
        </div>
      </DndContext>
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
              <td
                className="currTd redTd heartTd"
                id="32"
                data-color="red"
                data-effect="heart"
              >
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td className="currTd blackTd" id="31" data-color="black"></td>
              <td></td>
              <td className="currTd blackTd" id="21" data-color="black"></td>
            </tr>
            <tr>
              <td
                className="currTd greenTd flowerTd"
                id="4"
                data-color="green"
                data-effect="flower"
              >
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td></td>
              <td></td>
              <td
                className="currTd redTd heartTd"
                id="39"
                data-color="red"
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
              <td
                className="currTd yellowTd flowerTd"
                id="30"
                data-color="yellow"
                data-effect="flower"
              >
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td></td>
              <td
                className="currTd greenTd flowerTd"
                id="22"
                data-color="green"
                data-effect="flower"
              >
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
            </tr>
            <tr>
              <td className="currTd redTd" id="3" data-color="red"></td>
              <td></td>
              <td></td>
              <td
                className="currTd greenTd flowerTd"
                id="40"
                data-color="green"
                data-effect="flower"
              >
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td></td>
              <td className="currTd finish" id="51" colSpan={2} rowSpan={2}>
                {' '}
                finish
              </td>
              <td className="currTd redTd" id="50" data-color="red"></td>
              <td
                className="currTd blueTd flowerTd"
                id="49"
                data-color="blue"
                data-effect="flower"
              >
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td></td>
              <td className="currTd redTd" id="29" data-color="red"></td>
              <td></td>
              <td
                className="currTd yellowTd heartTd"
                id="23"
                data-color="yellow"
                data-effect="heart"
              >
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
            </tr>
            <tr>
              <td className="currTd blueTd" id="2" data-color="blue"></td>
              <td></td>
              <td></td>
              <td className="currTd blackTd" id="41" data-color="black"></td>
              <td></td>
              <td></td>
              <td className="currTd blackTd" id="48" data-color="black"></td>
              <td></td>
              <td
                className="currTd greenTd heartTd"
                id="28"
                data-color="green"
                data-effect="heart"
              >
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td></td>
              <td className="currTd redTd" id="24" data-color="red"></td>
            </tr>
            <tr>
              <td className="currTd start" id="1" colSpan={2} rowSpan={2}>
                <p>Start</p>
                {order?.map((player: string, i: number, ord: any) => {
                  const arr = ['red', 'blue', 'yellow'];
                  // tranform: translate(-50%, -50%);
                  const pos = -(100 / (ord.length + 1)); // 1: 50, 2: 25, 3: 16.6
                  console.log(pos);
                  return (
                    <span
                      key={player}
                      style={{
                        backgroundColor: arr[i],
                        transform: `translate(${pos * (i + 1)}%, -50%)`,
                      }}
                      className="playerSpan"
                      id={`${player}player`}
                    ></span>
                  );
                })}
              </td>
              <td></td>
              <td className="currTd blueTd" id="42" data-color="blue"></td>
              <td
                className="currTd whiteTd heartTd"
                id="43"
                data-color="white"
                data-effect="heart"
              >
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td
                className="currTd yellowTd heartTd"
                id="44"
                data-color="yellow"
                data-effect="heart"
              >
                <img src="/img/svg/heart-pictogram.svg" alt="heart" />
              </td>
              <td
                className="currTd redTd flowerTd"
                id="45"
                data-color="red"
                data-effect="flower"
              >
                <img src="/img/svg/minimalist_flower_01.svg" alt="flower" />
              </td>
              <td className="currTd blackTd" id="46" data-color="black"></td>
              <td className="currTd greenTd" id="47" data-color="green"></td>
              <td></td>
              <td className="currTd blackTd" id="27" data-color="black"></td>
              <td className="currTd blueTd" id="26" data-color="blue"></td>
              <td className="currTd whiteTd" id="25" data-color="white"></td>
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
        {order[0] === String(id) && !started && (
          <button onClick={handleStart}>Старт</button>
        )}
        <button>Сдаться</button>
      </div>
      <GameChat />
    </div>
  );
}

export default Game;
