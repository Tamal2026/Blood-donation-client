import Dashboard from "../../Components/Dashboard/Dashboard";
import Banner from "./Shared/Banner/Banner";
import SucessStories from "./Shared/SuccessStories/SucessStories";

const Home = () => {
  return <div>
<h1 className="text-red-500">Home</h1>
<Banner></Banner>
<SucessStories></SucessStories>
<Dashboard></Dashboard>
  </div>;
};

export default Home;
