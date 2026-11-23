import './globals.css';
export const metadata = {title: 'پت‌فود | فروشگاه آنلاین دوست‌های کوچولو', description:'فروشگاه فارسی و رنگارنگ محصولات حیوانات خانگی؛ غذای سگ و گربه، اسباب‌بازی و لوازم پت.', robots:{index:false,follow:false}};
export const viewport = {width:'device-width',initialScale:1,themeColor:'#75206e'};
export default function RootLayout({children}) {return <html lang="fa" dir="rtl"><body>{children}</body></html>}
