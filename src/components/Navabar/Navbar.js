"use client"
import Image from "next/image";
import logo from "../../../public/images/twist-buzz logo.png"
import Link from "next/link";
import { useRouter } from "next/navigation";



const Navbar = () => {
  const router = useRouter()
  const navLink = <>
    <Link href='/' className="cursor-pointer">News</Link>
    <Link href='/today-news' className="cursor-pointer">Today news</Link>
    <Link href='/business' className="cursor-pointer">Business</Link>
    <Link href='/politics' className="cursor-pointer">Politics</Link>
    <Link href='/technology' className="cursor-pointer">Technology</Link>
    <Link href='/crime' className="cursor-pointer">Crime</Link>
    <Link href='sports' className="cursor-pointer">Sports</Link>
    <Link href='/others' className="cursor-pointer">Others</Link>
    <Link href='/dashboard'>Dashboard</Link>
  </>
  return (
    <div className="navbar nav-container bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu space-y-4 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          {navLink}
          </ul>
        </div>
        <a className=" lg:absolute "><Image onClick={()=>
          router.push('/')
        } className="cursor-pointer" height={100} width={150} src={logo} alt="official-logo" /></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu space-x-8  menu-horizontal px-1">
         {navLink}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-active btn-neutral">Login</button>
      </div>
    </div>
  );
};

export default Navbar;