import { SET_BATTLE_MESSAGE } from '../types';

export const setBattleMessage = (message: string) => ({
  type: SET_BATTLE_MESSAGE,
  payload: message,
});
