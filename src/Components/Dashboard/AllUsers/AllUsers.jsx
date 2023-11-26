import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../AxiosSecure/AxiosSecure";
import { MdDelete } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const AllUsers = () => {
  const AxiosSecuree = AxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosSecuree.get("/users");
      return res.data;
    },
  });

  const [userStatus, setUserStatus] = useState({});
  const [filterStatus, setFilterStatus] = useState("all"); // "all", "active", "block"

  const handleToggle = (userId) => {
    setUserStatus((prevUserStatus) => ({
      ...prevUserStatus,
      [userId]: !prevUserStatus[userId],
    }));
  };

  const handleMakeAdmin = (user) => {
    AxiosSecuree.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `${user.displayName} is an admin now`,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosSecuree.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return userStatus[user._id] === (filterStatus === "active");
    }
  });

  return (
    <div>
      <div>
        <h1 className="text-3xl">Total Users: {filteredUsers.length}</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <div>
            <label htmlFor="statusFilter">Filter by Status:</label>
            <select
              id="statusFilter"
              onChange={(e) => setFilterStatus(e.target.value)}
              value={filterStatus}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="block">Block</option>
            </select>
          </div>
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td className="text-2xl">
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="text-lg bg-orange-600 text-white px-3 py-2 rounded-xl"
                      >
                        {" "}
                        <FaUsersCog />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className={`font-semibold px-3 py-1 rounded-lg ${
                        userStatus[user._id] ? "bg-green-500" : "bg-red-500"
                      } text-white`}
                      onClick={() => handleToggle(user._id)}
                    >
                      {userStatus[user._id] ? "Active" : "Blocked"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user)}
                      className="text-white btn bg-gray-600"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
