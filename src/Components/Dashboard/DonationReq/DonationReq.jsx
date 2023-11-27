import { useState } from "react";
import UseAxiosPublic from "../../../Hooks/useAxiosPublic/UseAxiosPublic";

const DonationReq = () => {
  const axiosPublic = UseAxiosPublic();
  const [formData, setFormData] = useState({
    recipientName: "",
    hospitalName: "",
    address: "",
    date: "",
    time: "",
    reqmessage: "", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
const userEmail = await axiosPublic.get('/users');


    const datainfo = { ...formData , userEmail};
  
    try {
      const res = await axiosPublic.post('/bloodDonation', datainfo);
      console.log(res.data);
  
      setFormData({
        recipientName: '',
        hospitalName: '',
        address: '',
        date: '',
        time: '',
        reqmessage: '',
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  

  return (
    <div>
      <div className="bg-base-200">
        <div className="container mx-auto">
          <div className="text-center lg:text-left py-8">
            <h1 className="text-5xl font-bold">Donate Blood & Save Life</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="mx-auto shadow-2xl bg-base-100 p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Recipient name</span>
                  </label>
                  <input
                    type="name"
                    name="recipientName"
                    placeholder="Write Name here..."
                    className="input input-bordered w-full lg:w-[400px]"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Hospital Name</span>
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    placeholder="Write Your Hospital Name Here..."
                    className="input input-bordered w-full lg:w-[400px]"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Write Full Address..."
                  className="input input-bordered w-full lg:w-[800px]"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered w-full lg:w-[400px]"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Time</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    className="input input-bordered w-full lg:w-[400px]"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Request Message</span>
                </label>
                <textarea
                  name="reqmessage" 
                  placeholder="Write Why need and how much it needed..."
                  className="textarea textarea-bordered w-full lg:w-[800px]"
                  value={formData.reqmessage}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full lg:w-[400px]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationReq;
