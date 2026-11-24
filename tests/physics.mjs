import {JSDOM} from 'jsdom';import fs from 'fs';
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){}}});
const w=dom.window;
const r=JSON.parse(w.eval(`(()=>{const out=[];
function run(gap,dbl){LV.push({wd:1,n:'T',w:90,c:[['p',2,10],['r',0,12,10,2],['r',10+gap,12,30,2],['e',80,11]]});startLevel(LV.length-1);LV.pop();
K.l=0;K.r=1;let jumped=false,second=false,t=0;
for(let i=0;i<1200;i++){const was=p.x;
 if(!jumped&&p.ground&&p.x+p.w>=10*32){K.j=1;jumpPress();jumped=true}
 if(dbl&&jumped&&!second&&p.vy>-60&&!p.ground){jumpPress();second=true}
 upd(1/120);
 if(st.deaths>0)return false;
 if(jumped&&p.ground&&p.x>(10+gap)*32)return true}
return false}
for(const dbl of [false,true])for(let g=3;g<=9;g++)out.push([dbl?'double':'single',g,run(g,dbl)]);
return JSON.stringify(out)})()`));
for(const [m,g,ok] of r)console.log(m,'jump over',g,'tile gap:',ok?'OK':'fails');
const single=Math.max(...r.filter(x=>x[0]=='single'&&x[2]).map(x=>x[1]));
console.log('max single-jump gap:',single,'tiles');process.exit(single>=5?0:1);
