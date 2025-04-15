import { createSlice } from '@reduxjs/toolkit';

let user = null;
try {
  user = JSON.parse(localStorage.getItem('user'));
} catch (error) {
  user = null;
}

const initialState = {
  user: user,
  token: localStorage.getItem('token') || null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
