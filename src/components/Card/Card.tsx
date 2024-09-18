import { selectImageURL } from "../../store/movieSlice";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import noImage from "../../assets/images/no-image.jpg";
import { ICardItem, MediaType } from "../../store/types";
import { FC } from "react";
import { useAppSelector } from "../../store/hooks";

interface IProps {
  data: ICardItem;
  isTrending?: boolean;
  index?: number;
  type: MediaType;
}

const Card: FC<IProps> = ({ data, isTrending = false, index = 0, type }) => {
  const imageUrl = useAppSelector(selectImageURL);

  return (
    <Link
      to={"/" + type + "/" + data.id}
      className="max-w-[240px] min-w-[240px] rounded-lg overflow-hidden relative hover:scale-105 transition-transform"
    >
      <img
        src={
          data.poster_path || data.backdrop_path || data.profile_path
            ? imageUrl +
              (data.poster_path || data.backdrop_path || data.profile_path)
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
          {data.release_date ||
            (data.first_air_date && (
              <p>
                {format(
                  new Date(data.release_date || data.first_air_date),
                  "MMMM do yyyy"
                )}
              </p>
            ))}
          {data.vote_average && data.vote_average > 0 && (
            <p className="bg-black px-1 rounded-full text-white">
              Rating: {Number(data.vote_average).toFixed(1)}
            </p>
          )}
          {data.known_for_department && (
            <p className=" text-white">
              Known for: {data.known_for_department}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
