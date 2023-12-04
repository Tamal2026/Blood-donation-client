import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import AxiosSecure from "../AxiosSecure/AxiosSecure";

const useVolunteer = () => {
  const axiosSecure = AxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: isVolunteer, isPending: isVolunteerLoading } = useQuery({
    queryKey: [user?.email, "isVolunteer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/volunteer/${user.email}`);
      console.log(res.data);
      return res.data?.volunteer;
    },
  });
  return [isVolunteer, isVolunteerLoading];
};

export default useVolunteer;
