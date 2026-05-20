import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Show({ article, relatedArticles }) {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('monasbtk_lang') || 'en';
        }
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('monasbtk_lang', lang);
    }, [lang]);

    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
        author_name: '',
    });

    const submitComment = (e) => {
        e.preventDefault();
        post(route('comments.store', article.id), {
            onSuccess: () => {
                reset();
                alert(lang === 'en' ? 'Comment submitted and awaiting approval!' : 'تم إرسال التعليق وبانتظار الموافقة!');
            },
        });
    };

    // Calculate reading time roughly
    const getTextContent = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').trim();
    };
    const textContent = getTextContent(article.content[lang]);
    const wordCount = textContent ? textContent.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Scroll progress bar
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const t = {
        en: {
            by: "By",
            read: "min read",
            comments: "Responses",
            leaveComment: "Write a response",
            name: "Your name",
            comment: "What are your thoughts?",
            submit: "Respond",
            related: "More from Monasbtk",
            noComments: "There are currently no responses for this story. Be the first to respond.",
            home: "Home",
            blog: "Blog",
            submitting: "Publishing...",
        },
        ar: {
            by: "بقلم",
            read: "دقائق للقراءة",
            comments: "الردود",
            leaveComment: "اكتب رداً",
            name: "اسمك",
            comment: "ما هي أفكارك؟",
            submit: "إرسال",
            related: "المزيد من مناسبتك",
            noComments: "لا توجد ردود حالياً على هذه القصة. كن أول من يرد.",
            home: "الرئيسية",
            blog: "المدونة",
            submitting: "جاري النشر...",
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString(
            lang === 'ar' ? 'ar-EG' : 'en-US',
            { month: 'long', day: 'numeric', year: 'numeric' }
        );
    };

    const formatDateShort = (dateStr) => {
        return new Date(dateStr).toLocaleDateString(
            lang === 'ar' ? 'ar-EG' : 'en-US',
            { month: 'short', day: 'numeric' }
        );
    };

    return (
        <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-white min-h-screen font-mikhak-regular selection:bg-green-100 selection:text-green-900">
            <Head title={article.title[lang]}>
                <meta name="description" content={article.short_description?.[lang] || article.title[lang]} />
                <meta property="og:title" content={article.title[lang]} />
                <meta property="og:description" content={article.short_description?.[lang] || article.title[lang]} />
                <meta property="og:type" content="article" />
                {article.image && <meta property="og:image" content={`/storage/${article.image}`} />}
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": article.title[lang],
                    "description": article.short_description?.[lang] || "",
                    "image": article.image ? `/storage/${article.image}` : undefined,
                    "author": { "@type": "Person", "name": article.user?.name },
                    "datePublished": article.created_at,
                    "dateModified": article.updated_at || article.created_at,
                    "publisher": { "@type": "Organization", "name": "Monasbtk" },
                    "mainEntityOfPage": { "@type": "WebPage", "@id": window.location.href }
                })}</script>
            </Head>

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-green-600 origin-left z-[60]"
                style={{ scaleX }}
            />

            {/* Clean Navigation */}
            <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50">
                <div className="max-w-[1192px] mx-auto px-6">
                    <div className="flex justify-between h-[57px] items-center">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="text-[26px] font-mikhak-bold text-gray-900 tracking-tight hover:text-gray-700 transition-colors">
                                Monasbtk
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={route('blog.index')} className="text-sm font-mikhak-medium text-gray-600 hover:text-gray-900 transition-colors">
                                {t[lang].blog}
                            </Link>
                            <Link href="/" className="text-sm font-mikhak-medium text-gray-600 hover:text-gray-900 transition-colors">
                                {t[lang].home}
                            </Link>
                            <button
                                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                                className="px-3 py-1.5 text-sm font-mikhak-bold text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 rounded-full hover:border-gray-400"
                            >
                                {lang === 'en' ? 'عربي' : 'EN'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <article className="pb-12">
                {/* Article Header */}
                <header className="max-w-[680px] mx-auto px-6 pt-10 md:pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-[32px] md:text-[42px] font-mikhak-bold text-gray-900 leading-[1.2] tracking-tight mb-6">
                            {article.title[lang]}
                        </h1>

                        {article.short_description?.[lang] && (
                            <p className="text-[20px] md:text-[22px] text-gray-500 font-mikhak-regular leading-[1.5] mb-8">
                                {article.short_description[lang]}
                            </p>
                        )}

                        {/* Author Row */}
                        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-mikhak-bold text-base uppercase flex-shrink-0">
                                {article.user?.name?.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-[15px] font-mikhak-bold text-gray-900">{article.user?.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[13px] text-gray-500 font-mikhak-regular">
                                    <span>{readingTime} {t[lang].read}</span>
                                    <span>·</span>
                                    <span>{formatDate(article.created_at)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between py-3 border-y border-gray-100 mb-10">
                            <div className="flex items-center gap-6">
                                {/* Comments count */}
                                <a href="#responses" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors group">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    <span className="text-[13px] font-mikhak-medium">{article.comments.length}</span>
                                </a>
                            </div>
                            {/* Category */}
                            <span className="px-3 py-1 rounded-full bg-gray-100 text-[12px] font-mikhak-bold text-gray-600">
                                {article.category?.title[lang]}
                            </span>
                        </div>
                    </motion.div>
                </header>

                {/* Hero Image */}
                {article.image && (
                    <motion.figure
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-[680px] mx-auto px-6 mb-10"
                    >
                        <div className="w-full overflow-hidden rounded-sm">
                            <img
                                src={`/storage/${article.image}`}
                                alt={article.title[lang]}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </motion.figure>
                )}

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`
                        prose prose-lg max-w-[680px] mx-auto px-6 mb-16
                        font-mikhak-regular text-gray-800 leading-[1.9] text-[18px] md:text-[20px]
                        prose-headings:font-mikhak-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                        prose-h2:text-[26px] md:prose-h2:text-[30px] prose-h2:mt-14 prose-h2:mb-4 prose-h2:leading-[1.3]
                        prose-h3:text-[22px] md:prose-h3:text-[24px] prose-h3:mt-10 prose-h3:mb-3
                        prose-p:mb-6 prose-p:text-gray-700
                        prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline prose-a:font-mikhak-medium
                        prose-strong:text-gray-900 prose-strong:font-mikhak-bold
                        prose-blockquote:border-l-[3px] prose-blockquote:border-gray-900 prose-blockquote:pl-6 prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-blockquote:text-[20px] md:prose-blockquote:text-[24px] prose-blockquote:leading-[1.5] prose-blockquote:font-mikhak-medium prose-blockquote:my-10
                        prose-img:rounded-none prose-img:shadow-none prose-img:my-10
                        prose-li:my-1 prose-li:text-gray-700
                        prose-code:text-[15px] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
                        prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg
                        ${lang === 'ar' ? 'text-right prose-blockquote:border-l-0 prose-blockquote:border-r-[3px] prose-blockquote:border-r-gray-900 prose-blockquote:pr-6 prose-blockquote:pl-0' : ''}
                    `}
                    dangerouslySetInnerHTML={{ __html: article.content[lang] }}
                />

                {/* Tags / Category Footer */}
                <div className="max-w-[680px] mx-auto px-6 mb-12">
                    <div className="flex flex-wrap gap-2">
                        <span className="px-4 py-2 bg-gray-100 rounded-full text-[13px] font-mikhak-medium text-gray-700 hover:bg-gray-200 transition-colors cursor-default">
                            {article.category?.title[lang]}
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className="max-w-[680px] mx-auto px-6">
                    <hr className="border-gray-200 mb-12" />
                </div>

                {/* Author Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-[680px] mx-auto px-6 mb-16"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-mikhak-bold text-2xl uppercase flex-shrink-0">
                            {article.user?.name?.charAt(0)}
                        </div>
                        <div className="flex-1" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                            <p className="text-[11px] font-mikhak-medium text-gray-500 uppercase tracking-widest mb-1">
                                {lang === 'en' ? 'Written by' : 'بقلم'}
                            </p>
                            <h4 className="font-mikhak-bold text-[20px] text-gray-900 mb-2">{article.user?.name}</h4>
                            <p className="text-gray-500 font-mikhak-regular leading-relaxed text-[14px]">
                                {lang === 'en'
                                    ? 'Content creator at Monasbtk, sharing insights, perspectives, and inspiring ideas for your special occasions.'
                                    : 'كاتب محتوى في مناسبتك، يشارك أفكاراً وتجارب ملهمة لإثراء مناسباتك الخاصة.'}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Related Articles */}
                {relatedArticles && relatedArticles.length > 0 && (
                    <section className="border-t border-gray-200 bg-gray-50 py-16">
                        <div className="max-w-[1192px] mx-auto px-6">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white font-mikhak-bold text-xs">M</div>
                                <h3 className="text-[16px] font-mikhak-bold text-gray-900">
                                    {t[lang].related}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedArticles.map(rel => (
                                    <Link
                                        key={rel.id}
                                        href={route('blog.show', rel.slug)}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                                            {rel.image && (
                                                <div className="aspect-[16/10] overflow-hidden">
                                                    <img
                                                        src={`/storage/${rel.image}`}
                                                        alt={rel.title[lang]}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-5">
                                                <h4 className="font-mikhak-bold text-[16px] text-gray-900 group-hover:text-green-700 transition-colors leading-snug line-clamp-2 mb-3">
                                                    {rel.title[lang]}
                                                </h4>
                                                <div className="flex items-center gap-2 text-[12px] text-gray-500 font-mikhak-regular">
                                                    <span>{formatDateShort(rel.created_at)}</span>
                                                    <span>·</span>
                                                    <span>{Math.max(1, Math.ceil((getTextContent(rel.content?.[lang])?.split(' ').length || 100) / 200))} {t[lang].read}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Responses Section */}
                <section id="responses" className="border-t border-gray-200 bg-white py-16">
                    <div className="max-w-[680px] mx-auto px-6">
                        <div className="flex items-center gap-3 mb-10">
                            <h3 className="text-[20px] font-mikhak-bold text-gray-900">
                                {t[lang].comments}
                                <span className="text-gray-400 font-mikhak-regular ml-2">({article.comments.length})</span>
                            </h3>
                        </div>

                        {/* Comment Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <form onSubmit={submitComment} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-mikhak-bold text-sm uppercase flex-shrink-0">
                                        {data.author_name ? data.author_name.charAt(0) : '?'}
                                    </div>
                                    <input
                                        type="text"
                                        className="flex-1 bg-transparent border-0 text-[15px] font-mikhak-bold text-gray-900 placeholder-gray-400 focus:ring-0 p-0"
                                        placeholder={t[lang].name}
                                        value={data.author_name}
                                        onChange={(e) => setData('author_name', e.target.value)}
                                        required
                                    />
                                </div>
                                <textarea
                                    className="w-full bg-transparent border-0 text-[15px] font-mikhak-regular text-gray-700 placeholder-gray-400 focus:ring-0 p-0 resize-none min-h-[80px]"
                                    placeholder={t[lang].comment}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    required
                                    rows="3"
                                />
                                <div className="flex justify-end pt-3 border-t border-gray-100 mt-3">
                                    <button
                                        type="submit"
                                        disabled={processing || !data.content.trim() || !data.author_name.trim()}
                                        className="px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full font-mikhak-bold text-[13px] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        {processing ? t[lang].submitting : t[lang].submit}
                                    </button>
                                </div>
                                {errors.content && <p className="text-red-500 text-xs mt-2">{errors.content}</p>}
                                {errors.author_name && <p className="text-red-500 text-xs mt-2">{errors.author_name}</p>}
                            </form>
                        </motion.div>

                        {/* Comments List */}
                        <div className="space-y-0 divide-y divide-gray-100">
                            {article.comments.map((comment, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    key={comment.id}
                                    className="py-6"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-mikhak-bold text-sm uppercase flex-shrink-0">
                                            {comment.author_name?.charAt(0) || 'G'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h5 className="font-mikhak-bold text-[14px] text-gray-900">{comment.author_name}</h5>
                                                <span className="text-[12px] text-gray-400 font-mikhak-regular">
                                                    {formatDateShort(comment.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 leading-[1.7] font-mikhak-regular text-[14px]">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {article.comments.length === 0 && (
                                <div className="py-12 text-center">
                                    <p className="text-gray-400 font-mikhak-regular text-[14px]">{t[lang].noComments}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </article>
        </div>
    );
}
