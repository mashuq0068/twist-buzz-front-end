import { Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navabar/Navbar";
import Searchbar from "@/components/Searchbar/Searchbar";
import AuthProvider from "@/providers/AuthProvider";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Twist-buzz",
  description: "Twist-buzz work with most trendy news",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

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
