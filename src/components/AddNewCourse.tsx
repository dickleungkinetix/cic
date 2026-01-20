import { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

interface AddNewCourseProps {
  onBack: () => void;
  defaultCmsType?: string;
}

export function AddNewCourse({ onBack, defaultCmsType }: AddNewCourseProps) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    category: 'FRC' as 'FRC' | 'AIDE' | 'AIDC',
    cmsType: 'FTL CMS',
    adminUrl: '',
    vettingUrl: '',
    active: true,
  });

  useEffect(() => {
    if (defaultCmsType) {
      let mappedType = 'Safety CMS';
      if (defaultCmsType === 'FTL') mappedType = 'FTL CMS';
      else if (defaultCmsType === 'FTS') mappedType = 'FTS CMS';
      else if (defaultCmsType === 'PT') mappedType = 'PT CMS';
      else if (defaultCmsType === 'All Program') mappedType = 'Safety CMS';
      
      setFormData(prev => ({ ...prev, cmsType: mappedType }));
    }
  }, [defaultCmsType]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Course code is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.adminUrl.trim()) {
      newErrors.adminUrl = 'Admin URL is required';
    } else if (!formData.adminUrl.startsWith('http://') && !formData.adminUrl.startsWith('https://')) {
      newErrors.adminUrl = 'Please enter a valid URL (must start with http:// or https://)';
    }
    if (!formData.vettingUrl.trim()) {
      newErrors.vettingUrl = 'Vetting URL is required';
    } else if (!formData.vettingUrl.startsWith('http://') && !formData.vettingUrl.startsWith('https://')) {
      newErrors.vettingUrl = 'Please enter a valid URL (must start with http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically save the course to your state management or database
      console.log('New course data:', formData);
      // Show success message or navigate back
      alert('Course created successfully!');
      onBack();
    }
  };

  return (
    <div className="w-full px-4 pt-[5px] pb-4 md:pb-8">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#648391] hover:text-[#566f7a] transition-colors mb-3 md:mb-4"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px]">Back</span>
        </button>
        <h1 className="font-['Arial:Bold',sans-serif] md:text-[32px] text-[rgb(74,85,101)] text-[24px]">Add New Course</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Course Code */}
          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] md:text-[16px] text-[#101828] mb-2">
              Course Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value)}
              placeholder="e.g., FRC1"
              className={`w-full h-[42px] px-4 border rounded-lg font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                errors.code ? 'border-red-500' : 'border-[#d1d5dc]'
              }`}
            />
            {errors.code && (
              <p className="mt-1 text-[12px] md:text-[14px] text-red-500">{errors.code}</p>
            )}
          </div>

          {/* Course Name */}
          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] md:text-[16px] text-[#101828] mb-2">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., 工地領班員安全訓練課程"
              className={`w-full h-[42px] px-4 border rounded-lg font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                errors.name ? 'border-red-500' : 'border-[#d1d5dc]'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-[12px] md:text-[14px] text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] md:text-[16px] text-[#101828] mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter course description..."
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] resize-none ${
                errors.description ? 'border-red-500' : 'border-[#d1d5dc]'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-[12px] md:text-[14px] text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Type of CMS */}
          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] md:text-[16px] text-[#101828] mb-2">
              Type of CMS <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.cmsType}
              onChange={(e) => handleInputChange('cmsType', e.target.value)}
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

          {/* Admin URL */}
          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] md:text-[16px] text-[#101828] mb-2">
              Admin URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.adminUrl}
              onChange={(e) => handleInputChange('adminUrl', e.target.value)}
              placeholder="https://csc-cms.cic.gov.hk/admin"
              className={`w-full h-[42px] px-4 border rounded-lg font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                errors.adminUrl ? 'border-red-500' : 'border-[#d1d5dc]'
              }`}
            />
            {errors.adminUrl && (
              <p className="mt-1 text-[12px] md:text-[14px] text-red-500">{errors.adminUrl}</p>
            )}
          </div>

          {/* Vetting URL */}
          <div>
            <label className="block font-['Arial:Bold',sans-serif] text-[14px] md:text-[16px] text-[#101828] mb-2">
              Vetting URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.vettingUrl}
              onChange={(e) => handleInputChange('vettingUrl', e.target.value)}
              placeholder="https://csc-cms.cic.gov.hk/vetting"
              className={`w-full h-[42px] px-4 border rounded-lg font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                errors.vettingUrl ? 'border-red-500' : 'border-[#d1d5dc]'
              }`}
            />
            {errors.vettingUrl && (
              <p className="mt-1 text-[12px] md:text-[14px] text-red-500">{errors.vettingUrl}</p>
            )}
          </div>

          {/* Active Status */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => handleInputChange('active', e.target.checked)}
                className="w-5 h-5 text-[var(--brand-primary)] border-[#d1d5dc] rounded focus:ring-2 focus:ring-[var(--brand-primary)] cursor-pointer"
              />
              <span className="font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] text-[#101828]">
                Set course as active
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 sm:justify-end">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 sm:flex-none px-6 py-2 border border-[#d1d5dc] rounded-lg font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] text-[#101828] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-2 bg-[var(--brand-primary)] text-white rounded-lg font-['Arial:Regular',sans-serif] text-[14px] md:text-[16px] hover:bg-[var(--brand-primary-hover)] transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Create Course
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}