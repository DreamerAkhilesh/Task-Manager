/**
 * Task Thunks Module
 * Contains all async action creators (thunks) for task-related operations
 * Handles API communication, error handling, and data validation
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import taskService from '../../services/taskService';

/**
 * Fetch all tasks with optional filtering parameters
 * @param {Object} params - Query parameters for filtering tasks
 * @param {string} [params.assignedTo] - Filter tasks by assigned user ID
 * @param {string} [params.status] - Filter tasks by status
 * @param {string} [params.priority] - Filter tasks by priority
 * @returns {Promise<Object>} Object containing tasks array and pagination data
 */
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params = {}, { rejectWithValue }) => {
    try {
      console.log('Fetching tasks with params:', params); // Debug log
      const response = await taskService.getTasks(params);
      console.log('Tasks API response:', response); // Debug log
      return response.data;
    } catch (error) {
      console.error('Error in fetchTasks:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
    }
  }
);

/**
 * Fetch a single task by its ID
 * @param {string} id - The ID of the task to fetch
 * @returns {Promise<Object>} The task data
 */
export const fetchTask = createAsyncThunk(
  'tasks/fetchTask',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/**
 * Create a new task with attachments support
 * @param {FormData} taskData - Form data containing task details and attachments
 * @param {string} taskData.title - Task title
 * @param {string} taskData.description - Task description
 * @param {string} taskData.status - Task status (pending/in_progress/completed)
 * @param {string} taskData.priority - Task priority (high/medium/low)
 * @param {string} taskData.dueDate - Task due date
 * @param {string} taskData.assignedTo - ID of user assigned to task
 * @param {File[]} [taskData.attachments] - Optional PDF attachments
 * @returns {Promise<Object>} The created task data
 * @throws {Error} If required fields are missing or file types are invalid
 */
export const createNewTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      console.log('Creating task with data:', taskData); // Debug log

      // Validate required fields
      const requiredFields = ['title', 'description', 'status', 'priority', 'dueDate', 'assignedTo'];
      const missingFields = requiredFields.filter(field => !taskData.get(field));
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate file types if attachments are provided
      const attachments = taskData.getAll('attachments');
      if (attachments && attachments.length > 0) {
        const invalidFiles = attachments.filter(file => {
          return file && file.type && !file.type.includes('pdf');
        });
        if (invalidFiles.length > 0) {
          throw new Error('Only PDF files are allowed');
        }
      }

      const response = await api.post('/tasks', taskData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Task creation response:', response.data); // Debug log

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create task');
      }

      return response.data.data;
    } catch (error) {
      console.error('Error creating task:', error); // Debug log
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to create task'
      );
    }
  }
);

/**
 * Update an existing task including attachments
 * @param {Object} params - Update parameters
 * @param {string} params.id - ID of the task to update
 * @param {Object} params.taskData - New task data
 * @param {string} [params.taskData.title] - Updated task title
 * @param {string} [params.taskData.description] - Updated task description
 * @param {string} [params.taskData.status] - Updated task status
 * @param {string} [params.taskData.priority] - Updated task priority
 * @param {string} [params.taskData.dueDate] - Updated due date
 * @param {string} [params.taskData.assignedTo] - Updated assignee ID
 * @param {File[]} [params.taskData.attachments] - New attachments to add
 * @returns {Promise<Object>} The updated task data
 */
export const updateExistingTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      // Append task data (excluding attachments field)
      Object.entries(taskData).forEach(([key, value]) => {
        if (key !== 'attachments') {
          formData.append(key, value);
        }
      });

      // Append new attachments
      if (taskData.attachments) {
        taskData.attachments.forEach(file => {
          formData.append('attachments', file);
        });
      }

      const response = await api.put(`/tasks/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/**
 * Delete an existing task
 * @param {string} id - ID of the task to delete
 * @returns {Promise<string>} The ID of the deleted task
 * Used by the reducer to remove the task from state
 */
export const deleteExistingTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id; // Return ID for state updates
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/**
 * Upload a document to an existing task
 * @param {Object} params - Upload parameters
 * @param {string} params.taskId - ID of the task to attach document to
 * @param {File} params.file - The file to upload
 * @returns {Promise<Object>} The uploaded document data
 */
export const uploadTaskDocument = createAsyncThunk(
  'tasks/uploadDocument',
  async ({ taskId, file }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/tasks/${taskId}/documents`, file);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/**
 * Delete a document from a task
 * @param {Object} params - Delete parameters
 * @param {string} params.taskId - ID of the task containing the document
 * @param {string} params.docId - ID of the document to delete
 * @returns {Promise<Object>} Object containing taskId and docId for state updates
 */
export const deleteTaskDocument = createAsyncThunk(
  'tasks/deleteDocument',
  async ({ taskId, docId }, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${taskId}/documents/${docId}`);
      return { taskId, docId }; // Return IDs for state updates
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
); 