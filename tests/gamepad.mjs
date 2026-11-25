import {JSDOM} from 'jsdom';import fs from 'fs';
const html=fs.readFileSync('index.html','utf8');
let pad=null,vib=0;
const dom=new JSDOM(html,{url:'http://localhost/',runScripts:'dangerously',pretendToBeVisual:false,beforeParse(w){w.requestAnimationFrame=()=>0;w.HTMLCanvasElement.prototype.getContext=()=>({});w.AudioContext=function(){};w.navigator.getGamepads=()=>[pad];Object.defineProperty(w,'innerWidth',{value:1000,configurable:true,writable:true});Object.defineProperty(w,'innerHeight',{value:400,configurable:true,writable:true})}});
const w=dom.window,d=w.document,res=[],ok=(n,c)=>res.push([n,!!c]);
const mk=(btn={},ax=[0,0])=>({connected:true,id:'Wireless Controller (STANDARD GAMEPAD)',axes:ax,buttons:Array.from({length:17},(_,i)=>({pressed:!!btn[i],value:btn[i]?1:0})),vibrationActuator:{playEffect:()=>{vib++;return Promise.resolve()}}});
const poll=()=>w.eval('pollPad()');
// layout
ok('canvas fits a wide short window (letterboxed, keeps 800:448)',d.querySelector('#c').style.width=='714px'&&d.querySelector('#c').style.height=='400px');
w.innerWidth=1920;w.innerHeight=1080;w.eval('fit()');ok('canvas fills a 1920x1080 screen',d.querySelector('#c').style.width=='1920px'&&d.querySelector('#c').style.height=='1075px'.replace('1075','1075')||d.querySelector('#c').style.height=='1076px'||d.querySelector('#c').style.height=='1075px');
ok('canvas internal resolution grows with the screen (sharp when large)',d.querySelector('#c').width>800&&d.querySelector('#c').width<=1760);
w.ontouchstart=null;w.innerWidth=400;w.innerHeight=800;w.eval('fit()');ok('portrait phone shows the rotate hint',d.querySelector('#rot').style.display=='block');
w.innerWidth=800;w.innerHeight=400;w.eval('fit()');ok('landscape phone hides the rotate hint and fills the width/height',d.querySelector('#rot').style.display=='none'&&parseInt(d.querySelector('#c').style.height)>=399);
w.eval("window.thrown=0;try{toggleFS()}catch(e){window.thrown=1}");ok('fullscreen button never throws where fullscreen is unavailable',w.eval('window.thrown')==0);
// gamepad in play
w.eval("startLevel(0);mode='play';ov.style.display='none';cin=0");w.eval("mode='play';ov.style.display='none';K.l=K.r=K.d=K.j=0;p.buf=0");
pad=mk({15:1});poll();ok('D-pad right moves right',w.eval('K.r')==1);pad=mk({},[ -.9,0]);poll();ok('left stick left moves left and releases right',w.eval('K.l')==1&&w.eval('K.r')==0);
pad=mk();poll();ok('releasing the stick stops moving',w.eval('K.l')==0);
pad=mk({0:1});poll();ok('Cross jumps (and holds for a higher jump)',w.eval('K.j')==1&&w.eval('p.buf')>0);pad=mk();poll();ok('releasing Cross lets go',w.eval('K.j')==0);
w.eval('p.dcd=0');pad=mk({2:1});poll();ok('Square dashes',w.eval('p.dash')>0);pad=mk();poll();
w.eval('startLevel(0);mode="play";ov.style.display="none";p.dcd=0');pad=mk({5:1});poll();ok('R1 dashes too',w.eval('p.dash')>0);pad=mk();poll();
pad=mk();vib=0;w.eval("die(1)");ok('the controller rumbles on death',vib>0);w.eval('SV.rumble=0');vib=0;w.eval('die(1)');ok('vibration can be turned off',vib==0);w.eval('SV.rumble=1');
w.eval("startLevel(0);mode='play';ov.style.display='none'");pad=mk({9:1});poll();ok('Options pauses',w.eval('mode')=='pause'&&d.querySelector('#rs'));pad=mk();poll();
pad=mk({9:1});poll();ok('Options resumes from the pause menu',w.eval('mode')=='play');pad=mk();poll();
// gamepad in menus
w.eval('menu()');pad=mk();poll();pad=mk({13:1});poll();ok('D-pad moves the focus in menus',d.querySelectorAll('button.gpf').length==1);
const f=d.querySelector('button.gpf');let clicked=0;f.addEventListener('click',()=>clicked=1);pad=mk();poll();pad=mk({0:1});poll();ok('Cross presses the focused button',clicked==1);
w.eval('settings()');pad=mk();poll();pad=mk({1:1});poll();ok('Circle goes back to the main menu',!!d.querySelector('#cp')&&!d.querySelector('#t1'));
// challenge with the pad
w.eval("startLevel(0);mode='play';ov.style.display='none';const t=lv.tm[0];p.x=t.x-20;p.y=t.y-8;p.vx=p.vy=0");pad=mk();poll();pad=mk({1:1});poll();ok('Circle hacks a nearby terminal',w.eval('mode')=='chal');pad=mk();poll();
pad=mk({13:1});poll();pad=mk();poll();const sel=d.querySelector('#ops button.gpf');ok('D-pad highlights an answer',!!sel);
pad=mk({0:1});poll();ok('Cross submits the highlighted answer',/Hint|ACCESS/.test(d.querySelector('#ov').textContent));
// settings text
pad=mk();w.eval('settings()');ok('settings shows the controller status',d.querySelector('#ov').textContent.includes('Controller: connected'));
pad=null;poll();ok('no controller is handled quietly',w.eval('PCON')==0);
res.forEach(([n,v])=>console.log(v?'OK   ':'FAILS',n));process.exit(res.every(r=>r[1])?0:1);
