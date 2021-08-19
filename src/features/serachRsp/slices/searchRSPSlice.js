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
  async (searchInput) => {
    const availableRSPs = await Parse.Cloud.run('getAvailableRSPs', {
      ...searchInput,
    });
    console.log('getAvailableRSPs: ', availableRSPs);

    return availableRSPs;
  }
);

export const getRSPAvailableHours = createAsyncThunk(
  'user/getRSPAvailableHours',
  async (searchInput) => {
    const rspAvailability = await Parse.Cloud.run('getRSPAvailableHours', {
      ...searchInput,
    });
    console.log('getRSPAvailableHours: ', rspAvailability);

    return rspAvailability;
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
      state.error = action.error.message;
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
      state.error = action.error.message;
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
