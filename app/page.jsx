"use client";

import { useEffect, useMemo, useState } from "react";
import MotionController, { WanderingPaws } from "./motion";

const categories = [
  { id: "dog", label: "سگ", subtitle: "رفقای وفادار", image: "/images/beagle.webp", color: "#dbee82" },
  { id: "cat", label: "گربه", subtitle: "کوچولوهای کنجکاو", image: "/images/cat.webp", color: "#ffb4c8" },
  { id: "bird", label: "پرندگان", subtitle: "دنیای پررنگ", image: "/images/parrot.webp", color: "#ffe06d" },
  { id: "rabbit", label: "خرگوش", subtitle: "نرم و دوست‌داشتنی", image: "/images/rabbit.webp", color: "#7edcf5" },
  { id: "fish", label: "آبزیان", subtitle: "دنیای زیر آب", image: "/images/fish.webp", color: "#6bd9a8" },
];
const products = [
  { id: 1, title: "غذای خشک مخصوص سگ", cat: "dog", price: 795000, old: 920000, bg: "#e9defc", kind: "food", tone: "orange", emoji: "🐶", tag: "پرفروش" , image: "/images/products/dog-food.webp"},
  { id: 2, title: "تشویقی خوشمزه گربه", cat: "cat", price: 245000, old: 0, bg: "#ffe4ee", kind: "food", tone: "pink", emoji: "🐱", tag: "جدید" , image: "/images/products/cat-treats.webp"},
  { id: 3, title: "توپ بازی رنگی", cat: "dog", price: 165000, old: 210000, bg: "#e5f7da", kind: "ball", tone: "blue", emoji: "", tag: "تخفیف" , image: "/images/products/rope-ball.webp"},
  { id: 4, title: "جای خواب نرم پت", cat: "cat", price: 985000, old: 0, bg: "#e8eeff", kind: "bed", tone: "purple", emoji: "", tag: "محبوب" , image: "/images/products/lavender-bed.webp"},
  { id: 5, title: "ظرف غذای بامزه", cat: "dog", price: 319000, old: 0, bg: "#fff0cd", kind: "bowl", tone: "orange", emoji: "", tag: "" , image: "/images/products/orange-bowl.webp"},
  { id: 6, title: "اسباب‌بازی جویدنی", cat: "dog", price: 180000, old: 245000, bg: "#fce8d9", kind: "bone", tone: "purple", emoji: "", tag: "ویژه" , image: "/images/products/chew-bone.webp"},
  { id: 7, title: "اسباب‌بازی پرنده", cat: "bird", price: 155000, old: 0, bg: "#dff6fa", kind: "ball", tone: "pink", emoji: "", tag: "جدید" , image: "/images/products/bird-toy.webp"},
  { id: 8, title: "غذای آبزیان", cat: "fish", price: 125000, old: 0, bg: "#e1f3eb", kind: "food", tone: "green", emoji: "🐠", tag: "" , image: "/images/products/fish-food.webp"},
];
const money = (number) => number.toLocaleString("fa-IR") + " تومان";

