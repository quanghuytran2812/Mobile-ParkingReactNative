import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import vehicleSlice from './vehicleSlice';
import categorySlide from './categorySlide';

const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleSlice,
    category: categorySlide
  },
});


export default store;