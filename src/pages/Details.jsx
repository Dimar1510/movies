import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const Detail = ({ hasDivider = true, text }) => {
  return (
    <>
      {hasDivider && <span className="hidden md:inline">|</span>}
      <p>{text}</p>
    </>
  );
};

const Details = () => {
  const params = useParams();
  const type = params.explore;
  const imageUrl = useSelector(selectImageURL);
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

  if (error) return <ErrorElement errorText={error} />;

  if (data)
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
                <Detail
                  hasDivider={false}
                  text={`Rating: ${Number(data.vote_average).toFixed(1)}`}
                />
              )}
              {data.popularity > 0 && (
                <Detail text={`View: ${Number(data.popularity).toFixed(0)}`} />
              )}
              {data.runtime > 0 && (
                <Detail text={`Duration: ${data.runtime} min`} />
              )}
              {data.number_of_seasons > 0 && (
                <Detail text={`Seasons: ${data.number_of_seasons}`} />
              )}
              {data.number_of_episodes > 0 && (
                <Detail text={`Episodes: ${data.number_of_episodes}`} />
              )}
            </div>
            <Divider />
            <h3 className="font-bold mb-1 lg:text-lg text-white">Overview</h3>
            <p>{data.overview}</p>
            <Divider />
            <div className="flex gap-3 flex-col md:flex-row">
              {data.origin_country && (
                <Detail
                  hasDivider={false}
                  text={`Country: ${data.origin_country[0]}`}
                />
              )}
              {data.status && <Detail text={`Status: ${data.status}`} />}
              {(data.release_date || data.first_air_date) && (
                <Detail
                  text={` Release Date: ${format(
                    new Date(data.release_date || data.first_air_date),
                    "MMMM do yyyy"
                  )}`}
                />
              )}
              {data.revenue > 0 && (
                <Detail
                  text={`Revenue: ${Number(data.revenue).toLocaleString(
                    "en-US"
                  )}`}
                />
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
            )}
            <Divider />
            <CastList data={castData} />
          </div>
        </div>
        <Videos itemId={params?.id} />
        <Similar />
        <Recommendations />
      </div>
    );
};

export default Details;
