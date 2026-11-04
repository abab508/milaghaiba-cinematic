import React, {useState,useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,AnimatePresence} from 'motion/react';
import './style.css';

const A='/assets/reference/';
const topics=[
 {name:'La croyance',ar:'العقيدة',eng:'Belief',desc:'Tawhid, foi, anges, prophètes…',icon:'✧',region:'belief'},
 {name:'L’adoration',ar:'العبادات',eng:'Worship',desc:'Prière, jeûne, zakat, pèlerinage…',icon:'♜',region:'worship'},
 {name:'La vie du Prophète ﷺ',ar:'السيرة النبوية',eng:'Life of the Prophet',desc:'Sa biographie, ses qualités…',icon:'۞',region:'prophet'},
 {name:'Les relations',ar:'العلاقات',eng:'Relationships',desc:'Famille, mariage, droits…',icon:'♡',region:'relationships'},
 {name:'Les comportements',ar:'الأخلاق',eng:'Conduct',desc:'Éthique, morale, bonnes actions…',icon:'❧',region:'conduct'},
 {name:'Les signes de la fin des temps',ar:'أشراط الساعة',eng:'Signs of the Last Hour',desc:'Évènements, avertissements…',icon:'✺',region:'endtimes'},
 {name:'La science',ar:'العلم',eng:'Knowledge',desc:'Savoir, apprentissage…',icon:'▤',region:'knowledge'},
 {name:'Les maladies et remèdes',ar:'الطب والتداوي',eng:'Health and remedies',desc:'Santé, guérison, prévention…',icon:'⚕',region:'health'},
 {name:'Autres thèmes',ar:'مواضيع أخرى',eng:'Other themes',desc:'Divers, lectures, invocations…',icon:'✧',region:'other'},
];
const endtimes=[
 {name:'Les signes mineurs',ar:'العلامات الصغرى',desc:'Signes présents dans la vie quotidienne',n:'12 chapitres'},
 {name:'Les signes majeurs',ar:'العلامات الكبرى',desc:'Les grands événements annoncés',n:'9 chapitres'},
 {name:'La venue de Dajjal',ar:'خروج الدجال',desc:'Récits et références',n:'6 chapitres'},
 {name:'La descente de ‘Issa',ar:'نزول عيسى',desc:'Récits et références',n:'5 chapitres'},
 {name:'La fin du monde',ar:'نهاية العالم',desc:'Récits et références',n:'8 chapitres'}
];
const pageTitles={home:'Accueil',themes:'Thèmes',endtimes:'Fin des temps',detail:'Lecture',chapters:'Chapitres',index:'Index A–Z',books:'Recueils'};
const books=[{title:'Sahih al-Bukhari',ar:'صحيح البخاري',color:'#57401c'},{title:'Sahih Muslim',ar:'صحيح مسلم',color:'#0b4d45'},{title:'Sunan Abu Dawud',ar:'سنن أبي داود',color:'#7b3a29'},{title:'Jamiʿ at-Tirmidhi',ar:'جامع الترمذي',color:'#34446a'},{title:'Sunan an-Nasaʾi',ar:'سنن النسائي',color:'#644b36'},{title:'Sunan Ibn Majah',ar:'سنن ابن ماجه',color:'#3b5348'}];
function clampText(t){return t.length>42?t.slice(0,40)+'…':t}
function App(){
 const [page,setPage]=useState('home');const [theme,setTheme]=useState(5);const [chapter,setChapter]=useState(0);
 const [tab,setTab]=useState('Introduction');const [search,setSearch]=useState('');const [results,setResults]=useState(false);
 const [mobileMenu,setMobileMenu]=useState(false);const [language,setLanguage]=useState('FR');const [sound,setSound]=useState(false);
 const [activeBook,setActiveBook]=useState(null);const [bookPage,setBookPage]=useState(0);const [paused,setPaused]=useState(false);
 const [selectedLetter,setSelectedLetter]=useState('A');const [saved,setSaved]=useState([]);
 const audio=useRef(null);const onLoad=useRef(false);
 const reduced=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const trans=(obj)=>language==='AR'?obj.ar:language==='EN'?(obj.eng||obj.name):obj.name;
 function navigate(next){setPage(next);setResults(false);setMobileMenu(false);window.scrollTo({top:0,behavior:'instant'});history.replaceState({page:next},'',`#${next}`)}
 useEffect(()=>{document.title=`${pageTitles[page]} — La Lumière des Hadiths`;},[page]);
 useEffect(()=>{const p=window.location.hash.slice(1);if(pageTitles[p])setPage(p)},[]);
 useEffect(()=>{const handle=()=>{const p=window.location.hash.slice(1);if(pageTitles[p])setPage(p)};window.addEventListener('hashchange',handle);return()=>window.removeEventListener('hashchange',handle)},[]);
 useEffect(()=>{return()=>{if(audio.current){audio.current.osc.stop();audio.current.ctx.close()}}},[]);
 async function toggleSound(){if(sound){setSound(false);if(audio.current)audio.current.gain.gain.setTargetAtTime(0.0001,audio.current.ctx.currentTime,.1);return}
 try{if(!audio.current){const ctx=new (window.AudioContext||window.webkitAudioContext)();const buffer=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);let p=0,arr=buffer.getChannelData(0);for(let i=0;i<arr.length;i++){p=.9*p+.1*(Math.random()*2-1);arr[i]=p}
 const osc=ctx.createBufferSource();osc.buffer=buffer;osc.loop=true;const filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=450;const gain=ctx.createGain();gain.gain.value=.0001;osc.connect(filter).connect(gain).connect(ctx.destination);osc.start();audio.current={ctx,osc,gain}}
 await audio.current.ctx.resume();audio.current.gain.gain.setTargetAtTime(.009,audio.current.ctx.currentTime,.25);setSound(true)}catch{setSound(false)}}
 function selectTheme(i){setTheme(i);setChapter(0);navigate(i===5?'endtimes':'chapters')}
 function toChapter(i){setChapter(i);setTab('Introduction');navigate('detail')}
 function runSearch(e){e?.preventDefault();setResults(true);navigate('chapters')}
 const selectBook=(i)=>{setActiveBook(i);setBookPage(0)};
 const bookmark=()=>setSaved(current=>current.includes(chapter)?current.filter(i=>i!==chapter):[...current,chapter]);
 const navItems=[['home','Accueil'],['themes','Thèmes'],['chapters','Chapitres'],['index','A–Z'],['books','Recueils']];
 const heading=page==='detail'?(theme===5?endtimes[chapter]?.name:topics[theme]?.name):page==='endtimes'?'Les signes de la fin des temps':pageTitles[page];
 return <div className={'site '+(paused||reduced?'no-motion':'')} dir={language==='AR'?'rtl':'ltr'}>
  <header className="topbar">
   <button className="brand" onClick={()=>navigate('home')} aria-label="Accueil"><span className="brand-icon">♧</span><span>La Lumière<br/>des Hadiths</span></button>
   <nav className={'toplinks '+(mobileMenu?'open':'')} aria-label="Navigation principale">{navItems.map(([key,label])=><button key={key} className={page===key?'current':''} onClick={()=>navigate(key)}>{label}</button>)}</nav>
   <div className="header-tools"><button title="Recherche" aria-label="Ouvrir la recherche" onClick={()=>navigate('chapters')}>⌕</button><button title={paused?'Réactiver les animations':'Mettre les animations en pause'} onClick={()=>setPaused(v=>!v)} aria-pressed={paused}>{paused?'▶':'✧'}</button><button title="Menu" className="hamburger" onClick={()=>setMobileMenu(v=>!v)}>☰</button></div>
  </header>
  <AnimatePresence mode="wait">
   {page==='home'&&<motion.main key="home" className="viewport hero-page" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <div className="art-bg ref-home" aria-hidden="true"/><div className="visual-shade hero-shade" aria-hidden="true"/>
    <div className="sky-particles" aria-hidden="true"/><div className="hero-copy"><p className="kicker">BIBLIOTHÈQUE IMMERSIVE</p><h1>Les Hadiths</h1><h2>Une lumière pour chaque époque</h2><p>Explorez l'ensemble des enseignements du Prophète ﷺ à travers une expérience immersive et interactive.</p><button className="gold-button" onClick={()=>navigate('themes')}>Commencer l'exploration <span>→</span></button></div>
    <div className="home-footer"><span>♧ &nbsp; Recueils classiques</span><span>◬ &nbsp; Index A à Z</span><span>✧ &nbsp; Thèmes variés</span><span>♧ &nbsp; Navigation intuitive</span></div>
   </motion.main>}
   {page==='themes'&&<motion.main key="themes" className="viewport themes-page" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
    <div className="art-bg ref-themes" aria-hidden="true"/><div className="visual-shade theme-shade" aria-hidden="true"/><div className="sky-particles" aria-hidden="true"/>
    <div className="page-header centered"><button className="back" onClick={()=>navigate('home')}>← Retour</button><h1>Choisissez un thème</h1><p>Explorez les chapitres selon vos centres d'intérêt</p></div>
    <div className="topic-map">{topics.map((t,i)=><button key={t.region} className={'topic-node topic-'+i} onClick={()=>selectTheme(i)} title={t.desc}><span className="round-icon">{t.icon}</span><span><strong>{trans(t)}</strong><small>{t.desc}</small></span></button>)}</div>
   </motion.main>}
   {page==='endtimes'&&<motion.main key="endtimes" className="viewport endtimes-page" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
    <div className="art-bg ref-endtimes" aria-hidden="true"/><div className="visual-shade dark-top" aria-hidden="true"/><div className="meteor-layer" aria-hidden="true"/>
    <div className="section-intro"><button className="back" onClick={()=>navigate('themes')}>← Retour aux thèmes</button><h1>Les signes de la fin des temps</h1><p>Découvrez les grands signes, les événements majeurs et les avertissements rapportés dans les sources.</p></div>
    <div className="endtime-cards">{endtimes.map((t,i)=><button key={t.name} className={'end-card end-'+i} onClick={()=>toChapter(i)}><span className="end-image"/><span className="end-content"><strong>{i+1}. {trans(t)}</strong><small>{t.n}</small></span></button>)}</div>
   </motion.main>}
   {page==='detail'&&<motion.main key="detail" className="viewport detail-page" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <div className="art-bg ref-detail" aria-hidden="true"/><div className="visual-shade detail-shade" aria-hidden="true"/>
    <div className="detail-main"><div className="crumb"><button onClick={()=>navigate('themes')}>Accueil</button> › <button onClick={()=>navigate('endtimes')}>Les signes de la fin des temps</button> › {heading}</div><p className="kicker">CHAPITRE {chapter+1}</p><h1>{heading}</h1><p className="detail-subtitle">Les références et explications de ce chapitre seront organisées ici à partir des recueils vérifiés.</p>
     <div className="tabs" role="tablist">{['Introduction','Hadiths','Explications','Références','Audio / Vidéo'].map(t=><button role="tab" aria-selected={tab===t} className={tab===t?'active':''} key={t} onClick={()=>setTab(t)}>{t}</button>)}</div>
     <div className="tab-content" role="tabpanel"><h2>{tab}</h2>{tab==='Introduction'?<p>Explorez les thèmes, les sources et les explications associées à « {heading} ».</p>:<p>Cette section sera renseignée lorsque les références et les textes des hadiths auront été importés et vérifiés. Aucun texte de hadith n'est inventé.</p>}<button className="outline-button" onClick={bookmark}>{saved.includes(chapter)?'★ Retirer des favoris':'☆ Ajouter aux favoris'}</button></div>
    </div>
    <aside className="hadith-sidebar"><h2>Hadiths de ce chapitre</h2>{['La propagation de l’information','La multiplication des gouverneurs injustes','La perte de la pudeur','La richesse excessive','L’amour des plaisirs'].map((t,i)=><button key={i} onClick={()=>setTab('Hadiths')}><span>{i+1}.</span><span>{t}<small>Référence à vérifier</small></span>›</button>)}<button className="all-hadith" onClick={()=>setTab('Hadiths')}>Voir tous les hadiths</button></aside>
   </motion.main>}
   {page==='chapters'&&<motion.main key="chapters" className="viewport chapters-page" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <div className="art-bg ref-chapters" aria-hidden="true"/><div className="visual-shade chapter-shade" aria-hidden="true"/>
    <aside className="chapter-list"><h1>Navigation par chapitres</h1><form onSubmit={runSearch}><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un chapitre…" aria-label="Rechercher un chapitre"/><button aria-label="Lancer la recherche">⌕</button></form>
    {topics.filter(t=>!search||t.name.toLowerCase().includes(search.toLowerCase())||t.desc.toLowerCase().includes(search.toLowerCase())).map((t,i)=><button key={t.region} onClick={()=>selectTheme(topics.indexOf(t))}><span className="chapter-symbol">{t.icon}</span><span>{topics.indexOf(t)+1}. &nbsp;{t.name}</span><span>⌄</span></button>)}
    {!topics.some(t=>t.name.toLowerCase().includes(search.toLowerCase()))&&search&&<p>Aucun chapitre trouvé pour « {search} ».</p>}
    </aside><div className="chapter-quote"><p>« Celui qui cherche la science est sur la voie d’Allah. »</p><small>Texte illustratif à remplacer par une citation authentifiée</small><button className="gold-button" onClick={()=>navigate('themes')}>Explorer les thèmes →</button></div>
   </motion.main>}
   {page==='index'&&<motion.main key="index" className="viewport index-page" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <div className="art-bg ref-index" aria-hidden="true"/><div className="visual-shade index-shade" aria-hidden="true"/><div className="alphabet"><h1>Index A – Z</h1><p>Accédez à tous les chapitres, de A à Z</p><div className="letters">{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c=><button className={selectedLetter===c?'selected':''} key={c} onClick={()=>{setSelectedLetter(c);setResults(true)}}>{c}</button>)}</div><form onSubmit={e=>{e.preventDefault();setResults(true)}}><span>⌕</span><input placeholder="Rechercher un chapitre ou un mot-clé…" value={search} onChange={e=>setSearch(e.target.value)}/><button aria-label="Rechercher">→</button></form>{results&&<div className="index-results"><h2>Résultats : {search||selectedLetter}</h2>{topics.filter(t=>t.name.toUpperCase().includes((search||selectedLetter).toUpperCase())).length?topics.filter(t=>t.name.toUpperCase().includes((search||selectedLetter).toUpperCase())).map(t=><button key={t.region} onClick={()=>selectTheme(topics.indexOf(t))}>{t.name} ›</button>):<p>Aucun chapitre correspondant. Essayez une autre lettre.</p>}</div>}</div>
   </motion.main>}
   {page==='books'&&<motion.main key="books" className="viewport books-page" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}><div className="art-bg ref-index" aria-hidden="true"/><div className="visual-shade books-shade" aria-hidden="true"/>
    <div className="books-intro"><p className="kicker">BIBLIOTHÈQUE DE RECUEILS</p><h1>Les livres de la tradition</h1><p>Sélectionnez un recueil pour ouvrir ses pages.</p></div>
    <div className="bookshelf">{books.map((book,i)=><button key={book.title} onClick={()=>selectBook(i)} className={'book-spine '+(activeBook===i?'selected':'')} style={{'--book-color':book.color}}><span className="book-ornament">✦</span><strong>{book.title}</strong><span dir="rtl">{book.ar}</span><small>OUVRIR</small></button>)}</div>
    <AnimatePresence>{activeBook!==null&&<motion.div className="book-dialog-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActiveBook(null)}><motion.section className="book-dialog" initial={{scale:.8,rotateY:-40,opacity:0}} animate={{scale:1,rotateY:0,opacity:1}} exit={{scale:.8,opacity:0}} transition={{duration:.6}} onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-label={books[activeBook].title}><button className="close-book" aria-label="Fermer le livre" onClick={()=>setActiveBook(null)}>×</button><div className="book-pages"><div className="book-leaf"><p className="arabic" dir="rtl">{books[activeBook].ar}</p><h2>{books[activeBook].title}</h2><p>Recueil classique — aperçu de navigation</p><span className="page-number">{bookPage*2+1}</span></div><div key={bookPage} className="book-leaf book-right"><h3>{bookPage===0?'Table des matières':'Chapitre '+bookPage}</h3><p>Les chapitres et hadiths seront affichés ici après import et vérification de leurs références.</p><button onClick={()=>{setActiveBook(null);navigate('chapters')}}>Voir les chapitres →</button><span className="page-number">{bookPage*2+2}</span></div></div><div className="book-actions"><button onClick={()=>setBookPage(n=>Math.max(0,n-1))} disabled={bookPage===0}>← Précédent</button><span>Pages {bookPage*2+1}–{bookPage*2+2}</span><button onClick={()=>setBookPage(n=>n+1)}>Suivant →</button></div></motion.section></motion.div>}</AnimatePresence>
   </motion.main>}
  </AnimatePresence>
  <footer className="site-footer"><button onClick={()=>navigate('home')}>La Lumière des Hadiths</button><span>Bibliothèque cinématographique · Démonstration graphique</span><div><button onClick={()=>setLanguage(s=>s==='FR'?'AR':s==='AR'?'EN':'FR')} title="Langue">{language} ▾</button><button onClick={toggleSound} aria-pressed={sound}>{sound?'♫ Son actif':'♪ Son désactivé'}</button></div></footer>
 </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
