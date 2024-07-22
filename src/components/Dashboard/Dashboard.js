import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "https://ip-b.onrender.com/api";
const DEFAULT_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await axios.get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = userResponse.data;

        if (userData.dateOfBirth) {
          userData.dateOfBirth = new Date(userData.dateOfBirth)
            .toISOString()
            .split("T")[0];
        }

        setUser(userData);

        const opportunitiesResponse = await axios.get(
          `${API_URL}/users/applied-opportunities`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAppliedOpportunities(opportunitiesResponse.data);

        setLoading(false);
      } catch (err) {
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/users/profile`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedUser = response.data;

      if (updatedUser.dateOfBirth) {
        updatedUser.dateOfBirth = new Date(updatedUser.dateOfBirth)
          .toISOString()
          .split("T")[0];
      }

      setUser(updatedUser);
      toast.success("Profile updated successfully");
      setIsEditingImage(false);
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  if (loading)
    return <div className="text-center text-gray-300">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-yellow-500 text-gray-300 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-black">Welcome, {user.name}!</h2>
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl text-yellow-500 font-merienda font-semibold mb-4 text-center">
          Your Profile
        </h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="flex flex-col items-center">
            {isEditingImage ? (
              <input
                type="text"
                value={user.image || ""}
                onChange={(e) => setUser({ ...user, image: e.target.value })}
                placeholder="Image URL"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-300"
              />
            ) : (
              <div
                className="w-24 h-24 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
                onClick={() => setIsEditingImage(true)}
              >
                <img
                  src={user.image || DEFAULT_IMAGE_URL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 text-right font-bold text-yellow-500 font-merienda">Name:</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
              className="flex-1 p-3  rounded-sm bg-neutral-700 text-gray-300"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 text-right font-bold text-yellow-500 font-merienda">Age:</label>
            <input
              type="number"
              value={user.age || ""}
              onChange={(e) => setUser({ ...user, age: e.target.value })}
              placeholder="Age"
              className="flex-1 p-3  rounded-sm bg-neutral-700 text-gray-300"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 text-right font-bold text-yellow-500 font-merienda">DOB:</label>
            <input
              type="date"
              value={user.dateOfBirth || ""}
              onChange={(e) =>
                setUser({ ...user, dateOfBirth: e.target.value })
              }
              className="flex-1 p-3 bg-neutral-700 rounded-sm text-gray-300"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-neutral-900 border-2  border-yellow-500 hover:text-yellow-500 transition-all duration-150  w-[50%]"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 font-merienda text-yellow-500">Applied Opportunities</h3>
        {appliedOpportunities.length > 0 ? (
          appliedOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className=" bg-neutral-700 p-4 mb-4 rounded-lg shadow-md"
            >
              <h4 className="text-xl font-semibold mb-2">
                {opportunity.profileName}
              </h4>
              <p className="mb-2">Company: {opportunity.companyName}</p>
              <p>Status: Applied</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No applied opportunities.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
