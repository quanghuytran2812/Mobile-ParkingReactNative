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

export const fetchParkingslotAreaByCategoryGuest = createAsyncThunk(
  'parkingslot/fetchParkingslotAreaByCategoryGuest', async (category) => {
  try {
    const response = await axios.post(
      `${ApiContans.BACKEND_API.BASE_API_URL}/parking-slot/get-by-vehicle-categoryGuest`, 
      {vehicleCategoryId: category});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const fetchParkingslotByAreaGuest = createAsyncThunk(
  'parkingslot/fetchParkingslotByAreaGuest',
  async (area) => {
    try {
      const response = await axios.post(
        `${ApiContans.BACKEND_API.BASE_API_URL}/parking-slot/get-by-areaGuest`, {area: area});
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
    listAreaByCategoryGuest: [],
    listPSbyAreaGuest: [],
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
      // Fetch parkingslot by category Guest
      .addCase(fetchParkingslotAreaByCategoryGuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParkingslotAreaByCategoryGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.listAreaByCategoryGuest = action.payload.data;
      })
      .addCase(fetchParkingslotAreaByCategoryGuest.rejected, (state) => {
        state.loading = false;
      })
      // Fetch parkingslot by area Guest
      .addCase(fetchParkingslotByAreaGuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParkingslotByAreaGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.listPSbyAreaGuest = action.payload.data;
      })
      .addCase(fetchParkingslotByAreaGuest.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default parkingslotSlice.reducer;