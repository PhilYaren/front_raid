import { SET_SESSIONS } from '../types';
import { Session } from '../../types';

export declare interface Sessions {
  sessions: Session[];
}

const initialState = {
  sessions: [],
  loaded: false,
};

const sessionsReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SESSIONS:
      return { ...state, sessions: payload, loaded: true };
    default:
      return state;
  }
};

export default sessionsReducer;
