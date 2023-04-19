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

export const setOrder = (order: any) => ({
  type: SET_ORDER,
  payload: order,
});

export const setCurrent = (current: number) => ({
  type: SET_CURRENT,
  payload: current,
});

export const setOpponents = (opponents: any) => ({
  type: SET_OPPONENTS,
  payload: opponents,
});

export const setModal = (modal: boolean) => ({
  type: SET_MODAL,
  payload: modal,
});

export const setColor = (color: string) => ({
  type: SET_COLOR,
  payload: color,
});

export const setStarted = (started: boolean) => ({
  type: SET_STARTED,
  payload: started,
});
