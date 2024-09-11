import React, { useRef } from "react";
import Card from "../Card/Card";
import { selectBannerData, selectImageURL } from "../../store/movieSlice";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScroll = ({ sectionData = [], heading, isTrending }) => {
  const containerRef = useRef(null);
  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };
  const handlePrev = () => {
    containerRef.current.scrollLeft -= 300;
  };
  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white">
        {heading}
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-7 overflow-x-scroll relative z-10 scroll-smooth scrollbar-none"
        >
          {sectionData.map((data, index) => (
            <Card
              key={data.id + heading}
              data={data}
              index={index + 1}
              isTrending={isTrending}
            />
          ))}
        </div>
        <div className="absolute top-0 hidden lg:flex justify-between items-center size-full">
          <button
            onClick={handlePrev}
            className="bg-white p-1 text-black rounded-full -ml-2 z-20"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-2 z-20"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
