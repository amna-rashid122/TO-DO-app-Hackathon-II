
import React from 'react';
import { 
  Check, 
  Trash2, 
  Edit3, 
  Calendar, 
  RefreshCcw, 
  AlertCircle
} from 'lucide-react';
import { Todo, Priority, RepeatType } from '../types';

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const isPastDue = !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date();
  const isUpcoming = !todo.completed && todo.dueDate && 
                    new Date(todo.dueDate).getTime() - new Date().getTime() < 86400000 &&
                    new Date(todo.dueDate).getTime() > new Date().getTime();

  const getPriorityColor = () => {
    switch (todo.priority) {
      case Priority.HIGH: return 'border-red-500 dark:border-neon-pink shadow-red-500/10 dark:shadow-neon-pink/20';
      case Priority.MEDIUM: return 'border-amber-500 dark:border-neon-amber shadow-amber-500/10 dark:shadow-neon-amber/20';
      default: return 'border-emerald-500 dark:border-neon-green shadow-emerald-500/10 dark:shadow-neon-green/20';
    }
  };

  const getTagColor = () => {
    if (todo.completed) return 'bg-slate-100 dark:bg-slate-800 text-slate-400';
    switch (todo.priority) {
      case Priority.HIGH: return 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-neon-pink border-red-100 dark:border-red-900/50';
      case Priority.MEDIUM: return 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-neon-amber border-amber-100 dark:border-amber-900/50';
      default: return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-neon-green border-emerald-100 dark:border-emerald-900/50';
    }
  };

  return (
    <div className={`animate-task group relative glass-card px-8 py-6 rounded-[2.5rem] shadow-3d shadow-3d-hover transition-all duration-300 border-l-[8px] flex items-center gap-6 ${getPriorityColor()} ${todo.completed ? 'opacity-50 dark:opacity-40 grayscale-[0.5]' : ''}`}>
      
      <button 
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-9 h-9 rounded-2xl border-2 flex items-center justify-center transition-all ${
          todo.completed 
            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/40' 
            : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-neon-blue bg-white dark:bg-slate-800'
        }`}
      >
        {todo.completed && <Check size={20} strokeWidth={4} />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <h3 className={`text-xl font-extrabold text-slate-800 dark:text-white truncate ${todo.completed ? 'line-through text-slate-400' : ''}`}>
            {todo.title}
          </h3>
          <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-colors ${getTagColor()}`}>
            {todo.category}
          </span>
        </div>
        <p className={`text-sm line-clamp-1 font-medium ${todo.completed ? 'text-slate-400' : 'text-slate-500 dark:text-slate-300'}`}>
          {todo.description || 'No additional details.'}
        </p>
      </div>

      <div className="hidden lg:flex items-center gap-8 flex-shrink-0">
        {todo.dueDate && (
          <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${
            isPastDue ? 'text-red-500 dark:text-neon-pink' : isUpcoming ? 'text-amber-500 dark:text-neon-amber' : 'text-slate-400 dark:text-slate-500'
          }`}>
            <Calendar size={18} />
            <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
            {isPastDue && <AlertCircle size={16} className="animate-pulse" />}
          </div>
        )}
        
        {todo.repeat !== RepeatType.NONE && (
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-500 dark:text-neon-blue">
            <RefreshCcw size={18} />
            <span>{todo.repeat}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
        <button 
          onClick={() => onEdit(todo)}
          className="p-3 text-slate-400 hover:text-indigo-600 dark:hover:text-neon-blue hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm bg-slate-50 dark:bg-slate-900/50"
        >
          <Edit3 size={20} />
        </button>
        <button 
          onClick={() => onDelete(todo.id)}
          className="p-3 text-slate-400 hover:text-red-600 dark:hover:text-neon-pink hover:bg-red-50 dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm bg-slate-50 dark:bg-slate-900/50"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
