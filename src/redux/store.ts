import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redusers/userReducer';
import statisticReducer from './redusers/statisticReducer'

export default configureStore({
  reducer: {
    user: userReducer,
    statistic: statisticReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});
