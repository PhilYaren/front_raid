import { SET_AUTH, LOGOUT } from '../types';
const initState = {
  user: null,
  loaded: false,
};

export default function userReducer(state = initState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH:
      return { ...state, user: payload.user, loaded: true };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}
