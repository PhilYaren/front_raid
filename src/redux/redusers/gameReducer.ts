import {
  SET_CURRENT,
  SET_DECK,
  SET_GAME_MESSAGES,
  SET_ORDER,
  SET_PLAYERS,
  SET_ROOM_NAME,
} from '../types';

const initialState = {
  roomName: '',
  players: {},
  messages: [],
  deck: [],
  current: 0,
  order: [],
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
    case SET_ORDER:
      if (payload) {
        return { ...state, order: payload };
      }
    case SET_CURRENT:
      if (payload) {
        return { ...state, current: payload };
      }
      return state;
    default:
      return state;
  }
};

export default gameReducer;
