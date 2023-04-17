import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { chatSocket, socket, sessionSocket } from '../../socket';
import styles from './Home.module.css';
import { Message, Session } from '../../types';
import { actionMessage } from '../../redux/actions/messageActions';
import { setSessions } from '../../redux/actions/sessionsAction';
import {
  setCurrent,
  setDeck, setOrder,
  setPlayers,
  setRoomName,
} from '../../redux/actions/gameActions';
import Modal from '../Modal/Modal';
import CreateAndJoinGame from '../CreateAndJoinGame/CreateAndJoinGame';

function Home() {
  const [form, setForm] = React.useState({ message: '' });
  const messages = useSelector((state: any) => state.messages.messages);
  const user = useSelector((state: any) => state.user.user);
  const sessions = useSelector((state: any) => state.sessions.sessions);
  const [first, setFirst] = React.useState(true);
  const [create, setCreate] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(sessionSocket);
  if (first) {
    sessionSocket.emit('get_rooms');
    setFirst(false);
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, message: event.target.value });
  };

  useEffect(() => {
    socket.on('send_rooms', (data) => {
      dispatch(setSessions(data));
    });
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      userName: user.userName,
      message: form.message,
      time: new Date().toLocaleTimeString('ru-RU'),
    };
    chatSocket.emit('send_message', data);
    setForm({ message: '' });
  };

  useEffect(() => {
    chatSocket.on('receive_message', (message: Message) => {
      dispatch(actionMessage(message));
    });
  }, [chatSocket]);

  const userHomePage = () => {
    const handleButtonGame = () => {
      setCreate(true);
    };
    const handleNewGame = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      let data = Object.fromEntries(formData.entries());

      sessionSocket.emit('create_room', data);
      sessionSocket.on('join_room', ({ name, state }) => {
        dispatch(setRoomName(name));
        dispatch(setDeck(state.deck));
        dispatch(setPlayers(state.players));
        dispatch(setOrder(state.order));
        dispatch(setCurrent(state.current));
        navigate(`/game/${user.id}`);
      });
      setCreate(false);
    };

    const handleJoin = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      path: number,
      roomId: string
    ) => {
      e.preventDefault();
      sessionSocket.emit('join_room', { name: roomId });
      sessionSocket.on('join_room', ({ name, state }) => {
        dispatch(setRoomName(name));
        dispatch(setDeck(state.deck));
        dispatch(setPlayers(state.players));
        dispatch(setOrder(state.order));
        dispatch(setCurrent(state.current));
        navigate(`/game/${path}`);
      });
    };

    return (
      <div className={styles.activeGamesContainer}>
        <div className={styles.activeGames}>
          <h2>Список активных игровых сессий</h2>
          {sessions.map((game: Session) => (
            <div key={game[0]} className="game">
              {game[0]}
              <p>Игроков в комнате: {game[1]}</p>
              <button onClick={(e) => handleJoin(e, game[2], game[0])}>
                Присоединиться
              </button>
            </div>
          ))}
          <button className="create-game-button" onClick={handleButtonGame}>
            Создать игру
          </button>
        </div>
        {create && (
          <Modal active={create} setActive={setCreate}>
            <CreateAndJoinGame handle={handleNewGame} />
            {/* <form onSubmit={handleNewGame}> */}
            {/* <input type="text" placeholder="Название комнаты" name="name" />
            <input
              type="password"
              placeholder="Пароль от сессии"
              name="password"
            />
            <select name="size">
              <option value="2">2 игрока</option>
              <option value="3">3 игрока</option>
            </select>

            <button type="submit">DA</button> */}
            {/* </form> */}
          </Modal>
        )}
        <div className={styles.chatContainer}>
          <>
            <h3>Chat:</h3>
            <div>
              {messages?.map((message: Message, index: number) => {
                return (
                  <div key={index}>
                    <p>{message.userName}</p>
                    <p>{message.time}</p>
                    <div>
                      <p>{message.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <form onSubmit={sendMessage}>
              <input
                placeholder="Message..."
                name="message"
                value={form.message}
                onChange={handleInput}
                type="text"
              />
              <button type="submit">submit</button>
            </form>
          </>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.homeContainer}>
      {user ? (
        <>{userHomePage()}</>
      ) : (
        <div className="game-rules-container">
          <div className="game-rules-cont">
            <div className="opacity-back">
              <h2>Правила игры "Рэйд"</h2>
              <div className="game-rules">
                <li>
                  {' '}
                  Каждому игроку раздается по три карты. Игрок, который ходит
                  первым выбирается случайно. Всего на руках может быть не
                  больше восьми карт.
                </li>
                <li>
                  {' '}
                  Игрок вращает рулетку и двигает фишку на выпавшее количество
                  очков.
                </li>
                <li>
                  {' '}
                  Если фишка попадает на клеточку красного, зеленого, синего или
                  оранжевого цветов, то игрок вызывает противника на поединок.
                  Нужно выбрать карту с большим необходимым параметром: Сила,
                  Магия, Здоровье, Мудрость. В поединке участвует параметр того
                  цвета, на котором стоит фишка.
                </li>
                <li>
                  {' '}
                  Если игрок выигрывает в поединке, его фишка перемещается
                  вперед на количество клеток, указанное на его карте, а если
                  проигрывает - назад на количество клеток карты соперника.
                  Ничья - игрок стоит на месте.
                </li>
                <li>
                  После поединка игроки берут по новой карте. Ходит второй
                  игрок.
                </li>
                <li>
                  Если фишка попадает на фиолетовую клетку, происходит кража
                  карт у соперника. Но, только в том случае, если у них больше
                  двух карт.
                </li>
                <li>
                  Если фишка попадает на белую клетку, то нужно продолжить
                  движение до следующей белой клеточки. А если эта клетка
                  ближайшая к замку, то фишка остается на месте.
                </li>
                <li>
                  Если фишка попадает на черную клетку то, тогда нужно вернуться
                  не предыдущую черную клеточку. А если эта клетка ближайшая к
                  старту, то фишка возвращается на старт.
                </li>
                <li>
                  Если фишка попадает на клетку с "сердечком", тогда нужно взять
                  из колоды карту, а дальше действовать в зависимости от цвета
                  клеточки.
                </li>
                <li>
                  Если фишка попадает на клетку с "цветочком", тогда нужно
                  положить в колоду любую свою карту, а дальше действовать в
                  зависимости от цвета клеточки.
                </li>
                <li>
                  Когда фишка игрока попадает на последнюю красную клетку перед
                  замком, происходит поединок. Если игрок должен сделать больше
                  шагов, чем до последней красной клетки, он все равно
                  становится на неё. Если поединок выигран фишка попадает в
                  замок, если нет - возвращается на нужное количество клеток.{' '}
                </li>
              </div>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Home;
