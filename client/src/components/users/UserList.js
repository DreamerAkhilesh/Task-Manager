import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, deleteExistingUser, updateExistingUser, getUserById } from '../../store/slices/userSlice';
import { getTasks } from '../../store/slices/taskSlice';
import { Menu, Transition } from '@headlessui/react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  UserCircleIcon,
  CalendarIcon,
  FlagIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
  ArrowsUpDownIcon,
  CheckIcon,
  XMarkIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import UserProfileModal from './UserProfileModal';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isLoading, error } = useSelector((state) => state.users);
  const { tasks } = useSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUserForProfile, setSelectedUserForProfile] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTasks());
  }, [dispatch]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleBulkStatusChange = async (status) => {
    try {
      await Promise.all(
        selectedUsers.map(userId =>
          dispatch(updateExistingUser({ id: userId, userData: { status } })).unwrap()
        )
      );
      setSelectedUsers([]);
      setShowBulkActions(false);
    } catch (error) {
      console.error('Failed to update users:', error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedUsers.map(userId =>
          dispatch(deleteExistingUser(userId)).unwrap()
        )
      );
      setSelectedUsers([]);
      setShowBulkActions(false);
    } catch (error) {
      console.error('Failed to delete users:', error);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(prev =>
      prev.length === filteredUsers.length
        ? []
        : filteredUsers.map(user => user._id)
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'role') {
      setRoleFilter(value);
    } else if (name === 'status') {
      setStatusFilter(value);
    }
  };

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      return direction * (a[sortField]?.localeCompare(b[sortField]) || 0);
    });
    });

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

  const getUserTaskStats = (userId) => {
    const userTasks = tasks.filter(task => task.assignedTo?._id === userId);
    return {
      total: userTasks.length,
      completed: userTasks.filter(task => task.status === 'completed').length,
      inProgress: userTasks.filter(task => task.status === 'in_progress').length,
      pending: userTasks.filter(task => task.status === 'pending').length
    };
  };

  // const handleDelete = (userId) => {
    setSelectedUser(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteExistingUser(selectedUser)).unwrap();
      toast.success('User deleted successfully');
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete user');
    }
  };

  const handleEdit = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  const handleViewProfile = (userId) => {
    const user = users.find(u => u._id === userId);
    if (user) {
      setSelectedUserForProfile(user);
      setShowProfileModal(true);
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Users</h2>
            <p className="text-blue-100 mt-1">Manage your team members</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            >
              <FunnelIcon className="h-5 w-5" />
            </button>
            <Link
              to="/users/new"
              className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              New User
            </Link>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={roleFilter}
                onChange={handleFilterChange}
                name="role"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={handleFilterChange}
                name="status"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {selectedUsers.length} users selected
              </span>
              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) => handleBulkStatusChange(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                >
                  <option value="">Change Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <TrashIcon className="h-5 w-5" />
                  Delete Selected
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedUsers([]);
                setShowBulkActions(false);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>User</span>
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Role</span>
                    {sortField === 'role' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tasks
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const stats = getUserTaskStats(user._id);
                return (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleUserSelect(user._id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <UserCircleIcon className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getRoleColor(user.role)}`}>
                        {user.role === 'admin' ? (
                          <ShieldCheckIcon className="h-4 w-4 mr-1" />
                        ) : user.role === 'manager' ? (
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <UserCircleIcon className="h-4 w-4 mr-1" />
                        )}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? (
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ShieldExclamationIcon className="h-4 w-4 mr-1" />
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-900">
                          {stats.total} total
                        </div>
                        <div className="text-sm text-green-600">
                          {stats.completed} completed
                        </div>
                        <div className="text-sm text-blue-600">
                          {stats.inProgress} in progress
                        </div>
                        <div className="text-sm text-yellow-600">
                          {stats.pending} pending
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="p-2 rounded-lg hover:bg-gray-100">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                        </Menu.Button>
                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleViewProfile(user._id)}
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                                  >
                                    <EyeIcon className="h-5 w-5 mr-2" />
                                    View Profile
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to={`/users/${user._id}/edit`}
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } flex items-center px-4 py-2 text-sm text-gray-700`}
                                  >
                                    <PencilIcon className="h-5 w-5 mr-2" />
                                    Edit User
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      setUserToDelete(user._id);
                                      setShowDeleteModal(true);
                                    }}
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } flex items-center w-full px-4 py-2 text-sm text-red-600`}
                                  >
                                    <TrashIcon className="h-5 w-5 mr-2" />
                                    Delete User
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        user={selectedUserForProfile}
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setSelectedUserForProfile(null);
        }}
        tasks={tasks}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Delete User</h3>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;