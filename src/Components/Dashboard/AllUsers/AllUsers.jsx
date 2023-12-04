import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../AxiosSecure/AxiosSecure";
import { MdDelete } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const AxiosSecuree = AxiosSecure();

  const initialUserStatus =
    JSON.parse(localStorage.getItem("userStatus")) || {};
  const [userStatus, setUserStatus] = useState(initialUserStatus);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosSecuree.get("/users");
      return res.data;
    },
  });

  useEffect(() => {
    localStorage.setItem("userStatus", JSON.stringify(userStatus));
  }, [userStatus]);

  const handleToggle = (userId) => {
    setUserStatus((prevUserStatus) => ({
      ...prevUserStatus,
      [userId]: !prevUserStatus[userId],
    }));
  };
  const handleMakeAdmin = (user) => {
    const loggedInUserRole = "admin";
    if (loggedInUserRole === "admin") {
      const selectedRole = user.role === "admin" ? "volunteer" : "admin";

      AxiosSecuree.patch(`/users/admin/${user._id}`, {
        role: selectedRole,
      }).then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `${user.displayName} is now a ${selectedRole}`,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Permission Denied",
        text: "You do not have the required permission to make another user an admin.",
      });
    }
  };
  const handleMakeRole = (user, role) => {
    const loggedInUserRole = "admin";

    if (loggedInUserRole === "admin") {
      AxiosSecuree.patch(`/users/admin/${user._id}`, { role }).then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `${user.displayName} is now a ${role}`,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Permission Denied",
        text: "You do not have the required permission to change the role of another user.",
      });
    }
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

  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return (
        (userStatus[user._id] && filterStatus === "active") ||
        (!userStatus[user._id] && filterStatus === "block")
      );
    }
  });

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <option value="active">Block</option>
              <option value="block">Active</option>
            </select>
          </div>
          <table className="table table-zebra">
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
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td className="text-2xl">
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <>
                        <button
                          onClick={() => handleMakeAdmin(user, "admin")}
                          className="text-lg bg-orange-600 text-white px-3 py-2 rounded-xl mr-2"
                        >
                          <FaUsersCog />
                        </button>
                        <button
                          onClick={() => handleMakeRole(user, "volunteer")}
                          className="text-lg bg-blue-600 text-white px-3 py-2 rounded-xl"
                        >
                          Volunteer
                        </button>
                      </>
                    )}
                  </td>

                  <td>
                    <button
                      className={`font-semibold px-3 py-1 rounded-lg ${
                        userStatus[user._id] ? "bg-red-500" : "bg-green-500"
                      } text-white`}
                      onClick={() => handleToggle(user._id)}
                    >
                      {userStatus[user._id] ? "Block" : "Active"}
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

          <div className="pagination">
            {currentPage > 1 && (
              <button
                className={`btn btn-secondary mr-2`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`btn ${
                  currentPage === i + 1 ? "btn-primary active" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`btn ${
                currentPage === totalPages ? " disabled" : "btn-primary"
              } ml-2`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
