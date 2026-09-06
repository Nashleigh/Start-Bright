const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const menu=$('.menu-toggle'),nav=$('.main-nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
$$('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
$$('.inner-page .inner-hero>div,.inner-page .value-grid article,.inner-page .activity-grid article,.inner-page .contact-cards article,.inner-page .fee-grid article').forEach(x=>x.classList.add('reveal'));
if(!reduce){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(x=>io.observe(x));}
else $$('.reveal').forEach(x=>x.classList.add('seen'));
const tabs=$$('.switcher button');tabs.forEach(b=>b.addEventListener('click',()=>{tabs.forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',String(x===b))});$$('.place').forEach(p=>{const yes=p.id===b.dataset.place;p.hidden=!yes;p.classList.toggle('active',yes)})}));
const closeDoor=card=>{card.classList.remove('open');const face=$('.door-face',card);face.setAttribute('aria-expanded','false');$('b',face).textContent='Peek inside'};
$$('.door-face').forEach(b=>b.addEventListener('click',()=>{const card=b.closest('.door');$$('.door').forEach(closeDoor);card.classList.add('open');b.setAttribute('aria-expanded','true');$('b',b).textContent='Tap again to close'}));
$$('.door-info').forEach(back=>{back.setAttribute('role','button');back.setAttribute('tabindex','0');back.setAttribute('aria-label','Close room door');const close=()=>{const card=back.closest('.door');closeDoor(card);$('.door-face',card).focus()};back.addEventListener('click',close);back.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();close()}})});
const counts=$$('[data-count]');const countObs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=+el.dataset.count,index=counts.indexOf(el),duration=2800,delay=index*320;setTimeout(()=>{el.parentElement.classList.add('counting');const start=performance.now();const tick=n=>{const p=Math.min((n-start)/duration,1),ease=1-Math.pow(1-p,3);el.textContent=Math.round(target*ease)+(target===18?'+':'');if(p<1)requestAnimationFrame(tick);else{el.parentElement.classList.remove('counting');el.parentElement.classList.add('landed')}};requestAnimationFrame(tick)},delay);countObs.unobserve(el)}),{threshold:.45});counts.forEach(x=>countObs.observe(x));
const chatBtn=$('.chat-bubble'),chat=$('.chat');function toggleChat(force){const open=force??chat.hidden;chat.hidden=!open;chatBtn.setAttribute('aria-expanded',String(open));if(open)$('.chat-close')?.focus()}chatBtn?.addEventListener('click',()=>toggleChat());$('.chat-close')?.addEventListener('click',()=>toggleChat(false));
$('.enquiry')?.addEventListener('submit',e=>{e.preventDefault();$('.form-note').textContent='Thank you for your enquiry. Our team will be in touch soon.';e.currentTarget.classList.add('sent')});
$('[data-year]').textContent=new Date().getFullYear();
$('.back-to-top')?.addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'}));
if(!reduce)$$('.inner-page .photo-placeholder').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5)*8+'deg');card.style.setProperty('--my',-((e.clientY-r.top)/r.height-.5)*8+'deg')}));
if(!reduce&&$('.hero-art'))addEventListener('scroll',()=>{document.documentElement.style.setProperty('--scroll',Math.min(scrollY*.08,65)+'px')},{passive:true});

$$('[data-carousel]').forEach(carousel=>{
  const slides=$$('.carousel-slide',carousel),track=$('.carousel-track',carousel),dots=$('.carousel-dots',carousel);
  if(slides.length<2)return;
  let current=0,startX=0,dragging=false;
  const load=slide=>{if(slide?.dataset.src){slide.src=slide.dataset.src;delete slide.dataset.src}};
  const show=(next,focusDot=false)=>{
    current=(next+slides.length)%slides.length;
    load(slides[current]);load(slides[(current+1)%slides.length]);
    track.style.transform=`translate3d(${-current*100}%,0,0)`;
    slides.forEach((slide,index)=>{slide.classList.toggle('is-active',index===current);slide.setAttribute('aria-hidden',String(index!==current))});
    $$('.carousel-dot',carousel).forEach((dot,index)=>{dot.classList.toggle('is-active',index===current);dot.setAttribute('aria-current',index===current?'true':'false')});
    if(focusDot)$$('.carousel-dot',carousel)[current]?.focus();
  };
  slides.forEach((slide,index)=>{const dot=document.createElement('button');dot.type='button';dot.className='carousel-dot';dot.setAttribute('aria-label',`Show photo ${index+1}`);dot.addEventListener('click',()=>show(index));dots.append(dot)});
  $('.carousel-arrow.prev',carousel)?.addEventListener('click',()=>show(current-1));
  $('.carousel-arrow.next',carousel)?.addEventListener('click',()=>show(current+1));
  carousel.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(current-1,true);if(e.key==='ArrowRight')show(current+1,true)});
  carousel.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;startX=e.clientX;dragging=true;carousel.setPointerCapture?.(e.pointerId)});
  carousel.addEventListener('pointerup',e=>{if(!dragging)return;dragging=false;const distance=e.clientX-startX;if(Math.abs(distance)>45)show(current+(distance<0?1:-1))});
  carousel.addEventListener('pointercancel',()=>dragging=false);
  show(0);
});
if(!reduce){
  $$('.quick-links,.nursery-switch,.aim,.rooms,.gallery,.more-links').forEach((section,index)=>{
    section.classList.add('star-field');
    for(let i=0;i<2;i++){
      const star=document.createElement('span');
      star.className='shooting-star';
      star.style.setProperty('--star-x',`${12+((index*23+i*41)%76)}%`);
      star.style.setProperty('--star-y',`${10+((index*17+i*29)%68)}%`);
      star.style.setProperty('--star-delay',`${(index*1.35+i*4.1)%11}s`);
      section.append(star);
    }
  });
  let lastSpark=0,lastX=0,lastY=0;
  addEventListener('pointermove',e=>{
    if(e.pointerType==='touch'||innerWidth<900)return;
    const now=performance.now(),distance=Math.hypot(e.clientX-lastX,e.clientY-lastY);
    if(now-lastSpark<70||distance<24)return;
    lastSpark=now;lastX=e.clientX;lastY=e.clientY;
    const spark=document.createElement('span');
    spark.className='cursor-spark';spark.textContent=Math.random()>.45?'✦':'·';
    spark.style.left=`${e.clientX}px`;spark.style.top=`${e.clientY}px`;
    document.body.append(spark);setTimeout(()=>spark.remove(),850);
  },{passive:true});
}
