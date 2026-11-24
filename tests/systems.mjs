import {JSDOM} from 'jsdom';import fs from 'fs';
const html=fs.readFileSync('index.html','utf8');
const mkdom=(pre)=>new JSDOM(html,{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){};pre&&pre(w)}});
const res=[],ok=(n,c)=>res.push([n,!!c]);
const dom=mkdom(),w=dom.window,d=w.document,ev=(t,o)=>w.dispatchEvent(new w.KeyboardEvent(t,o));
const txt=()=>d.querySelector('#ov').textContent;
// credits / world map / level select
w.eval('credits()');ok('credits screen shows',txt().includes('CREDITS')&&txt().includes('GDG Assiut'));
w.eval('worldMap()');ok('world map lists the six worlds',d.querySelectorAll('[data-w]').length==6);
d.querySelector('[data-w="1"]').click();ok('level select lists world 1 levels',d.querySelectorAll('[data-l]').length==5);
d.querySelector('[data-l="0"]').click();ok('choosing a level starts it (with its mission briefing)',['play','pause'].includes(w.eval('mode'))&&w.eval('cur')==0&&txt().includes('PIXEL'));
w.eval('menu()');
// save slots + backup
w.eval("localStorage.setItem('cb_save_2',JSON.stringify({v:1,unlocked:7,xp:900,frag:0,best:{},rush:0}))");w.eval('slotsScreen()');
ok('save slots shows 3 slots with a summary',d.querySelectorAll('tr').length==3&&txt().includes('Level 7 unlocked'));
w.eval('backupScreen()');const exp=JSON.parse(d.querySelector('#tx').value);ok('export gives a valid backup',exp.game=='code-breaker'&&exp.data.v==1);
d.querySelector('#ti').value='not json';d.querySelector('#do').click();ok('importing garbage is rejected',txt().includes('does not look like'));
d.querySelector('#ti').value=JSON.stringify({data:{v:1,unlocked:9,xp:5,frag:0,best:{},rush:0}});d.querySelector('#do').click();
ok('importing a valid backup replaces the slot',w.eval('SV.unlocked')==9&&JSON.parse(w.eval("localStorage.getItem('cb_save')")).unlocked==9);
d.querySelector('#ti')&&0;
// rebinding
w.eval('controlsScreen()');d.querySelector('[data-a="jump"]').click();ev('keydown',{code:'KeyJ',key:'j'});
ok('rebinding jump to J is saved',w.eval('SV.keys.jump')=='KeyJ');
w.eval("startLevel(0);mode='play';p.buf=0;K.j=0");ev('keydown',{code:'KeyJ',key:'j'});ok('the new jump key works',w.eval('K.j')==1&&w.eval('p.buf')>0);ev('keyup',{code:'KeyJ',key:'j'});
w.eval('p.buf=0;K.j=0');ev('keydown',{code:'Space',key:' '});ok('the old jump key no longer jumps',w.eval('K.j')==0);
w.eval('SV.keys={}');ev('keydown',{code:'ArrowLeft',key:'ArrowLeft'});ok('arrow keys always work',w.eval('K.l')==1);ev('keyup',{code:'ArrowLeft',key:'ArrowLeft'});
// accessibility
w.eval('settings()');d.querySelector('#t6').click();ok('text size changes',w.eval("ov.style.fontSize")=='19px');
d.querySelector('#t7').click();ok('high contrast toggles',d.body.classList.contains('hc'));
// hidden files
const files=JSON.parse(w.eval('JSON.stringify(LV.map(l=>build(l).df.length))')),boss=JSON.parse(w.eval('JSON.stringify(LV.map(l=>!!l.boss))'));
ok('every normal level hides one data file, bosses none',files.every((n,i)=>boss[i]?n==0:n==1));
w.eval("startLevel(0);mode='play';SV.rec={};const f=lv.df[0];p.x=f.x;p.y=f.y-10;p.vy=0;const dc=SV.dc;upd(1/120);window.fileOK=f.got&&SV.rec[f.id]==1&&SV.dc==dc+1");ok('collecting a data file records it and gives a Data Core',w.eval('window.fileOK'));
w.eval('recScreen()');ok('records screen shows the story text',txt().includes('1 hidden data file'));
// timed escape
const tl=JSON.parse(w.eval('JSON.stringify(LV.map(l=>l.tl||0))'));ok('6 timed escape levels exist',tl.filter(Boolean).length==6);
w.eval("startLevel(LV.findIndex(l=>l.tl));mode='play';lv.hz=null;lv.sc=[];lv.dr=[];lv.tu=[];p.inv=99;K.l=K.r=0;window.d0=st.deaths");
const lim=w.eval('st.tl');w.eval(`for(let i=0;i<${Math.ceil(lim*120)+30};i++)upd(1/120)`);
ok('running out of time costs a respawn and resets the clock',w.eval('st.deaths')==w.eval('window.d0')+1&&w.eval('st.t-st.t0')<2);
// JSON loading
const lj=JSON.parse(w.eval('JSON.stringify(LV)'));lj[0].n='Loaded From JSON';
const d2=mkdom(win=>{win.fetch=u=>Promise.resolve({ok:true,json:()=>Promise.resolve(u.includes('levels')?lj:null)})});
await new Promise(r=>setTimeout(r,80));ok('levels load from data/levels.json when it exists',d2.window.eval('LV[0].n')=='Loaded From JSON');
const d3=mkdom(win=>{win.fetch=()=>Promise.reject(new Error('offline'))});await new Promise(r=>setTimeout(r,80));ok('falls back to built-in levels when the file is missing',d3.window.eval('LV[0].n')!='Loaded From JSON'&&d3.window.eval('LV.length')==30);

// cinematics
w.eval("window.cd=0;cine(WD[2],()=>{window.cd=1})");let n=0;while(!w.eval('window.cd')&&n++<12)d.querySelector('#nx').click();
ok('a dialogue scene advances page by page and finishes',w.eval('window.cd')==1&&n<=7);
w.eval("window.cd=0;cine(BI[5],()=>{window.cd=1})");d.querySelector('#sk').click();ok('dialogue can be skipped',w.eval('window.cd')==1);
ok('every world and boss has a dialogue',w.eval('WD.slice(1).every(a=>a.length>=2)&&BI.length==6&&Object.keys(END).length==3'));
res.forEach(([n,v])=>console.log(v?'OK   ':'FAILS',n));process.exit(res.every(r=>r[1])?0:1);
