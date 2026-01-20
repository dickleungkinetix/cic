import { ArrowLeft } from 'lucide-react';
import maintenanceImage from 'figma:asset/1ea4b6ba40a4c707783cc76ce229e8b17dde011e.png';

export function CourseMaintenance({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full bg-[#f3f6f8] min-h-screen relative">
      <button 
        onClick={onBack}
        className="absolute left-[1062px] top-[28px] z-20 flex items-center gap-1.5 text-[#7fb539] hover:text-[#6a9a30] transition-colors cursor-pointer font-medium text-[12px]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to CMS Overlay</span>
      </button>

      <div className="w-full">
        <img 
          src={maintenanceImage} 
          alt="Course and Class Maintenance" 
          className="w-full h-auto block"
        />
      </div>
    </div>
  );
}
