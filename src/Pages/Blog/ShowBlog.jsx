const ShowBlog = ({ blog }) => {
    const { img, title,content,author,date } = blog || {};
    return (
      <div className="my-4"> {/* Add margin-y to create a gap */}
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img className="w-[800px] h-[300px]" src={img} alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{content}</p>
            <p className="font-bold">Author : {author}</p>
            <p>Date : {date}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Read Vlog</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ShowBlog;
  