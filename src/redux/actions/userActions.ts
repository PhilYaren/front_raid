import axios from 'axios';
import { LOGOUT, SET_AUTH } from '../types';
import { User } from '../../types';
import { Dispatch } from '@reduxjs/toolkit';

export const setAuthUser = (payload: User) => ({ type: SET_AUTH, payload });
export const logoutUser = () => ({ type: LOGOUT });

export const checkAuth = () => (dispatch: Dispatch) => {
  axios
    .get('/user/')
    .then((res) => dispatch(setAuthUser(res.data)))
    .catch((err) => console.log(err));
};

export const loginUser = (data: any) => (dispatch: Dispatch) => {
  console.log(data);
  axios
    .post('/user/login', data)
    .then((res) => dispatch(setAuthUser(res.data)))
    .catch(console.log);
};

export const signupUser = (data: any) => (dispatch: Dispatch) => {
  axios
    .post('/user/register', data)
    .then((res) => dispatch(setAuthUser(res.data)))
    .catch(console.log);
};

export const logoutUserAsync = () => (dispatch: Dispatch) => {
  axios('/user/logout')
    .then(() => dispatch(logoutUser()))
    .catch(console.log);
};
