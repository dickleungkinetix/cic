import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/1a242abb72081324825cf810af0b1d5dd308a77d.png';
import logoutIcon from 'figma:asset/4fc704712af3fc91de82ff2fda416c9669517bcc.png';

interface HeaderProps {
  currentView: 'courses' | 'users';
  onViewChange: (view: 'courses' | 'users') => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative z-20 bg-white border-b border-gray-200">
      <div className="max-w-[1216px] mx-auto">
        {/* Mobile menu toggle could go here if needed, but the user wants the main nav to stay visible */}
      </div>

      {/* Navigation Row - Now visible on all screen sizes */}
      <div className="border-t border-[#f0f0f0] bg-white h-auto md:h-[60px] shadow-sm overflow-x-auto no-scrollbar">
        <div className="w-full flex items-center justify-between h-full min-w-max md:min-w-0 px-[8px] py-[0px]">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 md:gap-4 ml-4 md:ml-[25px] py-0 md:py-0">
              <div 
                onClick={() => onViewChange('courses')}
                className="w-[55px] h-[55px] md:w-[55px] md:h-[55px] bg-[rgb(127,181,57)] rounded-[5px] flex items-center justify-center shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="text-white font-['Arial:Bold',sans-serif] md:text-[22px] tracking-tight text-[28px] font-bold font-normal font-[Roboto_Flex]">ST</span>
              </div>
              <span className="text-[#6A7282] font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] whitespace-nowrap">
                CMS Overlay Application
              </span>
            </div>
            
            <nav className="flex items-center gap-4 md:gap-10 ml-2 md:ml-6">
              <button
                onClick={() => onViewChange('courses')}
                className={`h-[48px] md:h-[60px] flex items-center font-['Arial:Bold',sans-serif] text-[12px] md:text-[14px] transition-all cursor-pointer border-b-[3px] whitespace-nowrap ${
                  currentView === 'courses'
                    ? 'text-[#7fb539] border-[#7fb539]'
                    : 'text-[#6A7282] border-transparent hover:text-[#7fb539]'
                }`}
              >
                Course Listing
              </button>
              <button
                onClick={() => onViewChange('users')}
                className={`h-[48px] md:h-[60px] flex items-center font-['Arial:Bold',sans-serif] text-[12px] md:text-[14px] transition-all cursor-pointer border-b-[3px] whitespace-nowrap ${
                  currentView === 'users'
                    ? 'text-[#7fb539] border-[#7fb539]'
                    : 'text-[#6A7282] border-transparent hover:text-[#7fb539]'
                }`}
              >
                User Management
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-3 px-4 md:pr-6 py-2 md:py-0">
            <span className="hidden sm:inline text-[#6A7282] font-['Arial:Regular',sans-serif] text-[12px] md:text-[14px] whitespace-nowrap">
              OPAS_Safety_SystemAdmin
            </span>
            <button className="text-[#7fb539] hover:opacity-80 transition-opacity cursor-pointer p-1">
              <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
