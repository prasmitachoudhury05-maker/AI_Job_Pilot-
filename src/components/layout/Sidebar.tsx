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
  { name: 'Job Discovery', path: '/jobs', icon: Search },
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
    <div className="w-64 bg-black text-amber-200 h-screen fixed left-0 top-0 flex flex-col border-r-2 border-amber-900/50 print:hidden z-50">
      <div className="p-6 border-b-2 border-amber-900/50">
        <h1 className="text-3xl font-black text-amber-50 uppercase tracking-tighter flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 flex items-center justify-center text-black">
            <span className="text-2xl">J</span>
          </div>
          JobPilot
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 transition-all duration-200 font-bold text-sm uppercase tracking-wider border-2 ${
                isActive 
                  ? 'bg-red-600 text-black border-red-600 shadow-[4px_4px_0_#b45309]' 
                  : 'bg-transparent text-amber-400/80 border-transparent hover:bg-amber-950 hover:text-amber-50 hover:border-amber-800/50 hover:-translate-y-1 hover:shadow-[4px_4px_0_#ff0000]'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-black' : 'text-red-600'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t-2 border-amber-900/50 flex justify-between items-center">
        {mounted && (
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 bg-amber-950 hover:bg-red-600 text-amber-400/80 hover:text-black transition-colors border-2 border-transparent hover:border-black"
            title="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
        <div className="text-xs font-bold text-amber-600 uppercase tracking-widest">
          Engine v1.0
        </div>
      </div>
    </div>
  );
}
