import React from 'react';
import { useSelector } from 'react-redux';
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const UserReports = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const { currentUser } = useSelector((state) => state.auth);

  // Filter tasks for current user
  const userTasks = tasks.filter(task => task.assignedTo?._id === currentUser?._id);

  // Calculate personal metrics
  const metrics = {
    totalTasks: userTasks.length,
    completedTasks: userTasks.filter(task => task.status === 'completed').length,
    inProgressTasks: userTasks.filter(task => task.status === 'in_progress').length,
    pendingTasks: userTasks.filter(task => task.status === 'pending').length,
    highPriorityTasks: userTasks.filter(task => task.priority === 'high').length,
    dueTodayTasks: userTasks.filter(task => {
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      return dueDate.toDateString() === today.toDateString();
    }).length,
    completionRate: userTasks.length > 0 
      ? Math.round((userTasks.filter(task => task.status === 'completed').length / userTasks.length) * 100)
      : 0,
    onTimeCompletion: userTasks.filter(task => 
      task.status === 'completed' && new Date(task.completedAt) <= new Date(task.dueDate)
    ).length
  };

  // Calculate productivity score (0-100)
  const productivityScore = Math.round(
    (metrics.completedTasks * 0.4 + 
     metrics.onTimeCompletion * 0.3 + 
     (metrics.totalTasks - metrics.pendingTasks) * 0.3) * 10
  );

  return (
    <div className="min-h-[70vh] flex flex-col gap-10">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
          My Performance Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Track your productivity and task completion metrics
        </p>
      </div>

      {/* Productivity Score */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Productivity Score</h2>
            <p className="text-blue-100 mt-1">Your overall performance rating</p>
          </div>
          <div className="text-6xl font-bold">{productivityScore}</div>
        </div>
        <div className="mt-4 w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${productivityScore}%` }}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-3xl font-bold text-blue-600">{metrics.completionRate}%</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">On-Time Tasks</p>
              <p className="text-3xl font-bold text-green-600">{metrics.onTimeCompletion}</p>
            </div>
            <ClockIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">High Priority</p>
              <p className="text-3xl font-bold text-red-600">{metrics.highPriorityTasks}</p>
            </div>
            <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Due Today</p>
              <p className="text-3xl font-bold text-yellow-600">{metrics.dueTodayTasks}</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Task Status Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Task Status Distribution</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Completed</span>
                <span className="text-sm font-medium text-gray-700">{metrics.completedTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(metrics.completedTasks / metrics.totalTasks) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">In Progress</span>
                <span className="text-sm font-medium text-gray-700">{metrics.inProgressTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(metrics.inProgressTasks / metrics.totalTasks) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Pending</span>
                <span className="text-sm font-medium text-gray-700">{metrics.pendingTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(metrics.pendingTasks / metrics.totalTasks) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Trends</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <StarIcon className="h-6 w-6 text-yellow-400 mr-2" />
                <span className="text-gray-700">Task Completion Rate</span>
              </div>
              <span className="text-green-600 font-semibold">+{metrics.completionRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ArrowTrendingUpIcon className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-gray-700">Productivity Growth</span>
              </div>
              <span className="text-green-600 font-semibold">+15%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserGroupIcon className="h-6 w-6 text-purple-400 mr-2" />
                <span className="text-gray-700">Team Collaboration</span>
              </div>
              <span className="text-green-600 font-semibold">+8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Personalized Recommendations</h2>
        <div className="space-y-4">
          {metrics.pendingTasks > 0 && (
            <p className="flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 mr-2" />
              You have {metrics.pendingTasks} pending tasks. Consider prioritizing them.
            </p>
          )}
          {metrics.highPriorityTasks > 0 && (
            <p className="flex items-center">
              <StarIcon className="h-5 w-5 mr-2" />
              {metrics.highPriorityTasks} high-priority tasks need your attention.
            </p>
          )}
          {metrics.dueTodayTasks > 0 && (
            <p className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {metrics.dueTodayTasks} tasks are due today. Make sure to complete them.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReports; 