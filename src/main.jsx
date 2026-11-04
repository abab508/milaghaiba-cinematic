import React, {useEffect,useState,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,AnimatePresence} from 'motion/react';
import './style.css';

const topics=[
 {fr:'La croyance',ar:'العقيدة',en:'Belief',desc:'Tawhid, foi, anges et prophètes',symbol:'☪',image:1},
 {fr:'L’adoration',ar:'العبادات',en:'Worship',desc:'Prière, jeûne, zakat et pèlerinage',symbol:'✧',image:3},
 {fr:'La vie du Prophète ﷺ',ar:'السيرة النبوية',en:'Life of the Prophet',desc:'Biographie et qualités',symbol:'۞',image:1},
 {fr:'Les relations',ar:'العلاقات',en:'Relationships',desc:'Famille, mariage et droits',symbol:'♡',image:5},
 {fr:'Les comportements',ar:'الأخلاق',en:'Conduct',desc:'Éthique, morale et bonnes actions',symbol:'❧',image:7},
 {fr:'Les signes de la fin des temps',ar:'أشراط الساعة',en:'Signs of the Last Hour',desc:'Événements et avertissements',symbol:'⌛',image:8},
 {fr:'La science',ar:'العلم',en:'Knowledge',desc:'Savoir et apprentissage',symbol:'✺',image:6},
 {fr:'Les maladies et remèdes',ar:'الطب والتداوي',en:'Health and remedies',desc:'Santé, guérison et prévention',symbol:'✿',image:2},
 {fr:'Autres thèmes',ar:'مواضيع أخرى',en:'Other themes',desc:'Invocations et lectures',symbol:'✧',image:4}
];
const endChapters=[
 ['Les signes mineurs','العلامات الصغرى','Minor signs',8],
 ['Les signes majeurs','العلامات الكبرى','Major signs',1],
 ['La venue du Dajjal','خروج الدجال','The Dajjal',8],
 ['La descente de ‘Issa','نزول عيسى','The return of Jesus',3],
 ['La fin du monde','نهاية العالم','The end of the world',8]
];
const books=[
 ['Sahih al-Bukhari','صحيح البخاري','#684221'],['Sahih Muslim','صحيح مسلم','#07564a'],['Sunan Abu Dawud','سنن أبي داود','#763a2a'],
 ['Jamiʿ at-Tirmidhi','جامع الترمذي','#33466d'],['Sunan an-Nasaʾi','سنن النسائي','#634633'],['Sunan Ibn Majah','سنن ابن ماجه','#31554a']
];
const messages={
 FR:{home:'Accueil',themes:'Thèmes',chapters:'Chapitres',index:'A–Z',books:'Recueils',title:'Les Hadiths',tagline:'Une lumière pour chaque époque',intro:'Explorez les enseignements à travers une bibliothèque immersive et interactive.',explore:'Commencer l’exploration',choose:'Choisissez un thème',chooseSub:'Explorez les chapitres selon vos centres d’intérêt',end:'Les signes de la fin des temps',endText:'Parcourez les grands événements et leurs chapitres. Les sources restent à vérifier avant publication.',prev:'Retour aux thèmes',read:'Lire le chapitre',tabIntro:'Introduction',tabHadith:'Hadiths',tabExplain:'Explications',tabSource:'Références',tabMedia:'Audio / Vidéo',sourceNotice:'Les textes et références authentifiées seront importés ici. Aucun hadith n’est inventé.',browse:'Navigation par chapitres',search:'Rechercher un chapitre ou un mot-clé…',az:'Index A – Z',azSub:'Accédez aux thèmes et chapitres par ordre alphabétique',collection:'Bibliothèque des recueils',open:'Ouvrir le recueil',close:'Fermer',page:'Page',previous:'Précédent',next:'Suivant',soundOff:'Son désactivé',soundOn:'Son activé',noResults:'Aucun résultat correspondant',welcome:'Sélectionnez une lettre ou recherchez un thème',navHint:'Choisissez un thème pour accéder à ses chapitres'},
 AR:{home:'الرئيسية',themes:'المواضيع',chapters:'الأبواب',index:'الفهرس',books:'المجموعات',title:'الأحاديث',tagline:'نور لكل عصر',intro:'استكشف تعاليم السنة النبوية ضمن مكتبة تفاعلية.',explore:'ابدأ الاستكشاف',choose:'اختر موضوعًا',chooseSub:'استكشف الأبواب حسب اهتماماتك',end:'أشراط الساعة',endText:'استكشف أبواب أشراط الساعة والمصادر بعد التحقق منها.',prev:'العودة إلى المواضيع',read:'افتح الباب',tabIntro:'مقدمة',tabHadith:'الأحاديث',tabExplain:'الشروح',tabSource:'المراجع',tabMedia:'صوت وفيديو',sourceNotice:'ستضاف النصوص والمراجع المحققة هنا. لا توجد أحاديث مختلقة.',browse:'تصفح الأبواب',search:'ابحث عن باب أو كلمة...',az:'الفهرس الأبجدي',azSub:'تصفح الموضوعات حسب الحروف',collection:'مكتبة المجموعات',open:'افتح الكتاب',close:'إغلاق',page:'صفحة',previous:'السابق',next:'التالي',soundOff:'الصوت متوقف',soundOn:'الصوت مفعل',noResults:'لا نتائج',welcome:'اختر حرفًا أو ابحث عن موضوع',navHint:'اختر موضوعًا لعرض أبوابه'},
 EN:{home:'Home',themes:'Themes',chapters:'Chapters',index:'A–Z',books:'Collections',title:'The Hadiths',tagline:'A light for every age',intro:'Explore the teachings through an immersive and interactive library.',explore:'Begin exploring',choose:'Choose a theme',chooseSub:'Explore chapters according to your interests',end:'Signs of the Last Hour',endText:'Explore the major events and chapters. Sources must be verified before publication.',prev:'Back to themes',read:'Read chapter',tabIntro:'Introduction',tabHadith:'Hadiths',tabExplain:'Explanations',tabSource:'References',tabMedia:'Audio / Video',sourceNotice:'Verified texts and references will appear here. No hadiths have been fabricated.',browse:'Browse chapters',search:'Search for a chapter or keyword…',az:'A–Z Index',azSub:'Browse themes and chapters alphabetically',collection:'Collection library',open:'Open collection',close:'Close',page:'Page',previous:'Previous',next:'Next',soundOff:'Sound off',soundOn:'Sound on',noResults:'No matching results',welcome:'Choose a letter or search for a theme',navHint:'Choose a theme to see its chapters'}
};
const routes=['home','themes','endtimes','detail','chapters','index','books'];
const cardAsset=n=>`/assets/cards/${n}.webp`;
const chaptersFor=(topic)=>topic===5?endChapters:([
 [topics[topic].fr,topics[topic].ar,topics[topic].en,topics[topic].image],
 ['Sources et recueils','المصادر والمجموعات','Sources and collections',6],
 ['Enseignements et explications','الفوائد والشروح','Teachings and commentary',7]
]);
function Sky(){return <div className="sky-movement" aria-hidden="true"><i/><i/><i/></div>}
function App(){
 const [page,setPage]=useState(()=>{const h=location.hash.slice(1);return routes.includes(h)?h:'home'});
 const [lang,setLang]=useState('FR');const t=messages[lang];const text=(x)=>x[lang==='AR'?'ar':lang==='EN'?'en':'fr'];
 const [topic,setTopic]=useState(5);const [chapter,setChapter]=useState(0);const [tab,setTab]=useState('intro');
 const [letter,setLetter]=useState('A');const [search,setSearch]=useState('');const [menu,setMenu]=useState(false);
 const [activeBook,setActiveBook]=useState(null);const [bookPage,setBookPage]=useState(0);const [paused,setPaused]=useState(false);
 const [audioEnabled,setAudioEnabled]=useState(false);const audio=useRef(null);
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function go(next){setPage(next);setMenu(false);history.pushState(null,'',`#${next}`);window.scrollTo({top:0,behavior:'instant'})}
 function pickTopic(i){setTopic(i);setChapter(0);go(i===5?'endtimes':'chapters')}
 function pickChapter(i){setChapter(i);setTab('intro');go('detail')}
 useEffect(()=>{const onHash=()=>{const h=location.hash.slice(1);if(routes.includes(h))setPage(h)};window.addEventListener('hashchange',onHash);return()=>window.removeEventListener('hashchange',onHash)},[]);
 useEffect(()=>{document.documentElement.lang=lang.toLowerCase();document.title=`${t.title} — Milaghaiba Cinematic`},[lang,t.title]);
 useEffect(()=>()=>{if(audio.current){audio.current.source.stop();audio.current.ctx.close()}},[]);
 async function toggleSound(){
  if(audioEnabled){setAudioEnabled(false);if(audio.current)audio.current.gain.gain.setTargetAtTime(.00001,audio.current.ctx.currentTime,.17);return}
  try{if(!audio.current){const C=window.AudioContext||window.webkitAudioContext;const ctx=new C();const buffer=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),a=buffer.getChannelData(0);let p=0;for(let i=0;i<a.length;i++){p=.86*p+.14*(Math.random()*2-1);a[i]=p}const source=ctx.createBufferSource();source.buffer=buffer;source.loop=true;const f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=650;const gain=ctx.createGain();gain.gain.value=.00001;source.connect(f).connect(gain).connect(ctx.destination);source.start();audio.current={ctx,source,gain}}await audio.current.ctx.resume();audio.current.gain.gain.setTargetAtTime(.012,audio.current.ctx.currentTime,.3);setAudioEnabled(true)}catch{setAudioEnabled(false)}
 }
 const menuItems=[['home','home'],['themes','themes'],['chapters','chapters'],['index','index'],['books','books']];
 const chapters=chaptersFor(topic);
 const labels=['intro','hadith','explain','source','media'];const tabLabels=[t.tabIntro,t.tabHadith,t.tabExplain,t.tabSource,t.tabMedia];
 const matching=topics.filter(x=>text(x).toLocaleLowerCase().includes(search.toLocaleLowerCase()));
 return <div className={'app '+(paused||reduced?'is-paused':'')} dir={lang==='AR'?'rtl':'ltr'}>
  <header className="site-head">
   <button className="site-logo" onClick={()=>go('home')} aria-label={t.home}><span className="logo-glyph">⌂</span><span>La Lumière<small>des Hadiths</small></span></button>
   <nav className={'head-nav '+(menu?'expanded':'')} aria-label="Navigation">{menuItems.map(([key,label])=><button key={key} className={key===page?'active':''} onClick={()=>go(key)}>{t[label]}</button>)}</nav>
   <div className="head-controls"><button title="Recherche" onClick={()=>go('index')} aria-label={t.search}>⌕</button><button title="Animer / Pause" onClick={()=>setPaused(v=>!v)} aria-pressed={paused}>{paused?'▶':'✦'}</button><select aria-label="Langue" value={lang} onChange={e=>setLang(e.target.value)}><option>FR</option><option>AR</option><option>EN</option></select><button className="mobile-toggle" onClick={()=>setMenu(v=>!v)} aria-label="Menu">☰</button></div>
  </header>
  <AnimatePresence mode="wait">
   <motion.main key={page} className={'scene scene-'+page} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced ? 0 : .32}}>
    <div className={'scene-art scene-art-'+page} aria-hidden="true"/><Sky/>
    {page==='home'&&<div className="home-layout"><div className="home-center"><p className="eyebrow">MILAGHAIBA · BIBLIOTHÈQUE DE HADITHS</p><h1>{t.title}</h1><h2>{t.tagline}</h2><p>{t.intro}</p><button className="gold-action" onClick={()=>go('themes')}>{t.explore} <span>→</span></button></div><div className="home-bottom"><span>✥ &nbsp; {t.collection}</span><span>✧ &nbsp; {t.az}</span><span>✧ &nbsp; {t.choose}</span></div></div>}
    {page==='themes'&&<div className="scene-content"><div className="intro-center"><p className="eyebrow">EXPLORATION THÉMATIQUE</p><h1>{t.choose}</h1><p>{t.chooseSub}</p></div><div className="theme-gallery">{topics.map((v,i)=><button key={v.fr} className="theme-tile" onClick={()=>pickTopic(i)}><img src={cardAsset(v.image)} alt="" loading={i>5?'lazy':'eager'}/><span className="tile-overlay"><span className="tile-symbol">{v.symbol}</span><strong>{text(v)}</strong><small>{v.desc}</small></span></button>)}</div></div>}
    {page==='endtimes'&&<div className="scene-content"><div className="inner-head"><button className="breadcrumb" onClick={()=>go('themes')}>‹ {t.prev}</button><p className="eyebrow">LES GRANDS CHAPITRES</p><h1>{t.end}</h1><p>{t.endText}</p></div><div className="event-grid">{endChapters.map((c,i)=><button className="event-card" key={i} onClick={()=>pickChapter(i)}><img src={cardAsset(c[3])} alt="" loading="lazy"/><span className="event-caption"><strong>{i+1}. {c[lang==='AR'?1:lang==='EN'?2:0]}</strong><small>{t.read} →</small></span></button>)}</div></div>}
    {page==='detail'&&<div className="detail-layout"><section className="detail-paper"><button className="breadcrumb" onClick={()=>go(topic===5?'endtimes':'chapters')}>‹ {t.prev}</button><p className="eyebrow">CHAPITRE {chapter+1}</p><h1>{chapters[chapter]?.[lang==='AR'?1:lang==='EN'?2:0]||t.chapters}</h1><p>{t.sourceNotice}</p><div className="detail-tabs" role="tablist">{labels.map((v,i)=><button key={v} role="tab" className={tab===v?'chosen':''} aria-selected={tab===v} onClick={()=>setTab(v)}>{tabLabels[i]}</button>)}</div><div className="detail-body"><h2>{tabLabels[labels.indexOf(tab)]}</h2><p>{t.sourceNotice}</p></div></section><aside className="detail-aside"><div className="detail-image"><img src={cardAsset(chapters[chapter]?.[3]||8)} alt=""/></div><h2>{t.chapters}</h2>{chapters.map((c,i)=><button key={i} onClick={()=>setChapter(i)} className={i===chapter?'current':''}>{i+1}. {c[lang==='AR'?1:lang==='EN'?2:0]} <span>›</span></button>)}</aside></div>}
    {page==='chapters'&&<div className="chapters-layout"><section className="chapters-sidebar"><p className="eyebrow">PARCOURS DE LECTURE</p><h1>{t.browse}</h1><form className="search-form" onSubmit={e=>e.preventDefault()}><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search} aria-label={t.search}/></form>{matching.length?matching.map(v=><button key={v.fr} onClick={()=>pickTopic(topics.indexOf(v))}><span className="mini-symbol">{v.symbol}</span>{text(v)}<span className="arrow">⌄</span></button>):<p>{t.noResults}</p>}</section><section className="chapters-visual"><div className="floating-photo"><img src={cardAsset(7)} alt=""/></div><p>{t.navHint}</p><button className="gold-action" onClick={()=>go('themes')}>{t.choose} →</button></section></div>}
    {page==='index'&&<div className="index-layout"><div className="index-panel"><p className="eyebrow">RECHERCHE & NAVIGATION</p><h1>{t.az}</h1><p>{t.azSub}</p><div className="alphabet-grid">{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(ch=><button key={ch} className={ch===letter?'chosen':''} onClick={()=>setLetter(ch)}>{ch}</button>)}</div><form className="search-form" onSubmit={e=>e.preventDefault()}><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search}/></form><div className="letter-results">{(search?matching:topics.filter(v=>text(v).toUpperCase().startsWith(letter))).map(v=><button key={v.fr} onClick={()=>pickTopic(topics.indexOf(v))}>{text(v)} ›</button>)}{!(search?matching:topics.filter(v=>text(v).toUpperCase().startsWith(letter))).length&&<p>{t.noResults}</p>}</div></div><aside className="index-matte" aria-hidden="true"><div className="index-arch"/><span>✦</span></aside></div>}
    {page==='books'&&<div className="books-layout"><div className="books-head"><p className="eyebrow">BIBLIOTHÈQUE DE RECUEILS</p><h1>{t.collection}</h1><p>{t.open}</p></div><div className="books-wall">{books.map((book,i)=><button key={i} className="antique-book" style={{'--cover':book[2]}} onClick={()=>{setActiveBook(i);setBookPage(0)}}><span className="book-sun">✺</span><strong>{book[0]}</strong><span lang="ar">{book[1]}</span><small>{t.open} ›</small></button>)}</div><AnimatePresence>{activeBook!==null&&<motion.div className="book-modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActiveBook(null)}><motion.section role="dialog" aria-modal="true" aria-label={books[activeBook][0]} className="open-book" initial={{scale:.85,rotateY:-18}} animate={{scale:1,rotateY:0}} transition={{duration:.55}} onClick={e=>e.stopPropagation()}><button className="book-close" onClick={()=>setActiveBook(null)}>×</button><div className="book-sheet"><section><p className="eyebrow">{books[activeBook][0]}</p><h2>{books[activeBook][1]}</h2><p>{t.sourceNotice}</p></section><section key={bookPage}><p className="eyebrow">{t.page} {bookPage+1}</p><h2>{t.chapters}</h2><p>{t.sourceNotice}</p></section></div><div className="book-pager"><button onClick={()=>setBookPage(v=>Math.max(0,v-1))}>{t.previous}</button><span>{t.page} {bookPage+1}</span><button onClick={()=>setBookPage(v=>v+1)}>{t.next}</button></div></motion.section></motion.div>}</AnimatePresence>}</div>}
   </motion.main>}
  </AnimatePresence>
  <footer className="site-foot"><span>La Lumière des Hadiths · Milaghaiba Cinematic</span><span>{t.sourceNotice}</span><button onClick={toggleSound}>{audioEnabled?'♫':'♪'} {audioEnabled?t.soundOn:t.soundOff}</button></footer>
 </div>
}

createRoot(document.getElementById('root')).render(<App/>);
