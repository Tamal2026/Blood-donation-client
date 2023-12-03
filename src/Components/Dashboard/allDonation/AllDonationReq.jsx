import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const AllDonationReq = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bloodDonation");
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setError("Error fetching donations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllDonations();
  }, []);

  return (
    <div>
      <h2 className="bg-emerald-500 text-5xl px-4 py-4 text-white my-10 rounded-lg w-1/3 text-center font-bold mx-auto">
        All Blood Donations
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : donations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Recipient Name</th>
                <th>Blood Group</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id}>
                  <th>{index + 1}</th>
                  <td>{donation.recipientName}</td>
                  <td>{donation.bloodGroup}</td>
                  <td>{donation.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No donations available</p>
      )}
    </div>
  );
};

export default AllDonationReq;
