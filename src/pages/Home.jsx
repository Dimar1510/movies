import React, { useEffect, useState } from "react";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import HorizontalScroll from "../components/HorizontalScroll/HorizontalScroll";
import { useFetch } from "../hooks/useFetch";

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

  const renderSection = (heading, data, loading, error, isTrending = false) => {
    if (loading) {
      return <div className="pt-16">Loading {heading}</div>;
    }
    if (error) {
      return (
        <div className="pt-16">
          API error while loading {heading}: {error}
        </div>
      );
    }
    return (
      <HorizontalScroll
        heading={heading}
        sectionData={data}
        isTrending={isTrending}
      />
    );
  };

  return (
    <>
      {trendingData && <HomeBanner bannerData={trendingData} />}
      {renderSection(
        "Now Trending",
        trendingData,
        trendingLoading,
        trendingError,
        true
      )}
      {renderSection(
        "Now Playing",
        nowPlayingData,
        nowPlayingLoading,
        nowPlayingError
      )}
      {renderSection("Top Rated", topRatedData, topRatedLoading, topRatedError)}
      {renderSection(
        "Popular Shows",
        popularShowsData,
        popularShowsLoading,
        popularShowsError
      )}
      {renderSection(
        "On Air Shows",
        onAirShowsData,
        onAirShowsLoading,
        onAirShowsError
      )}
    </>
  );
};

export default Home;
