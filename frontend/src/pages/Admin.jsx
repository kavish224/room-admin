import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const cards = [
  {
    title: "Owners",
    description: "Active Owners / Total Owners",
    to: "/admin/owners",
  },
  {
    title: "Properties",
    description: "Properties Booked / Total Registered Properties",
    to: "/admin/properties",
  },
  {
    title: "Students",
    description: "Students Booked / Total Registered Students",
    to: "/admin/students",
  },
  // Add more as needed...
];

const Admin = () => {
  return (
    <div className="bg-white min-h-screen text-[#2D3A45]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">👩‍💼 Admin Dashboard</h1>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.to}
              className="bg-[#f8f9fa] border border-gray-200 rounded-2xl shadow hover:shadow-md transition duration-300 p-6"
            >
              <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
