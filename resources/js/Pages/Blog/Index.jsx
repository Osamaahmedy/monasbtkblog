import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ articles, categories }) {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('monasbtk_lang') || 'en';
        return 'en';
    });

    useEffect(() => { localStorage.setItem('monasbtk_lang', lang); }, [lang]);

    const t = {
        en: {
            title: "Blog",
            subtitle: "Thoughtful articles, practical ideas, and refined inspiration for your most meaningful moments.",
            all: "All", empty: "No stories published yet. Check back soon.",
            home: "Home", read: "min read", prev: "Previous", next: "Next",
            trending: "Trending on Monasbtk", topics: "Discover topics",
            about: "About Monasbtk", aboutText: "A curated editorial space for ideas, celebration guidance, and elegant inspiration that helps you plan with more clarity and better taste.",
            learnMore: "Learn more", explore: "Explore articles", articles: "articles", editorial: "Curated Editorial",
        },
        ar: {
            title: "المدونة",
            subtitle: "مقالات منتقاة بعناية، وأفكار عملية، وإلهام راقٍ يساعدك على صناعة لحظاتك الأجمل بذوق ووضوح.",
            all: "الكل", empty: "لم يتم نشر مقالات بعد. عد قريباً.",
            home: "الرئيسية", read: "دقائق للقراءة", prev: "السابق", next: "التالي",
            trending: "الأكثر رواجاً في مناسبتك", topics: "اكتشف المواضيع",
            about: "عن مدونة مناسبتك", aboutText: "مساحة تحريرية منتقاة للأفكار، ونصائح المناسبات، والإلهام الأنيق الذي يساعدك على التخطيط بصورة أوضح.",
            learnMore: "تعرّف علينا", explore: "استعرض المقالات", articles: "مقال", editorial: "تحرير منتقى",
        }
    };

    const currentCategoryId = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('category') : null;

    const getReadingTime = (article) => {
        const text = (article.content?.[lang] || '').replace(/<[^>]*>/g, '').trim();
        return Math.max(1, Math.ceil((text ? text.split(/\s+/).length : 100) / 200));
    };

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString(
        lang === 'ar' ? 'ar-EG' : 'en-US',
        { month: 'long', day: 'numeric', year: 'numeric' }
    );

    const trendingArticles = articles.data.slice(0, 6);
    const mainArticles = articles.data;
    const isFirstPage = articles.current_page === 1;
    const isAr = lang === 'ar';

    return (
        <div dir={isAr ? 'rtl' : 'ltr'} className="blog-root">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .blog-root {
                    min-height: 100vh;
                    background: #fdf8fb;
                    color: #2a2030;
                    font-family: 'DM Sans', -apple-system, sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                /* ── NAV ── */
                .nav {
                    position: sticky; top: 0; z-index: 100;
                    height: 62px;
                    background: rgba(253,248,251,0.92);
                    backdrop-filter: blur(14px);
                    border-bottom: 1px solid rgba(200,140,170,0.15);
                }
                .nav-inner {
                    max-width: 1180px; margin: 0 auto; padding: 0 28px;
                    height: 100%; display: flex; align-items: center; justify-content: space-between;
                }
                .nav-logo {
                    font-family: 'DM Serif Display', serif;
                    font-size: 21px; font-weight: 400;
                    color: #2a2030; text-decoration: none;
                    letter-spacing: -0.2px;
                    transition: color 0.18s;
                }
                .nav-logo:hover { color: #c0507a; }
                .nav-right { display: flex; align-items: center; gap: 22px; }
                .nav-link {
                    font-size: 13.5px; font-weight: 400; color: #7a6070;
                    text-decoration: none; transition: color 0.15s;
                }
                .nav-link:hover { color: #c0507a; }
                .lang-btn {
                    height: 32px; padding: 0 14px; border-radius: 100px;
                    border: 1px solid rgba(192,80,122,0.2);
                    background: rgba(192,80,122,0.04);
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12px; font-weight: 500; color: #c0507a;
                    cursor: pointer; transition: all 0.15s;
                }
                .lang-btn:hover { background: rgba(192,80,122,0.09); border-color: rgba(192,80,122,0.35); }

                /* ── HERO ── */
                .hero {
                    background: #fff;
                    border-bottom: 1px solid rgba(200,140,170,0.12);
                    padding: 64px 28px 72px;
                }
                .hero-inner { max-width: 1180px; margin: 0 auto; max-width: 680px; }
                .hero-eyebrow {
                    display: inline-flex; align-items: center; gap: 7px;
                    margin-bottom: 22px;
                    font-size: 11px; font-weight: 500; letter-spacing: 0.1em;
                    text-transform: uppercase; color: #b86090;
                }
                .hero-eyebrow-dot {
                    width: 5px; height: 5px; border-radius: 50%;
                    background: linear-gradient(135deg, #d4608a, #e878a8);
                    flex-shrink: 0;
                }
                .hero-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: clamp(40px, 6vw, 62px);
                    font-weight: 400; line-height: 1.1;
                    color: #1e1520; letter-spacing: -0.025em;
                    margin-bottom: 18px;
                }
                .hero-title em { font-style: italic; color: #c0507a; }
                .hero-sub {
                    font-size: 16px; line-height: 1.78;
                    color: #7a6070; font-weight: 300;
                    margin-bottom: 32px; max-width: 520px;
                }
                .hero-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
                .btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    padding: 11px 24px; border-radius: 100px;
                    background: #c0507a;
                    color: #fff; font-size: 13.5px; font-weight: 500;
                    text-decoration: none; letter-spacing: 0.01em;
                    transition: background 0.18s, transform 0.18s;
                    border: none; cursor: pointer;
                }
                .btn-primary:hover { background: #aa4068; transform: translateY(-1px); }
                .hero-count { font-size: 13px; color: #b0909a; font-weight: 400; }

                /* ── TRENDING ── */
                .trending-section {
                    background: #fdf8fb;
                    border-bottom: 1px solid rgba(200,140,170,0.12);
                    padding: 36px 28px;
                }
                .trending-inner { max-width: 1180px; margin: 0 auto; }
                .section-header {
                    display: flex; align-items: center; gap: 14px; margin-bottom: 24px;
                }
                .section-label {
                    font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em;
                    text-transform: uppercase; color: #c0507a; flex-shrink: 0;
                }
                .section-rule { flex: 1; height: 1px; background: rgba(200,140,170,0.18); }
                .trending-grid {
                    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
                }
                .trend-card {
                    display: flex; gap: 14px; align-items: flex-start;
                    padding: 16px 18px; border-radius: 14px;
                    border: 1px solid rgba(200,140,170,0.13);
                    background: #fff;
                    text-decoration: none; color: inherit;
                    transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
                }
                .trend-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 24px rgba(192,80,122,0.08);
                    border-color: rgba(192,80,122,0.22);
                }
                .trend-num {
                    font-family: 'DM Serif Display', serif;
                    font-size: 28px; line-height: 1; font-weight: 400;
                    color: rgba(192,80,122,0.18); flex-shrink: 0; min-width: 36px;
                }
                .trend-body { flex: 1; min-width: 0; }
                .trend-author { display: flex; align-items: center; gap: 6px; margin-bottom: 7px; }
                .avatar {
                    width: 22px; height: 22px; border-radius: 50%;
                    background: linear-gradient(135deg, #d4608a, #e088b4);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 9px; font-weight: 600; color: #fff; flex-shrink: 0;
                }
                .avatar-name { font-size: 12px; font-weight: 500; color: #7a6070; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .trend-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: 14.5px; font-weight: 400; line-height: 1.45;
                    color: #1e1520;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                }
                .trend-meta { font-size: 11px; color: #b0909a; margin-top: 7px; }

                /* ── LAYOUT ── */
                .page-wrap { max-width: 1180px; margin: 0 auto; padding: 0 28px; }

                /* ── CAT BAR ── */
                .cat-bar {
                    position: sticky; top: 62px; z-index: 80;
                    background: rgba(253,248,251,0.96); backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(200,140,170,0.12);
                    margin: 0 -28px; padding: 0 28px;
                }
                .cat-bar-scroll {
                    display: flex; align-items: center; gap: 4px;
                    overflow-x: auto; padding: 10px 0;
                    -ms-overflow-style: none; scrollbar-width: none;
                }
                .cat-bar-scroll::-webkit-scrollbar { display: none; }
                .cat-pill {
                    white-space: nowrap; flex-shrink: 0;
                    padding: 7px 18px; border-radius: 100px;
                    font-size: 13px; font-weight: 500;
                    text-decoration: none; transition: all 0.15s;
                    border: 1px solid transparent;
                }
                .cat-active {
                    background: #c0507a; color: #fff;
                    box-shadow: 0 3px 14px rgba(192,80,122,0.25);
                }
                .cat-inactive { color: #7a6070; border-color: rgba(200,140,170,0.2); }
                .cat-inactive:hover { color: #c0507a; border-color: rgba(192,80,122,0.35); background: rgba(192,80,122,0.04); }

                /* ── CONTENT ── */
                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr 290px;
                    gap: 52px; padding: 40px 0 72px;
                    align-items: start;
                }

                /* ── ARTICLE ROW ── */
                .article-row {
                    display: flex; gap: 22px; align-items: flex-start;
                    padding: 26px 0;
                    border-bottom: 1px solid rgba(200,140,170,0.1);
                    text-decoration: none; color: inherit;
                }
                .article-row:first-child { padding-top: 0; }
                .article-body { flex: 1; min-width: 0; }
                .article-meta {
                    display: flex; align-items: center; gap: 8px;
                    margin-bottom: 10px; flex-wrap: wrap;
                }
                .article-author-row { display: flex; align-items: center; gap: 6px; }
                .article-author-name { font-size: 13px; font-weight: 500; color: #4a3848; }
                .sep { color: rgba(192,80,122,0.3); font-size: 12px; }
                .cat-tag {
                    font-size: 11px; font-weight: 500; letter-spacing: 0.05em;
                    color: #c0507a; background: rgba(192,80,122,0.07);
                    padding: 3px 10px; border-radius: 100px;
                }
                .article-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: clamp(18px, 2.2vw, 22px);
                    font-weight: 400; line-height: 1.32;
                    color: #1e1520; letter-spacing: -0.015em;
                    margin-bottom: 8px;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                    transition: color 0.15s;
                }
                .article-row:hover .article-title { color: #c0507a; }
                .article-excerpt {
                    font-size: 14px; line-height: 1.72; color: #7a6070; font-weight: 300;
                    margin-bottom: 14px;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                }
                .article-footer { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #b0909a; }
                .article-thumb {
                    flex-shrink: 0;
                    width: clamp(92px, 14vw, 164px);
                    aspect-ratio: 4/3;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #f5ecf2;
                }
                .article-thumb img {
                    width: 100%; height: 100%; object-fit: cover;
                    transition: transform 0.4s;
                    display: block;
                }
                .article-row:hover .article-thumb img { transform: scale(1.04); }
                .thumb-empty {
                    width: 100%; height: 100%; display: flex;
                    align-items: center; justify-content: center;
                }

                /* ── SIDEBAR ── */
                .sidebar { position: sticky; top: 122px; }
                .sb-block { margin-bottom: 30px; }
                .sb-label {
                    font-size: 10px; font-weight: 600; letter-spacing: 0.12em;
                    text-transform: uppercase; color: #b0909a;
                    padding-bottom: 12px;
                    border-bottom: 1px solid rgba(200,140,170,0.14);
                    margin-bottom: 14px;
                }
                .sb-topics { display: flex; flex-wrap: wrap; gap: 7px; }
                .sb-topic {
                    padding: 6px 14px; border-radius: 100px;
                    font-size: 13px; font-weight: 500; text-decoration: none;
                    transition: all 0.15s;
                }
                .sb-topic-active { background: #c0507a; color: #fff; }
                .sb-topic-inactive {
                    background: #f5ecf2; color: #6a5060;
                    border: 1px solid rgba(200,140,170,0.18);
                }
                .sb-topic-inactive:hover { border-color: rgba(192,80,122,0.35); color: #c0507a; background: rgba(192,80,122,0.05); }

                .about-card {
                    border-radius: 16px;
                    border: 1px solid rgba(200,140,170,0.16);
                    background: #fff;
                    padding: 20px;
                }
                .about-card-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: 16px; font-weight: 400;
                    color: #1e1520; margin-bottom: 10px;
                }
                .about-card-text {
                    font-size: 13px; line-height: 1.76; color: #7a6070;
                    font-weight: 300; margin-bottom: 14px;
                }
                .about-link {
                    display: inline-flex; align-items: center; gap: 4px;
                    font-size: 13px; font-weight: 500; color: #c0507a;
                    text-decoration: none; transition: color 0.15s;
                }
                .about-link:hover { color: #aa4068; }

                .footer-links { display: flex; flex-wrap: wrap; gap: 10px 16px; }
                .footer-link { font-size: 12px; color: #c0a8b4; text-decoration: none; transition: color 0.15s; }
                .footer-link:hover { color: #c0507a; }

                /* ── PAGINATION ── */
                .pagination { display: flex; align-items: center; justify-content: center; gap: 10px; padding-top: 36px; }
                .page-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 10px 22px; border-radius: 100px;
                    font-size: 13px; font-weight: 500;
                    text-decoration: none; transition: all 0.18s;
                    cursor: pointer;
                }
                .page-btn-on { background: #c0507a; color: #fff; border: none; }
                .page-btn-on:hover { background: #aa4068; transform: translateY(-1px); }
                .page-btn-off { background: #f5ecf2; color: #c0a8b4; border: none; cursor: not-allowed; }
                .page-count { font-size: 12.5px; color: #b0909a; padding: 0 6px; }

                /* ── EMPTY ── */
                .empty { text-align: center; padding: 72px 24px; }
                .empty-circle {
                    width: 56px; height: 56px; border-radius: 50%;
                    background: rgba(192,80,122,0.07);
                    margin: 0 auto 18px;
                    display: flex; align-items: center; justify-content: center;
                }
                .empty-text { font-size: 15px; color: #8a7080; margin-bottom: 20px; font-weight: 400; }

                /* ── RESPONSIVE ── */
                @media (max-width: 1024px) {
                    .content-grid { grid-template-columns: 1fr; }
                    .sidebar { display: none; }
                    .trending-grid { grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 640px) {
                    .hero { padding: 44px 20px 52px; }
                    .nav-inner, .page-wrap { padding-left: 18px; padding-right: 18px; }
                    .trending-section { padding: 28px 18px; }
                    .trending-grid { grid-template-columns: 1fr; }
                    .cat-bar { margin: 0 -18px; padding: 0 18px; }
                    .article-row { gap: 14px; padding: 20px 0; }
                }
            `}</style>

            {/* ── NAV ── */}
            <nav className="nav">
                <div className="nav-inner">
                    <Link href="/" className="nav-logo">Monasbtk</Link>
                    <div className="nav-right">
                        <Link href="/" className="nav-link">{t[lang].home}</Link>
                        <button className="lang-btn" onClick={() => setLang(isAr ? 'en' : 'ar')}>
                            {isAr ? 'En' : 'ع'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero-inner">
                    <div className="hero-eyebrow">
                        <span className="hero-eyebrow-dot" />
                        {t[lang].editorial}
                    </div>
                    <h1 className="hero-title">
                        {isAr ? <>{t[lang].title}<br/><em>مناسبتك</em></> : <>{isAr ? '' : 'The '}<em>Monasbtk</em><br/>Blog</>}
                    </h1>
                    <p className="hero-sub">{t[lang].subtitle}</p>
                    <div className="hero-actions">
                        <Link href={route('blog.index')} className="btn-primary">
                            {t[lang].explore}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform: isAr ? 'rotate(180deg)' : 'none'}}>
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                        {articles?.total ? (
                            <span className="hero-count">{articles.total}+ {t[lang].articles}</span>
                        ) : null}
                    </div>
                </div>
            </section>

            {/* ── TRENDING ── */}
            {trendingArticles.length > 0 && isFirstPage && !currentCategoryId && (
                <section className="trending-section">
                    <div className="trending-inner">
                        <div className="section-header">
                            <span className="section-label">{t[lang].trending}</span>
                            <div className="section-rule"/>
                        </div>
                        <div className="trending-grid">
                            {trendingArticles.map((article, i) => (
                                <Link key={article.id} href={route('blog.show', article.slug)} className="trend-card">
                                    <span className="trend-num">{String(i + 1).padStart(2, '0')}</span>
                                    <div className="trend-body">
                                        <div className="trend-author">
                                            <div className="avatar">{article.user?.name?.charAt(0)?.toUpperCase()}</div>
                                            <span className="avatar-name">{article.user?.name}</span>
                                        </div>
                                        <div className="trend-title">{article.title[lang]}</div>
                                        <div className="trend-meta">
                                            {formatDate(article.created_at)} · {getReadingTime(article)} {t[lang].read}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── MAIN ── */}
            <div className="page-wrap">
                {/* Cat bar */}
                <div className="cat-bar">
                    <div className="cat-bar-scroll">
                        <Link
                            href={route('blog.index')}
                            className={`cat-pill ${!currentCategoryId ? 'cat-active' : 'cat-inactive'}`}
                        >
                            {t[lang].all}
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={route('blog.index', { category: cat.id })}
                                className={`cat-pill ${currentCategoryId == cat.id ? 'cat-active' : 'cat-inactive'}`}
                            >
                                {cat.title[lang]}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="content-grid">
                    {/* Articles */}
                    <main>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentCategoryId || 'all'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.22 }}
                            >
                                {mainArticles.map((article, index) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.038, duration: 0.26 }}
                                    >
                                        <Link href={route('blog.show', article.slug)} className="article-row">
                                            <div className="article-body">
                                                <div className="article-meta">
                                                    <div className="article-author-row">
                                                        <div className="avatar">{article.user?.name?.charAt(0)?.toUpperCase()}</div>
                                                        <span className="article-author-name">{article.user?.name}</span>
                                                    </div>
                                                    {article.category?.title?.[lang] && (
                                                        <>
                                                            <span className="sep">·</span>
                                                            <span className="cat-tag">{article.category.title[lang]}</span>
                                                        </>
                                                    )}
                                                </div>

                                                <h2 className="article-title">{article.title[lang]}</h2>
                                                <p className="article-excerpt">{article.short_description?.[lang]}</p>

                                                <div className="article-footer">
                                                    <span>{formatDate(article.created_at)}</span>
                                                    <span className="sep">·</span>
                                                    <span>{getReadingTime(article)} {t[lang].read}</span>
                                                </div>
                                            </div>

                                            <div className="article-thumb">
                                                {article.image ? (
                                                    <img src={`/storage/${article.image}`} alt={article.title[lang]}/>
                                                ) : (
                                                    <div className="thumb-empty">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(192,80,122,0.28)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {articles.data.length === 0 && (
                            <motion.div className="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="empty-circle">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c0507a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                                    </svg>
                                </div>
                                <p className="empty-text">{t[lang].empty}</p>
                                <Link href={route('blog.index')} className="btn-primary" style={{display:'inline-flex'}}>
                                    {t[lang].all}
                                </Link>
                            </motion.div>
                        )}

                        {articles.last_page > 1 && (
                            <div className="pagination">
                                {articles.prev_page_url ? (
                                    <Link href={articles.prev_page_url} className="page-btn page-btn-on">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform: isAr ? 'rotate(180deg)' : 'none'}}>
                                            <path d="M15 18l-6-6 6-6"/>
                                        </svg>
                                        {t[lang].prev}
                                    </Link>
                                ) : (
                                    <span className="page-btn page-btn-off">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform: isAr ? 'rotate(180deg)' : 'none'}}>
                                            <path d="M15 18l-6-6 6-6"/>
                                        </svg>
                                        {t[lang].prev}
                                    </span>
                                )}
                                <span className="page-count">{articles.current_page} / {articles.last_page}</span>
                                {articles.next_page_url ? (
                                    <Link href={articles.next_page_url} className="page-btn page-btn-on">
                                        {t[lang].next}
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform: isAr ? 'rotate(180deg)' : 'none'}}>
                                            <path d="M9 18l6-6-6-6"/>
                                        </svg>
                                    </Link>
                                ) : (
                                    <span className="page-btn page-btn-off">
                                        {t[lang].next}
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform: isAr ? 'rotate(180deg)' : 'none'}}>
                                            <path d="M9 18l6-6-6-6"/>
                                        </svg>
                                    </span>
                                )}
                            </div>
                        )}
                    </main>

                    {/* Sidebar */}
                    <aside className="sidebar">
                        <div className="sb-block">
                            <div className="sb-label">{t[lang].topics}</div>
                            <div className="sb-topics">
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={route('blog.index', { category: cat.id })}
                                        className={`sb-topic ${currentCategoryId == cat.id ? 'sb-topic-active' : 'sb-topic-inactive'}`}
                                    >
                                        {cat.title[lang]}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="sb-block">
                            <div className="about-card">
                                <div className="about-card-title">{t[lang].about}</div>
                                <p className="about-card-text">{t[lang].aboutText}</p>
                                <Link href="/" className="about-link">
                                    {t[lang].learnMore}
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform: isAr ? 'rotate(180deg)' : 'none'}}>
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        <div className="sb-block">
                            <div className="footer-links">
                                {[
                                    { href: '/', label: isAr ? 'الرئيسية' : 'Home' },
                                    { href: '/about', label: isAr ? 'عن مناسبتك' : 'About' },
                                    { href: '/contact', label: isAr ? 'تواصل معنا' : 'Contact' },
                                    { href: '/privacy-policy', label: isAr ? 'الخصوصية' : 'Privacy' },
                                ].map(({ href, label }) => (
                                    <Link key={href} href={href} className="footer-link">{label}</Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
