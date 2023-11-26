import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../AxiosSecure/AxiosSecure";
import { MdDelete } from "react-icons/md";

import { FaUsersCog } from "react-icons/fa";
import Swal from "sweetalert2";
const AllUsers = () => {
  const AxiosSecuree = AxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosSecuree.get("/users");

      return res.data;
    },
  });


const handleMakeAdmin  = user =>{
    AxiosSecuree.patch(`/users/admin/${user._id}`)
    .then(res=>{
        console.log(
            res.data
        );
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                icon: "success",
                title: "Success",
                text: `${user.displayName} is a admin now`,
                footer: '<a href="#">Why do I have this issue?</a>'
              })
        }
    })
   
} 
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

  return (
    <div>
      <div>
        <h1 className="text-3xl">Total Users: {users.length}</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td className="text-2xl">
                   { user.role === 'admin'? 'Admin' : <button onClick={()=>handleMakeAdmin(user)} className="text-lg bg-orange-600 text-white px-3 py-2 rounded-xl">
                      {" "}
                      <FaUsersCog />
                    </button>}
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
