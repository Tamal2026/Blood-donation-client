import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../useAdmin/UseAdmin";

const Dashboard = () => {
  const [isAdmin] = UseAdmin();

  return (
    <div className="flex">
      <div className="w-64 min-h-full bg-orange-400 font-bold text-white">
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">Admin Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">All Users</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/content">Content Management</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/statistics">Statistics</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bloodDonationRequest">
                  Blood Donation Request
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userhome">Donor Home</NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/myBloodDonationRequest">
                  My Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/donationReq">
                  Donation Request
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
