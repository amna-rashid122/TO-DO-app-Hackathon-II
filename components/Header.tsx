
import React from 'react';
import { Sparkles, Layout, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 dark:bg-indigo-500 p-2 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-indigo-900/30">
            <Layout className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white uppercase">TO-DO <span className="text-indigo-600 dark:text-indigo-400">APP</span></h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-widest">Simplify your workflow</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-indigo-400 hover:scale-110 active:scale-95 transition-all shadow-inner"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
          </button>

          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 rounded-2xl text-xs font-bold border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
            <Sparkles size={14} />
            <span>Premium Edition</span>
          </div>
          
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white dark:border-slate-800 shadow-md"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
