import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ articles, categories }) {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('monasbtk_lang') || 'en';
        }
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('monasbtk_lang', lang);
    }, [lang]);

    const t = {
        en: {
            title: "Blog",
            subtitle: "Discover stories, thinking, and expertise from writers on any topic.",
            all: "All",
            readMore: "Read more",
            empty: "No stories published yet. Check back soon.",
            home: "Home",
            read: "min read",
            prev: "Previous",
            next: "Next",
            trending: "Trending on Monasbtk",
        },
        ar: {
            title: "المدونة",
            subtitle: "اكتشف القصص والأفكار والخبرات من كتّابنا في مختلف المواضيع.",
            all: "الكل",
            readMore: "اقرأ المزيد",
            empty: "لم يتم نشر قصص بعد. عد قريباً.",
            home: "الرئيسية",
            read: "دقائق للقراءة",
            prev: "السابق",
            next: "التالي",
            trending: "الأكثر رواجاً في مناسبتك",
        }
    };

    const currentCategoryId = new URLSearchParams(window.location.search).get('category');

    const getReadingTime = (article) => {
        const text = (article.content?.[lang] || '').replace(/<[^>]*>/g, '').trim();
        return Math.max(1, Math.ceil((text ? text.split(/\s+/).length : 100) / 200));
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString(
            lang === 'ar' ? 'ar-EG' : 'en-US',
            { month: 'short', day: 'numeric', year: 'numeric' }
        );
    };

    // Split articles for different layouts
    const trendingArticles = articles.data.slice(0, 6);
    const mainArticles = articles.data;

    return (
        <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-white min-h-screen font-mikhak-regular selection:bg-green-100 selection:text-green-900">
            <Head title={t[lang].title}>
                <meta name="description" content={lang === 'ar' ? 'اكتشف أحدث المقالات والأفكار والإلهام لمناسباتك المثالية في مدونة مناسبتك.' : 'Explore our latest articles, insights, and inspiration for your perfect occasions on the Monasbtk blog.'} />
            </Head>

            {/* Navigation */}
            <nav className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
                <div className="max-w-[1336px] mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-[57px] items-center">
                        <Link href="/" className="text-[26px] font-mikhak-bold text-gray-900 tracking-tight hover:text-gray-700 transition-colors">
                            Monasbtk
                        </Link>
                        <div className="flex items-center gap-5">
                            <Link href="/" className="text-[13px] font-mikhak-medium text-gray-600 hover:text-gray-900 transition-colors">
                                {t[lang].home}
                            </Link>
                            <button
                                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                                className="w-8 h-8 flex items-center justify-center text-[12px] font-mikhak-bold text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 rounded-full hover:border-gray-400"
                            >
                                {lang === 'en' ? 'ع' : 'En'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pb-20">
                {/* Trending Section - Medium Style Numbered Grid */}
                {trendingArticles.length > 0 && articles.current_page === 1 && !currentCategoryId && (
                    <section className="border-b border-gray-200 bg-white">
                        <div className="max-w-[1336px] mx-auto px-6 lg:px-8 py-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h2 className="text-[14px] font-mikhak-bold text-gray-900 tracking-wide uppercase">
                                    {t[lang].trending}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                                {trendingArticles.map((article, index) => (
                                    <Link
                                        key={article.id}
                                        href={route('blog.show', article.slug)}
                                        className="group flex gap-4 items-start"
                                    >
                                        <span className="text-[32px] font-mikhak-bold text-gray-200 leading-none pt-0.5 select-none min-w-[32px]">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-mikhak-bold text-[8px] uppercase flex-shrink-0">
                                                    {article.user?.name?.charAt(0)}
                                                </div>
                                                <span className="text-[12px] font-mikhak-medium text-gray-700 truncate">{article.user?.name}</span>
                                            </div>
                                            <h3 className="text-[15px] font-mikhak-bold text-gray-900 leading-snug mb-1.5 group-hover:text-gray-600 transition-colors line-clamp-2">
                                                {article.title[lang]}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mikhak-regular">
                                                <span>{formatDate(article.created_at)}</span>
                                                <span>·</span>
                                                <span>{getReadingTime(article)} {t[lang].read}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Category Tabs */}
                <div className="border-b border-gray-200 bg-white sticky top-[57px] z-40">
                    <div className="max-w-[1336px] mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide -mb-px">
                            <Link
                                href={route('blog.index')}
                                className={`whitespace-nowrap px-4 py-3.5 text-[13px] font-mikhak-medium transition-colors border-b ${
                                    !currentCategoryId
                                        ? 'border-gray-900 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                {t[lang].all}
                            </Link>
                            {categories.map(cat => {
                                const isActive = currentCategoryId == cat.id;
                                return (
                                    <Link
                                        key={cat.id}
                                        href={route('blog.index', { category: cat.id })}
                                        className={`whitespace-nowrap px-4 py-3.5 text-[13px] font-mikhak-medium transition-colors border-b ${
                                            isActive
                                                ? 'border-gray-900 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:text-gray-900'
                                        }`}
                                    >
                                        {cat.title[lang]}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="max-w-[1336px] mx-auto px-6 lg:px-8 pt-10">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

                        {/* Main Column */}
                        <div className="flex-1 min-w-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentCategoryId || 'all'}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="divide-y divide-gray-200"
                                >
                                    {mainArticles.map((article, index) => (
                                        <motion.div
                                            key={article.id}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.04, duration: 0.35 }}
                                        >
                                            <Link
                                                href={route('blog.show', article.slug)}
                                                className="group flex gap-6 md:gap-8 py-8 items-start"
                                            >
                                                {/* Text Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2.5">
                                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-mikhak-bold text-[9px] uppercase flex-shrink-0">
                                                            {article.user?.name?.charAt(0)}
                                                        </div>
                                                        <span className="text-[13px] font-mikhak-medium text-gray-700">{article.user?.name}</span>
                                                        {article.category?.title?.[lang] && (
                                                            <>
                                                                <span className="text-gray-300 hidden sm:inline">in</span>
                                                                <span className="text-[13px] font-mikhak-medium text-gray-700 hidden sm:inline">{article.category.title[lang]}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <h3 className="text-[18px] md:text-[22px] font-mikhak-bold text-gray-900 leading-[1.3] mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                                                        {article.title[lang]}
                                                    </h3>
                                                    <p className="text-gray-500 font-mikhak-regular text-[15px] leading-[1.6] line-clamp-2 mb-4 hidden md:block">
                                                        {article.short_description?.[lang]}
                                                    </p>
                                                    <div className="flex items-center gap-3 text-[13px] text-gray-500 font-mikhak-regular">
                                                        <span>{formatDate(article.created_at)}</span>
                                                        <span className="text-gray-300">·</span>
                                                        <span>{getReadingTime(article)} {t[lang].read}</span>
                                                        <span className="sm:hidden px-2.5 py-0.5 bg-gray-100 rounded-full text-[11px] font-mikhak-medium text-gray-500">
                                                            {article.category?.title?.[lang]}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Thumbnail */}
                                                <div className="w-[112px] h-[112px] md:w-[200px] md:h-[134px] flex-shrink-0 overflow-hidden bg-gray-100">
                                                    {article.image ? (
                                                        <img
                                                            src={`/storage/${article.image}`}
                                                            alt={article.title[lang]}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {/* Pagination */}
                            {articles.last_page > 1 && (
                                <div className="mt-4 flex items-center justify-center gap-3 border-t border-gray-200 pt-8">
                                    {articles.prev_page_url ? (
                                        <Link
                                            href={articles.prev_page_url}
                                            className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-mikhak-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-full hover:border-gray-500 transition-all"
                                        >
                                            <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                            {t[lang].prev}
                                        </Link>
                                    ) : (
                                        <span className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-mikhak-medium text-gray-300 border border-gray-200 rounded-full cursor-not-allowed">
                                            <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                            {t[lang].prev}
                                        </span>
                                    )}
                                    <span className="text-[12px] font-mikhak-medium text-gray-400 px-2">
                                        {articles.current_page} / {articles.last_page}
                                    </span>
                                    {articles.next_page_url ? (
                                        <Link
                                            href={articles.next_page_url}
                                            className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-mikhak-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-full hover:border-gray-500 transition-all"
                                        >
                                            {t[lang].next}
                                            <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                        </Link>
                                    ) : (
                                        <span className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-mikhak-medium text-gray-300 border border-gray-200 rounded-full cursor-not-allowed">
                                            {t[lang].next}
                                            <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Empty State */}
                            {articles.data.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-24"
                                >
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
                                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                    </div>
                                    <p className="text-gray-500 font-mikhak-medium text-[15px] mb-6">{t[lang].empty}</p>
                                    <Link
                                        href={route('blog.index')}
                                        className="inline-flex px-5 py-2 bg-gray-900 text-white rounded-full text-[13px] font-mikhak-bold hover:bg-gray-800 transition-colors"
                                    >
                                        {t[lang].all}
                                    </Link>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="hidden lg:block w-[340px] flex-shrink-0 border-l border-gray-200 pl-10">
                            <div className="sticky top-[120px]">
                                {/* Discover Topics */}
                                <div className="mb-10">
                                    <h4 className="text-[14px] font-mikhak-bold text-gray-900 mb-4">
                                        {lang === 'en' ? 'Discover more topics' : 'اكتشف المزيد من المواضيع'}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map(cat => (
                                            <Link
                                                key={cat.id}
                                                href={route('blog.index', { category: cat.id })}
                                                className={`px-4 py-2 rounded-full text-[13px] font-mikhak-medium transition-all ${
                                                    currentCategoryId == cat.id
                                                        ? 'bg-gray-900 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {cat.title[lang]}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Divider */}
                                <hr className="border-gray-200 mb-8" />

                                {/* Reading list / About */}
                                <div className="space-y-5">
                                    <h4 className="text-[14px] font-mikhak-bold text-gray-900">
                                        {lang === 'en' ? 'About Monasbtk Blog' : 'عن مدونة مناسبتك'}
                                    </h4>
                                    <p className="text-[13px] text-gray-500 font-mikhak-regular leading-relaxed">
                                        {lang === 'en'
                                            ? 'Your go-to destination for event planning tips, celebration ideas, and lifestyle inspiration. We share stories that help you create unforgettable moments.'
                                            : 'وجهتك الأولى لنصائح تنظيم المناسبات، وأفكار الاحتفالات، وإلهام نمط الحياة. نشارك قصصاً تساعدك في خلق لحظات لا تُنسى.'}
                                    </p>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-1.5 text-[13px] font-mikhak-bold text-green-700 hover:text-green-800 transition-colors"
                                    >
                                        {lang === 'en' ? 'Learn more about us' : 'تعرّف علينا أكثر'}
                                        <svg className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                    </Link>
                                </div>

                                {/* Footer Links */}
                                <div className="mt-10 pt-6 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-400 font-mikhak-regular">
                                        <Link href="/" className="hover:text-gray-600 transition-colors">{lang === 'en' ? 'Home' : 'الرئيسية'}</Link>
                                        <Link href="/about" className="hover:text-gray-600 transition-colors">{lang === 'en' ? 'About' : 'عن مناسبتك'}</Link>
                                        <Link href="/contact" className="hover:text-gray-600 transition-colors">{lang === 'en' ? 'Contact' : 'تواصل معنا'}</Link>
                                        <Link href="/privacy-policy" className="hover:text-gray-600 transition-colors">{lang === 'en' ? 'Privacy' : 'الخصوصية'}</Link>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
