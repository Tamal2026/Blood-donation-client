import Dashboard from "../../Components/Dashboard/Dashboard";
import ContactUs from "../ContactUS/ContactUs";
import Banner from "./Shared/Banner/Banner";
import SucessStories from "./Shared/SuccessStories/SucessStories";

const Home = () => {
  return <div>

<Banner></Banner>
<Dashboard></Dashboard>
<SucessStories></SucessStories>
<ContactUs></ContactUs>

  </div>;
};

export default Home;
