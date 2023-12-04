

const ShowAdminHome = ({ user }) => {
    const{displayName}= user || {};
  return (
    <div>
      <h2 className="sm:w-1/2 mb-5 text-center text-4xl bg-red-500 text-white px-3 py-2 w-1/4 rounded-lg font-bold mx-auto mt-10">Admin Information</h2>
      <p className="font-lg font-bold">Admin Name: {displayName}</p>
      <p><span className="font-bold text-cyan-700">Description </span>: Welcome to the nerve center of your digital realm! The Admin Dashboard Homepage is the pulsating heart of control, <br /> where precision meets power. Designed with an intuitive interface and cutting-edge functionality, this hub empowers <br /> administrators to effortlessly oversee and manage every facet of their system</p>
   
    </div>
  );
};

export default ShowAdminHome;
