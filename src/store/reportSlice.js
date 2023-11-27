import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';
import { authHeader } from '../utils/Generator';
import StorageService from '../services/StorageService';
import Toast from 'react-native-toast-message';

//get all report by userid
export const fetchReport = createAsyncThunk('report/fetchReport', async () => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const response = await axios.get(
      `${ApiContans.BACKEND_API.BASE_API_URL}/report/get-by-driver`,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
// Create report
export const createReport = createAsyncThunk('report/createReport', async (report) => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const response = await axios.post(
      `${ApiContans.BACKEND_API.BASE_API_URL}/report/create`, report,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


const reportSlice = createSlice({
  name: 'report',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch report
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchReport.rejected, (state) => {
        state.loading = false;
      })
      //Create report
      .addCase(createReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReport.fulfilled, (state) => {
        state.loading = false;
        Toast.show({
          type: 'success',
          text1: 'ParkingHT',
          text2: 'Đánh giá được tạo mới thành công!'
        });
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'ParkingHT',
          text2: `${action.error.message}`
        });
      })
  },
});

export default reportSlice.reducer;