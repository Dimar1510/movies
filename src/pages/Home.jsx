import React, { useEffect, useState } from "react";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import HorizontalScroll from "../components/HorizontalScroll/HorizontalScroll";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner/Spinner";

const Home = () => {
  const {
    data: trendingData,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch("/trending/all/week");
  const {
    data: nowPlayingData,
    loading: nowPlayingLoading,
    error: nowPlayingError,
  } = useFetch("/movie/now_playing");
  const {
    data: topRatedData,
    loading: topRatedLoading,
    error: topRatedError,
  } = useFetch("/movie/top_rated");
  const {
    data: popularShowsData,
    loading: popularShowsLoading,
    error: popularShowsError,
  } = useFetch("/tv/popular");
  const {
    data: onAirShowsData,
    loading: onAirShowsLoading,
    error: onAirShowsError,
  } = useFetch("/tv/on_the_air");

  const isLoading =
    trendingLoading ||
    nowPlayingLoading ||
    topRatedLoading ||
    popularShowsLoading ||
    onAirShowsLoading;

  const hasError =
    trendingError ||
    nowPlayingError ||
    topRatedError ||
    popularShowsError ||
    onAirShowsError;

  if (isLoading)
    return (
      <div className="fixed size-fit m-auto left-0 right-0 top-0 bottom-0 scale-[2]">
        <Spinner />
      </div>
    );

  if (hasError)
    return (
      <div className="pt-16">
        Error loading data, something went wrong with API. Please try again
        later.
      </div>
    );

  return (
    <>
      {trendingData && <HomeBanner bannerData={trendingData} />}

      {trendingData && (
        <HorizontalScroll
          heading={"Trending"}
          sectionData={trendingData}
          isTrending={true}
        />
      )}

      {nowPlayingData && (
        <HorizontalScroll
          heading={"Now Playing"}
          sectionData={nowPlayingData}
          type={"movie"}
        />
      )}

      {topRatedData && (
        <HorizontalScroll
          heading={"Top Rated"}
          sectionData={topRatedData}
          type={"movie"}
        />
      )}

      {popularShowsData && (
        <HorizontalScroll
          heading={"Popular Shows"}
          sectionData={popularShowsData}
          type={"tv"}
        />
      )}

      {onAirShowsData && (
        <HorizontalScroll
          heading={"On Air Shows"}
          sectionData={onAirShowsData}
          type={"tv"}
        />
      )}
    </>
  );
};

export default Home;
