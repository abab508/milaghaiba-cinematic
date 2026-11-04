import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useReducedMotion } from 'motion/react';
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
const themeDescriptions={
fr:['Tawhîd, foi, anges, prophètes…','Prière, jeûne, zakât, pèlerinage…','Sa biographie, ses qualités…','Famille, mariage, droits…','Éthique, morale, bonnes actions…','Événements, avertissements…','Savoir, apprentissage…','Santé, guérison, prévention…','Divers, lectures, invocations…'],
en:['Faith, angels, prophets…','Prayer, fasting, pilgrimage…','His biography and qualities…','Family, marriage, rights…','Ethics and good deeds…','Events and warnings…','Learning and knowledge…','Health and healing…','Readings and invocations…'],
ar:['التوحيد والإيمان والأنبياء…','الصلاة والصيام والحج…','سيرته وصفاته…','الأسرة والزواج والحقوق…','الأخلاق والآداب…','الأحداث والعلامات…','العلم والتعلّم…','الصحة والعلاج…','القراءة والدعاء…']};
function App(){
 const reduced=useReducedMotion();
 const [lang,setLang]=useState('fr');
 const page='themes';
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
 const [referenceLoaded,setReferenceLoaded]=useState(false);

 const [referenceMenu,setReferenceMenu]=useState(null);
 const t=copy[lang];
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.title='La Lumière des Hadiths — Milaghaiba';},[lang]);
 useEffect(()=>{if(reduced)setEffects(false)},[reduced]);
 const goExplore=(openSearch=false,alphabet=false)=>{setNotice('');setActiveTheme(null);setSearchOpen(openSearch);setIndexOpen(alphabet);setReferenceMenu(openSearch?'search':alphabet?'index':null);window.scrollTo({top:0,behavior:effects?'smooth':'auto'})};
 const goHome=()=>{setNotice('');setQuery('');setActiveTheme(null);setReferenceMenu(null);window.scrollTo({top:0,behavior:'auto'})};
 const visibleThemes=t.categories.map((name,i)=>({name,i})).filter(({name})=>!query.trim()||(indexOpen&&query.trim().length===1?name.toLocaleUpperCase().startsWith(query.trim().toLocaleUpperCase()):name.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()))).sort((a,b)=>indexOpen?a.name.localeCompare(b.name,lang):a.i-b.i);
 return <div className={'app '+(effects?'animated':'still')+' page-'+page+(referenceLoaded?' has-theme-reference':'')}>
  <header className="header">
   <button className="brand" onClick={goHome} aria-label="La Lumière des Hadiths — Accueil"><span className="brand-icon">⌂<span>▱</span></span><span>La Lumière<br/>des Hadiths</span></button>
   <nav className="navigation" aria-label="Navigation principale">
    <button onClick={goHome} aria-current={undefined}>{t.home}</button>
    <button onClick={()=>goExplore(false)} aria-current="page">{t.themes}</button>
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
  <main className="themes-view">
   <button className="back" onClick={goHome}>← {t.back}</button>
   <h1>{indexOpen?t.index:t.explore}</h1><p>{t.exploreDetail}</p>
   {indexOpen&&<div className="alphabet" aria-label="Index alphabétique">{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter=><button key={letter} onClick={()=>{setQuery(letter);setActiveTheme(null)}} aria-pressed={query.toUpperCase()===letter}>{letter}</button>)}<button onClick={()=>setQuery('')}>Tout</button></div>}
   <form className={'theme-search '+(searchOpen?'theme-search-active':'')} onSubmit={e=>e.preventDefault()} role="search"><label className="visually-hidden" htmlFor="theme-query">{t.queryPlaceholder}</label><span aria-hidden="true">⌕</span><input id="theme-query" type="search" placeholder={t.queryPlaceholder} value={query} onChange={e=>{setQuery(e.target.value);setActiveTheme(null)}}/></form>
   <div className="theme-reference-stage" hidden={!referenceLoaded} aria-label={t.explore}>
     <img className="theme-reference-image" src="/assets/themes-reference.png" alt="" onLoad={()=>setReferenceLoaded(true)} onError={()=>setReferenceLoaded(false)} />
     {t.categories.map((name,i)=>{
       const positions=[[8,25,26,23],[35,25,30,23],[67,25,29,23],[8,49,26,20],[35,49,30,20],[67,49,29,20],[8,70,26,22],[35,70,30,22],[67,70,29,22]];
       const [left,top,width,height]=positions[i];
       return <button type="button" key={i} className="reference-hotspot" style={{left:left+'%',top:top+'%',width:width+'%',height:height+'%'}} onClick={()=>{setActiveTheme(i);setNotice('')}} aria-label={name} title={name}/>;
     })}
     <button type="button" className="reference-nav-home" aria-label={t.home} onClick={goHome}/>
     <button type="button" className="reference-nav-themes" aria-label={t.themes} onClick={()=>{setReferenceMenu(null);setActiveTheme(null);setQuery('' )}}/>
     <button type="button" className="reference-nav-chapters" aria-label={t.chapters} onClick={()=>setReferenceMenu('chapters')}/>
     <button type="button" className="reference-nav-index" aria-label={t.index} onClick={()=>setReferenceMenu('index')}/>
     <button type="button" className="reference-nav-search" aria-label={t.search} onClick={()=>setReferenceMenu('search')}/>
   </div>
   {referenceLoaded&&referenceMenu&&<section className="reference-panel" aria-label={referenceMenu==='search'?t.search:referenceMenu==='index'?t.index:t.chapters}>
     <button className="reference-panel-close" aria-label="Fermer" onClick={()=>{setReferenceMenu(null);setQuery('')}}>×</button>
     <h2>{referenceMenu==='search'?t.search:referenceMenu==='index'?t.index:t.chapters}</h2>
     {referenceMenu==='index'&&<div className="reference-letters">{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter=><button key={letter} onClick={()=>setQuery(letter)}>{letter}</button>)}</div>}
     <label className="visually-hidden" htmlFor="reference-search">{t.queryPlaceholder}</label>
     <input id="reference-search" placeholder={t.queryPlaceholder} value={query} onChange={e=>setQuery(e.target.value)}/>
     <div className="reference-results">
       {t.categories.map((name,i)=>({name,i})).filter(({name})=>!query||name.toLocaleLowerCase().includes(query.toLocaleLowerCase())||(referenceMenu==='index'&&name.toLocaleUpperCase().startsWith(query.toLocaleUpperCase()))).map(({name,i})=><button key={i} onClick={()=>{setActiveTheme(i);setReferenceMenu(null);setQuery('')}}>{name}</button>)}
     </div>
   </section>}
   {!referenceLoaded&&<div className="theme-grid">
    {visibleThemes.map(({name,i})=><button key={i} className="theme-item" onClick={()=>{setActiveTheme(i);setNotice('')}} style={{'--theme-image':i<8?`url(/assets/chapters/${i+1}.webp)`:'url(/assets/chapters/8.webp)'}}><span className="theme-icon">{icons[i]}</span><span className="theme-label">{name}</span><span className="theme-description">{themeDescriptions[lang][i]}</span></button>)}
   </div>}
   {!referenceLoaded&&visibleThemes.length===0&&<p role="status">{t.noResults}</p>}
   {activeTheme!==null&&<section className={'theme-detail'+(referenceLoaded?' reference-detail':'')} aria-live="polite"><img src={activeTheme<8?`/assets/chapters/${activeTheme+1}.webp`:'/assets/scene/architecture.webp'} alt=""/><div><h2>{t.categories[activeTheme]}</h2><p>{t.soon}</p><button className="detail-back" onClick={()=>setActiveTheme(null)}>← {t.back}</button></div></section>}
   {notice&&<p className="notice" role="status">{notice}</p>}
  </main>
  <div className="screen-grain" aria-hidden="true"/>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
