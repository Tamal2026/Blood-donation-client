const ShowSuccessStories = ({ story }) => {
  const { title,image,author,date,content } = story || {} ;
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img className="h-[300px] w-[300px]"
            src={image}
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title  ">{title}!</h2>
          <h1>Date : {date}</h1>
      
        <p className="w-[400px]">{content}</p>
        <h1 className="font-semibold">Author : {author}</h1>
        </div>
      </div>
    </div>
  );
};

export default ShowSuccessStories;
