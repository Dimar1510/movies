import { selectImageURL } from "../../store/movieSlice";
import noImage from "../../assets/images/no-image.jpg";
import { Link } from "react-router-dom";
import { ICardItem } from "../../store/types";
import { useAppSelector } from "../../store/hooks";

const CastList = ({ data }: { data: ICardItem[] }) => {
  const imageUrl = useAppSelector(selectImageURL);

  if (data)
    return (
      <div>
        <h3 className="text-white font-bold">
          {data.length > 0 ? "Cast:" : "No information about the cast"}
        </h3>
        <div className="flex gap-5 my-4 flex-wrap">
          {data
            .sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
            .map((actor) => (
              <div key={actor.id} className="flex flex-col">
                <Link to={`/person/${actor.id}`}>
                  <img
                    src={
                      actor.profile_path
                        ? imageUrl + actor.profile_path
                        : noImage
                    }
                    alt={actor.name}
                    className="w-24 h-24 object-cover rounded-full hover:shadow-themeColor hover:shadow-[0px_0px_5px_1px]"
                  />
                </Link>

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
