import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { StateFromReducersMapObject } from '@reduxjs/toolkit';
import { logoutUserAsync } from '../../redux/actions/userActions';
import { SocketContext } from '../../context/websoket/websoket-context';
import { socket, chatSocket } from '../../socket';
import './Navbar.css';
import Modal from '../Modal/Modal';
import Auth from '../Auth/Auth';

function Navbar() {
  const [modalActive, setModalActive] = useState(false);
  const handlemodal = (action: any) => {
    setModalActive(false);
    setModalActive(action);
    // console.log(action);
  };
  const [tabIndex, setTabIndex] = useState(0);
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation();

  console.log(socket);
  useEffect(() => {
    if (user) {
      setModalActive(false);
    }
  }, [user]);

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ): void => {
    setTabIndex(newTabIndex);
  };

  const handleLogout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    socket.close();
    chatSocket.close();
    dispatch(logoutUserAsync());
    if (path !== '/') {
      navigate('/');
    }
  };
  const handleMessages = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    socket.emit('message', 'hello');
  };
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar className="root" variant="dense">
          <Typography className="game-logo " variant="h5" color="inherit">
            Raid
            {/*<img src="../../../public/img/Untitled_logo_4_free-file-transformed.png" alt="logo"/>*/}
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabIndex}
              indicatorColor="primary"
              onChange={handleTabChange}
            >
              <Tab
                label="Главная"
                className="selectedTab"
                component={NavLink}
                to="/"
              />
              {user
                ? [
                    <Tab
                      key="user"
                      label={user.userName}
                      className="selectedTab"
                      component={NavLink}
                      to="/statistic"
                      onClick={(e) => {}}
                    />,
                    <Tab
                      key="logout"
                      label="Выйти"
                      className="selectedTab"
                      onClick={(e) => handleLogout(e)}
                    />,
                  ]
                : [
                    <Tab
                      key="signup"
                      className="selectedTab"
                      label="Зарегистрироваться"
                      onClick={() => handlemodal('registration')}
                      // component={NavLink}
                      // to="/registration"
                    />,
                    <Tab
                      className="selectedTab"
                      key="login"
                      label="Войти"
                      onClick={() => handlemodal('login')}
                      // component={NavLink}
                      // to="/login"
                    />,
                  ]}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      <Modal active={modalActive} setActive={setModalActive}>
        <Auth action={modalActive} />
      </Modal>
    </>
  );
}

export default Navbar;