function Icon({ name, size = 22, fill = "none" }) {
  const paths = {
    paw: <><ellipse cx="5.5" cy="7" rx="1.5" ry="2"/><ellipse cx="10.5" cy="4.5" rx="1.5" ry="2"/><ellipse cx="16" cy="4.5" rx="1.5" ry="2"/><ellipse cx="20.1" cy="8" rx="1.5" ry="2"/><path d="M12 11c-2 0-3 2.3-4.8 3.4-2.8 1.7-2.4 6 1 6.5 1.4.2 2.1-.9 3.8-.9 1.9 0 2.5 1.2 4.2.9 3.4-.5 3.8-4.8 1-6.5C15.3 13.3 14 11 12 11Z"/></>,
    search: <><circle cx="10.6" cy="10.6" r="6.5"/><path d="m16 16 5 5"/></>,
    cart: <><path d="M3 4h2l2.4 11.8h11L21 8H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    heart: <path d="M20.8 8.4C20.8 14 12 20 12 20S3.2 14 3.2 8.4C3.2 4.1 9 2.6 12 6.5c3-3.9 8.8-2.4 8.8 1.9Z"/>,
    arrow: <><path d="M4 12h16"/><path d="m13 5 7 7-7 7"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    minus: <path d="M5 12h14"/>,
    close: <path d="M5 5 19 19M19 5 5 19"/>,
    truck: <><path d="M2 7h12v10H2zM14 10h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
    shield: <><path d="M12 2 4 5v6c0 5 3.2 8.5 8 11 4.8-2.5 8-6 8-11V5l-8-3Z"/><path d="m8.5 12 2.3 2.3 4.7-5"/></>,
    headphones: <><path d="M4 13V11a8 8 0 0 1 16 0v2"/><rect x="2" y="12" width="5" height="8" rx="2"/><rect x="17" y="12" width="5" height="8" rx="2"/></>,
    box: <><path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z"/><path d="M3 7l9 4 9-4M12 11v10"/></>,
    check: <path d="m5 12 5 5L20 7"/>,
    chevron: <path d="m7 9 5 5 5-5"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.paw}</svg>;
}
function ProductArt({ product }) {
  return <div className={`art-${product.kind} art-${product.tone}`} aria-hidden="true">
    {product.kind === "food" && <div className="pack"><span className="pack-paw"><Icon name="paw" size={27} fill="currentColor"/></span><span className="pack-pet">{product.emoji}</span><span className="pack-brand">PET FOOD</span><span className="pack-stripe"/></div>}
    {product.kind === "ball" && <div className="art-ball-shape"><i/><b/><span/></div>}
    {product.kind === "bed" && <div className="art-bed-shape"><span/><i/></div>}
    {product.kind === "bowl" && <div className="art-bowl-shape"><div className="kibble">••••••••••••</div><Icon name="paw" size={33} fill="currentColor"/></div>}
    {product.kind === "bone" && <div className="art-bone-shape"><span>✦</span></div>}
  </div>;
}
function Loader({ done }) {
  useEffect(() => {
    let active = true;
    const start = Date.now();
    const media = ["/images/beagle.webp", "/images/cat.webp", "/images/parrot.webp", "/images/rabbit.webp", "/images/fish.webp", "/images/retriever.webp", "/images/dog-barking-transparent.webp"];
    let assetsReady = false;
    let oneLoop = false;
    const complete = () => { if (active && assetsReady && oneLoop) done(); };
    Promise.all(media.map(src => new Promise(resolve => {
      const img = new Image(); img.onload = resolve; img.onerror = resolve; img.src = src;
    }))).then(() => { assetsReady = true; complete(); });
    const timer = setTimeout(() => { oneLoop = true; complete(); }, 6100);
    const backup = setTimeout(() => { assetsReady = true; oneLoop = true; complete(); }, 10000);
    return () => { active = false; clearTimeout(timer); clearTimeout(backup); };
  }, [done]);
  return <div className="loader" role="status" aria-label="در حال آماده‌سازی فروشگاه"><div className="loader-body"><img width="224" height="224" src="/images/dog-barking-transparent.webp" alt="سگ بانمک در حال پارس"/><p>یه عالمه شادی تو راهه!</p><div className="paw-track" dir="ltr">{Array.from({length: 6}, (_,i) => <span className={`print ${i%2===0?"odd":"even"}`} key={i} style={{"--i":i}}><Icon name="paw" size={24} fill="currentColor"/></span>)}</div></div></div>;
}
export default function Home() {
  const [loading,setLoading] = useState(true);
  const [menu,setMenu] = useState(false);
  const [cartOpen,setCartOpen] = useState(false);
  const [liked,setLiked] = useState([]);
  const [cart,setCart] = useState({});
  const [selected,setSelected] = useState("all");
  const [query,setQuery] = useState("");
  const [searchOpen,setSearchOpen] = useState(false);
  const [message,setMessage] = useState("");
  const totalCount = Object.values(cart).reduce((a,b) => a+b,0);
  const total = products.reduce((a,p) => a+p.price*(cart[p.id]||0),0);
  const filtered = useMemo(() => products.filter(p => (selected === "all" || selected === p.cat) && p.title.includes(query)), [selected,query]);
  const navigate = (id,cat) => { if(cat) setSelected(cat); setMenu(false); document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); };
  const add = (id) => {setCart(old=>({...old,[id]:(old[id]||0)+1}));setCartOpen(true);};
  const change = (id,n) => setCart(old=>{const next = {...old}; next[id] = Math.max(0,(next[id]||0)+n);if(!next[id])delete next[id];return next;});
  useEffect(()=>{document.body.style.overflow = menu || cartOpen ? "hidden" : "";return()=>{document.body.style.overflow="";}},[menu,cartOpen]);
  return <>
    {loading && <Loader done={()=>setLoading(false)}/> }
    <MotionController active={!loading}/>
    <div className="website">
      <div className="announcement"><span>🐾 تا ۳۰٪ تخفیف برای محصولات منتخب</span><span>ارسال رایگان سفارش‌های بالای ۲ میلیون تومان 🚚</span></div>
      <section className="hero-wrap" id="home">
        <header className="header container">
          <button className="mobile-menu" aria-label="باز کردن منو" aria-expanded={menu} onClick={()=>setMenu(true)}><Icon name="paw" size={25} fill="currentColor"/></button>
          <a href="#home" className="logo"><span className="logo-mark"><Icon name="paw" size={32} fill="currentColor"/></span><span>پت‌فود <small>PET FOOD</small></span></a>
          <nav className="navigation" aria-label="منوی اصلی"><a className="nav-active" href="#home">خانه</a><a href="#shop">فروشگاه</a><a href="#categories">دسته‌بندی‌ها</a><a href="#offers">پیشنهاد ویژه</a><a href="#about">درباره ما</a></nav>
          <div className="header-actions"><button aria-label="جست‌وجو" onClick={()=>{setSearchOpen(true);navigate("shop")}}><Icon name="search" size={21}/></button><button aria-label="علاقه‌مندی‌ها" onClick={()=>{setSelected("all");navigate("shop")}}><Icon name="heart" size={22} fill={liked.length?"#ff9c1b":"none"}/></button><button className="cart-trigger" aria-label="سبد خرید" onClick={()=>setCartOpen(true)}><Icon name="cart" size={22}/>{totalCount>0&&<b>{totalCount.toLocaleString("fa-IR")}</b>}</button></div>
        </header>
        <div className="hero-main container">
          <div className="hero-copy"><span className="eyebrow hero-offer">✨ تا ۳۰٪ تخفیف محصولات منتخب</span><h1>هر چیزی که <br/><span>رفیق کوچولوت</span><br/>عاشقشه!</h1><p>از غذای خوشمزه تا اسباب‌بازی‌های رنگی؛ یه دنیای پر از عشق برای دوست‌های پشمالوت.</p><button className="btn btn-orange" onClick={()=>navigate("shop","all")}>بریم خرید! <span><Icon name="arrow" size={19}/></span></button><div className="hero-social"><span className="avatar-stack"><img src="/images/cat.webp" alt=""/><img src="/images/rabbit.webp" alt=""/><img src="/images/retriever.webp" alt=""/></span><span><b>رفقای خوشحال</b><small>برای هر پنجه، یه لبخند</small></span></div></div>
          <div className="hero-visual"><div className="hero-sun"/><img className="float-toy float-toy--rope" src="/images/products/rope-ball.webp" alt="" aria-hidden="true"/><img className="float-toy float-toy--bone" src="/images/products/chew-bone.webp" alt="" aria-hidden="true"/><img className="float-toy float-toy--bowl" src="/images/products/orange-bowl.webp" alt="" aria-hidden="true"/><img className="hero-beagle" src="/images/beagle.webp" alt="سگ بیگل خندان در صفحه اصلی پت‌شاپ" fetchPriority="high"/></div>
        </div>
        <svg className="hero-wave" viewBox="0 0 1440 114" preserveAspectRatio="none" aria-hidden="true"><path fill="#ff9f1c" d="M0 52 C250 108 390 20 700 42 C1010 67 1170 93 1440 9 L1440 114 L0 114Z"/><path fill="#fff" d="M0 68 C260 116 430 36 710 57 C1020 84 1240 101 1440 28 L1440 114 L0 114Z"/></svg>
      </section>
      <main>
        <section id="categories" className="categories container"><WanderingPaws kind="cat" className="route-categories"/><div className="section-title center"><span className="kicker">انتخاب برای دوستای کوچولوت</span><h2>خرید بر اساس دسته‌بندی</h2><p>هر کدومشون یه دنیا سلیقه و نیاز دارن!</p></div><div className="category-list">{categories.map((c,index)=><button onClick={()=>navigate("shop",c.id)} className="category" key={c.id}><span className="category-picture" style={{background:c.color}}><img src={c.image} alt={c.label} loading="lazy"/>{index===0&&<span className="category-mark">✳</span>}</span><strong>{c.label}</strong><small>{c.subtitle}</small></button>)}</div></section>
        <section id="offers" className="offers container"><WanderingPaws kind="dog" className="route-offers"/><article className="offer blue"><div className="offer-copy"><span>برای بازی‌های پرهیجان!</span><h3>توی این خونه<br/>حوصله‌مون سر نمی‌ره!</h3><button onClick={()=>navigate("shop","dog")}>بزن بریم <Icon name="arrow" size={18}/></button></div><img className="offer-animal offer-cat" src="/images/cat.webp" alt="گربه روی بنر پیشنهاد ویژه" loading="lazy"/><span className="offer-deco">✺</span></article><article className="offer green"><div className="offer-copy"><span>خرید به‌صرفه‌تر</span><h3>تا ۲۵٪ تخفیف<br/>روی خوشمزه‌ها!</h3><button onClick={()=>navigate("shop","all")}>دیدن پیشنهادها <Icon name="arrow" size={18}/></button></div><img className="offer-animal offer-retriever" src="/images/retriever.webp" alt="توله گلدن رتریور" loading="lazy"/><span className="offer-deco">✷</span></article></section>
        <section id="shop" className="shop container"><div className="section-title shop-title"><div><span className="kicker">دست‌چین‌شده با عشق</span><h2>محصولات دوست‌داشتنی</h2></div><p>رفیقت لایق بهترین‌هاست!</p></div><div className="shop-tools"><div className="filters">{[{id:"all",label:"همه"},...categories.map(c=>({id:c.id,label:c.label}))].map(c=><button key={c.id} className={selected===c.id?"active":""} onClick={()=>setSelected(c.id)}>{c.label}</button>)}</div><div className="search-field"><Icon name="search" size={18}/><input aria-label="جست‌وجوی محصولات" placeholder="دنبال چی می‌گردی؟" value={query} onChange={e=>setQuery(e.target.value)}/></div></div><div className="product-grid">{filtered.map(p=><article className="product-card" key={p.id}><div className="product-picture" style={{background:p.bg}}>{p.tag&&<span className="product-badge">{p.tag}</span>}<button className={`favorite ${liked.includes(p.id)?"is-liked":""}`} onClick={()=>setLiked(prev=>prev.includes(p.id)?prev.filter(x=>x!==p.id):[...prev,p.id])} aria-label="افزودن به علاقه‌مندی‌ها"><Icon name="heart" size={19} fill={liked.includes(p.id)?"currentColor":"none"}/></button><img className="product-photo" src={p.image} alt={p.title} loading="lazy" width="500" height="500" decoding="async"/></div><div className="product-meta"><small>{categories.find(c=>c.id===p.cat)?.label||"پت"}</small><h3>{p.title}</h3><div className="price"><b>{money(p.price)}</b>{p.old>0&&<s>{money(p.old)}</s>}</div><button className="add-cart" onClick={()=>add(p.id)} aria-label={`افزودن ${p.title} به سبد`}><Icon name="plus" size={19}/></button></div></article>)}</div>{!filtered.length&&<div className="notfound">چیزی پیدا نشد؛ اسم یا دسته دیگه‌ای امتحان کن.</div>}<p className="demo-note">این فروشگاه نسخه نمایشی است. محصولات، قیمت‌ها و سبد خرید جهت نمایش طراحی هستند.</p></section>
        <section className="story-banner"><WanderingPaws kind="rabbit" className="route-story"/><div className="story-inner container"><div className="story-text"><span>🐾 یه عالمه عشق، یه عالمه بازی</span><h2>وقتشه دم‌ها<br/>تندتر تکون بخورن!</h2><p>یه سرگرمی کوچیک می‌تونه روز دوستت رو خیلی قشنگ‌تر کنه.</p><button className="btn btn-orange" onClick={()=>navigate("shop","dog")}>کشف دنیای بازی <span><Icon name="arrow" size={18}/></span></button></div><div className="story-art"><div className="story-disc"/><img src="/images/retriever.webp" alt="توله سگ شاد در کمپین" loading="lazy"/><span>♡</span></div></div></section>
        <section className="benefits container" id="about"><WanderingPaws kind="dog" className="route-benefits"/><div className="section-title center"><span className="kicker">خرید راحت و بی‌دردسر</span><h2>کنار تو و کوچولوت هستیم</h2></div><div className="benefit-grid">{[{icon:"truck",title:"ارسال راحت",desc:"سفارش‌ها با بسته‌بندی مناسب"},{icon:"shield",title:"انتخاب مطمئن",desc:"اطلاعات شفاف و محصولات باکیفیت"},{icon:"headphones",title:"همراهت هستیم",desc:"راهنمایی در مسیر انتخاب"},{icon:"heart",title:"با عشق برای پت‌ها",desc:"همه چیز برای خوشحالی دوستت"}].map(x=><div className="benefit" key={x.title}><span><Icon name={x.icon} size={30}/></span><strong>{x.title}</strong><p>{x.desc}</p></div>)}</div></section>
        <section className="newsletter container"><div className="newsletter-copy"><span>نامه‌های خوشحال‌کننده 🐾</span><h2>خبر تخفیف‌ها رو از دست نده!</h2><p>از پیشنهادهای ویژه و تازه‌های فروشگاه باخبر شو.</p><form onSubmit={e=>{e.preventDefault();setMessage("این بخش در نسخه نمایشی فعال نیست.")}}><input type="email" aria-label="ایمیل" placeholder="آدرس ایمیلت رو وارد کن" required/><button type="submit">ثبت ایمیل <Icon name="arrow" size={16}/></button></form>{message&&<small role="status">{message}</small>}</div><div className="newsletter-image"><img src="/images/rabbit.webp" alt="خرگوش بانمک" loading="lazy"/></div></section>
      </main>
      <footer className="footer"><div className="footer-inner container"><div className="footer-brand"><div className="logo"><span className="logo-mark"><Icon name="paw" size={32} fill="currentColor"/></span><span>پت‌فود <small>PET FOOD</small></span></div><p>یه دنیای رنگی و دوست‌داشتنی برای تمام رفیق‌های کوچولو.</p></div><div className="footer-column"><b>دسترسی سریع</b><a href="#home">خانه</a><a href="#shop">فروشگاه</a><a href="#categories">دسته‌بندی‌ها</a></div><div className="footer-column"><b>فروشگاه</b><a href="#shop">محصولات محبوب</a><a href="#offers">پیشنهادهای ویژه</a><a href="#about">درباره ما</a></div><div className="footer-column"><b>درباره پت‌فود</b><p>دموی فروشگاهی فارسی و راست‌چین، با طراحی اختصاصی و تصاویر محلی.</p></div></div><div className="copyright container">© پت‌فود — نسخه نمایشی طراحی فروشگاه <span>ساخته شده با عشق به حیوانات ♥</span></div></footer>
    </div>
    {menu&&<div className="overlay" onMouseDown={()=>setMenu(false)}><aside className="menu-drawer" aria-label="منوی موبایل" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head colorful-head"><div><span className="drawer-paw"><Icon name="paw" size={25} fill="currentColor"/></span><strong>دنیای رنگی پت‌فود</strong><small>برای بهترین رفیق‌هات 🐾</small></div><button onClick={()=>setMenu(false)} aria-label="بستن"><Icon name="close"/></button></div>{[{id:"home",label:"خانه",emoji:"🏠"},{id:"shop",label:"فروشگاه",emoji:"🛍️"},{id:"categories",label:"دسته‌بندی‌ها",emoji:"🐶"},{id:"offers",label:"پیشنهادهای ویژه",emoji:"🎁"},{id:"about",label:"درباره ما",emoji:"💜"}].map((entry,i)=><button className="menu-tile" key={entry.id} onClick={()=>navigate(entry.id)}><span className="menu-tile-emoji">{entry.emoji}</span><span>{entry.label}</span><Icon name="arrow" size={17}/></button>)}<div className="menu-drawer-footer"><span>✦</span> یه عالمه عشق برای کوچولوت <span>✦</span></div></aside></div>}
    {cartOpen&&<div className="overlay" onMouseDown={()=>setCartOpen(false)}><aside className="cart-drawer" aria-label="سبد خرید" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><strong>سبد خرید ({totalCount.toLocaleString("fa-IR")})</strong><button onClick={()=>setCartOpen(false)} aria-label="بستن سبد"><Icon name="close"/></button></div>{!totalCount?<div className="empty-cart"><Icon name="cart" size={48}/><h3>سبدت هنوز خالیه!</h3><p>یه چیز بامزه برای رفیقت انتخاب کن.</p><button className="btn btn-orange" onClick={()=>{setCartOpen(false);navigate("shop")}}>رفتن به فروشگاه</button></div>:<><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-item" key={p.id}><span className="cart-item-emoji" style={{background:p.bg}}><img src={p.image} alt="" width="65" height="65"/></span><div><strong>{p.title}</strong><small>{money(p.price)}</small><div className="count-control"><button onClick={()=>change(p.id,-1)} aria-label="کم کردن"><Icon name="minus" size={14}/></button><b>{cart[p.id].toLocaleString("fa-IR")}</b><button onClick={()=>change(p.id,1)} aria-label="اضافه کردن"><Icon name="plus" size={14}/></button></div></div></div>)}</div><div className="cart-summary"><span>جمع سفارش</span><strong>{money(total)}</strong><button disabled>پرداخت در نسخه دمو فعال نیست</button></div></>}</aside></div>}
  </>;
}