// configureStore.js

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from '../reducers/authSlice';

const rootReducer = combineReducers({
  auth: authReducer, // Replace with your actual reducers
  // Add other reducers as needed
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // List of reducers to persist (only 'auth' in this example)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
