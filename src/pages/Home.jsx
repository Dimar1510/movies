import React from "react";
import HomeBanner from "../components/HomeBanner/HomeBanner";

import Card from "../components/Card/Card";
import { useSelector } from "react-redux";
import { selectBannerData } from "../store/movieSlice";
import HorizontalScroll from "../components/HorizontalScroll/HorizontalScroll";

const Home = () => {
  const trendingData = useSelector(selectBannerData);
  console.log(trendingData);
  return (
    <div>
      <HomeBanner />
      <HorizontalScroll heading={"Now Trending"} sectionData={trendingData} />
    </div>
  );
};

export default Home;
