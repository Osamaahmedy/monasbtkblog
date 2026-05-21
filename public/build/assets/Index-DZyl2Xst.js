import{r as j,j as e,Y as o}from"./app-Dfkvtt7R.js";import{A as z}from"./index-n5ro577R.js";import{m as g}from"./proxy-CYWtr4Ll.js";function S({articles:i,categories:h}){const[a,y]=j.useState(()=>typeof window<"u"&&localStorage.getItem("monasbtk_lang")||"en");j.useEffect(()=>{localStorage.setItem("monasbtk_lang",a)},[a]);const r={en:{title:"Blog",subtitle:"Thoughtful articles, practical ideas, and refined inspiration for your most meaningful moments.",all:"All",empty:"No stories published yet. Check back soon.",home:"Home",read:"min read",prev:"Previous",next:"Next",trending:"Trending on Monasbtk",topics:"Discover topics",about:"About Monasbtk",aboutText:"A curated editorial space for ideas, celebration guidance, and elegant inspiration that helps you plan with more clarity and better taste.",learnMore:"Learn more",explore:"Explore articles",articles:"articles",editorial:"Curated Editorial"},ar:{title:"المدونة",subtitle:"مقالات منتقاة بعناية، وأفكار عملية، وإلهام راقٍ يساعدك على صناعة لحظاتك الأجمل بذوق ووضوح.",all:"الكل",empty:"لم يتم نشر مقالات بعد. عد قريباً.",home:"الرئيسية",read:"دقائق للقراءة",prev:"السابق",next:"التالي",trending:"الأكثر رواجاً في مناسبتك",topics:"اكتشف المواضيع",about:"عن مدونة مناسبتك",aboutText:"مساحة تحريرية منتقاة للأفكار، ونصائح المناسبات، والإلهام الأنيق الذي يساعدك على التخطيط بصورة أوضح.",learnMore:"تعرّف علينا",explore:"استعرض المقالات",articles:"مقال",editorial:"تحرير منتقى"}},d=typeof window<"u"?new URLSearchParams(window.location.search).get("category"):null,m=t=>{var l;const s=(((l=t.content)==null?void 0:l[a])||"").replace(/<[^>]*>/g,"").trim();return Math.max(1,Math.ceil((s?s.split(/\s+/).length:100)/200))},b=t=>new Date(t).toLocaleDateString(a==="ar"?"ar-EG":"en-US",{month:"long",day:"numeric",year:"numeric"}),f=i.data.slice(0,6),k=i.data,N=i.current_page===1,n=a==="ar";return e.jsxs("div",{dir:n?"rtl":"ltr",className:"blog-root",children:[e.jsx("style",{children:`
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
            `}),e.jsx("nav",{className:"nav",children:e.jsxs("div",{className:"nav-inner",children:[e.jsx(o,{href:"/",className:"nav-logo",children:"Monasbtk"}),e.jsxs("div",{className:"nav-right",children:[e.jsx(o,{href:"/",className:"nav-link",children:r[a].home}),e.jsx("button",{className:"lang-btn",onClick:()=>y(n?"en":"ar"),children:n?"En":"ع"})]})]})}),e.jsx("section",{className:"hero",children:e.jsxs("div",{className:"hero-inner",children:[e.jsxs("div",{className:"hero-eyebrow",children:[e.jsx("span",{className:"hero-eyebrow-dot"}),r[a].editorial]}),e.jsx("h1",{className:"hero-title",children:n?e.jsxs(e.Fragment,{children:[r[a].title,e.jsx("br",{}),e.jsx("em",{children:"مناسبتك"})]}):e.jsxs(e.Fragment,{children:[n?"":"The ",e.jsx("em",{children:"Monasbtk"}),e.jsx("br",{}),"Blog"]})}),e.jsx("p",{className:"hero-sub",children:r[a].subtitle}),e.jsxs("div",{className:"hero-actions",children:[e.jsxs(o,{href:route("blog.index"),className:"btn-primary",children:[r[a].explore,e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{transform:n?"rotate(180deg)":"none"},children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]}),i!=null&&i.total?e.jsxs("span",{className:"hero-count",children:[i.total,"+ ",r[a].articles]}):null]})]})}),f.length>0&&N&&!d&&e.jsx("section",{className:"trending-section",children:e.jsxs("div",{className:"trending-inner",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"section-label",children:r[a].trending}),e.jsx("div",{className:"section-rule"})]}),e.jsx("div",{className:"trending-grid",children:f.map((t,s)=>{var l,c,p,x;return e.jsxs(o,{href:route("blog.show",t.slug),className:"trend-card",children:[e.jsx("span",{className:"trend-num",children:String(s+1).padStart(2,"0")}),e.jsxs("div",{className:"trend-body",children:[e.jsxs("div",{className:"trend-author",children:[e.jsx("div",{className:"avatar",children:(p=(c=(l=t.user)==null?void 0:l.name)==null?void 0:c.charAt(0))==null?void 0:p.toUpperCase()}),e.jsx("span",{className:"avatar-name",children:(x=t.user)==null?void 0:x.name})]}),e.jsx("div",{className:"trend-title",children:t.title[a]}),e.jsxs("div",{className:"trend-meta",children:[b(t.created_at)," · ",m(t)," ",r[a].read]})]})]},t.id)})})]})}),e.jsxs("div",{className:"page-wrap",children:[e.jsx("div",{className:"cat-bar",children:e.jsxs("div",{className:"cat-bar-scroll",children:[e.jsx(o,{href:route("blog.index"),className:`cat-pill ${d?"cat-inactive":"cat-active"}`,children:r[a].all}),h.map(t=>e.jsx(o,{href:route("blog.index",{category:t.id}),className:`cat-pill ${d==t.id?"cat-active":"cat-inactive"}`,children:t.title[a]},t.id))]})}),e.jsxs("div",{className:"content-grid",children:[e.jsxs("main",{children:[e.jsx(z,{mode:"wait",children:e.jsx(g.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.22},children:k.map((t,s)=>{var l,c,p,x,u,w,v;return e.jsx(g.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{delay:s*.038,duration:.26},children:e.jsxs(o,{href:route("blog.show",t.slug),className:"article-row",children:[e.jsxs("div",{className:"article-body",children:[e.jsxs("div",{className:"article-meta",children:[e.jsxs("div",{className:"article-author-row",children:[e.jsx("div",{className:"avatar",children:(p=(c=(l=t.user)==null?void 0:l.name)==null?void 0:c.charAt(0))==null?void 0:p.toUpperCase()}),e.jsx("span",{className:"article-author-name",children:(x=t.user)==null?void 0:x.name})]}),((w=(u=t.category)==null?void 0:u.title)==null?void 0:w[a])&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"sep",children:"·"}),e.jsx("span",{className:"cat-tag",children:t.category.title[a]})]})]}),e.jsx("h2",{className:"article-title",children:t.title[a]}),e.jsx("p",{className:"article-excerpt",children:(v=t.short_description)==null?void 0:v[a]}),e.jsxs("div",{className:"article-footer",children:[e.jsx("span",{children:b(t.created_at)}),e.jsx("span",{className:"sep",children:"·"}),e.jsxs("span",{children:[m(t)," ",r[a].read]})]})]}),e.jsx("div",{className:"article-thumb",children:t.image?e.jsx("img",{src:`/storage/${t.image}`,alt:t.title[a]}):e.jsx("div",{className:"thumb-empty",children:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"rgba(192,80,122,0.28)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),e.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),e.jsx("path",{d:"M21 15l-5-5L5 21"})]})})})]})},t.id)})},d||"all")}),i.data.length===0&&e.jsxs(g.div,{className:"empty",initial:{opacity:0},animate:{opacity:1},children:[e.jsx("div",{className:"empty-circle",children:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"#c0507a",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"})]})}),e.jsx("p",{className:"empty-text",children:r[a].empty}),e.jsx(o,{href:route("blog.index"),className:"btn-primary",style:{display:"inline-flex"},children:r[a].all})]}),i.last_page>1&&e.jsxs("div",{className:"pagination",children:[i.prev_page_url?e.jsxs(o,{href:i.prev_page_url,className:"page-btn page-btn-on",children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{transform:n?"rotate(180deg)":"none"},children:e.jsx("path",{d:"M15 18l-6-6 6-6"})}),r[a].prev]}):e.jsxs("span",{className:"page-btn page-btn-off",children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{transform:n?"rotate(180deg)":"none"},children:e.jsx("path",{d:"M15 18l-6-6 6-6"})}),r[a].prev]}),e.jsxs("span",{className:"page-count",children:[i.current_page," / ",i.last_page]}),i.next_page_url?e.jsxs(o,{href:i.next_page_url,className:"page-btn page-btn-on",children:[r[a].next,e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{transform:n?"rotate(180deg)":"none"},children:e.jsx("path",{d:"M9 18l6-6-6-6"})})]}):e.jsxs("span",{className:"page-btn page-btn-off",children:[r[a].next,e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{transform:n?"rotate(180deg)":"none"},children:e.jsx("path",{d:"M9 18l6-6-6-6"})})]})]})]}),e.jsxs("aside",{className:"sidebar",children:[e.jsxs("div",{className:"sb-block",children:[e.jsx("div",{className:"sb-label",children:r[a].topics}),e.jsx("div",{className:"sb-topics",children:h.map(t=>e.jsx(o,{href:route("blog.index",{category:t.id}),className:`sb-topic ${d==t.id?"sb-topic-active":"sb-topic-inactive"}`,children:t.title[a]},t.id))})]}),e.jsx("div",{className:"sb-block",children:e.jsxs("div",{className:"about-card",children:[e.jsx("div",{className:"about-card-title",children:r[a].about}),e.jsx("p",{className:"about-card-text",children:r[a].aboutText}),e.jsxs(o,{href:"/",className:"about-link",children:[r[a].learnMore,e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{transform:n?"rotate(180deg)":"none"},children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})]})}),e.jsx("div",{className:"sb-block",children:e.jsx("div",{className:"footer-links",children:[{href:"/",label:n?"الرئيسية":"Home"},{href:"/about",label:n?"عن مناسبتك":"About"},{href:"/contact",label:n?"تواصل معنا":"Contact"},{href:"/privacy-policy",label:n?"الخصوصية":"Privacy"}].map(({href:t,label:s})=>e.jsx(o,{href:t,className:"footer-link",children:s},t))})})]})]})]})]})}export{S as default};
