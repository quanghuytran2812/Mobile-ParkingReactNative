import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';
import Toast from 'react-native-toast-message';
import StorageService from '../services/StorageService';

const AuthRequest = axios.create({
  baseURL: ApiContans.BACKEND_API.BASE_API_URL,
});

export const login = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await AuthRequest.post('/auth/generateToken', credentials);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error.response.data;
  }
});
const initialState = {
  isAuthenticated: false,
  loading: false,
  currentData: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.statusCode === 200) {
          if (action.payload.data.role === "DRIVER") {
            state.isAuthenticated = true;
            state.currentData = action.payload.data
            StorageService.setToken(action.payload.data.token)
            Toast.show({
              type: 'success',
              text1: 'ParkingHT',
              text2: 'Đăng nhập thành công! Chào mừng bạn đến với ParkingHT. 👋'
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'ParkingHT',
              text2: 'Bạn không được phép truy cập trang này!'
            });
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'ParkingHT',
            text2: `${action.payload.message}`
          });
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;