import Image from "next/image";
import logo from "../../public/images/twist-buzz logo.png"
import Navbar from "@/components/Navabar/Navbar";
import Searchbar from "@/components/Searchbar/Searchbar";
import News from "@/components/AllNews/AllNews";
import Footer from "@/components/Footer/Footer";
import AllNews from "@/components/AllNews/AllNews";

export default function Home() {
  return (
    
      <section className="container">
        <AllNews/>
        <Footer/>
        

      </section>
 
  );
}
