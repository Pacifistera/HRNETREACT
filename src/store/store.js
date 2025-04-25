import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';

// Création du store
export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});
