import { useState } from "react";
import UseAxiosPublic from "../../../Hooks/useAxiosPublic/UseAxiosPublic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the rich text editor

const AddBlog = () => {
  const axiosPublic = UseAxiosPublic();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content: content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosPublic.post("/Blogs", {
        ...formData,
        // Store the HTML content directly
        content: formData.content,
      });

      console.log(res.data);

      setFormData({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <div className="bg-base-200">
        <div className="container mx-auto">
          <div className="text-center lg:text-left py-8">
            <h1 className="text-5xl font-bold">Create a New Blog</h1>
            <p className="py-6">Provide details for your new blog post.</p>
          </div>
          <div className="mx-auto shadow-2xl bg-base-100 p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Write Title here..."
                  className="input input-bordered w-full lg:w-[400px]"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <ReactQuill
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full lg:w-[400px]"
              >
                Create Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
