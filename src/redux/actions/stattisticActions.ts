import axios from 'axios';
import { SET_STATISTIC} from '../types';
import { Dispatch } from '@reduxjs/toolkit';
import { Statistic } from '../../types';

export const setStatistic = (payload: Statistic) => ({ type: SET_STATISTIC, payload });

export const setStatisticAsync = () => (dispatch: Dispatch) => {
  axios.get('/user/statistic')
    .then((res) => {
      dispatch(setStatistic(res.data));
    })
    .catch((err) => {
      console.error(err);
    });
};
