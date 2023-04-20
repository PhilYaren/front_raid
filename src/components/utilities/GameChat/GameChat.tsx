import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSocket } from '../../../socket';
import { setGameMessages } from '../../../redux/actions/gameActions';
import './gameChat.css';

function GameChat() {
  const room = useSelector((state: any) => state.game.roomName);
  const messages = useSelector((state: any) => state.game.messages);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    sessionSocket.on('receive_message', (message: any) => {
      dispatch(setGameMessages(message));
    });
  }, [sessionSocket]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData.entries());
    sessionSocket.emit('send_message', {
      room,
      message: data.message,
      user: user.userName,
      time: new Date().toLocaleTimeString('ru-RU'),
    });
    e.currentTarget.reset();
  };

  return (
    <div className="chat">
      <form onSubmit={handleSend}>
        <textarea name="message" placeholder="Введите сообщение" />
        <button type="submit">Отправить</button>
      </form>
      <div className="massageList">
        {messages.map((message: any, id: number) => {
          return (
            <div className="oneMessage" key={id}>
              <div className='dataMessage'>
                <p className="massage__name">{message.user}</p>
                <p className="massage__time">{message.time}</p>
              </div>
              <p className="massage__text">{message.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameChat;
