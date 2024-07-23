import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavItem = ({ to, onClick, children }) => (
    <li className="border-b border-black md:border-none">
      <NavLink
        to={to}
        onClick={() => {
          setIsMenuOpen(false);
          onClick && onClick();
        }}
        className={({ isActive }) =>
          `block px-4 py-2 text-center ${
            isActive ? "underline text-yellow-800" : "hover:text-yellow-800"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );

  return (
    <nav className="bg-yellow-500 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-12" />
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4 items-center font-merienda font-semibold">
              <NavItem to="/">HOME</NavItem>
              <NavItem to="/dashboard">DASHBOARD</NavItem>
              {token ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:scale-105 transition-all py-2 duration-150 px-4 focus:outline-none bg-black text-yellow-500 rounded-sm p-1 font-bold"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="hover:scale-105 transition-all duration-150">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive
                          ? "underline px-5 bg-black text-yellow-500 py-1 rounded-sm font-bold"
                          : "px-5 bg-black text-yellow-500 py-1 rounded-sm font-bold"
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="hover:scale-95 transition-all duration-150">
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive
                          ? "underline text-black border-2 border-black py-1 px-4 font-bold"
                          : "text-black border-2 border-black py-1 px-4 font-bold"
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-yellow-800 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-black w-full bg-yellow-500">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-merienda font-semibold flex flex-col items-center">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/dashboard">Dashboard</NavItem>
            {token ? (
              <li className="w-full">
                <button
                  onClick={handleLogout}
                  className="w-full text-left border-b border-black hover:bg-yellow-400 text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/register">Register</NavItem>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
