import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#2D3A45] py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold text-white">
          RoomRental
        </Link>
        <div className="flex space-x-6 text-base font-medium">
        
          
          <Link
            to="/"
            className="text-white hover:text-[#FF6B6B] transition"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
