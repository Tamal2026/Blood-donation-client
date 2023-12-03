import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../../Hooks/useAxiosPublic/UseAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const DonationReq = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();
  const [districts, setDistricts] = useState([]);
  const [upzilas, setUpzilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data);
        console.log("Districts Data:", data);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });

    fetch("upzilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpzilas(data);
        console.log("Upzilas Data:", data);
      })
      .catch((error) => {
        console.error("Error fetching upzilas:", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    recipientName: "",
    hospitalName: "",
    address: "",
    date: "",
    time: "",
    reqmessage: "",
    bloodGroup: "",
  });

  const handleDistrictChange = (e) => {
    const selectedDistrictValue = e.target.value;
    setSelectedDistrict(selectedDistrictValue);
    console.log("Selected District:", selectedDistrictValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    try {
      const datainfo = {
        ...formData,
        district: selectedDistrict,
        email : user.email,
        additionalField: "additionalValue",
      };

      const res = await axiosPublic.post("/bloodDonation", datainfo);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Donation Req Has Been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      console.log("Response:", res.data);
      setFormData({
        recipientName: "",
        hospitalName: "",
        address: "",
        date: "",
        time: "",
        reqmessage: "",
        bloodGroup: "",
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
            <h1 className="text-5xl font-bold">Donate Blood & Save Life</h1>
            <p className="py-6">
              Be a lifesaver! Your blood donation can make a significant impact
              in times of need. Join us in this noble cause and provide the gift
              of life. Every donation counts, bringing hope and support to those
              facing medical challenges. Your contribution matters — become a
              blood donor today and make a difference in somees life.
            </p>
            <div>

              {user && (
                <p className="text-center text-lg font-bold text-gray-500">
                  Logged in as : {user.email}
                </p>
              )}
            </div>
          </div>
          <div className="mx-auto shadow-2xl bg-base-100 p-8">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                  <span className="label-text">Select Your Blood Group</span>
                </label>
                <select
                  {...register("bloodGroup")}
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Your District</span>
                </label>
                <select
                  {...register("district")}
                  onChange={handleDistrictChange}
                  className="select select-bordered w-full max-h-150 overflow-y-auto"
                >
                  <option value="" disabled>
                    Select District
                  </option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Your Upazila</span>
                </label>
                <select
                  {...register("upzila")}
                  className="select select-bordered w-full max-h-150 overflow-y-auto"
                >
                  <option value="" disabled>
                    Select Upazila
                  </option>
                  {upzilas
                    .filter((upzila) => upzila.district_id === selectedDistrict)
                    .map((upzila) => (
                      <option key={upzila.id} value={upzila.id}>
                        {upzila.name}
                      </option>
                    ))}
                </select>
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
