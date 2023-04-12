import { Message } from '../../types';
import { SET_MESSAGE } from '../types';

declare interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
};

const messageReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    default:
      return state;
  }
};

export default messageReducer;
