"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Client-only, properly reverted on route changes and React strict-mode cleanup.
export default function MotionController({ active }) {
  useEffect(() => {
    if (!active || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const host = document.querySelector(".website");
    if (!host) return;
    let schedule;
    let pawTimeline;
    let cancelled = false;
    const context = gsap.context(() => {
      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero.fromTo(".hero-copy .hero-offer", {autoAlpha:0,y:15},{autoAlpha:1,y:0,duration:.58})
        .fromTo(".hero-copy h1", {autoAlpha:0,y:42,rotateX:9},{autoAlpha:1,y:0,rotateX:0,duration:.95},"-=.28")
        .fromTo(".hero-copy p", {autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.7},"-=.58")
        .fromTo(".hero-copy .btn", {autoAlpha:0,scale:.8,y:14},{autoAlpha:1,scale:1,y:0,duration:.62,ease:"back.out(1.45)"},"-=.45")
        .fromTo(".hero-visual .hero-beagle", {autoAlpha:0,y:80,scale:.87},{autoAlpha:1,y:0,scale:1,duration:1.05,ease:"power3.out"},"-=.9");
      gsap.utils.toArray(".float-toy").forEach((item,i) => {
        gsap.to(item,{y:i%2?13:-16,rotation:i%2?-10:10,duration:2.4+i*.35,ease:"sine.inOut",repeat:-1,yoyo:true,delay:i*.25});
      });
      gsap.utils.toArray(".section-title, .offer-copy, .story-text, .newsletter-copy").forEach((node) => {
        gsap.fromTo(node,{autoAlpha:0,y:38},{autoAlpha:1,y:0,duration:.85,ease:"power3.out",scrollTrigger:{trigger:node,start:"top 88%",once:true}});
      });
      gsap.utils.toArray(".category-list, .product-grid, .benefit-grid").forEach((grid) => {
        const items = [...grid.children].filter(el => !el.classList.contains('paw-route'));
        if(!items.length)return;
        gsap.fromTo(items,{autoAlpha:0,y:42,scale:.94},{autoAlpha:1,y:0,scale:1,duration:.73,stagger:{each:.09,from:'start'},ease:'power3.out',scrollTrigger:{trigger:grid,start:"top 88%",once:true}});
      });
      gsap.utils.toArray(".offer").forEach((offer,i) => {
        gsap.fromTo(offer,{autoAlpha:0,x:i%2?40:-40,scale:.96},{autoAlpha:1,x:0,scale:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:offer,start:"top 89%",once:true}});
        const pet=offer.querySelector(".offer-animal");
        if(pet)gsap.fromTo(pet,{y:28,rotation:i%2?6:-4},{y:-12,rotation:0,ease:"none",scrollTrigger:{trigger:offer,start:"top bottom",end:"bottom top",scrub:1.5}});
      });
      gsap.fromTo(".story-art img",{y:45,rotation:-5},{y:-10,rotation:0,ease:"none",scrollTrigger:{trigger:".story-banner",start:"top bottom",end:"bottom top",scrub:1.7}});
    },host);

    // Only one walking trail at a time: dog, cat and rabbit paths play sequentially
    // with a varied pause and disappear to opacity 0 (never a permanent pale print).
    const walkingPaths = [...host.querySelectorAll(".paw-route")];
    function runPaws() {
      if(cancelled) return;
      const inView = walkingPaths.filter(el => {
        const r=el.getBoundingClientRect();
        return r.bottom>65 && r.top<innerHeight-35;
      });
      if(!inView.length) { schedule=gsap.delayedCall(2.4,runPaws);return; }
      const zone=inView[Math.floor(Math.random()*inView.length)];
      const prints=[...zone.querySelectorAll(".paw-footprint")];
      gsap.set(prints,{autoAlpha:0,scale:.68});
      pawTimeline=gsap.timeline({onComplete:()=>{schedule=gsap.delayedCall(2.8+Math.random()*3.5,runPaws)}});
      prints.forEach((el,i)=>{
        const t=i*.19;
        pawTimeline.to(el,{autoAlpha:1,scale:1,duration:.23,ease:"power2.out"},t)
          .to(el,{autoAlpha:0,scale:.92,duration:.48,ease:"sine.inOut"},t+.36);
      });
    }
    schedule=gsap.delayedCall(2.2,runPaws);
    return () => { cancelled=true; schedule?.kill(); pawTimeline?.kill(); context.revert(); ScrollTrigger.refresh(); };
  },[active]);
  return null;
}

export function WanderingPaws({kind="dog",className=""}) {
  // All footprints are pointer-events:none and aria-hidden, purely decorative.
  return <div className={`paw-route paw-route--${kind} ${className}`} aria-hidden="true">
    {Array.from({length:6},(_,i)=><span key={i} className={`paw-footprint paw-footprint--${i%2?'left':'right'}`}>
      <svg viewBox="0 0 30 32" width="25" height="26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {kind==="rabbit" ? <><ellipse cx="8" cy="8" rx="3" ry="7" transform="rotate(-22 8 8)"/><ellipse cx="19" cy="8" rx="3" ry="7" transform="rotate(20 19 8)"/><ellipse cx="14" cy="24" rx="9" ry="6"/></> : kind==="cat" ? <><ellipse cx="5.5" cy="11" rx="2.3" ry="3"/><ellipse cx="11.7" cy="6" rx="2.4" ry="3"/><ellipse cx="19" cy="6.5" rx="2.4" ry="3"/><ellipse cx="24.5" cy="12" rx="2.3" ry="3"/><path d="M15 14C10 14 7 22 6 25c-1.1 4 2.8 5.6 6.6 3.7 2-1 3.8-1.1 5.9 0 3.9 1.8 7.8.3 6.7-3.7-1-3-4-11-8.2-11.3Z"/></> : <><ellipse cx="5.7" cy="10.4" rx="2.8" ry="3.7"/><ellipse cx="12" cy="6" rx="2.8" ry="3.8"/><ellipse cx="19.1" cy="6.4" rx="2.7" ry="3.8"/><ellipse cx="25.2" cy="11.4" rx="2.8" ry="3.7"/><path d="M15 15.2c-4 0-5.3 3.8-8.2 5.8-3.1 2.3-1.6 8.3 2.7 8.3 2.3 0 3.4-1.6 5.5-1.6 2.2 0 3.3 1.6 5.5 1.6 4.3 0 5.9-6 2.7-8.3-3-2-4.2-5.8-8.2-5.8Z"/></>}
      </svg>
    </span>)}
  </div>;
}
