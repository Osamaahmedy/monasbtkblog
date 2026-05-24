import { Head, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import monasbtkIcon from '../../../images/monasbtk_colored_logo.png';

// ── helpers ────────────────────────────────────────────────────────────────────
const readTime = (article, lang) => {
    // content is not sent on the index page (too heavy); estimate from short_description
    const t = (article.short_description?.[lang] || '').replace(/<[^>]*>/g, '').trim();
    const words = t ? t.split(/\s+/).length : 0;
    // short_description is ~10% of article length on average, so multiply by 10
    return Math.max(1, Math.ceil((words * 10) / 200));
};

const fmtDate = (d, lang) =>
    new Date(d).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const initials = (name = '') => name.charAt(0).toUpperCase();

// ── translations ───────────────────────────────────────────────────────────────
const T = {
    en: { home:'Home', blog:'Blog', all:'All', read:'min read', prev:'Previous', next:'Next',
          empty:'No articles found.', search:'Search articles…', searchBtn:'Search',
          featured:'Featured', latest:'Latest Articles', topics:'Topics', about:'About',
          aboutText:'A curated editorial space for ideas, celebration guidance, and elegant inspiration.',
          learnMore:'Learn more', articles:'articles', clearSearch:'Clear search' },
    ar: { home:'الرئيسية', blog:'المدونة', all:'الكل', read:'د. قراءة', prev:'السابق', next:'التالي',
          empty:'لا توجد مقالات.', search:'ابحث في المقالات…', searchBtn:'بحث',
          featured:'مميز', latest:'أحدث المقالات', topics:'المواضيع', about:'عن مناسبتك',
          aboutText:'مساحة تحريرية منتقاة للأفكار ونصائح المناسبات والإلهام الأنيق.',
          learnMore:'تعرّف علينا', articles:'مقال', clearSearch:'مسح البحث' },
};

// ── Avatar ─────────────────────────────────────────────────────────────────────
function Avatar({ name, size = 24 }) {
    return (
        <span style={{ width: size, height: size, fontSize: size * 0.38, flexShrink: 0 }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#FF157D] to-[#794BC7] text-white font-bold select-none">
            {initials(name)}
        </span>
    );
}

// ── Category badge ─────────────────────────────────────────────────────────────
function CatBadge({ label, isAr }) {
    return (
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-purple-50 text-[#794BC7] border border-purple-100/50 ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
            {label}
        </span>
    );
}

// ── Featured hero card ─────────────────────────────────────────────────────────
function FeaturedCard({ article, lang, t, isAr }) {
    return (
        <Link href={route('blog.show', article.slug)}
            className="group block relative overflow-hidden rounded-[2rem] mb-10 shadow-sm hover:shadow-[0_20px_45px_rgba(121,75,199,0.06)] border border-purple-100/30 transition-all duration-500 cursor-pointer select-none">
            {/* Image */}
            <div className="aspect-[16/7] bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 overflow-hidden relative">
                {article.image
                    ? <img src={`/storage/${article.image}`} alt={article.title[lang]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
                    : <div className="w-full h-full bg-gradient-to-br from-purple-200 via-pink-100 to-purple-50" />
                }
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            </div>
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md border border-white/25 ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                        ✦ {t.featured}
                    </span>
                    {article.category?.title?.[lang] && (
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-[#794BC7]/90 backdrop-blur-md border border-[#794BC7]/20 ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                            {article.category.title[lang]}
                        </span>
                    )}
                </div>
                
                <h2 className={`text-xl sm:text-2.5xl md:text-3.5xl font-extrabold leading-snug mb-3 drop-shadow-sm group-hover:text-purple-200 transition-colors ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                    {article.title[lang]}
                </h2>
                
                {article.short_description?.[lang] && (
                    <p className={`text-white/85 text-xs sm:text-sm line-clamp-2 mb-5 max-w-3xl ${isAr ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                        {article.short_description[lang]}
                    </p>
                )}
                
                <div className={`flex items-center gap-3 text-white/70 text-xs ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>
                    <Avatar name={article.user?.name} size={22} />
                    <span className="font-semibold">{article.user?.name}</span>
                    <span className="opacity-40">·</span>
                    <span>{fmtDate(article.created_at, lang)}</span>
                    <span className="opacity-40">·</span>
                    <span>{readTime(article, lang)} {t.read}</span>
                </div>
            </div>
        </Link>
    );
}

// ── Article card ───────────────────────────────────────────────────────────────
function ArticleCard({ article, lang, t, index, isAr }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
        >
            <Link href={route('blog.show', article.slug)}
                className="group flex gap-4 sm:gap-6 py-6 border-b border-purple-100/50 hover:border-purple-200/50 transition-colors cursor-pointer select-none">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-24 h-20 sm:w-32 sm:h-24 rounded-2xl overflow-hidden bg-purple-50 border border-purple-100/30">
                    {article.image
                        ? <img src={`/storage/${article.image}`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <div className="w-full h-full flex items-center justify-center opacity-30">
                            <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
                                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5"/>
                                <path d="M21 15l-5-5L5 21" strokeWidth="1.5"/>
                            </svg>
                          </div>
                    }
                </div>
                {/* Body */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Avatar name={article.user?.name} size={20} />
                        <span className={`text-xs font-semibold text-slate-500 ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>{article.user?.name}</span>
                        {article.category?.title?.[lang] && (
                            <>
                                <span className="text-purple-200 text-xs">·</span>
                                <CatBadge label={article.category.title[lang]} isAr={isAr} />
                            </>
                        )}
                    </div>
                    
                    <h3 className={`text-base sm:text-lg font-bold leading-snug text-slate-800 group-hover:text-[#794BC7] transition-colors mb-2 line-clamp-2 ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                        {article.title[lang]}
                    </h3>
                    
                    {article.short_description?.[lang] && (
                        <p className={`text-xs sm:text-sm text-slate-500 line-clamp-1 mb-2.5 ${isAr ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                            {article.short_description[lang]}
                        </p>
                    )}
                    
                    <div className={`flex items-center gap-2 text-xs text-slate-400 ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>
                        <span>{fmtDate(article.created_at, lang)}</span>
                        <span>·</span>
                        <span>{readTime(article, lang)} {t.read}</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Index({ articles, categories, filters }) {
    const [lang, setLang] = useState(() =>
        typeof window !== 'undefined' ? localStorage.getItem('monasbtk_lang') || 'en' : 'en'
    );
    const [searchVal, setSearchVal] = useState(filters?.search || '');
    const searchRef = useRef();
    const t = T[lang];
    const isAr = lang === 'ar';

    const switchLang = (l) => { setLang(l); localStorage.setItem('monasbtk_lang', l); };

    const currentCat = filters?.category || null;
    const isFirstPage = articles.current_page === 1;
    const [featured, ...rest] = articles.data;
    const showFeatured = isFirstPage && !currentCat && !filters?.search && featured;

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        if (searchVal) params.set('search', searchVal); else params.delete('search');
        params.delete('page');
        window.location.href = route('blog.index') + '?' + params.toString();
    };

    const clearSearch = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete('search'); params.delete('page');
        window.location.href = route('blog.index') + '?' + params.toString();
    };

    return (
        <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen" style={{ background: '#fdf9fb', color: '#2a1f30' }}>
            <Head title={t.blog + ' – Monasbtk'} />
            <style>{`
                .blog-nav { position:sticky;top:0;z-index:100;height:68px;background:rgba(253,249,251,0.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(121,75,199,0.13); }
                .blog-inner { max-width:1180px;margin:0 auto;padding:0 24px; }
                .cat-scroll { display:flex;gap:8px;overflow-x:auto;padding:14px 0;scrollbar-width:none; }
                .cat-scroll::-webkit-scrollbar { display:none; }
                .cat-pill { white-space:nowrap;flex-shrink:0;padding:8px 20px;border-radius:999px;font-size:13.5px;font-weight:600;text-decoration:none;border:1px solid transparent;transition:all .3s; }
                .cat-on  { background:#794BC7;color:#fff;box-shadow:0 6px 20px rgba(121,75,199,.2); }
                .cat-off { color:#7a6070;border-color:rgba(121,75,199,.2);background:rgba(255,255,255,0.4); }
                .cat-off:hover { color:#794BC7;border-color:rgba(121,75,199,.35);background:rgba(121,75,199,.03); }
                .content-grid { display:grid;grid-template-columns:1fr 280px;gap:56px;align-items:start; }
                .sidebar { position:sticky;top:140px; }
                .sb-block { margin-bottom:32px; }
                .sb-label { font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#b0909a;padding-bottom:10px;border-bottom:1px solid rgba(121,75,199,.15);margin-bottom:16px; }
                .sb-topics { display:flex;flex-wrap:wrap;gap:6px; }
                .sb-chip { padding:7px 16px;border-radius:999px;font-size:12.5px;font-weight:600;text-decoration:none;transition:all .2s; }
                .sb-on  { background:#794BC7;color:#fff; }
                .sb-off { background:#fff;color:#7a6070;border:1px solid rgba(121,75,199,.18); }
                .sb-off:hover { border-color:rgba(121,75,199,.35);color:#794BC7; }
                .about-card { border-radius:24px;border:1px solid rgba(121,75,199,.14);background:#fff;padding:24px; }
                .page-btn { display:inline-flex;align-items:center;gap:8px;padding:10px 24px;border-radius:999px;font-size:13.5px;font-weight:600;text-decoration:none;transition:all .2s;border:none;cursor:pointer; }
                .page-on  { background:#794BC7;color:#fff; }
                .page-on:hover { background:#6B00C9;transform:translateY(-1px); }
                .page-off { background:#f0e8ed;color:#c0a8b4;cursor:not-allowed; }
                @media(max-width:1024px){ .content-grid{grid-template-columns:1fr;} .sidebar{display:none;} }
                @media(max-width:640px){ .blog-inner{padding:0 16px;} }
            `}</style>

            {/* ── NAV ── */}
            <nav className="blog-nav">
                <div className="blog-inner h-full flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src={monasbtkIcon} alt="Monasbtk Logo" className="h-8 w-8" />
                        <span className={`text-xl font-extrabold bg-gradient-to-r from-[#FF157D] to-[#794BC7] bg-clip-text text-transparent ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            Monasbtk
                        </span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/" className={`text-sm font-bold text-slate-600 hover:text-[#794BC7] transition-colors ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                            {t.home}
                        </Link>
                        <div className="flex rounded-full overflow-hidden border border-purple-100 bg-white/40">
                            {['en','ar'].map(l => (
                                <button key={l} onClick={() => switchLang(l)}
                                    style={{ padding:'5px 14px', fontSize:11, fontWeight:700, cursor:'pointer', border:'none',
                                        background: lang === l ? '#794BC7' : 'transparent',
                                        color: lang === l ? '#fff' : '#794BC7', transition:'all .2s' }}>
                                    {l === 'en' ? 'EN' : 'عربي'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <div className="bg-gradient-to-b from-[#FFFDFE] to-[#FDF9FB] border-b border-purple-100/50 py-16 sm:py-20">
                <div className="blog-inner">
                    <div className="max-w-2xl">
                        <p className={`text-xs font-bold tracking-wider uppercase text-[#794BC7] mb-4 flex items-center gap-2 ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            <span className="w-2 h-2 rounded-full bg-[#794BC7] animate-pulse" />
                            {isAr ? 'مدونة مناسبتك التحريرية' : 'Monasbtk Editorial'}
                        </p>
                        
                        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-[#1e1520] mb-6 ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            {isAr ? (
                                <>
                                    مدونة <span className="bg-gradient-to-r from-[#FF157D] to-[#794BC7] bg-clip-text text-transparent">مناسبتك</span>
                                </>
                            ) : (
                                <>
                                    The <span className="bg-gradient-to-r from-[#FF157D] to-[#794BC7] bg-clip-text text-transparent">Monasbtk</span> Blog
                                </>
                            )}
                        </h1>

                        {/* Search Input Box */}
                        <form onSubmit={handleSearch} className="flex gap-3 mt-8 max-w-lg">
                            <div className="relative flex-1">
                                <svg className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                                <input 
                                    ref={searchRef} 
                                    value={searchVal} 
                                    onChange={e => setSearchVal(e.target.value)}
                                    placeholder={t.search} 
                                    className={`w-full py-3.5 rounded-full border border-purple-200/60 bg-white/80 text-sm focus:border-[#794BC7]/40 focus:ring-1 focus:ring-[#794BC7]/20 outline-none text-[#2a1f30] shadow-sm transition-all
                                        ${isAr ? 'pr-11 pl-4 font-mikhak-regular' : 'pl-11 pr-4 font-outfit'}`} 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className={`px-6 py-3.5 rounded-full bg-[#794BC7] text-white text-sm font-bold border-none cursor-pointer transition-all duration-300 hover:bg-[#6B00C9] hover:shadow-lg hover:shadow-purple-500/10 active:scale-95 whitespace-nowrap select-none ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}
                            >
                                {t.searchBtn}
                            </button>
                        </form>

                        {filters?.search && (
                            <div className={`mt-4 flex items-center gap-3 text-sm text-slate-500 ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>
                                <span>{isAr ? `نتائج البحث عن: ` : `Results for: `} <strong>"{filters.search}"</strong> — {articles.total} {isAr ? 'مقال' : 'found'}</span>
                                <button onClick={clearSearch} className="text-xs text-[#794BC7] bg-none border-none cursor-pointer font-bold hover:underline">× {t.clearSearch}</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── CATEGORY BAR ── */}
            <div style={{ position:'sticky', top:68, zIndex:80, background:'rgba(253,249,251,.96)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(121,75,199,.12)' }}>
                <div className="blog-inner">
                    <div className="cat-scroll">
                        <Link href={route('blog.index', filters?.search ? { search: filters.search } : {})}
                            className={`cat-pill ${!currentCat ? 'cat-on' : 'cat-off'} ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>{t.all}</Link>
                        {categories.map(cat => (
                            <Link key={cat.id}
                                href={route('blog.index', { category: cat.id, ...(filters?.search ? { search: filters.search } : {}) })}
                                className={`cat-pill ${currentCat == cat.id ? 'cat-on' : 'cat-off'} ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                {cat.title[lang]}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="blog-inner py-12 sm:py-16">
                <div className="content-grid">
                    <main>
                        {/* Featured hero article */}
                        {showFeatured && <FeaturedCard article={featured} lang={lang} t={t} isAr={isAr} />}

                        {/* Articles list */}
                        <AnimatePresence mode="wait">
                            <motion.div key={currentCat || 'all'} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.2 }} className="space-y-2">
                                {(showFeatured ? rest : articles.data).map((article, i) => (
                                    <ArticleCard key={article.id} article={article} lang={lang} t={t} index={i} isAr={isAr} />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Empty page */}
                        {articles.data.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-[#794BC7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                </div>
                                <p className={`text-slate-500 mb-6 ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>{t.empty}</p>
                                <Link href={route('blog.index')} className={`inline-flex px-6 py-3 rounded-full bg-[#794BC7] text-white text-sm font-semibold hover:bg-[#6B00C9] transition-all ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>{t.all}</Link>
                            </div>
                        )}

                        {/* Pagination controls */}
                        {articles.last_page > 1 && (
                            <div className={`flex items-center justify-center gap-4 pt-10 ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                {articles.prev_page_url
                                    ? <Link href={articles.prev_page_url} className="page-btn page-on">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}><path d="M15 18l-6-6 6-6"/></svg>
                                        <span>{t.prev}</span>
                                      </Link>
                                    : <span className="page-btn page-off">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}><path d="M15 18l-6-6 6-6"/></svg>
                                        <span>{t.prev}</span>
                                      </span>
                                }
                                <span className="text-sm font-semibold text-slate-400">{articles.current_page} / {articles.last_page}</span>
                                {articles.next_page_url
                                    ? <Link href={articles.next_page_url} className="page-btn page-on">
                                        <span>{t.next}</span>
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}><path d="M9 18l6-6-6-6"/></svg>
                                      </Link>
                                    : <span className="page-btn page-off">
                                        <span>{t.next}</span>
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}><path d="M9 18l6-6-6-6"/></svg>
                                      </span>
                                }
                            </div>
                        )}
                    </main>

                    {/* ── SIDEBAR ── */}
                    <aside className="sidebar">
                        {/* Topics */}
                        <div className="sb-block">
                            <div className={`sb-label ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>{t.topics}</div>
                            <div className="sb-topics">
                                <Link href={route('blog.index')} className={`sb-chip ${!currentCat ? 'sb-on' : 'sb-off'} ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>{t.all}</Link>
                                {categories.map(cat => (
                                    <Link key={cat.id} href={route('blog.index', { category: cat.id })}
                                        className={`sb-chip ${currentCat == cat.id ? 'sb-on' : 'sb-off'} ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                        {cat.title[lang]}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* About card */}
                        <div className="sb-block">
                            <div className="about-card">
                                <div className={`text-base font-extrabold text-slate-800 mb-3.5 ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                    {t.about}
                                </div>
                                <p className={`text-sm leading-relaxed text-slate-500 mb-4 ${isAr ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                                    {t.aboutText}
                                </p>
                                <Link href="/" className={`inline-flex items-center gap-1.5 text-sm font-bold text-[#794BC7] hover:text-[#6B00C9] transition-colors select-none ${isAr ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                    <span>{t.learnMore}</span>
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </Link>
                            </div>
                        </div>

                        {/* Stats card */}
                        {articles.total > 0 && (
                            <div className="p-6 rounded-3xl bg-[#794BC7]/[0.02] border border-[#794BC7]/10 text-center select-none">
                                <div className={`text-4xl font-extrabold text-[#794BC7] leading-none ${isAr ? 'font-mikhak-bold' : 'font-outfit'}`}>{articles.total}</div>
                                <div className={`text-xs font-semibold text-slate-400 mt-2 ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>{articles.total} {t.articles} published</div>
                            </div>
                        )}

                        {/* Footer links */}
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-8 px-2">
                            {[['/', isAr?'الرئيسية':'Home'],['/about',isAr?'عن مناسبتك':'About'],['/contact',isAr?'تواصل معنا':'Contact'],['/privacy-policy',isAr?'سياسة الخصوصية':'Privacy']].map(([href, label]) => (
                                <Link key={href} href={href} className={`text-xs font-semibold text-slate-400 hover:text-[#794BC7] transition-colors ${isAr ? 'font-mikhak-regular' : 'font-outfit'}`}>{label}</Link>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
