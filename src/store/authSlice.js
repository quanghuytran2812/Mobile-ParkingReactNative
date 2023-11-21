import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (credentials) => {
    try {
        const response = await axios.post('http://192.168.1.105:8090/parkinght/auth/generateToken', credentials);
        const token = response.data.token;
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default authSlice.reducer;