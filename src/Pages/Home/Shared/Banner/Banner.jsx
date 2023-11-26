import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div className="bg-base-200 w-4/5 mx-auto">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://i.ibb.co/qybr9xs/happy-world-blood-donor-day-red-grey-yellow-background-social-media-design-banner-free-vector-1340-2.jpg"
            className=" rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <div className="flex gap-6 mt">
              <Link to="/register">
                {" "}
                <h1 className="bg-red-600 text-white font-bold text-3xl px-3 py-1 rounded-lg">
                  Join Us As a Donor
                </h1>
              </Link>
              <h1 className="bg-emerald-600 text-white font-bold text-3xl px-3 py-1 rounded-lg">
                Search Donors
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
