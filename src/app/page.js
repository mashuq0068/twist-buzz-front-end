import Image from "next/image";
import logo from "../../public/images/twist-buzz logo.png"
import Navbar from "@/components/Navabar/Navbar";
import Searchbar from "@/components/Searchbar/Searchbar";
import News from "@/components/News/News";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    
      <section className="container">
        <News/>
        <Footer/>
        

      </section>
 
  );
}
