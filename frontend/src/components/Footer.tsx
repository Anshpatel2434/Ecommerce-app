import React from "react";
import { FaBagShopping } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-t-white  flex justify-center items-center shadow w-screen dark:bg-gray-900">
      <div className="w-full mx-auto p-4 mt-4 ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <FaBagShopping fill="white" size={30} />
            <span className="text-2xl font-extrabold font-playwrite whitespace-nowrap dark:text-white">
              Dalla'sShop
            </span>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <button className="hover:underline text-lg me-4 md:me-6">
                About
              </button>
            </li>
            <li>
              <button className="hover:underline text-lg me-4 md:me-6">
                Contact
              </button>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-lg text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Dalla'sShop™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
