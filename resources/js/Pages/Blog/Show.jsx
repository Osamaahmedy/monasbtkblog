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
                alert(
                    lang === 'en'
                        ? 'Comment submitted and awaiting approval!'
                        : 'تم إرسال التعليق وبانتظار الموافقة!'
                );
            },
        });
    };

    const getTextContent = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').trim();
    };

    const textContent = getTextContent(article.content?.[lang]);
    const wordCount = textContent ? textContent.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const getArticleReadingTime = (html) => {
        const text = getTextContent(html);
        return Math.max(1, Math.ceil((text ? text.split(/\s+/).length : 100) / 200));
    };

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
            writtenBy: "Written by",
            backToBlog: "Back to blog",
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
            writtenBy: "بقلم",
            backToBlog: "العودة للمدونة",
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

    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="min-h-screen bg-[#f7f6f2] text-slate-800 font-mikhak-regular selection:bg-primary/15 selection:text-slate-900"
        >
            <Head title={article.title?.[lang]}>
                <meta name="description" content={article.short_description?.[lang] || article.title?.[lang]} />
                <meta property="og:title" content={article.title?.[lang]} />
                <meta property="og:description" content={article.short_description?.[lang] || article.title?.[lang]} />
                <meta property="og:type" content="article" />
                {article.image && <meta property="og:image" content={`/storage/${article.image}`} />}
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": article.title?.[lang],
                    "description": article.short_description?.[lang] || "",
                    "image": article.image ? `/storage/${article.image}` : undefined,
                    "author": { "@type": "Person", "name": article.user?.name },
                    "datePublished": article.created_at,
                    "dateModified": article.updated_at || article.created_at,
                    "publisher": { "@type": "Organization", "name": "Monasbtk" },
                    "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl }
                })}</script>
            </Head>

            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.5),transparent_25%)]" />
                <div className="absolute top-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
                <div className="absolute bottom-24 right-10 h-[240px] w-[240px] rounded-full bg-secondary/8 blur-3xl" />
            </div>

            <motion.div
                className="fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-primary via-shining to-secondary"
                style={{ scaleX }}
            />

            <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f6f2]/80 backdrop-blur-xl">
                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-[62px] items-center justify-between">
                        <div className="flex items-center gap-5">
                            <Link
                                href="/"
                                className="text-[22px] sm:text-[24px] font-mikhak-bold tracking-tight text-slate-900 transition-colors hover:text-primary"
                            >
                                Monasbtk
                            </Link>

                            <div className="hidden sm:flex items-center gap-2 text-[13px] text-slate-400">
                                <Link href="/" className="hover:text-slate-700 transition-colors">
                                    {t[lang].home}
                                </Link>
                                <span>/</span>
                                <Link href={route('blog.index')} className="hover:text-slate-700 transition-colors">
                                    {t[lang].blog}
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href={route('blog.index')}
                                className="hidden sm:inline-flex text-[13px] font-mikhak-medium text-slate-600 transition-colors hover:text-slate-900"
                            >
                                {t[lang].backToBlog}
                            </Link>

                            <button
                                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                                className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white/80 px-3 text-[12px] font-mikhak-bold text-slate-700 transition-all hover:border-primary/20 hover:bg-white hover:text-slate-900"
                            >
                                {lang === 'en' ? 'عربي' : 'EN'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <article className="pb-16">
                <header className="pt-8 sm:pt-10 lg:pt-12">
                    <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                            className="rounded-[30px] border border-white/60 bg-white/72 px-5 sm:px-8 lg:px-10 py-8 sm:py-10 shadow-[0_16px_50px_rgba(15,23,42,0.05)] backdrop-blur-sm"
                        >
                            <div className="max-w-[760px] mx-auto">
                                <div className="flex flex-wrap items-center gap-3 mb-5">
                                    {article.category?.title?.[lang] && (
                                        <span className="inline-flex rounded-full bg-gradient-to-r from-primary via-shining to-secondary px-3 py-1.5 text-[11px] font-mikhak-bold text-white shadow-sm">
                                            {article.category.title[lang]}
                                        </span>
                                    )}

                                    <span className="text-[12px] text-slate-400">
                                        {formatDate(article.created_at)}
                                    </span>
                                </div>

                                <h1 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.18] font-mikhak-bold tracking-tight text-slate-900">
                                    {article.title?.[lang]}
                                </h1>

                                {article.short_description?.[lang] && (
                                    <p className="mt-4 text-[15px] sm:text-[17px] leading-8 text-slate-500 max-w-3xl">
                                        {article.short_description[lang]}
                                    </p>
                                )}

                                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-black/5 pt-5">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary via-shining to-secondary text-base font-mikhak-bold uppercase text-white shadow-sm">
                                            {article.user?.name?.charAt(0)}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[11px] font-mikhak-medium uppercase tracking-[0.18em] text-slate-400">
                                                {t[lang].writtenBy}
                                            </p>
                                            <p className="truncate text-[15px] font-mikhak-bold text-slate-900">
                                                {article.user?.name}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[12px] sm:text-[13px] text-slate-500">
                                        <span>{readingTime} {t[lang].read}</span>
                                        <span className="text-slate-300">•</span>
                                        <a
                                            href="#responses"
                                            className="transition-colors hover:text-primary"
                                        >
                                            {article.comments?.length || 0} {t[lang].comments}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </header>

                {article.image && (
                    <motion.figure
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.12 }}
                        className="mt-6"
                    >
                        <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="overflow-hidden rounded-[30px] border border-white/60 bg-white/60 p-2 shadow-[0_16px_45px_rgba(15,23,42,0.05)]">
                                <div className="overflow-hidden rounded-[24px]">
                                    <img
                                        src={`/storage/${article.image}`}
                                        alt={article.title?.[lang]}
                                        className="w-full h-auto max-h-[560px] object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.figure>
                )}

                <section className="mt-10">
                    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10 lg:gap-12 items-start">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.45, delay: 0.2 }}
                                className="min-w-0"
                            >
                                <div className="max-w-[760px] rounded-[30px] border border-white/60 bg-white/78 px-5 sm:px-8 lg:px-10 py-8 sm:py-10 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
                                    <div
                                        className={`
                                            prose max-w-none
                                            text-[16px] sm:text-[17px] md:text-[18px] leading-[1.95] text-slate-700
                                            prose-p:text-slate-700 prose-p:leading-[1.95] prose-p:mb-6
                                            prose-headings:font-mikhak-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                                            prose-h2:text-[24px] md:prose-h2:text-[28px] prose-h2:mt-14 prose-h2:mb-4 prose-h2:leading-[1.35]
                                            prose-h3:text-[20px] md:prose-h3:text-[22px] prose-h3:mt-10 prose-h3:mb-3
                                            prose-a:text-primary prose-a:no-underline hover:prose-a:text-secondary
                                            prose-strong:text-slate-900 prose-strong:font-mikhak-bold
                                            prose-ul:my-6 prose-ol:my-6
                                            prose-li:my-1 prose-li:text-slate-700
                                            prose-img:rounded-[22px] prose-img:my-10
                                            prose-blockquote:my-10 prose-blockquote:rounded-[20px] prose-blockquote:border-0 prose-blockquote:bg-[#f6f3ec] prose-blockquote:px-6 prose-blockquote:py-5 prose-blockquote:text-[18px] prose-blockquote:leading-[1.8] prose-blockquote:text-slate-700 prose-blockquote:font-mikhak-medium
                                            prose-code:text-[14px] prose-code:bg-[#f3f1eb] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:hidden prose-code:after:hidden
                                            prose-pre:border prose-pre:border-black/5 prose-pre:bg-[#faf8f3] prose-pre:rounded-[18px]
                                            ${lang === 'ar' ? 'text-right' : 'text-left'}
                                        `}
                                        dangerouslySetInnerHTML={{ __html: article.content?.[lang] }}
                                    />
                                </div>

                                <div className="mt-6 max-w-[760px] rounded-[26px] border border-white/60 bg-white/76 px-5 sm:px-6 py-5 shadow-[0_12px_35px_rgba(15,23,42,0.04)]">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {article.category?.title?.[lang] && (
                                            <span className="rounded-full bg-[#f3f1eb] px-4 py-2 text-[13px] font-mikhak-medium text-slate-700">
                                                {article.category.title[lang]}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45 }}
                                    className="mt-6 max-w-[760px] rounded-[30px] border border-white/60 bg-white/78 px-5 sm:px-6 py-6 shadow-[0_14px_40px_rgba(15,23,42,0.04)]"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gradient-to-br from-primary via-shining to-secondary text-xl font-mikhak-bold uppercase text-white shadow-sm flex-shrink-0">
                                            {article.user?.name?.charAt(0)}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-[11px] font-mikhak-medium uppercase tracking-[0.18em] text-slate-400">
                                                {t[lang].writtenBy}
                                            </p>
                                            <h4 className="mt-1 text-[20px] font-mikhak-bold text-slate-900">
                                                {article.user?.name}
                                            </h4>
                                            <p className="mt-2 text-[14px] leading-7 text-slate-500">
                                                {lang === 'en'
                                                    ? 'Content creator at Monasbtk, sharing practical ideas, elegant inspiration, and thoughtful perspectives for your special occasions.'
                                                    : 'كاتب محتوى في مناسبتك، يشارك أفكاراً عملية، وإلهاماً أنيقاً، ورؤى ملهمة تساعدك على صناعة مناسبات أجمل.'}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <aside className="hidden lg:block">
                                <div className="sticky top-[94px] space-y-5">
                                    <div className="rounded-[26px] border border-white/60 bg-white/76 p-5 shadow-[0_12px_34px_rgba(15,23,42,0.04)]">
                                        <h4 className="text-[14px] font-mikhak-bold text-slate-900">
                                            {lang === 'en' ? 'Article details' : 'تفاصيل المقال'}
                                        </h4>

                                        <div className="mt-4 space-y-4 text-[13px]">
                                            <div>
                                                <p className="text-slate-400 mb-1">{lang === 'en' ? 'Published' : 'نُشر في'}</p>
                                                <p className="font-mikhak-medium text-slate-700">{formatDate(article.created_at)}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 mb-1">{lang === 'en' ? 'Reading time' : 'وقت القراءة'}</p>
                                                <p className="font-mikhak-medium text-slate-700">{readingTime} {t[lang].read}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 mb-1">{lang === 'en' ? 'Category' : 'التصنيف'}</p>
                                                <p className="font-mikhak-medium text-slate-700">{article.category?.title?.[lang]}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[26px] border border-white/60 bg-white/76 p-5 shadow-[0_12px_34px_rgba(15,23,42,0.04)]">
                                        <h4 className="text-[14px] font-mikhak-bold text-slate-900">
                                            {lang === 'en' ? 'Quick actions' : 'اختصارات'}
                                        </h4>

                                        <div className="mt-4 flex flex-col gap-2">
                                            <a
                                                href="#responses"
                                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-shining to-secondary px-4 py-2.5 text-[13px] font-mikhak-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                                            >
                                                {t[lang].leaveComment}
                                            </a>

                                            <Link
                                                href={route('blog.index')}
                                                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2.5 text-[13px] font-mikhak-medium text-slate-700 transition-colors hover:text-slate-900"
                                            >
                                                {t[lang].backToBlog}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                {relatedArticles && relatedArticles.length > 0 && (
                    <section className="mt-14 border-t border-black/5 py-16">
                        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="mb-8 flex items-center gap-4">
                                <h3 className="text-[18px] sm:text-[20px] font-mikhak-bold text-slate-900">
                                    {t[lang].related}
                                </h3>
                                <div className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                                {relatedArticles.map((rel) => (
                                    <Link
                                        key={rel.id}
                                        href={route('blog.show', rel.slug)}
                                        className="group rounded-[26px] border border-white/60 bg-white/78 p-3 shadow-[0_12px_34px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_36px_rgba(15,23,42,0.055)]"
                                    >
                                        <div className="overflow-hidden rounded-[20px] bg-[#f1efe8]">
                                            {rel.image ? (
                                                <div className="relative aspect-[16/10] overflow-hidden">
                                                    <img
                                                        src={`/storage/${rel.image}`}
                                                        alt={rel.title?.[lang]}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
                                                </div>
                                            ) : (
                                                <div className="aspect-[16/10] w-full bg-[#f1efe8]" />
                                            )}
                                        </div>

                                        <div className="p-3 pt-4">
                                            <h4 className="line-clamp-2 text-[16px] leading-7 font-mikhak-bold text-slate-900 transition-colors group-hover:text-primary">
                                                {rel.title?.[lang]}
                                            </h4>

                                            <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-400">
                                                <span>{formatDateShort(rel.created_at)}</span>
                                                <span>•</span>
                                                <span>{getArticleReadingTime(rel.content?.[lang])} {t[lang].read}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section id="responses" className="border-t border-black/5 py-16">
                    <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <h3 className="text-[20px] sm:text-[22px] font-mikhak-bold text-slate-900">
                                {t[lang].comments}
                                <span className="ml-2 text-slate-400 font-mikhak-regular">
                                    ({article.comments?.length || 0})
                                </span>
                            </h3>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-6 rounded-[28px] border border-white/60 bg-white/80 p-5 sm:p-6 shadow-[0_14px_40px_rgba(15,23,42,0.04)]"
                        >
                            <form onSubmit={submitComment}>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ece8dd] text-sm font-mikhak-bold uppercase text-slate-500">
                                        {data.author_name ? data.author_name.charAt(0) : '?'}
                                    </div>

                                    <input
                                        type="text"
                                        className="flex-1 border-0 bg-transparent p-0 text-[15px] font-mikhak-bold text-slate-900 placeholder:text-slate-400 focus:ring-0"
                                        placeholder={t[lang].name}
                                        value={data.author_name}
                                        onChange={(e) => setData('author_name', e.target.value)}
                                        required
                                    />
                                </div>

                                <textarea
                                    className="w-full resize-none rounded-[20px] border border-black/5 bg-[#fcfbf8] px-4 py-3 text-[15px] leading-7 text-slate-700 placeholder:text-slate-400 focus:border-primary/20 focus:ring-0"
                                    placeholder={t[lang].comment}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    required
                                    rows="4"
                                />

                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <p className="text-[12px] text-slate-400">
                                        {lang === 'en'
                                            ? 'Be respectful. Your response will appear after approval.'
                                            : 'يرجى كتابة رد محترم. سيظهر تعليقك بعد المراجعة.'}
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={processing || !data.content.trim() || !data.author_name.trim()}
                                        className="inline-flex rounded-full bg-gradient-to-r from-primary via-shining to-secondary px-5 py-2.5 text-[13px] font-mikhak-bold text-white shadow-sm transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        {processing ? t[lang].submitting : t[lang].submit}
                                    </button>
                                </div>

                                {errors.content && <p className="mt-2 text-xs text-red-500">{errors.content}</p>}
                                {errors.author_name && <p className="mt-2 text-xs text-red-500">{errors.author_name}</p>}
                            </form>
                        </motion.div>

                        <div className="space-y-4">
                            {article.comments?.map((comment, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.04 }}
                                    key={comment.id}
                                    className="rounded-[24px] border border-white/60 bg-white/78 px-5 py-5 shadow-[0_10px_28px_rgba(15,23,42,0.035)]"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ece8dd] text-sm font-mikhak-bold uppercase text-slate-600 flex-shrink-0">
                                            {comment.author_name?.charAt(0) || 'G'}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <h5 className="text-[14px] font-mikhak-bold text-slate-900">
                                                    {comment.author_name}
                                                </h5>
                                                <span className="text-[12px] text-slate-400">
                                                    {formatDateShort(comment.created_at)}
                                                </span>
                                            </div>

                                            <p className="text-[14px] leading-7 text-slate-600">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {(!article.comments || article.comments.length === 0) && (
                                <div className="rounded-[24px] border border-white/60 bg-white/78 px-6 py-12 text-center shadow-[0_10px_28px_rgba(15,23,42,0.035)]">
                                    <p className="text-[14px] text-slate-400">
                                        {t[lang].noComments}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </article>
        </div>
    );
}
