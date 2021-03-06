import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppointmentStatus } from '../../../infrastructure/utils/constants';

import Parse from 'parse/react-native';
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
      if (appointment.get('status') === AppointmentStatus.REJECTED) {
        await appointment.destroy();
      }
      return appointment.get('status');
    } catch (e) {
      if (e.code === 101) {
        return AppointmentStatus.REJECTED;
      }
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
      if (appointment.get('status') === AppointmentStatus.PENDING) {
        await appointment.destroy();
        return AppointmentStatus.REJECTED;
      }
      return AppointmentStatus.APPROVED;
    } catch (e) {
      if (e.code !== 101) {
        throw rejectWithValue(e);
      }
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
    clearSearchRSP(state, action) {
      state.results = initialState.results;
      state.error = initialState.error;
      state.loading = initialState.loading;
      state.appointmentRequestId = initialState.appointmentRequestId;
      state.appointmentStatus = initialState.appointmentStatus;
    },
  },
  extraReducers: {
    [getAvailableRSPs.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getAvailableRSPs.fulfilled]: (state, action) => {
      state.loading = false;
      state.results = action.payload;
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
      state.error = null;
    },
    [getRSPAvailableHours.fulfilled]: (state, action) => {
      state.loading = false;
      state.results = action.payload;
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
      state.error = null;
    },
    [sendAppointmentRequest.fulfilled]: (state, action) => {
      state.appointmentRequestId = action.payload;
      state.appointmentStatus = AppointmentStatus.PENDING;
    },
    [sendAppointmentRequest.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [getAppointmentRequestStatus.fulfilled]: (state, action) => {
      if (action.payload !== AppointmentStatus.PENDING) {
        state.loading = false;
      }
      state.appointmentStatus = action.payload;
    },
    [getAppointmentRequestStatus.rejected]: (state, action) => {
      state.appointmentStatus = AppointmentStatus.REJECTED;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [abortAppointmentRequest.fulfilled]: (state, action) => {
      state.appointmentStatus = action.payload;
      state.loading = false;
    },
    [abortAppointmentRequest.rejected]: (state, action) => {
      state.appointmentStatus = AppointmentStatus.REJECTED;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
  },
});

export const { clearError, clearSearchRSP } = searchRSPSlice.actions;

export default searchRSPSlice.reducer;

/*
results structure

Array[
  Object {
    "availableHours": Array [String],
    "businessName": String,
    "businessAddress",String,
    "fullName": String,
    "rating": Number,
    "recentFeedbacks": Array [
      Object {
        "appointmentId": String,
        "createdAt": Date,
        "customerId": String,
        "customerName": String,
        "description": String,
        "objectId": String,
        "rating": Number,
        "rspId": String,
        "rspName": String,
        "updatedAt": Date,
      },
    ],
    "rspId": "String",
    "visitCost": Number,
    "votes": Number,
}]
*/
