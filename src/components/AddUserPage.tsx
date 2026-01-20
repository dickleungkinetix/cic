import { useState } from 'react';
import { Check, UserPlus, Search } from 'lucide-react';

interface CourseAccess {
  courseId: string;
  courseName: string;
  courseCode: string;
  category: string;
  hasAdminAccess: boolean;
  hasVettingAccess: boolean;
}

interface AddUserPageProps {
  onCancel: () => void;
  onSave: (user: any) => void;
}

// Mock courses data
const availableCourses = [
  { id: '1', name: '工地領班員安全訓練課程', code: 'FRC1', category: 'FRC' },
  { id: '2', name: '工地領班員安全訓練課程 2', code: 'FRC2', category: 'FRC' },
  { id: '3', name: '建造工友(指定行業)安全訓練課程 - 升降機工', code: 'AIDE5', category: 'AIDE' },
  { id: '4', name: '建造工友(指定行業)安全訓練課程 - 升降機維工', code: 'AIDC9', category: 'AIDC' },
  { id: '5', name: '建造工友(指定行業)安全訓練課程 - 電工', code: 'AIDE8', category: 'AIDE' },
  { id: '6', name: '建造工友(指定行業)安全訓練課程 - 焊接工', code: 'AIDC3', category: 'AIDC' },
];

export function AddUserPage({ onCancel, onSave }: AddUserPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Administrator' | 'Vetting Officer'>('Administrator');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [coursePermissions, setCoursePermissions] = useState<CourseAccess[]>(
    availableCourses.map(course => ({
      courseId: course.id,
      courseName: course.name,
      courseCode: course.code,
      category: course.category,
      hasAdminAccess: false,
      hasVettingAccess: false,
    }))
  );

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
    const allChecked = coursePermissions.every(course => course.hasAdminAccess);
    setCoursePermissions(prev => prev.map(course => ({
      ...course,
      hasAdminAccess: !allChecked,
    })));
  };

  const bulkCheckVetting = () => {
    const allChecked = coursePermissions.every(course => course.hasVettingAccess);
    setCoursePermissions(prev => prev.map(course => ({
      ...course,
      hasVettingAccess: !allChecked,
    })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const coursesWithAccess = coursePermissions.filter(c => c.hasAdminAccess || c.hasVettingAccess).length;
    const adminAccessCount = coursePermissions.filter(c => c.hasAdminAccess).length;
    const vettingAccessCount = coursePermissions.filter(c => c.hasVettingAccess).length;

    const newUser = {
      id: Date.now().toString(),
      name: fullName,
      email,
      role,
      courseAccess: coursesWithAccess,
      adminAccess: adminAccessCount,
      vettingAccess: vettingAccessCount,
      coursePermissions,
    };
    onSave(newUser);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'FRC': return 'bg-[var(--brand-primary)]';
      case 'AIDE': return 'bg-[#ffa500]';
      case 'AIDC': return 'bg-[#ff6b6b]';
      default: return 'bg-gray-500';
    }
  };

  const filteredCourses = coursePermissions.filter(course => {
    const query = searchQuery.toLowerCase();
    return (
      course.courseName.toLowerCase().includes(query) ||
      course.courseCode.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query)
    );
  });

  const assignedCount = coursePermissions.filter(c => c.hasAdminAccess || c.hasVettingAccess).length;
  const adminCount = coursePermissions.filter(c => c.hasAdminAccess).length;
  const vettingCount = coursePermissions.filter(c => c.hasVettingAccess).length;

  return (
    <div className="w-full px-4 pt-[5px] pb-4 md:pb-8 mt-0">
      <div className="mb-6">
        <h1 className="font-['Arial:Bold',sans-serif] text-[18px] md:text-[24px] text-[#4a5565] mt-[30px] mr-[0px] mb-[0px] ml-[0px]">
          <span>User Management</span>
          <span className="mx-2">/</span>
          <span className="text-[var(--brand-primary)]">Add New User</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <h2 className="font-['Arial:Bold',sans-serif] text-[16px] text-[#4a5565] mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-['Arial:Regular',sans-serif] text-[14px] text-[#101828] mb-2 font-bold">
                Full Name <span className="text-[#fb2c36]">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter user's full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block font-['Arial:Regular',sans-serif] text-[14px] text-[#101828] mb-2 font-bold">
                Email Address <span className="text-[#fb2c36]">*</span>
              </label>
              <input
                type="email"
                placeholder="user@cic.gov.hk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block font-['Arial:Regular',sans-serif] text-[14px] text-[#101828] mb-2 font-bold">
                Role <span className="text-[#fb2c36]">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'Administrator' | 'Vetting Officer')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent appearance-none bg-white"
                required
              >
                <option value="Administrator">Admin Role</option>
                <option value="Vetting Officer">Vetting Officer</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <div className="mb-4">
            <h2 className="font-['Arial:Bold',sans-serif] text-[16px] text-[#4a5565]">
              Course Access Permissions
            </h2>
            <p className="font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] text-[#6a7282] mt-1">
              Assign access permissions for each program. Users can have admin access, vetting access, or both.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="flex items-center gap-2">
                <label className="font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] text-[#101828] whitespace-nowrap">
                  Type of CMS:
                </label>
                <select
                  className="h-[32px] px-3 border border-[#d1d5dc] rounded-lg font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] appearance-none bg-white w-full sm:w-auto"
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
              <div className="relative w-full sm:ml-auto sm:w-auto">
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

          <div className="space-y-3">
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

          <div className="mt-6 bg-[var(--brand-primary-bg)] border border-[var(--brand-primary-border)] rounded-lg p-4">
            <h3 className="font-['Arial:Bold',sans-serif] text-[14px] text-[#4a5565] mb-3">
              Access Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <div>
                <p className="font-['Arial:Regular',sans-serif] text-[14px] text-[#6a7282]">
                  Programs Assigned:
                </p>
                <p className="font-['Arial:Bold',sans-serif] text-[18px] text-[var(--brand-primary)]">
                  {assignedCount} / {availableCourses.length}
                </p>
              </div>
              <div>
                <p className="font-['Arial:Regular',sans-serif] text-[14px] text-[#6a7282]">
                  Admin Access:
                </p>
                <p className="font-['Arial:Bold',sans-serif] text-[18px] text-[var(--brand-primary)]">
                  {adminCount}
                </p>
              </div>
              <div>
                <p className="font-['Arial:Regular',sans-serif] text-[14px] text-[#6a7282]">
                  Vetting Access:
                </p>
                <p className="font-['Arial:Bold',sans-serif] text-[18px] text-[var(--brand-primary)]">
                  {vettingCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] text-[#101828] bg-white hover:bg-gray-50 transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[var(--brand-primary)] text-white px-6 py-2 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] hover:bg-[var(--brand-primary-hover)] transition-colors flex items-center justify-center gap-2 order-1 sm:order-2"
          >
            <UserPlus className="w-4 h-4" />
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}