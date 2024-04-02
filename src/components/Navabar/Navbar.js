import Image from "next/image";
import logo from "../../../public/images/twist-buzz logo.png"
import Link from "next/link";


const Navbar = () => {
  const navLink = <>
    <li className="cursor-pointer">News</li>
    <li className="cursor-pointer">Today news</li>
    <li className="cursor-pointer">Business</li>
    <li className="cursor-pointer">Politics</li>
    <li className="cursor-pointer">Technology</li>
    <li className="cursor-pointer">Crime</li>
    <li className="cursor-pointer">Sports</li>
    <li className="cursor-pointer">Others</li>
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
        <a className=" lg:absolute "><Image className="cursor-pointer" height={100} width={150} src={logo} alt="official-logo" /></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu space-x-8  menu-horizontal px-1">
         {navLink}
        </ul>
      </div>
      <div className="navbar-end">
        <button class="btn btn-active btn-neutral">Login</button>
      </div>
    </div>
  );
};

export default Navbar;