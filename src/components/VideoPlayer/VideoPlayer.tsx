import { FC, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface IProps {
  videoId: string;
  close: () => void;
}

const VideoPlayer: FC<IProps> = ({ videoId, close }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closePlayer(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
      }
    }
    document.addEventListener("keydown", closePlayer);
    return () => document.removeEventListener("keydown", closePlayer);
  }, [videoId]);

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
          close();
        }
      }
    };
    outsideRef?.current?.addEventListener("click", closeOnOutsideClick);
    return () =>
      outsideRef?.current?.removeEventListener("click", closeOnOutsideClick);
  }, []);

  return (
    <section
      ref={outsideRef}
      className="fixed bg-neutral-950 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-90 flex justify-center items-center"
    >
      <div
        ref={dialogRef}
        className="bg-black w-full  max-h-[80vh] max-w-screen-lg aspect-video rounded  relative"
      >
        <button
          onClick={close}
          className=" absolute right-0 top-0 text-3xl z-50"
        >
          <IoClose />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default VideoPlayer;
