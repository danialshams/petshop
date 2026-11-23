"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const kinds = ["dog", "cat", "rabbit"];
const zones = ".hero-wrap, #categories, #offers, #pet-selector, #shop, .story-banner, #pet-gallery, .benefits, .newsletter, .footer";
const randomBetween = (a,b)=> a+Math.random()*(b-a);

export default function MotionController({ active }) {
  useEffect(() => {
    if (!active || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const host=document.querySelector('.website');
    const overlay=document.querySelector('.paw-trot-overlay');
    if (!host || !overlay) return;
    let timer=null;
    let pawTimeline=null;
    let disposed=false;
    let order=[];
    let lastZone=null;

    const ctx=gsap.context(()=>{
      const hero=gsap.timeline({defaults:{ease:'power3.out'}});
      hero.fromTo('.hero-copy .hero-offer',{autoAlpha:0,y:15},{autoAlpha:1,y:0,duration:.55})
          .fromTo('.hero-copy h1',{autoAlpha:0,y:38},{autoAlpha:1,y:0,duration:.9},'-=.24')
          .fromTo('.hero-copy p',{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.68},'-=.52')
          .fromTo('.hero-copy .btn',{autoAlpha:0,scale:.9,y:15},{autoAlpha:1,scale:1,y:0,duration:.6,ease:'back.out(1.3)'},'-=.4')
          .fromTo('.hero-beagle',{autoAlpha:0,y:60,scale:.92},{autoAlpha:1,y:0,scale:1,duration:1.05},'-=.83');
      gsap.utils.toArray('.float-toy').forEach((toy,i)=>gsap.to(toy,{y:i%2?15:-15,rotation:i%2?-8:8,duration:2.5+i*.4,ease:'sine.inOut',repeat:-1,yoyo:true,delay:i*.22}));
      gsap.utils.toArray('.section-title, .offer-copy, .story-text, .newsletter-copy, .selector-main, .gallery-heading').forEach(node=>{
        gsap.fromTo(node,{autoAlpha:0,y:35},{autoAlpha:1,y:0,duration:.83,ease:'power3.out',scrollTrigger:{trigger:node,start:'top 88%',once:true}});
      });
      gsap.utils.toArray('.category-list, .product-grid, .benefit-grid, .pet-gallery-grid').forEach(grid=>{
        const children=[...grid.children].filter(el=>!el.classList.contains('paw-route'));
        if(children.length)gsap.fromTo(children,{autoAlpha:0,y:35,scale:.95},{autoAlpha:1,y:0,scale:1,duration:.76,stagger:.095,ease:'power3.out',scrollTrigger:{trigger:grid,start:'top 89%',once:true}});
      });
      gsap.utils.toArray('.offer').forEach((offer,i)=>{
        gsap.fromTo(offer,{autoAlpha:0,x:i?35:-35},{autoAlpha:1,x:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:offer,start:'top 89%',once:true}});
        const pet=offer.querySelector('.offer-animal');
        if(pet)gsap.fromTo(pet,{y:25},{y:-9,ease:'none',scrollTrigger:{trigger:offer,start:'top bottom',end:'bottom top',scrub:1.4}});
      });
      gsap.fromTo('.story-art img',{y:40},{y:-10,ease:'none',scrollTrigger:{trigger:'.story-banner',start:'top bottom',end:'bottom top',scrub:1.6}});
      gsap.fromTo('.selector-portrait',{autoAlpha:0,y:55,rotation:-3},{autoAlpha:1,y:0,rotation:0,duration:.95,ease:'power3.out',scrollTrigger:{trigger:'.pet-selector-shell',start:'top 85%',once:true}});
    },host);

    function shuffleAnimals(){
      if(order.length===0)order=gsap.utils.shuffle([...kinds]);
      return order.pop();
    }
    function visibleZone(){
      const vh=window.innerHeight;
      const vw=window.innerWidth;
      const candidates=[...host.querySelectorAll(zones)].map(el=>({el,rect:el.getBoundingClientRect()}))
        .filter(({rect})=>Math.min(rect.bottom,vh-78)-Math.max(rect.top,92)>100 && Math.min(rect.right,vw)-Math.max(rect.left,0)>190);
      if(!candidates.length)return null;
      const other=candidates.filter(({el})=>el!==lastZone);
      const pool=other.length?other:candidates;
      const choice=pool[Math.floor(Math.random()*pool.length)];
      lastZone=choice.el;
      const r=choice.rect;
      const mobile=vw<600;
      const trailWidth=mobile?190:240;
      const leftMin=Math.max(12,r.left+15);
      const leftMax=Math.min(vw-trailWidth-12,r.right-trailWidth-15);
      const topMin=Math.max(100,r.top+24);
      const topMax=Math.min(vh-110,r.bottom-80);
      return {x:randomBetween(leftMin,Math.max(leftMin,leftMax)),y:randomBetween(topMin,Math.max(topMin,topMax)),scale:mobile ? 0.77 : 1};
    }
    function runNext(){
      if(disposed)return;
      if(document.hidden || host.querySelector('.overlay') || host.querySelector('.cart-overlay')){
        timer=gsap.delayedCall(2,runNext);return;
      }
      const point=visibleZone();
      if(!point){timer=gsap.delayedCall(1.8,runNext);return;}
      const kind=shuffleAnimals();
      const route=overlay.querySelector(`[data-animal="${kind}"]`);
      if(!route){timer=gsap.delayedCall(2.5,runNext);return;}
      const footprints=[...route.querySelectorAll('.paw-footprint')];
      gsap.set(route,{autoAlpha:1,x:point.x,y:point.y,rotation:randomBetween(-20,20),scale:point.scale});
      gsap.set(footprints,{autoAlpha:0,scale:.79});
      pawTimeline=gsap.timeline({onComplete:()=>{
        gsap.set(route,{autoAlpha:0});
        timer=gsap.delayedCall(randomBetween(3.3,5.8),runNext);
      }});
      footprints.forEach((foot,i)=>{
        const at=i*.21;
        pawTimeline.to(foot,{autoAlpha:1,scale:1,duration:.22,ease:'power2.out'},at)
          .to(foot,{autoAlpha:0,scale:.95,duration:.46,ease:'sine.inOut'},at+.28);
      });
    }
    timer=gsap.delayedCall(1.4,runNext);
    return ()=>{disposed=true;timer?.kill();pawTimeline?.kill();ctx.revert();};
  },[active]);
  return <div className="paw-trot-overlay" aria-hidden="true">
    {kinds.map(kind=><WanderingPaws key={kind} kind={kind} className="paw-route-overlay" dataKind={kind}/>)}
  </div>;
}

