import React from 'react';
import { ArrowTrendingUpIcon, ChartBarIcon, UserGroupIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Projects',
    value: '12',
    icon: <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-500" />,
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
  },
  {
    name: 'Active Users',
    value: '87',
    icon: <UserGroupIcon className="h-8 w-8 text-green-500" />,
    gradient: 'from-green-400 via-blue-500 to-purple-500',
  },
  {
    name: 'Tasks Completed',
    value: '1,234',
    icon: <ChartBarIcon className="h-8 w-8 text-blue-500" />,
    gradient: 'from-blue-400 via-cyan-500 to-teal-500',
  },
  {
    name: 'Growth Rate',
    value: '+18%',
    icon: <ArrowTrendingUpIcon className="h-8 w-8 text-pink-500" />,
    gradient: 'from-purple-500 via-pink-500 to-red-500',
  },
];

const Reports = () => {
  return (
    <div className="min-h-[70vh] flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">Reports & Analytics</h1>
        <p className="mt-2 text-lg text-gray-600">Visualize your productivity and team performance with beautiful charts and stats.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={`rounded-2xl shadow-xl p-6 flex flex-col items-center bg-gradient-to-br ${stat.gradient} animate-pulse hover:scale-105 transition-transform duration-300`}
          >
            <div className="mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-white drop-shadow-lg">{stat.value}</div>
            <div className="text-lg text-white/80 mt-1">{stat.name}</div>
          </div>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">Productivity Over Time</h2>
          <div className="w-full h-48 flex items-center justify-center">
            {/* Placeholder for animated line chart */}
            <span className="text-5xl text-gray-300">📈</span>
          </div>
          <p className="mt-4 text-gray-500">(Interactive chart coming soon!)</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-bold text-pink-600 mb-4">Team Activity Breakdown</h2>
          <div className="w-full h-48 flex items-center justify-center">
            {/* Placeholder for animated pie chart */}
            <span className="text-5xl text-gray-300">🥧</span>
          </div>
          <p className="mt-4 text-gray-500">(Interactive chart coming soon!)</p>
        </div>
      </div>
    </div>
  );
};

export default Reports; 