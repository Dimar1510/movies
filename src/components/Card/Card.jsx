import React from "react";
import { selectImageURL } from "../../store/movieSlice";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import noImage from "../../assets/images/no-image.jpg";

const Card = ({ data, isTrending, index, type }) => {
  const imageUrl = useSelector(selectImageURL);

  return (
    <Link
      to={"/" + type + "/" + data.id}
      className="max-w-[240px] min-w-[240px] rounded-lg overflow-hidden relative hover:scale-105 transition-transform"
    >
      <img
        src={
          data.poster_path || data.backdrop_path
            ? imageUrl + (data.poster_path || data.backdrop_path)
            : noImage
        }
        alt={data.title || data.name}
        className="object-cover h-full"
      />
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
            {(data.release_date || data.first_air_date) &&
              format(
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
