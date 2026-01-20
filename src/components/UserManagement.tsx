import { useState } from 'react';
import { Search, UserPlus, Edit3, Users, UserCheck, Shield, Trash2 } from 'lucide-react';
import { EditUserModal } from './EditUserModal';
import { AddUserPage } from './AddUserPage';

interface CourseAccess {
  courseId: string;
  courseName: string;
  courseCode: string;
  category: string;
  hasAdminAccess: boolean;
  hasVettingAccess: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Vetting Officer';
  courseAccess: number;
  adminAccess: number;
  vettingAccess: number;
  coursePermissions?: CourseAccess[];
}

const initialUsers: User[] = [
  {
    id: '1',
    name: 'User1',
    email: 'User1@cic.gov.hk',
    role: 'Administrator',
    courseAccess: 4,
    adminAccess: 4,
    vettingAccess: 3,
  },
  {
    id: '2',
    name: 'User2',
    email: 'User2@cic.gov.hk',
    role: 'Vetting Officer',
    courseAccess: 3,
    adminAccess: 0,
    vettingAccess: 3,
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatCard, setSelectedStatCard] = useState('Total Users');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalUsers = users.length;
  const administrators = users.filter(u => u.role === 'Administrator').length;
  const vettingOfficers = users.filter(u => u.role === 'Vetting Officer').length;

  const updateUser = (updatedUser: User) => {
    setUsers(users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const addUser = (newUser: User) => {
    setUsers([...users, newUser]);
    setShowAddUser(false);
  };

  const deleteUser = (userId: string) => {
    if (window.confirm('Are you sure want to delete?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // If showing add user page, render that instead
  if (showAddUser) {
    return <AddUserPage onCancel={() => setShowAddUser(false)} onSave={addUser} />;
  }

  return (
    <div className="w-full px-4 pt-[5px] md:pb-8 mt-0 pr-[32px] pb-[32px] pl-[32px] bg-[#f3f6f8] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-['Arial:Bold',sans-serif] text-[20px] md:text-[24px] text-[#4a5565] mt-[30px] mr-[0px] mb-[0px] ml-[0px]">
          User Management
        </h1>
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[var(--brand-primary-hover)] transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span className="font-['Arial:Regular',sans-serif] text-[16px]">Add User</span>
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button
          onClick={() => setSelectedStatCard('Total Users')}
          className={`flex-1 rounded-lg border shadow-sm p-3 md:p-4 transition-colors cursor-pointer ${
            selectedStatCard === 'Total Users' 
              ? 'bg-[var(--brand-primary-bg)] border-[var(--brand-primary-border)] hover:bg-[var(--brand-primary-bg)]/80' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-['Arial:Bold',sans-serif] text-[16px] md:text-[20px] text-[#4a5565]">Total Users</p>
              <p className="font-['Arial:Regular',sans-serif] text-[20px] md:text-[24px] text-[var(--brand-primary)] mt-1">{totalUsers}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100/30 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-[var(--brand-primary)]" />
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedStatCard('Administrator')}
          className={`flex-1 rounded-lg border shadow-sm p-3 md:p-4 transition-colors cursor-pointer ${
            selectedStatCard === 'Administrator' 
              ? 'bg-[var(--brand-primary-bg)] border-[var(--brand-primary-border)] hover:bg-[var(--brand-primary-bg)]/80' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-['Arial:Bold',sans-serif] text-[16px] md:text-[20px] text-[#4a5565]">Administrator</p>
              <p className="font-['Arial:Regular',sans-serif] text-[20px] md:text-[24px] text-[var(--brand-primary)] mt-1">{administrators}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100/30 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-[var(--brand-primary)]" />
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedStatCard('Vetting Officer')}
          className={`flex-1 rounded-lg border shadow-sm p-3 md:p-4 transition-colors cursor-pointer ${
            selectedStatCard === 'Vetting Officer' 
              ? 'bg-[var(--brand-primary-bg)] border-[var(--brand-primary-border)] hover:bg-[var(--brand-primary-bg)]/80' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-['Arial:Bold',sans-serif] text-[16px] md:text-[20px] text-[#4a5565]">Vetting Officer</p>
              <p className="font-['Arial:Regular',sans-serif] text-[20px] md:text-[24px] text-[var(--brand-primary)] mt-1">{vettingOfficers}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100/30 rounded-full flex items-center justify-center">
              <UserCheck className="w-5 h-5 md:w-6 md:h-6 text-[var(--brand-primary)]" />
            </div>
          </div>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#99A1AF]" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[42px] pl-9 md:pl-10 pr-4 border border-[#d1d5dc] rounded-lg font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
          />
        </div>
      </div>

      {/* User Table - Desktop */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-['Arial:Bold',sans-serif] text-[12px] text-[#6a7282] uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left font-['Arial:Bold',sans-serif] text-[12px] text-[#6a7282] uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left font-['Arial:Bold',sans-serif] text-[12px] text-[#6a7282] uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left font-['Arial:Bold',sans-serif] text-[12px] text-[#6a7282] uppercase tracking-wider">
                Admin Access
              </th>
              <th className="px-6 py-3 text-left font-['Arial:Bold',sans-serif] text-[12px] text-[#6a7282] uppercase tracking-wider">
                Vetting Access
              </th>
              <th className="px-6 py-3 text-left font-['Arial:Bold',sans-serif] text-[12px] text-[#6a7282] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-['Arial:Regular',sans-serif] text-[14px] text-[#101828]">
                      {user.name}
                    </p>
                    <p className="font-['Arial:Regular',sans-serif] text-[14px] text-[#6a7282]">
                      {user.email}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-[12px] font-['Arial:Regular',sans-serif] ${
                    user.role === 'Administrator'
                      ? 'bg-[#ffe2e2] text-[#c10007]'
                      : 'bg-green-100 text-[#008236]'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-['Arial:Regular',sans-serif] text-[14px] text-[#101828]">
                    {user.courseAccess}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-['Arial:Regular',sans-serif] text-[14px] text-[#101828]">
                    {user.adminAccess}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-['Arial:Regular',sans-serif] text-[14px] text-[#101828]">
                    {user.vettingAccess}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="flex items-center gap-1 text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span className="font-['Arial:Regular',sans-serif] text-[14px]">Edit Access</span>
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="flex items-center gap-1 text-[#c10007] hover:text-[#990000] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="font-['Arial:Regular',sans-serif] text-[14px]">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-['Arial:Regular',sans-serif] text-[16px] text-[#6a7282]">
              No users found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* User Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="space-y-3">
              <div>
                <p className="font-['Arial:Regular',sans-serif] text-[16px] text-[#101828]">
                  {user.name}
                </p>
                <p className="font-['Arial:Regular',sans-serif] text-[14px] text-[#6a7282]">
                  {user.email}
                </p>
              </div>
              
              <div>
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-[12px] font-['Arial:Regular',sans-serif] ${
                  user.role === 'Administrator'
                    ? 'bg-[#ffe2e2] text-[#c10007]'
                    : 'bg-green-100 text-[#008236]'
                }`}>
                  {user.role}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-[#6a7282] text-[12px]">Course</p>
                  <p className="text-[#101828] font-medium">{user.courseAccess}</p>
                </div>
                <div>
                  <p className="text-[#6a7282] text-[12px]">Admin</p>
                  <p className="text-[#101828] font-medium">{user.adminAccess}</p>
                </div>
                <div>
                  <p className="text-[#6a7282] text-[12px]">Vetting</p>
                  <p className="text-[#101828] font-medium">{user.vettingAccess}</p>
                </div>
              </div>

              <button
                onClick={() => setEditingUser(user)}
                className="w-full flex items-center justify-center gap-2 text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] transition-colors py-2 border border-[var(--brand-primary)] rounded-lg"
              >
                <Edit3 className="w-4 h-4" />
                <span className="font-['Arial:Regular',sans-serif] text-[14px]">Edit Access</span>
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="w-full flex items-center justify-center gap-2 text-[#c10007] hover:text-[#990000] transition-colors py-2 border border-[#c10007] rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-['Arial:Regular',sans-serif] text-[14px]">Delete</span>
              </button>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 py-12 text-center">
            <p className="font-['Arial:Regular',sans-serif] text-[16px] text-[#6a7282]">
              No users found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={updateUser}
        />
      )}
    </div>
  );
}