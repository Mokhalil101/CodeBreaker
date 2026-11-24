import {JSDOM} from 'jsdom';import fs from 'fs';
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){}}});
const r=JSON.parse(dom.window.eval(`(()=>{const o={},idx=LV.map((l,i)=>l.boss?i:-1).filter(i=>i>=0),names=['Sentinel','Compiler','Leviathan','Guardian','Overmind','Overlord'],sets=[],sig=[];
idx.forEach((bi,k)=>{startLevel(bi);mode='play';K.l=K.r=0;const b=lv.boss;b.hp=1;p.inv=99;const used=new Set();let rev=0,zn=0,fall=0,mv=new Set(),minY=1e9,maxY=-1e9,al=1;
for(let i=0;i<7000;i++){p.inv=99;upd(1/120);if(b.la)used.add(b.la);rev=Math.max(rev,REV);zn=Math.max(zn,lv.zn.length);if(lv.ep.some(j=>j.ay))fall=1;if(b.mv)mv.add(b.mv.ty);minY=Math.min(minY,b.y);maxY=Math.max(maxY,b.y);if(b.al!=null)al=Math.min(al,b.al)}
sets.push([...used].sort().join(','));sig.push({rev,zn,fall,mv:[...mv],span:maxY-minY,al,n:used.size})});
o.every_boss_has_its_own_attack_set=new Set(sets).size==6;
o.each_boss_uses_at_least_3_attacks=sig.every(s=>s.n>=3);
o.sentinel_charges_across_the_arena=sig[0].mv.includes('charge');
o.compiler_slams_and_drops_blocks=sig[1].mv.includes('slam')&&sig[1].fall==1;
o.leviathan_dives=sig[2].mv.includes('dive')&&sig[2].span>60;
o.guardian_teleports=sig[3].mv.includes('blink')&&sig[3].al<.2;
o.overmind_inverts_your_controls=sig[4].rev>0;
o.overlord_floods_the_floor_with_hazard_zones=sig[5].zn>0;
return JSON.stringify(o)})()`));
let bad=0;for(const [k,v] of Object.entries(r)){console.log(v?'OK   ':'FAILS',k);if(!v)bad++}process.exit(bad?1:0);
