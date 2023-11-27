import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';
import { authHeader } from '../utils/Generator';
import StorageService from '../services/StorageService';

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const response = await axios.get(
      `${ApiContans.BACKEND_API.BASE_API_URL}/vehicle-category/get-all`,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


const categorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch category
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default categorySlice.reducer;