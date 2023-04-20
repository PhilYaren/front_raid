import { useContext, useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import UserStat from './components/UserStat/UserStat';
import Game from './components/Game/Game';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/actions/userActions';
import { socket, chatSocket, sessionSocket } from './socket';
import { setSessions } from './redux/actions/sessionsAction';
import Modal from './components/Modal/Modal';
import dndCardsTest from './components/dnd/Handles';
import useSound from 'use-sound';
import mainSoundMP3 from './assets/mainSound.mp3'

function App() {

   // sounds
  //sounds
  const [mainSoundPlay, {pause}] = useSound(mainSoundMP3, { volume: 0.1, onend: () => play()});
  const [mainSound,setSound] = useState(false);
  //

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const loaded = useSelector((state: any) => state.user.loaded);
  const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    sessionSocket.on('send_rooms', (sessions: any) => {
      dispatch(setSessions(sessions));
    });
  }, [sessionSocket]);

  if (!loaded) {
    return <div>Loading...</div>;
  }
  if (user && first) {
    console.log('connect');
    socket.open();
    socket.emit('set_user', user);
    chatSocket.open();
    sessionSocket.open();
    setFirst(false);
  }


  return (
    <>
      <Navbar />
     {mainSound?
            <button className='mainSound' onClick={()=>{
              pause()
              setSound(false)}}>stop</button>  :
            <button  className='mainSound' onClick={()=>{
              mainSoundPlay()
              setSound(true)}}>КАЧ</button>
            }
      <Routes>
        {/* <Route path='/dndtest' Component={dndCardsTest}/> */}
        <Route path="/">
          <Route index element={<Home />} />
          {/* <Route path="login" element={<Auth />} />
          <Route path="registration" element={<Auth />} /> */}
        </Route>
        <Route>
          <Route path="statistic" element={<UserStat />} />
          <Route path="game/:gameId" element={<Game />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
