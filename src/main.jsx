import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion } from 'motion/react';
import './style.css';

const copy = {
 fr: { home:'Accueil',themes:'Thèmes',chapters:'Chapitres',index:'A–Z',search:'Recherche',
 title:'Les Hadiths',subtitle:'Une lumière pour chaque époque',
 description:'Explorez l’ensemble des enseignements du Prophète ﷺ\nà travers une expérience immersive et interactive.',
 action:"Commencer l’exploration",collections:'+90 recueils',alphabet:'A à Z',variety:'Thèmes variés',navigation:'Navigation intuitive',
 explore:'Choisissez un thème',exploreDetail:'Explorez les chapitres selon vos centres d’intérêt',back:'Retour à l’accueil',queryPlaceholder:'Rechercher un thème…',noResults:'Aucun thème trouvé',
 categories:['La croyance','L’adoration','La vie du Prophète ﷺ','Les relations','Les comportements','Les signes de la fin des temps','La science','Les maladies et remèdes','Autres thèmes'],
 soundOn:'Activer le son',soundOff:'Couper le son',motionOn:'Réduire les effets',motionOff:'Activer les effets', soon:'La navigation détaillée sera ajoutée après cette première scène.' },
 en: { home:'Home',themes:'Themes',chapters:'Chapters',index:'A–Z',search:'Search',
 title:'The Hadiths',subtitle:'A light for every era',
 description:'Explore the teachings of the Prophet ﷺ\nthrough an immersive and interactive experience.',
 action:'Start exploring',collections:'90+ collections',alphabet:'A to Z',variety:'Various themes',navigation:'Intuitive navigation',
 explore:'Choose a theme',exploreDetail:'Explore chapters based on your interests',back:'Back to homepage',queryPlaceholder:'Search for a theme…',noResults:'No matching theme',
 categories:['Belief','Worship','Life of the Prophet ﷺ','Relationships','Conduct','Signs of the Last Hour','Knowledge','Illness and remedies','Other themes'],
 soundOn:'Enable sound',soundOff:'Mute sound',motionOn:'Reduce motion',motionOff:'Enable motion',soon:'Detailed chapter navigation will be added after this first scene.' },
 ar: { home:'الرئيسية',themes:'المواضيع',chapters:'الأبواب',index:'أ–ي',search:'بحث',
 title:'الأحاديث النبوية',subtitle:'نور لكل زمان',
 description:'استكشف تعاليم النبي ﷺ\nمن خلال تجربة تفاعلية غامرة.',
 action:'ابدأ الاستكشاف',collections:'المجموعات',alphabet:'الفهرس',variety:'مواضيع متنوعة',navigation:'تصفح تفاعلي',
 explore:'اختر موضوعاً',exploreDetail:'تصفح الأبواب حسب اهتماماتك',back:'العودة للرئيسية',queryPlaceholder:'ابحث عن موضوع…',noResults:'لا توجد نتائج',
 categories:['الإيمان','العبادات','السيرة النبوية','العلاقات','الأخلاق','أشراط الساعة','العلم','الطب والتداوي','مواضيع أخرى'],
 soundOn:'تفعيل الصوت',soundOff:'إيقاف الصوت',motionOn:'تقليل الحركة',motionOff:'تفعيل الحركة',soon:'ستتم إضافة تفاصيل الأبواب بعد هذا المشهد الأول.' }
};
const icons=['✧','☪','۞','♡','❋','☄','✦','✣','◇'];
function App(){
 const reduced=useReducedMotion();
 const [lang,setLang]=useState('fr');
 const [page,setPage]=useState('home');
 const [effects,setEffects]=useState(!reduced);
 const [sound,setSound]=useState(false);
 const audioRef=useRef(null);
 const toggleSound=async()=>{if(audioRef.current){await audioRef.current.close();audioRef.current=null;setSound(false);return;}try{const ctx=new (window.AudioContext||window.webkitAudioContext)();await ctx.resume();const osc=ctx.createOscillator();const gain=ctx.createGain();const filter=ctx.createBiquadFilter();osc.type='sine';osc.frequency.value=110;filter.type='lowpass';filter.frequency.value=180;gain.gain.value=0.012;osc.connect(filter).connect(gain).connect(ctx.destination);osc.start();audioRef.current=ctx;setSound(true)}catch{setSound(false)}};
 useEffect(()=>()=>{audioRef.current?.close()},[]);
 const [notice,setNotice]=useState('');
 const [query,setQuery]=useState('');
 const [searchOpen,setSearchOpen]=useState(false);
 const [indexOpen,setIndexOpen]=useState(false);
 const [activeTheme,setActiveTheme]=useState(null);
 const t=copy[lang];
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.title='La Lumière des Hadiths — Milaghaiba';},[lang]);
 useEffect(()=>{if(reduced)setEffects(false)},[reduced]);
 const goExplore=(openSearch=false,alphabet=false)=>{setPage('themes');setNotice('');setActiveTheme(null);setSearchOpen(openSearch);setIndexOpen(alphabet);window.scrollTo({top:0,behavior:effects?'smooth':'auto'})};
 const goHome=()=>{setPage('home');setNotice('');setQuery('');setActiveTheme(null);window.scrollTo({top:0,behavior:'auto'})};
 const visibleThemes=t.categories.map((name,i)=>({name,i})).filter(({name})=>!query.trim()||(indexOpen&&query.trim().length===1?name.toLocaleUpperCase().startsWith(query.trim().toLocaleUpperCase()):name.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()))).sort((a,b)=>indexOpen?a.name.localeCompare(b.name,lang):a.i-b.i);
 return <div className={'app '+(effects?'animated':'still')}>
  <div className="scene" aria-hidden="true">
   <img className="scene-base" src="/assets/scene/architecture.webp" alt=""/>
   <img className="scene-stars" src="/assets/scene/stars.png" alt=""/>
   <img className="scene-clouds" src="/assets/scene/clouds.png" alt=""/>
   <img className="scene-moon" src="/assets/scene/moon.png" alt=""/>
   <img className="scene-lantern" src="/assets/scene/lantern.png" alt=""/>
   <div className="lantern-light"/>
   <div className="sea-reflection"/>
   <div className="book-reflection"/>
   <div className="scene-tint"/>
   <div className="scene-vignette"/>
  </div>
  <header className="header">
   <button className="brand" onClick={goHome} aria-label="La Lumière des Hadiths — Accueil"><span className="brand-icon">⌂<span>▱</span></span><span>La Lumière<br/>des Hadiths</span></button>
   <nav className="navigation" aria-label="Navigation principale">
    <button onClick={goHome} aria-current={page==='home'?'page':undefined}>{t.home}</button>
    <button onClick={()=>goExplore(false)} aria-current={page==='themes'?'page':undefined}>{t.themes}</button>
    <button onClick={()=>goExplore(false)}>{t.chapters}</button>
    <button onClick={()=>goExplore(false,true)}>{t.index}</button>
    <button onClick={()=>goExplore(true)}>{t.search}</button>
   </nav>
   <div className="controls">
    <label className="visually-hidden" htmlFor="lang">Langue / Language</label>
    <select id="lang" value={lang} onChange={e=>setLang(e.target.value)}><option value="fr">FR</option><option value="en">EN</option><option value="ar">AR</option></select>
    <button className="icon-button" aria-label={effects?t.motionOn:t.motionOff} title={effects?t.motionOn:t.motionOff} onClick={()=>setEffects(v=>!v)}>{effects?'✦':'◌'}</button>
    <button className="icon-button" aria-pressed={sound} aria-label={sound?t.soundOff:t.soundOn} title={sound?t.soundOff:t.soundOn} onClick={toggleSound}>{sound?'♫':'♩'}</button>
   </div>
  </header>
  {page==='home'? <main className="hero">
   <motion.div className="hero-content" initial={effects?{opacity:0,y:22}:false} animate={{opacity:1,y:0}} transition={{duration:1.2,ease:'easeOut'}}>
    <div className="hero-line" aria-hidden="true">✧</div>
    <h1>{t.title}</h1>
    <p className="hero-subtitle">{t.subtitle}</p>
    <p className="hero-description">{t.description}</p>
    <button className="cta" onClick={()=>goExplore(false)}>{t.action} <span aria-hidden="true">→</span></button>
   </motion.div>
   <div className="hero-footer" aria-label="Fonctionnalités de la bibliothèque">
    <span><b aria-hidden="true">♧</b>{t.collections}</span><span><b aria-hidden="true">A</b>{t.alphabet}</span><span><b aria-hidden="true">◈</b>{t.variety}</span><span><b aria-hidden="true">♙</b>{t.navigation}</span>
   </div>
  </main> : <main className="themes-view">
   <button className="back" onClick={goHome}>← {t.back}</button>
   <h1>{indexOpen?t.index:t.explore}</h1><p>{t.exploreDetail}</p>
   {indexOpen&&<div className="alphabet" aria-label="Index alphabétique">{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter=><button key={letter} onClick={()=>{setQuery(letter);setActiveTheme(null)}} aria-pressed={query.toUpperCase()===letter}>{letter}</button>)}<button onClick={()=>setQuery('')}>Tout</button></div>}
   <form className={'theme-search '+(searchOpen?'theme-search-active':'')} onSubmit={e=>e.preventDefault()} role="search"><label className="visually-hidden" htmlFor="theme-query">{t.queryPlaceholder}</label><span aria-hidden="true">⌕</span><input id="theme-query" type="search" placeholder={t.queryPlaceholder} value={query} onChange={e=>{setQuery(e.target.value);setActiveTheme(null)}}/></form>
   <div className="theme-grid">
    {visibleThemes.map(({name,i})=><button key={i} className="theme-item" onClick={()=>{setActiveTheme(i);setNotice('')}} style={{'--theme-image':i<8?`url(/assets/chapters/${i+1}.webp)`:'url(/assets/scene/architecture.webp)'}}><span className="theme-icon">{icons[i]}</span><span className="theme-label">{name}</span><small aria-hidden="true">→</small></button>)}
   </div>
   {visibleThemes.length===0&&<p role="status">{t.noResults}</p>}
   {activeTheme!==null&&<section className="theme-detail" aria-live="polite"><img src={activeTheme<8?`/assets/chapters/${activeTheme+1}.webp`:'/assets/scene/architecture.webp'} alt=""/><div><h2>{t.categories[activeTheme]}</h2><p>{t.soon}</p><button className="detail-back" onClick={()=>setActiveTheme(null)}>← {t.back}</button></div></section>}
   {notice&&<p className="notice" role="status">{notice}</p>}
  </main>}
  <div className="screen-grain" aria-hidden="true"/>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
