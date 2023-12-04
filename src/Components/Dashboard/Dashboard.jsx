import { Link, NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../useAdmin/UseAdmin";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = UseAdmin();
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

  return user ? (
    <div className="flex">
      <div className="w-64 min-h-full bg-orange-400 font-bold text-white">
        <ul className="menu">
          <li>
            <NavLink to="/">Main Home</NavLink>
          </li>
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">Admin Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">All Users</NavLink>
              </li>
              <li className="mb-10">
                <NavLink to="/dashboard/alldonationrequest">
                  All Donation Request
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userhome">User Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myBloodDonationRequest">
                  My Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/donationReq">Donation Request</NavLink>
              </li>
              <div>
                <h5 className="ml-4">Recent Donation</h5>
                {loggedInUserRecentDonations.length > 0 ? (
                  <ul className="text-base font-normal ml-3">
                    {loggedInUserRecentDonations.slice(0, 3).map((donation) => (
                      <li key={donation._id}>
                        {donation.bloodGroup} Blood donated {donation.amount} on{" "}
                        {donation.date}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mb-6">No recent donations</p>
                )}
              </div>
              <Link to="/dashboard/myBloodDonationRequest">
                <button className="bg-green-600 text-white font-semibold py-2 rounded-lg px-2 ml-6 mt-5">
                  View All My Request
                </button>
              </Link>
            </>
          )}
        </ul>
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  ) : null;
};

export default Dashboard;
