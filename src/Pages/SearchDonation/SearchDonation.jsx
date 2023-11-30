// SearchDonation.js
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/useAxiosPublic/UseAxiosPublic";

const SearchDonation = () => {
  const [districts, setDistricts] = useState([]);
  const [upzilas, setUpzilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("Select");
  const [searchResults, setSearchResults] = useState([]);

  const { register, handleSubmit } = useForm();
  const axiosPublic = UseAxiosPublic();

  useEffect(() => {
    
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });

    
    fetch("upzilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpzilas(data);
      })
      .catch((error) => {
        console.error("Error fetching upazilas:", error);
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.get("/bloodDonation", {
        params: data,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Search Blood Donation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2" htmlFor="bloodGroup">
            Blood Group
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

        <div>
          <label className="block mb-2" htmlFor="district">
            District
          </label>
          <select
            {...register("district")}
            onChange={handleDistrictChange}
            className="select select-bordered w-full"
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

        <div>
          <label className="block mb-2" htmlFor="upzila">
            Upazila
          </label>
          <select
            {...register("upzila")}
            className="select select-bordered w-full"
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

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>
      <p className="font-bold">Total Donors : {searchResults.length}</p>
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result._id}>
              
                <p className="font-bold text-xl">
                  {" "}
                  Blood Group: {result.bloodGroup}, District: {result.district},
                  Upazila: {result.upazila}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDonation;
