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
            subtitle: "Thoughtful articles, practical ideas, and refined inspiration for your most meaningful moments.",
            all: "All",
            empty: "No stories published yet. Check back soon.",
            home: "Home",
            read: "min read",
            prev: "Previous",
            next: "Next",
            trending: "Trending on Monasbtk",
            topics: "Discover more topics",
            about: "About Monasbtk Blog",
            aboutText:
                "A curated editorial space for ideas, celebration guidance, and elegant inspiration that helps you plan with more clarity and better taste.",
            learnMore: "Learn more about us",
        },
        ar: {
            title: "المدونة",
            subtitle: "مقالات منتقاة بعناية، وأفكار عملية، وإلهام راقٍ يساعدك على صناعة لحظاتك الأجمل بذوق ووضوح.",
            all: "الكل",
            empty: "لم يتم نشر مقالات بعد. عد قريباً.",
            home: "الرئيسية",
            read: "دقائق للقراءة",
            prev: "السابق",
            next: "التالي",
            trending: "الأكثر رواجاً في مناسبتك",
            topics: "اكتشف المزيد من المواضيع",
            about: "عن مدونة مناسبتك",
            aboutText:
                "مساحة تحريرية منتقاة للأفكار، ونصائح المناسبات، والإلهام الأنيق الذي يساعدك على التخطيط بصورة أوضح ولمسة أجمل.",
            learnMore: "تعرّف علينا أكثر",
        }
    };

    const currentCategoryId =
        typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search).get('category')
            : null;

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

    const trendingArticles = articles.data.slice(0, 6);
    const mainArticles = articles.data;

    return (
        <div
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="min-h-screen bg-[#f7f6f2] text-slate-800 font-mikhak-regular selection:bg-primary/15 selection:text-slate-900"
        >
            <Head title={t[lang].title}>
                <meta
                    name="description"
                    content={
                        lang === 'ar'
                            ? 'اكتشف أحدث المقالات والأفكار والإلهام لمناسباتك المثالية في مدونة مناسبتك.'
                            : 'Explore refined articles, practical ideas, and elegant inspiration on the Monasbtk blog.'
                    }
                />
            </Head>

            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.5),transparent_28%)]" />
                <div className="absolute top-0 left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
                <div className="absolute bottom-20 right-10 h-[240px] w-[240px] rounded-full bg-secondary/8 blur-3xl" />
            </div>

            <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f6f2]/80 backdrop-blur-xl">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-[62px] items-center justify-between">
                        <Link
                            href="/"
                            className="text-[22px] sm:text-[24px] font-mikhak-bold tracking-tight text-slate-900 transition-colors hover:text-primary"
                        >
                            Monasbtk
                        </Link>

                        <div className="flex items-center gap-3 sm:gap-5">
                            <Link
                                href="/"
                                className="text-[13px] font-mikhak-medium text-slate-600 transition-colors hover:text-slate-900"
                            >
                                {t[lang].home}
                            </Link>

                            <button
                                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[12px] font-mikhak-bold text-slate-700 transition-all hover:border-primary/20 hover:bg-white hover:text-slate-900"
                            >
                                {lang === 'en' ? 'ع' : 'En'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pb-16">
                <section className="pt-8 sm:pt-10 lg:pt-12">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-[30px] border border-white/50 bg-white/70 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-shining/10 to-secondary/12" />
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                            <div className="relative px-5 sm:px-8 lg:px-10 py-10 sm:py-12 lg:py-14">
                                <div className="max-w-3xl">
                                    <div className="inline-flex items-center rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-[11px] font-mikhak-bold text-slate-700 shadow-sm">
                                        {lang === 'ar' ? 'تحرير منتقى بعناية' : 'Curated editorial'}
                                    </div>

                                    <h1 className="mt-5 text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] font-mikhak-bold text-slate-900">
                                        {t[lang].title}
                                    </h1>

                                    <p className="mt-4 max-w-2xl text-[14px] sm:text-[15px] leading-7 text-slate-600">
                                        {t[lang].subtitle}
                                    </p>

                                    <div className="mt-7 flex flex-wrap items-center gap-3">
                                        <Link
                                            href={route('blog.index')}
                                            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary via-shining to-secondary px-5 py-2.5 text-[13px] font-mikhak-bold text-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5"
                                        >
                                            {lang === 'ar' ? 'استعرض المقالات' : 'Explore articles'}
                                        </Link>

                                        <div className="text-[12px] sm:text-[13px] text-slate-500">
                                            {articles?.total ? `${articles.total}+ ${lang === 'ar' ? 'مقال' : 'articles'}` : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {trendingArticles.length > 0 && articles.current_page === 1 && !currentCategoryId && (
                    <section className="pt-6 sm:pt-8">
                        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="rounded-[26px] border border-black/5 bg-[#fcfbf8] px-5 sm:px-7 py-6 sm:py-7 shadow-[0_10px_34px_rgba(15,23,42,0.035)]">
                                <div className="mb-6 flex items-center justify-between gap-4">
                                    <h2 className="text-[14px] sm:text-[15px] font-mikhak-bold text-slate-900">
                                        {t[lang].trending}
                                    </h2>

                                    <div className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                    {trendingArticles.map((article, index) => (
                                        <Link
                                            key={article.id}
                                            href={route('blog.show', article.slug)}
                                            className="group rounded-[22px] border border-black/5 bg-white/90 p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.055)]"
                                        >
                                            <div className="flex gap-3 items-start">
                                                <span className="min-w-[36px] text-[24px] leading-none font-mikhak-bold bg-gradient-to-b from-primary via-shining to-secondary bg-clip-text text-transparent">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>

                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1efe8] text-[9px] font-mikhak-bold uppercase text-slate-500">
                                                            {article.user?.name?.charAt(0)}
                                                        </div>

                                                        <span className="truncate text-[12px] font-mikhak-medium text-slate-600">
                                                            {article.user?.name}
                                                        </span>
                                                    </div>

                                                    <h3 className="line-clamp-2 text-[14px] sm:text-[15px] leading-6 font-mikhak-bold text-slate-900 transition-colors group-hover:text-primary">
                                                        {article.title[lang]}
                                                    </h3>

                                                    <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
                                                        <span>{formatDate(article.created_at)}</span>
                                                        <span>•</span>
                                                        <span>{getReadingTime(article)} {t[lang].read}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <section className="pt-6">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="sticky top-[62px] z-40 rounded-[22px] border border-white/60 bg-white/70 p-2 backdrop-blur-xl shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                                <Link
                                    href={route('blog.index')}
                                    className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-mikhak-medium transition-all ${
                                        !currentCategoryId
                                            ? 'bg-gradient-to-r from-primary via-shining to-secondary text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-[#f3f1eb] hover:text-slate-900'
                                    }`}
                                >
                                    {t[lang].all}
                                </Link>

                                {categories.map((cat) => {
                                    const isActive = currentCategoryId == cat.id;

                                    return (
                                        <Link
                                            key={cat.id}
                                            href={route('blog.index', { category: cat.id })}
                                            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-mikhak-medium transition-all ${
                                                isActive
                                                    ? 'bg-gradient-to-r from-primary via-shining to-secondary text-white shadow-sm'
                                                    : 'text-slate-600 hover:bg-[#f3f1eb] hover:text-slate-900'
                                            }`}
                                        >
                                            {cat.title[lang]}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pt-8">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-10 items-start">
                            <div className="min-w-0">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentCategoryId || 'all'}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.28 }}
                                        className="space-y-4"
                                    >
                                        {mainArticles.map((article, index) => (
                                            <motion.div
                                                key={article.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.035, duration: 0.3 }}
                                            >
                                                <Link
                                                    href={route('blog.show', article.slug)}
                                                    className="group block overflow-hidden rounded-[26px] border border-white/60 bg-white/78 p-4 sm:p-5 md:p-6 shadow-[0_12px_34px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
                                                >
                                                    <div className="flex gap-4 sm:gap-5 md:gap-6 items-start">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="mb-2.5 flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px] text-slate-500">
                                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1efe8] text-[9px] font-mikhak-bold uppercase text-slate-500">
                                                                    {article.user?.name?.charAt(0)}
                                                                </div>

                                                                <span className="font-mikhak-medium text-slate-700">
                                                                    {article.user?.name}
                                                                </span>

                                                                {article.category?.title?.[lang] && (
                                                                    <>
                                                                        <span className="hidden sm:inline text-slate-300">•</span>
                                                                        <span className="hidden sm:inline text-slate-500">
                                                                            {article.category.title[lang]}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </div>

                                                            <h3 className="line-clamp-2 text-[17px] sm:text-[19px] md:text-[21px] leading-[1.4] font-mikhak-bold text-slate-900 transition-colors group-hover:text-primary">
                                                                {article.title[lang]}
                                                            </h3>

                                                            <p className="mt-2 hidden md:block line-clamp-2 text-[14px] leading-7 text-slate-500">
                                                                {article.short_description?.[lang]}
                                                            </p>

                                                            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[12px] sm:text-[13px] text-slate-400">
                                                                <span>{formatDate(article.created_at)}</span>
                                                                <span className="text-slate-300">•</span>
                                                                <span>{getReadingTime(article)} {t[lang].read}</span>

                                                                <span className="sm:hidden rounded-full bg-[#f3f1eb] px-2.5 py-1 text-[11px] font-mikhak-medium text-slate-500">
                                                                    {article.category?.title?.[lang]}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="relative h-[98px] w-[98px] sm:h-[112px] sm:w-[112px] md:h-[126px] md:w-[182px] flex-shrink-0 overflow-hidden rounded-[22px] bg-[#f1efe8]">
                                                            {article.image ? (
                                                                <>
                                                                    <img
                                                                        src={`/storage/${article.image}`}
                                                                        alt={article.title[lang]}
                                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                                                    />
                                                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-80" />
                                                                </>
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center">
                                                                    <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>

                                {articles.last_page > 1 && (
                                    <div className="mt-8 flex items-center justify-center gap-3">
                                        {articles.prev_page_url ? (
                                            <Link
                                                href={articles.prev_page_url}
                                                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-2.5 text-[13px] font-mikhak-medium text-slate-700 transition-all hover:bg-white hover:text-slate-900"
                                            >
                                                <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                                </svg>
                                                {t[lang].prev}
                                            </Link>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/50 px-5 py-2.5 text-[13px] font-mikhak-medium text-slate-300 cursor-not-allowed">
                                                <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                                </svg>
                                                {t[lang].prev}
                                            </span>
                                        )}

                                        <span className="px-2 text-[12px] font-mikhak-medium text-slate-400">
                                            {articles.current_page} / {articles.last_page}
                                        </span>

                                        {articles.next_page_url ? (
                                            <Link
                                                href={articles.next_page_url}
                                                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-2.5 text-[13px] font-mikhak-medium text-slate-700 transition-all hover:bg-white hover:text-slate-900"
                                            >
                                                {t[lang].next}
                                                <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/50 px-5 py-2.5 text-[13px] font-mikhak-medium text-slate-300 cursor-not-allowed">
                                                {t[lang].next}
                                                <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                )}

                                {articles.data.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="rounded-[26px] border border-white/60 bg-white/78 px-6 py-16 text-center shadow-[0_12px_34px_rgba(15,23,42,0.04)]"
                                    >
                                        <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 via-shining/10 to-secondary/10" />
                                        <p className="mt-5 mb-6 text-[14px] sm:text-[15px] text-slate-500 font-mikhak-medium">
                                            {t[lang].empty}
                                        </p>
                                        <Link
                                            href={route('blog.index')}
                                            className="inline-flex rounded-full bg-gradient-to-r from-primary via-shining to-secondary px-5 py-2.5 text-[13px] font-mikhak-bold text-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5"
                                        >
                                            {t[lang].all}
                                        </Link>
                                    </motion.div>
                                )}
                            </div>

                            <aside className="hidden lg:block">
                                <div className="sticky top-[124px] space-y-5">
                                    <div className="rounded-[26px] border border-white/60 bg-white/76 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                                        <h4 className="mb-4 text-[14px] font-mikhak-bold text-slate-900">
                                            {t[lang].topics}
                                        </h4>

                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={route('blog.index', { category: cat.id })}
                                                    className={`rounded-full px-4 py-2 text-[13px] font-mikhak-medium transition-all ${
                                                        currentCategoryId == cat.id
                                                            ? 'bg-gradient-to-r from-primary via-shining to-secondary text-white'
                                                            : 'bg-[#f3f1eb] text-slate-600 hover:bg-[#ece8dd] hover:text-slate-900'
                                                    }`}
                                                >
                                                    {cat.title[lang]}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-[26px] border border-white/60 bg-white/76 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                                        <h4 className="text-[14px] font-mikhak-bold text-slate-900">
                                            {t[lang].about}
                                        </h4>

                                        <p className="mt-3 text-[13px] leading-7 text-slate-500">
                                            {t[lang].aboutText}
                                        </p>

                                        <Link
                                            href="/"
                                            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-mikhak-bold text-primary transition-colors hover:text-secondary"
                                        >
                                            {t[lang].learnMore}
                                            <svg className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>

                                    <div className="rounded-[26px] border border-white/60 bg-white/70 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.035)]">
                                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-slate-400">
                                            <Link href="/" className="transition-colors hover:text-slate-600">
                                                {lang === 'en' ? 'Home' : 'الرئيسية'}
                                            </Link>
                                            <Link href="/about" className="transition-colors hover:text-slate-600">
                                                {lang === 'en' ? 'About' : 'عن مناسبتك'}
                                            </Link>
                                            <Link href="/contact" className="transition-colors hover:text-slate-600">
                                                {lang === 'en' ? 'Contact' : 'تواصل معنا'}
                                            </Link>
                                            <Link href="/privacy-policy" className="transition-colors hover:text-slate-600">
                                                {lang === 'en' ? 'Privacy' : 'الخصوصية'}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
