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
        },
        ar: {
            subtitle: "من المدونة",
            title: "آخر القصص",
            readMore: "اقرأ المزيد",
            read: "دقائق للقراءة",
            seeAll: "جميع القصص",
            featuredLabel: "قصة مميزة",
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
            className="relative py-20 md:py-28 bg-[#f7f6f2] font-mikhak-regular overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-[12%] h-[240px] w-[240px] rounded-full bg-primary/8 blur-3xl" />
                <div className="absolute bottom-0 right-[10%] h-[220px] w-[220px] rounded-full bg-secondary/8 blur-3xl" />
            </div>

            <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-[32px] border border-white/60 bg-white/72 backdrop-blur-sm shadow-[0_18px_60px_rgba(15,23,42,0.05)] px-5 sm:px-7 lg:px-8 py-8 sm:py-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 sm:mb-12">
                        <div className="max-w-2xl">
                            <p className="inline-flex items-center rounded-full border border-primary/10 bg-white/70 px-3 py-1.5 text-[11px] sm:text-[12px] font-mikhak-bold text-primary tracking-[0.16em] uppercase shadow-sm">
                                {t[lang].subtitle}
                            </p>

                            <h2 className="mt-4 text-[28px] sm:text-[34px] md:text-[40px] font-mikhak-bold text-slate-900 leading-[1.15] tracking-tight">
                                {t[lang].title}
                            </h2>
                        </div>

                        <Link
                            href={route('blog.index')}
                            className={`inline-flex items-center gap-2 self-start rounded-full border border-black/10 bg-white/80 px-4 py-2.5 text-[13px] font-mikhak-medium text-slate-700 transition-all hover:border-primary/15 hover:text-slate-900 hover:bg-white ${isRtl ? 'flex-row-reverse' : ''}`}
                        >
                            <span>{t[lang].seeAll}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${
                                    isRtl
                                        ? 'rotate-180 group-hover:-translate-x-1'
                                        : 'group-hover:translate-x-1'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                        {/* Featured */}
                        {featured && (
                            <div className="lg:col-span-7">
                                <Link
                                    href={route('blog.show', featured.slug)}
                                    className="group block h-full"
                                >
                                    <article className="h-full rounded-[28px] border border-white/70 bg-[#fcfbf8] p-3 sm:p-4 shadow-[0_14px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-[#f1efe8]">
                                            {featured.image ? (
                                                <>
                                                    <img
                                                        src={`/storage/${featured.image}`}
                                                        alt={featured.title?.[lang]}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
                                                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f5f2ea] to-[#ece8dd]">
                                                    <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}

                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex rounded-full bg-white/88 px-3 py-1.5 text-[11px] font-mikhak-bold text-slate-700 shadow-sm backdrop-blur-sm">
                                                    {t[lang].featuredLabel}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-2 sm:p-3 pt-5">
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary via-shining to-secondary flex items-center justify-center text-white font-mikhak-bold text-[10px] uppercase flex-shrink-0 shadow-sm">
                                                    {featured.user?.name?.charAt(0)}
                                                </div>

                                                <span className="text-[13px] font-mikhak-medium text-slate-700">
                                                    {featured.user?.name}
                                                </span>

                                                {featured.category?.title?.[lang] && (
                                                    <>
                                                        <span className="text-slate-300">•</span>
                                                        <span className="text-[12px] text-slate-500">
                                                            {featured.category.title[lang]}
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            <h3 className="text-[22px] sm:text-[24px] md:text-[28px] font-mikhak-bold text-slate-900 leading-[1.22] tracking-tight mb-3 transition-colors group-hover:text-primary line-clamp-2">
                                                {featured.title?.[lang]}
                                            </h3>

                                            <p className="text-[14px] sm:text-[15px] leading-7 text-slate-500 line-clamp-2 mb-5 max-w-2xl">
                                                {featured.short_description?.[lang]}
                                            </p>

                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-400">
                                                    <span>{formatDate(featured.created_at)}</span>
                                                    <span>•</span>
                                                    <span>{getReadingTime(featured)} {t[lang].read}</span>
                                                </div>

                                                <span className={`inline-flex items-center gap-2 text-[13px] font-mikhak-bold text-primary transition-colors group-hover:text-secondary ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                    {t[lang].readMore}
                                                    <svg
                                                        className={`w-4 h-4 transition-transform duration-200 ${
                                                            isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                                                        }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </div>
                        )}

                        {/* Secondary */}
                        <div className="lg:col-span-5">
                            <div className="h-full rounded-[28px] border border-white/70 bg-[#fcfbf8] p-4 sm:p-5 shadow-[0_14px_40px_rgba(15,23,42,0.035)]">
                                <div className="mb-4 flex items-center gap-3">
                                    <h3 className="text-[15px] font-mikhak-bold text-slate-900">
                                        {lang === 'ar' ? 'مقالات أخرى' : 'More stories'}
                                    </h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent" />
                                </div>

                                <div className="space-y-3">
                                    {secondary.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={route('blog.show', article.slug)}
                                            className="group flex gap-4 items-start rounded-[22px] border border-transparent bg-white/75 p-3 transition-all hover:border-white/80 hover:bg-white hover:shadow-[0_10px_24px_rgba(15,23,42,0.045)]"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary via-shining to-secondary flex items-center justify-center text-white font-mikhak-bold text-[8px] uppercase flex-shrink-0">
                                                        {article.user?.name?.charAt(0)}
                                                    </div>
                                                    <span className="text-[12px] font-mikhak-medium text-slate-600 truncate">
                                                        {article.user?.name}
                                                    </span>
                                                </div>

                                                <h4 className="text-[15px] sm:text-[16px] font-mikhak-bold text-slate-900 leading-7 mb-2 line-clamp-2 transition-colors group-hover:text-primary">
                                                    {article.title?.[lang]}
                                                </h4>

                                                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                                                    <span>{formatDate(article.created_at)}</span>
                                                    <span>•</span>
                                                    <span>{getReadingTime(article)} {t[lang].read}</span>
                                                </div>
                                            </div>

                                            {article.image ? (
                                                <div className="relative w-[82px] h-[82px] flex-shrink-0 overflow-hidden rounded-[18px] bg-[#f1efe8]">
                                                    <img
                                                        src={`/storage/${article.image}`}
                                                        alt={article.title?.[lang]}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
                                                </div>
                                            ) : (
                                                <div className="w-[82px] h-[82px] flex-shrink-0 rounded-[18px] bg-gradient-to-br from-[#f5f2ea] to-[#ece8dd] flex items-center justify-center">
                                                    <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-10 sm:mt-12 pt-6 border-t border-black/5 text-center">
                        <Link
                            href={route('blog.index')}
                            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-shining to-secondary px-6 py-3 text-[14px] font-mikhak-bold text-white shadow-[0_12px_25px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 ${isRtl ? 'flex-row-reverse' : ''}`}
                        >
                            <span>{t[lang].seeAll}</span>
                            <svg
                                className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
