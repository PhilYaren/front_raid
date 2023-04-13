import {
  SET_DECK,
  SET_GAME_MESSAGES,
  SET_PLAYERS,
  SET_ROOM_NAME,
} from '../types';

export const setRoomName = (name: any) => ({
  type: SET_ROOM_NAME,
  payload: name,
});
export const setPlayers = (players: any) => ({
  type: SET_PLAYERS,
  payload: players,
});

export const setGameMessages = (message: any) => ({
  type: SET_GAME_MESSAGES,
  payload: message,
});

export const setDeck = (deck: any) => ({
  type: SET_DECK,
  payload: deck,
});