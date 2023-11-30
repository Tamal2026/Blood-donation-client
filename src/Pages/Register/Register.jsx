/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/useAxiosPublic/UseAxiosPublic";

const Register = () => {
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [upzilas, setUpzilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("Select");

  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data);
        console.log(data);
      });

    fetch("upzilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpzilas(data);
        console.log(data);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const axiosPublic = UseAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const { password, confirmPassword } = data;

      if (password !== confirmPassword) {
        setPasswordMatch(false);
        return;
      }

      // Find the selected district and upzila objects
      const selectedDistrictObj = districts.find(
        (district) => district.id === data.district
      );
      const selectedUpzilaObj = upzilas.find(
        (upzila) => upzila.id === data.upzila
      );

      const result = await createUser(
        data.email,
        data.password,
        data.name,
        data.bloodGroup,
        selectedDistrictObj ? selectedDistrictObj.name : "",
        selectedUpzilaObj ? selectedUpzilaObj.name : ""
      );

      const loggedUser = result.user;
      console.log(loggedUser);

      await updateUserProfile(
        data.name,
        data.bloodGroup,
        data.email,
        selectedDistrictObj ? selectedDistrictObj.name : "",
        selectedUpzilaObj ? selectedUpzilaObj.name : ""
      );

      console.log("User Updated");

      const userInfo = {
        displayName: data.name,
        email: data.email,
        bloodGroup: data.bloodGroup,
        district: selectedDistrictObj ? selectedDistrictObj.name : "",
        upzila: selectedUpzilaObj ? selectedUpzilaObj.name : "",
      };

      const response = await axiosPublic.post("/users", userInfo);

      console.log(response.data);
      navigate("/");
      if (response?.data.insertedId) {
        alert("User added");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div>
      <div>
        <div
          className="hero h-full  w-full bg-gradient-to-r from-gray-600 to-gray-400"
          style={{}}
        >
          <div>
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-white">Register</h1>
              <p className="py-6 text-white">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="card shrink-0  max-w-md shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select Your Blood Group</span>
                  </label>
                  <select
                    {...register("bloodGroup")}
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
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
                      .filter(
                        (upzila) => upzila.district_id === selectedDistrict
                      )
                      .map((upzila) => (
                        <option key={upzila.id} value={upzila.id}>
                          {upzila.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="confirm password"
                    className={`input input-bordered ${
                      passwordMatch ? "" : "input-error"
                    }`}
                    required
                  />
                  {!passwordMatch && (
                    <p className="text-error mt-2">Passwords do not match.</p>
                  )}
                </div>

                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Register"
                  />
                </div>
                <Link to="/login">
                  <h1>
                    Already have an account? Go{" "}
                    <span className="text-lg font-bold text-teal-600">
                      Login
                    </span>
                  </h1>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
