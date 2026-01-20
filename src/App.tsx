import { useState, useEffect } from 'react';
import { CourseListing } from './components/CourseListing';
import { UserManagement } from './components/UserManagement';
import { AddNewCourse } from './components/AddNewCourse';
import { MyTasks } from './components/MyTasks';
import { CourseMaintenance } from './components/CourseMaintenance';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { supabase } from './lib/supabase';
import imgCicSafetyAdminBackground1 from "figma:asset/8b4ccd3d5dd65a167318db0156b9361d28a23b41.png";

type View = 'courses' | 'users' | 'add-course' | 'my-tasks' | 'maintenance';
type ThemeMode = 'green' | 'brown' | 'purple' | 'light-green';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('courses');
  const [themeMode, setThemeMode] = useState<ThemeMode>('green');
  const [selectedCategory, setSelectedCategory] = useState('All Program');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'brown') {
      root.style.setProperty('--brand-primary', '#984f1b');
      root.style.setProperty('--brand-primary-hover', '#7a3f15');
      root.style.setProperty('--brand-primary-bg', '#fff9f2');
      root.style.setProperty('--brand-primary-border', '#984f1b');
    } else if (themeMode === 'purple') {
      root.style.setProperty('--brand-primary', '#7b497c');
      root.style.setProperty('--brand-primary-hover', '#623a63');
      root.style.setProperty('--brand-primary-bg', '#fdf6fd');
      root.style.setProperty('--brand-primary-border', '#7b497c');
    } else if (themeMode === 'light-green') {
      root.style.setProperty('--brand-primary', '#7fbc03');
      root.style.setProperty('--brand-primary-hover', '#6da302');
      root.style.setProperty('--brand-primary-bg', '#f8ffeb');
      root.style.setProperty('--brand-primary-border', '#7fbc03');
    } else {
      root.style.setProperty('--brand-primary', '#7eb439');
      root.style.setProperty('--brand-primary-hover', '#6da030');
      root.style.setProperty('--brand-primary-bg', '#f7ffee');
      root.style.setProperty('--brand-primary-border', '#7eba00');
    }
  }, [themeMode]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const handleNavigateToAddCourse = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('add-course');
  };

  const isFullScreenView = currentView === 'my-tasks' || currentView === 'maintenance';

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          alt="" 
          className="absolute h-full w-full object-cover opacity-40" 
          src={imgCicSafetyAdminBackground1} 
        />
      </div>

      {/* Header - Only show if not in full screen views */}
      {!isFullScreenView && (
        <Header currentView={currentView as any} onViewChange={setCurrentView as any} />
      )}

      {/* Content */}
      <div className="relative z-10 bg-[#f3f6f8] min-h-screen">
        {currentView === 'courses' ? (
          <CourseListing 
            onNavigateToAddCourse={handleNavigateToAddCourse} 
            onNavigateToMyTasks={() => setCurrentView('my-tasks')}
            onNavigateToMaintenance={() => setCurrentView('maintenance')}
            onSetTheme={(mode: ThemeMode) => setThemeMode(mode)}
          />
        ) : currentView === 'users' ? (
          <UserManagement />
        ) : currentView === 'my-tasks' ? (
          <MyTasks onBack={() => setCurrentView('courses')} />
        ) : currentView === 'maintenance' ? (
          <CourseMaintenance onBack={() => setCurrentView('courses')} />
        ) : (
          <AddNewCourse 
            onBack={() => setCurrentView('courses')} 
            defaultCmsType={selectedCategory}
          />
        )}
      </div>

      {/* Footer */}
      {!isFullScreenView && (
        <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 w-full">
          <div className="max-w-[1216px] mx-auto px-4 md:px-8">
            <p className="text-[10px] md:text-[12px] text-black/70 text-left">Copyright © 2025 (CIC). All Rights Reserved.</p>
          </div>
        </div>
      )}
    </div>
  );
}
