
import React from 'react';
import { Inbox, FilterX } from 'lucide-react';

const EmptyState: React.FC<{ isFiltering: boolean }> = ({ isFiltering }) => {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 bg-white/50 dark:bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors">
      <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-[2rem] mb-8 shadow-inner">
        {isFiltering ? (
          <FilterX className="text-slate-400 dark:text-indigo-400" size={56} strokeWidth={1.5} />
        ) : (
          <Inbox className="text-slate-400 dark:text-indigo-400" size={56} strokeWidth={1.5} />
        )}
      </div>
      <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3">
        {isFiltering ? 'No matching tasks' : 'List is clear'}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-xs leading-relaxed font-bold text-sm">
        {isFiltering 
          ? 'Try adjusting your filters or search terms to find what you are looking for.' 
          : 'Ready to boost your productivity? Start by adding your first task today.'}
      </p>
    </div>
  );
};

export default EmptyState;
