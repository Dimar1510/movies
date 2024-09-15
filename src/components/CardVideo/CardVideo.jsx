import { format } from "date-fns";
import React from "react";
import { FaPlay } from "react-icons/fa";

const CardVideo = ({ videoKey, videoName, date, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      className="hover:scale-105 transition-transform relative group will-change-transform"
    >
      <img
        src={`https://i3.ytimg.com/vi/${videoKey}/hqdefault.jpg`}
        alt="thumbnail"
        className="min-w-[300px]"
      />
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-0 right-0 m-auto size-20 flex items-center justify-center text-white p-5 rounded-full bg-neutral-900/70 group-hover:text-themeColor"
      >
        <FaPlay className="text-2xl" />
      </div>
      <div className="absolute bottom-0 h-16 backdrop-blur-xl w-full p-2 bg-black/80">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold text-start">
          {videoName}
        </h2>
        <div className="text-neutral-400 flex justify-between text-sm">
          <p>{date && format(new Date(date), "MMMM do yyyy")}</p>
          <p className="bg-black px-1 rounded-full text-white">{type}</p>
        </div>
      </div>
    </button>
  );
};

export default CardVideo;
