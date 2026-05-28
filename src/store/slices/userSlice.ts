import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Actions for login
    loginRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload; // Set the user object in the state -> contains user data
      state.error = null;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload;
    },

    // Actions for registration
    registerRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload; // Set the user object in the state -> contains user data
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload;
    },

    // Logout Action
    logout: state => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
