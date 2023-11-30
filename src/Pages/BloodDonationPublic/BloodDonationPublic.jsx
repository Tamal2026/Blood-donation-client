// BloodDonationPublic.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/useAxiosPublic/UseAxiosPublic";

const BloodDonationPublic = () => {
  const [bloodDonations, setBloodDonations] = useState([]);
  const axiosPublic = UseAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/bloodDonation");
        setBloodDonations(response.data);
      } catch (error) {
        console.error("Error fetching blood donation data:", error);
      }
    };

    fetchData();
  }, [axiosPublic]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Blood Donation Public</h2>
      {bloodDonations.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Requester</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {bloodDonations.map((donation) => (
              <tr key={donation._id}>
                <td className="p-2 border">{donation.recipientName}</td>
                <td className="p-2 border">{donation.address}</td>
                <td className="p-2 border">{donation.date}</td>
                <td className="p-2 border">{donation.time}</td>
                <td className="p-2 border">
                  <Link to={`/donation-details/${donation._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No blood donation data available.</p>
      )}
    </div>
  );
};

export default BloodDonationPublic;
