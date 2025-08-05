import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../../store/slices/authSlice';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ roles = [] }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch user if we have a token but no user data
    const token = localStorage.getItem('token');
    if (token && !currentUser && !isLoading) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, currentUser, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0) {
    const hasRequiredRole = roles.includes(currentUser?.role);
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  roles: PropTypes.array,
};

export default ProtectedRoute; 