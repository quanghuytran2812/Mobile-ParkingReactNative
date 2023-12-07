import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';
import { authHeader } from '../utils/Generator';
import StorageService from '../services/StorageService';

export const fetchParkingslotAreaByCategory = createAsyncThunk('parkingslot/fetchParkingslotAreaByCategory', async (category) => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const response = await axios.post(
      `${ApiContans.BACKEND_API.BASE_API_URL}/parking-slot/get-by-vehicle-category`, category,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const fetchParkingslotByArea = createAsyncThunk(
  'parkingslot/fetchParkingslotByArea',
  async (area) => {
    const token = await StorageService.getToken(); // Await the token value

    try {
      const response = await axios.post(
        `${ApiContans.BACKEND_API.BASE_API_URL}/parking-slot/get-by-area`, area,
        {
          headers: authHeader(token), // Pass the token value to the headers
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const parkingslotSlice = createSlice({
  name: 'parkingslot',
  initialState: {
    listAreaByCategory: [],
    listPSbyArea: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch parkingslot by category
      .addCase(fetchParkingslotAreaByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParkingslotAreaByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.listAreaByCategory = action.payload.data;
      })
      .addCase(fetchParkingslotAreaByCategory.rejected, (state) => {
        state.loading = false;
      })
      // Fetch parkingslot by area
      .addCase(fetchParkingslotByArea.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParkingslotByArea.fulfilled, (state, action) => {
        state.loading = false;
        state.listPSbyArea = action.payload.data;
      })
      .addCase(fetchParkingslotByArea.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default parkingslotSlice.reducer;