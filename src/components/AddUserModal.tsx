import { useState } from 'react';
import { X } from 'lucide-react';
import { User } from '../types';

interface AddUserModalProps {
  onClose: () => void;
  onAdd: (user: Omit<User, 'id'>) => void;
}

export function AddUserModal({ onClose, onAdd }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Vetting Officer' as 'Administrator' | 'Vetting Officer',
    courseAccess: 0,
    adminAccess: 0,
    vettingAccess: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as 'Administrator' | 'Vetting Officer'
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none bg-white"
            >
              <option value="Vetting Officer">Vetting Officer</option>
              <option value="Administrator">Administrator</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Access
              </label>
              <input
                type="number"
                min="0"
                value={formData.courseAccess}
                onChange={(e) =>
                  setFormData({ ...formData, courseAccess: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Access
              </label>
              <input
                type="number"
                min="0"
                value={formData.adminAccess}
                onChange={(e) =>
                  setFormData({ ...formData, adminAccess: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vetting Access
              </label>
              <input
                type="number"
                min="0"
                value={formData.vettingAccess}
                onChange={(e) =>
                  setFormData({ ...formData, vettingAccess: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[var(--brand-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--brand-primary-hover)] transition-colors"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
