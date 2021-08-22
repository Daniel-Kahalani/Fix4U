import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Parse from 'parse/react-native';
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
      query.equalTo('status', 'pending');
      const notifications = await query.find();
      return notifications;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const acceptAppointment = createAsyncThunk(
  'inbox/acceptAppointment',
  async (appointment, { rejectWithValue }) => {
    appointment.set({ status: 'approved' });
    await appointment.save();
  }
);

export const declineAppointment = createAsyncThunk(
  'inbox/declineAppointment',
  async (appointment, { rejectWithValue }) => {
    appointment.set({ status: 'rejected' });
    await appointment.save();
  }
);

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = null;
    },
  },
  extraReducers: {
    [getNotifications.pending]: (state, action) => {
      state.loading = true;
      state.notifications = [];
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
      state.error = null;
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
    },
    [acceptAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
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

export const { clearError } = inboxSlice.actions;

export default inboxSlice.reducer;

/*
notifications structure

--------customer-------------
Array[
  Object {
  "objectId": String,
  "rspID": String,
  "customerID": String,
  "customerName": String,
  "title": String,
  "description": String,
  "date": String,
  "startTime": String,
  "endTime": String,
  "location": String,
  "status": String,
  "location": String,
  "appointmentType": String,
}]
*/
