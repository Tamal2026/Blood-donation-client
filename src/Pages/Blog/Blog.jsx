
import ShowBlog from "./ShowBlog";
import useAxiosPublic from "../../Components/AxiosSecure/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Blog = () => {
    const axiosPublic = useAxiosPublic();
    const { data: blogs = []} = useQuery({
        queryKey: ["Blogs"],
        queryFn: async () => {
          const res = await axiosPublic.get("/Blogs");
          return res.data;
        },
      });
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {
                blogs?.map(blog =><ShowBlog key={blog._id} blog={blog}></ShowBlog>)
            }
            </div>
        </div>
    );
};

export default Blog;