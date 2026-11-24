import {JSDOM} from 'jsdom';import fs from 'fs';
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){}}});
const r=JSON.parse(dom.window.eval(`(()=>{const o={};
const mk=()=>{LV.push({wd:1,n:'T',w:120,c:[['p',2,10],['r',0,12,120,2],['e',115,11]]});startLevel(LV.length-1);LV.pop();mode='play';K.l=K.r=0;lv.hz=null;lv.sc=[];lv.dr=[];lv.tu=[];st.chk={x:1000,y:348};p.x=1000;p.y=348;p.inv=0};
const deaths=(steps)=>{for(let i=0;i<steps;i++)upd(1/120);return st.deaths};
// monster standing on the checkpoint
mk();lv.dr.push({x0:1000,x:1000,y:360,w:28,h:24,v:0,r:0,dead:false});die(1);let d=deaths(600);o.no_death_loop_with_a_walker_on_the_checkpoint=d==1;
mk();lv.dr.push({x0:1000,x:1000,y:360,w:28,h:24,v:110,r:200,dead:false,gl:1});die(1);d=deaths(600);o.no_death_loop_with_a_glitch_runner=d==1;
mk();lv.tu.push({x:1000,y:360,cd:.1,ch:0,dead:false});die(1);d=deaths(600);o.no_death_loop_with_a_turret_next_to_the_checkpoint=d==1;
mk();lv.sc.push({x0:1000,x:1000,y0:250,y:250,r:50,dir:1,st:0,t:0,ld:0,ct:0,cd:0,dead:false});die(1);d=deaths(200);o.a_scout_above_the_checkpoint_cannot_kill_you_instantly=d==1;
mk();lv.ep.push({x:1000,y:360,vx:0,vy:0,l:3,s:20});die(1);o.stray_bolts_are_cleared_on_respawn=lv.ep.length==0;
mk();die(1);o.you_are_briefly_protected_after_respawn=p.inv>1;
return JSON.stringify(o)})()`));
let bad=0;for(const [k,v] of Object.entries(r)){console.log(v?'OK   ':'FAILS',k);if(!v)bad++}process.exit(bad?1:0);
