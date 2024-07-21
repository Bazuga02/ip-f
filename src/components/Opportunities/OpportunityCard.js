import React from "react";
import { useNavigate } from "react-router-dom";
import { applyToOpportunity } from "../services/api";
import { toast } from "react-hot-toast";

const OpportunityCard = ({ opportunity }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleApply = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      await applyToOpportunity(opportunity.id);
      toast.success("Successfully applied to the opportunity!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        console.error("Application error:", error);
        toast.error("An error occurred while applying to the opportunity");
      }
    }
  };

  // Function to format the stipend
  const formatStipend = (stipend) => {
    if (typeof stipend === "string") {
      // Remove any extra spaces and the word "month" if present
      return stipend.replace(/\s+/g, " ").replace("/month", "");
    }
    return stipend;
  };

  // Function to format the start date
  const formatStartDate = (startDate) => {
    if (startDate === "Starts Immediately") {
      return startDate;
    }
    return new Date(startDate).toLocaleDateString();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-gray-600 flex flex-col">
      <h3 className="text-2xl font-bold mb-2 text-center font-serif">
        {opportunity.profileName}
      </h3>
      <p className="mb-2 text-xl font-mono mt-2">
        Company: {opportunity.companyName}
      </p>
      <p className="mb-2 text-xl font-mono">
        Stipend: {formatStipend(opportunity.stipend)}
      </p>
      <p className="mb-2 text-xl font-mono">Location: {opportunity.location}</p>
      <p className="mb-2 text-xl font-mono">Duration: {opportunity.duration}</p>
      <p className="mb-4 text-xl font-mono">
        Start Date: {formatStartDate(opportunity.startDate)}
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-[50%]"
        >
          {isLoggedIn ? "Apply" : "Login to Apply"}
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;
