import { TouchEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectImageURL } from "../../store/movieSlice";
import ButtonLink from "../ButtonLink/ButtonLink";
import { Direction, ICardItem } from "../../store/types";
import ArrowButton from "../ArrowButton/ArrowButton";

const HomeBanner = ({ bannerData }: { bannerData: ICardItem[] }) => {
  const imageUrl = useSelector(selectImageURL);
  const [currentImage, setCurrentImage] = useState(0);
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    setStartX(e.touches[0].pageX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    const distance = e.changedTouches[0].pageX - startX;
    if (distance > 0) {
      handlePrev();
    } else if (distance < 0) {
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentImage === bannerData.length - 1) {
      return;
    } else {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentImage === 0) {
      return;
    } else {
      setCurrentImage((prev) => prev - 1);
    }
  };

  return (
    <section className="size-full">
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex min-h-full max-h-[100vh] overflow-hidden relative group pb-8"
      >
        <div className="absolute size-full px-4 top-0 hidden items-center justify-between group-hover:flex">
          <ArrowButton
            isVisible={currentImage !== 0}
            onClick={handlePrev}
            direction={Direction.left}
          />
          <ArrowButton
            isVisible={currentImage !== bannerData.length - 1}
            onClick={handleNext}
            direction={Direction.right}
          />
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
                alt={item.name}
                className="size-full object-cover"
              />
            </div>

            <div className="absolute top-0 size-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

            <div className="container mx-auto">
              <div className="container mx-auto absolute bottom-5 max-w-md px-3 flex flex-col gap-3">
                <h2 className="font-bold text-2xl">
                  {item.title || item.name}
                </h2>
                <p className="text-ellipsis line-clamp-3">{item.overview}</p>
                <div className="flex items-center gap-3">
                  <p>Rating: {Number(item.vote_average).toFixed(1) + "⭐"}</p>
                  <span>|</span>
                  <p>View: {Number(item.popularity).toFixed(0)}</p>
                </div>
                <ButtonLink href={`/${item.media_type}/${item.id}`}>
                  See details
                </ButtonLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeBanner;
