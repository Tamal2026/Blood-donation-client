import { useQuery } from "@tanstack/react-query";

import ShowAdminHome from "./ShowAdminHome/ShowAdminHome";
import AxiosSecure from "../../AxiosSecure/AxiosSecure";


const AdminHome = () => {
  const axiosSecure = AxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  return (
    <div>
      <div>
        {users?.map((user) => (
          <ShowAdminHome key={user._id} user={user}></ShowAdminHome>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
