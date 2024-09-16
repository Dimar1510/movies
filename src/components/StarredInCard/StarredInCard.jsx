import React from "react";
import { selectImageURL } from "../../store/movieSlice";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import noImage from "../../assets/images/no-image.jpg";

const StarredInCard = ({ data, type }) => {
  const imageUrl = useSelector(selectImageURL);

  return (
    <Link
      to={"/" + type + "/" + data.id}
      className="flex bg-black/80 rounded-lg overflow-hidden hover:scale-105 transition-transform"
    >
      <img
        src={
          data.poster_path || data.backdrop_path
            ? imageUrl + (data.poster_path || data.backdrop_path)
            : noImage
        }
        alt={data.title || data.name}
        className="object-cover max-w-24"
      />
      <div className="flex-1 flex flex-col justify-between p-2 ">
        <div className="">
          <h2 className="text-ellipsis line-clamp-2 text-lg font-semibold text-white">
            {data.title || data.name}
          </h2>
          <p className="text-sm text-neutral-500">
            {(data.release_date || data.first_air_date) &&
              format(
                new Date(data.release_date || data.first_air_date),
                "yyyy"
              )}
          </p>
          <p className=" text-neutral-500 text-sm">
            Rating: {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
        {data.job && (
          <p>
            <span className="text-neutral-500">Role: </span>
            <span>{data.job}</span>
          </p>
        )}
        {data.character && (
          <p>
            <span className="text-neutral-500">as </span>
            <span>{data.character}</span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default StarredInCard;
