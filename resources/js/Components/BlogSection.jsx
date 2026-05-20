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
        },
        ar: {
            subtitle: "من المدونة",
            title: "آخر القصص",
            readMore: "اقرأ المزيد",
            read: "دقائق للقراءة",
            seeAll: "جميع القصص",
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
            className="py-20 md:py-28 bg-white font-mikhak-regular border-t border-gray-100"
        >
            <div className="max-w-[1192px] mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <p className="text-[12px] sm:text-[13px] font-mikhak-bold text-green-700 uppercase tracking-[0.22em] mb-2">
                            {t[lang].subtitle}
                        </p>
                        <h2 className="text-[30px] sm:text-[36px] md:text-[42px] font-mikhak-bold text-gray-900 leading-tight tracking-tight">
                            {t[lang].title}
                        </h2>
                    </div>

                    <Link
                        href={route('blog.index')}
                        className={`inline-flex items-center gap-2 text-[14px] font-mikhak-medium text-gray-600 hover:text-gray-900 transition-colors group ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                        <span>{t[lang].seeAll}</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Featured */}
                    {featured && (
                        <div className="lg:col-span-7">
                            <Link href={route('blog.show', featured.slug)} className="group block">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100 mb-5 shadow-sm border border-gray-100">
                                    {featured.image ? (
                                        <img
                                            src={`/storage/${featured.image}`}
                                            alt={featured.title[lang]}
                                            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent pointer-events-none" />
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-700 font-mikhak-bold text-[9px] uppercase flex-shrink-0">
                                        {featured.user?.name?.charAt(0)}
                                    </div>
                                    <span className="text-[13px] font-mikhak-medium text-gray-700">{featured.user?.name}</span>
                                </div>

                                <h3 className="text-[22px] md:text-[26px] font-mikhak-bold text-gray-900 leading-[1.25] mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                                    {featured.title[lang]}
                                </h3>

                                <p className="text-gray-500 font-mikhak-regular text-[15px] leading-relaxed line-clamp-2 mb-4">
                                    {featured.short_description?.[lang]}
                                </p>

                                <div className="flex flex-wrap items-center gap-2 text-[12px] text-gray-500 font-mikhak-regular">
                                    <span>{formatDate(featured.created_at)}</span>
                                    <span>·</span>
                                    <span>{getReadingTime(featured)} {t[lang].read}</span>
                                    {featured.category?.title?.[lang] && (
                                        <>
                                            <span>·</span>
                                            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[11px] font-mikhak-medium text-gray-600">
                                                {featured.category.title[lang]}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Secondary */}
                    <div className="lg:col-span-5 lg:border-l border-gray-100 lg:pl-10">
                        <div className="divide-y divide-gray-100">
                            {secondary.map((article) => (
                                <Link
                                    key={article.id}
                                    href={route('blog.show', article.slug)}
                                    className="group flex gap-4 py-5 first:pt-0 items-start"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-700 font-mikhak-bold text-[8px] uppercase flex-shrink-0">
                                                {article.user?.name?.charAt(0)}
                                            </div>
                                            <span className="text-[12px] font-mikhak-medium text-gray-700 truncate">
                                                {article.user?.name}
                                            </span>
                                        </div>

                                        <h4 className="text-[16px] font-mikhak-bold text-gray-900 leading-snug mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                                            {article.title[lang]}
                                        </h4>

                                        <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mikhak-regular">
                                            <span>{formatDate(article.created_at)}</span>
                                            <span>·</span>
                                            <span>{getReadingTime(article)} {t[lang].read}</span>
                                        </div>
                                    </div>

                                    {article.image ? (
                                        <div className="w-[78px] h-[78px] flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 border border-gray-100">
                                            <img
                                                src={`/storage/${article.image}`}
                                                alt={article.title[lang]}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-[78px] h-[78px] flex-shrink-0 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center">
                                            <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-14 pt-8 border-t border-gray-100 text-center">
                    <Link
                        href={route('blog.index')}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-gray-900 text-gray-900 rounded-full text-[14px] font-mikhak-bold hover:bg-gray-900 hover:text-white transition-all duration-300"
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