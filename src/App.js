import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import OpportunityList from "./components/Opportunities/OpportunityList";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="app min-h-screen bg-neutral-900 text-gray-300">
        <Navbar />
        <Toaster position="top-center" />
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
        <Footer />
      </div>
    </Router>
  );
};

export default App;
