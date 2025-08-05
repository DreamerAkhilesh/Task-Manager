import React from 'react';
import { XMarkIcon, UserCircleIcon, EnvelopeIcon, ShieldCheckIcon, ShieldExclamationIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const UserProfileModal = ({ user, isOpen, onClose, tasks = [] }) => {
  if (!isOpen || !user) return null;

  const getUserTaskStats = (userId) => {
    const userTasks = tasks.filter(task => task.assignedTo?._id === userId);
    return {
      total: userTasks.length,
      completed: userTasks.filter(task => task.status === 'completed').length,
      inProgress: userTasks.filter(task => task.status === 'in_progress').length,
      pending: userTasks.filter(task => task.status === 'pending').length
    };
  };

  const stats = getUserTaskStats(user._id);

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-gradient-to-r from-purple-500 to-indigo-600';
      case 'manager':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'inactive':
        return 'bg-gradient-to-r from-red-500 to-pink-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-gray-600 flex items-center mt-1">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                {user.email}
              </p>
            </div>
          </div>

          {/* Role and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                {user.role === 'admin' ? (
                  <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
                ) : (
                  <UserCircleIcon className="h-5 w-5 text-blue-600" />
                )}
                <span className="text-sm font-medium text-gray-700">Role</span>
              </div>
              <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full text-white ${getRoleColor(user.role)}`}>
                {user.role}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                {user.isActive ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                ) : (
                  <ShieldExclamationIcon className="h-5 w-5 text-red-600" />
                )}
                <span className="text-sm font-medium text-gray-700">Status</span>
              </div>
              <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full text-white ${getStatusColor(user.isActive ? 'active' : 'inactive')}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Task Statistics */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Task Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CalendarIcon className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Joined</span>
              </div>
              <p className="text-gray-900">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CalendarIcon className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Last Updated</span>
              </div>
              <p className="text-gray-900">
                {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal; 