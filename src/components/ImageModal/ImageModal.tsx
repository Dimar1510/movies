import { forwardRef } from "react";
import { selectImageURL } from "../../store/movieSlice";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import noImage from "../../assets/images/no-image.jpg";

interface IProps {
  image: string | null;
  onClose: () => void;
}

const ImageModal = forwardRef<HTMLDialogElement, IProps>(
  ({ image, onClose }, ref) => {
    const imageUrl = useSelector(selectImageURL);
    return (
      <dialog
        ref={ref}
        className="m-auto backdrop:backdrop-brightness-[.25] min-w-[300px] min-h-[300px] bg-gray-400"
      >
        <div className="relative w-full h-full flex justify-center items-center bg-transparent">
          <img
            src={imageUrl + image || noImage}
            alt="profile"
            className={`size-full  max-h-[90svh] transition-opacity duration-500 object-cover`}
          />
        </div>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 size-10 text-2xl rounded-full bg-white/50 flex items-center justify-center"
        >
          <IoClose />
        </button>
      </dialog>
    );
  }
);

export default ImageModal;
