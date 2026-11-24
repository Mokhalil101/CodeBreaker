import {JSDOM} from 'jsdom';import fs from 'fs';
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){}}});
const w=dom.window,LV=JSON.parse(w.eval('JSON.stringify(LV)')),QB=JSON.parse(w.eval('JSON.stringify(QB)')),WN=JSON.parse(w.eval('JSON.stringify(WN)'));
fs.mkdirSync('data/levels',{recursive:true});
fs.writeFileSync('data/levels.json',JSON.stringify(LV));
const worlds=[];for(let k=1;k<=6;k++){const dir=`data/levels/world-0${k}`;fs.mkdirSync(dir,{recursive:true});const ls=LV.map((l,i)=>({...l,id:i+1})).filter(l=>(l.wd||1)==k);ls.forEach((l,j)=>fs.writeFileSync(`${dir}/level-${String(j+1).padStart(2,'0')}.json`,JSON.stringify(l,null,1)));worlds.push({id:`world-0${k}`,name:WN[k],levels:ls.map(l=>l.id)})}
fs.writeFileSync('data/worlds.json',JSON.stringify(worlds,null,1));
QB.forEach((q,i)=>q.id='PY-'+String(i+1).padStart(3,'0'));fs.writeFileSync('data/questions.json',JSON.stringify(QB,null,1));
console.log('exported',LV.length,'levels,',QB.length,'questions');process.exit(0);
