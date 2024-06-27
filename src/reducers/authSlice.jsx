// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.user = action.payload; // Assuming action.payload includes user data
      state.isLoggedIn = true;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.loginError = null;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action) {
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    fetchProfileSuccess(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    fetchProfileFailure(state, action) {
      state.error = action.payload;
    },
   updateProfileSuccess(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    updateProfileFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess,loginFailure, logout, 
  fetchProfileSuccess,fetchProfileFailure,
  updateProfileSuccess,updateProfileFailure, registerStart, registerSuccess, registerFailure } = authSlice.actions;

// Asynchronous action creator using Redux Thunk
export const registerUser = (formData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', formData);

     // Assuming response.data contains { token, user }
     const { token, user } = response.data;

     // Store token in localStorage
     localStorage.setItem('token', token);

    dispatch(registerSuccess(user)); // Assuming response.data contains user data
    return user; // Return user data after successful registration
  } catch (error) {
    dispatch(registerFailure(error.message));
    throw error;
  }
};


export const loginUser = (formData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', formData);
    
    // Assuming response.data contains { token, user } on successful login
    const { token, user } = response.data;

    // Store token in localStorage
    localStorage.setItem('token', token);

    // Dispatch success action with user data
    dispatch(loginSuccess(user));

    return user; // Return user data after successful login
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Unauthorized error (e.g., invalid credentials)
      dispatch(loginFailure('Invalid email or password. Please try again.'));
    } else if (error.response && error.response.data && error.response.data.message) {
      
      dispatch(loginFailure('Login failed. Please try again.'));

    } else {
      // Example: setLoginError('Login failed. Please try again.');
      dispatch(loginFailure('Login failed. Please try again.'));
    }
    throw error; // Rethrow error for handling in component
  }
};

export const fetchProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const {user} = response.data;

    const response = await axios.get('http://localhost:5000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // Assuming JWT token stored in localStorage
      },
    });
    dispatch(fetchProfileSuccess(user)); // Assuming the user data is returned from the API

    return user; // Return user data after successful registration
  } catch (error) {
    dispatch(fetchProfileFailure(error.message)); // Handle error
  }
};

export const updateProfileUser = (userId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/user/profile/${userId}`, updatedData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token stored in localStorage
      },
    });
    dispatch(updateProfileSuccess(response.data));

    toast.success('Profile updated successfully', {
      position: 'top-center',
      autoClose: 3000, // Close the toast after 3 seconds (3000 milliseconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    dispatch(updateProfileFailure(error.message));
  }
};

export default authSlice.reducer;
