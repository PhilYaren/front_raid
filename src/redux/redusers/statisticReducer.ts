import { SET_STATISTIC } from '../types';

export default function statisticReduser(state = [], action: any) {
  const { type, payload } = action;
  switch (type) {
    case SET_STATISTIC:
      return { ...state, payload };
    default:
      return state;
  }
}