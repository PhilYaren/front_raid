import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSocket } from '../../../socket';
import { setGameMessages } from '../../../redux/actions/gameActions';

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
      <div className="massageList" >
        {messages.map((message: any) => {
          return (
            <div className="massage" style={{backgroundColor: 'white', borderRadius:'12px',width: '90%', margin: '2% auto 3%'}}>
              <div className="massage__name">{message.user}</div>
              <div className="massage__time">{message.time}</div>
              <div className="massage__text">{message.message}</div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSend}>
        <textarea name="message" placeholder="Введите сообщение" />
        <button type="submit">👊</button>
      </form>
    </div>
  );
}

export default GameChat;
