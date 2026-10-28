const field=document.querySelector('#gallery-field');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const groupNames={1:'空間',2:'視覺',3:'聲音'};
let items=[],activeIndex=0,raf=0,scrollLock='';
const viewer=document.querySelector('#image-viewer');
const positions={
 1:{x:[10,60,20,55,8,46,14],w:[26,23,25,27,28,25,29],y:[80,970,1910,2840,3890,4870,6200]},
 2:{x:[35,13,62,28,58,8,31],w:[22,21,23,21,24,59,61],y:[330,1330,2290,3290,4210,5270,6650]},
 3:{x:[54,37,6,48,13,59,32,9,66,45,24],w:[23,23,23,23,38,22,36,23,21,7,7],y:[570,1250,2040,2690,3500,4270,4890,5560,6300,6800,7180]}
};
function layout(){
 if(!field)return;
 const mobile=innerWidth<=780;field.classList.toggle('is-static',reduced.matches);
 field.style.height=reduced.matches?'auto':mobile?'11200px':'9000px';
 for(const entry of items){
  const p=positions[entry.group],i=entry.ordinal,card=entry.element;
  const ribbon=entry.aspect<.2;card.classList.toggle('ribbon',ribbon);
  const width=mobile?(ribbon?10:entry.aspect>2?83:[61,63,57,67][(i+entry.group)%4]):p.w[i];
  const left=mobile?(ribbon?[64,18][i%2]:[7,29,12,21,5][(i+entry.group)%5]):p.x[i];
  card.style.width=Math.min(width,96-left)+'vw';card.style.left=left+'vw';
  card.style.top=(mobile?p.y[i]*1.48+entry.group*22:p.y[i])+'px';
 }
 updateScroll();
}
function updateScroll(){
 raf=0;if(!field||!items.length)return;
 const rect=field.getBoundingClientRect(),distance=Math.max(0,Math.min(field.offsetHeight,-rect.top));
 const progress=Math.max(0,Math.min(1,(-rect.top+innerHeight*.3)/(field.offsetHeight-innerHeight*.4)));
 document.querySelector('.archive-progress').style.width=progress*100+'%';
 for(const layer of field.querySelectorAll('.parallax-layer')){
  const desktopSpeed=Number(layer.dataset.speed),speed=innerWidth<=780?1+(desktopSpeed-1)*.5:desktopSpeed;
  layer.style.transform=reduced.matches?'none':`translate3d(0,${distance*(1-speed)}px,0)`;
 }
}
function queueScroll(){if(!raf)raf=requestAnimationFrame(updateScroll);}
function showImage(index){
 activeIndex=(index+items.length)%items.length;const entry=items[activeIndex];
 const image=document.querySelector('#viewer-image');image.src=entry.src;image.alt=entry.title;
 document.querySelector('#viewer-title').textContent=entry.title;
 document.querySelector('#viewer-group').textContent=`0${entry.group} / ${groupNames[entry.group]}`;
 document.querySelector('#viewer-index').textContent=`${String(activeIndex+1).padStart(2,'0')} / ${items.length}`;
 document.querySelector('.viewer-stage').classList.remove('zoomed');document.querySelector('#viewer-fit').textContent='放大閱讀';document.querySelector('#viewer-fit').setAttribute('aria-pressed','false');
 document.querySelector('.viewer-stage').scrollTop=0;
}
function openViewer(index){showImage(index);scrollLock=document.body.style.overflow;document.body.style.overflow='hidden';viewer.showModal();}
if(field){
 fetch('./media/gallery.json').then(r=>{if(!r.ok)throw Error('gallery');return r.json();}).then(data=>{
  const counts={1:0,2:0,3:0};items=data.map((entry,index)=>{
   const ordinal=counts[entry.group]++,button=document.createElement('button');button.type='button';button.className='gallery-card';button.setAttribute('aria-label',`展開${groupNames[entry.group]}圖像：${entry.title}`);
   const image=document.createElement('img');image.src=entry.src;image.alt=entry.title;image.loading='lazy';image.decoding='async';image.width=entry.width;image.height=entry.height;
   const caption=document.createElement('figcaption');const title=document.createElement('span');title.textContent=entry.title;const count=document.createElement('span');count.textContent=`0${entry.group} / ${String(ordinal+1).padStart(2,'0')}`;caption.append(title,count);button.append(image,caption);button.addEventListener('click',()=>openViewer(index));field.querySelector(`[data-group="${entry.group}"]`).append(button);return {...entry,ordinal,element:button};
  });layout();window.__atlasGalleryReady=true;
 }).catch(error=>{console.error(error);field.textContent='圖像檔案暫時無法載入，請重新整理。';});
 addEventListener('scroll',queueScroll,{passive:true});addEventListener('resize',layout);reduced.addEventListener('change',layout);
 document.querySelectorAll('[data-layer]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-layer]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  field.querySelectorAll('.parallax-layer').forEach(layer=>layer.classList.toggle('muted-layer',button.dataset.layer!=='all'&&button.dataset.layer!==layer.dataset.group));
 }));
 document.querySelector('#viewer-close').onclick=()=>viewer.close();
 document.querySelector('#viewer-prev').onclick=()=>showImage(activeIndex-1);document.querySelector('#viewer-next').onclick=()=>showImage(activeIndex+1);
 document.querySelector('#viewer-fit').onclick=()=>{const stage=document.querySelector('.viewer-stage'),zoom=stage.classList.toggle('zoomed');document.querySelector('#viewer-fit').textContent=zoom?'適合畫面':'放大閱讀';document.querySelector('#viewer-fit').setAttribute('aria-pressed',String(zoom));};
 viewer.addEventListener('close',()=>{document.body.style.overflow=scrollLock;});
 viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close();}});
 document.addEventListener('keydown',e=>{if(!viewer.open)return;if(e.key==='ArrowLeft'){e.preventDefault();showImage(activeIndex-1);}if(e.key==='ArrowRight'){e.preventDefault();showImage(activeIndex+1);}});
}
const film=document.querySelector('#atlas-film');
if(film&&'IntersectionObserver'in window){let manuallyPaused=false,internal=false;
 film.addEventListener('pause',()=>{if(!internal&&film.getBoundingClientRect().top<innerHeight&&film.getBoundingClientRect().bottom>0)manuallyPaused=true;});
 new IntersectionObserver(entries=>{const visible=entries[0].isIntersecting;
  if(visible&&!reduced.matches&&!manuallyPaused)film.play().catch(()=>{});
  else if(!visible&&!film.paused){internal=true;film.pause();setTimeout(()=>internal=false,100);}
 },{threshold:.35}).observe(film);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)film.pause();});
}
