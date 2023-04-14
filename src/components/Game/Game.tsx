import React, { useEffect } from 'react';
import './game.css';
import GameChat from '../utilities/GameChat/GameChat';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSocket } from '../../socket';
import { setDeck, setPlayers } from '../../redux/actions/gameActions';

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

  const rouletteHandler = (e) => {
    e.target.className = 'd15';
    setTimeout(() => {
      e.target.className = 'd10';
    }, 1000 * 5);
  };

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
        <div onClick={rouletteHandler} className="d10">
          <div className="pivont-point">&bull;</div>
        </div>
      </div>
      <div className="deck">колода и копочка сдаться</div>
      <GameChat />
    </div>
  );
}

export default Game;
