import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';
import { authHeader } from '../utils/Generator';
import StorageService from '../services/StorageService';
import Toast from 'react-native-toast-message';

//get feedback by reportid
export const fetchFeedback = createAsyncThunk('feedback/fetchFeedback', async (feedbackid) => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const response = await axios.get(
      `${ApiContans.BACKEND_API.BASE_API_URL}/feedback/get-by-report/`+feedbackid,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const updateFeedback = createAsyncThunk('feedback/updateFeedback', async (feedback) => {
    const token = await StorageService.getToken(); // Await the token value
    try {
      const response = await axios.put(
        `${ApiContans.BACKEND_API.BASE_API_URL}/feedback/update/`+feedback.feedBackId, 
        {
          content: feedback.content, rankStar: feedback.rankStar},
        {
          headers: authHeader(token), // Pass the token value to the headers
        },
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  });


const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    list: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch feedback
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchFeedback.rejected, (state) => {
        state.loading = false;
      })  
      //Update feedback
      .addCase(updateFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFeedback.fulfilled, (state) => {
        state.loading = false;
        Toast.show({
          type: 'success',
          text1: 'ParkingHT',
          text2: 'Bạn đã gửi nhận xét thành công!'
        });
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'ParkingHT',
          text2: `${action.error.message}`
        });
      })
  },
});

export default feedbackSlice.reducer;