import Dashboard from "../../Components/Dashboard/Dashboard";
import ContactUs from "../ContactUS/ContactUs";
import Banner from "./Shared/Banner/Banner";
import SucessStories from "./Shared/SuccessStories/SucessStories";

const Home = () => {
  return <div>
<h1 className="text-red-500">Home</h1>
<Banner></Banner>
<SucessStories></SucessStories>
<ContactUs></ContactUs>
<Dashboard></Dashboard>
  </div>;
};

export default Home;
