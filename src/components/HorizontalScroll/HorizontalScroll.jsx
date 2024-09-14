import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const ArrowButton = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white p-1 text-black rounded-full -mr-2 z-20"
    >
      {direction === "left" && <FaAngleLeft />}
      {direction === "right" && <FaAngleRight />}
    </button>
  );
};

const HorizontalScroll = ({
  sectionData,
  heading,
  isTrending = false,
  type,
}) => {
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const handleNext = () => {
    if (
      containerRef.current.scrollWidth - containerRef.current.offsetWidth >
      scrollLeft
    )
      setScrollLeft((prev) => prev + 300);
  };
  const handlePrev = () => {
    if (scrollLeft > 0) {
      setScrollLeft((prev) => prev - 300);
    }
  };

  useEffect(() => {
    containerRef.current.scrollLeft = scrollLeft;
  }, [scrollLeft]);

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white">
        {heading}
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-transform scrollbar-none"
        >
          {sectionData.map((item, index) => (
            <Card
              key={item.id + heading}
              data={item}
              index={index + 1}
              isTrending={isTrending}
              type={item.media_type || type}
            />
          ))}
        </div>
        <div className="absolute top-0 hidden lg:flex justify-between items-center size-full">
          <ArrowButton direction={"left"} onClick={handlePrev} />
          <ArrowButton direction={"right"} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
