import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redusers/userReducer';
import statisticReducer from './redusers/statisticReducer';
import messageReducer from './redusers/messageReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    statistic: statisticReducer,
    messages: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});
