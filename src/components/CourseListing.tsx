import { useState } from 'react';
import { Search, ChevronDown, ExternalLink, Edit, Plus } from 'lucide-react';
import { EditCourseModal } from './EditCourseModal';

interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  category: 'FRC' | 'AIDE' | 'AIDC';
  adminUrl: string;
  vettingUrl: string;
  active: boolean;
}

const initialCourses: Course[] = [
  {
    id: '1',
    code: 'FRC1',
    name: '工地領班員安全訓練課程',
    description: 'Basic safety training for construction description will display here',
    category: 'FRC',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
  },
  {
    id: '2',
    code: 'FRC2',
    name: '工地領班員安全訓練課程 2',
    description: 'Basic safety training for construction description will display here',
    category: 'FRC',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
  },
  {
    id: '3',
    code: 'AIDE5',
    name: '建造工友(指定行業)安全訓練課程 - 升降機工',
    description: 'Basic safety training for construction description will display here',
    category: 'AIDE',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
  },
  {
    id: '4',
    code: 'AIDC9',
    name: '建造工友(指定行業)安全訓練課程 - 升降機維工',
    description: 'Basic safety training for construction description will display here',
    category: 'AIDC',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: true,
  },
  {
    id: '5',
    code: 'FRC3',
    name: '工地領班員安全訓練課程補修課',
    description: 'Basic safety training for construction description will display here',
    category: 'FRC',
    adminUrl: 'https://csc-cms.cic.gov.hk/admin',
    vettingUrl: 'https://csc-cms.cic.gov.hk/vetting',
    active: false,
  },
];

const categoryStats = {
  FTL: 10,
  FTS: 6,
  PT: 12,
  Safety: 30,
};

