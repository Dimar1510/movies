import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={handleClick}
      className={`lg:hidden fixed border border-neutral-700 size-10 flex justify-center items-center rounded-full right-5 bottom-32 z-40 bg-neutral-600 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollTop;
