import {JSDOM} from 'jsdom';import fs from 'fs';
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){}}});
const r=JSON.parse(dom.window.eval(`(()=>{const o={},T=LV.map((l,i)=>l.h?i:-1).filter(i=>i>=0);o.three_vertical_towers=T.length==3;
let allReach=true,exits=true,det=[];
for(const ti of T){startLevel(ti);mode='play';lv.hz=null;lv.sc=[];lv.dr=[];lv.tu=[];lv.sp=[];p.inv=99;
 const gTop=(lv.hh-2)*TS;
 const plats=[{x:0,y:gTop,w:lv.w*TS,g:1}];for(const r of lv.S)if(r.y<gTop)plats.push({x:r.x,y:r.y,w:r.w});for(const r of lv.bk)plats.push({x:r.x,y:r.y,w:r.w});for(const r of lv.cl)plats.push({x:r.x,y:r.y,w:r.w});
 lv.bk.forEach(k=>k.off=-100);
 const trial=(A,B)=>{const dir=(B.x+B.w/2)>(A.x+A.w/2)?1:-1;for(let xs=A.x;xs<=A.x+A.w-22;xs+=16)for(const dbl of[0,1])for(const dly of[0,6,14]){
   lv.cl.forEach(c=>{c.dead=0;c.on=false;c.t=0});p.x=xs;p.y=A.y-36;p.vx=p.vy=0;p.ground=true;p.jumps=0;p.coy=.1;p.dash=0;p.sl=false;p.h=36;K.l=dir<0?1:0;K.r=dir>0?1:0;K.j=1;st.t=0;let ok=false;
   for(let i=0;i<150;i++){if(i==dly){jumpPress()}if(dbl&&i==dly+26)jumpPress();upd(1/120);if(i>dly+20&&p.ground&&Math.abs(p.y+p.h-B.y)<2&&p.x+p.w>B.x&&p.x<B.x+B.w){ok=true;break}if(p.y>A.y+300)break}
   if(ok)return true}return false};
 const reach=new Set([0]),q=[0];while(q.length){const a=q.pop();for(let b=0;b<plats.length;b++){if(reach.has(b))continue;const A=plats[a],B=plats[b];const dy=A.y-B.y;if(dy>150||dy<-200)continue;const gap=Math.max(B.x-(A.x+A.w),A.x-(B.x+B.w),0);if(gap>6*TS)continue;if(trial(A,B)){reach.add(b);q.push(b)}}}
 const top=plats.reduce((m,p)=>p.y<m.y?p:m,plats[0]);const ti2=plats.indexOf(top);det.push(reach.size+'/'+plats.length);if(!reach.has(ti2))allReach=false;
 const hasT=lv.tm.length==1&&lv.gt.length==1&&lv.ex&&lv.ex.y<200;if(!hasT)exits=false}
o.every_platform_chain_reaches_the_top_by_real_jumps=allReach;o.towers_have_terminal_gate_and_exit_at_the_top=exits;o.detail=det.join(' ');
startLevel(T[0]);mode='play';o.tall_level_height=lv.hh==40;p.y=lv.hh*TS+200;const d0=st.deaths;upd(1/120);o.falling_below_the_tower_kills=st.deaths==d0+1;
return JSON.stringify(o)})()`));
let bad=0;for(const [k,v] of Object.entries(r)){if(k=='detail'){console.log('reachable',v);continue}console.log(v?'OK   ':'FAILS',k);if(!v)bad++}process.exit(bad?1:0);
