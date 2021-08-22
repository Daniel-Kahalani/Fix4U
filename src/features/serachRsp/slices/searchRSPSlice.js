import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import Parse, { useParseQuery } from 'parse/react-native';
const initialState = {
  results: [],
  error: null,
  loading: null,
  appointmentRequestId: null,
  appointmentStatus: null,
};

export const getAvailableRSPs = createAsyncThunk(
  'searchRSP/getAvailableRSPs',
  async (searchInput, { rejectWithValue }) => {
    try {
      const availableRSPs = await Parse.Cloud.run('getAvailableRSPs', {
        ...searchInput,
      });
      return availableRSPs;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const getRSPAvailableHours = createAsyncThunk(
  'searchRSP/getRSPAvailableHours',
  async (searchInput, { rejectWithValue }) => {
    try {
      const rspAvailability = await Parse.Cloud.run('getRSPAvailableHours', {
        ...searchInput,
      });
      return rspAvailability;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const sendAppointmentRequest = createAsyncThunk(
  'searchRSP/sendAppointmentRequest',
  async (AppointmentInput, { rejectWithValue }) => {
    try {
      const appointmentId = await Parse.Cloud.run('sendAppointmentRequest', {
        ...AppointmentInput,
      });
      return appointmentId;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const getAppointmentRequestStatus = createAsyncThunk(
  'searchRSP/getAppointmentRequestStatus',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { searchRSP } = getState();
      const query = new Parse.Query('Appointment');
      const appointment = await query.get(searchRSP.appointmentRequestId);
      if (appointment.get('status') === 'rejected') {
        await appointment.destroy();
      }
      return appointment.get('status');
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const abortAppointmentRequest = createAsyncThunk(
  'searchRSP/abortAppointmentRequest',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { searchRSP } = getState();
      const query = new Parse.Query('Appointment');
      const appointment = await query.get(searchRSP.appointmentRequestId);
      appointment.set({ status: 'rejected' });
      await appointment.save();
      return 'rejected';
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

const searchRSPSlice = createSlice({
  name: 'searchRSP',
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = null;
    },
  },
  extraReducers: {
    [getAvailableRSPs.pending]: (state, action) => {
      state.loading = true;
    },
    [getAvailableRSPs.fulfilled]: (state, action) => {
      state.loading = false;
      state.results = action.payload;
      state.error = null;
    },
    [getAvailableRSPs.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [getRSPAvailableHours.pending]: (state, action) => {
      state.loading = true;
    },
    [getRSPAvailableHours.fulfilled]: (state, action) => {
      state.loading = false;
      state.results = action.payload;
      state.error = null;
    },
    [getRSPAvailableHours.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [sendAppointmentRequest.pending]: (state, action) => {
      state.loading = true;
      state.appointmentRequestId = null;
      state.appointmentStatus = null;
    },
    [sendAppointmentRequest.fulfilled]: (state, action) => {
      state.appointmentRequestId = action.payload;
      state.appointmentStatus = 'pending';
    },
    [sendAppointmentRequest.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [getAppointmentRequestStatus.fulfilled]: (state, action) => {
      state.appointmentStatus = action.payload;
    },
    [getAppointmentRequestStatus.rejected]: (state, action) => {
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [abortAppointmentRequest.fulfilled]: (state, action) => {
      state.appointmentStatus = action.payload;
    },
    [abortAppointmentRequest.rejected]: (state, action) => {
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
  },
});

export const { clearError } = searchRSPSlice.actions;

export default searchRSPSlice.reducer;

/*
results structure

[
  Object {
  "rspId":String
  "fullname": String,
  "businessName": String,
  "visitCost": Number,
  "rank":Number,
  "availableHours": [String],
}]
*/
