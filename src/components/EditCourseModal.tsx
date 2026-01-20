import { useState } from 'react';
import { X, Save } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  category: 'FRC' | 'AIDE' | 'AIDC';
  cmsType?: string;
  adminUrl: string;
  vettingUrl: string;
  active: boolean;
}

interface EditCourseModalProps {
  course: Course;
  onClose: () => void;
  onSave: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

export function EditCourseModal({ course, onClose, onSave, onDelete }: EditCourseModalProps) {
  const [formData, setFormData] = useState<Course>({
    ...course,
    cmsType: course.cmsType || 'FTL CMS'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this course?')) {
      onDelete(course.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div>
            <h2 className="font-['Arial:Bold',sans-serif] text-[18px] md:text-[20px] text-[#101828]">
              Edit Course Configuration
            </h2>
            <p className="font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] text-[#6a7282] mt-1">
              {course.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] text-[#101828] mb-2">
              Course Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] text-[#101828] mb-2">
              Course Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] text-[#101828] mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] text-[#101828] mb-2">
              Type of CMS
            </label>
            <select
              value={formData.cmsType || 'FTL CMS'}
              onChange={(e) => setFormData({ ...formData, cmsType: e.target.value })}
              className="w-full h-[42px] px-4 border border-[#d1d5dc] rounded-lg font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] appearance-none bg-white"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23101828' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
              }}
            >
              <option value="FTL CMS">FTL CMS</option>
              <option value="FTS CMS">FTS CMS</option>
              <option value="PT CMS">PT CMS</option>
              <option value="Safety CMS">Safety CMS</option>
            </select>
          </div>

          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] text-[#101828] mb-2">
              Admin CMS URL
            </label>
            <input
              type="url"
              value={formData.adminUrl}
              onChange={(e) => setFormData({ ...formData, adminUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] text-[#101828] mb-2">
              Vetting CMS URL
            </label>
            <input
              type="url"
              value={formData.vettingUrl}
              onChange={(e) => setFormData({ ...formData, vettingUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
              required
            />
          </div>

          <div className="bg-[#fff8e6] border border-[#ffcc00] rounded-lg p-3">
            <p className="font-['Arial:Regular',sans-serif] text-[14px] text-[#8b6914]">
              <span className="font-bold">Note:</span> URLs will affect all users with access to this course.
            </p>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-[#dc2626] text-white px-6 py-2 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] hover:bg-[#b91c1c] transition-colors"
            >
              Delete
            </button>
            <button
              type="submit"
              className="bg-[var(--brand-primary)] text-white px-6 py-2 rounded-lg font-['Arial:Regular',sans-serif] text-[16px] hover:bg-[var(--brand-primary-hover)] transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}