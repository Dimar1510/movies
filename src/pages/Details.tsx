import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { selectImageURL } from "../store/movieSlice";
import Divider from "../components/Divider/Divider";
import { format } from "date-fns";
import noImage from "../assets/images/no-image.jpg";
import Spinner from "../components/Spinner/Spinner";
import Recommendations from "../components/Recommendations/Recommendations";
import Similar from "../components/Similar/Similar";
import CastList from "../components/CastList/CastList";
import ErrorElement from "../components/ErrorElement/ErrorElement";
import Videos from "../components/Videos/Videos";
import Gallery from "../components/Gallery/Gallery";
import isMediaType from "../components/utils/isMediaType";

const Detail = ({
  hasDivider = true,
  text,
}: {
  hasDivider?: boolean;
  text: string;
}) => {
  return (
    <>
      {hasDivider && <span className="hidden md:inline">|</span>}
      <p>{text}</p>
    </>
  );
};

const CrewMember = ({ name, id }: { name: string; id: number }) => {
  return (
    <Link
      className="text-white font-semibold underline hover:text-themeColor"
      to={`/person/${id.toString()}`}
    >
      {name}
    </Link>
  );
};

const Details = () => {
  const params = useParams();
  const type = params.explore;
  const imageUrl = useSelector(selectImageURL);
  const { data, error, loading } = useFetch(`/${type}/${params?.id}`);
  const { data: castData } = useFetch(`/${type}/${params?.id}/credits`);

  const writers =
    !Array.isArray(castData) &&
    castData?.crew?.filter((el) => el?.job === "Writer");

  const directors =
    !Array.isArray(castData) &&
    castData?.crew?.filter((el) => el?.job === "Director");

  const creators = !Array.isArray(data) && data?.created_by;

  const genres = !Array.isArray(data) && data?.genres?.map((el) => el?.name);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [params]);

  if (loading)
    return (
      <div className="fixed size-fit m-auto left-0 right-0 top-0 bottom-0 scale-[2]">
        <Spinner />
      </div>
    );

  if (error) return <ErrorElement errorText={error} />;

  if (data && !Array.isArray(data) && !Array.isArray(castData))
    return (
      <div className="pt-6">
        <div className="w-full h-[300px] relative hidden lg:block">
          <div className="size-full">
            <img
              src={data.backdrop_path ? imageUrl + data.backdrop_path : noImage}
              alt={data.title || data.name}
              className="h-full object-cover w-full object-top"
            />
          </div>
          <div className="absolute bg-gradient-to-t from-black/90 to-transparent size-full top-0"></div>
        </div>
        <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-10">
          <div className="lg:-mt-28 relative mx-auto w-fit lg:mx-0">
            <img
              src={data.poster_path ? imageUrl + data.poster_path : noImage}
              alt="poster"
              className="w-60 object-cover rounded-lg"
            />
            <Divider />
            {genres &&
              genres.length > 0 &&
              genres.map((item) => (
                <p className="text-sm" key={item}>
                  {item}
                </p>
              ))}
          </div>
          <div className="flex flex-col w-full mt-2">
            <h2 className="text-xl lg:text-3xl font-bold text-white">
              {data.title || data.name}
            </h2>
            <p>{data.tagline}</p>
            <Divider />

            <div className="flex gap-3 flex-col md:flex-row">
              {data.vote_average !== undefined && (
                <Detail
                  hasDivider={false}
                  text={`Rating: ${Number(data.vote_average).toFixed(1)}`}
                />
              )}
              {data.popularity && (
                <Detail text={`View: ${Number(data.popularity).toFixed(0)}`} />
              )}
              {data.runtime && (
                <Detail text={`Duration: ${data.runtime} min`} />
              )}
              {data.number_of_seasons && (
                <Detail text={`Seasons: ${data.number_of_seasons}`} />
              )}
              {data.number_of_episodes && (
                <Detail text={`Episodes: ${data.number_of_episodes}`} />
              )}
            </div>
            <Divider />
            <h3 className="font-bold mb-1 lg:text-lg text-white">Overview</h3>
            <p>{data.overview}</p>
            <Divider />
            <div className="flex gap-3 flex-col md:flex-row flex-wrap">
              {data.origin_country && (
                <Detail
                  hasDivider={false}
                  text={`Country: ${data.origin_country[0]}`}
                />
              )}
              {data.status && <Detail text={`Status: ${data.status}`} />}
              {(data.release_date || data.first_air_date) && (
                <Detail
                  text={` Release: ${format(
                    new Date(data.release_date || data.first_air_date || ""),
                    "MMMM do yyyy"
                  )}`}
                />
              )}
              {data.budget && (
                <Detail
                  text={`Budget: $${Number(data.budget).toLocaleString(
                    "en-US"
                  )}`}
                />
              )}
              {data.revenue && (
                <Detail
                  text={`Revenue: $${Number(data.revenue).toLocaleString(
                    "en-US"
                  )}`}
                />
              )}
            </div>
            {directors && directors.length > 0 && (
              <>
                <Divider />
                <p className="flex gap-2">
                  Directed by:{" "}
                  {directors.map((person) => (
                    <CrewMember
                      key={person.id}
                      id={person.id}
                      name={person.name || ""}
                    />
                  ))}
                </p>
              </>
            )}
            {creators && creators.length > 0 && (
              <>
                <Divider />
                <p className="flex gap-2">
                  Created by:{" "}
                  {creators.map((person) => (
                    <CrewMember
                      key={person.id}
                      id={person.id}
                      name={person.name || ""}
                    />
                  ))}
                </p>
              </>
            )}
            {writers && writers.length > 0 && (
              <>
                <Divider />
                <p className="flex gap-2">
                  Written by:{" "}
                  {writers.map((person) => (
                    <CrewMember
                      key={person.id}
                      id={person.id}
                      name={person.name || ""}
                    />
                  ))}
                </p>
              </>
            )}
            <Divider />
            <CastList data={castData?.cast || []} />
          </div>
        </div>
        {params.id && isMediaType(type) && (
          <>
            <Gallery id={params?.id} type={type} />
            <Videos itemId={params?.id} />
          </>
        )}

        <Similar />
        <Recommendations />
      </div>
    );
};

export default Details;
