import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion } from 'motion/react';
import './style.css';

const copy = {
 fr: { home:'Accueil',themes:'Thèmes',chapters:'Chapitres',index:'A–Z',search:'Recherche',
 title:'Les Hadiths',subtitle:'Une lumière pour chaque époque',
 description:'Explorez l’ensemble des enseignements du Prophète ﷺ\nà travers une expérience immersive et interactive.',
 action:"Commencer l’exploration",collections:'+90 recueils',alphabet:'A à Z',variety:'Thèmes variés',navigation:'Navigation intuitive',
 explore:'Choisissez un thème',exploreDetail:'Explorez les chapitres selon vos centres d’intérêt',back:'Retour à l’accueil',
 categories:['La croyance','L’adoration','La vie du Prophète ﷺ','Les relations','Les comportements','Les signes de la fin des temps','La science','Les maladies et remèdes','Autres thèmes'],
 soundOn:'Activer le son',soundOff:'Couper le son',motionOn:'Réduire les effets',motionOff:'Activer les effets', soon:'La navigation détaillée sera ajoutée après cette première scène.' },
 en: { home:'Home',themes:'Themes',chapters:'Chapters',index:'A–Z',search:'Search',
 title:'The Hadiths',subtitle:'A light for every era',
 description:'Explore the teachings of the Prophet ﷺ\nthrough an immersive and interactive experience.',
 action:'Start exploring',collections:'90+ collections',alphabet:'A to Z',variety:'Various themes',navigation:'Intuitive navigation',
 explore:'Choose a theme',exploreDetail:'Explore chapters based on your interests',back:'Back to homepage',
 categories:['Belief','Worship','Life of the Prophet ﷺ','Relationships','Conduct','Signs of the Last Hour','Knowledge','Illness and remedies','Other themes'],
 soundOn:'Enable sound',soundOff:'Mute sound',motionOn:'Reduce motion',motionOff:'Enable motion',soon:'Detailed chapter navigation will be added after this first scene.' },
 ar: { home:'الرئيسية',themes:'المواضيع',chapters:'الأبواب',index:'أ–ي',search:'بحث',
 title:'الأحاديث النبوية',subtitle:'نور لكل زمان',
 description:'استكشف تعاليم النبي ﷺ\nمن خلال تجربة تفاعلية غامرة.',
 action:'ابدأ الاستكشاف',collections:'المجموعات',alphabet:'الفهرس',variety:'مواضيع متنوعة',navigation:'تصفح تفاعلي',
 explore:'اختر موضوعاً',exploreDetail:'تصفح الأبواب حسب اهتماماتك',back:'العودة للرئيسية',
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
 const [notice,setNotice]=useState('');
 const t=copy[lang];
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.title='La Lumière des Hadiths — Milaghaiba';},[lang]);
 useEffect(()=>{if(reduced)setEffects(false)},[reduced]);
 const goExplore=()=>{setPage('themes');setNotice('');window.scrollTo({top:0,behavior:effects?'smooth':'instant'})};
 const goHome=()=>{setPage('home');setNotice('');window.scrollTo({top:0,behavior:'instant'})};
 return <div className={'app '+(effects?'animated':'still')}>
  <div className="scene" role="presentation">
   <img className="scene-base" src="/assets/scene/architecture.webp" alt=""/>
   <img className="scene-stars" src="/assets/scene/stars.png" alt=""/>
   <img className="scene-clouds" src="/assets/scene/clouds.png" alt=""/>
   <img className="scene-moon" src="/assets/scene/moon.png" alt=""/>
   <img className="scene-lantern" src="/assets/scene/lantern.png" alt=""/>
   <div className="lantern-light"/>
   <div className="scene-tint"/>
   <div className="scene-vignette"/>
  </div>
  <header className="header">
   <button className="brand" onClick={goHome} aria-label="La Lumière des Hadiths — Accueil"><span className="brand-icon">⌂<span>▱</span></span><span>La Lumière<br/>des Hadiths</span></button>
   <nav className="navigation" aria-label="Navigation principale">
    <button onClick={goHome} aria-current={page==='home'?'page':undefined}>{t.home}</button>
    <button onClick={goExplore} aria-current={page==='themes'?'page':undefined}>{t.themes}</button>
    <button onClick={goExplore}>{t.chapters}</button>
    <button onClick={goExplore}>{t.index}</button>
    <button onClick={goExplore}>{t.search}</button>
   </nav>
   <div className="controls">
    <label className="visually-hidden" htmlFor="lang">Langue / Language</label>
    <select id="lang" value={lang} onChange={e=>setLang(e.target.value)}><option value="fr">FR</option><option value="en">EN</option><option value="ar">AR</option></select>
    <button className="icon-button" aria-label={effects?t.motionOn:t.motionOff} title={effects?t.motionOn:t.motionOff} onClick={()=>setEffects(v=>!v)}>{effects?'✦':'◌'}</button>
    <button className="icon-button" aria-pressed={sound} aria-label={sound?t.soundOff:t.soundOn} title={sound?t.soundOff:t.soundOn} onClick={()=>setSound(v=>!v)}>{sound?'♫':'♩'}</button>
   </div>
  </header>
  {page==='home'? <main className="hero">
   <motion.div className="hero-content" initial={effects?{opacity:0,y:22}:false} animate={{opacity:1,y:0}} transition={{duration:1.2,ease:'easeOut'}}>
    <div className="hero-line" aria-hidden="true">✧</div>
    <h1>{t.title}</h1>
    <p className="hero-subtitle">{t.subtitle}</p>
    <p className="hero-description">{t.description}</p>
    <button className="cta" onClick={goExplore}>{t.action} <span aria-hidden="true">→</span></button>
   </motion.div>
   <div className="hero-footer" aria-label="Fonctionnalités de la bibliothèque">
    <span><b aria-hidden="true">♧</b>{t.collections}</span><span><b aria-hidden="true">A</b>{t.alphabet}</span><span><b aria-hidden="true">◈</b>{t.variety}</span><span><b aria-hidden="true">♙</b>{t.navigation}</span>
   </div>
  </main> : <main className="themes-view">
   <button className="back" onClick={goHome}>← {t.back}</button>
   <h1>{t.explore}</h1><p>{t.exploreDetail}</p>
   <div className="theme-grid">
    {t.categories.map((name,i)=><button key={i} className="theme-item" onClick={()=>setNotice(t.soon)}><span className="theme-icon">{icons[i]}</span><span>{name}</span><small>→</small></button>)}
   </div>
   {notice&&<p className="notice" role="status">{notice}</p>}
  </main>}
  <div className="screen-grain" aria-hidden="true"/>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
