

const ShowAdminHome = ({user}) => {
    const {displayName} = user || {};
    return (
        <div>
            HI Welcome {displayName}
            
        </div>
    );
};

export default ShowAdminHome;