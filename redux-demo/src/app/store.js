import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import counterReducer from '../features/counter/counterSlice';
import employeeReducer from '../features/employee/employeeSlice';
import toastReducer from '../features/Toast/toastSlice';

const middleware = [...getDefaultMiddleware(), logger]

export default configureStore({
  reducer: {
    counter: counterReducer,
    employee: employeeReducer,
    toast: toastReducer,

  },
  middleware
});
