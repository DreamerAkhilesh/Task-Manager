import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './store/thunks/authThunks';
import api from './services/api';

// Layout
import Layout from './components/layout/Layout';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import FirstAdminCreation from './components/auth/FirstAdminCreation';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCreation from './components/admin/AdminCreation';
import UserList from './components/users/UserList';
import UserForm from './components/users/UserForm';
import UserProfileView from './components/users/UserProfileView';

// User Components
import Dashboard from './components/dashboard/Dashboard';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import Reports from './components/reports/Reports';
import Profile from './components/profile/Profile';
import UserProfile from './components/profile/UserProfile';

const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  const dispatch = useDispatch();
  const { currentUser, isLoading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Initialize API token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      api.setAuthToken(token);
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]); // Remove currentUser dependency to prevent infinite loop

  // Show loading while auth state is being determined
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  return (
    <Router {...router}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-first-admin" element={<FirstAdminCreation />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          {/* Admin Routes */}
          <Route path="/admin">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
            <Route path="users" element={<PrivateRoute roles={['admin']}><UserList /></PrivateRoute>} />
            <Route path="users/new" element={<PrivateRoute roles={['admin']}><UserForm /></PrivateRoute>} />
            <Route path="users/:id" element={<PrivateRoute roles={['admin']}><UserForm /></PrivateRoute>} />
            <Route path="users/:userId/edit" element={<PrivateRoute roles={['admin']}><UserForm /></PrivateRoute>} />
            <Route path="users/:userId/profile" element={<PrivateRoute roles={['admin']}><UserProfileView /></PrivateRoute>} />
            <Route path="tasks" element={<PrivateRoute roles={['admin']}><TaskList /></PrivateRoute>} />
            <Route path="tasks/new" element={<PrivateRoute roles={['admin']}><TaskForm /></PrivateRoute>} />
            <Route path="tasks/:id/edit" element={<PrivateRoute roles={['admin']}><TaskForm /></PrivateRoute>} />
            <Route path="create-admin" element={<PrivateRoute roles={['admin']}><AdminCreation /></PrivateRoute>} />
            <Route path="reports" element={<PrivateRoute roles={['admin']}><Reports /></PrivateRoute>} />
          </Route>

          {/* User Routes */}
          <Route path="/">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<TaskList />} />
            <Route path="tasks/new" element={<TaskForm />} />
            <Route path="tasks/:id/edit" element={<TaskForm />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={
          currentUser?.role === 'admin' ? 
            <Navigate to="/admin/dashboard" replace /> : 
            <Navigate to="/dashboard" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App; 