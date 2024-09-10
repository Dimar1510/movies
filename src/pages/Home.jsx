import React from "react";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import { useSelector } from "react-redux";
import { selectBannerData } from "../store/movieSlice";

const Home = () => {
  return (
    <div>
      <HomeBanner />
    </div>
  );
};

export default Home;
