// src/components/Footer.js
import React from "react";
import logo from "../logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p className="text-sm flex flex-row items-center justify-center">
        {" "}
        <img src={logo} alt="logo" className=" h-8" />  All rights reserved
        Abhishek
      </p>
    </footer>
  );
};

export default Footer;
