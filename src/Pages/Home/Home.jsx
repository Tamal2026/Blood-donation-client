import  { useState } from "react";
import Dashboard from "../../Components/Dashboard/Dashboard";
import ContactUs from "../ContactUS/ContactUs";
import Banner from "./Shared/Banner/Banner";
import SucessStories from "./Shared/SuccessStories/SucessStories";

const Home = () => {
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);

  const toggleDashboard = () => {
    setIsDashboardVisible(!isDashboardVisible);
  };

  return (
    <div>
      <Banner />
      <button className="font-bold mt-8" onClick={toggleDashboard}>Click Here For Dashboard</button>
      {isDashboardVisible && <Dashboard />}
      <SucessStories />
      <ContactUs />
    </div>
  );
};

export default Home;
