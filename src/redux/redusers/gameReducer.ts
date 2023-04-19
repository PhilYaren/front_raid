import {
  SET_COLOR,
  SET_CURRENT,
  SET_DECK,
  SET_GAME_MESSAGES,
  SET_MODAL,
  SET_OPPONENTS,
  SET_ORDER,
  SET_PLAYERS,
  SET_ROOM_NAME,
  SET_STARTED,
} from '../types';

const initialState = {
  roomName: '',
  players: {},
  messages: [],
  deck: [],
  current: 0,
  order: [],
  modal: false,
  color: '',
  opponents: {},
  started: false,
};

/*
  players: [
    {
    name: 'Player 1',
    hand: [
      {
      name: 'Card 1',
      image: 'https://image.com',
      },
      ],
    position: 1,
 */

const gameReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ROOM_NAME:
      return { ...state, roomName: payload };
    case SET_PLAYERS:
      if (payload) {
        return { ...state, players: payload };
      }
      return state;
    case SET_GAME_MESSAGES:
      return { ...state, messages: [...state.messages, payload] };
    case SET_DECK:
      if (payload) {
        return { ...state, deck: payload };
      }
      return state;
    case SET_ORDER:
      if (payload) {
        return { ...state, order: payload };
      }
      return state;
    case SET_CURRENT:
      if (typeof payload === 'number') {
        return { ...state, current: payload };
      }
      return state;
    case SET_MODAL:
      return { ...state, modal: payload };
    case SET_COLOR:
      return { ...state, color: payload };
    case SET_OPPONENTS:
      return { ...state, opponents: payload };
    case SET_STARTED:
      return { ...state, started: payload };
    default:
      return state;
  }
};

export default gameReducer;
