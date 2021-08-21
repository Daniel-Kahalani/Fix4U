import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from '../features/account/slices/userSlice';
import calendarReducer from '../features/RSP-calendar/slices/calendarSlice';
import searchRSPReducer from '../features/serachRsp/slices/searchRSPSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    calendar: calendarReducer,
    searchRSP: searchRSPReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

export default store;
