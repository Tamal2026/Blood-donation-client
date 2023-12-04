/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const MyBloodDonation = () => {
  const { user } = useContext(AuthContext);
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    const fetchRecentDonations = async () => {
      try {
        const response = await axios.get("https://blood-donation-server-green.vercel.app/bloodDonation");
        setRecentDonations(response.data);
      } catch (error) {
        console.error("Error fetching recent donations:", error);
      }
    };

    fetchRecentDonations();
  }, []);

  const loggedInUserRecentDonations = Array.isArray(recentDonations)
    ? recentDonations.filter((donation) => donation.email === user?.email)
    : [];

  return (
    <div>
      <h2 className="bg-emerald-500 text-5xl px-4 py-4 text-white my-10 rounded-lg w-1/3 text-center font-bold mx-auto">My Blood Donations</h2>
      {loggedInUserRecentDonations.length > 0 ? (
        <ul>
          {loggedInUserRecentDonations.slice(0, 3).map((donation) => (
            <li key={donation._id}>
              
            </li>
          ))}
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
                {loggedInUserRecentDonations
                  .slice(0, 3)
                  .map((donation, index) => (
                    <tr key={index + 1}>
                      <th>{index + 1}</th>
                      <td>{donation.recipientName}</td>
                      <td>{donation.bloodGroup}</td>
                      <td>{donation.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </ul>
      ) : (
        <p className="text-3xl font-bold text-center"> Sorry No donation Request</p>
      )}
    </div>
  );
};

export default MyBloodDonation;
