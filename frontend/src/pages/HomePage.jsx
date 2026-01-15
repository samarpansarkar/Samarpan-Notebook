import { Link } from 'react-router-dom';
import { BookOpen, Code, Sparkles, Rocket, Star, ArrowRight, Zap, Target } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectAllSubjects } from '@/store/slices/subjectSlice';
import { getIcon } from '@/utils/componentRegistry';

const HomePage = () => {
    const subjects = useSelector(selectAllSubjects);

    // Map Redux subjects to display format with unique styling
    const topics = subjects.map((sub, index) => ({
        path: sub.path,
        title: sub.title || sub.name,
        desc: sub.desc || 'Start learning ' + sub.name,
        icon: sub.iconComponent || getIcon('Code'),
        emoji: ['📚', '⚡', '🎯', '🚀'][index % 4],
        color: [
            'from-amber-400 to-orange-500',
            'from-emerald-400 to-teal-500',
            'from-orange-400 to-red-500',
            'from-green-400 to-emerald-500'
        ][index % 4],
        bgPattern: index % 2 === 0 ? 'bg-paper' : 'bg-notebook',
        count: 'Explore'
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-transition">
            {/* Hero Section - Warm & Inviting */}
            <div className="text-center mb-20 py-16 relative fade-in">
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-2xl float"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl float" style={{ animationDelay: '1s' }}></div>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium mb-6 hover-wiggle scale-in">
                    <Sparkles className="w-4 h-4" />
                    <span>Your Learning Journey Starts Here</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bounce-in" style={{ animationDelay: '0.1s' }}>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 text-gradient-animate">
                        Learn. Build. Master.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                    Interactive guides and hands-on practice for modern web development
                </p>

                <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'var(--color-text-tertiary)' }}>
                    From fundamentals to advanced concepts, learn at your own pace with real-world examples
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in" style={{ animationDelay: '0.3s' }}>
                    <Link
                        to="/react"
                        className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 magnetic-button ripple glow-hover hover-lift-shadow"
                    >
                        <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span>Start Learning</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                        href="https://github.com/samarpansarkar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-2xl font-semibold text-lg border-2 transition-all hover:scale-105 flex items-center gap-2 magnetic-button"
                        style={{
                            borderColor: 'var(--color-border)',
                            backgroundColor: 'var(--color-surface)',
                            color: 'var(--color-text-primary)'
                        }}
                    >
                        <Star className="w-5 h-5" />
                        <span>View on GitHub</span>
                    </a>
                </div>
            </div>

            {/* Features Grid - Asymmetric & Playful */}
            <div className="mb-16 zoom-in particles" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3 mb-8 slide-in-left">
                    <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                    <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                        Explore Topics
                    </h2>
                    <div className="flex-1 h-1 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full"></div>
                </div>

                {/* Staggered Grid Layout */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 stagger-children">
                    {topics.map((topic, index) => (
                        <Link
                            key={topic.path}
                            to={topic.path}
                            className={`group relative overflow-hidden rounded-3xl border-2 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] ${topic.bgPattern} ${index % 3 === 0 ? 'md:col-span-2' : ''
                                }`}
                            style={{
                                borderColor: 'var(--color-border)',
                                backgroundColor: 'var(--color-surface)',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                            <div className="relative p-8">
                                {/* Icon & Emoji */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${topic.color} shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <topic.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <span className="text-5xl group-hover:scale-125 transition-transform duration-300">{topic.emoji}</span>
                                    </div>

                                    <div className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30" style={{ color: 'var(--color-primary-dark)' }}>
                                        {topic.count}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-3 group-hover:underline-wavy" style={{ color: 'var(--color-text-primary)' }}>
                                    {topic.title}
                                </h3>

                                <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                    {topic.desc}
                                </p>

                                {/* CTA */}
                                <div className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all" style={{ color: 'var(--color-primary)' }}>
                                    <span>Start Learning</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>

                            {/* Decorative corner */}
                            <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${topic.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Why Learn Here Section */}
            <div className="mb-20 p-10 rounded-3xl relative overflow-hidden flip-in-x" style={{ backgroundColor: 'var(--color-bg-secondary)', animationDelay: '0.6s' }}>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Target className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                        <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            Why Learn Here?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Zap, title: 'Interactive', desc: 'Learn by doing with live code examples' },
                            { icon: BookOpen, title: 'Comprehensive', desc: 'From basics to advanced topics' },
                            { icon: Rocket, title: 'Practical', desc: 'Real-world projects and use cases' }
                        ].map((feature, i) => (
                            <div key={i} className="flex gap-4 hover-bounce">
                                <div className="shrink-0">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 heartbeat">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default HomePage;
