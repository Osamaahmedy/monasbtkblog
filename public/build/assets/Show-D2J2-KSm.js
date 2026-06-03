import{r as h,v as Ke,j as t,$ as Qe,Y as j}from"./app-edBD5-Uh.js";import{r as Ze,i as et,f as C,c as _,b as We,d as Ae,J as tt,p as rt,v as nt,e as ot,g as st,h as at,n as _e,j as it,s as lt,u as H,k as He,w as ct,l as $,M as Oe,o as T,m as v,a as dt}from"./monasbtk_colored_logo-BuyOXkxd.js";import{L as je}from"./LazyImage-D2BwHz60.js";import{A as mt}from"./index-Bo0Zr6E6.js";const S=new WeakMap;let w;const Ie=(e,n,r)=>(o,s)=>s&&s[0]?s[0][e+"Size"]:et(o)&&"getBBox"in o?o.getBBox()[n]:o[r],pt=Ie("inline","width","offsetWidth"),ft=Ie("block","height","offsetHeight");function ht({target:e,borderBoxSize:n}){var r;(r=S.get(e))==null||r.forEach(o=>{o(e,{get width(){return pt(e,n)},get height(){return ft(e,n)}})})}function xt(e){e.forEach(ht)}function ut(){typeof ResizeObserver>"u"||(w=new ResizeObserver(xt))}function gt(e,n){w||ut();const r=Ze(e);return r.forEach(o=>{let s=S.get(o);s||(s=new Set,S.set(o,s)),s.add(n),w==null||w.observe(o)}),()=>{r.forEach(o=>{const s=S.get(o);s==null||s.delete(n),s!=null&&s.size||w==null||w.unobserve(o)})}}const E=new Set;let N;function bt(){N=()=>{const e={get width(){return window.innerWidth},get height(){return window.innerHeight}};E.forEach(n=>n(e))},window.addEventListener("resize",N)}function vt(e){return E.add(e),N||bt(),()=>{E.delete(e),!E.size&&typeof N=="function"&&(window.removeEventListener("resize",N),N=void 0)}}function wt(e,n){return typeof e=="function"?vt(e):gt(e,n)}function Fe(e,n){let r;const o=()=>{const{currentTime:s}=n,l=(s===null?0:s.value)/100;r!==l&&e(l),r=l};return C.preUpdate(o,!0),()=>_(o)}function yt(...e){const n=!Array.isArray(e[0]),r=n?0:-1,o=e[0+r],s=e[1+r],i=e[2+r],l=e[3+r],d=We(s,i,l);return n?d(o):d}function kt(e,n,r){const o=e.get();let s=null,i=o,l;const d=typeof o=="string"?o.replace(/[\d.-]/g,""):void 0,f=()=>{s&&(s.stop(),s=null)},p=()=>{f(),s=new tt({keyframes:[Ce(e.get()),Ce(i)],velocity:e.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...r,onUpdate:l})};e.attach((u,g)=>(i=u,l=k=>g(Ne(k,d)),C.postRender(p),e.get()),f);let x;return Ae(n)&&(x=n.on("change",u=>e.set(Ne(u,d))),e.on("destroy",x)),x}function Ne(e,n){return n?e+n:e}function Ce(e){return typeof e=="number"?e:parseFloat(e)}const jt=50,ze=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Nt=()=>({time:0,x:ze(),y:ze()}),Ct={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function Be(e,n,r,o){const s=r[n],{length:i,position:l}=Ct[n],d=s.current,f=r.time;s.current=e[`scroll${l}`],s.scrollLength=e[`scroll${i}`]-e[`client${i}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=rt(0,s.scrollLength,s.current);const p=o-f;s.velocity=p>jt?0:nt(s.current-d,p)}function zt(e,n,r){Be(e,"x",n,r),Be(e,"y",n,r),n.time=r}function Bt(e,n){const r={x:0,y:0};let o=e;for(;o&&o!==n;)if(ot(o))r.x+=o.offsetLeft,r.y+=o.offsetTop,o=o.offsetParent;else if(o.tagName==="svg"){const s=o.getBoundingClientRect();o=o.parentElement;const i=o.getBoundingClientRect();r.x+=s.left-i.left,r.y+=s.top-i.top}else if(o instanceof SVGGraphicsElement){const{x:s,y:i}=o.getBBox();r.x+=s,r.y+=i;let l=null,d=o.parentNode;for(;!l;)d.tagName==="svg"&&(l=d),d=o.parentNode;o=l}else break;return r}const A={start:0,center:.5,end:1};function $e(e,n,r=0){let o=0;if(e in A&&(e=A[e]),typeof e=="string"){const s=parseFloat(e);e.endsWith("px")?o=s:e.endsWith("%")?e=s/100:e.endsWith("vw")?o=s/100*document.documentElement.clientWidth:e.endsWith("vh")?o=s/100*document.documentElement.clientHeight:e=s}return typeof e=="number"&&(o=n*e),r+o}const $t=[0,0];function Lt(e,n,r,o){let s=Array.isArray(e)?e:$t,i=0,l=0;return typeof e=="number"?s=[e,e]:typeof e=="string"&&(e=e.trim(),e.includes(" ")?s=e.split(" "):s=[e,A[e]?e:"0"]),i=$e(s[0],r,o),l=$e(s[1],n),i-l}const St={All:[[0,0],[1,1]]},Et={x:0,y:0};function Mt(e){return"getBBox"in e&&e.tagName!=="svg"?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function Tt(e,n,r){const{offset:o=St.All}=r,{target:s=e,axis:i="y"}=r,l=i==="y"?"height":"width",d=s!==e?Bt(s,e):Et,f=s===e?{width:e.scrollWidth,height:e.scrollHeight}:Mt(s),p={width:e.clientWidth,height:e.clientHeight};n[i].offset.length=0;let x=!n[i].interpolate;const u=o.length;for(let g=0;g<u;g++){const k=Lt(o[g],p[l],f[l],d[i]);!x&&k!==n[i].interpolatorOffsets[g]&&(x=!0),n[i].offset[g]=k}x&&(n[i].interpolate=We(n[i].offset,st(o),{clamp:!1}),n[i].interpolatorOffsets=[...n[i].offset]),n[i].progress=at(0,1,n[i].interpolate(n[i].current))}function Wt(e,n=e,r){if(r.x.targetOffset=0,r.y.targetOffset=0,n!==e){let o=n;for(;o&&o!==e;)r.x.targetOffset+=o.offsetLeft,r.y.targetOffset+=o.offsetTop,o=o.offsetParent}r.x.targetLength=n===e?n.scrollWidth:n.clientWidth,r.y.targetLength=n===e?n.scrollHeight:n.clientHeight,r.x.containerLength=e.clientWidth,r.y.containerLength=e.clientHeight}function At(e,n,r,o={}){return{measure:s=>{Wt(e,o.target,r),zt(e,r,s),(o.offset||o.target)&&Tt(e,r,o)},notify:()=>n(r)}}const B=new WeakMap,Le=new WeakMap,W=new WeakMap,Se=e=>e===document.scrollingElement?window:e;function De(e,{container:n=document.scrollingElement,...r}={}){if(!n)return _e;let o=W.get(n);o||(o=new Set,W.set(n,o));const s=Nt(),i=At(n,e,s,r);if(o.add(i),!B.has(n)){const d=()=>{for(const u of o)u.measure(it.timestamp);C.preUpdate(f)},f=()=>{for(const u of o)u.notify()},p=()=>C.read(d);B.set(n,p);const x=Se(n);window.addEventListener("resize",p,{passive:!0}),n!==document.documentElement&&Le.set(n,wt(n,p)),x.addEventListener("scroll",p,{passive:!0}),p()}const l=B.get(n);return C.read(l,!1,!0),()=>{var p;_(l);const d=W.get(n);if(!d||(d.delete(i),d.size))return;const f=B.get(n);B.delete(n),f&&(Se(n).removeEventListener("scroll",f),(p=Le.get(n))==null||p(),window.removeEventListener("resize",f))}}const Ee=new Map;function _t(e){const n={value:0},r=De(o=>{n.value=o[e.axis].progress*100},e);return{currentTime:n,cancel:r}}function Re({source:e,container:n,...r}){const{axis:o}=r;e&&(n=e);const s=Ee.get(n)??new Map;Ee.set(n,s);const i=r.target??"self",l=s.get(i)??{},d=o+(r.offset??[]).join(",");return l[d]||(l[d]=!r.target&&lt()?new ScrollTimeline({source:n,axis:o}):_t({container:n,...r})),l[d]}function Ht(e,n){const r=Re(n);return e.attachTimeline({timeline:n.target?void 0:r,observe:o=>(o.pause(),Fe(s=>{o.time=o.duration*s},r))})}function Ot(e){return e.length===2}function It(e,n){return Ot(e)?De(r=>{e(r[n.axis].progress,r)},n):Fe(e,Re(n))}function Ft(e,{axis:n="y",container:r=document.scrollingElement,...o}={}){if(!r)return _e;const s={axis:n,container:r,...o};return typeof e=="function"?It(e,s):Ht(e,s)}function Me(e,n){ct(!!(!n||n.current))}const Dt=()=>({scrollX:$(0),scrollY:$(0),scrollXProgress:$(0),scrollYProgress:$(0)});function Rt({container:e,target:n,layoutEffect:r=!0,...o}={}){const s=H(Dt);return(r?He:h.useEffect)(()=>(Me("target",n),Me("container",e),Ft((l,{x:d,y:f})=>{s.scrollX.set(d.current),s.scrollXProgress.set(d.progress),s.scrollY.set(f.current),s.scrollYProgress.set(f.progress)},{...o,container:(e==null?void 0:e.current)||void 0,target:(n==null?void 0:n.current)||void 0})),[e,n,JSON.stringify(o.offset)]),s}function Ve(e){const n=H(()=>$(e)),{isStatic:r}=h.useContext(Oe);if(r){const[,o]=h.useState(e);h.useEffect(()=>n.on("change",o),[])}return n}function Pe(e,n){const r=Ve(n()),o=()=>r.set(n());return o(),He(()=>{const s=()=>C.preRender(o,!1,!0),i=e.map(l=>l.on("change",s));return()=>{i.forEach(l=>l()),_(o)}}),r}function Vt(e){T.current=[],e();const n=Pe(T.current,e);return T.current=void 0,n}function Pt(e,n,r,o){if(typeof e=="function")return Vt(e);const s=yt(n,r,o);return Array.isArray(e)?Te(e,s):Te([e],([i])=>s(i))}function Te(e,n){const r=H(()=>[]);return Pe(e,()=>{r.length=0;const o=e.length;for(let s=0;s<o;s++)r[s]=e[s].get();return n(r)})}function Ut(e,n={}){const{isStatic:r}=h.useContext(Oe),o=()=>Ae(e)?e.get():e;if(r)return Pt(o);const s=Ve(o());return h.useInsertionEffect(()=>kt(s,e,n),[s,JSON.stringify(n)]),s}function Kt({article:e,relatedArticles:n}){var R,V,P,U,Y,q,G,X,J,K,Q,Z,ee,te,re,ne,oe,se,ae,ie,le,ce,de,me,pe,fe,he,xe,ue,ge,be,ve,we,ye;const[r,o]=h.useState(()=>typeof window<"u"&&localStorage.getItem("monasbtk_lang")||"en"),[s,i]=h.useState(!1),[l,d]=h.useState(!1),f=h.useRef();h.useEffect(()=>{localStorage.setItem("monasbtk_lang",r)},[r]),h.useEffect(()=>{const c=b=>{f.current&&!f.current.contains(b.target)&&i(!1)};return document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[]);const{data:p,setData:x,post:u,processing:g,reset:k,errors:L}=Ke({content:"",author_name:""}),Ue=c=>{c.preventDefault(),u(route("comments.store",e.id),{onSuccess:()=>{k(),alert(r==="en"?"Comment submitted and awaiting approval!":"تم إرسال التعليق وبانتظار الموافقة!")}})},m={en:{by:"By",read:"min read",comments:"Comments",leaveComment:"Write a comment",name:"Your name",comment:"What are your thoughts?",submit:"Post Comment",related:"More from Monasbtk",noComments:"There are currently no comments for this article. Be the first to leave a comment.",home:"Home",blog:"Blog",submitting:"Publishing...",writtenBy:"Written by",backToBlog:"Back to blog",articleDetails:"Article details",quickActions:"Quick actions",published:"Published",readingTime:"Reading time",category:"Category",respectful:"Be respectful. Your comment will appear after approval.",authorBio:"Content creator at Monasbtk, sharing practical ideas, elegant inspiration, and thoughtful perspectives for your special occasions.",share:"Share Story"},ar:{by:"بقلم",read:"دقائق للقراءة",comments:"التعليقات",leaveComment:"اكتب تعليقاً",name:"اسمك",comment:"ما هي أفكارك؟",submit:"نشر",related:"المزيد من مناسبتك",noComments:"لا توجد تعليقات حالياً على هذا المقال. كن أول من يعلق.",home:"الرئيسية",blog:"المدونة",submitting:"جاري النشر...",writtenBy:"بقلم",backToBlog:"العودة للمدونة",articleDetails:"تفاصيل المقال",quickActions:"اختصارات",published:"نُشر في",readingTime:"وقت القراءة",category:"التصنيف",respectful:"يرجى كتابة تعليق محترم. سيظهر تعليقك بعد الموافقة.",authorBio:"كاتب محتوى في مناسبتك، يشارك أفكاراً عملية، وإلهاماً أنيقاً، ورؤى ملهمة تساعدك على صناعة مناسبات أجمل.",share:"مشاركة المقال"}},O=(c=>c?c.replace(/<[^>]*>/g,"").trim():"")((R=e.content)==null?void 0:R[r]),Ye=O?O.split(/\s+/).length:0,I=Math.max(1,Math.ceil(Ye/200)),F=c=>new Date(c).toLocaleDateString(r==="ar"?"ar-EG":"en-US",{month:"long",day:"numeric",year:"numeric"}),D=c=>new Date(c).toLocaleDateString(r==="ar"?"ar-EG":"en-US",{month:"short",day:"numeric"}),y=typeof window<"u"?window.location.href:"",a=r==="ar",M=h.useRef(null);h.useEffect(()=>{if(!M.current)return;M.current.querySelectorAll("img").forEach(b=>{b.setAttribute("loading","lazy"),b.setAttribute("decoding","async")})},[r,e.content]);const{scrollYProgress:qe}=Rt(),Ge=Ut(qe,{stiffness:100,damping:30,restDelta:.001}),Xe=()=>{navigator.clipboard.writeText(y),d(!0),setTimeout(()=>d(!1),2e3)},Je=()=>{navigator.clipboard.writeText(y),alert(r==="en"?"Link copied to clipboard! Share it on your Instagram story.":"تم نسخ رابط المقال! يمكنك الآن مشاركته في قصص إنستغرام.")};return t.jsxs("div",{dir:a?"rtl":"ltr",className:"blog-show-root",style:{background:"#fdf9fb",color:"#2a1f30"},children:[t.jsxs(Qe,{title:(V=e.title)==null?void 0:V[r],children:[t.jsx("meta",{name:"description",content:((P=e.short_description)==null?void 0:P[r])||((U=e.title)==null?void 0:U[r])}),t.jsx("meta",{property:"og:title",content:(Y=e.title)==null?void 0:Y[r]}),t.jsx("meta",{property:"og:description",content:((q=e.short_description)==null?void 0:q[r])||((G=e.title)==null?void 0:G[r])}),t.jsx("meta",{property:"og:type",content:"article"}),e.image&&t.jsx("meta",{property:"og:image",content:`/storage/${e.image}`}),t.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:(X=e.title)==null?void 0:X[r],description:((J=e.short_description)==null?void 0:J[r])||"",image:e.image?`/storage/${e.image}`:void 0,author:{"@type":"Person",name:(K=e.user)==null?void 0:K.name},datePublished:e.created_at,dateModified:e.updated_at||e.created_at,publisher:{"@type":"Organization",name:"Monasbtk"},mainEntityOfPage:{"@type":"WebPage","@id":y}})})]}),t.jsx("style",{children:`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .blog-show-root {
                    min-height: 100vh;
                    -webkit-font-smoothing: antialiased;
                }

                .progress-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 120;
                    height: 3.5px;
                    background: #794BC7;
                    transform-origin: left;
                }

                .nav {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    height: 68px;
                    background: rgba(253,249,251,0.85);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(121,75,199,0.13);
                }

                .nav-inner {
                    max-width: 1180px;
                    height: 100%;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .nav-left {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    min-width: 0;
                }

                .nav-logo {
                    font-size: 21px;
                    text-decoration: none;
                    flex-shrink: 0;
                }

                .crumbs {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    color: #b0909a;
                    white-space: nowrap;
                }

                .crumb-link {
                    color: #7a6070;
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .crumb-link:hover { color: #794BC7; }

                .nav-right {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .nav-back {
                    font-size: 13.5px;
                    color: #7a6070;
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .nav-back:hover { color: #794BC7; }

                .lang-btn {
                    height: 32px;
                    padding: 0 14px;
                    border-radius: 100px;
                    border: 1px solid rgba(121,75,199,0.2);
                    background: rgba(121,75,199,0.04);
                    font-size: 11px;
                    font-weight: 700;
                    color: #794BC7;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .lang-btn:hover {
                    background: rgba(121,75,199,0.08);
                    border-color: rgba(121,75,199,0.35);
                }

                .page-wrap {
                    max-width: 1180px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                .hero {
                    padding: 40px 0 24px;
                }

                .hero-card {
                    background: #fff;
                    border: 1px solid rgba(121,75,199,0.12);
                    border-radius: 28px;
                    padding: 40px;
                }

                .meta-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                }

                .cat-tag {
                    font-size: 11px;
                    font-weight: 600;
                    color: #794BC7;
                    background: rgba(121,75,199,0.07);
                    padding: 5px 12px;
                    border-radius: 100px;
                }

                .meta-date {
                    font-size: 13px;
                    color: #b0909a;
                }

                .hero-title {
                    font-size: clamp(28px, 5vw, 48px);
                    font-weight: 800;
                    line-height: 1.15;
                    color: #1e1520;
                    letter-spacing: -0.02em;
                    margin-bottom: 20px;
                    max-width: 950px;
                }

                .hero-sub {
                    font-size: 16px;
                    line-height: 1.8;
                    color: #7a6070;
                    font-weight: 400;
                    max-width: 800px;
                    margin-bottom: 28px;
                }

                .hero-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                    padding-top: 20px;
                    border-top: 1px solid rgba(121,75,199,0.12);
                }

                .author-wrap {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 0;
                }

                .avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FF157D, #794BC7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 15px;
                    font-weight: 700;
                    color: #fff;
                    flex-shrink: 0;
                }

                .author-meta { min-width: 0; }

                .author-label {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #b0909a;
                    margin-bottom: 3px;
                }

                .author-name {
                    font-size: 14.5px;
                    font-weight: 600;
                    color: #2a1f30;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .hero-stats {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    font-size: 13px;
                    color: #b0909a;
                }

                .sep {
                    color: rgba(192,80,122,0.3);
                    font-size: 12px;
                }

                .cover {
                    margin-top: 28px;
                    border-radius: 28px;
                    overflow: hidden;
                    max-height: 540px;
                    position: relative;
                    background: #f5ecf2;
                }
                .cover img {
                    width: 100%;
                    max-height: 540px;
                    object-fit: cover;
                    display: block;
                }
                .cover-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(30,21,32,0.1) 0%, transparent 60%);
                    pointer-events: none;
                }

                .content-area {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 280px;
                    gap: 56px;
                    padding: 36px 0 0;
                    align-items: start;
                }

                .article-main {
                    min-width: 0;
                }

                .prose-card,
                .tags-card,
                .author-card,
                .comment-form-card,
                .comment-card,
                .empty-card,
                .side-card,
                .related-card {
                    background: #fff;
                    border: 1px solid rgba(121,75,199,0.12);
                }

                .prose-card {
                    border-radius: 24px;
                    padding: 40px;
                }

                .article-prose {
                    font-size: 17.5px;
                    line-height: 1.95;
                    color: #3d2f3a;
                }
                .article-prose p { margin-bottom: 1.5em; }
                .article-prose h2,
                .article-prose h3,
                .article-prose h4 {
                    color: #1e1520;
                    font-weight: 800;
                    margin-top: 1.8em;
                    margin-bottom: 0.6em;
                    line-height: 1.25;
                }
                .article-prose h2 { font-size: clamp(24px, 3vw, 32px); }
                .article-prose h3 { font-size: clamp(20px, 2.4vw, 25px); }
                .article-prose h4 { font-size: clamp(17px, 2vw, 21px); }
                .article-prose a {
                    color: #794BC7;
                    text-decoration: none;
                    border-bottom: 1px solid rgba(121,75,199,0.3);
                    transition: border-color .15s;
                }
                .article-prose a:hover { border-color: #794BC7; }
                .article-prose strong { color: #1e1520; font-weight: 700; }
                .article-prose ul, .article-prose ol { padding-inline-start: 1.5rem; margin: 1.4em 0; }
                .article-prose li { margin: 0.55em 0; }
                .article-prose blockquote {
                    margin: 2.2em 0;
                    padding: 22px 26px;
                    border-radius: 20px;
                    background: linear-gradient(135deg, #FAF5FF, #F3E8FF);
                    color: #6e5867;
                    border-inline-start: 4px solid rgba(121,75,199,0.35);
                    font-style: italic;
                    font-size: 1.05em;
                }
                .article-prose img { width:100%; border-radius:20px; margin:2.2em 0; box-shadow:0 6px 28px rgba(121,75,199,0.06); content-visibility:auto; contain-intrinsic-size:auto 400px; }
                .article-prose pre { overflow-x:auto; background:#faf7f9; border:1px solid rgba(121,75,199,0.14); padding:18px; border-radius:16px; margin:1.6em 0; }
                .article-prose code { font-size:13.5px; background:#f7f0f4; padding:2px 7px; border-radius:6px; }
                .share-row { display:flex; align-items:center; gap:16px; padding:22px 0; border-top:1px solid rgba(121,75,199,0.12); margin-top:10px; }
                .share-label { font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#b0909a; }

                .section-box {
                    margin-top: 24px;
                    border-radius: 20px;
                    padding: 24px;
                }

                .tag-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .tag-pill {
                    padding: 8px 16px;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 600;
                    background: #f5ecf2;
                    color: #6a5060;
                    border: 1px solid rgba(121,75,199,0.18);
                }

                .author-card {
                    border-radius: 24px;
                    padding: 28px;
                }

                .author-card-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                }

                .author-avatar-large {
                    width: 68px;
                    height: 68px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FF157D, #794BC7);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    font-weight: 700;
                    flex-shrink: 0;
                }

                .author-card-name {
                    font-size: 20px;
                    font-weight: 800;
                    color: #1e1520;
                    margin-top: 4px;
                    margin-bottom: 8px;
                }

                .author-card-bio {
                    font-size: 14px;
                    line-height: 1.76;
                    color: #7a6070;
                }

                .sidebar {
                    position: sticky;
                    top: 108px;
                }

                .side-card {
                    border-radius: 24px;
                    padding: 24px;
                    margin-bottom: 20px;
                }

                .side-card-title {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #b0909a;
                    padding-bottom: 12px;
                    border-bottom: 1px solid rgba(121,75,199,0.14);
                    margin-bottom: 16px;
                }

                .side-list { display: grid; gap: 16px; }

                .side-item-label {
                    font-size: 12px;
                    color: #b0909a;
                    margin-bottom: 4px;
                }

                .side-item-value {
                    font-size: 13.5px;
                    color: #4a3848;
                    font-weight: 600;
                    line-height: 1.6;
                }

                .action-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 12px 20px;
                    border-radius: 100px;
                    text-decoration: none;
                    font-size: 13.5px;
                    font-weight: 600;
                    transition: all 0.2s;
                }

                .action-btn-primary {
                    background: #794BC7;
                    color: #fff;
                }

                .action-btn-primary:hover {
                    background: #6B00C9;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 16px rgba(121,75,199,0.15);
                }

                .action-btn-secondary {
                    margin-top: 10px;
                    color: #7a6070;
                    border: 1px solid rgba(121,75,199,0.22);
                    background: rgba(121,75,199,0.03);
                }

                .action-btn-secondary:hover {
                    color: #794BC7;
                    border-color: rgba(121,75,199,0.35);
                    background: rgba(121,75,199,0.05);
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 28px;
                }

                .section-label {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #794BC7;
                    flex-shrink: 0;
                }

                .section-rule {
                    flex: 1;
                    height: 1px;
                    background: rgba(121,75,199,0.18);
                }

                .related-section,
                .comments-section {
                    padding: 64px 0 0;
                }

                .related-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }

                .related-card {
                    display: block;
                    text-decoration: none;
                    color: inherit;
                    border-radius: 20px;
                    overflow: hidden;
                    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
                }

                .related-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(121,75,199,0.06);
                    border-color: rgba(121,75,199,0.22);
                }

                .related-media {
                    aspect-ratio: 16 / 10;
                    background: #f5ecf2;
                    overflow: hidden;
                }

                .related-media img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s;
                }

                .related-card:hover .related-media img { transform: scale(1.04); }

                .related-body {
                    padding: 18px;
                }

                .related-title {
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 1.45;
                    color: #1e1520;
                    margin-bottom: 10px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .related-meta {
                    font-size: 12px;
                    color: #b0909a;
                }

                .comment-form-card {
                    border-radius: 24px;
                    padding: 28px;
                    margin-bottom: 20px;
                }

                .comment-head {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .comment-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #f2e8ee;
                    color: #8a7080;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13.5px;
                    font-weight: 700;
                    flex-shrink: 0;
                }

                .input-clean,
                .textarea-clean {
                    width: 100%;
                    border: 1px solid rgba(121,75,199,0.15);
                    background: #fff;
                    color: #2a1f30;
                    outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s;
                }

                .input-clean {
                    height: 48px;
                    border-radius: 14px;
                    padding: 0 16px;
                    font-size: 14px;
                    margin-bottom: 14px;
                }

                .textarea-clean {
                    min-height: 120px;
                    border-radius: 16px;
                    padding: 16px;
                    font-size: 14px;
                    line-height: 1.76;
                    resize: vertical;
                }

                .input-clean:focus,
                .textarea-clean:focus {
                    border-color: rgba(121,75,199,0.35);
                    box-shadow: 0 0 0 3px rgba(121,75,199,0.08);
                }

                .comment-form-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 14px;
                    margin-top: 16px;
                    flex-wrap: wrap;
                }

                .comment-note {
                    font-size: 12.5px;
                    color: #b0909a;
                }

                .submit-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 12px 24px;
                    border-radius: 100px;
                    background: #794BC7;
                    color: #fff;
                    font-size: 13.5px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: background 0.18s, transform 0.18s, opacity 0.18s;
                }

                .submit-btn:hover:not(:disabled) {
                    background: #6B00C9;
                    transform: translateY(-1px);
                }

                .submit-btn:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
                }

                .error-text {
                    margin-top: 8px;
                    font-size: 12px;
                    color: #EF4444;
                }

                .comment-list {
                    display: grid;
                    gap: 16px;
                }

                .comment-card {
                    border-radius: 20px;
                    padding: 20px;
                }

                .comment-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                }

                .comment-name {
                    font-size: 14.5px;
                    font-weight: 700;
                    color: #2a1f30;
                }

                .comment-date {
                    font-size: 12px;
                    color: #b0909a;
                    margin-top: 2px;
                }

                .comment-content {
                    margin-top: 10px;
                    font-size: 14.5px;
                    line-height: 1.76;
                    color: #6f5a69;
                }

                .empty-card {
                    border-radius: 20px;
                    text-align: center;
                    padding: 48px 24px;
                }

                .empty-text {
                    font-size: 14px;
                    color: #8a7080;
                }

                @media (max-width: 1024px) {
                    .content-area { grid-template-columns: 1fr; gap: 32px; }
                    .sidebar { display: none; }
                    .related-grid { grid-template-columns: 1fr 1fr; }
                }

                @media (max-width: 640px) {
                    .nav-inner, .page-wrap { padding-left: 18px; padding-right: 18px; }
                    .crumbs, .nav-back { display: none; }
                    .hero { padding-top: 24px; }
                    .hero-card, .prose-card, .comment-form-card, .author-card { padding: 24px 20px; }
                    .hero-title { font-size: clamp(26px, 9vw, 36px); }
                    .article-prose { font-size: 16px; line-height: 1.85; }
                    .related-grid { grid-template-columns: 1fr; }
                }
            `}),t.jsx(v.div,{className:"progress-bar",style:{scaleX:Ge}}),t.jsx("nav",{className:"nav",children:t.jsxs("div",{className:"nav-inner",children:[t.jsxs("div",{className:"nav-left",children:[t.jsxs(j,{href:"/",className:"flex items-center gap-2",children:[t.jsx("img",{src:dt,alt:"Monasbtk Logo",className:"h-8 w-8",loading:"eager",decoding:"async"}),t.jsx("span",{className:`nav-logo font-extrabold bg-gradient-to-r from-[#FF157D] to-[#794BC7] bg-clip-text text-transparent ${a?"font-mikhak-bold":"font-outfit"}`,style:{margin:0},children:"Monasbtk"})]}),t.jsxs("div",{className:`crumbs font-semibold ${a?"font-mikhak-medium":"font-outfit"}`,children:[t.jsx(j,{href:"/",className:"crumb-link",children:m[r].home}),t.jsx("span",{className:"opacity-40",children:"/"}),t.jsx(j,{href:route("blog.index"),className:"crumb-link",children:m[r].blog})]})]}),t.jsxs("div",{className:"nav-right",children:[t.jsx(j,{href:route("blog.index"),className:`nav-back font-bold ${a?"font-mikhak-medium":"font-outfit"}`,children:m[r].backToBlog}),t.jsx("button",{className:`lang-btn ${a?"font-mikhak-bold":"font-outfit"}`,onClick:()=>o(a?"en":"ar"),children:a?"EN":"عربي"})]})]})}),t.jsxs("article",{className:"page-wrap",children:[t.jsxs("header",{className:"hero",children:[t.jsxs(v.div,{className:"hero-card shadow-sm",initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.4},children:[t.jsxs("div",{className:`meta-row ${a?"font-mikhak-medium":"font-outfit"}`,children:[((Z=(Q=e.category)==null?void 0:Q.title)==null?void 0:Z[r])&&t.jsx("span",{className:"cat-tag",children:e.category.title[r]}),t.jsx("span",{className:"meta-date",children:F(e.created_at)})]}),t.jsx("h1",{className:`hero-title ${a?"font-mikhak-bold":"font-outfit"}`,children:(ee=e.title)==null?void 0:ee[r]}),((te=e.short_description)==null?void 0:te[r])&&t.jsx("p",{className:`hero-sub ${a?"font-mikhak-regular":"font-outfit font-light"}`,children:e.short_description[r]}),t.jsxs("div",{className:"hero-footer",children:[t.jsxs("div",{className:"author-wrap",children:[t.jsx("div",{className:"avatar select-none",children:(oe=(ne=(re=e.user)==null?void 0:re.name)==null?void 0:ne.charAt(0))==null?void 0:oe.toUpperCase()}),t.jsxs("div",{className:`author-meta ${a?"font-mikhak-medium":"font-outfit"}`,children:[t.jsx("div",{className:"author-label",children:m[r].writtenBy}),t.jsx("div",{className:"author-name",children:(se=e.user)==null?void 0:se.name})]})]}),t.jsxs("div",{className:`hero-stats font-semibold ${a?"font-mikhak-regular":"font-outfit"}`,children:[t.jsxs("span",{children:[I," ",m[r].read]}),t.jsx("span",{className:"sep",children:"·"}),t.jsxs("a",{href:"#responses",className:"crumb-link",children:[((ae=e.comments)==null?void 0:ae.length)||0," ",m[r].comments]})]})]})]}),e.image&&t.jsxs(v.div,{className:"cover border border-purple-100/20",initial:{opacity:0,scale:.99},animate:{opacity:1,scale:1},transition:{duration:.5,delay:.1},children:[t.jsx(je,{src:`/storage/${e.image}`,alt:(ie=e.title)==null?void 0:ie[r],className:"w-full max-h-[540px] object-cover block",wrapperClassName:"w-full",wrapperStyle:{maxHeight:"540px"},rootMargin:400}),t.jsx("div",{className:"cover-overlay"})]})]}),t.jsxs("section",{className:"content-area",children:[t.jsxs("main",{className:"article-main",children:[t.jsx(v.div,{className:"prose-card shadow-sm",initial:{opacity:0},animate:{opacity:1},transition:{duration:.45,delay:.15},children:t.jsx("div",{ref:M,className:`article-prose ${a?"font-mikhak-regular":"font-outfit font-light"}`,style:{textAlign:a?"right":"left"},dangerouslySetInnerHTML:{__html:(le=e.content)==null?void 0:le[r]}})}),t.jsxs("div",{className:"share-row",children:[t.jsx("span",{className:`share-label ${a?"font-mikhak-bold":"font-outfit"}`,children:a?"مشاركة القصة":"Share story"}),t.jsxs("div",{className:"relative inline-block",ref:f,children:[t.jsxs("button",{onClick:()=>i(!s),className:`inline-flex items-center gap-2 px-5 py-3 rounded-full border border-purple-200/50 bg-white/70 text-slate-700 font-bold hover:bg-purple-50/50 transition-all select-none cursor-pointer text-sm shadow-sm ${a?"flex-row-reverse font-mikhak-medium":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 text-[#794BC7]",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l.09-.034a1.8 1.8 0 012.25 1.534l.002.138a1.8 1.8 0 01-1.39 1.764l-.952.184m0-3.586l-.089.034a1.8 1.8 0 00-2.25-1.534l-.002-.138a1.8 1.8 0 001.39-1.764l.952-.184M16.5 7.5a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm0 9a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z"})}),t.jsx("span",{children:m[r].share}),t.jsx("svg",{className:`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${s?"rotate-180":""}`,fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 8.25l-7.5 7.5-7.5-7.5"})})]}),t.jsx(mt,{children:s&&t.jsxs(v.div,{initial:{opacity:0,y:10,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.95},transition:{duration:.15},className:`absolute ${a?"left-0":"right-0"} mt-2 w-56 rounded-2xl bg-white border border-purple-100/60 shadow-xl z-50 p-2 space-y-1`,children:[t.jsxs("a",{href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(((ce=e.title)==null?void 0:ce[r])||"")}&url=${encodeURIComponent(y)}`,target:"_blank",rel:"noreferrer",className:`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${a?"flex-row-reverse font-mikhak-medium":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 fill-current flex-shrink-0",viewBox:"0 0 24 24",children:t.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),t.jsx("span",{className:"flex-1",children:"X"})]}),t.jsxs("a",{href:`https://api.whatsapp.com/send?text=${encodeURIComponent((((de=e.title)==null?void 0:de[r])||"")+" "+y)}`,target:"_blank",rel:"noreferrer",className:`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${a?"flex-row-reverse font-mikhak-medium":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 fill-current flex-shrink-0",viewBox:"0 0 24 24",children:t.jsx("path",{d:"M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-20.015c-.218-.485-.45-.495-.658-.504-.172-.008-.371-.008-.57-.008-.201 0-.53.075-.808.379-.278.303-1.062 1.036-1.062 2.529 0 1.493 1.085 2.932 1.236 3.134.152.203 2.137 3.262 5.176 4.57.717.309 1.278.493 1.716.633.722.23 1.381.197 1.902.12.579-.085 1.785-.73 2.039-1.436.254-.705.254-1.309.178-1.436-.076-.127-.278-.203-.579-.354s-1.785-.88-2.062-.98c-.278-.1-.48-.152-.68.152-.2.304-.778 1.037-.954 1.239-.176.202-.353.228-.654.077-.302-.151-1.272-.469-2.423-1.495-.895-.798-1.5-1.784-1.676-2.086-.176-.303-.019-.467.132-.617.136-.134.303-.354.454-.531.151-.177.202-.303.303-.505.101-.202.051-.379-.026-.53-.076-.153-.658-1.585-.9-2.17z"})}),t.jsx("span",{className:"flex-1",children:"WhatsApp"})]}),t.jsxs("button",{onClick:Je,className:`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer text-left ${a?"flex-row-reverse font-mikhak-medium text-right":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 fill-current flex-shrink-0",viewBox:"0 0 24 24",children:t.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"})}),t.jsx("span",{className:"flex-1",children:"Instagram"})]}),t.jsxs("a",{href:`https://threads.net/intent/post?text=${encodeURIComponent((((me=e.title)==null?void 0:me[r])||"")+" "+y)}`,target:"_blank",rel:"noreferrer",className:`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${a?"flex-row-reverse font-mikhak-medium":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 fill-current flex-shrink-0",viewBox:"0 0 24 24",children:t.jsx("path",{d:"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c3.158 0 6.012-1.22 8.125-3.218l-1.425-1.425A9.957 9.957 0 0 1 12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10c0 2.158-.698 3.51-1.636 4.364-.814.74-1.956.886-2.586.886-.786 0-1.782-.375-1.782-1.895V12c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5c1.47 0 2.76-.638 3.655-1.644C16.924 16.58 17.8 17 18.778 17c1.397 0 2.857-.698 3.75-2.07C23.473 13.565 24 12 24 12c0-6.627-5.373-12-12-12zm-3 12c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3z"})}),t.jsx("span",{className:"flex-1",children:"Threads"})]}),t.jsxs("a",{href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(y)}`,target:"_blank",rel:"noreferrer",className:`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${a?"flex-row-reverse font-mikhak-medium":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 fill-current flex-shrink-0",viewBox:"0 0 24 24",children:t.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})}),t.jsx("span",{className:"flex-1",children:"Facebook"})]}),t.jsx("div",{className:"h-px bg-purple-100/30 my-1"}),t.jsxs("button",{onClick:Xe,className:`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer text-left ${a?"flex-row-reverse font-mikhak-medium text-right":"font-outfit"}`,children:[t.jsxs("svg",{className:"w-4 h-4 flex-shrink-0",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:[t.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),t.jsx("path",{d:"M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"})]}),t.jsx("span",{className:"flex-1",children:l?a?"تم النسخ!":"Copied!":a?"نسخ الرابط":"Copy link"})]})]})})]})]}),t.jsx("div",{className:"tags-card section-box",children:t.jsx("div",{className:"tag-list",children:((fe=(pe=e.category)==null?void 0:pe.title)==null?void 0:fe[r])&&t.jsx("span",{className:`tag-pill ${a?"font-mikhak-bold":"font-outfit"}`,children:e.category.title[r]})})}),t.jsx(v.div,{className:"author-card shadow-sm",initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.4},children:t.jsxs("div",{className:"author-card-row",children:[t.jsx("div",{className:"author-avatar-large select-none",children:(ue=(xe=(he=e.user)==null?void 0:he.name)==null?void 0:xe.charAt(0))==null?void 0:ue.toUpperCase()}),t.jsxs("div",{children:[t.jsx("div",{className:`author-label ${a?"font-mikhak-bold":"font-outfit"}`,children:m[r].writtenBy}),t.jsx("h3",{className:`author-card-name ${a?"font-mikhak-bold":"font-outfit"}`,children:(ge=e.user)==null?void 0:ge.name}),t.jsx("p",{className:`author-card-bio ${a?"font-mikhak-regular":"font-outfit font-light"}`,children:m[r].authorBio})]})]})})]}),t.jsxs("aside",{className:"sidebar",children:[t.jsxs("div",{className:"side-card",children:[t.jsx("div",{className:`side-card-title ${a?"font-mikhak-bold":"font-outfit"}`,children:m[r].articleDetails}),t.jsxs("div",{className:`side-list ${a?"font-mikhak-regular":"font-outfit"}`,children:[t.jsxs("div",{children:[t.jsx("div",{className:"side-item-label",children:m[r].published}),t.jsx("div",{className:"side-item-value",children:F(e.created_at)})]}),t.jsxs("div",{children:[t.jsx("div",{className:"side-item-label",children:m[r].readingTime}),t.jsxs("div",{className:"side-item-value",children:[I," ",m[r].read]})]}),t.jsxs("div",{children:[t.jsx("div",{className:"side-item-label",children:m[r].category}),t.jsx("div",{className:"side-item-value",children:(ve=(be=e.category)==null?void 0:be.title)==null?void 0:ve[r]})]})]})]}),t.jsxs("div",{className:"side-card",children:[t.jsx("div",{className:`side-card-title ${a?"font-mikhak-bold":"font-outfit"}`,children:m[r].quickActions}),t.jsx("a",{href:"#responses",className:`action-btn action-btn-primary ${a?"font-mikhak-bold":"font-outfit"}`,children:m[r].leaveComment}),t.jsx(j,{href:route("blog.index"),className:`action-btn action-btn-secondary ${a?"font-mikhak-bold":"font-outfit"}`,children:m[r].backToBlog})]})]})]}),n&&n.length>0&&t.jsxs("section",{className:"related-section",children:[t.jsxs("div",{className:"section-header",children:[t.jsx("span",{className:`section-label ${a?"font-mikhak-bold":"font-outfit"}`,children:m[r].related}),t.jsx("div",{className:"section-rule"})]}),t.jsx("div",{className:"related-grid",children:n.map(c=>{var b,z;return t.jsxs(j,{href:route("blog.show",c.slug),className:"related-card border",children:[t.jsx("div",{className:"related-media",children:c.image?t.jsx(je,{src:`/storage/${c.image}`,alt:(b=c.title)==null?void 0:b[r],className:"w-full h-full object-cover transition-transform duration-500",wrapperClassName:"w-full h-full",rootMargin:300}):t.jsx("div",{style:{width:"100%",height:"100%",background:"#f5ecf2"}})}),t.jsxs("div",{className:"related-body",children:[t.jsx("div",{className:`related-title ${a?"font-mikhak-bold":"font-outfit"}`,children:(z=c.title)==null?void 0:z[r]}),t.jsx("div",{className:`related-meta ${a?"font-mikhak-regular":"font-outfit"}`,children:D(c.created_at)})]})]},c.id)})})]}),t.jsxs("section",{id:"responses",className:"comments-section pb-24",children:[t.jsxs("div",{className:"section-header flex items-center gap-2",children:[t.jsx("svg",{className:"w-5 h-5 text-[#794BC7] flex-shrink-0",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.625 9.75a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm4.5 0a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm4.5 0a.625.625 0 11-1.25 0 .625.625 0 011.25 0zM12 3c-4.97 0-9 3.582-9 8c0 1.947.766 3.72 2.032 5.097L3 21l4.896-1.632A10.158 10.158 0 0012 20c4.97 0 9-3.582 9-8s-4.03-8-9-8z"})}),t.jsxs("span",{className:`section-label ${a?"font-mikhak-bold":"font-outfit"}`,style:{display:"flex",alignItems:"center"},children:[m[r].comments," (",((we=e.comments)==null?void 0:we.length)||0,")"]}),t.jsx("div",{className:"section-rule"})]}),t.jsx(v.div,{className:"comment-form-card",initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0},children:t.jsxs("form",{onSubmit:Ue,children:[t.jsxs("div",{className:"comment-head",children:[t.jsx("div",{className:"comment-avatar font-bold select-none",style:{background:p.author_name?"linear-gradient(135deg,#FF157D,#794BC7)":void 0,color:p.author_name?"#fff":void 0},children:p.author_name?p.author_name.charAt(0).toUpperCase():"✍️"}),t.jsx("span",{className:`text-sm text-slate-500 font-bold ${a?"font-mikhak-medium":"font-outfit"}`,children:a?"شاركنا رأيك في المقال":"Share your thoughts on the story"})]}),t.jsx("input",{type:"text",className:`input-clean ${a?"font-mikhak-regular":"font-outfit"}`,placeholder:m[r].name,value:p.author_name,onChange:c=>x("author_name",c.target.value),required:!0}),t.jsx("textarea",{className:`textarea-clean ${a?"font-mikhak-regular":"font-outfit"}`,placeholder:m[r].comment,value:p.content,onChange:c=>x("content",c.target.value),required:!0,rows:"5"}),t.jsxs("div",{className:"comment-form-footer",children:[t.jsx("p",{className:`comment-note ${a?"font-mikhak-regular":"font-outfit"}`,children:m[r].respectful}),t.jsxs("button",{type:"submit",disabled:g||!p.content.trim()||!p.author_name.trim(),className:`submit-btn select-none flex items-center justify-center gap-2 ${a?"font-mikhak-bold flex-row-reverse":"font-outfit"}`,children:[t.jsx("span",{children:g?m[r].submitting:m[r].submit}),g?t.jsxs("svg",{className:"animate-spin w-4 h-4 text-white",fill:"none",viewBox:"0 0 24 24",children:[t.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),t.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 12 0 12 0v4a8 8 0 00-8 8H0z"})]}):t.jsx("svg",{className:`w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 ${a?"rotate-180":""}`,fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"})})]})]}),L.content&&t.jsx("p",{className:"error-text",children:L.content}),L.author_name&&t.jsx("p",{className:"error-text",children:L.author_name})]})}),t.jsxs("div",{className:"comment-list",children:[(ye=e.comments)==null?void 0:ye.map((c,b)=>{var z,ke;return t.jsx(v.div,{className:"comment-card",initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:b*.04},children:t.jsxs("div",{className:"comment-row",children:[t.jsx("div",{className:"avatar font-bold select-none w-10 h-10 text-sm",children:((ke=(z=c.author_name)==null?void 0:z.charAt(0))==null?void 0:ke.toUpperCase())||"G"}),t.jsxs("div",{style:{minWidth:0,flex:1},children:[t.jsx("div",{className:`comment-name ${a?"font-mikhak-bold":"font-outfit"}`,children:c.author_name}),t.jsx("div",{className:`comment-date ${a?"font-mikhak-regular":"font-outfit"}`,children:D(c.created_at)}),t.jsx("p",{className:`comment-content ${a?"font-mikhak-regular":"font-outfit font-light"}`,children:c.content})]})]})},c.id)}),(!e.comments||e.comments.length===0)&&t.jsx("div",{className:"empty-card",children:t.jsx("p",{className:`empty-text ${a?"font-mikhak-regular":"font-outfit"}`,children:m[r].noComments})})]})]})]})]})}export{Kt as default};
