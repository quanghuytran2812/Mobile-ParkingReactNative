import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';
import { authHeader } from '../utils/Generator';
import StorageService from '../services/StorageService';
import Toast from 'react-native-toast-message';

// get user by userid
export const fetchGetUserById = createAsyncThunk('user/fetchGetUserById', async (userid, thunkAPI) => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const userData = thunkAPI.getState().auth.currentData;
    const response = await axios.get(
      `${ApiContans.BACKEND_API.BASE_API_URL}/user/get-by-id/` + userData.id,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
//change password
export const changepassUser = createAsyncThunk('user/changepassUser', async (user, thunkAPI) => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const userData = thunkAPI.getState().auth.currentData;
    const response = await axios.put(
      `${ApiContans.BACKEND_API.BASE_API_URL}/user/change-password/` + userData.id, user,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

//update user
export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkAPI) => {
  const token = await StorageService.getToken(); // Await the token value
  try {
    const userData = thunkAPI.getState().auth.currentData;
    const response = await axios.put(
      `${ApiContans.BACKEND_API.BASE_API_URL}/user/update/` + userData.id, user,
      {
        headers: authHeader(token), // Pass the token value to the headers
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

//register user
export const registerUser = createAsyncThunk('user/registerUser', async (user) => {
  try {
    const response = await axios.post(
      `${ApiContans.BACKEND_API.BASE_API_URL}/user/requestOTP`, user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

//validation user
export const validateOTPUser = createAsyncThunk('user/validateOTPUser', async (user) => {
  try {
    const response = await axios.post(
      `${ApiContans.BACKEND_API.BASE_API_URL}/user/validateOTP`, user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user by userid
      .addCase(fetchGetUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.data;
      })
      .addCase(fetchGetUserById.rejected, (state) => {
        state.loading = false;
      })
      //Change password
      .addCase(changepassUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(changepassUser.fulfilled, (state) => {
        state.loading = false;
        Toast.show({
          type: 'success',
          text1: 'ParkingHT',
          text2: 'Người dùng đã thay đổi mật khẩu thành công!'
        });
      })
      .addCase(changepassUser.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'ParkingHT',
          text2: `${action.error.message}`
        });
      })
      //Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        Toast.show({
          type: 'success',
          text1: 'ParkingHT',
          text2: 'Người dùng đã cập nhập thông tin thành công!'
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'ParkingHT',
          text2: `${action.error.message}`
        });
      })
      //register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data.otpResponse.code === "200") {
          Toast.show({
            type: 'success',
            text1: 'ParkingHT',
            text2: `Xác nhận OTP để sử dụng tài khoản!`
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'ParkingHT',
            text2: `${action.payload.data.otpResponse.message}`
          });
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'ParkingHT',
          text2: `${action.error.message}`
        });
      })
      //validation user
      .addCase(validateOTPUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateOTPUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.statusCode === 200) {
          Toast.show({
            type: 'success',
            text1: 'ParkingHT',
            text2: 'Đăng ký tài khoản thành công!'
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'ParkingHT',
            text2: `${action.payload.message}`
          });
        }
      })
      .addCase(validateOTPUser.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'ParkingHT',
          text2: `${action.error.message}`
        });
      })
  },
});

export default userSlice.reducer;