import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../store/slices/userSlice';
import { getTasks } from '../../store/slices/taskSlice';
import {
  UserCircleIcon,
  CalendarIcon,
  ClockIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  UserIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as ClockIconSolid,
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isLoading, error } = useSelector((state) => state.users);
  const { tasks = [] } = useSelector((state) => state.tasks);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getTasks({ page: 1, limit: 1000 }));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-6 rounded-lg shadow-lg">
        <div className="flex items-center">
          <ExclamationCircleIcon className="h-8 w-8 text-red-500 mr-4" />
          <div>
            <h3 className="text-lg font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userTasks = tasks.filter(task => task.assignedTo?._id === user._id);
  const completedTasks = userTasks.filter(task => task.status === 'completed');
  const pendingTasks = userTasks.filter(task => task.status === 'pending');
  const inProgressTasks = userTasks.filter(task => task.status === 'in_progress');

  const stats = {
    total: userTasks.length,
    completed: completedTasks.length,
    pending: pendingTasks.length,
    inProgress: inProgressTasks.length,
    completionRate: userTasks.length ? Math.round((completedTasks.length / userTasks.length) * 100) : 0
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">User Profile</h2>
              <p className="text-blue-100 mt-1">View and manage user details</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/admin/users/${user._id}`)}
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="h-32 w-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
              <div className="mt-4 flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === 'admin'
                    ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white'
                    : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                }`}>
                  {user.role}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.isActive
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                    : 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                }`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center text-gray-600">
                <EnvelopeIcon className="h-5 w-5 mr-3" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="h-5 w-5 mr-3" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ClockIcon className="h-5 w-5 mr-3" />
                <span>Last active {new Date(user.lastActive || user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Tasks */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Tasks</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.total}</h3>
                </div>
                <DocumentTextIcon className="h-8 w-8 text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Completed</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.completed}</h3>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">In Progress</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.inProgress}</h3>
                </div>
                <ClockIconSolid className="h-8 w-8 text-yellow-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Pending</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.pending}</h3>
                </div>
                <XCircleIcon className="h-8 w-8 text-red-200" />
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Tasks</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {userTasks.length > 0 ? (
                userTasks.slice(0, 5).map((task) => (
                  <div key={task._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === 'completed'
                            ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                            : task.status === 'in_progress'
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
                            : 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                        }`}>
                          {task.status.replace('_', ' ')}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'high'
                            ? 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                            : task.priority === 'medium'
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
                            : 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900">No tasks assigned</p>
                  <p className="text-sm text-gray-500 mt-1">This user hasn't been assigned any tasks yet</p>
                </div>
              )}
            </div>
            {userTasks.length > 5 && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => navigate('/tasks')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all tasks →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 