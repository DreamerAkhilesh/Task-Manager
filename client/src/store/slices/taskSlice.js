/**
 * Task Slice - Redux slice for managing tasks in the application
 * Handles all task-related state including CRUD operations, loading states, and errors
 */

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTasks,
  fetchTask,
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
} from '../thunks/taskThunks';

// Export thunks with more intuitive names for better readability
// These aliases maintain backward compatibility while providing clearer intent
export const getTasks = fetchTasks;         // Fetch all tasks
export const getTask = fetchTask;           // Fetch single task
export const createTask = createNewTask;     // Create new task
export const updateTask = updateExistingTask; // Update existing task
export const deleteTask = deleteExistingTask; // Delete task

/**
 * Initial state for the tasks slice
 * @typedef {Object} TaskState
 * @property {Array} tasks - List of all tasks
 * @property {Object|null} currentTask - Currently selected/active task
 * @property {boolean} loading - Loading state for async operations
 * @property {string|null} error - Error message if any operation fails
 * @property {number} totalTasks - Total number of tasks in the system
 * @property {number} currentPage - Current page number for pagination
 * @property {number} totalPages - Total number of pages available
 */
const initialState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
  totalTasks: 0,
  currentPage: 1,
  totalPages: 1,
};

/**
 * Create the task slice with reducers and extra reducers for async actions
 */
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /**
     * Clear any error messages in the state
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Clear the currently selected task
     */
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    /**
     * Reset loading and error states to their initial values
     */
    reset: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  /**
   * Handle async action states (pending, fulfilled, rejected) for all task operations
   */
  extraReducers: (builder) => {
    builder
      // Fetch all tasks
      .addCase(fetchTasks.pending, (state) => {
        // Set loading state when the request starts
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        // Update state with fetched tasks and pagination data
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.totalTasks = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        // Handle any errors that occurred during the request
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch tasks';
      })
      // Fetch single task
      .addCase(fetchTask.pending, (state) => {
        // Set loading state when fetching a single task
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        // Store the fetched task in currentTask
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        // Handle error in fetching single task
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch task';
      })
      // Create new task
      .addCase(createNewTask.pending, (state) => {
        // Set loading state when creating a new task
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        // Add the new task to the beginning of the list and update total
        state.loading = false;
        state.tasks.unshift(action.payload); // Add new task at the start
        state.totalTasks += 1; // Increment total task count
      })
      .addCase(createNewTask.rejected, (state, action) => {
        // Handle error in task creation
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create task';
      })
      // Update existing task
      .addCase(updateExistingTask.pending, (state) => {
        // Set loading state when updating a task
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingTask.fulfilled, (state, action) => {
        // Update the task in both tasks list and currentTask if it's the same task
        state.loading = false;
        // Find and update the task in the tasks array
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        // Update currentTask if it's the same task being edited
        if (state.currentTask?._id === action.payload._id) {
          state.currentTask = action.payload;
        }
      })
      .addCase(updateExistingTask.rejected, (state, action) => {
        // Handle error in task update
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update task';
      })
      // Delete existing task
      .addCase(deleteExistingTask.pending, (state) => {
        // Set loading state when deleting a task
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingTask.fulfilled, (state, action) => {
        // Remove the task from the state and update counts
        state.loading = false;
        // Remove the task from tasks array
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
        // Decrement total task count
        state.totalTasks -= 1;
        // Clear currentTask if it's the one being deleted
        if (state.currentTask?._id === action.payload) {
          state.currentTask = null;
        }
      })
      .addCase(deleteExistingTask.rejected, (state, action) => {
        // Handle error in task deletion
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete task';
      });
  },
});

// Export synchronous action creators
export const { clearError, clearCurrentTask, reset } = taskSlice.actions;

// Export the reducer for store configuration
export default taskSlice.reducer; 