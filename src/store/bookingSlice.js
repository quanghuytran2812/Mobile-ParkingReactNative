import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';
import { authHeader } from '../utils/Generator';
import StorageService from '../services/StorageService';

export const fetchBookingByStatus = createAsyncThunk('booking/fetchBookingByStatus', async (statusB) => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const response = await axios.get(
      `${ApiContans.BACKEND_API.BASE_API_URL}/user/getBooking/status?status=`+statusB,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch booking by status
      .addCase(fetchBookingByStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchBookingByStatus.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default bookingSlice.reducer;