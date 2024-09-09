import { Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navabar/Navbar";
import Searchbar from "@/components/Searchbar/Searchbar";
import AuthProvider from "@/providers/AuthProvider";
import AddSense from "@/components/AddSense/AddSense";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Twist-buzz",
  description: "Twist Buzz is your go-to destination for staying updated with the latest trending news. From viral stories to breaking news. It provides latest and trending news as fast as possible.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <AddSense pid={"ca-pub-3235346379026157"}/>
      </head>

      <body className={work_sans.className}>
        <AuthProvider>
          <header>
            <nav className="shadow-lg">
              <Navbar />
            </nav>
          </header>

          <main>
            {children}
          </main>
          <footer>
          </footer>

        </AuthProvider>
      </body>
    </html >
  );
}
