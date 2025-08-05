import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'; // Ensure this path is correct based on your structure

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    const response = await api.get('/users');
    console.log('fetchUsers response:', response.data);
    
    // Handle different response structures
    if (response.data && response.data.data) {
      // If response has nested data structure
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      // If response is directly an array
      return response.data;
    } else {
      // Fallback to empty array
      console.warn('Unexpected response structure:', response.data);
      return [];
    }
  } catch (error) {
    console.error('fetchUsers error:', error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
  }
});

// Fetch user by ID
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id, thunkAPI) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Create user
export const createNewUser = createAsyncThunk('users/createNewUser', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Update user
export const updateExistingUser = createAsyncThunk('users/updateExistingUser', async ({ id, updatedData }, thunkAPI) => {
  try {
    const response = await api.put(`/users/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Delete user
export const deleteExistingUser = createAsyncThunk('users/deleteExistingUser', async (id, thunkAPI) => {
  try {
    await api.delete(`/users/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
