import { useReducer, useState } from 'react';
import { Plus, Trash2, RefreshCcw } from 'lucide-react';

const initialState = [];

function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, {
                id: Date.now(),
                text: action.payload,
                completed: false
            }];
        case 'delete':
            return state.filter(t => t.id !== action.payload);
        case 'toggle':
            return state.map(t =>
                t.id === action.payload ? { ...t, completed: !t.completed } : t
            );
        case 'clear':
            return [];
        default:
            return state;
    }
}

const UseReducerDemo = () => {
    const [todos, dispatch] = useReducer(reducer, initialState);
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch({ type: 'add', payload: text });
            setText('');
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="New task..."
                    className="flex-1 px-4 py-2 border dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded focus:ring-2 focus:ring-indigo-500 transition-colors"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={20} />
                </button>
            </form>

            <div className="space-y-2 max-h-60 overflow-y-auto">
                {todos.map(todo => (
                    <div key={todo.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-sm group transition-colors">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => dispatch({ type: 'toggle', payload: todo.id })}
                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                            />
                            <span className={todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'}>
                                {todo.text}
                            </span>
                        </div>
                        <button
                            onClick={() => dispatch({ type: 'delete', payload: todo.id })}
                            className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                {todos.length === 0 && (
                    <div className="text-center text-gray-400 dark:text-gray-500 py-8">No tasks yet</div>
                )}
            </div>

            {todos.length > 0 && (
                <button
                    onClick={() => dispatch({ type: 'clear' })}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                    <RefreshCcw size={14} /> Clear All
                </button>
            )}
        </div>
    );
};

export default UseReducerDemo;
