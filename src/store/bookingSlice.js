import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';
import { authHeader } from '../utils/Generator';
import StorageService from '../services/StorageService';
import Toast from 'react-native-toast-message';

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

export const createBooking = createAsyncThunk('booking/createBooking', async (booking) => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const response = await axios.post(
      `${ApiContans.BACKEND_API.BASE_API_URL}/api/booking`, booking,
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
      //Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state,action) => {
        state.loading = false;
        Toast.show({
          type: 'success',
          text1: 'ParkingHT',
          text2: 'Bạn đã đặt chỗ đậu xe thành công!'
        });
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'ParkingHT',
          text2: `${action.error.message}`
        });
      })
  },
});

export default bookingSlice.reducer;