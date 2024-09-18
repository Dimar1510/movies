import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface IProps {
  href: string;
  children: ReactNode;
}

const ButtonLink: FC<IProps> = ({ href, children }) => {
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
