import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Parse from 'parse/react-native';

const initialState = {
  pastAppointments: [],
  error: null,
  loading: null,
  success: null,
};

export const getPastAppointments = createAsyncThunk(
  'history/getPastAppointments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        user: {
          info: { specificUserId, userType },
        },
      } = getState();
      const pastAppointments = await Parse.Cloud.run('getPastAppointments', {
        specificUserId,
        userType,
      });
      return pastAppointments;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const addNewFeedback = createAsyncThunk(
  'history/addNewFeedback',
  async (feedbackInput, { rejectWithValue }) => {
    try {
      await Parse.Cloud.run('addNewFeedback', feedbackInput);
      return;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = null;
    },
  },
  extraReducers: {
    [getPastAppointments.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
      state.pastAppointments = [];
    },
    [getPastAppointments.fulfilled]: (state, action) => {
      state.loading = false;
      state.pastAppointments = action.payload;
    },
    [getPastAppointments.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [addNewFeedback.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
      state.success = null;
    },
    [addNewFeedback.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [addNewFeedback.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
      state.success = false;
    },
  },
});

export const { clearError } = historySlice.actions;

export default historySlice.reducer;

/*
pastAppointments structure

customer
Array [
  Object {
    "appointmentId": String,
    "appointmentType": String,
    "businessName": String,
    "customerID": String,
    "customerName": String,
    "date": String,
    "description": String,
    "endTime": String,
    "expertise": Array [String],
    "location": String,
    "rating": Number,
    "rspID": String,
    "rspName": String,
    "startTime": String,
    "status": String,
    "title": String,
    "visitCost": Number,
    "votes": Number,
}]

  rsp

  Array [
    Object {
    "appointmentId": String,
    "appointmentType": String,
    "customerID": String,
    "customerName": String,
    "date": String,
    "description": String,
    "endTime": "String,
    "location": String,
    "rspID": String,
    "startTime": String,
    "status": String,
    "title": String,
}]
*/
