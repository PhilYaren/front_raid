import React, { useMemo, useReducer } from 'react';
import { useContext } from 'react';
import { SET_SOKET, UNSET_SOKET } from './soket.types';

// @ts-ignore
export const SocketContext = React.createContext();

export interface SocketState {
  socket: WebSocket | null;
}

const initialState: SocketState = {
  socket: null,
};

const reducer = (state: SocketState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SOKET:
      return { ...state, socket: payload };
    case UNSET_SOKET:
      return { ...state, socket: null };
    default:
      return state;
  }
};

function SocketContextProvider({ children }): JSX.Element {
  const [state, reactDispatch] = useReducer(reducer, initialState);

  const handleSetSocket = (socket: WebSocket) => {
    reactDispatch({ type: SET_SOKET, payload: socket });
  };

  const handleUnsetSocket = () => {
    reactDispatch({ type: UNSET_SOKET });
  };
  const value = useMemo(
    () => ({
      socket: state.socket,
      handleSetSocket,
      handleUnsetSocket,
    }),
    [state]
  );
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export default SocketContextProvider;
