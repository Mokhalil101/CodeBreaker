import {JSDOM} from 'jsdom';import fs from 'fs';
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){}}});
const r=JSON.parse(dom.window.eval(`(()=>{const o={};
const mk=c=>{LV.push({wd:1,n:'T',w:130,c:[['p',2,10],['r',0,12,60,2],...c,['e',80,11]]});startLevel(LV.length-1);LV.pop();K.l=0;K.r=1;K.j=0};
mk([['r',10,11,3,1]]);for(let i=0;i<500&&st.deaths==0;i++)upd(1/120);o.vault_1_tile_step_no_jump=p.x>13*32&&st.deaths==0;
mk([['r',10,9,3,3]]);let j=false;for(let i=0;i<700&&st.deaths==0;i++){if(!j&&p.ground&&p.x+p.w>=10*32-30){K.j=1;jumpPress();j=true}upd(1/120)}o.climb_3_tile_block_with_jump=p.x>13*32&&p.ground;
mk([]);p.y=100;p.vy=0;K.r=1;for(let i=0;i<400&&!(p.rl>0);i++)upd(1/120);o.roll_after_hard_landing=p.rl>0||p.vx>300;

mk([]);K.r=0;let dead=-1;for(let i=0;i<1200&&dead<0;i++){upd(1/120);if(st.deaths>0)dead=st.t}o.hunter_kills_a_player_who_stands_still=dead>3&&dead<4.5;
mk([['r',60,12,60,2]]);K.r=1;for(let i=0;i<1000&&st.deaths==0;i++){upd(1/120)}o.hunter_spawns_behind_a_runner_without_catching=st.deaths==0&&!!lv.hz.e&&p.x-lv.hz.e.x>600;
mk([]);K.r=0;for(let i=0;i<600;i++)upd(1/120);o.hunter_resets_after_respawn=st.deaths==1&&lv.hz.e==null&&lv.hz.ht<2;
return JSON.stringify(o)})()`));
let bad=0;for(const [k,v] of Object.entries(r)){console.log(k,v?'OK':'FAILS');if(!v)bad++}process.exit(bad?1:0);
