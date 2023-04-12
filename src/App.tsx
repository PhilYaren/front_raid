import { useContext, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import UserStat from './components/UserStat/UserStat';
import Game from './components/Game/Game';
import Auth from './components/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/actions/userActions';
import socket from './socket';
import { SocketContext } from './context/websoket/websoket-context';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const loaded = useSelector((state: any) => state.user.loaded);
  const { handleSetSocket } = useContext(SocketContext);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }
  if (user && first) {
    console.log('connect');
    socket.open();
    handleSetSocket(socket);
    setFirst(false);
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Auth />} />
          <Route path="registration" element={<Auth />} />
        </Route>
        <Route path="/:user">
          <Route index element={<Home />} />
          <Route path="statistic" element={<UserStat />} />
          <Route path="game" element={<Game />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
