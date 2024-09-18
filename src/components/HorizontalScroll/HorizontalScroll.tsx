import { FC, useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import CardVideo from "../CardVideo/CardVideo";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { Direction, ICardItem, MediaType } from "../../store/types";
import ArrowButton from "../ArrowButton/ArrowButton";

interface IProps {
  sectionData: ICardItem[];
  heading: string;
  isTrending?: boolean;
  type: MediaType;
  isVideo?: boolean;
}

const HorizontalScroll: FC<IProps> = ({
  sectionData,
  heading,
  isTrending = false,
  type,
  isVideo = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = (data: string) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  const handleNext = () => {
    if (
      (containerRef.current?.scrollWidth ?? 0) -
        (containerRef.current?.offsetWidth ?? 0) >
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
    if (!containerRef.current) return;
    if (scrollLeft === 0) {
      setIsLeftVisible(false);
    } else {
      setIsLeftVisible(true);
    }
    if (
      (containerRef.current?.scrollWidth ?? 0) -
        (containerRef.current?.offsetWidth ?? 0) <
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
                  videoKey={item.key || ""}
                  key={item.key}
                  onClick={() => handlePlayVideo(item.key || "")}
                  videoName={item.name || ""}
                  videoDate={item.published_at || ""}
                  type={item.type || ""}
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
            direction={Direction.left}
            onClick={handlePrev}
            isVisible={isLeftVisible}
          />

          <ArrowButton
            direction={Direction.right}
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
