import {
  SET_DECK,
  SET_GAME_MESSAGES,
  SET_PLAYERS,
  SET_ROOM_NAME,
} from '../types';

const initialState = {
  roomName: '',
  players: [],
  messages: [],
  deck: [],
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
      return { ...state, players: payload };
    case SET_GAME_MESSAGES:
      return { ...state, messages: [...state.messages, payload] };
    case SET_DECK:
      return { ...state, deck: payload };
    default:
      return state;
  }
};

export default gameReducer;
