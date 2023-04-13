import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { StateFromReducersMapObject } from '@reduxjs/toolkit';
import { logoutUserAsync } from '../../redux/actions/userActions';
import { SocketContext } from '../../context/websoket/websoket-context';
import { socket, chatSocket } from '../../socket';
import './Navbar.css'

function Navbar() {
  const [tabIndex, setTabIndex] = useState(0);
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  console.log(socket);

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
  };
  const handleMessages = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    socket.emmit('message', 'hello');
  };
  return (
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
                    component={NavLink}
                    to="/registration"
                  />,
                  <Tab
                    className="selectedTab"
                    key="login"
                    label="Войти"
                    component={NavLink}
                    to="/login"
                  />,
                ]}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
