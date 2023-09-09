import { configureStore } from '@reduxjs/toolkit';
import { floatratesApi } from 'redux/api/floatrates';
import rootReducer from 'redux/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(floatratesApi.middleware),
});
