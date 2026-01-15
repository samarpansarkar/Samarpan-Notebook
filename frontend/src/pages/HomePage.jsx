import { Link } from 'react-router-dom';
import { BookOpen, Code, FileCode, Layers, Zap, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectAllSubjects } from '@/store/slices/subjectSlice';
import { getIcon } from '@/utils/componentRegistry';

const HomePage = () => {
    const subjects = useSelector(selectAllSubjects);

    // Map Redux subjects to the display format used in HomePage
    const topics = subjects.map(sub => ({
        path: sub.path,
        title: sub.title || sub.name,
        desc: sub.desc || 'Start learning ' + sub.name,
        icon: sub.iconComponent || getIcon('Code'), // Fallback
        color: sub.color || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
        count: 'Explore' // Dynamic count not yet available in subject model, placeholder
    }));

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 py-12">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                    Master Modern <span className="text-indigo-600 dark:text-indigo-400">Web Development</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                    Interactive practical guides, optimization techniques, and deep dives into the modern web stack.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link to="/react" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none">
                        Start Learning
                    </Link>
                    <a href="https://github.com/samarpansarkar" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        View on GitHub
                    </a>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {topics.map((topic) => (
                    <Link
                        key={topic.path}
                        to={topic.path}
                        className="group p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl dark:hover:shadow-indigo-900/20 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${topic.color}`}>
                                <topic.icon className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                                {topic.count}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {topic.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {topic.desc}
                        </p>
                        <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                            Explore Module <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
