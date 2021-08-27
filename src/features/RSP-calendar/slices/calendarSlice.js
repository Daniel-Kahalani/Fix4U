import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
      const appointment = await Parse.Cloud.run('addAppointment', {
        ...appointmentInput,
        ...userInfo,
      });
      return appointment;
    } catch (e) {
      throw new Error('unknown');
    }
  }
);

export const loadAppointments = createAsyncThunk(
  'calendar/loadAppointments',
  async ({ year, month }) => {
    try {
      const generalUser = await Parse.User.currentAsync();
      let userInfo = generalUser
        ? await Parse.Cloud.run('getUserDataByGeneraUser', {
            generalUser: JSON.stringify(generalUser),
          })
        : null;
      const appointmentsArr = await Parse.Cloud.run('loadAppointmentsByMonth', {
        year,
        month,
        ...userInfo,
      });
      return appointmentsArr;
    } catch (e) {
      throw new Error('unknown');
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  'calendar/deleteAppointment',
  async ({ appointmentId }) => {
    try {
      const generalUser = await Parse.User.currentAsync();
      let userInfo = generalUser
        ? await Parse.Cloud.run('getUserDataByGeneraUser', {
            generalUser: JSON.stringify(generalUser),
          })
        : null;
      const appointment = await Parse.Cloud.run('deleteAppointment', {
        appointmentId,
        ...userInfo,
      });
      return appointment;
    } catch (e) {
      throw new Error('unknown');
    }
  }
);

export const editAppointment = createAsyncThunk(
  'calendar/editAppointment',
  async (appointmentInput) => {
    try {
      const generalUser = await Parse.User.currentAsync();
      let userInfo = generalUser
        ? await Parse.Cloud.run('getUserDataByGeneraUser', {
            generalUser: JSON.stringify(generalUser),
          })
        : null;
      const appointment = await Parse.Cloud.run('editAppointment', {
        ...appointmentInput,
        ...userInfo,
      });
      return appointment;
    } catch (e) {
      console.log(e);
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
