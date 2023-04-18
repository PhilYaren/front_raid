import React from 'react';
import { FormControl, FormLabel, TextField, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
// import './auth.css'



function Auth({action}) {
  const endPoint = action;
  console.log(endPoint);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const user = Object.fromEntries(data.entries());

    try {
      if (endPoint === 'login') {
        dispatch(loginUser(user));
      } else {
        dispatch(signupUser(user));
      }
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  const handlePassport = () => {
    window.location.href = 'http://localhost:3000/login/federated/google';
  }

  const form = () => {
    return (
      <div className='form-container'>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit}
      >
        <h3> {endPoint === 'login' ? 'Войти' : 'Регистрация'} </h3>
        {endPoint !== 'login' && (
          <>
            <FormLabel>Введите имя</FormLabel>
            <TextField required name="userName" />
          </>
        )}
        <FormLabel>Введите email</FormLabel>
        <TextField type='email' name="email" required/>
        <FormLabel>Введите пароль</FormLabel>
        <TextField required type='password' name="password" />
        <Button type="submit" className="cssanimation btnAuth">
          {endPoint === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
        <Button onClick={handlePassport}>Войти через google</Button>
      </form>
      </div>
    );
  };

  return <div>{form()}</div>;
}

export default Auth;
