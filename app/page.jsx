"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const photos = {
 golden: "/images/hero-golden.webp",
 dachshund: "/images/hero-dachshund.webp",
 ginger: "/images/hero-cat.webp",
 puppy: "/images/hero-puppy.webp",
 happy: "/images/hero-golden.webp",
 cat: "/images/hero-cat.webp",
};
const products = [
 {id:1,name:"تشویقی خوشمزه سگ",kind:"سگ",price:285000,old:350000,tag:"محبوب",art:"🦴",bg:"#fff0db"},
 {id:2,name:"اسباب‌بازی توپ رنگی",kind:"سگ",price:189000,old:0,tag:"جدید",art:"🎾",bg:"#dff1fc"},
 {id:3,name:"خانه نرم گربه",kind:"گربه",price:980000,old:1180000,tag:"تخفیف",art:"🐱",bg:"#ffedcc"},
 {id:4,name:"ظرف غذای سرامیکی",kind:"گربه",price:420000,old:0,tag:"",art:"🥣",bg:"#f1e8ff"},
 {id:5,name:"گردنبند رنگی پت",kind:"سگ",price:260000,old:320000,tag:"محبوب",art:"🦮",bg:"#dbf5df"},
 {id:6,name:"اسباب‌بازی پرنده",kind:"پرندگان",price:175000,old:0,tag:"جدید",art:"🪶",bg:"#ffebe9"},
 {id:7,name:"تونل بازی گربه",kind:"گربه",price:695000,old:760000,tag:"",art:"🐈",bg:"#e6f4ff"},
 {id:8,name:"لوازم مراقبت ماهی",kind:"آبزیان",price:225000,old:0,tag:"",art:"🐠",bg:"#fff5cf"}
];
const categories = [{name:"سگ",emoji:"🐶",bg:"#fae9d1",note:"برای رفیق وفادارت"},{name:"گربه",emoji:"🐱",bg:"#d8f0df",note:"برای کوچولوی بازیگوشت"},{name:"پرندگان",emoji:"🦜",bg:"#dcefff",note:"برای آوازخون خونت"},{name:"آبزیان",emoji:"🐠",bg:"#fce5e2",note:"برای دنیای زیر آب"}];
const price = n => Number(n).toLocaleString("fa-IR")+" تومان";
function Icon({name,size=22,fill="none",strokeWidth=1.85}) {
 const paths={
  search:<><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></>,
  bag:<><path d="M4 8h16l-1 13H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
  heart:<path d="M20.8 8.5c0 5-8.8 11-8.8 11s-8.8-6-8.8-11a4.7 4.7 0 0 1 8.8-2.1 4.7 4.7 0 0 1 8.8 2.1Z"/>,
  arrow:<><path d="M4 12h16"/><path d="m13 5 7 7-7 7"/></>,
  paw:<><ellipse cx="7.1" cy="7" rx="1.5" ry="2"/><ellipse cx="12.2" cy="5.3" rx="1.5" ry="2"/><ellipse cx="17.2" cy="7" rx="1.5" ry="2"/><ellipse cx="20" cy="12.2" rx="1.4" ry="1.8"/><path d="M8 20c-3.8 0-4.6-3.5-2.8-5 1.2-1.2 2.7-1.2 3.7-3 1.2-2.3 4.6-2.3 5.8 0 1 1.8 2.6 1.8 3.7 3 1.8 1.5.9 5-2.8 5-2.2 0-3.5-1.5-5.4-1.5S10.2 20 8 20Z"/></>,
  menu:<><path d="M4 7h16M4 12h16M4 17h16"/></>,
  close:<path d="m5 5 14 14M19 5 5 19"/>,
  plus:<path d="M12 4v16M4 12h16"/>,
  minus:<path d="M4 12h16"/>,
  truck:<><path d="M2 7h12v10H2zM14 10h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  star:<path d="m12 2 3.1 6.4 7 1-5.1 4.9 1.2 7-6.2-3.3-6.2 3.3 1.2-7L2 9.4l7-1L12 2Z"/>,
  shield:<><path d="M12 2 4 5v6c0 5 3.2 8.5 8 11 4.8-2.5 8-6 8-11V5l-8-3Z"/><path d="m8.5 12 2.3 2.3 4.7-5"/></>,
  box:<><path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z"/><path d="M3 7l9 4 9-4M12 11v10"/></>
 };
 return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{paths[name]||paths.paw}</svg>;
}
function BarkingDog() {
 return <svg viewBox="0 0 230 205" role="img" aria-label="سگ بانمک در حال پارس کردن" className="loader-dog">
 <path d="M73 67 45 35 28 76Q46 89 66 84M158 65l30-32 18 45-41 10" fill="#ffb71b" stroke="#271510" strokeWidth="6" strokeLinejoin="round"/>
 <path d="M57 84c-4-39 33-64 61-61 34-2 65 25 64 63 16 18 22 50 11 70-17 35-132 42-158 2-12-19-5-54 22-74Z" fill="#fff" stroke="#271510" strokeWidth="6"/>
 <path d="M57 78c9-33 38-26 44-16 3 8-2 30-12 32H61Z" fill="#ffb71b" stroke="#271510" strokeWidth="5"/>
 <circle cx="88" cy="79" r="10" fill="#23191b"/><circle cx="138" cy="79" r="10" fill="#23191b"/>
 <ellipse cx="115" cy="111" rx="40" ry="27" fill="#4b1014"/>
 <path className="dog-jaw" d="M91 137q24 28 47 0v12q-24 27-47 0Z" fill="#9d2931"/>
 <path d="M68 150q13 30 42 7M160 151q-16 31-43 7" fill="none" stroke="#dedede" strokeWidth="6" strokeLinecap="round"/>
 <path d="M73 180q38 25 83 0" stroke="#222" strokeWidth="15" fill="none" strokeLinecap="round"/>
 <circle cx="115" cy="194" r="8" fill="#f8a323"/>
 </svg>;
}
function Loader({onDone}) {
 const [step,setStep]=useState(0);
 useEffect(()=>{
   let active=true;
   let assetsReady=false;
   let fullLoopPlayed=false;
   let completed=false;
   const timers=[];
   const finish=()=>{
     if(active && assetsReady && fullLoopPlayed && !completed){
       completed=true;
       onDone();
     }
   };
   // Exactly the supplied dog animation: a 6-second transparent WebP loop.
   const dog=new window.Image();
   const imageSources=[
     "/images/hero-golden.webp",
     "/images/hero-dachshund.webp",
     "/images/hero-cat.webp",
     "/images/hero-puppy.webp",
   ];
   const prefetch=(src)=>new Promise(resolve=>{
     const img=new window.Image();
     img.onload=resolve; img.onerror=resolve;
     img.src=src;
   });
   Promise.all(imageSources.map(prefetch)).then(()=>{
     assetsReady=true;
     finish();
   });
   const markLoopFinished=()=>{
     fullLoopPlayed=true;
     finish();
   };
   dog.onload=()=>{
     // The animation uses 75 frames at 80ms; never reveal the page before a full loop.
     timers.push(setTimeout(markLoopFinished,6050));
   };
   dog.onerror=()=>{
     // Fail gracefully, without trapping the customer on the loading screen.
     timers.push(setTimeout(markLoopFinished,6050));
   };
   dog.src="/images/dog-barking-transparent.webp";
   const progress=setInterval(()=>{
     if(active)setStep(prev=>(prev+1)%6);
   },430);
   // Handle genuinely missing media or stalled image requests.
   const fallback=setTimeout(()=>{
     assetsReady=true;
     fullLoopPlayed=true;
     finish();
   },12000);
   return ()=>{
     active=false;
     clearInterval(progress);
     clearTimeout(fallback);
     timers.forEach(clearTimeout);
   };
 },[onDone]);
 return <div className="loading-screen" aria-live="polite">
   <div className="loading-content">
     <img className="loader-dog" src="/images/dog-barking-transparent.webp" alt="سگ بامزه در حال پارس کردن" width="320" height="320" />
     <span className="loading-title">داریم برای خوشحالی کوچولوت آماده می‌شیم!</span>
     <div className="paw-trail" dir="ltr" aria-label="در حال بارگذاری">
       {Array.from({length:6},(_,i)=>{
         const age=(step-i+6)%6;
         const opacity=age===0?1:age===1?.72:age===2?.45:age===3?.25:.09;
         return <span key={i} className={"paw-step "+(i%2?"down":"up")} style={{opacity}}>
           <Icon name="paw" size={27} fill="currentColor" strokeWidth={1.1}/>
         </span>;
       })}
     </div>
   </div>
 </div>;
}
function CatTree(){return <div className="cat-tree" aria-label="خانه چند طبقه گربه"><div className="tree-roof"/><div className="tree-pole pole-one"/><div className="tree-pole pole-two"/><div className="tree-middle"/><div className="tree-house"><span/></div><div className="tree-floor"/></div>}
export default function Home(){
 const [loading,setLoading]=useState(true);
 const [menu,setMenu]=useState(false);
 const [cartOpen,setCartOpen]=useState(false);
 const [cart,setCart]=useState({});
 const [filter,setFilter]=useState("همه");
 const [searchOpen,setSearchOpen]=useState(false);
 const [search,setSearch]=useState("");
 const [liked,setLiked]=useState([]);
 const finish=useCallback(()=>setLoading(false),[]);
 const cartCount=Object.values(cart).reduce((a,b)=>a+b,0);
 const cartPrice=products.reduce((a,p)=>a+(cart[p.id]||0)*p.price,0);
 const visible=useMemo(()=>products.filter(p=>(filter==="همه"||p.kind===filter)&&(!search||p.name.includes(search))),[filter,search]);
 const add=id=>{setCart(c=>({...c,[id]:(c[id]||0)+1}));setCartOpen(true)};
 const change=(id,delta)=>setCart(c=>{const next={...c};next[id]=Math.max(0,(next[id]||0)+delta);if(!next[id])delete next[id];return next});
 const toShop=cat=>{setFilter(cat||"همه");document.getElementById("shop")?.scrollIntoView({behavior:"smooth"})};
 useEffect(()=>{document.body.style.overflow=(cartOpen||menu)?"hidden":"";return()=>{document.body.style.overflow=""}},[cartOpen,menu]);
 return <>
 {loading&&<Loader onDone={finish}/>}
 <div className="site-frame">
 <section id="home" className="hero-shell">
 <header className="topbar">
 <button className="mobile-paw-menu" type="button" title="منو" aria-label="بازکردن منو" aria-expanded={menu} onClick={()=>setMenu(true)}><Icon name="paw" size={26} fill="currentColor" strokeWidth={1.35}/></button>
 <a className="brand" href="#home" aria-label="خانه کوزی پاوز"><span className="brand-icon"><Icon name="paw" size={29} fill="currentColor"/></span><span>کوزی<span>پاوز</span></span></a>
 <nav className="nav-links" aria-label="فهرست اصلی"><a href="#home" className="active">خانه</a><a href="#shop">فروشگاه</a><a href="#categories">دسته‌بندی‌ها</a><a href="#benefits">ارسال و پرداخت</a><a href="#about">درباره ما</a></nav>
 <div className="top-actions"><button type="button" title="جست‌وجو" aria-label="جست‌وجو" onClick={()=>{setSearchOpen(s=>!s);toShop("همه")}}><Icon name="search"/></button><button type="button" title="علاقه‌مندی‌ها" aria-label="علاقه‌مندی‌ها" onClick={()=>document.getElementById("shop")?.scrollIntoView({behavior:"smooth"})}><Icon name="heart" fill={liked.length?"#ff772b":"none"}/></button><button type="button" title="سبد خرید" aria-label="سبد خرید" onClick={()=>setCartOpen(true)} className="cart-top"><Icon name="bag"/>{cartCount>0&&<span className="count">{cartCount.toLocaleString("fa-IR")}</span>}</button></div>
 </header>
 <div className="hero-stage">
 <div className="hero-wordmark"><h1>هرچی که <span>پتت عاشقشه!</span></h1><p>برای بهترین رفیق دنیا، بهترین‌ها رو انتخاب کن.</p></div>
 <div className="hero-feature"><CatTree/><div className="feature-details"><span>خانه گربه کوزی</span><strong>۹۸۰ هزار تومان</strong></div><button aria-label="مشاهده خانه گربه" onClick={()=>toShop("گربه")} className="feature-arrow"><Icon name="arrow" size={19}/></button></div>
 <div className="side-review"><div className="side-review-photo"><img src={photos.puppy} alt="سگ کوچک" loading="eager"/></div><p>ویدیوهای بامزه و نظر صاحبان پت‌ها</p><span>دیدن تجربه‌ها <Icon name="arrow" size={13}/></span></div>
 <div className="hero-dog"><img src={photos.golden} alt="گلدن رتریور شاد در مرکز پت شاپ" fetchPriority="high"/></div>
 <div className="hero-lower-pet pet-left"><img src={photos.dachshund} alt="سگ بانمک گوشه پایین" loading="eager"/></div>
 <div className="hero-lower-pet pet-right"><img src={photos.ginger} alt="گربه نارنجی کنجکاو" loading="eager"/></div>
 </div>
 <div className="hero-bottom">
 <div className="bottom-stat"><strong>۹۸ هزار <span className="stat-paw">🐾</span></strong><p>همراه خوشحال و رفیق‌های پشمالوشون</p></div>
 <div className="bottom-cta"><h2>بهترین‌ها برای<br/>دوست کوچولوت</h2><button className="pill-button" onClick={()=>toShop("همه")}>مشاهده محصولات <span><Icon name="arrow" size={17}/></span></button></div>
 <div className="bottom-stat"><strong>۴.۶ <span className="stars">★</span></strong><p>از نظر صاحبان حیوانات دوست‌داشتنی</p></div>
 </div>
 </section>
 <div className="ticker"><div>🐾 با عشق برای کوچولوها&nbsp;&nbsp; ✦ &nbsp;&nbsp;غذا و تشویقی&nbsp;&nbsp; ✦ &nbsp;&nbsp;اسباب‌بازی و سرگرمی&nbsp;&nbsp; ✦ &nbsp;&nbsp;برای هر پنجه یک خوشحالی&nbsp;&nbsp; ✦ &nbsp;&nbsp;خرید راحت و دوست‌داشتنی&nbsp;&nbsp; ✦ &nbsp;&nbsp;</div></div>
 <main>
 <section id="categories" className="section categories-section"><div className="section-heading"><div><span className="eyebrow">برای هر رفیق، یه دنیای قشنگ</span><h2>کوچولوی تو کدومه؟</h2></div><p>هر چیزی که برای خوشحال‌کردنش نیاز داری، همین‌جاست.</p></div><div className="category-grid">{categories.map(c=><button key={c.name} className="category-card" style={{background:c.bg}} onClick={()=>toShop(c.name)}><span className="category-emoji">{c.emoji}</span><span className="category-label"><strong>{c.name}</strong><small>{c.note}</small></span><span className="category-arrow"><Icon name="arrow" size={19}/></span></button>)}</div></section>
 <section id="shop" className="section products-section"><div className="section-heading"><div><span className="eyebrow">پرطرفدارهای فروشگاه</span><h2>از اینا نمی‌شه گذشت!</h2></div><p>محصول‌های دوست‌داشتنی برای روزهای شیرین‌تر.</p></div>
 <div className="shop-controls"><div className="filter-row">{["همه","سگ","گربه","پرندگان","آبزیان"].map(x=><button key={x} onClick={()=>setFilter(x)} className={filter===x?"selected":""}>{x}</button>)}</div>{searchOpen&&<label className="shop-search"><Icon name="search" size={18}/><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="دنبال چی می‌گردی؟" aria-label="جست‌وجوی محصول"/></label>}</div>
 <div className="products-grid">{visible.map(p=><article key={p.id} className="product-card"><div className="product-visual" style={{background:p.bg}}>{p.tag&&<span className="product-tag">{p.tag}</span>}<button className={"like-btn "+(liked.includes(p.id)?"on":"")} aria-label="افزودن به علاقه‌مندی‌ها" onClick={()=>setLiked(l=>l.includes(p.id)?l.filter(id=>id!==p.id):[...l,p.id])}><Icon name="heart" size={19} fill={liked.includes(p.id)?"#ff7136":"none"}/></button><span className="product-art" role="img" aria-label={p.name}>{p.art}</span><button className="quick-add" onClick={()=>add(p.id)} aria-label={"افزودن "+p.name+" به سبد"}><Icon name="plus" size={21}/></button></div><div className="product-info"><span className="product-kind">مخصوص {p.kind}</span><h3>{p.name}</h3><div className="price-line"><strong>{price(p.price)}</strong>{p.old>0&&<del>{price(p.old)}</del>}</div></div></article>)}</div>
 {visible.length===0&&<div className="empty-results">محصولی با این جست‌وجو پیدا نشد. نام دیگری امتحان کن.</div>}
 <div className="shop-note">این نسخه نمایشی است؛ محصولات و قیمت‌ها نمونه هستند و خرید واقعی انجام نمی‌شود.</div>
 </section>
 <section className="promo"><div className="promo-copy"><span>یه عالمه شادیِ تازه!</span><h2>بازی بیشتر،<br/>دُم تکون‌دادن بیشتر!</h2><p>از توپ‌های رنگی تا تشویقی‌های خوشمزه؛ یه هدیه کوچولو برای بهترین دوستت.</p><button className="dark-button" onClick={()=>toShop("سگ")}>بریم خرید <Icon name="arrow" size={19}/></button></div><div className="promo-photo"><img src={photos.happy} alt="سگ خوشحال و بازیگوش" loading="lazy"/></div><span className="promo-doodle">✳</span></section>
 <section id="benefits" className="section benefits"><div className="section-heading"><div><span className="eyebrow">خیالت راحت، پتت خوشحال</span><h2>چرا کوزی‌پاوز؟</h2></div></div><div className="benefit-grid"><div><span className="benefit-icon"><Icon name="truck" size={29}/></span><h3>ارسال آسان</h3><p>سفارش‌هات با هماهنگی و بسته‌بندی مناسب آماده می‌شن.</p></div><div><span className="benefit-icon"><Icon name="heart" size={29}/></span><h3>انتخاب با عشق</h3><p>محصولاتی که برای راحتی و شادی دوست کوچولوت انتخاب می‌شن.</p></div><div><span className="benefit-icon"><Icon name="shield" size={29}/></span><h3>خرید مطمئن</h3><p>مسیر خرید ساده و مشخص؛ اطلاعات سفارش همیشه روشنه.</p></div><div><span className="benefit-icon"><Icon name="box" size={29}/></span><h3>تنوع محصولات</h3><p>از خوراکی تا سرگرمی، همه چیز در یک فروشگاه دوست‌داشتنی.</p></div></div></section>
 <section className="story" id="about"><div className="story-photo"><img src={photos.cat} alt="گربه زیبای خانگی" loading="lazy"/></div><div className="story-copy"><span className="eyebrow">قصه ما از عشق به حیوانات شروع شد</span><h2>چون اون‌ها فقط «پت» نیستن؛ خانواده‌ان.</h2><p>کوزی‌پاوز قراره خرید وسایل کوچولوهای دوست‌داشتنیمون رو ساده‌تر، بانمک‌تر و پر از حس خوب کنه. این صفحه فعلاً یک دموی طراحی فروشگاهه.</p><button className="outline-button" onClick={()=>toShop("همه")}>ببین چی داریم <Icon name="arrow" size={18}/></button></div></section>
 </main>
 <footer className="footer"><div className="footer-head"><div><a href="#home" className="brand brand-footer"><span className="brand-icon"><Icon name="paw" size={27} fill="currentColor"/></span><span>کوزی<span>پاوز</span></span></a><p>دنیای رنگیِ دوست‌های پشمالو و کوچولو.</p></div><a href="#home" className="footer-back">برگردیم بالا ↑</a></div><div className="footer-bottom"><span>© کوزی‌پاوز — نسخه نمایشی فروشگاه</span><span>طراحی با عشق به حیوانات 🐾</span></div></footer>
 </div>
 {menu&&<div className="drawer-backdrop menu-backdrop" onMouseDown={()=>setMenu(false)}><div className="menu-panel" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><strong>منوی فروشگاه</strong><button onClick={()=>setMenu(false)} aria-label="بستن"><Icon name="close"/></button></div>{[{title:"خانه",href:"#home"},{title:"فروشگاه",href:"#shop"},{title:"دسته‌بندی‌ها",href:"#categories"},{title:"ارسال و پرداخت",href:"#benefits"},{title:"درباره ما",href:"#about"}].map(x=><a key={x.href} href={x.href} onClick={()=>setMenu(false)}>{x.title}</a>)}</div></div>}
 {cartOpen&&<div className="drawer-backdrop" onMouseDown={()=>setCartOpen(false)}><aside className="cart-drawer" aria-label="سبد خرید" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><strong>سبد خرید <span>({cartCount.toLocaleString("fa-IR")})</span></strong><button onClick={()=>setCartOpen(false)} aria-label="بستن سبد خرید"><Icon name="close"/></button></div>{cartCount===0?<div className="empty-cart"><Icon name="bag" size={56}/><h3>اینجا هنوز خالیه!</h3><p>یه چیز خوشمزه برای رفیقت پیدا کن.</p><button className="dark-button" onClick={()=>{setCartOpen(false);toShop("همه")}}>بریم فروشگاه</button></div>:<><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-item" key={p.id}><span className="cart-item-icon" style={{background:p.bg}}>{p.art}</span><div className="cart-item-info"><h4>{p.name}</h4><span>{price(p.price)}</span><div className="quantity"><button onClick={()=>change(p.id,-1)} aria-label="کم‌کردن"><Icon name="minus" size={16}/></button><b>{cart[p.id].toLocaleString("fa-IR")}</b><button onClick={()=>change(p.id,1)} aria-label="افزودن"><Icon name="plus" size={16}/></button></div></div></div>)}</div><div className="cart-total"><span>جمع سفارش</span><strong>{price(cartPrice)}</strong><button className="checkout-demo" disabled>پرداخت در نسخه نمایشی غیرفعال است</button></div></>}</aside></div>}
 </>;
}
