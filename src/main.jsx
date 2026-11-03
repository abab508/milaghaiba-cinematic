import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'motion/react';
import './style.css';

const chapters = [
  {id:'belief',title:['Croyance et foi','العقيدة والإيمان','Faith and belief'],sub:[['Fondements de la foi','أصول الإيمان','Foundations of belief'],['Tawhid','التوحيد','Tawhid'],['Destin','القدر','Divine decree']]},
  {id:'purity',title:['Purification','الطهارة','Purification'],sub:[['Ablutions','الوضوء','Ablutions'],['Eau et pureté','الماء والطهارة','Water and purity'],['Bain rituel','الغسل','Ritual bathing']]},
  {id:'prayer',title:['Prière','الصلاة','Prayer'],sub:[['Prières obligatoires','الصلوات المفروضة','Obligatory prayers'],['Prière en groupe','صلاة الجماعة','Congregational prayer'],['Invocations','الأدعية','Supplications']]},
  {id:'fasting',title:['Jeûne et Ramadan','الصيام ورمضان','Fasting and Ramadan'],sub:[['Ramadan','رمضان','Ramadan'],['Jeûne','الصيام','Fasting'],['Nuit du destin','ليلة القدر','Night of Decree']]},
  {id:'family',title:['Mariage et famille','الزواج والأسرة','Marriage and family'],sub:[['Mariage','الزواج','Marriage'],['Droits des époux','حقوق الزوجين','Rights of spouses'],['Éducation des enfants','تربية الأطفال','Raising children']]},
  {id:'trade',title:['Commerce et affaires','التجارة والمعاملات','Trade and business'],sub:[['Ventes et contrats','البيع والعقود','Sales and contracts'],['Éthique commerciale','أخلاق التجارة','Business ethics'],['Dettes','الديون','Debts']]},
  {id:'conduct',title:['Morale et comportement','الأخلاق والآداب','Morals and manners'],sub:[['Patience','الصبر','Patience'],['Bienveillance','الإحسان','Kindness'],['Respect','الاحترام','Respect']]},
  {id:'endtimes',title:['Signes de la fin des temps','أشراط الساعة','Signs of the Last Hour'],sub:[['Signes mineurs','العلامات الصغرى','Minor signs'],['Signes majeurs','العلامات الكبرى','Major signs'],['Épreuves','الفتن','Trials']]}
];
const ui = {
  FR:{nav:['Accueil','Thèmes','Recherche','Sources'], eyebrow:'BIBLIOTHÈQUE DE HADITHS',headline:'Les grands chapitres de l’islam',description:'Explorez les recueils et les grands thèmes à travers une bibliothèque immersive.',search:'Rechercher un chapitre, un mot-clé…',go:'Rechercher',themes:'Grands chapitres',choose:'Sélectionnez un chapitre',subs:'Sous-thèmes',preview:'Les pages seront créées progressivement.',layers:'Calques indépendants',sound:'Ambiance sonore',motion:'Animations',empty:'Aucun chapitre trouvé'},
  AR:{nav:['الرئيسية','المواضيع','بحث','المصادر'],eyebrow:'مكتبة الأحاديث النبوية',headline:'أبواب الإسلام الكبرى',description:'اكتشف الأبواب والكتب في مكتبة تفاعلية.',search:'ابحث عن باب أو كلمة…',go:'بحث',themes:'الأبواب الرئيسية',choose:'اختر بابًا',subs:'الأبواب الفرعية',preview:'ستُنشأ الصفحات لاحقًا.',layers:'الطبقات المستقلة',sound:'الصوت',motion:'الحركة',empty:'لم يتم العثور على باب'},
  EN:{nav:['Home','Themes','Search','Sources'],eyebrow:'HADITH LIBRARY',headline:'The great chapters of Islam',description:'Explore classical collections and major themes in an immersive library.',search:'Search for a chapter or keyword…',go:'Search',themes:'Major chapters',choose:'Select a chapter',subs:'Subtopics',preview:'Chapter pages will be added progressively.',layers:'Independent layers',sound:'Sound ambience',motion:'Motion',empty:'No chapter found'}
};
const layerConfig=[
 ['stars','Étoiles','النجوم','Stars'],
 ['moon','Lune','القمر','Moon'],
 ['clouds','Nuages','السحب','Clouds'],
 ['lantern','Lanterne','الفانوس','Lantern'],
 ['effects','Effets thématiques','تأثيرات الأبواب','Theme effects']
];
const asset = (name) => `/assets/${name}`;

