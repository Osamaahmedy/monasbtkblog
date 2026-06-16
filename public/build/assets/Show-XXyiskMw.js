import{r as h,v as pt,j as t,$ as ft,Y as j}from"./app-DSF6Tliu.js";import{r as ht,i as xt,f as C,c as H,b as Xe,d as Je,J as ut,p as gt,v as bt,e as wt,g as vt,h as yt,n as Ke,j as kt,s as jt,u as O,k as Qe,w as Nt,l as L,M as Ze,o as T,m as w,a as Ct}from"./monasbtk_colored_logo-BISzguAS.js";import{L as He}from"./LazyImage-hMGyejs7.js";import{A as zt}from"./index-lA8J-vVf.js";const E=new WeakMap;let v;const et=(e,r,n)=>(o,s)=>s&&s[0]?s[0][e+"Size"]:xt(o)&&"getBBox"in o?o.getBBox()[r]:o[n],Bt=et("inline","width","offsetWidth"),$t=et("block","height","offsetHeight");function Lt({target:e,borderBoxSize:r}){var n;(n=E.get(e))==null||n.forEach(o=>{o(e,{get width(){return Bt(e,r)},get height(){return $t(e,r)}})})}function St(e){e.forEach(Lt)}function Et(){typeof ResizeObserver>"u"||(v=new ResizeObserver(St))}function _t(e,r){v||Et();const n=ht(e);return n.forEach(o=>{let s=E.get(o);s||(s=new Set,E.set(o,s)),s.add(r),v==null||v.observe(o)}),()=>{n.forEach(o=>{const s=E.get(o);s==null||s.delete(r),s!=null&&s.size||v==null||v.unobserve(o)})}}const _=new Set;let N;function Mt(){N=()=>{const e={get width(){return window.innerWidth},get height(){return window.innerHeight}};_.forEach(r=>r(e))},window.addEventListener("resize",N)}function At(e){return _.add(e),N||Mt(),()=>{_.delete(e),!_.size&&typeof N=="function"&&(window.removeEventListener("resize",N),N=void 0)}}function Tt(e,r){return typeof e=="function"?At(e):_t(e,r)}function tt(e,r){let n;const o=()=>{const{currentTime:s}=r,l=(s===null?0:s.value)/100;n!==l&&e(l),n=l};return C.preUpdate(o,!0),()=>H(o)}function Wt(...e){const r=!Array.isArray(e[0]),n=r?0:-1,o=e[0+n],s=e[1+n],i=e[2+n],l=e[3+n],d=Xe(s,i,l);return r?d(o):d}function It(e,r,n){const o=e.get();let s=null,i=o,l;const d=typeof o=="string"?o.replace(/[\d.-]/g,""):void 0,f=()=>{s&&(s.stop(),s=null)},p=()=>{f(),s=new ut({keyframes:[Fe(e.get()),Fe(i)],velocity:e.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...n,onUpdate:l})};e.attach((u,g)=>(i=u,l=y=>g(Oe(y,d)),C.postRender(p),e.get()),f);let x;return Je(r)&&(x=r.on("change",u=>e.set(Oe(u,d))),e.on("destroy",x)),x}function Oe(e,r){return r?e+r:e}function Fe(e){return typeof e=="number"?e:parseFloat(e)}const Ht=50,De=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Ot=()=>({time:0,x:De(),y:De()}),Ft={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function Re(e,r,n,o){const s=n[r],{length:i,position:l}=Ft[r],d=s.current,f=n.time;s.current=e[`scroll${l}`],s.scrollLength=e[`scroll${i}`]-e[`client${i}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=gt(0,s.scrollLength,s.current);const p=o-f;s.velocity=p>Ht?0:bt(s.current-d,p)}function Dt(e,r,n){Re(e,"x",r,n),Re(e,"y",r,n),r.time=n}function Rt(e,r){const n={x:0,y:0};let o=e;for(;o&&o!==r;)if(wt(o))n.x+=o.offsetLeft,n.y+=o.offsetTop,o=o.offsetParent;else if(o.tagName==="svg"){const s=o.getBoundingClientRect();o=o.parentElement;const i=o.getBoundingClientRect();n.x+=s.left-i.left,n.y+=s.top-i.top}else if(o instanceof SVGGraphicsElement){const{x:s,y:i}=o.getBBox();n.x+=s,n.y+=i;let l=null,d=o.parentNode;for(;!l;)d.tagName==="svg"&&(l=d),d=o.parentNode;o=l}else break;return n}const I={start:0,center:.5,end:1};function Ve(e,r,n=0){let o=0;if(e in I&&(e=I[e]),typeof e=="string"){const s=parseFloat(e);e.endsWith("px")?o=s:e.endsWith("%")?e=s/100:e.endsWith("vw")?o=s/100*document.documentElement.clientWidth:e.endsWith("vh")?o=s/100*document.documentElement.clientHeight:e=s}return typeof e=="number"&&(o=r*e),n+o}const Vt=[0,0];function Pt(e,r,n,o){let s=Array.isArray(e)?e:Vt,i=0,l=0;return typeof e=="number"?s=[e,e]:typeof e=="string"&&(e=e.trim(),e.includes(" ")?s=e.split(" "):s=[e,I[e]?e:"0"]),i=Ve(s[0],n,o),l=Ve(s[1],r),i-l}const Ut={All:[[0,0],[1,1]]},Yt={x:0,y:0};function qt(e){return"getBBox"in e&&e.tagName!=="svg"?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function Gt(e,r,n){const{offset:o=Ut.All}=n,{target:s=e,axis:i="y"}=n,l=i==="y"?"height":"width",d=s!==e?Rt(s,e):Yt,f=s===e?{width:e.scrollWidth,height:e.scrollHeight}:qt(s),p={width:e.clientWidth,height:e.clientHeight};r[i].offset.length=0;let x=!r[i].interpolate;const u=o.length;for(let g=0;g<u;g++){const y=Pt(o[g],p[l],f[l],d[i]);!x&&y!==r[i].interpolatorOffsets[g]&&(x=!0),r[i].offset[g]=y}x&&(r[i].interpolate=Xe(r[i].offset,vt(o),{clamp:!1}),r[i].interpolatorOffsets=[...r[i].offset]),r[i].progress=yt(0,1,r[i].interpolate(r[i].current))}function Xt(e,r=e,n){if(n.x.targetOffset=0,n.y.targetOffset=0,r!==e){let o=r;for(;o&&o!==e;)n.x.targetOffset+=o.offsetLeft,n.y.targetOffset+=o.offsetTop,o=o.offsetParent}n.x.targetLength=r===e?r.scrollWidth:r.clientWidth,n.y.targetLength=r===e?r.scrollHeight:r.clientHeight,n.x.containerLength=e.clientWidth,n.y.containerLength=e.clientHeight}function Jt(e,r,n,o={}){return{measure:s=>{Xt(e,o.target,n),Dt(e,n,s),(o.offset||o.target)&&Gt(e,n,o)},notify:()=>r(n)}}const $=new WeakMap,Pe=new WeakMap,W=new WeakMap,Ue=e=>e===document.scrollingElement?window:e;function nt(e,{container:r=document.scrollingElement,...n}={}){if(!r)return Ke;let o=W.get(r);o||(o=new Set,W.set(r,o));const s=Ot(),i=Jt(r,e,s,n);if(o.add(i),!$.has(r)){const d=()=>{for(const u of o)u.measure(kt.timestamp);C.preUpdate(f)},f=()=>{for(const u of o)u.notify()},p=()=>C.read(d);$.set(r,p);const x=Ue(r);window.addEventListener("resize",p,{passive:!0}),r!==document.documentElement&&Pe.set(r,Tt(r,p)),x.addEventListener("scroll",p,{passive:!0}),p()}const l=$.get(r);return C.read(l,!1,!0),()=>{var p;H(l);const d=W.get(r);if(!d||(d.delete(i),d.size))return;const f=$.get(r);$.delete(r),f&&(Ue(r).removeEventListener("scroll",f),(p=Pe.get(r))==null||p(),window.removeEventListener("resize",f))}}const Ye=new Map;function Kt(e){const r={value:0},n=nt(o=>{r.value=o[e.axis].progress*100},e);return{currentTime:r,cancel:n}}function rt({source:e,container:r,...n}){const{axis:o}=n;e&&(r=e);const s=Ye.get(r)??new Map;Ye.set(r,s);const i=n.target??"self",l=s.get(i)??{},d=o+(n.offset??[]).join(",");return l[d]||(l[d]=!n.target&&jt()?new ScrollTimeline({source:r,axis:o}):Kt({container:r,...n})),l[d]}function Qt(e,r){const n=rt(r);return e.attachTimeline({timeline:r.target?void 0:n,observe:o=>(o.pause(),tt(s=>{o.time=o.duration*s},n))})}function Zt(e){return e.length===2}function en(e,r){return Zt(e)?nt(n=>{e(n[r.axis].progress,n)},r):tt(e,rt(r))}function tn(e,{axis:r="y",container:n=document.scrollingElement,...o}={}){if(!n)return Ke;const s={axis:r,container:n,...o};return typeof e=="function"?en(e,s):Qt(e,s)}function qe(e,r){Nt(!!(!r||r.current))}const nn=()=>({scrollX:L(0),scrollY:L(0),scrollXProgress:L(0),scrollYProgress:L(0)});function rn({container:e,target:r,layoutEffect:n=!0,...o}={}){const s=O(nn);return(n?Qe:h.useEffect)(()=>(qe("target",r),qe("container",e),tn((l,{x:d,y:f})=>{s.scrollX.set(d.current),s.scrollXProgress.set(d.progress),s.scrollY.set(f.current),s.scrollYProgress.set(f.progress)},{...o,container:(e==null?void 0:e.current)||void 0,target:(r==null?void 0:r.current)||void 0})),[e,r,JSON.stringify(o.offset)]),s}function ot(e){const r=O(()=>L(e)),{isStatic:n}=h.useContext(Ze);if(n){const[,o]=h.useState(e);h.useEffect(()=>r.on("change",o),[])}return r}function st(e,r){const n=ot(r()),o=()=>n.set(r());return o(),Qe(()=>{const s=()=>C.preRender(o,!1,!0),i=e.map(l=>l.on("change",s));return()=>{i.forEach(l=>l()),H(o)}}),n}function on(e){T.current=[],e();const r=st(T.current,e);return T.current=void 0,r}function sn(e,r,n,o){if(typeof e=="function")return on(e);const s=Wt(r,n,o);return Array.isArray(e)?Ge(e,s):Ge([e],([i])=>s(i))}function Ge(e,r){const n=O(()=>[]);return st(e,()=>{n.length=0;const o=e.length;for(let s=0;s<o;s++)n[s]=e[s].get();return r(n)})}function an(e,r={}){const{isStatic:n}=h.useContext(Ze),o=()=>Je(e)?e.get():e;if(n)return sn(o);const s=ot(o());return h.useInsertionEffect(()=>It(s,e,r),[s,JSON.stringify(r)]),s}function fn({article:e,relatedArticles:r}){var U,Y,q,G,X,J,K,Q,Z,ee,te,ne,re,oe,se,ae,ie,le,ce,de,me,pe,fe,he,xe,ue,ge,be,we,ve,ye,ke,je,Ne,Ce,ze,Be,$e,Le,Se,Ee,_e,Me,Ae,Te,We;const[n,o]=h.useState(()=>typeof window<"u"&&localStorage.getItem("monasbtk_lang")||"en"),[s,i]=h.useState(!1),[l,d]=h.useState(!1),f=h.useRef();h.useEffect(()=>{localStorage.setItem("monasbtk_lang",n)},[n]),h.useEffect(()=>{const c=b=>{f.current&&!f.current.contains(b.target)&&i(!1)};return document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[]);const{data:p,setData:x,post:u,processing:g,reset:y,errors:S}=pt({content:"",author_name:""}),at=c=>{c.preventDefault(),u(route("comments.store",e.id),{onSuccess:()=>{y(),alert(n==="en"?"Comment submitted and awaiting approval!":"تم إرسال التعليق وبانتظار الموافقة!")}})},m={en:{by:"By",read:"min read",comments:"Comments",leaveComment:"Write a comment",name:"Your name",comment:"What are your thoughts?",submit:"Post Comment",related:"More from Monasbtk",noComments:"There are currently no comments for this article. Be the first to leave a comment.",home:"Home",blog:"Blog",submitting:"Publishing...",writtenBy:"Written by",backToBlog:"Back to blog",articleDetails:"Article details",quickActions:"Quick actions",published:"Published",readingTime:"Reading time",category:"Category",respectful:"Be respectful. Your comment will appear after approval.",authorBio:"Content creator at Monasbtk, sharing practical ideas, elegant inspiration, and thoughtful perspectives for your special occasions.",share:"Share Story"},ar:{by:"بقلم",read:"دقائق للقراءة",comments:"التعليقات",leaveComment:"اكتب تعليقاً",name:"اسمك",comment:"ما هي أفكارك؟",submit:"نشر",related:"المزيد من مناسبتك",noComments:"لا توجد تعليقات حالياً على هذا المقال. كن أول من يعلق.",home:"الرئيسية",blog:"المدونة",submitting:"جاري النشر...",writtenBy:"بقلم",backToBlog:"العودة للمدونة",articleDetails:"تفاصيل المقال",quickActions:"اختصارات",published:"نُشر في",readingTime:"وقت القراءة",category:"التصنيف",respectful:"يرجى كتابة تعليق محترم. سيظهر تعليقك بعد الموافقة.",authorBio:"كاتب محتوى في مناسبتك، يشارك أفكاراً عملية، وإلهاماً أنيقاً، ورؤى ملهمة تساعدك على صناعة مناسبات أجمل.",share:"مشاركة المقال"}},F=(c=>c?c.replace(/<[^>]*>/g,"").trim():"")((U=e.content)==null?void 0:U[n]),it=F?F.split(/\s+/).length:0,D=Math.max(1,Math.ceil(it/200)),R=c=>new Date(c).toLocaleDateString(n==="ar"?"ar-EG":"en-US",{month:"long",day:"numeric",year:"numeric"}),V=c=>new Date(c).toLocaleDateString(n==="ar"?"ar-EG":"en-US",{month:"short",day:"numeric"}),k=typeof window<"u"?window.location.href:"",a=n==="ar",M=h.useRef(null),A=e.og_image||e.image,z=A?typeof window<"u"?`${window.location.origin}/storage/${A}`:`/storage/${A}`:"",P=((Y=e.image_alt)==null?void 0:Y[n])||((q=e.title)==null?void 0:q[n])||"";h.useEffect(()=>{if(!M.current)return;M.current.querySelectorAll("img").forEach(b=>{b.setAttribute("loading","lazy"),b.setAttribute("decoding","async")})},[n,e.content]);const{scrollYProgress:lt}=rn(),ct=an(lt,{stiffness:100,damping:30,restDelta:.001}),dt=()=>{navigator.clipboard.writeText(k),d(!0),setTimeout(()=>d(!1),2e3)},mt=()=>{navigator.clipboard.writeText(k),alert(n==="en"?"Link copied to clipboard! Share it on your Instagram story.":"تم نسخ رابط المقال! يمكنك الآن مشاركته في قصص إنستغرام.")};return t.jsxs("div",{dir:a?"rtl":"ltr",className:"blog-show-root",style:{background:"#fdf9fb",color:"#2a1f30"},children:[t.jsxs(ft,{title:((G=e.meta_title)==null?void 0:G[n])||((X=e.title)==null?void 0:X[n]),children:[t.jsx("meta",{name:"description",content:((J=e.meta_description)==null?void 0:J[n])||((K=e.short_description)==null?void 0:K[n])||((Q=e.title)==null?void 0:Q[n])}),t.jsx("link",{rel:"canonical",href:route("blog.show",e.slug)}),t.jsx("meta",{property:"og:type",content:"article"}),t.jsx("meta",{property:"og:title",content:((Z=e.meta_title)==null?void 0:Z[n])||((ee=e.title)==null?void 0:ee[n])}),t.jsx("meta",{property:"og:description",content:((te=e.meta_description)==null?void 0:te[n])||((ne=e.short_description)==null?void 0:ne[n])||((re=e.title)==null?void 0:re[n])}),t.jsx("meta",{property:"og:url",content:route("blog.show",e.slug)}),z&&t.jsx("meta",{property:"og:image",content:z}),t.jsx("meta",{property:"og:image:alt",content:P}),t.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),t.jsx("meta",{name:"twitter:title",content:((oe=e.meta_title)==null?void 0:oe[n])||((se=e.title)==null?void 0:se[n])}),t.jsx("meta",{name:"twitter:description",content:((ae=e.meta_description)==null?void 0:ae[n])||((ie=e.short_description)==null?void 0:ie[n])||((le=e.title)==null?void 0:le[n])}),z&&t.jsx("meta",{name:"twitter:image",content:z}),t.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:((ce=e.meta_title)==null?void 0:ce[n])||((de=e.title)==null?void 0:de[n]),description:((me=e.meta_description)==null?void 0:me[n])||((pe=e.short_description)==null?void 0:pe[n])||"",image:z||void 0,author:{"@type":"Person",name:(fe=e.user)==null?void 0:fe.name},datePublished:e.created_at,dateModified:e.updated_at||e.created_at,publisher:{"@type":"Organization",name:"Monasbtk",logo:{"@type":"ImageObject",url:typeof window<"u"?`${window.location.origin}/images/monasbtk_colored_logo.png`:""}},mainEntityOfPage:{"@type":"WebPage","@id":route("blog.show",e.slug)}})})]}),t.jsx("style",{children:`
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
            `}),t.jsx(w.div,{className:"progress-bar",style:{scaleX:ct}}),t.jsx("nav",{className:"nav",children:t.jsxs("div",{className:"nav-inner",children:[t.jsxs("div",{className:"nav-left",children:[t.jsxs(j,{href:"/",className:"flex items-center gap-2",children:[t.jsx("img",{src:Ct,alt:"Monasbtk Logo",className:"h-8 w-8",loading:"eager",decoding:"async"}),t.jsx("span",{className:`nav-logo font-extrabold bg-gradient-to-r from-[#FF157D] to-[#794BC7] bg-clip-text text-transparent ${a?"font-mikhak-bold":"font-outfit"}`,style:{margin:0},children:"Monasbtk"})]}),t.jsxs("div",{className:`crumbs font-semibold ${a?"font-mikhak-medium":"font-outfit"}`,children:[t.jsx(j,{href:"/",className:"crumb-link",children:m[n].home}),t.jsx("span",{className:"opacity-40",children:"/"}),t.jsx(j,{href:route("blog.index"),className:"crumb-link",children:m[n].blog})]})]}),t.jsxs("div",{className:"nav-right",children:[t.jsx(j,{href:route("blog.index"),className:`nav-back font-bold ${a?"font-mikhak-medium":"font-outfit"}`,children:m[n].backToBlog}),t.jsx("button",{className:`lang-btn ${a?"font-mikhak-bold":"font-outfit"}`,onClick:()=>o(a?"en":"ar"),children:a?"EN":"عربي"})]})]})}),t.jsxs("article",{className:"page-wrap",children:[t.jsxs("header",{className:"hero",children:[t.jsxs(w.div,{className:"hero-card shadow-sm",initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.4},children:[t.jsxs("div",{className:`meta-row ${a?"font-mikhak-medium":"font-outfit"}`,children:[((xe=(he=e.category)==null?void 0:he.title)==null?void 0:xe[n])&&t.jsx("span",{className:"cat-tag",children:e.category.title[n]}),t.jsx("span",{className:"meta-date",children:R(e.created_at)})]}),t.jsx("h1",{className:`hero-title ${a?"font-mikhak-bold":"font-outfit"}`,children:(ue=e.title)==null?void 0:ue[n]}),((ge=e.short_description)==null?void 0:ge[n])&&t.jsx("p",{className:`hero-sub ${a?"font-mikhak-regular":"font-outfit font-light"}`,children:e.short_description[n]}),t.jsxs("div",{className:"hero-footer",children:[t.jsxs("div",{className:"author-wrap",children:[t.jsx("div",{className:"avatar select-none",children:(ve=(we=(be=e.user)==null?void 0:be.name)==null?void 0:we.charAt(0))==null?void 0:ve.toUpperCase()}),t.jsxs("div",{className:`author-meta ${a?"font-mikhak-medium":"font-outfit"}`,children:[t.jsx("div",{className:"author-label",children:m[n].writtenBy}),t.jsx("div",{className:"author-name",children:(ye=e.user)==null?void 0:ye.name})]})]}),t.jsxs("div",{className:`hero-stats font-semibold ${a?"font-mikhak-regular":"font-outfit"}`,children:[t.jsxs("span",{children:[D," ",m[n].read]}),t.jsx("span",{className:"sep",children:"·"}),t.jsxs("a",{href:"#responses",className:"crumb-link",children:[((ke=e.comments)==null?void 0:ke.length)||0," ",m[n].comments]})]})]})]}),e.image&&t.jsxs(w.div,{className:"cover border border-purple-100/20",initial:{opacity:0,scale:.99},animate:{opacity:1,scale:1},transition:{duration:.5,delay:.1},children:[t.jsx(He,{src:`/storage/${e.image}`,alt:P,className:"w-full max-h-[540px] object-cover block",wrapperClassName:"w-full",wrapperStyle:{maxHeight:"540px"},rootMargin:400}),t.jsx("div",{className:"cover-overlay"})]})]}),t.jsxs("section",{className:"content-area",children:[t.jsxs("main",{className:"article-main",children:[t.jsx(w.div,{className:"prose-card shadow-sm",initial:{opacity:0},animate:{opacity:1},transition:{duration:.45,delay:.15},children:t.jsx("div",{ref:M,className:`article-prose ${a?"font-mikhak-regular":"font-outfit font-light"}`,style:{textAlign:a?"right":"left"},dangerouslySetInnerHTML:{__html:(je=e.content)==null?void 0:je[n]}})}),t.jsxs("div",{className:"share-row",children:[t.jsx("span",{className:`share-label ${a?"font-mikhak-bold":"font-outfit"}`,children:a?"مشاركة القصة":"Share story"}),t.jsxs("div",{className:"relative inline-block",ref:f,children:[t.jsxs("button",{onClick:()=>i(!s),className:`inline-flex items-center gap-2 px-5 py-3 rounded-full border border-purple-200/50 bg-white/70 text-slate-700 font-bold hover:bg-purple-50/50 transition-all select-none cursor-pointer text-sm shadow-sm ${a?"flex-row-reverse font-mikhak-medium":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 text-[#794BC7]",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l.09-.034a1.8 1.8 0 012.25 1.534l.002.138a1.8 1.8 0 01-1.39 1.764l-.952.184m0-3.586l-.089.034a1.8 1.8 0 00-2.25-1.534l-.002-.138a1.8 1.8 0 001.39-1.764l.952-.184M16.5 7.5a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm0 9a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z"})}),t.jsx("span",{children:m[n].share}),t.jsx("svg",{className:`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${s?"rotate-180":""}`,fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 8.25l-7.5 7.5-7.5-7.5"})})]}),t.jsx(zt,{children:s&&t.jsxs(w.div,{initial:{opacity:0,y:10,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.95},transition:{duration:.15},className:`absolute ${a?"left-0":"right-0"} mt-2 w-56 rounded-2xl bg-white border border-purple-100/60 shadow-xl z-50 p-2 space-y-1`,children:[t.jsxs("a",{href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(((Ne=e.title)==null?void 0:Ne[n])||"")}&url=${encodeURIComponent(k)}`,target:"_blank",rel:"noreferrer",className:`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${a?"flex-row-reverse font-mikhak-medium":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 fill-current flex-shrink-0",viewBox:"0 0 24 24",children:t.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),t.jsx("span",{className:"flex-1",children:"X"})]}),t.jsxs("a",{href:`https://api.whatsapp.com/send?text=${encodeURIComponent((((Ce=e.title)==null?void 0:Ce[n])||"")+" "+k)}`,target:"_blank",rel:"noreferrer",className:`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${a?"flex-row-reverse font-mikhak-medium":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 fill-current flex-shrink-0",viewBox:"0 0 24 24",children:t.jsx("path",{d:"M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-20.015c-.218-.485-.45-.495-.658-.504-.172-.008-.371-.008-.57-.008-.201 0-.53.075-.808.379-.278.303-1.062 1.036-1.062 2.529 0 1.493 1.085 2.932 1.236 3.134.152.203 2.137 3.262 5.176 4.57.717.309 1.278.493 1.716.633.722.23 1.381.197 1.902.12.579-.085 1.785-.73 2.039-1.436.254-.705.254-1.309.178-1.436-.076-.127-.278-.203-.579-.354s-1.785-.88-2.062-.98c-.278-.1-.48-.152-.68.152-.2.304-.778 1.037-.954 1.239-.176.202-.353.228-.654.077-.302-.151-1.272-.469-2.423-1.495-.895-.798-1.5-1.784-1.676-2.086-.176-.303-.019-.467.132-.617.136-.134.303-.354.454-.531.151-.177.202-.303.303-.505.101-.202.051-.379-.026-.53-.076-.153-.658-1.585-.9-2.17z"})}),t.jsx("span",{className:"flex-1",children:"WhatsApp"})]}),t.jsxs("button",{onClick:mt,className:`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer text-left ${a?"flex-row-reverse font-mikhak-medium text-right":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 fill-current flex-shrink-0",viewBox:"0 0 24 24",children:t.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"})}),t.jsx("span",{className:"flex-1",children:"Instagram"})]}),t.jsxs("a",{href:`https://threads.net/intent/post?text=${encodeURIComponent((((ze=e.title)==null?void 0:ze[n])||"")+" "+k)}`,target:"_blank",rel:"noreferrer",className:`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${a?"flex-row-reverse font-mikhak-medium":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 fill-current flex-shrink-0",viewBox:"0 0 24 24",children:t.jsx("path",{d:"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c3.158 0 6.012-1.22 8.125-3.218l-1.425-1.425A9.957 9.957 0 0 1 12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10c0 2.158-.698 3.51-1.636 4.364-.814.74-1.956.886-2.586.886-.786 0-1.782-.375-1.782-1.895V12c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5c1.47 0 2.76-.638 3.655-1.644C16.924 16.58 17.8 17 18.778 17c1.397 0 2.857-.698 3.75-2.07C23.473 13.565 24 12 24 12c0-6.627-5.373-12-12-12zm-3 12c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3z"})}),t.jsx("span",{className:"flex-1",children:"Threads"})]}),t.jsxs("a",{href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(k)}`,target:"_blank",rel:"noreferrer",className:`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer ${a?"flex-row-reverse font-mikhak-medium":"font-outfit"}`,children:[t.jsx("svg",{className:"w-4 h-4 fill-current flex-shrink-0",viewBox:"0 0 24 24",children:t.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})}),t.jsx("span",{className:"flex-1",children:"Facebook"})]}),t.jsx("div",{className:"h-px bg-purple-100/30 my-1"}),t.jsxs("button",{onClick:dt,className:`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 rounded-xl hover:bg-purple-50/50 hover:text-[#794BC7] transition-all cursor-pointer text-left ${a?"flex-row-reverse font-mikhak-medium text-right":"font-outfit"}`,children:[t.jsxs("svg",{className:"w-4 h-4 flex-shrink-0",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:[t.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),t.jsx("path",{d:"M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"})]}),t.jsx("span",{className:"flex-1",children:l?a?"تم النسخ!":"Copied!":a?"نسخ الرابط":"Copy link"})]})]})})]})]}),t.jsx("div",{className:"tags-card section-box",children:t.jsx("div",{className:"tag-list",children:(($e=(Be=e.category)==null?void 0:Be.title)==null?void 0:$e[n])&&t.jsx("span",{className:`tag-pill ${a?"font-mikhak-bold":"font-outfit"}`,children:e.category.title[n]})})}),t.jsx(w.div,{className:"author-card shadow-sm",initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.4},children:t.jsxs("div",{className:"author-card-row",children:[t.jsx("div",{className:"author-avatar-large select-none",children:(Ee=(Se=(Le=e.user)==null?void 0:Le.name)==null?void 0:Se.charAt(0))==null?void 0:Ee.toUpperCase()}),t.jsxs("div",{children:[t.jsx("div",{className:`author-label ${a?"font-mikhak-bold":"font-outfit"}`,children:m[n].writtenBy}),t.jsx("h3",{className:`author-card-name ${a?"font-mikhak-bold":"font-outfit"}`,children:(_e=e.user)==null?void 0:_e.name}),t.jsx("p",{className:`author-card-bio ${a?"font-mikhak-regular":"font-outfit font-light"}`,children:m[n].authorBio})]})]})})]}),t.jsxs("aside",{className:"sidebar",children:[t.jsxs("div",{className:"side-card",children:[t.jsx("div",{className:`side-card-title ${a?"font-mikhak-bold":"font-outfit"}`,children:m[n].articleDetails}),t.jsxs("div",{className:`side-list ${a?"font-mikhak-regular":"font-outfit"}`,children:[t.jsxs("div",{children:[t.jsx("div",{className:"side-item-label",children:m[n].published}),t.jsx("div",{className:"side-item-value",children:R(e.created_at)})]}),t.jsxs("div",{children:[t.jsx("div",{className:"side-item-label",children:m[n].readingTime}),t.jsxs("div",{className:"side-item-value",children:[D," ",m[n].read]})]}),t.jsxs("div",{children:[t.jsx("div",{className:"side-item-label",children:m[n].category}),t.jsx("div",{className:"side-item-value",children:(Ae=(Me=e.category)==null?void 0:Me.title)==null?void 0:Ae[n]})]})]})]}),t.jsxs("div",{className:"side-card",children:[t.jsx("div",{className:`side-card-title ${a?"font-mikhak-bold":"font-outfit"}`,children:m[n].quickActions}),t.jsx("a",{href:"#responses",className:`action-btn action-btn-primary ${a?"font-mikhak-bold":"font-outfit"}`,children:m[n].leaveComment}),t.jsx(j,{href:route("blog.index"),className:`action-btn action-btn-secondary ${a?"font-mikhak-bold":"font-outfit"}`,children:m[n].backToBlog})]})]})]}),r&&r.length>0&&t.jsxs("section",{className:"related-section",children:[t.jsxs("div",{className:"section-header",children:[t.jsx("span",{className:`section-label ${a?"font-mikhak-bold":"font-outfit"}`,children:m[n].related}),t.jsx("div",{className:"section-rule"})]}),t.jsx("div",{className:"related-grid",children:r.map(c=>{var b,B;return t.jsxs(j,{href:route("blog.show",c.slug),className:"related-card border",children:[t.jsx("div",{className:"related-media",children:c.image?t.jsx(He,{src:`/storage/${c.image}`,alt:(b=c.title)==null?void 0:b[n],className:"w-full h-full object-cover transition-transform duration-500",wrapperClassName:"w-full h-full",rootMargin:300}):t.jsx("div",{style:{width:"100%",height:"100%",background:"#f5ecf2"}})}),t.jsxs("div",{className:"related-body",children:[t.jsx("div",{className:`related-title ${a?"font-mikhak-bold":"font-outfit"}`,children:(B=c.title)==null?void 0:B[n]}),t.jsx("div",{className:`related-meta ${a?"font-mikhak-regular":"font-outfit"}`,children:V(c.created_at)})]})]},c.id)})})]}),t.jsxs("section",{id:"responses",className:"comments-section pb-24",children:[t.jsxs("div",{className:"section-header flex items-center gap-2",children:[t.jsx("svg",{className:"w-5 h-5 text-[#794BC7] flex-shrink-0",fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.625 9.75a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm4.5 0a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm4.5 0a.625.625 0 11-1.25 0 .625.625 0 011.25 0zM12 3c-4.97 0-9 3.582-9 8c0 1.947.766 3.72 2.032 5.097L3 21l4.896-1.632A10.158 10.158 0 0012 20c4.97 0 9-3.582 9-8s-4.03-8-9-8z"})}),t.jsxs("span",{className:`section-label ${a?"font-mikhak-bold":"font-outfit"}`,style:{display:"flex",alignItems:"center"},children:[m[n].comments," (",((Te=e.comments)==null?void 0:Te.length)||0,")"]}),t.jsx("div",{className:"section-rule"})]}),t.jsx(w.div,{className:"comment-form-card",initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0},children:t.jsxs("form",{onSubmit:at,children:[t.jsxs("div",{className:"comment-head",children:[t.jsx("div",{className:"comment-avatar font-bold select-none",style:{background:p.author_name?"linear-gradient(135deg,#FF157D,#794BC7)":void 0,color:p.author_name?"#fff":void 0},children:p.author_name?p.author_name.charAt(0).toUpperCase():"✍️"}),t.jsx("span",{className:`text-sm text-slate-500 font-bold ${a?"font-mikhak-medium":"font-outfit"}`,children:a?"شاركنا رأيك في المقال":"Share your thoughts on the story"})]}),t.jsx("input",{type:"text",className:`input-clean ${a?"font-mikhak-regular":"font-outfit"}`,placeholder:m[n].name,value:p.author_name,onChange:c=>x("author_name",c.target.value),required:!0}),t.jsx("textarea",{className:`textarea-clean ${a?"font-mikhak-regular":"font-outfit"}`,placeholder:m[n].comment,value:p.content,onChange:c=>x("content",c.target.value),required:!0,rows:"5"}),t.jsxs("div",{className:"comment-form-footer",children:[t.jsx("p",{className:`comment-note ${a?"font-mikhak-regular":"font-outfit"}`,children:m[n].respectful}),t.jsxs("button",{type:"submit",disabled:g||!p.content.trim()||!p.author_name.trim(),className:`submit-btn select-none flex items-center justify-center gap-2 ${a?"font-mikhak-bold flex-row-reverse":"font-outfit"}`,children:[t.jsx("span",{children:g?m[n].submitting:m[n].submit}),g?t.jsxs("svg",{className:"animate-spin w-4 h-4 text-white",fill:"none",viewBox:"0 0 24 24",children:[t.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),t.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 12 0 12 0v4a8 8 0 00-8 8H0z"})]}):t.jsx("svg",{className:`w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 ${a?"rotate-180":""}`,fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"})})]})]}),S.content&&t.jsx("p",{className:"error-text",children:S.content}),S.author_name&&t.jsx("p",{className:"error-text",children:S.author_name})]})}),t.jsxs("div",{className:"comment-list",children:[(We=e.comments)==null?void 0:We.map((c,b)=>{var B,Ie;return t.jsx(w.div,{className:"comment-card",initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:b*.04},children:t.jsxs("div",{className:"comment-row",children:[t.jsx("div",{className:"avatar font-bold select-none w-10 h-10 text-sm",children:((Ie=(B=c.author_name)==null?void 0:B.charAt(0))==null?void 0:Ie.toUpperCase())||"G"}),t.jsxs("div",{style:{minWidth:0,flex:1},children:[t.jsx("div",{className:`comment-name ${a?"font-mikhak-bold":"font-outfit"}`,children:c.author_name}),t.jsx("div",{className:`comment-date ${a?"font-mikhak-regular":"font-outfit"}`,children:V(c.created_at)}),t.jsx("p",{className:`comment-content ${a?"font-mikhak-regular":"font-outfit font-light"}`,children:c.content})]})]})},c.id)}),(!e.comments||e.comments.length===0)&&t.jsx("div",{className:"empty-card",children:t.jsx("p",{className:`empty-text ${a?"font-mikhak-regular":"font-outfit"}`,children:m[n].noComments})})]})]})]})]})}export{fn as default};
