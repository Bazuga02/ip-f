import React, { useState, useEffect } from "react";
import axios from "axios";
import OpportunityCard from "./OpportunityCard";

const OpportunityList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [opportunitiesPerPage] = useState(4); // Number of opportunities per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(
          "https://ip-b.onrender.com/api/opportunities"
        );
        setOpportunities(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching opportunities:", err);
        if (err.response) {
          setError(
            `Error ${err.response.status}: ${err.response.data.message}`
          );
        } else if (err.request) {
          setError("No response received from server. Please try again later.");
        } else {
          setError("Error setting up the request. Please try again later.");
        }
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
  const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
  const currentOpportunities = opportunities.slice(
    indexOfFirstOpportunity,
    indexOfLastOpportunity
  );

  const totalPages = Math.ceil(opportunities.length / opportunitiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading)
    return <div className="text-white text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;

  return (
    <div className="p-4 bg-neutral-900 min-h-screen">
      <h2 className="text-5xl underline font-bold font-merienda text-yellow-500 mb-6 text-center">
        Internship Opportunities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentOpportunities.length > 0 ? (
          currentOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))
        ) : (
          <p className="text-white">
            No opportunities available at the moment.
          </p>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => handlePageChange(pageNumber + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === pageNumber + 1
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-700 text-gray-300"
              } hover:bg-yellow-700`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunityList;
