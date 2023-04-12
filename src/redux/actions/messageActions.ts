import { Message } from '../../types';
import { SET_MESSAGE } from '../types';

export const actionMessage = (message: Message) => ({
  type: SET_MESSAGE,
  payload: message,
});
