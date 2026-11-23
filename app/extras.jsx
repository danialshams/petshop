"use client";
import { useMemo, useState } from "react";

const pets = [
  { id: "dog", name: "سگ", emoji: "🐶", photo: "/images/beagle.webp", title: "برای رفیق وفادارت", caption: "بازی و خوراکی برای دُم‌های همیشه در حرکت", productIds: [3, 6] },
  { id: "cat", name: "گربه", emoji: "🐱", photo: "/images/cat.webp", title: "برای کوچولوی کنجکاوت", caption: "انتخاب‌های نرم و خوشمزه برای میو میوها", productIds: [2, 4] },
  { id: "rabbit", name: "خرگوش", emoji: "🐰", photo: "/images/rabbit.webp", title: "برای گوش‌دراز دوست‌داشتنی", caption: "پیشنهادهای عمومی مناسب استراحت کوچولوها", productIds: [4] },
  { id: "bird", name: "پرنده", emoji: "🐦", photo: "/images/parrot.webp", title: "برای آوازخون خونت", caption: "سرگرمی رنگی برای دوست پردارت", productIds: [7] },
];

function Arrow(){return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>}
const money = n => Number(n).toLocaleString("fa-IR") + " تومان";

export function PetSelector({ products, onShop, onAdd }) {
  const [selected, setSelected] = useState("cat");
  const pet = pets.find(p=>p.id===selected) || pets[1];
  const picks = useMemo(()=>pet.productIds.map(id=>products.find(p=>p.id===id)).filter(Boolean),[pet,products]);
  return <section id="pet-selector" className="pet-selector-shell" aria-labelledby="selector-title">
    <div className="selector-inner container">
      <div className="selector-main">
        <span className="selector-eyebrow">✨ فقط برای دوست کوچولوی تو</span>
        <h2 id="selector-title">انتخاب مخصوص پت تو</h2>
        <p className="selector-intro">دوستت رو انتخاب کن تا پیشنهادهای مناسب‌تری ببینی.</p>
        <div className="selector-tabs" role="group" aria-label="انتخاب نوع حیوان">
          {pets.map(p=><button type="button" key={p.id} className={selected===p.id?"is-selected":""} aria-pressed={selected===p.id} onClick={()=>setSelected(p.id)}><span aria-hidden="true">{p.emoji}</span>{p.name}</button>)}
        </div>
        <div className="selector-recommendations" key={pet.id}>
          <div className="selector-reco-heading"><strong>{pet.title}</strong><small>{pet.caption}</small></div>
          <div className="selector-products">
            {picks.map(p=><article className="selector-product" key={p.id}>
              <span className="selector-product-photo" style={{background:p.bg}}><img src={p.image} alt={p.title} loading="lazy" width="160" height="160"/></span>
              <span className="selector-product-info"><b>{p.title}</b><small>{money(p.price)}</small></span>
              <button type="button" aria-label={`افزودن ${p.title} به سبد خرید`} className="selector-add" onClick={()=>onAdd(p.id)}>+</button>
            </article>)}
          </div>
          {picks.length===1&&<p className="selector-empty-note">محصولات اختصاصی بیشتری در نسخه کامل فروشگاه اضافه می‌شوند.</p>}
        </div>
        <button type="button" className="selector-see-all" onClick={()=>onShop("shop",selected==="rabbit"?"all":selected)}>دیدن محصولات مرتبط <Arrow/></button>
      </div>
      <div className={`selector-portrait selector-portrait--${pet.id}`} key={pet.id}>
        <div className="selector-blob"/>
        <div className="selector-portrait-frame"/>
        <img src={pet.photo} alt={`تصویر ${pet.name}`} width="460" height="500" loading="lazy"/>
        <span aria-hidden="true" className="selector-spark one">✳</span><span aria-hidden="true" className="selector-spark two">♡</span>
      </div>
    </div>
  </section>;
}

const photos = [
  { name:"توله سگ پرانرژی", label:"بازیگوش", pos:"0% 0%", bg:"#dcf4c6" },
  { name:"گربه در حال نوازش", label:"خوشحال", pos:"50% 0%", bg:"#ffe9c2" },
  { name:"خرگوش در حال خوردن هویج", label:"ناز و آروم", pos:"100% 0%", bg:"#e0f3d0" },
  { name:"مرغ عشق آبی روی شاخه", label:"آوازخون", pos:"0% 100%", bg:"#d8f0ff" },
  { name:"سگ فرانسوی در حال استراحت", label:"خواب‌آلود", pos:"50% 100%", bg:"#e7daff" },
  { name:"بچه‌گربه در حال بازی", label:"کنجکاو", pos:"100% 100%", bg:"#ffe0ec" },
];
export function PetGallery(){
  const [expanded,setExpanded] = useState(false);
  return <section id="pet-gallery" className="gallery-shell" aria-labelledby="pet-gallery-title">
    <div className="gallery-inner container">
      <header className="gallery-heading"><span>📸 لحظه‌های رنگی کوچولوها</span><h2 id="pet-gallery-title">گالری دوستای پشمالو</h2><p>چند قاب بانمک از دوست‌های کوچولو؛ این تصاویر نمایشی هستند.</p></header>
      <div className="pet-gallery-grid">
        {photos.slice(0,expanded?6:4).map((photo,i)=><figure key={photo.name} className={`pet-gallery-card gallery-card-${i+1}`} style={{"--gallery-bg":photo.bg}}>
          <div role="img" aria-label={photo.name} className="pet-gallery-photo" style={{backgroundPosition:photo.pos}}/>
          <figcaption><span className="pet-gallery-heart" aria-hidden="true">♥</span>{photo.label}</figcaption>
        </figure>)}
      </div>
      <button type="button" className="gallery-more" onClick={()=>setExpanded(x=>!x)} aria-expanded={expanded}>{expanded?"نمایش کمتر":"دیدن عکس‌های بیشتر"}<Arrow/></button>
    </div>
  </section>;
}