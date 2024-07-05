import React from "react";
import { useContext } from "react";
import { AppContext, Context } from "../context/AppContext";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";

const Navbar: React.FC = () => {
  const { sidebar, setSidebar } = useContext(AppContext) as Context;

  return (
    <>
      {sidebar ? <Sidebar /> : null}
      <div className="w-screen border-b-2 border-b-gray-700 shadow-2xl fixed z-10">
        <div className="w-full h-16 bg-gray-900 flex">
          <button
            onClick={() => setSidebar(true)}
            className="bg-gray-900 border-r-2 w-20 flex items-center justify-center border-r-gray-700 hover:bg-gray-800 transition duration-200"
          >
            <GiHamburgerMenu size={26} fill="white" />
          </button>
          <div className="w-full flex items-center">
            <span className="text-white mx-auto pr-20 font-playwrite text-2xl sm:text-4xl font-extrabold">
              Dalla'sShop
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
