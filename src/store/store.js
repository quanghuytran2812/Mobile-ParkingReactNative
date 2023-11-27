import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import vehicleSlice from './vehicleSlice';
import categorySlice from './categorySlice';
import reportSlice from './reportSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleSlice,
    category: categorySlice,
    report: reportSlice,
    user: userSlice
  },
});


export default store;