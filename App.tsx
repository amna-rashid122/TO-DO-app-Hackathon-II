
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
} from 'lucide-react';
import { Todo, Priority, Category, SortOption, FilterStatus } from './types';
import Header from './components/Header';
import TodoCard from './components/TodoCard';
import TodoForm from './components/TodoForm';
import Filters from './components/Filters';
import EmptyState from './components/EmptyState';
import Stats from './components/Stats';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all'); 
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Persistence for todos
  useEffect(() => {
    const saved = localStorage.getItem('elevate-todos-v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setTodos(parsed);
      } catch (e) {
        console.error("Failed to load todos", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('elevate-todos-v3', JSON.stringify(todos));
  }, [todos]);

  // Persistence for theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('elevate-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('elevate-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('elevate-theme', 'light');
    }
  };

  const handleAddTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [newTodo, ...prev]);
    setIsFormOpen(false);
  };

  const handleUpdateTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => {
    if (!editingTodo) return;
    setTodos(prev => prev.map(t => t.id === editingTodo.id ? { ...t, ...todoData } : t));
    setEditingTodo(null);
    setIsFormOpen(false);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const openEditForm = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const filteredAndSortedTodos = useMemo(() => {
    let result = todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           todo.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' ? true : 
                           filterStatus === 'completed' ? todo.completed : !todo.completed;
      const matchesPriority = filterPriority === 'all' ? true : todo.priority === filterPriority;
      const matchesCategory = filterCategory === 'all' ? true : todo.category === filterCategory;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'alphabetical': return a.title.localeCompare(b.title);
        case 'dueDate': 
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority': {
          const weights = { [Priority.HIGH]: 3, [Priority.MEDIUM]: 2, [Priority.LOW]: 1 };
          return weights[b.priority] - weights[a.priority];
        }
        default: return 0;
      }
    });

    return result;
  }, [todos, searchQuery, filterStatus, filterPriority, filterCategory, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      
      <main className="max-w-6xl mx-auto px-4 pt-8">
        <Stats todos={todos} />

        <div className="mt-12 flex items-center justify-between mb-8 gap-4">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900/50 dark:text-white rounded-3xl border-none shadow-3d focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => { setEditingTodo(null); setIsFormOpen(true); }}
            className="flex items-center gap-2 px-8 py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-[1.5rem] shadow-3d shadow-indigo-300 dark:shadow-indigo-900/40 hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:scale-105 transition-all font-bold active:scale-95 whitespace-nowrap"
          >
            <Plus size={24} strokeWidth={3} />
            <span>New Task</span>
          </button>
        </div>

        <div className="space-y-4 mb-12">
          {filteredAndSortedTodos.length > 0 ? (
            filteredAndSortedTodos.map(todo => (
              <TodoCard 
                key={todo.id}
                todo={todo}
                onToggle={handleToggleComplete}
                onDelete={handleDeleteTodo}
                onEdit={openEditForm}
              />
            ))
          ) : (
            <EmptyState isFiltering={searchQuery !== '' || filterStatus !== 'all'} />
          )}
        </div>

        {/* Filters positioned at bottom */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4">
          <Filters 
            status={filterStatus}
            priority={filterPriority}
            category={filterCategory}
            sortBy={sortBy}
            onStatusChange={setFilterStatus}
            onPriorityChange={setFilterPriority}
            onCategoryChange={setFilterCategory}
            onSortChange={setSortBy}
          />
        </div>
      </main>

      {isFormOpen && (
        <TodoForm 
          onClose={() => setIsFormOpen(false)}
          onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
          initialData={editingTodo || undefined}
        />
      )}
    </div>
  );
};

export default App;
