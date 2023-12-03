import { useContext } from "react";

import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ShowUser from "./ShowUser";

import AxiosSecure from "../../AxiosSecure/AxiosSecure";

const UserHome = () => {
  const axiosSecure = AxiosSecure();

  const { user } = useContext(AuthContext);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const loggedInUser = users.find((user) => user.email === user?.email);

  return (
    <div>
      <div>
        {loggedInUser && (
          <ShowUser key={loggedInUser._id} user={loggedInUser}></ShowUser>
        )}
      </div>
    </div>
  );
};

export default UserHome;
