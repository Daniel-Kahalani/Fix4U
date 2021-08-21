import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Parse from 'parse/react-native';
const initialState = {
  results: [],
  error: null,
  loading: null,
  success: null,
};

export const getAvailableRSPs = createAsyncThunk(
  'user/getAvailableRSPs',
  async (searchInput, { rejectWithValue }) => {
    try {
      const availableRSPs = await Parse.Cloud.run('getAvailableRSPs', {
        ...searchInput,
      });
      console.log('getAvailableRSPs: ', availableRSPs);
      return availableRSPs;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const getRSPAvailableHours = createAsyncThunk(
  'user/getRSPAvailableHours',
  async (searchInput, { rejectWithValue }) => {
    try {
      const rspAvailability = await Parse.Cloud.run('getRSPAvailableHours', {
        ...searchInput,
      });
      console.log('getRSPAvailableHours: ', rspAvailability);
      return rspAvailability;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const scheduleAppointment = createAsyncThunk(
  'user/scheduleAppointment',
  async (scheduleInput, { rejectWithValue }) => {
    try {
      const success = await Parse.Cloud.run('scheduleAppointment', {
        ...scheduleInput,
      });
      console.log('scheduleAppointment: ', success);
      return success;
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
    [scheduleAppointment.pending]: (state, action) => {
      state.loading = true;
      state.success = null;
    },
    [scheduleAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [scheduleAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
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
