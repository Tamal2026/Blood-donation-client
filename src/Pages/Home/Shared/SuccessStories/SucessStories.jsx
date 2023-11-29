import { useEffect, useState } from "react";
import ShowSuccessStories from "./ShowSuccessStories";

const SucessStories = () => {
    const [stories,setStories] = useState();
    useEffect(()=>{
fetch('Success.json')
.then(res =>res.json())
.then(data =>{
    setStories(data)
})
    },[])
    return (
        <div>
            <h1 className="text-5xl font-bold bg-cyan-700 my-12 text-center py-2 px-3 w-1/4 mx-auto rounded-lg text-white">Our Success Stories</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {
                    stories?.map(story =><ShowSuccessStories key={story.id} story={story} ></ShowSuccessStories>)
                }
            </div>
        </div>
    );
};

export default SucessStories;