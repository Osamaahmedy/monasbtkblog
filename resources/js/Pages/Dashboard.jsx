import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Dashboard({ stats }) {
    const statCards = [
        { 
            name: 'Total Articles', 
            value: stats.total_articles, 
            icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', 
            gradient: 'from-violet-600 to-primary',
            bgGlow: 'hover:bg-primary/5',
            color: 'text-primary'
        },
        { 
            name: 'Active Categories', 
            value: stats.active_categories, 
            icon: 'M4 6h16M4 12h16M4 18h16', 
            gradient: 'from-secondary to-pink-500',
            bgGlow: 'hover:bg-secondary/5',
            color: 'text-secondary'
        },
        { 
            name: 'Pending Comments', 
            value: stats.pending_comments, 
            icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', 
            gradient: 'from-amber-500 to-orange-400',
            bgGlow: 'hover:bg-amber-500/5',
            color: 'text-amber-500'
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-mikhak-bold text-2xl sm:text-3xl text-slate-800 leading-tight">
                            Control Panel
                        </h2>
                        <p className="text-slate-500 font-mikhak-regular mt-1 text-sm">Monitor your platform's performance and content seamlessly.</p>
                    </div>
                    <div className="flex items-center px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100/60 shadow-sm w-fit">
                        <span className="flex h-2 w-2 relative mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-mikhak-bold text-emerald-700 uppercase tracking-wider">System Online</span>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((stat, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            key={idx} 
                            className={`relative overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${stat.bgGlow}`}
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-xs font-mikhak-bold text-slate-400 uppercase tracking-widest mb-1.5">{stat.name}</p>
                                    <h4 className="text-3xl sm:text-4xl font-mikhak-bold text-slate-800">{stat.value}</h4>
                                </div>
                                <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg shadow-indigo-200`}>
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-slate-50/50 backdrop-blur-3xl rounded-full blur-2xl pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Welcome Banner */}
                    <div className="lg:col-span-3 relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl group min-h-[340px] flex flex-col justify-center">
                        {/* Premium brand theme gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1b1030] via-[#2f144a] to-[#140c26] z-0"></div>
                        
                        {/* Animated glows */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl -mr-20 -mt-20 mix-blend-screen transition-transform duration-700 group-hover:scale-110"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl -ml-20 -mb-20 mix-blend-screen transition-transform duration-700 group-hover:scale-110"></div>
                        
                        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                            <span 
                                className="inline-block px-3.5 py-1.5 rounded-full border text-xs font-mikhak-medium mb-6 w-max"
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    borderColor: 'rgba(255,255,255,0.12)',
                                    color: '#f9a8d4'
                                }}
                            >
                                ✨ Admin Dashboard
                            </span>
                            <h3 className="text-3xl sm:text-4xl font-mikhak-bold text-white mb-4 leading-tight">
                                Manage your platform <br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9a8d4] via-[#c084fc] to-[#a78bfa]">
                                    with ease & style.
                                </span>
                            </h3>
                            <p className="text-slate-300 font-mikhak-regular max-w-lg mb-8 leading-relaxed text-sm">
                                Create beautiful articles, organize them into categories, and moderate reader comments all from one unified interface.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link 
                                    href={route('admin.articles.create')}
                                    className="px-6 py-3.5 bg-white text-slate-900 font-mikhak-bold text-sm rounded-xl shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center sm:justify-start"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Article
                                </Link>
                                <Link 
                                    href={route('admin.articles.index')}
                                    className="px-6 py-3.5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-mikhak-bold text-sm rounded-xl hover:bg-white/25 transition-all flex items-center justify-center sm:justify-start"
                                >
                                    View Library
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm p-6 sm:p-8 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/40 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                        <h3 className="text-xl font-mikhak-bold text-slate-800 mb-6 relative z-10">Quick Actions</h3>
                        
                        <div className="space-y-4 relative z-10 flex-1">
                            {[
                                { 
                                    name: 'Manage Categories', 
                                    desc: 'Organize your structure', 
                                    href: route('admin.categories.index'), 
                                    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', 
                                    bg: 'bg-purple-50', 
                                    color: 'text-purple-600', 
                                    hoverBorder: 'hover:border-purple-200' 
                                },
                                { 
                                    name: 'Review Comments', 
                                    desc: 'Moderate reader feedback', 
                                    href: route('admin.comments.index'), 
                                    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', 
                                    bg: 'bg-rose-50', 
                                    color: 'text-secondary', 
                                    hoverBorder: 'hover:border-rose-200' 
                                },
                                { 
                                    name: 'Profile Settings', 
                                    desc: 'Manage your account', 
                                    href: route('profile.edit'), 
                                    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', 
                                    bg: 'bg-violet-50', 
                                    color: 'text-primary', 
                                    hoverBorder: 'hover:border-violet-200' 
                                },
                            ].map((item, idx) => (
                                <Link 
                                    key={idx}
                                    href={item.href}
                                    className={`flex items-center p-4 rounded-2xl bg-white border border-slate-100/80 shadow-sm hover:shadow-md transition-all group ${item.hoverBorder}`}
                                >
                                    <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-105 transition-transform duration-300`}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                        </svg>
                                    </div>
                                    <div className="ml-4 flex-1 overflow-hidden">
                                        <h5 className="font-mikhak-bold text-sm text-slate-800 truncate">{item.name}</h5>
                                        <p className="text-xs text-slate-400 font-mikhak-regular mt-0.5 truncate">{item.desc}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
