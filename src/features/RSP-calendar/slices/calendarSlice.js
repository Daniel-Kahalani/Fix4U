import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Parse from 'parse/react-native';

const initialState = {
  appointments: [],
  error: null,
  loading: null,
};

export const addAppointment = createAsyncThunk(
  'calendar/addAppointment',
  async (appointmentInput, { rejectWithValue }) => {
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
      rejectWithValue(e);
    }
  }
);

export const loadAppointments = createAsyncThunk(
  'calendar/loadAppointments',
  async ({ year, month }, { rejectWithValue }) => {
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
      rejectWithValue(e);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  'calendar/deleteAppointment',
  async ({ appointmentId }, { rejectWithValue }) => {
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
      rejectWithValue(e);
    }
  }
);

export const editAppointment = createAsyncThunk(
  'calendar/editAppointment',
  async (appointmentInput, { rejectWithValue }) => {
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
      rejectWithValue(e);
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
  extraReducers: {
    [addAppointment.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [addAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    },
    [addAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [loadAppointments.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loadAppointments.fulfilled]: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    },
    [loadAppointments.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [deleteAppointment.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [deleteAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.appointments = action.payload;
    },
    [deleteAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [editAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.appointments = action.payload;
    },
    [editAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [editAppointment.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { clearError } = calendarSlice.actions;

export default calendarSlice.reducer;
