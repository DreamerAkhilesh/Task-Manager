import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/store';

// Components
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import FirstAdminCreation from './components/auth/FirstAdminCreation';
import Dashboard from './components/dashboard/Dashboard';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import TaskDetails from './components/tasks/TaskDetails';
import UserList from './components/users/UserList';
import UserForm from './components/users/UserForm';
import UserProfile from './components/users/UserProfile';
import UserProfileView from './components/users/UserProfileView';
import Reports from './components/reports/Reports';
import AdminReports from './components/reports/AdminReports';
import UserReports from './components/reports/UserReports';
import Profile from './components/profile/Profile';
import Unauthorized from './components/auth/Unauthorized';

// Protected Route Components
import PrivateRoute from './components/auth/PrivateRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCreation from './components/admin/AdminCreation';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-first-admin" element={<FirstAdminCreation />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected User Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskList />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/new"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskForm />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskForm />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id/details"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskDetails />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <Layout>
                    <Reports />
                  </Layout>
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <UserList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users/new"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <UserForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <UserForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users/:id/profile"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <UserProfileView />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tasks"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <TaskList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tasks/new"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <TaskForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tasks/:id"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <TaskForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tasks/:id/details"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <TaskDetails />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <AdminReports />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/create-admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <AdminCreation />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App; 