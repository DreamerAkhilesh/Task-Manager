// src/store/thunks/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      console.log("🔁 Response from backend:", res.data);

      // Store token in localStorage
      if (res.data.data && res.data.data.token) {
        localStorage.setItem('token', res.data.data.token);
        // Set token in API headers
        api.setAuthToken(res.data.data.token);
      }

      // ✅ Extract only the useful `data` object
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password, role }, thunkAPI) => {
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      
      // Store token in localStorage if present
      if (res.data.data && res.data.data.token) {
        localStorage.setItem('token', res.data.data.token);
        // Set token in API headers
        api.setAuthToken(res.data.data.token);
      }
      
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

// Get Current User
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to fetch current user');
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await api.post('/auth/logout');
      // Clear token from localStorage and API headers
      localStorage.removeItem('token');
      api.setAuthToken(null);
      return true;
    } catch (err) {
      // Even if logout API fails, clear local token
      localStorage.removeItem('token');
      api.setAuthToken(null);
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
);

export const createAdmin = createAsyncThunk(
  'auth/createAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/create-admin', adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Admin creation failed');
    }
  }
); 

export const createFirstAdmin = createAsyncThunk(
  'auth/createFirstAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/create-first-admin', adminData);
      
      // Store token in localStorage if present
      if (response.data.data && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        // Set token in API headers
        api.setAuthToken(response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'First admin creation failed');
    }
  }
);


