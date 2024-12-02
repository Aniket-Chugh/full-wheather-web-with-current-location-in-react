import React from "react";
import { CiMap } from "react-icons/ci";

function NavFile() {
  const NavList = ["Research", "Climate", "Service", "About Us"];

  return (
    <header className="sticky top-0 z-20 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4 mx-auto max-w-7xl">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
              {/* Placeholder for the logo */}
              <span className="text-blue-600 font-bold">C</span>
            </div>
            <h1 className="text-lg font-bold text-gray-800">Wheather Teller</h1>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex gap-8 text-gray-600 text-sm font-medium">
              {NavList.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:text-gray-900 transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right Section */}
        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">
            <CiMap size={20} />
            <span className="text-sm font-medium">Open Maps</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavFile;
