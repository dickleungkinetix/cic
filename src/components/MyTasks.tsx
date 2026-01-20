import { ArrowLeft } from 'lucide-react';
import exampleImage from 'figma:asset/93eb455b577b9c7102cf6e387baafcdccea491ab.png';

export function MyTasks({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen relative">
      {/* Absolute positioned back icon to appear "in front of My Tasks" text in the image */}      <button 
        onClick={onBack}
        className="absolute left-[600px] top-[23px] z-20 flex items-center gap-1.5 text-[#7fb539] hover:text-[#6a9a30] transition-colors cursor-pointer font-medium text-[10px] font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to CMS Overlay</span>
      </button>

      <div className="w-full">
        <img 
          src={exampleImage} 
          alt="My Tasks Dashboard" 
          className="w-full h-auto block"
        />
      </div>
    </div>
  );
}
