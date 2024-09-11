import React from "react";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex p-4 w-full justify-center bg-black">
      <a
        aria-label={"Github"}
        href={"https://github.com/Dimar1510/movies"}
        className="text-text-clr inline-flex rounded-lg p-1 justify-center group"
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-center text-text-clr group-hover:scale-125  transition-transform duration-500 group-hover:rotate-[360deg] will-change-transform ">
            <FaGithub />
          </span>
          <span className="uppercase">Dmitry Martynov</span>
        </div>
      </a>
    </footer>
  );
};

export default Footer;
