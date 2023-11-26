import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../useAdmin/UseAdmin";

const Dashboard = () => {
  const [isAdmin] = UseAdmin();

  return (
    <div className="flex">
      <div className="w-64 min-h-full bg-orange-400 font-bold text-white">
        <ul className="menu">
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/allusers">All Users</NavLink>
              </li>
              <li>
            <NavLink to="/dashboard/content">Content ManageMent</NavLink>
          </li>
              <li>
                <NavLink to="/dashboard/statictics">Statistics</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/dashboard/alluserOption">For all User options</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
