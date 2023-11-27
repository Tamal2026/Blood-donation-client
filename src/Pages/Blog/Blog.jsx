import { useEffect, useState } from "react";
import ShowBlog from "./ShowBlog";


const Blog = () => {
    const [blogs,setBlogs] = useState([]);
    useEffect(()=>{
fetch('Blog.json')
.then(res=>res.json())
.then(data =>{
    setBlogs(data)
})
    },[])
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {
                blogs?.map(blog =><ShowBlog key={blog.id} blog={blog}></ShowBlog>)
            }
            </div>
        </div>
    );
};

export default Blog;