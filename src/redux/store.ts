import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redusers/userReducer';
import statisticReducer from './redusers/statisticReducer';
import messageReducer from './redusers/messageReducer';
import sessionsReducer from './redusers/sessionsReducer';
import gameReducer from './redusers/gameReducer';
import battleMessageReducer from './redusers/battleMessageReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    statistic: statisticReducer,
    messages: messageReducer,
    sessions: sessionsReducer,
    game: gameReducer,
    battleMessage: battleMessageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});
