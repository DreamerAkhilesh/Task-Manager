import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { fetchCurrentUser } from '../../store/thunks/authThunks';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ roles = [], requiredRole, children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Avoid fetching on login/register routes
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/create-first-admin';
    if (!isAuthPage && token && !currentUser && !isLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, currentUser, isLoading, location.pathname]);

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

  const effectiveRoles = requiredRole ? [requiredRole] : roles;
  if (effectiveRoles.length > 0) {
    const hasRequiredRole = effectiveRoles.includes(currentUser?.role);
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children || <Outlet />;
};

ProtectedRoute.propTypes = {
  roles: PropTypes.array,
  requiredRole: PropTypes.string,
  children: PropTypes.node,
};

export default ProtectedRoute; 