
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../AxiosSecure/AxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import ShowAdminHome from "./ShowAdminHome/ShowAdminHome";

// Import the ShowAdminHome component
 // Replace "path-to-ShowAdminHome" with the actual path to your ShowAdminHome component

const AdminHome = () => {
  const axiosSecure = AxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: totalDonation = [] } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bloodDonation");
      return res.data;
    },
  });

  // Filter the users to show only the details of the logged-in user
  const loggedInUser = users.find((u) => u.email === user.email);

  return (
    <div>
      <div>
        {loggedInUser && (
          <ShowAdminHome key={loggedInUser._id} user={loggedInUser}></ShowAdminHome>
        )}
      </div>
      <div className="flex gap-24">
        <p className="bg-emerald-600 px-5 w-1/6 text-center py-5 rounded-xl mt-5 ml-9 font-bold text-lg text-white">
          Total Users: {users.length}
        </p>

        <p className="bg-blue-600 px-5 w-1/6 text-center py-5 rounded-xl mt-5 ml-9 font-bold text-lg text-white">
          Total Donation Req: {totalDonation.length}
        </p>
        <p className="bg-purple-600 px-5 w-1/6 text-center py-5 rounded-xl mt-5 ml-9 font-bold text-lg text-white">
          Total Funding: $
        </p>
      </div>
      <div>
       {/* Display information about each user */}
        {users.map((user) => (
          <div key={user._id}>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
