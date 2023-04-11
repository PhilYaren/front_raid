import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { StateFromReducersMapObject } from '@reduxjs/toolkit';
import { logoutUserAsync } from '../../redux/actions/userActions';
import { SocketContext } from '../../context/websoket/websoket-context';

function Navbar() {
  const [tabIndex, setTabIndex] = useState(0);
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  console.log(socket);

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ): void => {
    setTabIndex(newTabIndex);
  };

  const handleLogout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logoutUserAsync());
  };
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar className="root" variant="dense">
        <Typography variant="h6" color="inherit">
          Raid
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabIndex}
            indicatorColor="secondary"
            onChange={handleTabChange}
          >
            <Tab label="Главная" component={NavLink} to="/" />
            {user
              ? [
                  <Tab
                    key="user"
                    label={user.userName}
                    component={NavLink}
                    to="/statistic"
                  />,
                  <Tab
                    key="logout"
                    label="Выйти"
                    onClick={(e) => handleLogout(e)}
                  />,
                ]
              : [
                  <Tab
                    key="signup"
                    label="Зарегистрироваться"
                    component={NavLink}
                    to="/registration"
                  />,
                  <Tab
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
