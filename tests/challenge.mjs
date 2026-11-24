import {JSDOM} from 'jsdom';import fs from 'fs';
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'dangerously',beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){}}});
const w=dom.window,d=w.document,res=[];const ok=(n,c)=>{res.push([n,!!c])};
const btns=()=>[...d.querySelectorAll('#ops button')];
const click=t=>{const b=btns().find(b=>b.textContent.replace(/^\d\.\s/,'')===t);b.click()};
w.eval('window.QBc=QB.length;window.out=[];');
const n=w.eval('QB.length');let bad=0;
for(let i=0;i<n;i++){
 w.eval(`window.cur_q=QB[${i}];window.res=null;ask(cur_q,{time:0,tries:2,done:(o,wr)=>{window.res=[o,wr]}})`);
 const a=w.eval('cur_q.a'),opts=btns().map(b=>b.textContent.replace(/^\d\.\s/,''));
 if(btns().length<2||!opts.includes(a)){bad++;continue}
 click(a);
 const t=d.querySelector('#ov').textContent;
 if(!t.includes('ACCESS GRANTED')||!d.querySelector('#cont')){bad++;continue}
 d.querySelector('#cont').click();
 if(JSON.stringify(w.eval('window.res'))!=='[true,0]')bad++;
}
ok('all '+n+' questions render, accept their correct answer, show explanation and report success',bad==0);
// wrong answers: 2 tries then fail
w.eval(`window.res=null;ask(QB[0],{time:0,tries:2,done:(o,wr)=>{window.res=[o,wr]}})`);
const a0=w.eval('QB[0].a');const wrong=btns().filter(b=>b.textContent.replace(/^\d\.\s/,'')!==a0);
wrong[0].click();ok('first wrong answer keeps the challenge open and shows a hint',d.querySelector('#ov').textContent.includes('Hint')&&btns().length>1&&btns().find(b=>b.disabled));
btns().find(b=>!b.disabled&&b.textContent.replace(/^\d\.\s/,'')!==a0).click();
ok('second wrong answer ends it as ACCESS DENIED and reveals the answer',d.querySelector('#ov').textContent.includes('ACCESS DENIED')&&d.querySelector('#ov').textContent.includes(a0));
d.querySelector('#cont').click();ok('failure reported to the game (false, 2 wrong)',JSON.stringify(w.eval('window.res'))==='[false,2]');
// keyboard
w.eval(`window.res=null;mode='chal';ask(QB[0],{time:0,tries:2,done:(o,wr)=>{window.res=[o,wr]}})`);
const idx=btns().findIndex(b=>b.textContent.replace(/^\d\.\s/,'')===a0)+1;
w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:String(idx)}));w.dispatchEvent(new w.KeyboardEvent('keydown',{key:String(idx)}));
ok('keyboard 1-4 selects an answer',d.querySelector('#ov').textContent.includes('ACCESS GRANTED'));
w.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter'}));ok('Enter continues',JSON.stringify(w.eval('window.res'))==='[true,0]');
// timer
w.eval(`window.res=null;ask(QB[0],{time:1,tries:2,done:(o,wr)=>{window.res=[o,wr]}})`);
await new Promise(r=>setTimeout(r,1400));
ok('timer expiry fails the challenge',d.querySelector('#ov').textContent.includes('time up'));
d.querySelector('#cont').click();
// in-game: hack terminal opens the gate, pause freezes the world
w.eval(`startLevel(0);const t=lv.tm[0];p.x=t.x;p.y=t.y;p.vx=0;mode='play';interact();`);
ok('E near a terminal pauses the game and opens the challenge',w.eval("mode")=='chal'&&btns().length>=2);
const q=w.eval('(()=>{const s=ov.querySelector("h2").textContent;return QB.find(x=>x.q===s&&ov.querySelector("pre")?ov.querySelector("pre").textContent===x.code:x.q===s)})()');
const before=w.eval('JSON.stringify([p.x,p.y,st.t])');w.eval('upd&&0');
click(q.a);d.querySelector('#cont').click();
ok('correct hack opens the gate and resumes play',w.eval('lv.tm[0].done')===true&&w.eval('mode')=='play'&&w.eval('solids().filter(s=>lv.gt.includes(s)).length')==0);
const f=out=>console.log(out[1]?'OK   ':'FAILS',out[0]);res.forEach(f);process.exit(res.every(r=>r[1])?0:1);
