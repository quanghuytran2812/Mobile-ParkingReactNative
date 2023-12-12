import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';
import Toast from 'react-native-toast-message';

export const apiSendOtpByPh = createAsyncThunk('otp/apiSendOtpByPh', async (destPhoneNumber) => {
    try {
        const response = await axios.post(
            `${ApiContans.BACKEND_API.BASE_API_URL}/reset/send-otp`, { destPhoneNumber: destPhoneNumber }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const apivalidateOtpResetP = createAsyncThunk('otp/apivalidateOtpResetP', async (otp) => {
    try {
        const response = await axios.post(
            `${ApiContans.BACKEND_API.BASE_API_URL}/reset/validateOtp`, { otp: otp });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
})

export const apiResetP = createAsyncThunk('otp/apiResetP', async (data) => {
    try {
        const response = await axios.post(
            `${ApiContans.BACKEND_API.BASE_API_URL}/reset/resetPassword?phoneNumber=` + data.phone, { confirmPassword: data.confirmPassword });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
})

const otpSlice = createSlice({
    name: 'otp',
    initialState: {
        urlResetPass: '',
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // send-otp
            .addCase(apiSendOtpByPh.pending, (state) => {
                state.loading = true;
            })
            .addCase(apiSendOtpByPh.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.code === "200") {
                    Toast.show({
                        type: 'success',
                        text1: 'ParkingHT',
                        text2: 'Bạn đã gửi OTP thành công!'
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'ParkingHT',
                        text2: `${action.payload.message}`
                    });
                }
            })
            .addCase(apiSendOtpByPh.rejected, (state,action) => {
                state.loading = false;
                Toast.show({
                    type: 'error',
                    text1: 'ParkingHT',
                    text2: `${action.error.message}`
                });
            })
            //validateOtp
            .addCase(apivalidateOtpResetP.pending, (state) => {
                state.loading = true
            })
            .addCase(apivalidateOtpResetP.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.statusCode === 200) {
                    state.urlResetPass = action.payload.data
                    Toast.show({
                        type: 'success',
                        text1: 'ParkingHT',
                        text2: 'Xác thực OTP thành công!'
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'ParkingHT',
                        text2: `${action.payload.message}`
                    });
                }
            })
            .addCase(apivalidateOtpResetP.rejected, (state, action) => {
                state.loading = false
                Toast.show({
                    type: 'error',
                    text1: 'ParkingHT',
                    text2: `${action.error.message}`
                });
            })
            //reset pass
            .addCase(apiResetP.pending, (state) => {
                state.loading = true
            })
            .addCase(apiResetP.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(apiResetP.rejected, (state, action) => {
                state.loading = false
                Toast.show({
                    type: 'error',
                    text1: 'ParkingHT',
                    text2: `${action.error.message}`
                });
            })
    },
});

export default otpSlice.reducer;