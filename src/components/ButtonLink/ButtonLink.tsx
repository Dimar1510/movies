import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ href, children }) => {
  return (
    <Link
      to={href}
      className="bg-white px-4 py-2 text-black font-bold rounded-lg hover:bg-gradient-to-l hover:to-themeColor hover:from-yellow-400 shadow-md transition-all duration-500 w-fit"
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
