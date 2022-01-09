import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './AuthenticationSlice';

export default configureStore({
  reducer: {
    authenticationSlice: authenticationSlice
  }
});
