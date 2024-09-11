import React from "react";
import { selectImageURL } from "../../store/movieSlice";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Card = ({ data = [], isTrending, index }) => {
  const imageUrl = useSelector(selectImageURL);
  return (
    <Link
      to={"/" + data.media_type + "/" + data.id}
      className="w-full min-w-[230px] rounded-lg overflow-hidden relative"
    >
      <img src={imageUrl + data.poster_path} alt="" />
      <div className="absolute top-2 ">
        {isTrending && (
          <div className="py-1 px-4 backdrop-blur-xl rounded-r-full bg-black/60">
            #{index} Trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0 h-16 backdrop-blur-xl w-full p-2 bg-black/80">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data.title || data.name}
        </h2>
        <div className="text-neutral-400 flex justify-between text-sm">
          <p>
            {format(
              new Date(data.release_date || data.first_air_date),
              "MMMM do yyyy"
            )}
          </p>
          <p className="bg-black px-1 rounded-full text-white">
            Rating: {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
