import {JSDOM} from 'jsdom';import fs from 'fs';
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){}}});
const r=JSON.parse(dom.window.eval(`(()=>{const o={};
const B=LV.map(l=>build(l)),tu=B.map(b=>b.tu.length),gl=B.map(b=>b.dr.filter(d=>d.gl).length);
o.normal_levels_have_turrets_and_glitch_runners=LV.every((l,i)=>l.boss||tu[i]+gl[i]>=1);
o.boss_arenas_have_no_turrets=LV.every((l,i)=>!l.boss||tu[i]+gl[i]==0);
const flat=()=>{LV.push({wd:1,n:'T',w:120,c:[['p',2,10],['r',0,12,120,2],['e',115,11]]});startLevel(LV.length-1);LV.pop();mode='play';K.l=K.r=0;lv.hz=null;lv.sc=[];lv.dr=[];lv.tu=[];};
flat();let u={x:600,y:12*TS-24,cd:.2,ch:0,dead:false};lv.tu.push(u);p.x=300;p.y=348;p.inv=0;let fired=false,dead=false;for(let i=0;i<400&&!dead;i++){upd(1/120);if(lv.ep.length)fired=true;if(st.deaths>0)dead=true}
o.turret_telegraphs_fires_and_kills_a_player_who_stays_in_range=fired&&dead;
flat();u={x:600,y:12*TS-24,cd:5,ch:0,dead:false};lv.tu.push(u);p.x=u.x-12;p.y=348;p.dash=.3;p.face=1;p.vx=0;upd(1/120);o.dashing_destroys_a_turret=u.dead;
flat();lv.dr.push({x0:600,x:600,y:12*TS-24,w:28,h:24,v:110,r:300,dead:false,gl:1});const g1=lv.dr[0];p.x=800;p.y=348;p.inv=99;for(let i=0;i<60;i++)upd(1/120);
o.glitch_runner_charges_the_player_when_near=g1.x>600+30;
for(let i=0;i<600;i++)upd(1/120);o.glitch_runner_stays_on_its_platform_range=g1.x<=900.01&&g1.x>=599.99;
const bi=LV.findIndex(l=>l.boss);startLevel(bi);mode='play';const b=lv.boss;o.normal_boss_has_4_hp=b.max==4;
const fi=LV.findIndex(l=>l.final);startLevel(fi);mode='play';o.final_boss_has_6_hp=lv.boss.max==6;
return JSON.stringify(o)})()`));
let bad=0;for(const [k,v] of Object.entries(r)){console.log(v?'OK   ':'FAILS',k);if(!v)bad++}process.exit(bad?1:0);
