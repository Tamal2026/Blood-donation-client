

const ShowUser = ({ user }) => {
  const { name, email } = user || {};

  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      {/* Add more information about the user as needed */}
    </div>
  );
};

export default ShowUser;
