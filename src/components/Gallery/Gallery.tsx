import { FC, useEffect, useRef, useState } from "react";
import { selectImageURL } from "../../store/movieSlice";
import { useFetch } from "../../hooks/useFetch";
import ImageModal from "../ImageModal/ImageModal";
import { Direction, MediaType } from "../../store/types";
import { useAppSelector } from "../../store/hooks";
import ArrowButton from "../ArrowButton/ArrowButton";

interface IProps {
  id: string;
  type: MediaType;
}

const Gallery: FC<IProps> = ({ id, type }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: imageData } = useFetch(`/${type}/${id}/images`);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const imageUrl = useAppSelector(selectImageURL);
  const slider = containerRef.current;
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const imgArray = !Array.isArray(imageData)
    ? imageData?.profiles || imageData?.backdrops?.slice(0, 10) || []
    : [];

  const handleNext = () => {
    setScrollLeft((prev) => prev + 300);
  };
  const handlePrev = () => {
    if (scrollLeft > 0) {
      setScrollLeft((prev) => prev - 300);
    }
  };

  useEffect(() => {
    if (!slider) {
      return;
    }
    if (scrollLeft === 0) {
      setIsLeftVisible(false);
    } else {
      setIsLeftVisible(true);
    }
    if (slider.scrollWidth - slider.offsetWidth <= scrollLeft) {
      setIsRightVisible(false);
    } else {
      setIsRightVisible(true);
    }
    slider.scrollLeft = scrollLeft;
  }, [scrollLeft, slider]);

  const handleClick = (image: string) => {
    setCurrentImage(image);
    dialogRef.current?.showModal();
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    const closeOnOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current) {
        const dialogDimensions = dialogRef.current.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialogRef.current.close();
        }
      }
    };
    dialogRef.current?.addEventListener("click", closeOnOutsideClick);
    return () =>
      dialogRef.current?.removeEventListener("click", closeOnOutsideClick);
  });

  if (imageData && imgArray.length > 0)
    return (
      <>
        <section className="container mx-auto px-3 my-10">
          <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white">
            Gallery
          </h2>
          <div className="relative">
            <div
              ref={containerRef}
              className="flex gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-transform scrollbar-none"
            >
              {imgArray.map((image) => (
                <button
                  onClick={() => handleClick(image.file_path)}
                  key={image.file_path}
                  className="hover:scale-105 transition-transform will-change-transform"
                >
                  <img
                    src={imageUrl + image.file_path}
                    alt={"image"}
                    className="max-h-[250px] max-w-[250px]"
                  />
                </button>
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
        </section>

        <ImageModal
          ref={dialogRef}
          image={currentImage}
          onClose={handleClose}
        />
      </>
    );
};

export default Gallery;
