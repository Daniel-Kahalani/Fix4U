import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const searchResultSlice = createSlice({
  name: 'searchResult',
});

export const { clearError } = searchResultSlice.actions;

export default searchResultSlice.reducer;