function useQuietAudio(){
 const ref=useRef(null);const [enabled,setEnabled]=useState(false);
 const toggle=async()=>{
  if(enabled){setEnabled(false);if(ref.current){ref.current.gain.gain.setTargetAtTime(0.00001,ref.current.ctx.currentTime,.15);}return}
  try{
   if(!ref.current){
    const ctx=new (window.AudioContext||window.webkitAudioContext)();
    const b=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);const d=b.getChannelData(0);
    let p=0;for(let i=0;i<d.length;i++){p=.89*p+.11*(Math.random()*2-1);d[i]=p}
    const source=ctx.createBufferSource();source.buffer=b;source.loop=true;
    const low=ctx.createBiquadFilter();low.type='lowpass';low.frequency.value=580;
    const gain=ctx.createGain();gain.gain.value=.00001;
    source.connect(low).connect(gain).connect(ctx.destination);source.start();ref.current={ctx,gain,source};
   }
   await ref.current.ctx.resume();setEnabled(true);
  }catch{setEnabled(false)}
 };
 const setActive=(on)=>{if(!ref.current)return;ref.current.gain.gain.setTargetAtTime(enabled&&on?.028:.00001,ref.current.ctx.currentTime,.12)};
 useEffect(()=>()=>{if(ref.current){ref.current.source.stop();ref.current.ctx.close()}},[]);
 return {enabled,toggle,setActive};
}

function SceneLayers({visible,animate}){
 return <div className={'scene-layer-root '+(!animate?'still':'')} aria-hidden="true">
   <img className="scene-base" src={asset('scene/architecture.webp')} alt=""/>
   {visible.stars&&<img className="layer stars-layer" src={asset('scene/stars.png')} alt=""/>}
   {visible.clouds&&<img className="layer clouds-layer" src={asset('scene/clouds.png')} alt=""/>}
   {visible.moon&&<img className="layer moon-layer" src={asset('scene/moon.png')} alt=""/>}
   {visible.lantern&&<><img className="layer lantern-layer" src={asset('scene/lantern.png')} alt=""/><div className="layer lantern-halo"/></>}
   <div className="scene-shading"/>
 </div>;
}

function ThemeEffects({name,enabled}){
 if(!enabled)return null;
 return <div className={'theme-effects fx-'+name} aria-hidden="true">
   <span className="fx-light"/>
   {name==='purity'&&<svg className="fx-water" viewBox="0 0 260 198" preserveAspectRatio="none"><path d="M214 24 Q176 22 156 70 T105 115" stroke="rgba(209,247,255,.8)" strokeWidth="2" strokeDasharray="8 7" fill="none"/><ellipse cx="105" cy="118" rx="29" ry="6" stroke="rgba(191,248,255,.75)" fill="none"/><circle cx="116" cy="111" r="2.5" fill="#e6ffff"/></svg>}
   {name==='trade'&&<span className="fx-gleam"/>}
 </div>
}

function ChapterCard({item,index,langIdx,lang,active,selected,onEnter,onLeave,onSelect,animations,effects}){
 return <motion.button type="button" className={'chapter-card '+(active?'hovered ':'')+(selected?'selected':'')} onMouseEnter={onEnter} onMouseLeave={onLeave} onFocus={onEnter} onBlur={onLeave} onClick={onSelect} whileTap={animations?{scale:.985}:{}} aria-pressed={selected} aria-label={item.title[langIdx]}>
   <img className="chapter-art" src={asset(`chapters/${index+1}.webp`)} alt="" loading="lazy" />
   <ThemeEffects name={item.id} enabled={effects&&animations}/>
   <span className="chapter-copy">
    <img className="chapter-medallion" src={asset(`icons/${index+1}.png`)} alt="" />
    <strong lang={lang.toLowerCase()} dir={lang==='AR'?'rtl':'ltr'}>{item.title[langIdx]}</strong>
    {lang!=='AR'&&<span className="arabic-secondary" dir="rtl" lang="ar">{item.title[1]}</span>}
   </span>
 </motion.button>;
}

