import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../AxiosSecure/useAxiosPublic/useAxiosPublic";


const ContentManageMent = () => {
    const axiosPublice = useAxiosPublic();
    const {data:blog = [],isPending : loading , refetch} = useQuery({
        queryKey:['contentManagement'],
        queryFn: async ()=>{
            const res = await axiosPublice.get('/contentManagement');
            return res.data
        }
    });

    return [blog,loading,refetch]
};

export default ContentManageMent;