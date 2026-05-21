import{r as x,v as Ie,j as n,$ as Re,Y as v}from"./app-Dfkvtt7R.js";import{r as Ye,i as Ue,f as j,c as B,a as ze,b as Se,J as $e,p as Fe,v as qe,d as Ge,e as Je,g as Xe,n as Ee,h as Ke,s as Qe,u as W,j as Me,w as Ze,k as S,M as Ce,l as D,m as y}from"./proxy-CYWtr4Ll.js";const M=new WeakMap;let h;const De=(e,r,t)=>(a,s)=>s&&s[0]?s[0][e+"Size"]:Ue(a)&&"getBBox"in a?a.getBBox()[r]:a[t],et=De("inline","width","offsetWidth"),tt=De("block","height","offsetHeight");function rt({target:e,borderBoxSize:r}){var t;(t=M.get(e))==null||t.forEach(a=>{a(e,{get width(){return et(e,r)},get height(){return tt(e,r)}})})}function nt(e){e.forEach(rt)}function at(){typeof ResizeObserver>"u"||(h=new ResizeObserver(nt))}function st(e,r){h||at();const t=Ye(e);return t.forEach(a=>{let s=M.get(a);s||(s=new Set,M.set(a,s)),s.add(r),h==null||h.observe(a)}),()=>{t.forEach(a=>{const s=M.get(a);s==null||s.delete(r),s!=null&&s.size||h==null||h.unobserve(a)})}}const C=new Set;let w;function it(){w=()=>{const e={get width(){return window.innerWidth},get height(){return window.innerHeight}};C.forEach(r=>r(e))},window.addEventListener("resize",w)}function ot(e){return C.add(e),w||it(),()=>{C.delete(e),!C.size&&typeof w=="function"&&(window.removeEventListener("resize",w),w=void 0)}}function ct(e,r){return typeof e=="function"?ot(e):st(e,r)}function Le(e,r){let t;const a=()=>{const{currentTime:s}=r,c=(s===null?0:s.value)/100;t!==c&&e(c),t=c};return j.preUpdate(a,!0),()=>B(a)}function lt(...e){const r=!Array.isArray(e[0]),t=r?0:-1,a=e[0+t],s=e[1+t],i=e[2+t],c=e[3+t],l=ze(s,i,c);return r?l(a):l}function dt(e,r,t){const a=e.get();let s=null,i=a,c;const l=typeof a=="string"?a.replace(/[\d.-]/g,""):void 0,m=()=>{s&&(s.stop(),s=null)},p=()=>{m(),s=new $e({keyframes:[xe(e.get()),xe(i)],velocity:e.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...t,onUpdate:c})};e.attach((o,f)=>(i=o,c=u=>f(he(u,l)),j.postRender(p),e.get()),m);let g;return Se(r)&&(g=r.on("change",o=>e.set(he(o,l))),e.on("destroy",g)),g}function he(e,r){return r?e+r:e}function xe(e){return typeof e=="number"?e:parseFloat(e)}const pt=50,ue=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),mt=()=>({time:0,x:ue(),y:ue()}),gt={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function be(e,r,t,a){const s=t[r],{length:i,position:c}=gt[r],l=s.current,m=t.time;s.current=e[`scroll${c}`],s.scrollLength=e[`scroll${i}`]-e[`client${i}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=Fe(0,s.scrollLength,s.current);const p=a-m;s.velocity=p>pt?0:qe(s.current-l,p)}function ft(e,r,t){be(e,"x",r,t),be(e,"y",r,t),r.time=t}function ht(e,r){const t={x:0,y:0};let a=e;for(;a&&a!==r;)if(Ge(a))t.x+=a.offsetLeft,t.y+=a.offsetTop,a=a.offsetParent;else if(a.tagName==="svg"){const s=a.getBoundingClientRect();a=a.parentElement;const i=a.getBoundingClientRect();t.x+=s.left-i.left,t.y+=s.top-i.top}else if(a instanceof SVGGraphicsElement){const{x:s,y:i}=a.getBBox();t.x+=s,t.y+=i;let c=null,l=a.parentNode;for(;!c;)l.tagName==="svg"&&(c=l),l=a.parentNode;a=c}else break;return t}const T={start:0,center:.5,end:1};function ye(e,r,t=0){let a=0;if(e in T&&(e=T[e]),typeof e=="string"){const s=parseFloat(e);e.endsWith("px")?a=s:e.endsWith("%")?e=s/100:e.endsWith("vw")?a=s/100*document.documentElement.clientWidth:e.endsWith("vh")?a=s/100*document.documentElement.clientHeight:e=s}return typeof e=="number"&&(a=r*e),t+a}const xt=[0,0];function ut(e,r,t,a){let s=Array.isArray(e)?e:xt,i=0,c=0;return typeof e=="number"?s=[e,e]:typeof e=="string"&&(e=e.trim(),e.includes(" ")?s=e.split(" "):s=[e,T[e]?e:"0"]),i=ye(s[0],t,a),c=ye(s[1],r),i-c}const bt={All:[[0,0],[1,1]]},yt={x:0,y:0};function vt(e){return"getBBox"in e&&e.tagName!=="svg"?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function wt(e,r,t){const{offset:a=bt.All}=t,{target:s=e,axis:i="y"}=t,c=i==="y"?"height":"width",l=s!==e?ht(s,e):yt,m=s===e?{width:e.scrollWidth,height:e.scrollHeight}:vt(s),p={width:e.clientWidth,height:e.clientHeight};r[i].offset.length=0;let g=!r[i].interpolate;const o=a.length;for(let f=0;f<o;f++){const u=ut(a[f],p[c],m[c],l[i]);!g&&u!==r[i].interpolatorOffsets[f]&&(g=!0),r[i].offset[f]=u}g&&(r[i].interpolate=ze(r[i].offset,Je(a),{clamp:!1}),r[i].interpolatorOffsets=[...r[i].offset]),r[i].progress=Xe(0,1,r[i].interpolate(r[i].current))}function jt(e,r=e,t){if(t.x.targetOffset=0,t.y.targetOffset=0,r!==e){let a=r;for(;a&&a!==e;)t.x.targetOffset+=a.offsetLeft,t.y.targetOffset+=a.offsetTop,a=a.offsetParent}t.x.targetLength=r===e?r.scrollWidth:r.clientWidth,t.y.targetLength=r===e?r.scrollHeight:r.clientHeight,t.x.containerLength=e.clientWidth,t.y.containerLength=e.clientHeight}function Nt(e,r,t,a={}){return{measure:s=>{jt(e,a.target,t),ft(e,t,s),(a.offset||a.target)&&wt(e,t,a)},notify:()=>r(t)}}const z=new WeakMap,ve=new WeakMap,L=new WeakMap,we=e=>e===document.scrollingElement?window:e;function Te(e,{container:r=document.scrollingElement,...t}={}){if(!r)return Ee;let a=L.get(r);a||(a=new Set,L.set(r,a));const s=mt(),i=Nt(r,e,s,t);if(a.add(i),!z.has(r)){const l=()=>{for(const o of a)o.measure(Ke.timestamp);j.preUpdate(m)},m=()=>{for(const o of a)o.notify()},p=()=>j.read(l);z.set(r,p);const g=we(r);window.addEventListener("resize",p,{passive:!0}),r!==document.documentElement&&ve.set(r,ct(r,p)),g.addEventListener("scroll",p,{passive:!0}),p()}const c=z.get(r);return j.read(c,!1,!0),()=>{var p;B(c);const l=L.get(r);if(!l||(l.delete(i),l.size))return;const m=z.get(r);z.delete(r),m&&(we(r).removeEventListener("scroll",m),(p=ve.get(r))==null||p(),window.removeEventListener("resize",m))}}const je=new Map;function kt(e){const r={value:0},t=Te(a=>{r.value=a[e.axis].progress*100},e);return{currentTime:r,cancel:t}}function Be({source:e,container:r,...t}){const{axis:a}=t;e&&(r=e);const s=je.get(r)??new Map;je.set(r,s);const i=t.target??"self",c=s.get(i)??{},l=a+(t.offset??[]).join(",");return c[l]||(c[l]=!t.target&&Qe()?new ScrollTimeline({source:r,axis:a}):kt({container:r,...t})),c[l]}function zt(e,r){const t=Be(r);return e.attachTimeline({timeline:r.target?void 0:t,observe:a=>(a.pause(),Le(s=>{a.time=a.duration*s},t))})}function St(e){return e.length===2}function Et(e,r){return St(e)?Te(t=>{e(t[r.axis].progress,t)},r):Le(e,Be(r))}function Mt(e,{axis:r="y",container:t=document.scrollingElement,...a}={}){if(!t)return Ee;const s={axis:r,container:t,...a};return typeof e=="function"?Et(e,s):zt(e,s)}function Ne(e,r){Ze(!!(!r||r.current))}const Ct=()=>({scrollX:S(0),scrollY:S(0),scrollXProgress:S(0),scrollYProgress:S(0)});function Dt({container:e,target:r,layoutEffect:t=!0,...a}={}){const s=W(Ct);return(t?Me:x.useEffect)(()=>(Ne("target",r),Ne("container",e),Mt((c,{x:l,y:m})=>{s.scrollX.set(l.current),s.scrollXProgress.set(l.progress),s.scrollY.set(m.current),s.scrollYProgress.set(m.progress)},{...a,container:(e==null?void 0:e.current)||void 0,target:(r==null?void 0:r.current)||void 0})),[e,r,JSON.stringify(a.offset)]),s}function We(e){const r=W(()=>S(e)),{isStatic:t}=x.useContext(Ce);if(t){const[,a]=x.useState(e);x.useEffect(()=>r.on("change",a),[])}return r}function _e(e,r){const t=We(r()),a=()=>t.set(r());return a(),Me(()=>{const s=()=>j.preRender(a,!1,!0),i=e.map(c=>c.on("change",s));return()=>{i.forEach(c=>c()),B(a)}}),t}function Lt(e){D.current=[],e();const r=_e(D.current,e);return D.current=void 0,r}function Tt(e,r,t,a){if(typeof e=="function")return Lt(e);const s=lt(r,t,a);return Array.isArray(e)?ke(e,s):ke([e],([i])=>s(i))}function ke(e,r){const t=W(()=>[]);return _e(e,()=>{t.length=0;const a=e.length;for(let s=0;s<a;s++)t[s]=e[s].get();return r(t)})}function Bt(e,r={}){const{isStatic:t}=x.useContext(Ce),a=()=>Se(e)?e.get():e;if(t)return Tt(a);const s=We(a());return x.useInsertionEffect(()=>dt(s,e,r),[s,JSON.stringify(r)]),s}function At({article:e,relatedArticles:r}){var H,P,V,I,R,Y,U,$,F,q,G,J,X,K,Q,Z,ee,te,re,ne,ae,se,ie,oe,ce,le,de,pe,me,ge,fe;const[t,a]=x.useState(()=>typeof window<"u"&&localStorage.getItem("monasbtk_lang")||"en");x.useEffect(()=>{localStorage.setItem("monasbtk_lang",t)},[t]);const{data:s,setData:i,post:c,processing:l,reset:m,errors:p}=Ie({content:"",author_name:""}),g=d=>{d.preventDefault(),c(route("comments.store",e.id),{onSuccess:()=>{m(),alert(t==="en"?"Comment submitted and awaiting approval!":"تم إرسال التعليق وبانتظار الموافقة!")}})},o={en:{by:"By",read:"min read",comments:"Responses",leaveComment:"Write a response",name:"Your name",comment:"What are your thoughts?",submit:"Respond",related:"More from Monasbtk",noComments:"There are currently no responses for this story. Be the first to respond.",home:"Home",blog:"Blog",submitting:"Publishing...",writtenBy:"Written by",backToBlog:"Back to blog",articleDetails:"Article details",quickActions:"Quick actions",published:"Published",readingTime:"Reading time",category:"Category",respectful:"Be respectful. Your response will appear after approval.",authorBio:"Content creator at Monasbtk, sharing practical ideas, elegant inspiration, and thoughtful perspectives for your special occasions."},ar:{by:"بقلم",read:"دقائق للقراءة",comments:"الردود",leaveComment:"اكتب رداً",name:"اسمك",comment:"ما هي أفكارك؟",submit:"إرسال",related:"المزيد من مناسبتك",noComments:"لا توجد ردود حالياً على هذه القصة. كن أول من يرد.",home:"الرئيسية",blog:"المدونة",submitting:"جاري النشر...",writtenBy:"بقلم",backToBlog:"العودة للمدونة",articleDetails:"تفاصيل المقال",quickActions:"اختصارات",published:"نُشر في",readingTime:"وقت القراءة",category:"التصنيف",respectful:"يرجى كتابة رد محترم. سيظهر تعليقك بعد المراجعة.",authorBio:"كاتب محتوى في مناسبتك، يشارك أفكاراً عملية، وإلهاماً أنيقاً، ورؤى ملهمة تساعدك على صناعة مناسبات أجمل."}},f=d=>d?d.replace(/<[^>]*>/g,"").trim():"",u=f((H=e.content)==null?void 0:H[t]),Ae=u?u.split(/\s+/).length:0,_=Math.max(1,Math.ceil(Ae/200)),Oe=d=>{const b=f(d);return Math.max(1,Math.ceil((b?b.split(/\s+/).length:100)/200))},A=d=>new Date(d).toLocaleDateString(t==="ar"?"ar-EG":"en-US",{month:"long",day:"numeric",year:"numeric"}),O=d=>new Date(d).toLocaleDateString(t==="ar"?"ar-EG":"en-US",{month:"short",day:"numeric"}),He=typeof window<"u"?window.location.href:"",E=t==="ar",{scrollYProgress:Pe}=Dt(),Ve=Bt(Pe,{stiffness:100,damping:30,restDelta:.001});return n.jsxs("div",{dir:E?"rtl":"ltr",className:"blog-show-root",children:[n.jsxs(Re,{title:(P=e.title)==null?void 0:P[t],children:[n.jsx("meta",{name:"description",content:((V=e.short_description)==null?void 0:V[t])||((I=e.title)==null?void 0:I[t])}),n.jsx("meta",{property:"og:title",content:(R=e.title)==null?void 0:R[t]}),n.jsx("meta",{property:"og:description",content:((Y=e.short_description)==null?void 0:Y[t])||((U=e.title)==null?void 0:U[t])}),n.jsx("meta",{property:"og:type",content:"article"}),e.image&&n.jsx("meta",{property:"og:image",content:`/storage/${e.image}`}),n.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:($=e.title)==null?void 0:$[t],description:((F=e.short_description)==null?void 0:F[t])||"",image:e.image?`/storage/${e.image}`:void 0,author:{"@type":"Person",name:(q=e.user)==null?void 0:q.name},datePublished:e.created_at,dateModified:e.updated_at||e.created_at,publisher:{"@type":"Organization",name:"Monasbtk"},mainEntityOfPage:{"@type":"WebPage","@id":He}})})]}),n.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .blog-show-root {
                    min-height: 100vh;
                    background: #fdf8fb;
                    color: #2a2030;
                    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                .progress-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 120;
                    height: 3px;
                    background: linear-gradient(90deg, #d4608a, #c0507a);
                    transform-origin: left;
                }

                .nav {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    height: 62px;
                    background: rgba(253,248,251,0.92);
                    backdrop-filter: blur(14px);
                    border-bottom: 1px solid rgba(200,140,170,0.15);
                }

                .nav-inner {
                    max-width: 1180px;
                    height: 100%;
                    margin: 0 auto;
                    padding: 0 28px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .nav-left {
                    display: flex;
                    align-items: center;
                    gap: 18px;
                    min-width: 0;
                }

                .nav-logo {
                    font-family: 'DM Serif Display', serif;
                    font-size: 21px;
                    font-weight: 400;
                    color: #2a2030;
                    text-decoration: none;
                    letter-spacing: -0.2px;
                    transition: color 0.18s;
                    flex-shrink: 0;
                }

                .nav-logo:hover { color: #c0507a; }

                .crumbs {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12.5px;
                    color: #9a7f8f;
                    white-space: nowrap;
                }

                .crumb-link {
                    color: #7a6070;
                    text-decoration: none;
                    transition: color 0.15s;
                }

                .crumb-link:hover { color: #c0507a; }

                .nav-right {
                    display: flex;
                    align-items: center;
                    gap: 18px;
                }

                .nav-back {
                    font-size: 13px;
                    color: #7a6070;
                    text-decoration: none;
                    transition: color 0.15s;
                }

                .nav-back:hover { color: #c0507a; }

                .lang-btn {
                    height: 32px;
                    padding: 0 14px;
                    border-radius: 100px;
                    border: 1px solid rgba(192,80,122,0.2);
                    background: rgba(192,80,122,0.04);
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    color: #c0507a;
                    cursor: pointer;
                    transition: all 0.15s;
                }

                .lang-btn:hover {
                    background: rgba(192,80,122,0.09);
                    border-color: rgba(192,80,122,0.35);
                }

                .page-wrap {
                    max-width: 1180px;
                    margin: 0 auto;
                    padding: 0 28px;
                }

                .hero {
                    padding: 40px 0 24px;
                }

                .hero-card {
                    background: #fff;
                    border: 1px solid rgba(200,140,170,0.12);
                    border-radius: 22px;
                    padding: 34px 34px 30px;
                }

                .meta-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-bottom: 16px;
                }

                .cat-tag {
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.05em;
                    color: #c0507a;
                    background: rgba(192,80,122,0.07);
                    padding: 5px 11px;
                    border-radius: 100px;
                }

                .meta-date {
                    font-size: 12.5px;
                    color: #b0909a;
                }

                .hero-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: clamp(32px, 5vw, 52px);
                    font-weight: 400;
                    line-height: 1.12;
                    color: #1e1520;
                    letter-spacing: -0.025em;
                    margin-bottom: 16px;
                    max-width: 900px;
                }

                .hero-sub {
                    font-size: 16px;
                    line-height: 1.85;
                    color: #7a6070;
                    font-weight: 300;
                    max-width: 760px;
                    margin-bottom: 24px;
                }

                .hero-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    flex-wrap: wrap;
                    padding-top: 18px;
                    border-top: 1px solid rgba(200,140,170,0.12);
                }

                .author-wrap {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    min-width: 0;
                }

                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #d4608a, #e088b4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 600;
                    color: #fff;
                    flex-shrink: 0;
                }

                .author-meta { min-width: 0; }

                .author-label {
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #b0909a;
                    margin-bottom: 3px;
                }

                .author-name {
                    font-size: 14px;
                    font-weight: 500;
                    color: #2a2030;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .hero-stats {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    font-size: 12.5px;
                    color: #b0909a;
                }

                .sep {
                    color: rgba(192,80,122,0.3);
                    font-size: 12px;
                }

                .cover {
                    margin-top: 22px;
                }

                .cover-frame {
                    background: #fff;
                    border: 1px solid rgba(200,140,170,0.12);
                    border-radius: 18px;
                    padding: 10px;
                }

                .cover-inner {
                    overflow: hidden;
                    border-radius: 12px;
                    background: #f5ecf2;
                }

                .cover-inner img {
                    width: 100%;
                    max-height: 560px;
                    object-fit: cover;
                    display: block;
                }

                .content-area {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 280px;
                    gap: 52px;
                    padding: 34px 0 0;
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
                    border: 1px solid rgba(200,140,170,0.12);
                }

                .prose-card {
                    border-radius: 20px;
                    padding: 34px;
                }

                .article-prose {
                    font-size: 17px;
                    line-height: 1.95;
                    color: #4b3c47;
                }

                .article-prose p { margin-bottom: 1.35em; }
                .article-prose h2,
                .article-prose h3,
                .article-prose h4 {
                    font-family: 'DM Serif Display', serif;
                    color: #1e1520;
                    font-weight: 400;
                    letter-spacing: -0.02em;
                    margin-top: 1.8em;
                    margin-bottom: 0.55em;
                    line-height: 1.3;
                }

                .article-prose h2 { font-size: clamp(26px, 3vw, 32px); }
                .article-prose h3 { font-size: clamp(21px, 2.4vw, 25px); }
                .article-prose h4 { font-size: clamp(18px, 2vw, 21px); }

                .article-prose a {
                    color: #c0507a;
                    text-decoration: none;
                    border-bottom: 1px solid rgba(192,80,122,0.28);
                }

                .article-prose strong {
                    color: #1e1520;
                    font-weight: 600;
                }

                .article-prose ul,
                .article-prose ol {
                    padding-inline-start: 1.25rem;
                    margin: 1.2em 0;
                }

                .article-prose li { margin: 0.45em 0; }

                .article-prose blockquote {
                    margin: 2em 0;
                    padding: 18px 20px;
                    border-radius: 16px;
                    background: #faf4f7;
                    color: #6e5867;
                    border-inline-start: 3px solid rgba(192,80,122,0.22);
                }

                .article-prose img {
                    width: 100%;
                    border-radius: 16px;
                    margin: 2em 0;
                }

                .article-prose pre {
                    overflow-x: auto;
                    background: #faf7f9;
                    border: 1px solid rgba(200,140,170,0.12);
                    padding: 16px;
                    border-radius: 14px;
                    margin: 1.4em 0;
                }

                .article-prose code {
                    font-size: 14px;
                    background: #f7f0f4;
                    padding: 2px 6px;
                    border-radius: 6px;
                }

                .section-box {
                    margin-top: 22px;
                    border-radius: 18px;
                    padding: 22px;
                }

                .tag-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .tag-pill {
                    padding: 7px 14px;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 500;
                    background: #f5ecf2;
                    color: #6a5060;
                    border: 1px solid rgba(200,140,170,0.18);
                }

                .author-card {
                    border-radius: 20px;
                    padding: 22px;
                }

                .author-card-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                }

                .author-avatar-large {
                    width: 62px;
                    height: 62px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #d4608a, #e088b4);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .author-card-name {
                    font-family: 'DM Serif Display', serif;
                    font-size: 23px;
                    color: #1e1520;
                    margin-top: 4px;
                    margin-bottom: 8px;
                }

                .author-card-bio {
                    font-size: 14px;
                    line-height: 1.8;
                    color: #7a6070;
                    font-weight: 300;
                }

                .sidebar {
                    position: sticky;
                    top: 98px;
                }

                .side-card {
                    border-radius: 18px;
                    padding: 20px;
                    margin-bottom: 18px;
                }

                .side-card-title {
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #b0909a;
                    padding-bottom: 12px;
                    border-bottom: 1px solid rgba(200,140,170,0.14);
                    margin-bottom: 14px;
                }

                .side-list { display: grid; gap: 14px; }

                .side-item-label {
                    font-size: 12px;
                    color: #b0909a;
                    margin-bottom: 4px;
                }

                .side-item-value {
                    font-size: 13.5px;
                    color: #4a3848;
                    font-weight: 500;
                    line-height: 1.6;
                }

                .action-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 11px 18px;
                    border-radius: 100px;
                    text-decoration: none;
                    font-size: 13px;
                    font-weight: 500;
                    transition: all 0.18s;
                }

                .action-btn-primary {
                    background: #c0507a;
                    color: #fff;
                }

                .action-btn-primary:hover {
                    background: #aa4068;
                    transform: translateY(-1px);
                }

                .action-btn-secondary {
                    margin-top: 10px;
                    color: #7a6070;
                    border: 1px solid rgba(200,140,170,0.22);
                    background: rgba(192,80,122,0.03);
                }

                .action-btn-secondary:hover {
                    color: #c0507a;
                    border-color: rgba(192,80,122,0.35);
                    background: rgba(192,80,122,0.05);
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 24px;
                }

                .section-label {
                    font-size: 10.5px;
                    font-weight: 600;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #c0507a;
                    flex-shrink: 0;
                }

                .section-rule {
                    flex: 1;
                    height: 1px;
                    background: rgba(200,140,170,0.18);
                }

                .related-section,
                .comments-section {
                    padding: 58px 0 0;
                }

                .related-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                }

                .related-card {
                    display: block;
                    text-decoration: none;
                    color: inherit;
                    border-radius: 18px;
                    overflow: hidden;
                    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
                }

                .related-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 24px rgba(192,80,122,0.08);
                    border-color: rgba(192,80,122,0.22);
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
                    transition: transform 0.35s;
                }

                .related-card:hover .related-media img { transform: scale(1.03); }

                .related-body {
                    padding: 16px;
                }

                .related-title {
                    font-family: 'DM Serif Display', serif;
                    font-size: 17px;
                    line-height: 1.45;
                    color: #1e1520;
                    margin-bottom: 8px;
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
                    border-radius: 20px;
                    padding: 24px;
                    margin-bottom: 18px;
                }

                .comment-head {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                }

                .comment-avatar {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background: #f2e8ee;
                    color: #8a7080;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .input-clean,
                .textarea-clean {
                    width: 100%;
                    border: 1px solid rgba(200,140,170,0.15);
                    background: #fff;
                    color: #2a2030;
                    font-family: 'DM Sans', sans-serif;
                    outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s;
                }

                .input-clean {
                    height: 46px;
                    border-radius: 14px;
                    padding: 0 14px;
                    font-size: 14px;
                    margin-bottom: 12px;
                }

                .textarea-clean {
                    min-height: 120px;
                    border-radius: 16px;
                    padding: 14px;
                    font-size: 14px;
                    line-height: 1.8;
                    resize: vertical;
                }

                .input-clean:focus,
                .textarea-clean:focus {
                    border-color: rgba(192,80,122,0.35);
                    box-shadow: 0 0 0 3px rgba(192,80,122,0.08);
                }

                .comment-form-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 14px;
                    margin-top: 14px;
                    flex-wrap: wrap;
                }

                .comment-note {
                    font-size: 12px;
                    color: #b0909a;
                }

                .submit-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 11px 20px;
                    border-radius: 100px;
                    background: #c0507a;
                    color: #fff;
                    font-size: 13px;
                    font-weight: 500;
                    border: none;
                    cursor: pointer;
                    transition: background 0.18s, transform 0.18s, opacity 0.18s;
                }

                .submit-btn:hover:not(:disabled) {
                    background: #aa4068;
                    transform: translateY(-1px);
                }

                .submit-btn:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
                }

                .error-text {
                    margin-top: 8px;
                    font-size: 12px;
                    color: #b93e67;
                }

                .comment-list {
                    display: grid;
                    gap: 14px;
                }

                .comment-card {
                    border-radius: 18px;
                    padding: 18px;
                }

                .comment-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }

                .comment-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #2a2030;
                }

                .comment-date {
                    font-size: 12px;
                    color: #b0909a;
                    margin-top: 2px;
                }

                .comment-content {
                    margin-top: 8px;
                    font-size: 14px;
                    line-height: 1.8;
                    color: #6f5a69;
                }

                .empty-card {
                    border-radius: 18px;
                    text-align: center;
                    padding: 42px 22px;
                }

                .empty-text {
                    font-size: 14px;
                    color: #8a7080;
                }

                @media (max-width: 1024px) {
                    .content-area { grid-template-columns: 1fr; gap: 28px; }
                    .sidebar { display: none; }
                    .related-grid { grid-template-columns: 1fr 1fr; }
                }

                @media (max-width: 640px) {
                    .nav-inner, .page-wrap { padding-left: 18px; padding-right: 18px; }
                    .crumbs, .nav-back { display: none; }
                    .hero { padding-top: 24px; }
                    .hero-card, .prose-card, .comment-form-card, .author-card { padding: 22px 18px; }
                    .hero-title { font-size: clamp(28px, 9vw, 40px); }
                    .article-prose { font-size: 16px; line-height: 1.9; }
                    .related-grid { grid-template-columns: 1fr; }
                    .cover-frame { padding: 8px; }
                }
            `}),n.jsx(y.div,{className:"progress-bar",style:{scaleX:Ve}}),n.jsx("nav",{className:"nav",children:n.jsxs("div",{className:"nav-inner",children:[n.jsxs("div",{className:"nav-left",children:[n.jsx(v,{href:"/",className:"nav-logo",children:"Monasbtk"}),n.jsxs("div",{className:"crumbs",children:[n.jsx(v,{href:"/",className:"crumb-link",children:o[t].home}),n.jsx("span",{children:"/"}),n.jsx(v,{href:route("blog.index"),className:"crumb-link",children:o[t].blog})]})]}),n.jsxs("div",{className:"nav-right",children:[n.jsx(v,{href:route("blog.index"),className:"nav-back",children:o[t].backToBlog}),n.jsx("button",{className:"lang-btn",onClick:()=>a(E?"en":"ar"),children:E?"En":"ع"})]})]})}),n.jsxs("article",{className:"page-wrap",children:[n.jsxs("header",{className:"hero",children:[n.jsxs(y.div,{className:"hero-card",initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.4},children:[n.jsxs("div",{className:"meta-row",children:[((J=(G=e.category)==null?void 0:G.title)==null?void 0:J[t])&&n.jsx("span",{className:"cat-tag",children:e.category.title[t]}),n.jsx("span",{className:"meta-date",children:A(e.created_at)})]}),n.jsx("h1",{className:"hero-title",children:(X=e.title)==null?void 0:X[t]}),((K=e.short_description)==null?void 0:K[t])&&n.jsx("p",{className:"hero-sub",children:e.short_description[t]}),n.jsxs("div",{className:"hero-footer",children:[n.jsxs("div",{className:"author-wrap",children:[n.jsx("div",{className:"avatar",children:(ee=(Z=(Q=e.user)==null?void 0:Q.name)==null?void 0:Z.charAt(0))==null?void 0:ee.toUpperCase()}),n.jsxs("div",{className:"author-meta",children:[n.jsx("div",{className:"author-label",children:o[t].writtenBy}),n.jsx("div",{className:"author-name",children:(te=e.user)==null?void 0:te.name})]})]}),n.jsxs("div",{className:"hero-stats",children:[n.jsxs("span",{children:[_," ",o[t].read]}),n.jsx("span",{className:"sep",children:"·"}),n.jsxs("a",{href:"#responses",className:"crumb-link",children:[((re=e.comments)==null?void 0:re.length)||0," ",o[t].comments]})]})]})]}),e.image&&n.jsx(y.div,{className:"cover",initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.45,delay:.08},children:n.jsx("div",{className:"cover-frame",children:n.jsx("div",{className:"cover-inner",children:n.jsx("img",{src:`/storage/${e.image}`,alt:(ne=e.title)==null?void 0:ne[t]})})})})]}),n.jsxs("section",{className:"content-area",children:[n.jsxs("main",{className:"article-main",children:[n.jsx(y.div,{className:"prose-card",initial:{opacity:0},animate:{opacity:1},transition:{duration:.45,delay:.15},children:n.jsx("div",{className:"article-prose",style:{textAlign:E?"right":"left"},dangerouslySetInnerHTML:{__html:(ae=e.content)==null?void 0:ae[t]}})}),n.jsx("div",{className:"tags-card section-box",children:n.jsx("div",{className:"tag-list",children:((ie=(se=e.category)==null?void 0:se.title)==null?void 0:ie[t])&&n.jsx("span",{className:"tag-pill",children:e.category.title[t]})})}),n.jsx(y.div,{className:"author-card",initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.4},children:n.jsxs("div",{className:"author-card-row",children:[n.jsx("div",{className:"author-avatar-large",children:(le=(ce=(oe=e.user)==null?void 0:oe.name)==null?void 0:ce.charAt(0))==null?void 0:le.toUpperCase()}),n.jsxs("div",{children:[n.jsx("div",{className:"author-label",children:o[t].writtenBy}),n.jsx("h3",{className:"author-card-name",children:(de=e.user)==null?void 0:de.name}),n.jsx("p",{className:"author-card-bio",children:o[t].authorBio})]})]})})]}),n.jsxs("aside",{className:"sidebar",children:[n.jsxs("div",{className:"side-card",children:[n.jsx("div",{className:"side-card-title",children:o[t].articleDetails}),n.jsxs("div",{className:"side-list",children:[n.jsxs("div",{children:[n.jsx("div",{className:"side-item-label",children:o[t].published}),n.jsx("div",{className:"side-item-value",children:A(e.created_at)})]}),n.jsxs("div",{children:[n.jsx("div",{className:"side-item-label",children:o[t].readingTime}),n.jsxs("div",{className:"side-item-value",children:[_," ",o[t].read]})]}),n.jsxs("div",{children:[n.jsx("div",{className:"side-item-label",children:o[t].category}),n.jsx("div",{className:"side-item-value",children:(me=(pe=e.category)==null?void 0:pe.title)==null?void 0:me[t]})]})]})]}),n.jsxs("div",{className:"side-card",children:[n.jsx("div",{className:"side-card-title",children:o[t].quickActions}),n.jsx("a",{href:"#responses",className:"action-btn action-btn-primary",children:o[t].leaveComment}),n.jsx(v,{href:route("blog.index"),className:"action-btn action-btn-secondary",children:o[t].backToBlog})]})]})]}),r&&r.length>0&&n.jsxs("section",{className:"related-section",children:[n.jsxs("div",{className:"section-header",children:[n.jsx("span",{className:"section-label",children:o[t].related}),n.jsx("div",{className:"section-rule"})]}),n.jsx("div",{className:"related-grid",children:r.map(d=>{var b,N,k;return n.jsxs(v,{href:route("blog.show",d.slug),className:"related-card",children:[n.jsx("div",{className:"related-media",children:d.image?n.jsx("img",{src:`/storage/${d.image}`,alt:(b=d.title)==null?void 0:b[t]}):n.jsx("div",{style:{width:"100%",height:"100%",background:"#f5ecf2"}})}),n.jsxs("div",{className:"related-body",children:[n.jsx("div",{className:"related-title",children:(N=d.title)==null?void 0:N[t]}),n.jsxs("div",{className:"related-meta",children:[O(d.created_at)," · ",Oe((k=d.content)==null?void 0:k[t])," ",o[t].read]})]})]},d.id)})})]}),n.jsxs("section",{id:"responses",className:"comments-section",children:[n.jsxs("div",{className:"section-header",children:[n.jsxs("span",{className:"section-label",children:[o[t].comments," (",((ge=e.comments)==null?void 0:ge.length)||0,")"]}),n.jsx("div",{className:"section-rule"})]}),n.jsx(y.div,{className:"comment-form-card",initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0},children:n.jsxs("form",{onSubmit:g,children:[n.jsx("div",{className:"comment-head",children:n.jsx("div",{className:"comment-avatar",children:s.author_name?s.author_name.charAt(0).toUpperCase():"?"})}),n.jsx("input",{type:"text",className:"input-clean",placeholder:o[t].name,value:s.author_name,onChange:d=>i("author_name",d.target.value),required:!0}),n.jsx("textarea",{className:"textarea-clean",placeholder:o[t].comment,value:s.content,onChange:d=>i("content",d.target.value),required:!0,rows:"5"}),n.jsxs("div",{className:"comment-form-footer",children:[n.jsx("p",{className:"comment-note",children:o[t].respectful}),n.jsx("button",{type:"submit",disabled:l||!s.content.trim()||!s.author_name.trim(),className:"submit-btn",children:l?o[t].submitting:o[t].submit})]}),p.content&&n.jsx("p",{className:"error-text",children:p.content}),p.author_name&&n.jsx("p",{className:"error-text",children:p.author_name})]})}),n.jsxs("div",{className:"comment-list",children:[(fe=e.comments)==null?void 0:fe.map((d,b)=>{var N,k;return n.jsx(y.div,{className:"comment-card",initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:b*.04},children:n.jsxs("div",{className:"comment-row",children:[n.jsx("div",{className:"comment-avatar",children:((k=(N=d.author_name)==null?void 0:N.charAt(0))==null?void 0:k.toUpperCase())||"G"}),n.jsxs("div",{style:{minWidth:0,flex:1},children:[n.jsx("div",{className:"comment-name",children:d.author_name}),n.jsx("div",{className:"comment-date",children:O(d.created_at)}),n.jsx("p",{className:"comment-content",children:d.content})]})]})},d.id)}),(!e.comments||e.comments.length===0)&&n.jsx("div",{className:"empty-card",children:n.jsx("p",{className:"empty-text",children:o[t].noComments})})]})]})]})]})}export{At as default};
