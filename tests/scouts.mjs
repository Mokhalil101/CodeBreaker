import {JSDOM} from 'jsdom';import fs from 'fs';
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){}}});
const r=JSON.parse(dom.window.eval(`(()=>{const o={};
const counts=LV.map(l=>build(l).sc.length),bossCounts=LV.map((l,i)=>l.boss?counts[i]:0);
o.every_normal_level_has_scout_drones=LV.every((l,i)=>l.boss||counts[i]>=2);o.boss_arenas_have_none=bossCounts.every(c=>c==0);
const mk=()=>{LV.push({wd:1,n:'T',w:120,c:[['p',2,10],['r',0,12,120,2],['e',115,11]]});startLevel(LV.length-1);LV.pop();mode='play';K.l=K.r=0;const s=lv.sc[1];p.x=s.x-11;p.y=300;p.vx=p.vy=0;p.inv=0;return s};
let s=mk();s.dir=0;for(let i=0;i<70;i++)upd(1/120);
o.player_in_scan_cone_is_detected=s.st==1||s.st==2;
s=mk();p.x=s.x+600;for(let i=0;i<120;i++)upd(1/120);o.player_outside_cone_is_ignored=s.st==0;
s=mk();let fired=false,dead=false;for(let i=0;i<500&&!dead;i++){p.x=Math.max(p.x,0);upd(1/120);if(lv.ep.length)fired=true;if(st.deaths>0)dead=true}
o.alerted_scout_fires_a_bolt_that_kills_a_player_who_stays=fired&&dead;
s=mk();s.st=1;s.ct=5;p.dash=.3;p.x=s.x-11;p.y=s.y-18;p.vy=0;upd(1/120);o.dashing_into_a_scout_destroys_it=s.dead==true;
s=mk();s.x+=200;s.st=2;die(1);o.respawn_resets_scouts=lv.sc[1].dead==false&&lv.sc[1].st==0&&lv.ep.length==0;
return JSON.stringify(o)})()`));
let bad=0;for(const [k,v] of Object.entries(r)){console.log(v?'OK   ':'FAILS',k);if(!v)bad++}process.exit(bad?1:0);
