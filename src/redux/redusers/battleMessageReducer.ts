import { SET_BATTLE_MESSAGE } from '../types';

const initialState = {
  message: '',
};

const battleMessageReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SET_BATTLE_MESSAGE:
      return { ...state, message: payload };
    default:
      return state;
  }
};

export default battleMessageReducer;
