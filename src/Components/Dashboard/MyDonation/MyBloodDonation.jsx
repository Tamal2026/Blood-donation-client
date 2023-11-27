/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import axios from 'axios';

const MyBloodDonation = ({ userEmail }) => {
  const [bloodDonationData, setBloodDonationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to fetch blood donation data for a specific user
        const response = await axios.get(`http://localhost:5000/bloodDonation/${userEmail}`);

        // Update the state with the fetched data
        setBloodDonationData(response.data);
      } catch (error) {
        console.error('Error fetching blood donation data:', error);
      }
    };

    fetchData();
  }, [userEmail]);

  return (
    <div>
      <h2>My Blood Donations</h2>
      {bloodDonationData.length === 0 ? (
        <p>No blood donation data available.</p>
      ) : (
        <ul>
          {bloodDonationData.map((donation) => (
            <li key={donation._id}>
              <p>Date: {donation.date}</p>
              <p>Time: {donation.time}</p>
              {/* Add other fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBloodDonation;
