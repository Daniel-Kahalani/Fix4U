import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Parse from 'parse/react-native';
import { ParseError } from '../../../infrastructure/utils/ParseError';

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
      throw rejectWithValue(
        new ParseError(
          450,
          'Unable to load your History,\n please try to refresh'
        )
      );
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
      throw rejectWithValue(
        new ParseError(451, 'Unable to send your feedback, please try again')
      );
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
    clearHistory(state, action) {
      state.pastAppointments = initialState.pastAppointments;
      state.error = initialState.error;
      state.loading = initialState.loading;
      state.success = initialState.success;
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

export const { clearError, clearHistory } = historySlice.actions;

export default historySlice.reducer;

/*
pastAppointments structure

customer
Array [
  Object {
    "appointmentId": String,
    "appointmentType": String,
    "customerID": String,
    "customerName": String,
    "date": String,
    "description": String,
    "endTime": String,
    "isFeedbacked": false,
    "location": String,
    "rsp": Object {
      "businessName": String,
      "expertise": Array [String],
      "rating": Number,
      "rspName": String,
      "visitCost": Number,
      "votes": Number,
    },
    "rspID": "GxRhrf3b2U",
    "startTime": String,
    "status": String,
    "title": String,
}]

rsp

  Array [
    Object {
    "appointmentId": String,
    "appointmentType": String,
    "customerFeedback": Object {
      "description": String,
      "rating": Number,
    },
    "customerID": String,
    "customerName": String,
    "date": String,
    "description": String,
    "endTime": "String,
    "isFeedbacked":Boolean
    "location": String,
    "rspID": String,
    "startTime": String,
    "status": String,
    "title": String,
}]
*/
