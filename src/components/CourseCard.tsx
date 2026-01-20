import { ExternalLink, Edit } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEditConfig: (course: Course) => void;
  onToggleActive: (courseId: string) => void;
}

export function CourseCard({ course, onEditConfig, onToggleActive }: CourseCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Course Header */}
        <div className="flex items-start gap-3">
          <div className="bg-[#7eb439] text-white px-2 py-1 rounded text-sm font-medium">
            {course.code}
          </div>
          <h3 className="text-lg text-gray-900 flex-1">{course.name}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">{course.description}</p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-3">
            <button className="bg-[#7eb439] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[#6a9530] transition-colors">
              Admin Shortcut
              <ExternalLink className="w-4 h-4" />
            </button>
            <button className="bg-[#648391] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[#556f7c] transition-colors">
              Vetting Shortcut
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => onEditConfig(course)}
              className="bg-[#648391] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[#556f7c] transition-colors"
            >
              Edit Config
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleActive(course.id)}
              className="bg-[#648391] text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[#556f7c] transition-colors"
            >
              Deactivate
              <div
                className={`relative w-9 h-5 rounded-full transition-colors ${
                  course.active ? 'bg-[#34c759]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                    course.active ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
