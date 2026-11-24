import {JSDOM} from 'jsdom';import fs from 'fs';
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){}}});
const r=JSON.parse(dom.window.eval(`(()=>{const o={};
const bi=LV.findIndex(l=>l.boss);startLevel(bi);mode='play';K.l=K.r=K.d=0;
let atk=0;const orig=bossAtk;bossAtk=function(x){atk++;return orig(x)};const b=lv.boss,gy=12*TS-b.h;let mn=1e9,mx=-1e9,my=1e9;
for(let i=0;i<1200;i++){p.inv=99;upd(1/120);mn=Math.min(mn,b.x);mx=Math.max(mx,b.x);my=Math.min(my,b.y)}
o.boss_patrols_side_to_side=mx-mn>150;o.boss_hovers_above_ground=my<gy-40&&b.y<gy-30;o.boss_fires_attacks_at_the_player=atk>=3;
b.stun=7;lv.ep=[];lv.bm=[];lv.pj=[];lv.zn=[];lv.tm[0].done=true;for(let i=0;i<150;i++)upd(1/120);o.stunned_boss_drops_to_ground=Math.abs(b.y-gy)<6;
p.inv=0;p.x=b.x+10;p.y=b.y-45;p.vy=300;p.vx=0;p.dash=0;const hp0=b.hp;for(let i=0;i<30;i++)upd(1/120);
o.stomp_hurts_boss_and_knocks_it_back=b.hp==hp0-1&&b.hT>0&&Math.abs(b.kv)>1;
o.boss_resumes_after_hit=b.stun==0;
b.hp=1;b.stun=7;lv.ep=[];lv.bm=[];lv.pj=[];lv.zn=[];b.inv=0;p.x=b.x+10;p.y=b.y-45;p.vy=300;for(let i=0;i<30;i++)upd(1/120);o.boss_defeat_opens_exit=b.dead&&lv.ex.x>0;
for(let i=0;i<200;i++)upd(1/120);o.defeat_animation_runs=b.dd>1.4;

startLevel(bi);mode='play';K.l=K.r=K.d=0;{const b2=lv.boss,t=lv.tm[0];b2.stun=.3;t.done=true;p.inv=99;for(let i=0;i<60;i++)upd(1/120);
p.x=t.x-20;p.y=t.y-8;p.vx=p.vy=0;interact();o.terminal_is_locked_right_after_the_stun_ends=mode=='play'&&b2.tcd>3&&!t.done;
for(let i=0;i<700;i++){p.x=t.x-20;p.y=t.y-8;p.vy=0;upd(1/120)}interact();o.terminal_works_again_after_5_seconds=mode=='chal'}
return JSON.stringify(o)})()`));
let bad=0;for(const [k,v] of Object.entries(r)){console.log(v?'OK   ':'FAILS',k);if(!v)bad++}process.exit(bad?1:0);
