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
            className="relative bg-[#fdf8fb] py-16 sm:py-20 lg:py-24"
        >
            <div className="max-w-[1180px] mx-auto px-[18px] sm:px-7">
                {/* Section header */}
                <div className="flex items-end justify-between gap-5 flex-wrap mb-8 sm:mb-10">
                    <div className="max-w-[620px]">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="w-[5px] h-[5px] rounded-full bg-gradient-to-br from-[#d4608a] to-[#e878a8] flex-shrink-0" />
                            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#b86090]">
                                {t[lang].subtitle}
                            </span>
                        </div>

                        <h2 className="font-['DM_Serif_Display'] text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.02em] text-[#1e1520]">
                            {t[lang].title}
                        </h2>
                    </div>

                    <Link
                        href={route('blog.index')}
                        className={`group inline-flex items-center gap-2 rounded-full border border-[rgba(200,140,170,0.2)] bg-white px-4 py-2.5 text-[13px] font-medium text-[#7a6070] transition-all duration-200 hover:border-[rgba(192,80,122,0.35)] hover:text-[#c0507a] hover:bg-[rgba(192,80,122,0.03)] ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                        <span>{t[lang].seeAll}</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
                    {/* Featured article */}
                    {featured && (
                        <div className="lg:col-span-7">
                            <Link
                                href={route('blog.show', featured.slug)}
                                className="group block h-full"
                            >
                                <article className="h-full rounded-[22px] border border-[rgba(200,140,170,0.13)] bg-white p-3 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(192,80,122,0.07)] hover:border-[rgba(192,80,122,0.22)]">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[#f5ecf2]">
                                        {featured.image ? (
                                            <img
                                                src={`/storage/${featured.image}`}
                                                alt={featured.title?.[lang]}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg
                                                    className="w-10 h-10 text-[rgba(192,80,122,0.28)]"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}

                                        <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'}`}>
                                            <span className="inline-flex rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-medium text-[#7a6070] border border-[rgba(200,140,170,0.14)]">
                                                {t[lang].featuredLabel}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-1 pt-5 sm:p-2 sm:pt-5">
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <div className="w-[24px] h-[24px] rounded-full bg-gradient-to-br from-[#d4608a] to-[#e088b4] flex items-center justify-center text-white text-[10px] font-semibold uppercase flex-shrink-0">
                                                {featured.user?.name?.charAt(0)}
                                            </div>

                                            <span className="text-[12.5px] font-medium text-[#7a6070]">
                                                {featured.user?.name}
                                            </span>

                                            {featured.category?.title?.[lang] && (
                                                <>
                                                    <span className="text-[rgba(192,80,122,0.3)] text-[12px]">·</span>
                                                    <span className="text-[12px] text-[#b0909a]">
                                                        {featured.category.title[lang]}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        <h3 className="font-['DM_Serif_Display'] text-[24px] sm:text-[28px] leading-[1.22] tracking-[-0.02em] text-[#1e1520] mb-3 transition-colors duration-150 group-hover:text-[#c0507a] line-clamp-2">
                                            {featured.title?.[lang]}
                                        </h3>

                                        <p className="text-[14px] sm:text-[15px] leading-[1.8] text-[#7a6070] line-clamp-2 mb-5 max-w-[62ch] font-light">
                                            {featured.short_description?.[lang]}
                                        </p>

                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#b0909a]">
                                                <span>{formatDate(featured.created_at)}</span>
                                                <span className="text-[rgba(192,80,122,0.3)]">·</span>
                                                <span>{getReadingTime(featured)} {t[lang].read}</span>
                                            </div>

                                            <span className={`inline-flex items-center gap-2 text-[13px] font-medium text-[#c0507a] transition-colors group-hover:text-[#aa4068] ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                {t[lang].readMore}
                                                <svg
                                                    className={`w-4 h-4 transition-transform duration-200 ${isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
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

                    {/* Secondary articles */}
                    <div className="lg:col-span-5">
                        <div className="h-full rounded-[22px] border border-[rgba(200,140,170,0.13)] bg-white p-4 sm:p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-[#c0507a] flex-shrink-0">
                                    {t[lang].moreStories}
                                </span>
                                <div className="h-px flex-1 bg-[rgba(200,140,170,0.18)]" />
                            </div>

                            <div className="space-y-3">
                                {secondary.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={route('blog.show', article.slug)}
                                        className="group flex gap-4 items-start rounded-[18px] border border-transparent bg-[#fcf9fb] p-3 transition-all duration-200 hover:border-[rgba(200,140,170,0.14)] hover:bg-white hover:shadow-[0_6px_20px_rgba(192,80,122,0.05)]"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#d4608a] to-[#e088b4] flex items-center justify-center text-white text-[8px] font-semibold uppercase flex-shrink-0">
                                                    {article.user?.name?.charAt(0)}
                                                </div>

                                                <span className="text-[12px] font-medium text-[#7a6070] truncate">
                                                    {article.user?.name}
                                                </span>
                                            </div>

                                            <h4 className="font-['DM_Serif_Display'] text-[16px] sm:text-[17px] leading-[1.55] text-[#1e1520] mb-2 line-clamp-2 transition-colors duration-150 group-hover:text-[#c0507a]">
                                                {article.title?.[lang]}
                                            </h4>

                                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#b0909a]">
                                                <span>{formatDate(article.created_at)}</span>
                                                <span className="text-[rgba(192,80,122,0.3)]">·</span>
                                                <span>{getReadingTime(article)} {t[lang].read}</span>
                                            </div>
                                        </div>

                                        {article.image ? (
                                            <div className="w-[84px] h-[84px] flex-shrink-0 overflow-hidden rounded-[14px] bg-[#f5ecf2]">
                                                <img
                                                    src={`/storage/${article.image}`}
                                                    alt={article.title?.[lang]}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-[84px] h-[84px] flex-shrink-0 rounded-[14px] bg-[#f5ecf2] flex items-center justify-center">
                                                <svg
                                                    className="w-7 h-7 text-[rgba(192,80,122,0.28)]"
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
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-10 sm:mt-12 pt-6 border-t border-[rgba(200,140,170,0.12)] text-center">
                    <Link
                        href={route('blog.index')}
                        className={`inline-flex items-center gap-2 rounded-full bg-[#c0507a] px-6 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#aa4068] hover:-translate-y-0.5 ${isRtl ? 'flex-row-reverse' : ''}`}
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
        </section>
    );
}
