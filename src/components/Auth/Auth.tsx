import React from 'react';
import { FormControl, FormLabel, TextField, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';



function Auth() {
  const endPoint = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const user = Object.fromEntries(data.entries());

    try {
      if (endPoint === '/login') {
        dispatch(loginUser(user));
      } else {
        dispatch(signupUser(user));
      } navigate('/')
    } catch (e) {
      console.log(e);
    }
  };
  const handlePassport = () => {
    window.location.href = 'http://localhost:3000/login/federated/google';
  }

  const form = () => {
    return (
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit}
      >
        <h3> {endPoint === '/login' ? 'Войти' : 'Регистрация'} </h3>
        {endPoint !== '/login' && (
          <>
            <FormLabel>Введите имя</FormLabel>
            <TextField name="userName" />
          </>
        )}
        <FormLabel>Введите email</FormLabel>
        <TextField name="email" />
        <FormLabel>Введите пароль</FormLabel>
        <TextField name="password" />
        <Button type="submit">
          {endPoint === '/login' ? 'Войти' : 'Регистрация'}
        </Button>
        <Button onClick={handlePassport}>Войти через google</Button>
      </form>
    );
  };

  return <div>{form()}</div>;
}

export default Auth;