export function CourseListing({ 
  onNavigateToAddCourse, 
  onNavigateToMyTasks,
  onNavigateToMaintenance,
  onSetTheme 
}: { 
  onNavigateToAddCourse: (category: string) => void, 
  onNavigateToMyTasks?: () => void,
  onNavigateToMaintenance?: () => void,
  onSetTheme?: (mode: 'green' | 'brown' | 'purple' | 'light-green') => void
}) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Program');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const toggleCourseActive = (courseId: string) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, active: !course.active } : course
    ));
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(course =>
      course.id === updatedCourse.id ? updatedCourse : course
    ));
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  return (
    <div className="w-full px-4 pt-[5px] md:pb-8 pr-[32px] pb-[32px] pl-[32px] bg-[#f3f6f8] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-['Arial:Bold',sans-serif] text-[20px] md:text-[24px] text-[#4a5565] mt-[30px] mr-[0px] mb-[0px] ml-[0px]">
          Course Listing
        </h1>
        <button
          onClick={() => onNavigateToAddCourse(selectedCategory)}
          className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[var(--brand-primary-hover)] transition-colors"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-['Arial:Regular',sans-serif] text-[16px]">Create New Course</span>
        </button>
      </div>

      {/* Category Stats */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button 
          onClick={() => {
            setSelectedCategory('FTL');
            onSetTheme?.('green');
          }}
          className={`flex-1 rounded-lg border shadow-sm p-3 md:p-4 transition-colors cursor-pointer ${
            selectedCategory === 'FTL' 
              ? 'bg-[var(--brand-primary-bg)] border-[var(--brand-primary-border)] hover:bg-[var(--brand-primary-bg)]/80' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-['Arial:Bold',sans-serif] text-[16px] md:text-[20px] text-[#4a5565]">FTL CMS</p>
              <p className="font-['Arial:Regular',sans-serif] text-[20px] md:text-[24px] text-[var(--brand-primary)] mt-1">{categoryStats.FTL}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100/30 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </button>

        <button 
          onClick={() => {
            setSelectedCategory('FTS');
            onSetTheme?.('light-green');
          }}
          className={`flex-1 rounded-lg border shadow-sm p-3 md:p-4 transition-colors cursor-pointer ${
            selectedCategory === 'FTS' 
              ? 'bg-[var(--brand-primary-bg)] border-[var(--brand-primary-border)] hover:bg-[var(--brand-primary-bg)]/80' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-['Arial:Bold',sans-serif] text-[16px] md:text-[20px] text-[#4a5565]">FTS CMS</p>
              <p className="font-['Arial:Regular',sans-serif] text-[20px] md:text-[24px] text-[var(--brand-primary)] mt-1">{categoryStats.FTS}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100/30 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </button>

        <button 
          onClick={() => {
            setSelectedCategory('PT');
            onSetTheme?.('green');
          }}
          className={`flex-1 rounded-lg border shadow-sm p-3 md:p-4 transition-colors cursor-pointer ${
            selectedCategory === 'PT' 
              ? 'bg-[var(--brand-primary-bg)] border-[var(--brand-primary-border)] hover:bg-[var(--brand-primary-bg)]/80' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-['Arial:Bold',sans-serif] text-[16px] md:text-[20px] text-[#4a5565]">PT CMS</p>
              <p className="font-['Arial:Regular',sans-serif] text-[20px] md:text-[24px] text-[var(--brand-primary)] mt-1">{categoryStats.PT}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100/30 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </button>

        <button 
          onClick={() => {
            setSelectedCategory('All Program');
            onSetTheme?.('green');
          }}
          className={`flex-1 rounded-lg border shadow-sm p-3 md:p-4 transition-colors cursor-pointer ${
            selectedCategory === 'All Program' 
              ? 'bg-[var(--brand-primary-bg)] border-[var(--brand-primary-border)] hover:bg-[var(--brand-primary-bg)]/80' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-['Arial:Bold',sans-serif] text-[16px] md:text-[20px] text-[#4a5565]">Safety CMS</p>
              <p className="font-['Arial:Regular',sans-serif] text-[20px] md:text-[24px] text-[var(--brand-primary)] mt-1">{categoryStats.Safety}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100/30 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#99A1AF]" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[42px] pl-9 md:pl-10 pr-4 border border-[#d1d5dc] rounded-lg font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex w-8 h-8 md:w-10 md:h-10 items-center justify-center">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 40 40">
                <path d="M20 10V30M20 10L14 16M20 10L26 16M20 30L14 24M20 30L26 24" stroke="#D6DAE0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="relative flex-1 sm:flex-none">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full sm:w-auto h-[42px] px-3 md:px-4 pr-8 md:pr-10 border border-[#d9d9d9] rounded-lg bg-white font-['Roboto:Regular',sans-serif] text-[14px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              >
                <option>All Roles</option>
                <option>Administrator Role</option>
                <option>Vetting Officer</option>
              </select>
              <ChevronDown className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Course Header */}
              <div className="flex items-start gap-2 md:gap-3">
                <div className="bg-[var(--brand-primary)] rounded-md px-2 py-1 shrink-0">
                  <span className="font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] text-white">
                    {course.code}
                  </span>
                </div>
                <h3 className="font-['Arial:Regular',sans-serif] text-[16px] md:text-[18px] text-[#101828] leading-tight">
                  {course.name}
                </h3>
              </div>

              {/* Description */}
              <p className="font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] text-[#4a5565]">
                {course.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {(selectedRole === 'All Roles' || selectedRole === 'Administrator Role') && (
                    <button 
                      onClick={onNavigateToMaintenance}
                      className="bg-[var(--brand-primary)] text-white px-3 md:px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[var(--brand-primary-hover)] transition-colors text-[14px] md:text-[16px]"
                    >
                      <span className="font-['Arial:Regular',sans-serif]">Course Maintenance</span>
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  )}
                  {(selectedRole === 'All Roles' || selectedRole === 'Vetting Officer') && (
                    <button 
                      onClick={onNavigateToMyTasks}
                      className="bg-[#648391] text-white px-3 md:px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#566f7a] transition-colors text-[14px] md:text-[16px]"
                    >
                      <span className="font-['Arial:Regular',sans-serif]">Vetting Shortcut</span>
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="bg-[#648391] text-white px-3 md:px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#566f7a] transition-colors text-[14px] md:text-[16px]"
                  >
                    <span className="font-['Arial:Regular',sans-serif]">Edit Config</span>
                    <Edit className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                  <button
                    onClick={() => toggleCourseActive(course.id)}
                    className="bg-[#648391] text-white px-3 md:px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#566f7a] transition-colors text-[14px] md:text-[16px]"
                  >
                    <span className="font-['Arial:Regular',sans-serif]">Deactivate</span>
                    <div className={`relative w-[35px] h-[21px] rounded-full transition-colors ${course.active ? 'bg-[#34c759]' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-white rounded-full shadow-md transition-transform ${course.active ? 'right-[1px]' : 'left-[1px]'}`} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Course Modal */}
      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSave={updateCourse}
          onDelete={deleteCourse}
        />
      )}
    </div>
  );
}