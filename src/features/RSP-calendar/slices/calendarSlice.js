import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Parse from 'parse/react-native';

const initialState = {
  appointments: {},
  error: null,
  loading: null,
  isAppointmentRemoved: false,
};

export const addAppointment = createAsyncThunk(
  'calendar/addAppointment',
  async (appointmentInput, { getState, rejectWithValue }) => {
    try {
      const {
        user: {
          info: { specificUserId, userType },
        },
      } = getState();
      const appointment = await Parse.Cloud.run('addAppointment', {
        ...appointmentInput,
        specificUserId,
        userType,
      });
      return appointment;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const loadAppointments = createAsyncThunk(
  'calendar/loadAppointments',
  async ({ year, month }, { getState, rejectWithValue }) => {
    try {
      const {
        user: {
          info: { specificUserId, userType },
        },
      } = getState();
      const appointmentsObj = await Parse.Cloud.run('loadAppointmentsByMonth', {
        year,
        month,
        specificUserId,
        userType,
      });
      return appointmentsObj;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  'calendar/deleteAppointment',
  async ({ appointmentId }, { getState, rejectWithValue }) => {
    try {
      const {
        user: {
          info: { specificUserId, userType },
        },
      } = getState();
      const appointment = await Parse.Cloud.run('deleteAppointment', {
        appointmentId,
        specificUserId,
        userType,
      });
      return appointment;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const editAppointment = createAsyncThunk(
  'calendar/editAppointment',
  async (appointmentInput, { getState, rejectWithValue }) => {
    try {
      const {
        user: {
          info: { specificUserId, userType },
        },
      } = getState();
      const appointment = await Parse.Cloud.run('editAppointment', {
        ...appointmentInput,
        specificUserId,
        userType,
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
    clearCalendar(state, action) {
      state.pastAppointments = initialState.appointments;
      state.error = initialState.error;
      state.loading = initialState.loading;
      state.isAppointmentRemoved = initialState.isAppointmentRemoved;
    },
    clearRemoveAppointmentSnackbar(state, action) {
      state.isAppointmentRemoved = false;
    },
  },
  extraReducers: {
    [addAppointment.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [addAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
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
      state.error = null;
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
      state.isAppointmentRemoved = true;
    },
    [deleteAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
      state.isAppointmentRemoved = false;
    },
    [editAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
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

export const { clearError, clearCalendar, clearRemoveAppointmentSnackbar } =
  calendarSlice.actions;

export default calendarSlice.reducer;
