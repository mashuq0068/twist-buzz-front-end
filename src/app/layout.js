import {  Work_Sans } from "next/font/google";
import "./globals.css";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Twist-buzz",
  description: "Twist-buzz work with most trendy news",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={work_sans.className}>{children}</body>
    </html>
  );
}
