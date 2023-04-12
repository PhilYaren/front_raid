import { SET_STATISTIC } from '../types';
import { Statistic } from '../../types';

declare interface Statistics {
  statistics: Statistic[];
}

const initialState: Statistics = {
  statistics: [],
};

export default function statisticReduser(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case SET_STATISTIC:
      return { ...state, payload };
    default:
      return state;
  }
}
