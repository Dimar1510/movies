import { FC } from "react";
import { Direction } from "../../store/types";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface IArrowButtonProps {
  direction: Direction;
  onClick: () => void;
  isVisible?: boolean;
}

const ArrowButton: FC<IArrowButtonProps> = ({
  direction,
  onClick,
  isVisible = true,
}) => {
  if (!isVisible) return <div></div>;
  return (
    <button
      onClick={onClick}
      className="bg-white p-1 text-black rounded-full -mr-2 z-20"
    >
      {direction === Direction.left && <FaAngleLeft />}
      {direction === Direction.right && <FaAngleRight />}
    </button>
  );
};

export default ArrowButton;
