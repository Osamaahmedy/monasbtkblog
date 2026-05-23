import React from 'react';
import { Link } from '@inertiajs/react';

export default function BlogSection({ lang, articles }) {
    if (!articles || articles.length === 0) return null;

    const isRtl = lang === 'ar';

    const t = {
        en: {
            subtitle: "From the blog",
            title: "Latest Stories",
            readMore: "Read more",
            read: "min read",
            seeAll: "See all stories",
            featuredLabel: "Featured story",
            moreStories: "More stories",
        },
        ar: {
            subtitle: "من المدونة",
            title: "آخر القصص",
            readMore: "اقرأ المزيد",
            read: "دقائق للقراءة",
            seeAll: "جميع القصص",
            featuredLabel: "قصة مميزة",
            moreStories: "مقالات أخرى",
        }
    };

    const getReadingTime = (article) => {
        const text = (article.content?.[lang] || '').replace(/<[^>]*>/g, '').trim();
        return Math.max(1, Math.ceil((text ? text.split(/\s+/).length : 100) / 200));
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString(
            isRtl ? 'ar-EG' : 'en-US',
            { month: 'short', day: 'numeric', year: 'numeric' }
        );
    };

    const featured = articles[0];
    const secondary = articles.slice(1, 4);

    return (
        <section
            id="blog-section"
            dir={isRtl ? 'rtl' : 'ltr'}
            className="relative bg-gradient-to-b from-white to-[#F9F7FC] py-24 lg:py-32 overflow-hidden"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(121,75,199,0.025)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="flex items-end justify-between gap-6 flex-wrap mb-12 sm:mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2.5 mb-4">
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
                            <span className={`text-xs font-bold tracking-wider uppercase text-primary ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                {t[lang].subtitle}
                            </span>
                        </div>

                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            {t[lang].title}
                        </h2>
                    </div>

                    <Link
                        href={route('blog.index')}
                        className={`group inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-md hover:shadow-purple-500/5 ${isRtl ? 'flex-row-reverse font-mikhak-medium' : 'font-outfit'}`}
                    >
                        <span>{t[lang].seeAll}</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                    {/* Featured article */}
                    {featured && (
                        <div className="lg:col-span-7">
                            <Link
                                href={route('blog.show', featured.slug)}
                                className="group block h-full cursor-pointer select-none"
                            >
                                <article className="h-full rounded-[2rem] border border-slate-100 bg-white p-4 transition-all duration-300 hover:shadow-[0_20px_45px_rgba(121,75,199,0.06)] hover:border-primary/10">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-50">
                                        {featured.image ? (
                                            <img
                                                src={`/storage/${featured.image}`}
                                                alt={featured.title?.[lang]}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg
                                                    className="w-12 h-12 text-slate-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}

                                        <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'}`}>
                                            <span className={`inline-flex rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-primary border border-purple-100 shadow-sm ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                                {t[lang].featuredLabel}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-2 pt-6 pb-2">
                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-[10px] font-bold uppercase flex-shrink-0">
                                                {featured.user?.name?.charAt(0)}
                                            </div>

                                            <span className={`text-xs sm:text-sm font-semibold text-slate-500 ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                                {featured.user?.name}
                                            </span>

                                            {featured.category?.title?.[lang] && (
                                                <>
                                                    <span className="text-slate-300 text-xs">·</span>
                                                    <span className={`text-xs font-semibold text-primary ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                                        {featured.category.title[lang]}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        <h3 className={`text-2xl sm:text-3xl leading-[1.25] tracking-tight text-slate-800 mb-4 transition-colors duration-300 group-hover:text-primary font-extrabold line-clamp-2 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                            {featured.title?.[lang]}
                                        </h3>

                                        <p className={`text-sm sm:text-base leading-relaxed text-slate-500 line-clamp-2 mb-6 ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                                            {featured.short_description?.[lang]}
                                        </p>

                                        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-50">
                                            <div className={`flex flex-wrap items-center gap-2 text-xs text-slate-400 ${isRtl ? 'font-mikhak-regular' : 'font-outfit'}`}>
                                                <span>{formatDate(featured.created_at)}</span>
                                                <span className="text-slate-200">·</span>
                                                <span>{getReadingTime(featured)} {t[lang].read}</span>
                                            </div>

                                            <span className={`inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors duration-350 ${isRtl ? 'flex-row-reverse font-mikhak-medium' : 'font-outfit'}`}>
                                                {t[lang].readMore}
                                                <svg
                                                    className={`w-4 h-4 transition-transform duration-200 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </div>
                    )}

                    {/* Secondary articles */}
                    <div className="lg:col-span-5">
                        <div className="h-full rounded-[2rem] border border-slate-100 bg-white p-5 sm:p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className={`text-[11px] font-bold tracking-wider uppercase text-primary flex-shrink-0 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                        {t[lang].moreStories}
                                    </span>
                                    <div className="h-px flex-1 bg-slate-100" />
                                </div>

                                <div className="space-y-4">
                                    {secondary.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={route('blog.show', article.slug)}
                                            className="group flex gap-4 items-start rounded-2xl border border-transparent bg-slate-50/50 p-4 transition-all duration-300 hover:border-purple-100 hover:bg-white hover:shadow-[0_10px_25px_rgba(121,75,199,0.03)] cursor-pointer select-none"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-[8px] font-bold uppercase flex-shrink-0">
                                                        {article.user?.name?.charAt(0)}
                                                    </div>

                                                    <span className={`text-[12px] font-semibold text-slate-500 truncate ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                                        {article.user?.name}
                                                    </span>
                                                </div>

                                                <h4 className={`text-base sm:text-lg leading-snug text-slate-800 mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-primary font-bold ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                                    {article.title?.[lang]}
                                                </h4>

                                                <div className={`flex flex-wrap items-center gap-2 text-[11px] text-slate-400 ${isRtl ? 'font-mikhak-regular' : 'font-outfit'}`}>
                                                    <span>{formatDate(article.created_at)}</span>
                                                    <span className="text-slate-200">·</span>
                                                    <span>{getReadingTime(article)} {t[lang].read}</span>
                                                </div>
                                            </div>

                                            {article.image ? (
                                                <div className="w-[84px] h-[84px] flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                                    <img
                                                        src={`/storage/${article.image}`}
                                                        alt={article.title?.[lang]}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-[84px] h-[84px] flex-shrink-0 rounded-xl bg-slate-50 flex items-center justify-center">
                                                    <svg
                                                        className="w-8 h-8 text-slate-300"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* bottom cta inside box */}
                            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                                <Link
                                    href={route('blog.index')}
                                    className={`inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-secondary hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-0.5 ${isRtl ? 'flex-row-reverse font-mikhak-medium' : 'font-outfit'}`}
                                >
                                    <span>{t[lang].seeAll}</span>
                                    <svg
                                        className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