function App(){
 const [lang,setLang]=useState('FR');const [chosen,setChosen]=useState(4);const [hover,setHover]=useState(null);
 const [query,setQuery]=useState('');const [notice,setNotice]=useState('');const [layersOpen,setLayersOpen]=useState(false);
 const [visibility,setVisibility]=useState({stars:true,moon:true,clouds:true,lantern:true,effects:true});
 const [animations,setAnimations]=useState(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [menu,setMenu]=useState(false);
 const sound=useQuietAudio();const idx=lang==='FR'?0:lang==='AR'?1:2;const t=ui[lang];const active=hover??chosen;
 useEffect(()=>{document.documentElement.lang=lang.toLowerCase();document.title='Milaghaiba Cinematic — '+t.themes},[lang,t.themes]);
 useEffect(()=>{sound.setActive(active===1&&animations)},[active,animations,sound.enabled]);
 function doSearch(e){e.preventDefault();const term=query.trim().toLocaleLowerCase();if(!term)return;const found=chapters.findIndex(c=>[...c.title,...c.sub.flat()].some(v=>v.toLocaleLowerCase().includes(term)));if(found<0)setNotice(t.empty);else{setChosen(found);setHover(null);setNotice('')}}
 function unavailable(){setNotice(t.preview)}
 return <div className={'app '+(animations?'animated':'reduced')}>
   <div className="hero-scene">
    <SceneLayers visible={visibility} animate={animations}/>
    <nav className="topnav" aria-label="Navigation principale">
      {t.nav.map((n,i)=><button key={i} onClick={()=>i===0?(setChosen(4),setHover(null),setNotice('')):i===1?document.querySelector('#chapters')?.scrollIntoView({behavior:'smooth'}):i===2?document.querySelector('#search-box')?.focus():unavailable()}>{n}</button>)}
    </nav>
    <div className="language-pick" role="group" aria-label="Language">{['FR','AR','EN'].map(k=><button key={k} className={lang===k?'current':''} aria-pressed={lang===k} onClick={()=>{setLang(k);setNotice('')}}>{k}</button>)}</div>
    <div className="hero-text" dir={lang==='AR'?'rtl':'ltr'}>
      <div className="brand-mark"><span className="brand-ornament">✧</span><h1>{lang==='AR'?'الملة الغائبة':'Milaghaiba'}</h1>{lang!=='AR'&&<span className="brand-arabic" lang="ar">الملة الغائبة</span>}</div>
      <p className="eyebrow">{t.eyebrow}</p>
      <h2>{t.headline}</h2><p className="intro">{t.description}</p>
      <form className="search" onSubmit={doSearch}><span className="magnifier" aria-hidden="true">⌕</span><input id="search-box" placeholder={t.search} aria-label={t.search} dir={lang==='AR'?'rtl':'ltr'} value={query} onChange={e=>setQuery(e.target.value)}/><button>{t.go}</button></form>
    </div>
   </div>
   <main className="library-stage" id="chapters">
     <div className="section-heading"><span className="ornament">✺</span><h2>{t.themes}</h2><span className="ornament">✺</span></div>
     <div className="library-layout">
       <div className="chapter-grid">{chapters.map((c,i)=><ChapterCard key={c.id} item={c} index={i} langIdx={idx} lang={lang} active={hover===i} selected={chosen===i} onEnter={()=>setHover(i)} onLeave={()=>setHover(null)} onSelect={()=>{setChosen(i);setHover(null);setNotice('')}} animations={animations} effects={visibility.effects}/>)}</div>
       <aside className="details" aria-label={t.sub} dir={lang==='AR'?'rtl':'ltr'}>
        <AnimatePresence mode="wait"><motion.div key={active+'-'+lang} initial={animations?{opacity:0,y:12}:{opacity:1}} animate={{opacity:1,y:0}} exit={animations?{opacity:0,y:-8}:{opacity:1}} transition={{duration:.35}}>
          <div className="panel-art" style={{backgroundImage:`linear-gradient(180deg,transparent,#031e18 98%),url(${asset('chapters/'+(active+1)+'.webp')})`}}/>
          <div className="panel-copy"><img src={asset('icons/'+(active+1)+'.png')} alt=""/><h3>{chapters[active].title[idx]}</h3><p>{t.choose}</p><h4>✧ {t.sub} ✧</h4>
           {chapters[active].sub.map((sub,j)=><button key={j} className="subtopic" onClick={unavailable}><span>{sub[idx]}</span><span aria-hidden="true">‹</span></button>)}
          </div>
         </motion.div></AnimatePresence>
       </aside>
     </div>
     {notice&&<div className="message" role="status">{notice}<button onClick={()=>setNotice('')} aria-label="Fermer">×</button></div>}
     <div className="toolbar">
      <button aria-expanded={layersOpen} onClick={()=>setLayersOpen(x=>!x)}>▤ {t.layers} {layersOpen?'−':'+'}</button>
      <button aria-pressed={animations} onClick={()=>setAnimations(x=>!x)}>✦ {t.motion} {animations?'✓':'○'}</button>
      <button aria-pressed={sound.enabled} onClick={sound.toggle}>♪ {t.sound} {sound.enabled?'✓':'○'}</button>
     </div>
     {layersOpen&&<div className="layers-panel" aria-label={t.layers}>{layerConfig.map(([key,fr,ar,en])=><label key={key}><input type="checkbox" checked={visibility[key]} onChange={e=>setVisibility(v=>({...v,[key]:e.target.checked}))}/><span>{lang==='AR'?ar:lang==='EN'?en:fr}</span></label>)}</div>}
     <footer>Milaghaiba Cinematic · Modèle 04 — prototype d'accueil à calques isolés · Aucune donnée de hadith inventée</footer>
   </main>
 </div>
}

createRoot(document.getElementById('root')).render(<App/>);
