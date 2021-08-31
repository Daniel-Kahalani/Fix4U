import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppointmentStatus } from '../../../infrastructure/utils/constants';
import Parse from 'parse/react-native';
import { ParseError } from '../../../infrastructure/utils/ParseError';

const initialState = {
  notifications: [],
  error: null,
  loading: null,
  success: null,
};

export const getNotifications = createAsyncThunk(
  'inbox/getNotifications',
  async (_, { getState, rejectWithValue }) => {
    try {
      const query = new Parse.Query('Appointment');
      const { user } = getState();
      query.equalTo('rspID', user.info.specificUserId);
      query.equalTo('status', AppointmentStatus.PENDING);
      const notifications = await query.find();
      return notifications;
    } catch (e) {
      throw rejectWithValue(
        new ParseError(440, 'Unable to load your inbox, please try to refresh')
      );
    }
  }
);

export const acceptAppointment = createAsyncThunk(
  'inbox/acceptAppointment',
  async (appointmentId, { rejectWithValue }) => {
    try {
      const query = new Parse.Query('Appointment');
      let appointment = await query.get(appointmentId);
      appointment.set({ status: AppointmentStatus.APPROVED });
      await appointment.save();
    } catch (e) {
      if (e.code === 101) {
        throw rejectWithValue(
          new ParseError(
            441,
            'Unable to schedule an appointment because the customer has been cancel his request'
          )
        );
      }
      throw rejectWithValue(
        new ParseError(
          442,
          'Unable to accept the appointment, please try again'
        )
      );
    }
  }
);

export const declineAppointment = createAsyncThunk(
  'inbox/declineAppointment',
  async (appointmentId, { rejectWithValue }) => {
    try {
      const query = new Parse.Query('Appointment');
      let appointment = await query.get(appointmentId);
      appointment.set({ status: AppointmentStatus.REJECTED });
      await appointment.save();
    } catch (e) {
      if (e.code === 101) {
        return;
      }
      throw rejectWithValue(
        new ParseError(
          443,
          'Unable to reject the appointment, please try again'
        )
      );
    }
  }
);

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = null;
    },
    clearInbox(state, action) {
      state.notifications = initialState.notifications;
      state.error = initialState.error;
      state.loading = initialState.loading;
      state.success = initialState.success;
    },
  },
  extraReducers: {
    [getNotifications.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
      state.notifications = [];
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
    },
    [getNotifications.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [acceptAppointment.pending]: (state, action) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    [acceptAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [acceptAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [declineAppointment.pending]: (state, action) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    [declineAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [declineAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
  },
});

export const { clearError, clearInbox } = inboxSlice.actions;

export default inboxSlice.reducer;

/*
notifications structure

Array[
  Object {
    "appointmentType": String,
    "createdAt": String,
    "customerID": String,
    "customerName": String,
    "date": String,
    "description": String,
    "endTime": String,
    "isFeedbacked": Boolean,
    "location": String,
    "objectId": String,
    "rspID": String,
    "startTime": String,
    "status": String,
    "title": String,
    "updatedAt": String,
}]
*/
