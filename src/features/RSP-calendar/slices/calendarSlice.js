import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

const initialState = {
  error: null,
  loading: null,
};

export const addAppointment = createAsyncThunk(
  'calendar/addAppointment',
  async (appointmentInput) => {
    try {
      const generalUser = await Parse.User.currentAsync();
      let userInfo = generalUser
        ? await Parse.Cloud.run('getUserDataByGeneraUser', {
            generalUser: JSON.stringify(generalUser),
          })
        : null;
      console.log(generalUser);
      console.log('-----------');
      console.log(appointmentInput);
      const appointment = await Parse.Cloud.run('addAppointment', {
        ...appointmentInput,
        ...userInfo,
      });
      console.log('-----------');
      console.log(appointment);
      return appointment;
    } catch (e) {
      throw new Error('unknown');
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = null;
    },
  },
  extraReducers: {},
});

export const { clearError } = calendarSlice.actions;

export default calendarSlice.reducer;
