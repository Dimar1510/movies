import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBannerData, selectImageURL } from "../../store/movieSlice";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HomeBanner = ({ bannerData }) => {
  const imageUrl = useSelector(selectImageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage === bannerData.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentImage === 0) {
      setCurrentImage(bannerData.length - 1);
    } else {
      setCurrentImage((prev) => prev - 1);
    }
  };

  return (
    <section className="size-full">
      <div className="flex min-h-full max-h-[100vh] overflow-hidden relative group pb-8">
        <div className="absolute size-full px-4 top-0 hidden items-center justify-between group-hover:flex">
          <button
            onClick={handlePrev}
            className="bg-white rounded-full text-xl p-1 z-20 text-black"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white rounded-full text-xl p-1 z-20 text-black"
          >
            <FaAngleRight />
          </button>
        </div>
        {bannerData.map((item) => (
          <div
            key={item.id}
            className="min-w-full min-h-[450px] lg:min-h-full relative transition-transform duration-500"
            style={{ transform: `translateX(-${currentImage * 100}%` }}
          >
            <div className="size-full">
              <img
                src={imageUrl + item.backdrop_path}
                alt=""
                className="size-full object-cover"
              />
            </div>

            <div className="absolute top-0 size-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

            <div className="container mx-auto">
              <div className="container mx-auto absolute bottom-0 max-w-md px-3">
                <h2 className="font-bold text-2xl">
                  {item.title || item.name}
                </h2>
                <p className="text-ellipsis line-clamp-3 my-2">
                  {item.overview}
                </p>
                <div className="flex items-center gap-3">
                  <p>Rating: {Number(item.vote_average).toFixed(1) + "⭐"}</p>
                  <span>|</span>
                  <p>View: {Number(item.popularity).toFixed(0)}</p>
                </div>
                <button className="bg-white px-4 py-2 text-black font-bold rounded-lg mt-4 hover:bg-gradient-to-l hover:from-red-500 hover:to-orange-500 shadow-md transition-colors">
                  See details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeBanner;
