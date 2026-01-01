
import React from 'react';
import { CheckCircle2, ListTodo, Timer, Zap } from 'lucide-react';
import { Todo, Priority } from '../types';

interface StatsProps {
  todos: Todo[];
}

const Stats: React.FC<StatsProps> = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;
  const highPriority = todos.filter(t => !t.completed && t.priority === Priority.HIGH).length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="TOTAL TASKS" 
        value={total} 
        icon={<ListTodo size={24} />} 
        colorClass="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-neon-blue"
      />
      <StatCard 
        label="COMPLETED" 
        value={`${completionRate}%`} 
        icon={<CheckCircle2 size={24} />} 
        colorClass="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-neon-green"
      />
      <StatCard 
        label="PENDING" 
        value={pending} 
        icon={<Timer size={24} />} 
        colorClass="bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-neon-amber"
      />
      <StatCard 
        label="URGENT" 
        value={highPriority} 
        icon={<Zap size={24} />} 
        colorClass="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-neon-pink"
      />
    </div>
  );
};

const StatCard = ({ label, value, icon, colorClass }: { label: string, value: string | number, icon: React.ReactNode, colorClass: string }) => (
  <div className="glass-card p-6 rounded-[2rem] shadow-3d-heavy flex items-center justify-between min-h-[110px] group hover:scale-[1.02] transition-transform">
    <div className="flex items-center gap-5">
      <div className={`${colorClass} p-4 rounded-2xl shadow-inner flex items-center justify-center transition-all group-hover:scale-110`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">{label}</p>
        <h4 className="text-3xl font-black text-slate-800 dark:text-white">{value}</h4>
      </div>
    </div>
  </div>
);

export default Stats;
