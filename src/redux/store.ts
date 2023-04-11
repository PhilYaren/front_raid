import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redusers/userReducer';

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});
