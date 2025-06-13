import React from 'react';
import { useSelector } from 'react-redux';
import {
  ChartBarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

const AdminReports = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.users);

  // Calculate system-wide metrics
  const metrics = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'active').length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.status === 'completed').length,
    inProgressTasks: tasks.filter(task => task.status === 'in_progress').length,
    pendingTasks: tasks.filter(task => task.status === 'pending').length,
    highPriorityTasks: tasks.filter(task => task.priority === 'high').length,
    dueTodayTasks: tasks.filter(task => {
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      return dueDate.toDateString() === today.toDateString();
    }).length,
    systemHealth: Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100) || 0
  };

  // Calculate team performance metrics
  const teamMetrics = {
    averageCompletionRate: Math.round((metrics.completedTasks / metrics.totalTasks) * 100) || 0,
    activeTaskRate: Math.round((metrics.inProgressTasks / metrics.totalTasks) * 100) || 0,
    pendingTaskRate: Math.round((metrics.pendingTasks / metrics.totalTasks) * 100) || 0
  };

  return (
    <div className="min-h-[70vh] flex flex-col gap-10">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
          System Analytics Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Monitor team performance and system health metrics
        </p>
      </div>

      {/* System Health Overview */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">System Health</h2>
            <p className="text-indigo-100 mt-1">Overall system performance rating</p>
          </div>
          <div className="text-6xl font-bold">{metrics.systemHealth}%</div>
        </div>
        <div className="mt-4 w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${metrics.systemHealth}%` }}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-indigo-600">{metrics.totalUsers}</p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-3xl font-bold text-green-600">{metrics.activeUsers}</p>
            </div>
            <ShieldCheckIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-3xl font-bold text-blue-600">{metrics.totalTasks}</p>
            </div>
            <ClipboardDocumentListIcon className="h-8 w-8 text-blue-500" />
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
      </div>

      {/* Team Performance & Task Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Team Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                <span className="text-sm font-medium text-gray-700">{teamMetrics.averageCompletionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${teamMetrics.averageCompletionRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Active Tasks</span>
                <span className="text-sm font-medium text-gray-700">{teamMetrics.activeTaskRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${teamMetrics.activeTaskRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Pending Tasks</span>
                <span className="text-sm font-medium text-gray-700">{teamMetrics.pendingTaskRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${teamMetrics.pendingTaskRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">System Trends</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ChartBarIcon className="h-6 w-6 text-indigo-400 mr-2" />
                <span className="text-gray-700">User Growth</span>
              </div>
              <span className="text-green-600 font-semibold">+12%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ArrowTrendingUpIcon className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-gray-700">Task Completion</span>
              </div>
              <span className="text-green-600 font-semibold">+8%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ChartPieIcon className="h-6 w-6 text-purple-400 mr-2" />
                <span className="text-gray-700">System Efficiency</span>
              </div>
              <span className="text-green-600 font-semibold">+15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Insights */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">System Insights</h2>
        <div className="space-y-4">
          {metrics.highPriorityTasks > 0 && (
            <p className="flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 mr-2" />
              {metrics.highPriorityTasks} high-priority tasks need attention across the team.
            </p>
          )}
          {metrics.dueTodayTasks > 0 && (
            <p className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              {metrics.dueTodayTasks} tasks are due today. Consider redistributing workload if needed.
            </p>
          )}
          {metrics.pendingTasks > metrics.totalTasks * 0.3 && (
            <p className="flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2" />
              High number of pending tasks. Consider reviewing task distribution.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReports; 