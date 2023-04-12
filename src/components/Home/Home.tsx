import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { chatSocket, socket, sessionSocket } from '../../socket';
import styles from './Home.module.css';
import { Message } from '../../types';
import { actionMessage } from '../../redux/actions/messageActions';

function Home() {
  const [form, setForm] = React.useState({ message: '' });
  const messages = useSelector((state: any) => state.messages.messages);
  const user = useSelector((state: any) => state.user.user);
  const [create, setCreate] = React.useState(false);
  const dispatch = useDispatch();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, message: event.target.value });
  };

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
    const activeGames = [
      { id: 1, name: 'Game 1', players: 0 },
      { id: 2, name: 'Game 2', players: 0},
      { id: 3, name: 'Game 3', players: 0 },
    ];

    const handleButtonGame = () => {
      setCreate(true);
    }
    const handleNewGame = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      sessionSocket.emit('create_room');
    }

    return (
      <div className={styles.activeGamesContainer}>
        {!create ? (
          <div className={styles.activeGames}>
            <h2>Список активных игровых сессий</h2>
            {activeGames.map((game) => (
              <div key={game.id} className="game">
                {game.name}
                <p>Игроков в комнате: {game.players}</p>
                <button>Присоединиться</button>
              </div>
            ))}
            <button className="create-game-button" onClick={handleButtonGame}>Создать игру</button>
          </div>
        ) : (
          <form onSubmit={handleNewGame}>
            <input type="text" placeholder='Название комнаты'/>
            <button>DA</button>
          </form>
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
          <h2>Правила игры "Рэйд"</h2>
          <ul className="game-rules">
            <li>
              {' '}
              Каждому игроку раздается по три карты. Игрок, который ходит первым
              выбирается случайно. Всего на руках может быть не больше восьми
              карт.
            </li>
            <li>
              {' '}
              Игрок вращает рулетку и двигает фишку на выпавшее количество
              очков.
            </li>
            <li>
              {' '}
              Если фишка попадает на клеточку красного, зеленого, синего или
              оранжевого цветов, то игрок вызывает противника на поединок. Нужно
              выбрать карту с большим необходимым параметром: Сила, Магия,
              Здоровье, Мудрость. В поединке участвует параметр того цвета, на
              котором стоит фишка.
            </li>
            <li>
              {' '}
              Если игрок выигрывает в поединке, его фишка перемещается вперед на
              количество клеток, указанное на его карте, а если проигрывает -
              назад на количество клеток карты соперника. Ничья - игрок стоит на
              месте.
            </li>
            <li>
              После поединка игроки берут по новой карте. Ходит второй игрок.
            </li>
            <li>
              Если фишка попадает на фиолетовую клетку, происходит кража карт у
              соперника. Но, только в том случае, если у них больше двух карт.
            </li>
            <li>
              Если фишка попадает на белую клетку, то нужно продолжить движение
              до следующей белой клеточки. А если эта клетка ближайшая к замку,
              то фишка остается на месте.
            </li>
            <li>
              Если фишка попадает на черную клетку то, тогда нужно вернуться не
              предыдущую черную клеточку. А если эта клетка ближайшая к старту,
              то фишка возвращается на старт.
            </li>
            <li>
              Если фишка попадает на клетку с "сердечком", тогда нужно взять из
              колоды карту, а дальше действовать в зависимости от цвета
              клеточки.
            </li>
            <li>
              Если фишка попадает на клетку с "цветочком", тогда нужно положить
              в колоду любую свою карту, а дальше действовать в зависимости от
              цвета клеточки.
            </li>
            <li>
              Когда фишка игрока попадает на последнюю красную клетку перед
              замком, происходит поединок. Если игрок должен сделать больше
              шагов, чем до последней красной клетки, он все равно становится на
              неё. Если поединок выигран фишка попадает в замок, если нет -
              возвращается на нужное количество клеток.{' '}
            </li>
          </ul>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Home;
