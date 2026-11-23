import "./globals.css";
export const metadata = {
  title: "کوزی پاوز | پت‌شاپ شاد برای دوست کوچولوت",
  description: "خرید غذای حیوانات، تشویقی، اسباب‌بازی و لوازم مراقبت با یک تجربه ساده و شاد.",
  robots: { index: false, follow: false },
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#eafbea" };
export default function RootLayout({ children }) {
  return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}
