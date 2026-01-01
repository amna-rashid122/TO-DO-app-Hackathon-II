
import React from 'react';
import { ArrowUpDown, Tag, Flag, CheckCircle2 } from 'lucide-react';
import { Priority, Category, SortOption, FilterStatus } from '../types';

interface FiltersProps {
  status: FilterStatus;
  priority: Priority | 'all';
  category: Category | 'all';
  sortBy: SortOption;
  onStatusChange: (v: FilterStatus) => void;
  onPriorityChange: (v: Priority | 'all') => void;
  onCategoryChange: (v: Category | 'all') => void;
  onSortChange: (v: SortOption) => void;
}

const Filters: React.FC<FiltersProps> = ({
  status,
  priority,
  category,
  sortBy,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
  onSortChange
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl p-3 rounded-[2.5rem] shadow-3d-heavy border border-white/50 dark:border-slate-800 transition-all duration-300">
      {/* Status Filter */}
      <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl">
        <div className="p-2 text-indigo-500 dark:text-neon-blue">
          <CheckCircle2 size={20} />
        </div>
        {[
          { label: 'All', value: 'all' as FilterStatus },
          { label: 'Active', value: 'active' as FilterStatus },
          { label: 'Done', value: 'completed' as FilterStatus },
        ].map(item => (
          <button
            key={item.value}
            onClick={() => onStatusChange(item.value)}
            className={`px-6 py-2 rounded-[1rem] text-sm font-black transition-all ${
              status === item.value 
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white filter-glow scale-105 shadow-lg' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Select Containers */}
      <div className="flex items-center gap-3">
        <FilterSelect 
          icon={<Flag size={18} />} 
          value={priority} 
          onChange={(e) => onPriorityChange(e.target.value as any)}
          options={[{label: 'All Priorities', value: 'all'}, ...Object.values(Priority).map(p => ({label: p, value: p}))]}
        />
        <FilterSelect 
          icon={<Tag size={18} />} 
          value={category} 
          onChange={(e) => onCategoryChange(e.target.value as any)}
          options={[{label: 'All Categories', value: 'all'}, ...Object.values(Category).map(c => ({label: c, value: c}))]}
        />
        <FilterSelect 
          icon={<ArrowUpDown size={18} />} 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          options={[
            {label: 'Oldest First', value: 'oldest'},
            {label: 'Newest First', value: 'newest'},
            {label: 'Priority', value: 'priority'},
            {label: 'Due Date', value: 'dueDate'},
            {label: 'A - Z', value: 'alphabetical'}
          ]}
        />
      </div>
    </div>
  );
};

const FilterSelect = ({ icon, value, onChange, options }: any) => (
  <div className="flex items-center gap-2 px-5 py-3 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-all group border border-transparent hover:border-indigo-100 dark:hover:border-slate-600">
    <div className="text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-neon-blue transition-colors">
      {icon}
    </div>
    <select 
      className="bg-transparent border-none text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 focus:ring-0 outline-none cursor-pointer"
      value={value}
      onChange={onChange}
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">{opt.label}</option>
      ))}
    </select>
  </div>
);

export default Filters;