export function WanderingPaws({kind="dog",className="",dataKind}){
  return <div data-animal={dataKind} className={`paw-route paw-route--${kind} ${className}`} aria-hidden="true">
    {Array.from({length:6},(_,i)=><span key={i} className={`paw-footprint paw-footprint--${i%2?'left':'right'}`}>
      <svg viewBox="0 0 30 32" width="25" height="26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {kind==='rabbit'?<><ellipse cx="8" cy="8" rx="3" ry="7" transform="rotate(-22 8 8)"/><ellipse cx="19" cy="8" rx="3" ry="7" transform="rotate(20 19 8)"/><ellipse cx="14" cy="24" rx="9" ry="6"/></>:kind==='cat'?<><ellipse cx="5.5" cy="11" rx="2.3" ry="3"/><ellipse cx="11.7" cy="6" rx="2.4" ry="3"/><ellipse cx="19" cy="6.5" rx="2.4" ry="3"/><ellipse cx="24.5" cy="12" rx="2.3" ry="3"/><path d="M15 14C10 14 7 22 6 25c-1.1 4 2.8 5.6 6.6 3.7 2-1 3.8-1.1 5.9 0 3.9 1.8 7.8.3 6.7-3.7-1-3-4-11-8.2-11.3Z"/></>:<><ellipse cx="5.7" cy="10.4" rx="2.8" ry="3.7"/><ellipse cx="12" cy="6" rx="2.8" ry="3.8"/><ellipse cx="19.1" cy="6.4" rx="2.7" ry="3.8"/><ellipse cx="25.2" cy="11.4" rx="2.8" ry="3.7"/><path d="M15 15.2c-4 0-5.3 3.8-8.2 5.8-3.1 2.3-1.6 8.3 2.7 8.3 2.3 0 3.4-1.6 5.5-1.6 2.2 0 3.3 1.6 5.5 1.6 4.3 0 5.9-6 2.7-8.3-3-4.2-11-8.2-11.3Z"/></>}
      </svg>
    </span>)}
  </div>;
}