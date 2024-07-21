import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import OpportunityList from "./components/Opportunities/OpportunityList";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer"; // Import the Footer component
import logo from "./logo.png";
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Toaster position="top-center" />
      <img src={logo} alt="logo" className="h-9" />
      <ul className="flex space-x-4 items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline hover:text-gray-300" : "hover:text-gray-300"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "underline hover:text-gray-300" : "hover:text-gray-300"
            }
          >
            Dashboard
          </NavLink>
        </li>
        {token ? (
          <li>
            <button
              onClick={handleLogout}
              className="hover:scale-105 transition-all duration-150 px-4 focus:outline-none bg-blue-400 p-1 rounded-lg font-bold"
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
                    ? "underline px-4 bg-blue-400 p-1 rounded-lg font-bold"
                    : "px-4 bg-blue-400 p-1 rounded-lg font-bold"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "underline text-blue-400 font-bold"
                    : "text-blue-400 font-bold hover:text-white"
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app min-h-screen bg-neutral-900 text-gray-300">
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<OpportunityList />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer /> {/* Include the Footer component */}
      </div>
    </Router>
  );
};

export default App;
