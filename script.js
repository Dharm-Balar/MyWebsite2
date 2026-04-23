/* ═══════════════════════════════════════════════
   BK INTERIOR DESIGN — SHARED JAVASCRIPT
   script.js · All pages
═══════════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('curRing');
if(cur && curR){
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    cur.style.left=mx+'px'; cur.style.top=my+'px';
  });
  (function loop(){
    rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
    curR.style.left=rx+'px'; curR.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.svc-card,.port-item,.testi-card,.ba-container,.pf-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('link-hovered'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('link-hovered'));
  });
}

/* ── LOADER ── */
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const loader = document.getElementById('loader');
    if(loader){ loader.classList.add('done'); document.body.style.overflow='auto'; }
  },2000);
});
document.body.style.overflow='hidden';

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll',()=>{
  const nav = document.getElementById('nav');
  if(nav) nav.classList.toggle('scrolled', scrollY > 30);
},{passive:true});

/* ── HAMBURGER ── */
function closeMob(){
  const ham    = document.getElementById('ham');
  const mobNav = document.getElementById('mobNav');
  if(ham)    ham.classList.remove('open');
  if(mobNav) mobNav.classList.remove('open');
}
const hamBtn = document.getElementById('ham');
if(hamBtn){
  hamBtn.addEventListener('click',function(){
    this.classList.toggle('open');
    document.getElementById('mobNav').classList.toggle('open');
  });
}

/* ── REVEAL ON SCROLL ── */
function checkReveal(){
  document.querySelectorAll('.reveal:not(.on),.reveal-l:not(.on),.reveal-r:not(.on)').forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight - 80){
      const delay = parseFloat(el.className.match(/delay-(\d)/)?.[1]||0)*0.1;
      setTimeout(()=>el.classList.add('on'), delay*1000);
    }
  });
}
window.addEventListener('scroll', checkReveal, {passive:true});
setTimeout(checkReveal, 1800);

/* ── HERO SLIDER (index.html only) ── */
if(document.querySelector('.hero')){
  let current=0, total=4, sliderTimer;
  function goSlide(n){
    document.querySelectorAll('.slide').forEach(s=>s.classList.remove('active'));
    document.querySelectorAll('.sd').forEach(d=>d.classList.remove('active'));
    current=((n%total)+total)%total;
    document.querySelectorAll('.slide')[current].classList.add('active');
    document.querySelectorAll('.sd')[current].classList.add('active');
  }
  function nextSlide(){ goSlide(current+1) }
  function prevSlide(){ goSlide(current-1) }
  function startSlider(){ sliderTimer=setInterval(nextSlide,5500) }
  function stopSlider(){ clearInterval(sliderTimer) }
  startSlider();
  document.querySelector('.hero').addEventListener('mouseenter',stopSlider);
  document.querySelector('.hero').addEventListener('mouseleave',startSlider);
  // expose for inline onclick
  window.goSlide   = goSlide;
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
}

/* ── BEFORE/AFTER SLIDER ── */
function initBA(containerId, handleId){
  const container = document.getElementById(containerId);
  const handle    = document.getElementById(handleId);
  if(!container||!handle) return;
  const afterEl = container.querySelector('.ba-after');
  let dragging = false;
  function setPos(e){
    const rect    = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let pct = ((clientX-rect.left)/rect.width)*100;
    pct = Math.max(5,Math.min(95,pct));
    handle.style.left = pct+'%';
    afterEl.style.clipPath = `inset(0 ${100-pct}% 0 0)`;
  }
  container.addEventListener('mousedown',e=>{ dragging=true; setPos(e) });
  window.addEventListener('mousemove',e=>{ if(dragging) setPos(e) });
  window.addEventListener('mouseup',()=>dragging=false);
  container.addEventListener('touchstart',e=>{ dragging=true; setPos(e) },{passive:true});
  window.addEventListener('touchmove',e=>{ if(dragging) setPos(e) },{passive:true});
  window.addEventListener('touchend',()=>dragging=false);
}
initBA('ba1','bah1');
initBA('ba2','bah2');

/* ── PORTFOLIO FILTER ── */
window.filterPort = function(cat,btn){
  document.querySelectorAll('.pf-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.port-item').forEach(item=>{
    if(cat==='all'||item.dataset.cat===cat){
      item.style.display='';
      item.style.animation='fadeUpItem .5s ease both';
    } else {
      item.style.display='none';
    }
  });
};

/* ── FORMS ── */
window.submitContact = function(){
  const n = document.getElementById('ctName')?.value.trim();
  const p = document.getElementById('ctPhone')?.value.trim();
  const s = document.getElementById('ctService')?.value;
  const m = document.getElementById('ctMsg')?.value.trim();
  if(!n||!p){ alert('Please enter your name and phone number.'); return; }
  const msg=`Hi BK Interior Design! 🏠\n\nName: ${n}\nPhone: ${p}\nService: ${s||'Not specified'}\n${m?'Message: '+m:''}\n\nPlease get in touch at your earliest.`;
  window.open('https://wa.me/919979432272?text='+encodeURIComponent(msg),'_blank');
  const s2 = document.getElementById('ctSuccess');
  if(s2) s2.classList.add('show');
};

window.submitCareer = function(){
  const n   = document.getElementById('cName')?.value.trim();
  const p   = document.getElementById('cPhone')?.value.trim();
  const pos = document.getElementById('cPosition')?.value;
  if(!n||!p){ alert('Please enter your name and phone number.'); return; }
  const msg=`Hi BK Interior Design! 👋\n\nI'd like to apply for a position.\n\nName: ${n}\nPhone: ${p}\nEmail: ${document.getElementById('cEmail')?.value||'Not provided'}\nPosition: ${pos||'Not specified'}\n\nPlease consider my application.`;
  window.open('https://wa.me/919979432272?text='+encodeURIComponent(msg),'_blank');
  const s = document.getElementById('careerSuccess');
  if(s) s.classList.add('show');
};

/* ── FILE INPUT ── */
const resumeInput = document.getElementById('cResume');
if(resumeInput){
  resumeInput.addEventListener('change',function(){
    const fn = document.getElementById('fileName');
    if(fn) fn.textContent = this.files[0] ? '✓ '+this.files[0].name : '';
  });
}

/* ── INJECT FADE-UP KEYFRAME ── */
const kfStyle = document.createElement('style');
kfStyle.textContent='@keyframes fadeUpItem{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}';
document.head.appendChild(kfStyle);
