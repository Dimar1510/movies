import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import CardVideo from "../CardVideo/CardVideo";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const ArrowButton = ({ direction, onClick, isVisible = true }) => {
  if (!isVisible) return <div></div>;
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
  isVideo = false,
}) => {
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  const handleNext = () => {
    if (
      containerRef.current.scrollWidth - containerRef.current.offsetWidth >
      scrollLeft
    ) {
      setScrollLeft((prev) => prev + 300);
    }
  };
  const handlePrev = () => {
    if (scrollLeft > 0) {
      setScrollLeft((prev) => prev - 300);
    }
  };

  useEffect(() => {
    if (scrollLeft === 0) {
      setIsLeftVisible(false);
    } else {
      setIsLeftVisible(true);
    }
    if (
      containerRef.current.scrollWidth - containerRef.current.offsetWidth <
      scrollLeft
    ) {
      setIsRightVisible(false);
    } else {
      setIsRightVisible(true);
    }
    containerRef.current.scrollLeft = scrollLeft;
  }, [scrollLeft]);

  return (
    <section className="container mx-auto px-3 my-10" id={heading}>
      <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white">
        {heading}
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-transform scrollbar-none"
        >
          {isVideo
            ? sectionData.map((item) => (
                <CardVideo
                  videoKey={item.key}
                  key={item.key}
                  onClick={() => handlePlayVideo(item.key)}
                  videoName={item.name}
                  date={item.published_at}
                  type={item.type}
                />
              ))
            : sectionData.map((item, index) => (
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
          <ArrowButton
            direction={"left"}
            onClick={handlePrev}
            isVisible={isLeftVisible}
          />

          <ArrowButton
            direction={"right"}
            onClick={handleNext}
            isVisible={isRightVisible}
          />
        </div>
      </div>
      {playVideo && (
        <VideoPlayer videoId={playVideoId} close={() => setPlayVideo(false)} />
      )}
    </section>
  );
};

export default HorizontalScroll;
