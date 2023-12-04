import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
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
  console.log(user);
  const loggedInUser = users.find((userData) => userData.email === user?.email);

  return (
    <div>
      <h1 className=" text-center text-4xl font-bold mb-16 mt-6 bg-slate-500 py-4 w-1/5  text-white rounded-lg mx-auto">
        User Home
      </h1>
      <h1 className="text-2xl ">
        <h1 className="ml-3">
          User Name:{" "}
          <span className="font-medium text-2xl ml-3 mt-6 space-x-5">
            {loggedInUser?.displayName}
          </span>
        </h1>
       <h1 className="mt-5 ml-5"> Hi Welcome to our Blood Donation Hub, where every drop counts and every
        donor makes a difference. Join our community of heroes committed to
        saving lives through the gift of blood. Explore opportunities to donate,
        learn about the impact of your contribution, and be a part of a
        life-saving journey. Your generosity is the heartbeat of our mission.
        Thank you for being the lifeline that connects hope to those in need.</h1>
      </h1>
    </div>
  );
};

export default UserHome;
