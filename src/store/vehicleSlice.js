import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';
import { authHeader } from '../utils/Generator';
import StorageService from '../services/StorageService';
import Toast from 'react-native-toast-message';

export const fetchVehicle = createAsyncThunk('vehicle/fetchVehicle', async () => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const response = await axios.get(
      `${ApiContans.BACKEND_API.BASE_API_URL}/vehicle/get-all`,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const createVehicle = createAsyncThunk('vehicle/createVehicle', async (vehicle) => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const response = await axios.post(
      `${ApiContans.BACKEND_API.BASE_API_URL}/vehicle/create`, vehicle,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const updateVehicle = createAsyncThunk('vehicle/updateVehicle', async (vehicle) => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const response = await axios.put(
      `${ApiContans.BACKEND_API.BASE_API_URL}/vehicle/update`, vehicle,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch vehicle
      .addCase(fetchVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchVehicle.rejected, (state) => {
        state.loading = false;
      })
      //Create vehicle
      .addCase(createVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVehicle.fulfilled, (state) => {
        state.loading = false;
        Toast.show({
          type: 'success',
          text1: 'ParkingHT',
          text2: 'Xe được tạo mới thành công!'
        });
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'ParkingHT',
          text2: `${action.error.message}`
        });
      })
      //Update vehicle
      .addCase(updateVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVehicle.fulfilled, (state) => {
        state.loading = false;
        Toast.show({
          type: 'success',
          text1: 'ParkingHT',
          text2: 'Xe được cập nhập thành công!'
        });
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'ParkingHT',
          text2: `${action.error.message}`
        });
      })
  },
});

export default vehicleSlice.reducer;