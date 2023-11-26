import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import AxiosSecure from "../AxiosSecure/AxiosSecure";


const UseAdmin = () => {
    const axiosSecure = AxiosSecure();
    const {user} = useContext(AuthContext)
    const {data : isAdmin , isPending:isAdminLoading}  = useQuery({
        queryKey:[user?.email,'isAdmin'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin,isAdminLoading]
};

export default UseAdmin;