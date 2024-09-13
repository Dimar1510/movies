import React from "react";
import { useSelector } from "react-redux";
import { selectImageURL } from "../../store/movieSlice";
import noImage from "../../assets/images/no-image.jpg";

const CastList = ({ data }) => {
  const imageUrl = useSelector(selectImageURL);

  if (data)
    return (
      <div>
        <h3 className="text-white font-bold">
          {data.cast.length > 0 ? "Cast:" : "No information about the cast"}
        </h3>
        <div className="flex gap-5 my-4 flex-wrap">
          {data.cast
            .sort((a, b) => (a.order > b.order ? 1 : -1))
            .map((actor) => (
              <div key={actor.id} className="flex flex-col">
                <img
                  src={
                    actor.profile_path ? imageUrl + actor.profile_path : noImage
                  }
                  alt={actor.name}
                  className="w-24 h-24 object-cover rounded-full"
                />
                <p className="font-bold text-center text-sm max-w-24">
                  {actor.name}
                </p>
                <p className="text-center text-xs text-neutral-400 max-w-24 ">
                  {actor.character}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
};

export default CastList;
