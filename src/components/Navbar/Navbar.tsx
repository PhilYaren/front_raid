import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../types';

function Navbar() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ): void => {
    setTabIndex(newTabIndex);
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
                  <Tab key="logout" label="Выйти" />,
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
