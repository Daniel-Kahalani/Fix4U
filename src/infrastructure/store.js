import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from '../features/account/slices/userSlice';
import calendarReducer from '../features/RSP-calendar/slices/calendarSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    calendar: calendarReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

export default store;
