import { useState } from 'react';
import { X, Save, Check, Search } from 'lucide-react';

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

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (user: User) => void;
  isNew?: boolean;
}

// Mock courses data
const availableCourses = [
  { id: '1', name: '工地領班員安全訓練課程', code: 'FRC1', category: 'FRC' },
  { id: '2', name: '工地領班員安全訓練課程 2', code: 'FRC2', category: 'FRC' },
  { id: '3', name: '建造工友(指定行業)安全訓練課程 - 升降機工', code: 'AIDE5', category: 'AIDE' },
  { id: '4', name: '建造工友(指定行業)安全訓練課程 - 升降機維工', code: 'AIDC9', category: 'AIDC' },
];

export function EditUserModal({ user, onClose, onSave, isNew = false }: EditUserModalProps) {
  // Initialize course permissions
  const initialPermissions: CourseAccess[] = availableCourses.map(course => {
    const existing = user.coursePermissions?.find(p => p.courseId === course.id);
    return {
      courseId: course.id,
      courseName: course.name,
      courseCode: course.code,
      category: course.category,
      hasAdminAccess: existing?.hasAdminAccess || false,
      hasVettingAccess: existing?.hasVettingAccess || false,
    };
  });

  const [formData, setFormData] = useState<User>(user);
  const [coursePermissions, setCoursePermissions] = useState<CourseAccess[]>(initialPermissions);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAdminAccess = (courseId: string) => {
    setCoursePermissions(prev => prev.map(course =>
      course.courseId === courseId
        ? { ...course, hasAdminAccess: !course.hasAdminAccess }
        : course
    ));
  };

  const toggleVettingAccess = (courseId: string) => {
    setCoursePermissions(prev => prev.map(course =>
      course.courseId === courseId
        ? { ...course, hasVettingAccess: !course.hasVettingAccess }
        : course
    ));
  };

  const bulkCheckAdmin = () => {
    // Check if all are already checked
    const allChecked = coursePermissions.every(course => course.hasAdminAccess);
    // If all checked, uncheck all; otherwise, check all
    setCoursePermissions(prev => prev.map(course => ({
      ...course,
      hasAdminAccess: !allChecked,
    })));
  };

  const bulkCheckVetting = () => {
    // Check if all are already checked
    const allChecked = coursePermissions.every(course => course.hasVettingAccess);
    // If all checked, uncheck all; otherwise, check all
    setCoursePermissions(prev => prev.map(course => ({
      ...course,
      hasVettingAccess: !allChecked,
    })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate access counts
    const coursesWithAccess = coursePermissions.filter(c => c.hasAdminAccess || c.hasVettingAccess).length;
    const adminAccessCount = coursePermissions.filter(c => c.hasAdminAccess).length;
    const vettingAccessCount = coursePermissions.filter(c => c.hasVettingAccess).length;

    const updatedUser = {
      ...formData,
      courseAccess: coursesWithAccess,
      adminAccess: adminAccessCount,
      vettingAccess: vettingAccessCount,
      coursePermissions,
    };

    onSave(updatedUser);
    onClose();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'FRC': return 'bg-[var(--brand-primary)]';
      case 'AIDE': return 'bg-[#ffa500]';
      case 'AIDC': return 'bg-[#ff6b6b]';
      default: return 'bg-gray-500';
    }
  };

  // Filter courses based on search query
  const filteredCourses = coursePermissions.filter(course => {
    const query = searchQuery.toLowerCase();
    return (
      course.courseName.toLowerCase().includes(query) ||
      course.courseCode.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start md:items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div className="flex-1 mr-4">
            <h2 className="font-['Arial:Bold',sans-serif] text-[18px] md:text-[20px] text-[#101828]">
              Edit User Access
            </h2>
            <p className="font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] text-[#6a7282] mt-1 break-words">
              {user.name} - {user.email}
            </p>
            <div className="mt-2">
              <span className="text-[12px] md:text-[14px] text-[#6a7282]">Role: </span>
              <span className="text-[12px] md:text-[14px] text-[#c10007] font-['Arial:Regular',sans-serif]">
                {user.role}
              </span>
            </div>
            {/* Bulk Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="flex items-center gap-2">
                <label className="font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] text-[#101828] whitespace-nowrap">
                  Type of CMS:
                </label>
                <select
                  className="h-[32px] px-3 border border-[#d1d5dc] rounded-lg font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23101828' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 8px center',
                    paddingRight: '28px',
                  }}
                >
                  <option value="FTL CMS">FTL CMS</option>
                  <option value="FTS CMS">FTS CMS</option>
                  <option value="PT CMS">PT CMS</option>
                  <option value="Safety CMS">Safety CMS</option>
                </select>
              </div>
              <div className="relative ml-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-[32px] pl-10 pr-3 border border-[#d1d5dc] rounded-lg font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] w-full sm:w-[200px]"
                />
              </div>
              <div className="flex gap-2 w-full">
                <button
                  type="button"
                  onClick={bulkCheckAdmin}
                  className="bg-[var(--brand-primary)] text-white px-3 py-1.5 rounded-lg font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] hover:bg-[var(--brand-primary-hover)] transition-colors flex items-center gap-1"
                >
                  <Check className="w-3 h-3 md:w-4 md:h-4" />
                  Bulk Check Admin
                </button>
                <button
                  type="button"
                  onClick={bulkCheckVetting}
                  className="bg-[#648391] text-white px-3 py-1.5 rounded-lg font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] hover:bg-[#566f7a] transition-colors flex items-center gap-1"
                >
                  <Check className="w-3 h-3 md:w-4 md:h-4" />
                  Bulk Check Vetting
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Form - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-3">
            {/* Course Permissions */}
            {filteredCourses.map((course) => (
              <div
                key={course.courseId}
                className="border border-[var(--brand-primary-border)] rounded-lg p-3 md:p-4 bg-[var(--brand-primary-bg)]"
              >
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <div className={`${getCategoryColor(course.category)} rounded-md px-2 py-1 shrink-0`}>
                    <span className="font-['Arial:Regular',sans-serif] text-[14px] text-white">
                      {course.courseCode}
                    </span>
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] text-[#101828] mb-3 break-words">
                      {course.courseName}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                      {/* Admin Shortcut */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div className="relative shrink-0">
                          <input
                            type="checkbox"
                            checked={course.hasAdminAccess}
                            onChange={() => toggleAdminAccess(course.courseId)}
                            className="w-5 h-5 border-2 border-[var(--brand-primary)] rounded appearance-none checked:bg-[var(--brand-primary)] cursor-pointer transition-colors"
                          />
                          {course.hasAdminAccess && (
                            <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
                          )}
                        </div>
                        <span className="font-['Arial:Regular',sans-serif] text-[14px] text-[#101828]">
                          Admin Shortcut
                        </span>
                        {course.hasAdminAccess && (
                          <Check className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                        )}
                      </label>

                      {/* Vetting Shortcut */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div className="relative shrink-0">
                          <input
                            type="checkbox"
                            checked={course.hasVettingAccess}
                            onChange={() => toggleVettingAccess(course.courseId)}
                            className="w-5 h-5 border-2 border-[var(--brand-primary)] rounded appearance-none checked:bg-[var(--brand-primary)] cursor-pointer transition-colors"
                          />
                          {course.hasVettingAccess && (
                            <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
                          )}
                        </div>
                        <span className="font-['Arial:Regular',sans-serif] text-[14px] text-[#101828]">
                          Vetting Shortcut
                        </span>
                        {course.hasVettingAccess && (
                          <Check className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 p-4 md:p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] text-[#101828] bg-white hover:bg-gray-50 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[var(--brand-primary)] text-white px-6 py-2 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] hover:bg-[var(--brand-primary-hover)] transition-colors order-1 sm:order-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}