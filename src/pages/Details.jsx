import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { selectImageURL } from "../store/movieSlice";
import Divider from "../components/Divider/Divider";
import { format } from "date-fns";
import noImage from "../assets/images/no-image.jpg";
import HorizontalScroll from "../components/HorizontalScroll/HorizontalScroll";
import Spinner from "../components/Spinner/Spinner";

const Details = () => {
  const params = useParams();
  const type = params.explore;
  const imageUrl = useSelector(selectImageURL);
  const { data: similarData } = useFetch(`/${type}/${params?.id}/similar`);
  const { data: recommendationData } = useFetch(
    `/${type}/${params?.id}/recommendations`
  );
  const { data, error, loading } = useFetch(`/${type}/${params?.id}`);
  const { data: castData } = useFetch(`/${type}/${params?.id}/credits`);

  const writers = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el?.name)
    ?.join(", ");

  const directors = castData?.crew
    ?.filter((el) => el?.job === "Director")
    ?.map((el) => el?.name)
    ?.join(", ");

  const creators = castData?.crew
    ?.filter((el) => el?.job === "Executive Producer")
    ?.map((el) => el?.name)
    ?.join(", ");

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

  if (data && castData && similarData && recommendationData)
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
          </div>
          <div className="flex flex-col w-full mt-2">
            <h2 className="text-xl lg:text-3xl font-bold text-white">
              {data.title || data.name}
            </h2>
            <p>{data.tagline}</p>
            <Divider />
            <div className="flex gap-3 flex-col md:flex-row">
              {data.vote_average !== undefined && (
                <>
                  <p>Rating: {Number(data.vote_average).toFixed(1)}</p>
                </>
              )}
              {data.popularity > 0 && (
                <>
                  <span className="hidden md:inline">|</span>
                  <p>View: {Number(data.popularity).toFixed(0)}</p>
                </>
              )}
              {data.runtime > 0 && (
                <>
                  <span className="hidden md:inline">|</span>
                  <p>Duration: {data.runtime} min</p>
                </>
              )}
              {data.number_of_seasons > 0 && (
                <>
                  <span className="hidden md:inline">|</span>
                  <p>Seasons: {data.number_of_seasons}</p>
                </>
              )}
              {data.number_of_episodes > 0 && (
                <>
                  <span className="hidden md:inline">|</span>
                  <p>Episodes: {data.number_of_episodes}</p>
                </>
              )}
            </div>
            <Divider />
            <h3 className="font-bold mb-1 lg:text-lg text-white">Overview</h3>
            <p>{data.overview}</p>
            <Divider />
            <div className="flex gap-3 flex-col md:flex-row">
              {data.origin_country && (
                <>
                  <p>Country: {data.origin_country[0]}</p>
                </>
              )}
              {data.status && (
                <>
                  <span className="hidden md:inline">|</span>
                  <p>Status: {data.status}</p>
                </>
              )}
              {(data.release_date || data.first_air_date) && (
                <>
                  <span className="hidden md:inline">|</span>
                  <p>
                    Release Date:{" "}
                    {format(
                      new Date(data.release_date || data.first_air_date),
                      "MMMM do yyyy"
                    )}
                  </p>
                </>
              )}
              {data.revenue > 0 && (
                <>
                  <span className="hidden md:inline">|</span>
                  <p>
                    Revenue: ${Number(data.revenue).toLocaleString("en-US")}
                  </p>
                </>
              )}
            </div>
            {directors && (
              <>
                <Divider />
                <p className="text-white">
                  Directed by:{" "}
                  <span className="text-neutral-300">{directors}</span>
                </p>
              </>
            )}
            {creators && (
              <>
                <Divider />
                <p className="text-white">
                  Executive producers:{" "}
                  <span className="text-neutral-300">{creators}</span>
                </p>
              </>
            )}
            {writers && (
              <>
                <Divider />
                <p className="text-white">
                  Written by:{" "}
                  <span className="text-neutral-300">{writers}</span>
                </p>
              </>
            )}{" "}
            <Divider />
            {castData.cast.length > 0 && (
              <div>
                <h3 className="text-white font-bold">Cast:</h3>
                <div className="flex gap-5 my-4 flex-wrap">
                  {castData.cast
                    .sort((a, b) => (a.order > b.order ? 1 : -1))
                    .map((actor) => (
                      <div key={actor.id} className="flex flex-col">
                        <img
                          src={
                            actor.profile_path
                              ? imageUrl + actor.profile_path
                              : noImage
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
            )}
          </div>
        </div>

        <>
          {similarData.length > 0 && (
            <HorizontalScroll
              sectionData={similarData}
              heading={type === "tv" ? "Similar TV Shows" : "Similar Movies"}
              type={type}
            />
          )}
          {recommendationData.length > 0 && (
            <HorizontalScroll
              sectionData={recommendationData}
              heading={"Recommendations"}
              type={type}
            />
          )}
        </>
      </div>
    );
};

export default Details;
