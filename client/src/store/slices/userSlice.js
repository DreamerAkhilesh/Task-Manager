import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchUserById,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
} from '../thunks/userThunks';

const initialState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log('userSlice - fetchUsers.fulfilled - payload:', action.payload);
        state.isLoading = false;
        state.users = Array.isArray(action.payload) ? action.payload : [];
        console.log('userSlice - state.users after update:', state.users);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.error('userSlice - fetchUsers.rejected - error:', action.payload);
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create user
      .addCase(createNewUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update user
      .addCase(updateExistingUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExistingUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
        state.selectedUser = null;
      })
      .addCase(updateExistingUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteExistingUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExistingUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteExistingUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedUser, clearUserError } = userSlice.actions;

export default userSlice.reducer;

// Optional: Export thunks for use in components
export {
  fetchUsers as getUsers,
  fetchUserById as getUserById,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
};
