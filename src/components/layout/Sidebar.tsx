'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Search, 
  UserCircle, 
  FileEdit, 
  FileText, 
  Briefcase,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { name: 'Analytics', path: '/analytics', icon: LayoutDashboard },
  { name: 'Job Discovery', path: '/discover', icon: Search },
  { name: 'Tailoring Studio', path: '/tailoring', icon: FileEdit },
  { name: 'Cover Letters', path: '/documents', icon: FileText },
  { name: 'App Tracking', path: '/applications', icon: Briefcase },
  { name: 'Interview Prep', path: '/interview-prep', icon: MessageSquare },
  { name: 'My Profile', path: '/profile', icon: UserCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800 print:hidden z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">J</span>
          </div>
          JobPilot
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 flex justify-between items-center">
        {mounted && (
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
        <div className="text-xs text-slate-500">
          JobPilot v1.0
        </div>
      </div>
    </div>
  );
}
