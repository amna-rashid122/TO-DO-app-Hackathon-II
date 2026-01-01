
import React, { useState, useEffect } from 'react';
import { X, Calendar, Flag, Tag, RefreshCcw } from 'lucide-react';
import { Todo, Priority, Category, RepeatType } from '../types';

interface TodoFormProps {
  onClose: () => void;
  onSubmit: (data: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void;
  initialData?: Todo;
}

const TodoForm: React.FC<TodoFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || Priority.MEDIUM);
  const [category, setCategory] = useState<Category>(initialData?.category || Category.PERSONAL);
  const [repeat, setRepeat] = useState<RepeatType>(initialData?.repeat || RepeatType.NONE);
  const [dueDate, setDueDate] = useState(initialData?.dueDate ? initialData.dueDate.split('T')[0] : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title,
      description,
      priority,
      category,
      repeat,
      dueDate: dueDate ? new Date(dueDate).toISOString() : '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 border border-white/20 dark:border-slate-800">
        <div className="relative p-10">
          <button 
            onClick={onClose}
            className="absolute right-8 top-8 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
          >
            <X size={24} strokeWidth={3} />
          </button>

          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-8 tracking-tight">
            {initialData ? 'Update Task' : 'Create Task'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Task Title</label>
              <input 
                autoFocus
                type="text"
                required
                placeholder="What needs to be done?"
                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-3xl border-none shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-lg placeholder:text-slate-300 dark:placeholder:text-slate-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">Description (Optional)</label>
              <textarea 
                placeholder="Add more details..."
                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-3xl border-none shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[120px] font-medium resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <FormSelect label="Priority" icon={<Flag size={14} />} value={priority} onChange={(e: any) => setPriority(e.target.value as Priority)}>
                {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
              </FormSelect>
              <FormSelect label="Category" icon={<Tag size={14} />} value={category} onChange={(e: any) => setCategory(e.target.value as Category)}>
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </FormSelect>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-1.5">
                  <Calendar size={12} strokeWidth={3} /> Due Date
                </label>
                <input 
                  type="date"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-2xl border-none shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xs font-black uppercase tracking-wider cursor-pointer"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <FormSelect label="Recurring" icon={<RefreshCcw size={12} strokeWidth={3} />} value={repeat} onChange={(e: any) => setRepeat(e.target.value as RepeatType)}>
                {Object.values(RepeatType).map(r => <option key={r} value={r}>{r}</option>)}
              </FormSelect>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-3xl font-black text-xl shadow-3d shadow-indigo-200 dark:shadow-indigo-900/30 hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:scale-[1.02] transition-all transform active:scale-[0.98] mt-4 uppercase tracking-widest"
            >
              {initialData ? 'Update Task' : 'Save Task'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const FormSelect = ({ label, icon, value, onChange, children }: any) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center gap-1.5">
      {icon} {label}
    </label>
    <select 
      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-2xl border-none shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xs font-black uppercase tracking-wider cursor-pointer"
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  </div>
);

export default TodoForm;
