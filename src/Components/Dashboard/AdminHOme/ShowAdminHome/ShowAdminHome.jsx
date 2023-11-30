const ShowAdminHome = ({ user }) => {
  const { displayName } = user || {};
  return (
    <div>
      <h1 className="text-2xl ">
   
        Hi Welcome  :
        <span className="font-medium text-2xl ml-3 mt-6 space-x-5">
          {displayName}
        </span>
      </h1>
    </div>
  );
};

export default ShowAdminHome;
