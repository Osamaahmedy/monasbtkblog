import { Head, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white font-bold">
            {initials(name)}
        </span>
    );
}

// ── Category badge ─────────────────────────────────────────────────────────────
function CatBadge({ label }) {
    return (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-rose-50 text-rose-600 border border-rose-100">
            {label}
        </span>
    );
}

// ── Featured hero card ─────────────────────────────────────────────────────────
function FeaturedCard({ article, lang, t }) {
    return (
        <Link href={route('blog.show', article.slug)}
            className="group block relative overflow-hidden rounded-3xl mb-8 shadow-sm hover:shadow-xl transition-shadow duration-500">
            {/* Image */}
            <div className="aspect-[16/7] bg-gradient-to-br from-rose-100 to-pink-200 overflow-hidden">
                {article.image
                    ? <img src={`/storage/${article.image}`} alt={article.title[lang]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    : <div className="w-full h-full bg-gradient-to-br from-rose-200 via-pink-100 to-rose-50" />
                }
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                <span className="inline-block mb-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-sm border border-white/25">
                    ✦ {t.featured}
                </span>
                {article.category?.title?.[lang] && (
                    <span className="ml-2 inline-block mb-3 px-3 py-1 rounded-full text-[10px] font-semibold bg-rose-500/80 backdrop-blur-sm">
                        {article.category.title[lang]}
                    </span>
                )}
                <h2 className="font-serif text-2xl md:text-3xl font-normal leading-tight mb-3 drop-shadow-sm group-hover:text-rose-200 transition-colors">
                    {article.title[lang]}
                </h2>
                {article.short_description?.[lang] && (
                    <p className="text-white/75 text-sm line-clamp-2 mb-4 max-w-2xl font-light">
                        {article.short_description[lang]}
                    </p>
                )}
                <div className="flex items-center gap-3 text-white/70 text-xs">
                    <Avatar name={article.user?.name} size={22} />
                    <span>{article.user?.name}</span>
                    <span className="opacity-50">·</span>
                    <span>{fmtDate(article.created_at, lang)}</span>
                    <span className="opacity-50">·</span>
                    <span>{readTime(article, lang)} {t.read}</span>
                </div>
            </div>
        </Link>
    );
}

// ── Article card ───────────────────────────────────────────────────────────────
function ArticleCard({ article, lang, t, index }) {
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.28 }}>
            <Link href={route('blog.show', article.slug)}
                className="group flex gap-4 py-5 border-b border-rose-50 hover:border-rose-100 transition-colors">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-24 h-20 md:w-28 md:h-22 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-100 to-pink-50">
                    {article.image
                        ? <img src={`/storage/${article.image}`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <div className="w-full h-full flex items-center justify-center opacity-30">
                            <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <span className="text-xs font-medium text-slate-600">{article.user?.name}</span>
                        {article.category?.title?.[lang] && (
                            <>
                                <span className="text-rose-200 text-xs">·</span>
                                <CatBadge label={article.category.title[lang]} />
                            </>
                        )}
                    </div>
                    <h3 className="font-serif text-base md:text-lg font-normal leading-snug text-slate-800 group-hover:text-rose-600 transition-colors mb-1.5 line-clamp-2">
                        {article.title[lang]}
                    </h3>
                    {article.short_description?.[lang] && (
                        <p className="text-sm text-slate-500 font-light line-clamp-1 mb-2">
                            {article.short_description[lang]}
                        </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
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
        <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#fdf9fb', color: '#2a1f30' }}>
            <Head title={t.blog + ' – Monasbtk'} />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
                .font-serif { font-family: 'DM Serif Display', Georgia, serif; }
                .blog-nav { position:sticky;top:0;z-index:100;height:60px;background:rgba(253,249,251,0.9);backdrop-filter:blur(16px);border-bottom:1px solid rgba(220,150,170,0.13); }
                .blog-inner { max-width:1160px;margin:0 auto;padding:0 24px; }
                .cat-scroll { display:flex;gap:6px;overflow-x:auto;padding:12px 0;scrollbar-width:none; }
                .cat-scroll::-webkit-scrollbar { display:none; }
                .cat-pill { white-space:nowrap;flex-shrink:0;padding:7px 18px;border-radius:999px;font-size:13px;font-weight:500;text-decoration:none;border:1px solid transparent;transition:all .15s; }
                .cat-on  { background:#c0507a;color:#fff;box-shadow:0 3px 14px rgba(192,80,122,.22); }
                .cat-off { color:#7a6070;border-color:rgba(200,140,170,.22); }
                .cat-off:hover { color:#c0507a;border-color:rgba(192,80,122,.4);background:rgba(192,80,122,.04); }
                .content-grid { display:grid;grid-template-columns:1fr 272px;gap:52px;align-items:start; }
                .sidebar { position:sticky;top:120px; }
                .sb-block { margin-bottom:28px; }
                .sb-label { font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#b0909a;padding-bottom:10px;border-bottom:1px solid rgba(200,140,170,.15);margin-bottom:14px; }
                .sb-topics { display:flex;flex-wrap:wrap;gap:6px; }
                .sb-chip { padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:500;text-decoration:none;transition:all .15s; }
                .sb-on  { background:#c0507a;color:#fff; }
                .sb-off { background:#f5ecf2;color:#6a5060;border:1px solid rgba(200,140,170,.2); }
                .sb-off:hover { border-color:rgba(192,80,122,.35);color:#c0507a; }
                .about-card { border-radius:18px;border:1px solid rgba(200,140,170,.18);background:#fff;padding:20px; }
                .page-btn { display:inline-flex;align-items:center;gap:6px;padding:9px 22px;border-radius:999px;font-size:13px;font-weight:500;text-decoration:none;transition:all .18s;border:none;cursor:pointer; }
                .page-on  { background:#c0507a;color:#fff; }
                .page-on:hover { background:#aa4068;transform:translateY(-1px); }
                .page-off { background:#f0e8ed;color:#c0a8b4;cursor:not-allowed; }
                @media(max-width:1024px){ .content-grid{grid-template-columns:1fr;} .sidebar{display:none;} }
                @media(max-width:640px){ .blog-inner{padding:0 16px;} }
            `}</style>

            {/* ── NAV ── */}
            <nav className="blog-nav">
                <div className="blog-inner h-full flex items-center justify-between">
                    <Link href="/" style={{ fontFamily:'DM Serif Display,serif', fontSize:20, color:'#2a1f30', textDecoration:'none' }}>Monasbtk</Link>
                    <div className="flex items-center gap-5">
                        <Link href="/" style={{ fontSize:13.5, color:'#7a6070', textDecoration:'none' }}>{t.home}</Link>
                        <div className="flex rounded-full overflow-hidden border" style={{ borderColor:'rgba(192,80,122,.2)' }}>
                            {['en','ar'].map(l => (
                                <button key={l} onClick={() => switchLang(l)}
                                    style={{ padding:'5px 14px', fontSize:12, fontWeight:500, cursor:'pointer', border:'none',
                                        background: lang === l ? '#c0507a' : 'transparent',
                                        color: lang === l ? '#fff' : '#c0507a', transition:'all .15s' }}>
                                    {l === 'en' ? 'En' : 'ع'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <div style={{ background:'#fff', borderBottom:'1px solid rgba(220,150,170,.12)', padding:'52px 0 40px' }}>
                <div className="blog-inner">
                    <div className="max-w-2xl">
                        <p style={{ fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#c0507a', marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
                            <span style={{ width:5, height:5, borderRadius:'50%', background:'#c0507a', display:'inline-block' }} />
                            Monasbtk Editorial
                        </p>
                        <h1 style={{ fontFamily:'DM Serif Display,serif', fontSize:'clamp(36px,6vw,58px)', fontWeight:400, lineHeight:1.1, letterSpacing:'-.02em', color:'#1e1520', marginBottom:16 }}>
                            {isAr ? <><em style={{ fontStyle:'italic', color:'#c0507a' }}>مناسبتك</em><br/>المدونة</> : <>The <em style={{ fontStyle:'italic', color:'#c0507a' }}>Monasbtk</em><br/>Blog</>}
                        </h1>
                        {/* Search */}
                        <form onSubmit={handleSearch} style={{ display:'flex', gap:8, marginTop:24, maxWidth:460 }}>
                            <div style={{ position:'relative', flex:1 }}>
                                <svg style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', width:15, height:15, color:'#b0909a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                                <input ref={searchRef} value={searchVal} onChange={e => setSearchVal(e.target.value)}
                                    placeholder={t.search} style={{ width:'100%', paddingLeft:38, paddingRight:14, paddingTop:10, paddingBottom:10, borderRadius:999, border:'1.5px solid rgba(200,140,170,.25)', background:'#fdf4f8', fontSize:13.5, fontFamily:'inherit', outline:'none', color:'#2a1f30' }} />
                            </div>
                            <button type="submit" style={{ padding:'10px 20px', borderRadius:999, background:'#c0507a', color:'#fff', fontSize:13, fontWeight:600, border:'none', cursor:'pointer', whiteSpace:'nowrap' }}>
                                {t.searchBtn}
                            </button>
                        </form>
                        {filters?.search && (
                            <div style={{ marginTop:10, display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#7a6070' }}>
                                <span>Results for: <strong>"{filters.search}"</strong> — {articles.total} found</span>
                                <button onClick={clearSearch} style={{ fontSize:12, color:'#c0507a', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>× {t.clearSearch}</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── CATEGORY BAR ── */}
            <div style={{ position:'sticky', top:60, zIndex:80, background:'rgba(253,249,251,.96)', backdropFilter:'blur(10px)', borderBottom:'1px solid rgba(220,150,170,.12)' }}>
                <div className="blog-inner">
                    <div className="cat-scroll">
                        <Link href={route('blog.index', filters?.search ? { search: filters.search } : {})}
                            className={`cat-pill ${!currentCat ? 'cat-on' : 'cat-off'}`}>{t.all}</Link>
                        {categories.map(cat => (
                            <Link key={cat.id}
                                href={route('blog.index', { category: cat.id, ...(filters?.search ? { search: filters.search } : {}) })}
                                className={`cat-pill ${currentCat == cat.id ? 'cat-on' : 'cat-off'}`}>
                                {cat.title[lang]}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MAIN ── */}
            <div className="blog-inner" style={{ paddingTop:36, paddingBottom:72 }}>
                <div className="content-grid">
                    <main>
                        {/* Featured hero article */}
                        {showFeatured && <FeaturedCard article={featured} lang={lang} t={t} />}

                        {/* Articles list */}
                        <AnimatePresence mode="wait">
                            <motion.div key={currentCat || 'all'} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.2 }}>
                                {(showFeatured ? rest : articles.data).map((article, i) => (
                                    <ArticleCard key={article.id} article={article} lang={lang} t={t} index={i} />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Empty */}
                        {articles.data.length === 0 && (
                            <div style={{ textAlign:'center', padding:'64px 0' }}>
                                <div style={{ width:56, height:56, borderRadius:'50%', background:'rgba(192,80,122,.07)', margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                                    <svg width="24" height="24" fill="none" stroke="#c0507a" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                </div>
                                <p style={{ color:'#8a7080', marginBottom:16 }}>{t.empty}</p>
                                <Link href={route('blog.index')} style={{ display:'inline-flex', padding:'9px 22px', borderRadius:999, background:'#c0507a', color:'#fff', fontSize:13, fontWeight:500, textDecoration:'none' }}>{t.all}</Link>
                            </div>
                        )}

                        {/* Pagination */}
                        {articles.last_page > 1 && (
                            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, paddingTop:36 }}>
                                {articles.prev_page_url
                                    ? <Link href={articles.prev_page_url} className="page-btn page-on">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}><path d="M15 18l-6-6 6-6"/></svg>
                                        {t.prev}
                                      </Link>
                                    : <span className="page-btn page-off">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}><path d="M15 18l-6-6 6-6"/></svg>
                                        {t.prev}
                                      </span>
                                }
                                <span style={{ fontSize:12.5, color:'#b0909a' }}>{articles.current_page} / {articles.last_page}</span>
                                {articles.next_page_url
                                    ? <Link href={articles.next_page_url} className="page-btn page-on">
                                        {t.next}
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}><path d="M9 18l6-6-6-6"/></svg>
                                      </Link>
                                    : <span className="page-btn page-off">
                                        {t.next}
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}><path d="M9 18l6-6-6-6"/></svg>
                                      </span>
                                }
                            </div>
                        )}
                    </main>

                    {/* ── SIDEBAR ── */}
                    <aside className="sidebar">
                        {/* Topics */}
                        <div className="sb-block">
                            <div className="sb-label">{t.topics}</div>
                            <div className="sb-topics">
                                <Link href={route('blog.index')} className={`sb-chip ${!currentCat ? 'sb-on' : 'sb-off'}`}>{t.all}</Link>
                                {categories.map(cat => (
                                    <Link key={cat.id} href={route('blog.index', { category: cat.id })}
                                        className={`sb-chip ${currentCat == cat.id ? 'sb-on' : 'sb-off'}`}>
                                        {cat.title[lang]}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* About card */}
                        <div className="sb-block">
                            <div className="about-card">
                                <div style={{ fontFamily:'DM Serif Display,serif', fontSize:17, color:'#1e1520', marginBottom:10 }}>{t.about}</div>
                                <p style={{ fontSize:13, lineHeight:1.76, color:'#7a6070', fontWeight:300, marginBottom:14 }}>{t.aboutText}</p>
                                <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:13, fontWeight:500, color:'#c0507a', textDecoration:'none' }}>
                                    {t.learnMore}
                                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isAr ? 'rotate(180deg)' : 'none' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        {articles.total > 0 && (
                            <div style={{ padding:'16px 20px', borderRadius:16, background:'rgba(192,80,122,.05)', border:'1px solid rgba(192,80,122,.1)', textAlign:'center' }}>
                                <div style={{ fontFamily:'DM Serif Display,serif', fontSize:30, color:'#c0507a', lineHeight:1 }}>{articles.total}</div>
                                <div style={{ fontSize:12, color:'#b0909a', marginTop:4 }}>{t.articles} published</div>
                            </div>
                        )}

                        {/* Footer links */}
                        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px 14px', marginTop:24 }}>
                            {[['/', isAr?'الرئيسية':'Home'],['/about',isAr?'عن مناسبتك':'About'],['/contact',isAr?'تواصل':'Contact'],['/privacy-policy',isAr?'الخصوصية':'Privacy']].map(([href, label]) => (
                                <Link key={href} href={href} style={{ fontSize:12, color:'#c0a8b4', textDecoration:'none' }}>{label}</Link>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
