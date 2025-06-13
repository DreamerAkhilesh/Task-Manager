import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../../store/slices/userSlice';
import { getTasks } from '../../store/slices/taskSlice';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const UserProfileView = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.users);
  const { tasks } = useSelector((state) => state.tasks);

  const [userStats, setUserStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    highPriorityTasks: 0,
    dueTodayTasks: 0
  });

  useEffect(() => {
    dispatch(getUserById(userId));
    dispatch(getTasks());
  }, [dispatch, userId]);

  useEffect(() => {
    if (tasks && currentUser) {
      const userTasks = tasks.filter(task => task.assignedTo === currentUser._id);
      setUserStats({
        totalTasks: userTasks.length,
        completedTasks: userTasks.filter(task => task.status === 'completed').length,
        inProgressTasks: userTasks.filter(task => task.status === 'in_progress').length,
        pendingTasks: userTasks.filter(task => task.status === 'pending').length,
        highPriorityTasks: userTasks.filter(task => task.priority === 'high').length,
        dueTodayTasks: userTasks.filter(task => {
          const today = new Date();
          const dueDate = new Date(task.dueDate);
          return dueDate.toDateString() === today.toDateString();
        }).length
      });
    }
  }, [tasks, currentUser]);

  if (isLoading || !currentUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/users')}
        className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Users
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
              <div className="flex flex-col items-center">
                <div className="bg-white/20 p-4 rounded-full mb-4">
                  <UserCircleIcon className="h-24 w-24" />
                </div>
                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                <p className="text-indigo-100">{currentUser.role}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-600">{currentUser.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-600">{currentUser.phone || 'Not set'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BuildingOfficeIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-600">{currentUser.department || 'Not set'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-600">{currentUser.role}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-600">Member since {new Date(currentUser.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-indigo-600">{userStats.completedTasks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600">{userStats.inProgressTasks}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{userStats.pendingTasks}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-600">{userStats.highPriorityTasks}</div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Task Distribution */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Task Distribution</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Completed Tasks</span>
                  <span className="text-sm font-medium text-gray-700">
                    {Math.round((userStats.completedTasks / userStats.totalTasks) * 100) || 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${(userStats.completedTasks / userStats.totalTasks) * 100 || 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">In Progress Tasks</span>
                  <span className="text-sm font-medium text-gray-700">
                    {Math.round((userStats.inProgressTasks / userStats.totalTasks) * 100) || 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${(userStats.inProgressTasks / userStats.totalTasks) * 100 || 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Pending Tasks</span>
                  <span className="text-sm font-medium text-gray-700">
                    {Math.round((userStats.pendingTasks / userStats.totalTasks) * 100) || 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${(userStats.pendingTasks / userStats.totalTasks) * 100 || 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {tasks
                  .filter(task => task.assignedTo === currentUser._id)
                  .slice(0, 5)
                  .map(task => (
                    <div key={task._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView; 